import { useTranslation } from "react-i18next";
import type { CalendarService } from "../../../../types";
import ServiceOption from "../ServiceOption/ServiceOption";
import styles from "./ServiceSelectionStep.module.css";

interface ServiceSelectionStepProps {
  services: CalendarService[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}

const ServiceSelectionStep = ({
  services,
  selectedServiceId,
  onSelect,
}: ServiceSelectionStepProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.serviceList}
      role="radiogroup"
      aria-label={t("bookingWizard.servicesLabel")}
    >
      {services.map((service) => (
        <ServiceOption
          key={service.id}
          service={service}
          isSelected={service.id === selectedServiceId}
          onSelect={() => onSelect(service.id)}
        />
      ))}
    </div>
  );
};

export default ServiceSelectionStep;
