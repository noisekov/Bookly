import { useTranslation } from "react-i18next";
import styles from "./BookingSteps.module.css";

interface BookingStepsProps {
  activeStep: 1 | 2 | 3 | 4;
}

const BookingSteps = ({ activeStep }: BookingStepsProps) => {
  const { t } = useTranslation();

  const steps = [
    { number: 1, label: t("bookingWizard.steps.service") },
    { number: 2, label: t("bookingWizard.steps.specialist") },
    { number: 3, label: t("bookingWizard.steps.time") },
    { number: 4, label: t("bookingWizard.steps.contact") },
  ];

  return (
    <nav className={styles.steps} aria-label={t("bookingWizard.progressLabel")}>
      {steps.map((step) => {
        const isActive = step.number === activeStep;
        const isCompleted = step.number < activeStep;

        return (
          <div
            className={styles.step}
            key={step.number}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={[
                styles.number,
                isActive ? styles.active : "",
                isCompleted ? styles.completed : "",
              ].filter(Boolean).join(" ")}
            >
              {isCompleted ? (
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m3.5 8.2 2.8 2.7 6.2-6" />
                </svg>
              ) : step.number}
            </span>
            <span className={isActive ? styles.activeLabel : styles.label}>
              {step.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
};

export default BookingSteps;
