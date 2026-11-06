import type { MouseEvent as ReactMouseEvent } from "react";
import { useTranslation } from "react-i18next";
import type { CalendarBooking, CalendarSlotSelection } from "../../types";
import {
  CALENDAR_END_HOUR,
  CALENDAR_SLOT_MINUTES,
  CALENDAR_START_HOUR,
  formatWeekday,
  getWeekDates,
  toDateKey,
} from "../../utils/calendarDate";
import BookingCard from "../BookingCard/BookingCard";
import styles from "./WeekView.module.css";

interface WeekViewProps {
  date: Date;
  bookings: CalendarBooking[];
  onSlotClick: (slot: CalendarSlotSelection) => void;
  onBookingClick: (booking: CalendarBooking) => void;
}

const getTimeFromPosition = (event: ReactMouseEvent<HTMLButtonElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const relativeY = Math.max(
    0,
    Math.min(event.clientY - bounds.top, bounds.height),
  );
  const totalMinutes = (CALENDAR_END_HOUR - CALENDAR_START_HOUR) * 60;
  const slotIndex = Math.min(
    totalMinutes / CALENDAR_SLOT_MINUTES - 1,
    Math.floor(
      (relativeY / bounds.height) * (totalMinutes / CALENDAR_SLOT_MINUTES),
    ),
  );
  const minutes = CALENDAR_START_HOUR * 60 + slotIndex * CALENDAR_SLOT_MINUTES;
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const remainder = (minutes % 60).toString().padStart(2, "0");

  return `${hours}:${remainder}`;
};

const WeekView = ({
  date,
  bookings,
  onSlotClick,
  onBookingClick,
}: WeekViewProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("ru") ? "ru-RU" : "en-GB";
  const dates = getWeekDates(date);

  const handleEmptyAreaClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
    dateKey: string,
  ) => {
    onSlotClick({ date: dateKey, time: getTimeFromPosition(event) });
  };

  return (
    <div className={styles.scrollArea}>
      <div className={styles.grid}>
        {dates.map((day) => (
          <div className={styles.day} key={toDateKey(day)}>
            <div className={styles.dayHeader}>
              <span>{formatWeekday(day, locale).replace(".", "")}</span>
              <strong>{day.getDate()}</strong>
            </div>

            <div className={styles.dayBody}>
              <button
                type="button"
                className={styles.emptyArea}
                aria-label={t("calendar.createOnDate", {
                  date: toDateKey(day),
                  defaultValue: "Create booking on {{date}}",
                })}
                onClick={(event) => handleEmptyAreaClick(event, toDateKey(day))}
              />

              <div className={styles.bookingList}>
                {[...bookings]
                  .filter((booking) => booking.date === toDateKey(day))
                  .sort((first, second) =>
                    first.startTime.localeCompare(second.startTime),
                  )
                  .map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      compact
                      onClick={onBookingClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
