import { useTranslation } from "react-i18next";

import type {
  CalendarBooking,
  CalendarEmployee,
} from "../../../../types";
import { getBookingTimeSlots, isBookingTimeAvailable } from "../../../../utils/bookingAvailability";
import TimeSlot from "../TimeSlot/TimeSlot";
import styles from "./TimeSelectionStep.module.css";

interface TimeSelectionStepProps {
  selectedDate: string;
  selectedTime: string | null;
  durationMinutes: number;
  selectedSpecialistId: string;
  employees: CalendarEmployee[];
  bookings: CalendarBooking[];
  onDateChange: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const TimeSelectionStep = ({
  selectedDate,
  selectedTime,
  durationMinutes,
  selectedSpecialistId,
  employees,
  bookings,
  onDateChange,
  onTimeSelect,
}: TimeSelectionStepProps) => {
  const { t, i18n } = useTranslation();
  const timeSlots = getBookingTimeSlots();

  return (
    <section className={styles.step}>
      <div className={styles.dateField}>
        <label className={styles.label} htmlFor="booking-visit-date">
          {t("bookingWizard.visitDate")}
        </label>

        <input
          className={styles.dateInput}
          id="booking-visit-date"
          type="date"
          lang={i18n.resolvedLanguage || "ru"}
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
          aria-label={t("bookingWizard.visitDate")}
        />
      </div>

      <div className={styles.timeField}>
        <h2 className={styles.label} id="booking-time-label">
          {t("bookingWizard.availableTimes")}
        </h2>

        <div className={styles.timeGrid} role="group" aria-labelledby="booking-time-label">
          {timeSlots.map((time) => {
            const isAvailable = isBookingTimeAvailable({
              date: selectedDate,
              time,
              durationMinutes,
              specialistId: selectedSpecialistId,
              employees,
              bookings,
            });

            return (
              <TimeSlot
                key={time}
                time={time}
                isAvailable={isAvailable}
                isSelected={selectedTime === time}
                unavailableLabel={t("bookingWizard.timeUnavailable")}
                onSelect={() => onTimeSelect(time)}
              />
            );
          })}
        </div>
      </div>

      <p className={styles.timezoneNote}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="7.2" />
          <path d="M10 5.8v4.5l2.8 1.8" />
        </svg>
        <span>
          {t("bookingWizard.localTimeDuration", { duration: durationMinutes })}
        </span>
      </p>
    </section>
  );
};

export default TimeSelectionStep;
