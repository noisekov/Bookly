import { useTranslation } from "react-i18next";
import styles from "./CalendarLegend.module.css";

const CalendarLegend = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.legend} aria-label={t("calendar.statusLegend", { defaultValue: "Booking statuses" })}>
      <span className={styles.item}>
        <span className={`${styles.dot} ${styles.confirmed}`} />
        {t("calendar.confirmed", { defaultValue: "Confirmed" })}
      </span>
      <span className={styles.item}>
        <span className={`${styles.dot} ${styles.pending}`} />
        {t("calendar.pending", { defaultValue: "Pending" })}
      </span>
    </div>
  );
};

export default CalendarLegend;
