import styles from "./TimeSlot.module.css";

interface TimeSlotProps {
  time: string;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: () => void;
  unavailableLabel: string;
}

const TimeSlot = ({
  time,
  isAvailable,
  isSelected,
  onSelect,
  unavailableLabel,
}: TimeSlotProps) => {
  const className = [
    styles.slot,
    isSelected ? styles.selected : "",
  ].filter(Boolean).join(" ");

  return (
    <button
      className={className}
      type="button"
      disabled={!isAvailable}
      aria-pressed={isSelected}
      aria-label={`${time}${isAvailable ? "" : `, ${unavailableLabel}`}`}
      onClick={onSelect}
    >
      {time}
    </button>
  );
};

export default TimeSlot;
