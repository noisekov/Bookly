import type { CSSProperties } from "react";
import type { CalendarBooking } from "../../types";
import styles from "./BookingCard.module.css";

interface BookingCardProps {
  booking: CalendarBooking;
  onClick: (booking: CalendarBooking) => void;
  style?: CSSProperties;
  compact?: boolean;
}

const BookingCard = ({ booking, onClick, style, compact = false }: BookingCardProps) => {
  return (
    <button
      type="button"
      className={`${styles.booking} ${styles[booking.color]} ${compact ? styles.compact : ""}`}
      style={style}
      onClick={() => onClick(booking)}
      aria-label={`${booking.startTime}–${booking.endTime}, ${booking.clientName}, ${booking.serviceName}`}
    >
      <span className={styles.topLine}>
        <span className={styles.time}>{booking.startTime}–{booking.endTime}</span>
        <span className={`${styles.status} ${booking.status === "confirmed" ? styles.statusConfirmed : styles.statusPending}`} />
      </span>
      <span className={styles.client}>{booking.clientName}</span>
      <span className={styles.service}>{booking.serviceName}</span>
      <span className={styles.price}>{new Intl.NumberFormat("ru-RU").format(booking.price)} ₽</span>
    </button>
  );
};

export default BookingCard;
