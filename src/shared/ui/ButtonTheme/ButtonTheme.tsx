import { useTheme } from "../../hooks/useTheme";
import styles from "./ButtonTheme.module.css";
const ButtonTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        className={`${styles.button} ${styles[`button--${theme}`]}`}
        onClick={toggleTheme}
      ></button>
    </>
  );
};

export default ButtonTheme;
