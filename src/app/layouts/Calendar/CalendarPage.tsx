import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import type {
  CalendarBooking,
  CalendarPageProps,
  CalendarSlotSelection,
  CalendarViewMode,
} from "./types";
import { mockBookings, mockEmployees } from "./data/mockCalendarData";
import CalendarToolbar from "./components/CalendarToolbar/CalendarToolbar";
import DayView from "./components/DayView/DayView";
import WeekView from "./components/WeekView/WeekView";
import CreateBookingModal, {
  type BookingRequestData,
} from "./components/CreateBookingModal/CreateBookingModal";
import EditBookingModal from "./components/EditBookingModal/EditBookingModal";
import {
  addMinutesToTime,
  isBookingTimeAvailable,
} from "./utils/bookingAvailability";
import styles from "./CalendarPage.module.css";

type CalendarModalState =
  | { type: "create"; slot: CalendarSlotSelection }
  | { type: "edit"; booking: CalendarBooking }
  | null;

const DEMO_INITIAL_DATE = new Date(2026, 5, 22);

const CalendarPage = ({
  employees = mockEmployees,
  bookings = mockBookings,
  initialDate = DEMO_INITIAL_DATE,
}: CalendarPageProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(() => new Date(initialDate));
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [calendarBookings, setCalendarBookings] = useState<CalendarBooking[]>(bookings);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>(() =>
    employees.map((employee) => employee.id),
  );
  const [modal, setModal] = useState<CalendarModalState>(null);

  const visibleEmployees = employees.filter((employee) =>
    selectedEmployeeIds.includes(employee.id),
  );
  const visibleBookings = calendarBookings.filter((booking) =>
    selectedEmployeeIds.includes(booking.employeeId),
  );

  const handleToggleEmployee = (employeeId: string) => {
    setSelectedEmployeeIds((current) =>
      current.includes(employeeId)
        ? current.filter((id) => id !== employeeId)
        : [...current, employeeId],
    );
  };

  const handleSelectAllEmployees = () => {
    setSelectedEmployeeIds(employees.map((employee) => employee.id));
  };

  const handleSlotClick = (slot: CalendarSlotSelection) => {
    setModal({ type: "create", slot });
  };

  const handleBookingClick = (booking: CalendarBooking) => {
    setModal({ type: "edit", booking });
  };

  const handleBookingComplete = (request: BookingRequestData) => {
    const assignedEmployee = request.specialist
      ?? employees.find((employee) => isBookingTimeAvailable({
        date: request.date,
        time: request.time,
        durationMinutes: request.service.durationMinutes,
        specialistId: employee.id,
        employees,
        bookings: calendarBookings,
      }));

    if (!assignedEmployee) {
      return;
    }

    const isStillAvailable = isBookingTimeAvailable({
      date: request.date,
      time: request.time,
      durationMinutes: request.service.durationMinutes,
      specialistId: assignedEmployee.id,
      employees,
      bookings: calendarBookings,
    });

    if (!isStillAvailable) {
      return;
    }

    const newBooking: CalendarBooking = {
      id: `booking-${Date.now()}`,
      date: request.date,
      startTime: request.time,
      endTime: addMinutesToTime(request.time, request.service.durationMinutes),
      clientName: request.name,
      clientPhone: request.phone,
      serviceName: t(request.service.nameKey, {
        defaultValue: request.service.id,
      }),
      employeeId: assignedEmployee.id,
      status: "confirmed",
      color: assignedEmployee.color,
      price: request.service.price,
    };

    setCalendarBookings((currentBookings) => [...currentBookings, newBooking]);
  };

  const handleCloseModal = useCallback(() => setModal(null), []);

  return (
    <section
      className={styles.calendar}
      aria-label={t("calendar.title", { defaultValue: "Calendar" })}
    >
      <CalendarToolbar
        date={date}
        viewMode={viewMode}
        employees={employees}
        selectedEmployeeIds={selectedEmployeeIds}
        onDateChange={setDate}
        onToday={() => setDate(new Date())}
        onViewModeChange={setViewMode}
        onToggleEmployee={handleToggleEmployee}
        onSelectAllEmployees={handleSelectAllEmployees}
      />

      {viewMode === "day" ? (
        <DayView
          date={date}
          employees={visibleEmployees}
          bookings={visibleBookings}
          onSlotClick={handleSlotClick}
          onBookingClick={handleBookingClick}
        />
      ) : (
        <WeekView
          date={date}
          bookings={visibleBookings}
          onSlotClick={handleSlotClick}
          onBookingClick={handleBookingClick}
        />
      )}

      <footer className={styles.footer}>
        <span>
          {t("calendar.emptySlotHint", {
            defaultValue: "Click an empty time slot to create a booking",
          })}
        </span>
        <span>
          {t("calendar.timezone", { defaultValue: "Europe/Amsterdam" })}
        </span>
      </footer>

      {modal?.type === "create" && (
        <CreateBookingModal
          initialSlot={modal.slot}
          onClose={handleCloseModal}
          employees={employees}
          bookings={calendarBookings}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {modal?.type === "edit" && (
        <EditBookingModal
          isOpen
          booking={modal.booking}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default CalendarPage;
