import { useTranslation } from "react-i18next";
import type { CalendarEmployee, CalendarService } from "../../../../types";
import BookingSummary from "../BookingSummary/BookingSummary";
import styles from "./ContactSelectionStep.module.css";

interface ContactSelectionStepProps {
  service: CalendarService;
  specialist: CalendarEmployee | null;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

const ContactSelectionStep = ({
  service,
  specialist,
  date,
  time,
  clientName,
  clientPhone,
  onNameChange,
  onPhoneChange,
}: ContactSelectionStepProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.step}>
      <BookingSummary
        service={service}
        date={date}
        time={time}
      />

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="booking-client-name">
            {t("bookingWizard.yourName")}
          </label>
          <input
            className={styles.input}
            id="booking-client-name"
            type="text"
            autoComplete="name"
            autoFocus
            value={clientName}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder={t("bookingWizard.namePlaceholder")}
            minLength={2}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="booking-client-phone">
            {t("bookingWizard.phoneNumber")}
          </label>
          <input
            className={styles.input}
            id="booking-client-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={clientPhone}
            onChange={(event) => onPhoneChange(event.target.value)}
            placeholder={t("bookingWizard.phonePlaceholder")}
            required
          />
        </div>
      </div>

      <p className={styles.privacyNote}>
        {t("bookingWizard.privacyNote")}
      </p>
      {specialist && (
        <span className={styles.srOnly}>
          {t("bookingWizard.selectedSpecialist", { name: specialist.name })}
        </span>
      )}
    </section>
  );
};

export default ContactSelectionStep;
