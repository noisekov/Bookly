import { useState } from "react";
import type {
  CalendarBooking,
  CalendarWidgetProps as CalendarWidgetProps,
  CalendarSlotSelection,
  CalendarViewMode,
} from "./types";
import { mockBookings, mockEmployees } from "./data/mockCalendarData";
import CalendarToolbar from "./components/CalendarToolbar/CalendarToolbar";
import DayView from "./components/DayView/DayView";
import WeekView from "./components/WeekView/WeekView";
import CreateBookingModal from "./components/CreateBookingModal/CreateBookingModal";
import EditBookingModal from "./components/EditBookingModal/EditBookingModal";
import { useTranslation } from "react-i18next";
import styles from "./CalendarWidget.module.css";

type CalendarModalState =
  | { type: "create"; slot: CalendarSlotSelection }
  | { type: "edit"; booking: CalendarBooking }
  | null;

const DEMO_INITIAL_DATE = new Date(2026, 5, 22);

const CalendarWidget = ({
  employees = mockEmployees,
  bookings = mockBookings,
  initialDate = DEMO_INITIAL_DATE,
}: CalendarWidgetProps) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(() => new Date(initialDate));
  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>(() =>
    employees.map((employee) => employee.id),
  );
  const [modal, setModal] = useState<CalendarModalState>(null);

  const visibleEmployees = employees.filter((employee) =>
    selectedEmployeeIds.includes(employee.id),
  );
  const visibleBookings = bookings.filter((booking) =>
    selectedEmployeeIds.includes(booking.employeeId),
  );

  const handleToggleEmployee = (employeeId: string) => {
    setSelectedEmployeeIds((current) =>
      current.includes(employeeId)
        ? current.filter((id) => id !== employeeId)
        : [...current, employeeId],
    );
  };

  const handleSelectAllEmployees = () => {
    setSelectedEmployeeIds(employees.map((employee) => employee.id));
  };

  const handleSlotClick = (slot: CalendarSlotSelection) => {
    setModal({ type: "create", slot });
    alert("create");
  };

  const handleBookingClick = (booking: CalendarBooking) => {
    setModal({ type: "edit", booking });
    alert("edit");
  };

  const handleCloseModal = () => setModal(null);

  return (
    <section
      className={styles.calendar}
      aria-label={t("calendar.title", { defaultValue: "Calendar" })}
    >
      <CalendarToolbar
        date={date}
        viewMode={viewMode}
        employees={employees}
        selectedEmployeeIds={selectedEmployeeIds}
        onDateChange={setDate}
        onToday={() => setDate(new Date())}
        onViewModeChange={setViewMode}
        onToggleEmployee={handleToggleEmployee}
        onSelectAllEmployees={handleSelectAllEmployees}
      />

      {viewMode === "day" ? (
        <DayView
          date={date}
          employees={visibleEmployees}
          bookings={visibleBookings}
          onSlotClick={handleSlotClick}
          onBookingClick={handleBookingClick}
        />
      ) : (
        <WeekView
          date={date}
          bookings={visibleBookings}
          onSlotClick={handleSlotClick}
          onBookingClick={handleBookingClick}
        />
      )}

      <footer className={styles.footer}>
        <span>
          {t("calendar.emptySlotHint", {
            defaultValue: "Click an empty time slot to create a booking",
          })}
        </span>
        <span>
          {t("calendar.timezone", { defaultValue: "Europe/Amsterdam" })}
        </span>
      </footer>

      <CreateBookingModal
        isOpen={modal?.type === "create"}
        initialSlot={modal?.type === "create" ? modal.slot : null}
        onClose={handleCloseModal}
      />
      <EditBookingModal
        isOpen={modal?.type === "edit"}
        booking={modal?.type === "edit" ? modal.booking : null}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default CalendarWidget;
