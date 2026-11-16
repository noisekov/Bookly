import { useTranslation } from "react-i18next";

import type { CalendarEmployee } from "../../../../types";
import SpecialistOption from "../SpecialistOption/SpecialistOption";
import styles from "./SpecialistSelectionStep.module.css";

interface SpecialistSelectionStepProps {
  employees: CalendarEmployee[];
  selectedSpecialistId: string;
  onSelect: (specialistId: string) => void;
}

const SpecialistSelectionStep = ({
  employees,
  selectedSpecialistId,
  onSelect,
}: SpecialistSelectionStepProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.list}
      role="radiogroup"
      aria-label={t("bookingWizard.specialistsLabel")}
    >
      <SpecialistOption
        id="any"
        name={t("bookingWizard.anyAvailable")}
        description={t("bookingWizard.moreAvailability")}
        isSelected={selectedSpecialistId === "any"}
        isAnyAvailable
        onSelect={() => onSelect("any")}
      />

      {employees.map((employee) => (
        <SpecialistOption
          key={employee.id}
          id={employee.id}
          name={t(`bookingWizard.specialists.${employee.id}.name`, {
            defaultValue: employee.name,
          })}
          description={t(`bookingWizard.specialists.${employee.id}.role`, {
            defaultValue: employee.role,
          })}
          initials={employee.initials}
          color={employee.color}
          isSelected={selectedSpecialistId === employee.id}
          onSelect={() => onSelect(employee.id)}
        />
      ))}
    </div>
  );
};

export default SpecialistSelectionStep;
