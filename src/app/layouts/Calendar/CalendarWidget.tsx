import CalendarPage from "./CalendarPage";
import type { CalendarPageProps } from "./types";

/**
 * Public entry point for the calendar widget.
 * Keeps the existing CalendarWidget import while delegating all calendar
 * interactions and booking-modal state to CalendarPage.
 */
const CalendarWidget = (props: CalendarPageProps) => {
  return <CalendarPage {...props} />;
};

export default CalendarWidget;
