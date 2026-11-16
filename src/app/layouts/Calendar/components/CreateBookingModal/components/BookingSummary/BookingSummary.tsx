import { useTranslation } from "react-i18next";
import type { CalendarService } from "../../../../types";
import styles from "./BookingSummary.module.css";

interface BookingSummaryProps {
  service: CalendarService;
  date: string;
  time: string;
}

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}.${month}.${year}`;
};

const formatPrice = (price: number, language: string) =>
  `${new Intl.NumberFormat(language, { maximumFractionDigits: 0 }).format(price)} ₽`;

const BookingSummary = ({ service, date, time }: BookingSummaryProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || "ru";

  return (
    <div className={styles.summary}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
          <path d="M8 13h3M8 17h3" />
        </svg>
      </span>
      <div className={styles.details}>
        <strong className={styles.serviceName}>
          {t(service.nameKey, { defaultValue: service.id })}
        </strong>
        <span className={styles.meta}>
          {formatDate(date)} · {time} · {formatPrice(service.price, language)}
        </span>
      </div>
    </div>
  );
};

export default BookingSummary;
