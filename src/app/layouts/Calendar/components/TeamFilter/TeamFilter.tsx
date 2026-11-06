import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CalendarEmployee } from "../../types";
import CalendarIcon from "../CalendarIcon/CalendarIcon";
import styles from "./TeamFilter.module.css";

interface TeamFilterProps {
  employees: CalendarEmployee[];
  selectedEmployeeIds: string[];
  onToggleEmployee: (employeeId: string) => void;
  onSelectAll: () => void;
}

const TeamFilter = ({
  employees,
  selectedEmployeeIds,
  onToggleEmployee,
  onSelectAll,
}: TeamFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const allSelected = selectedEmployeeIds.length === employees.length;

  const label = allSelected
    ? t("calendar.allTeamMembers", { defaultValue: "All team members" })
    : selectedEmployeeIds.length === 1
      ? employees.find((employee) => employee.id === selectedEmployeeIds[0])?.name
      : t("calendar.selectedTeamMembers", {
          count: selectedEmployeeIds.length,
          defaultValue: "{{count}} team members",
        });

  return (
    <div className={styles.filter}>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((value) => !value)}
      >
        <CalendarIcon name="users" size={15} />
        <span>{label}</span>
        <CalendarIcon name="chevron-down" size={16} />
      </button>

      {isOpen && (
        <div className={styles.popover} role="group" aria-label={t("calendar.teamMembers", { defaultValue: "Team members" })}>
          <button
            type="button"
            className={styles.selectAll}
            onClick={onSelectAll}
          >
            {t("calendar.allTeamMembers", { defaultValue: "All team members" })}
          </button>

          {employees.map((employee) => (
            <label className={styles.option} key={employee.id}>
              <input
                type="checkbox"
                checked={selectedEmployeeIds.includes(employee.id)}
                onChange={() => onToggleEmployee(employee.id)}
              />
              <span className={`${styles.avatar} ${styles[employee.color]}`}>
                {employee.initials}
              </span>
              <span className={styles.employeeName}>{employee.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamFilter;
