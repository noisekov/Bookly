import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import type {
  CalendarBooking,
  CalendarEmployee,
  CalendarService,
  CalendarSlotSelection,
} from "../../types";
import { mockServices } from "../../data/mockServices";
import {
  getLocalDateKey,
  isBookingTimeAvailable,
} from "../../utils/bookingAvailability";
import BookingSteps from "./components/BookingSteps/BookingSteps";
import ServiceSelectionStep from "./components/ServiceSelectionStep/ServiceSelectionStep";
import SpecialistSelectionStep from "./components/SpecialistSelectionStep/SpecialistSelectionStep";
import TimeSelectionStep from "./components/TimeSelectionStep/TimeSelectionStep";
import ContactSelectionStep from "./components/ContactSelectionStep/ContactSelectionStep";
import BookingSuccessStep from "./components/BookingSuccessStep/BookingSuccessStep";

import styles from "./CreateBookingModal.module.css";

type BookingStep = 1 | 2 | 3 | 4;

export interface BookingRequestData {
  name: string;
  phone: string;
  service: CalendarService;
  specialist: CalendarEmployee | null;
  date: string;
  time: string;
}

interface CreateBookingModalProps {
  initialSlot: CalendarSlotSelection | null;
  onClose: () => void;
  employees: CalendarEmployee[];
  bookings: CalendarBooking[];
  services?: CalendarService[];
  businessName?: string;
  onBookingComplete?: (booking: BookingRequestData) => void;
}

const getInitialSpecialistId = (
  initialSlot: CalendarSlotSelection | null,
  employees: CalendarEmployee[],
): string => {
  if (
    initialSlot?.employeeId
    && employees.some((employee) => employee.id === initialSlot.employeeId)
  ) {
    return initialSlot.employeeId;
  }

  if (employees.some((employee) => employee.id === "maria")) {
    return "maria";
  }

  return employees[0]?.id ?? "any";
};

