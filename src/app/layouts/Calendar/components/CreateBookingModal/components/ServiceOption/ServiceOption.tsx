import { useTranslation } from "react-i18next";
import type { CalendarService } from "../../../../types";
import styles from "./ServiceOption.module.css";

interface ServiceOptionProps {
  service: CalendarService;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceOption = ({ service, isSelected, onSelect }: ServiceOptionProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage === "ru" ? "ru-RU" : "en-US";
  const formattedPrice = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <button
      className={`${styles.option} ${isSelected ? styles.selected : ""}`}
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
    >
      <span className={styles.details}>
        <span className={styles.name}>{t(service.nameKey)}</span>
        <span className={styles.duration}>
          {service.durationMinutes} {t("bookingWizard.minutesShort")}
        </span>
      </span>

      <span className={styles.meta}>
        <span className={styles.price}>
          {formattedPrice} {t("bookingWizard.currency")}
        </span>
        <span className={styles.radio} aria-hidden="true">
          {isSelected && <span className={styles.radioMark} />}
        </span>
      </span>
    </button>
  );
};

export default ServiceOption;
