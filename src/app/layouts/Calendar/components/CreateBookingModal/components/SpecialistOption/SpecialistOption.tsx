import type { BookingColor } from "../../../../types";
import styles from "./SpecialistOption.module.css";

interface SpecialistOptionProps {
  id: string;
  name: string;
  description: string;
  initials?: string;
  color?: BookingColor;
  isSelected: boolean;
  isAnyAvailable?: boolean;
  onSelect: () => void;
}

const colorStyles: Record<BookingColor, string> = {
  violet: styles.violet,
  orange: styles.orange,
  blue: styles.blue,
};

const SpecialistOption = ({
  id,
  name,
  description,
  initials,
  color = "violet",
  isSelected,
  isAnyAvailable = false,
  onSelect,
}: SpecialistOptionProps) => {
  const optionClassName = [
    styles.option,
    isSelected ? styles.selected : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={optionClassName}
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-labelledby={`${id}-name`}
      aria-describedby={`${id}-description`}
      onClick={onSelect}
    >
      <span className={styles.identity}>
        <span className={styles.avatarOuter} aria-hidden="true">
          <span
            className={`${styles.avatar} ${
              isAnyAvailable ? styles.anyAvatar : colorStyles[color]
            }`}
          >
            {isAnyAvailable ? (
              <svg viewBox="0 0 24 24">
                <path d="M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 11a3 3 0 0 0 0-6M17 14.5a4 4 0 0 1 3 3.9V20" />
              </svg>
            ) : (
              initials
            )}
          </span>
        </span>

        <span className={styles.details}>
          <span className={styles.name} id={`${id}-name`}>
            {name}
          </span>
          <span className={styles.description} id={`${id}-description`}>
            {description}
          </span>
        </span>
      </span>

      <span className={styles.radio} aria-hidden="true">
        {isSelected && <span className={styles.radioMark} />}
      </span>
    </button>
  );
};

export default SpecialistOption;