const CreateBookingModal = ({
  initialSlot,
  onClose,
  employees,
  bookings,
  services = mockServices,
  businessName = "Bloom",
  onBookingComplete,
}: CreateBookingModalProps) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<BookingStep>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    services[0]?.id ?? null,
  );
  const [selectedSpecialistId, setSelectedSpecialistId] = useState(() =>
    getInitialSpecialistId(initialSlot, employees),
  );
  const [selectedDate, setSelectedDate] = useState(
    initialSlot?.date ?? getLocalDateKey(new Date()),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(
    initialSlot?.time ?? null,
  );
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  ) ?? null;
  const selectedSpecialist = employees.find(
    (employee) => employee.id === selectedSpecialistId,
  ) ?? null;

  const selectedTimeIsAvailable = Boolean(
    selectedTime
    && selectedService
    && isBookingTimeAvailable({
      date: selectedDate,
      time: selectedTime,
      durationMinutes: selectedService.durationMinutes,
      specialistId: selectedSpecialistId,
      employees,
      bookings,
    }),
  );

  const isContactValid = clientName.trim().length >= 2
    && clientPhone.replace(/\D/g, "").length >= 10;

  const handleContinue = () => {
    if (activeStep === 1 && selectedService) {
      setActiveStep(2);
      return;
    }

    if (activeStep === 2 && selectedSpecialistId) {
      setActiveStep(3);
      return;
    }

    if (activeStep === 3 && selectedTimeIsAvailable) {
      setActiveStep(4);
    }
  };

  const handleBack = () => {
    setActiveStep((currentStep) =>
      currentStep > 1 ? (currentStep - 1) as BookingStep : currentStep,
    );
  };

  const handleConfirm = () => {
    if (
      !selectedService
      || !selectedTime
      || !selectedTimeIsAvailable
      || !isContactValid
    ) {
      return;
    }

    onBookingComplete?.({
      name: clientName.trim(),
      phone: clientPhone.trim(),
      service: selectedService,
      specialist: selectedSpecialist,
      date: selectedDate,
      time: selectedTime,
    });

    setIsCompleted(true);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleSpecialistChange = (specialistId: string) => {
    setSelectedSpecialistId(specialistId);
    setSelectedTime(null);
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedTime(null);
  };

  const titleKeys: Record<BookingStep, string> = {
    1: "bookingWizard.chooseService",
    2: "bookingWizard.chooseSpecialist",
    3: "bookingWizard.chooseTime",
    4: "bookingWizard.enterContacts",
  };

  const modal = (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-slot-date={initialSlot?.date}
      data-slot-time={initialSlot?.time}
    >
      <section
        className={`${styles.dialog} ${isCompleted ? styles.successDialog : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={isCompleted ? "booking-success-title" : "create-booking-title"}
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label={t("bookingWizard.close", { defaultValue: "Close" })}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {isCompleted ? (
          <BookingSuccessStep
            service={selectedService}
            date={selectedDate}
            time={selectedTime ?? ""}
            clientName={clientName.trim()}
            businessName={businessName}
            onClose={onClose}
          />
        ) : (
          <>
            <div className={styles.content}>
              <header className={styles.header}>
                <p className={styles.eyebrow}>
                  {businessName} <span>·</span> {t("bookingWizard.onlineBooking")}
                </p>
                <h1 className={styles.title} id="create-booking-title">
                  {t(titleKeys[activeStep])}
                </h1>
                <BookingSteps activeStep={activeStep} />
              </header>

              {activeStep === 1 && (
                <ServiceSelectionStep
                  services={services}
                  selectedServiceId={selectedServiceId}
                  onSelect={handleServiceChange}
                />
              )}

              {activeStep === 2 && (
                <SpecialistSelectionStep
                  employees={employees}
                  selectedSpecialistId={selectedSpecialistId}
                  onSelect={handleSpecialistChange}
                />
              )}

              {activeStep === 3 && selectedService && (
                <TimeSelectionStep
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  durationMinutes={selectedService.durationMinutes}
                  selectedSpecialistId={selectedSpecialistId}
                  employees={employees}
                  bookings={bookings}
                  onDateChange={handleDateChange}
                  onTimeSelect={setSelectedTime}
                />
              )}

              {activeStep === 4 && selectedService && selectedTime && (
                <ContactSelectionStep
                  service={selectedService}
                  specialist={selectedSpecialist}
                  date={selectedDate}
                  time={selectedTime}
                  clientName={clientName}
                  clientPhone={clientPhone}
                  onNameChange={setClientName}
                  onPhoneChange={setClientPhone}
                />
              )}
            </div>

            <footer className={styles.footer}>
              {activeStep === 1 ? (
                <div className={styles.prepaymentNote}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m4.5 10.2 3.4 3.3 7.6-7.4" />
                  </svg>
                  <span>{t("bookingWizard.noPrepayment")}</span>
                </div>
              ) : (
                <button className={styles.backButton} type="button" onClick={handleBack}>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M16 10H4m0 0 5-5m-5 5 5 5" />
                  </svg>
                  <span>{t("bookingWizard.back")}</span>
                </button>
              )}

              {activeStep === 4 ? (
                <button
                  className={styles.continueButton}
                  type="button"
                  onClick={handleConfirm}
                  disabled={!isContactValid || !selectedTimeIsAvailable}
                >
                  <span>{t("bookingWizard.confirmBooking")}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m4 10 4 4 8-8" />
                  </svg>
                </button>
              ) : (
                <button
                  className={styles.continueButton}
                  type="button"
                  onClick={handleContinue}
                  disabled={
                    (activeStep === 1 && !selectedService)
                    || (activeStep === 3 && !selectedTimeIsAvailable)
                  }
                >
                  <span>{t("bookingWizard.continue")}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m7.5 4.5 5.5 5.5-5.5 5.5" />
                  </svg>
                </button>
              )}
            </footer>
          </>
        )}
      </section>
    </div>
  );

  return createPortal(modal, document.body);
};

export default CreateBookingModal;
