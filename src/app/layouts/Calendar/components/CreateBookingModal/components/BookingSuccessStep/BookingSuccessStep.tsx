import { useTranslation } from "react-i18next";
import type { CalendarService } from "../../../../types";
import styles from "./BookingSuccessStep.module.css";

interface BookingSuccessStepProps {
  service: CalendarService | null;
  date: string;
  time: string;
  clientName: string;
  businessName: string;
  onClose: () => void;
}

const formatVisitDate = (date: string) => {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}.${month}.${year}`;
};

const formatPrice = (price: number, locale: string) =>
  `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(price)} ₽`;

const BookingSuccessStep = ({
  service,
  date,
  time,
  clientName,
  businessName,
  onClose,
}: BookingSuccessStepProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage || "ru";

  return (
    <section className={styles.success}>
      <div className={styles.checkmark} aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="m12 24 8 8 16-17" />
        </svg>
      </div>

      <p className={styles.eyebrow}>{t("bookingWizard.successEyebrow")}</p>
      <h1 className={styles.title} id="booking-success-title">
        {t("bookingWizard.successTitle")}
      </h1>
      <p className={styles.description}>
        {t("bookingWizard.successDescription", {
          name: clientName,
          businessName,
        })}
      </p>

      <div className={styles.summary}>
        <strong className={styles.serviceName}>
          {service ? t(service.nameKey, { defaultValue: service.id }) : "—"}
        </strong>
        <p className={styles.dateTime}>
          {formatVisitDate(date)} · {time}
        </p>
        <p className={styles.priceDuration}>
          {service ? formatPrice(service.price, locale) : "—"}
          {service && (
            <>
              <span aria-hidden="true"> · </span>
              {t("bookingWizard.durationLabel", {
                duration: service.durationMinutes,
              })}
            </>
          )}
        </p>
        <p className={styles.savedNote}>
          {t("bookingWizard.successSavedNote")}
        </p>
      </div>

      <button className={styles.doneButton} type="button" onClick={onClose}>
        <span>{t("bookingWizard.done")}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m4 10 4 4 8-8" />
        </svg>
      </button>
    </section>
  );
};

export default BookingSuccessStep;
