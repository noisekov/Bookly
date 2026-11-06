import { useTranslation } from "react-i18next";
import type { CalendarEmployee, CalendarViewMode } from "../../types";
import { formatCalendarDate, formatWeekRange } from "../../utils/calendarDate";
import CalendarIcon from "../CalendarIcon/CalendarIcon";
import CalendarLegend from "../CalendarLegend/CalendarLegend";
import TeamFilter from "../TeamFilter/TeamFilter";
import styles from "./CalendarToolbar.module.css";

interface CalendarToolbarProps {
  date: Date;
  viewMode: CalendarViewMode;
  employees: CalendarEmployee[];
  selectedEmployeeIds: string[];
  onDateChange: (date: Date) => void;
  onToday: () => void;
  onViewModeChange: (mode: CalendarViewMode) => void;
  onToggleEmployee: (employeeId: string) => void;
  onSelectAllEmployees: () => void;
}

const CalendarToolbar = ({
  date,
  viewMode,
  employees,
  selectedEmployeeIds,
  onDateChange,
  onToday,
  onViewModeChange,
  onToggleEmployee,
  onSelectAllEmployees,
}: CalendarToolbarProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("ru") ? "ru-RU" : "en-GB";
  const dateLabel =
    viewMode === "day"
      ? formatCalendarDate(date, locale)
      : formatWeekRange(date, locale);
  const step = viewMode === "day" ? 1 : 7;

  const changeDate = (amount: number) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + amount * step);
    onDateChange(nextDate);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.mainRow}>
        <div className={styles.dateControls}>
          <button
            type="button"
            className={styles.todayButton}
            onClick={onToday}
          >
            {t("calendar.today", { defaultValue: "Today" })}
          </button>

          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label={t("calendar.previousPeriod", {
                defaultValue: "Previous period",
              })}
              onClick={() => changeDate(-1)}
            >
              <CalendarIcon name="chevron-left" />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              aria-label={t("calendar.nextPeriod", {
                defaultValue: "Next period",
              })}
              onClick={() => changeDate(1)}
            >
              <CalendarIcon name="chevron-right" />
            </button>
          </div>

          <h2 className={styles.dateTitle}>{dateLabel}</h2>
        </div>

        <div
          className={styles.viewSwitch}
          role="group"
          aria-label={t("calendar.viewMode", { defaultValue: "Calendar view" })}
        >
          <button
            type="button"
            className={
              viewMode === "day" ? styles.activeView : styles.viewButton
            }
            aria-pressed={viewMode === "day"}
            onClick={() => onViewModeChange("day")}
          >
            {t("calendar.day", { defaultValue: "Day" })}
          </button>
          <button
            type="button"
            className={
              viewMode === "week" ? styles.activeView : styles.viewButton
            }
            aria-pressed={viewMode === "week"}
            onClick={() => onViewModeChange("week")}
          >
            {t("calendar.week", { defaultValue: "Week" })}
          </button>
        </div>
      </div>

      <div className={styles.secondaryRow}>
        <TeamFilter
          employees={employees}
          selectedEmployeeIds={selectedEmployeeIds}
          onToggleEmployee={onToggleEmployee}
          onSelectAll={onSelectAllEmployees}
        />
        <CalendarLegend />
      </div>
    </div>
  );
};

export default CalendarToolbar;
