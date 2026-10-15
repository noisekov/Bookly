import Button from "../Button/Button";
import ButtonTheme from "../ButtonTheme/ButtonTheme";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Button onClick={() => console.log("Кнопка смены языка")}>
          Кнопка смены языка
        </Button>
        <ButtonTheme></ButtonTheme>
      </header>
    </>
  );
};

export default Header;
