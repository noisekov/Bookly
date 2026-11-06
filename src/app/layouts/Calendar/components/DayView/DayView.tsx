import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import type {
  CalendarBooking,
  CalendarEmployee,
  CalendarSlotSelection,
} from "../../types";
import {
  CALENDAR_SLOT_HEIGHT,
  getBookingPosition,
  getTimeSlots,
  toDateKey,
} from "../../utils/calendarDate";
import BookingCard from "../BookingCard/BookingCard";
import styles from "./DayView.module.css";

interface DayViewProps {
  date: Date;
  employees: CalendarEmployee[];
  bookings: CalendarBooking[];
  onSlotClick: (slot: CalendarSlotSelection) => void;
  onBookingClick: (booking: CalendarBooking) => void;
}

const DayView = ({
  date,
  employees,
  bookings,
  onSlotClick,
  onBookingClick,
}: DayViewProps) => {
  const { t } = useTranslation();
  const timeSlots = getTimeSlots();
  const dateKey = toDateKey(date);

  return (
    <div className={styles.scrollArea}>
      {employees.length === 0 ? (
        <div className={styles.emptyState}>
          {t("calendar.noTeamMembers", {
            defaultValue: "No team members selected",
          })}
        </div>
      ) : (
        <div
          className={styles.grid}
          style={
            {
              "--column-count": employees.length,
              "--slot-height": `${CALENDAR_SLOT_HEIGHT}px`,
            } as CSSProperties
          }
        >
          <div className={styles.corner}>
            {t("calendar.time", { defaultValue: "Time" })}
          </div>

          {employees.map((employee) => (
            <div className={styles.employeeHeader} key={employee.id}>
              <span className={`${styles.avatar} ${styles[employee.color]}`}>
                {employee.initials}
              </span>
              <span className={styles.employeeInfo}>
                <strong>{employee.name}</strong>
                <small>{employee.role}</small>
              </span>
              <span className={styles.onlineDot} />
            </div>
          ))}

          <div className={styles.timeColumn}>
            {timeSlots.map((time, index) => (
              <div className={styles.timeLabel} key={time}>
                {index % 2 === 0 ? time : ""}
              </div>
            ))}
          </div>

          {employees.map((employee) => {
            const employeeBookings = bookings.filter(
              (booking) =>
                booking.employeeId === employee.id && booking.date === dateKey,
            );

            return (
              <div className={styles.employeeColumn} key={employee.id}>
                <div className={styles.slots}>
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      className={styles.slot}
                      key={time}
                      aria-label={`${dateKey} ${time} ${employee.name}`}
                      title={t("calendar.createAtTime", {
                        time,
                        defaultValue: "Create booking at {{time}}",
                      })}
                      onClick={() =>
                        onSlotClick({
                          date: dateKey,
                          time,
                          employeeId: employee.id,
                        })
                      }
                    />
                  ))}
                </div>

                <div className={styles.bookingLayer}>
                  {employeeBookings.map((booking) => {
                    const position = getBookingPosition(
                      booking.startTime,
                      booking.endTime,
                    );
                    return (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onClick={onBookingClick}
                        style={{
                          top: position.top,
                          height: position.height,
                          left: 4,
                          right: 4,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DayView;
