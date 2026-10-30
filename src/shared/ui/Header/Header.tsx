import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import ButtonTheme from "../ButtonTheme/ButtonTheme";
import styles from "./Header.module.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = () => {
    const nextLanguage = i18n.resolvedLanguage === "ru" ? "en" : "ru";
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <>
      <header className={styles.header}>
        <Button onClick={handleLanguageChange}>
          {t("header.switchLanguage")}
        </Button>
        <ButtonTheme></ButtonTheme>
      </header>
    </>
  );
};

export default Header;
