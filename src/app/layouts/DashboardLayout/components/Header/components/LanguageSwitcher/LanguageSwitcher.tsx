import { useTranslation } from "react-i18next";

import HeaderIcon from "../HeaderIcon/HeaderIcon";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith("ru")
    ? "ru"
    : "en";
  const nextLanguage = currentLanguage === "ru" ? "en" : "ru";

  const handleLanguageChange = () => {
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleLanguageChange}
      aria-label={t("header.switchLanguage", {
        language: nextLanguage.toUpperCase(),
      })}
      title={t("header.switchLanguage", {
        language: nextLanguage.toUpperCase(),
      })}
    >
      <HeaderIcon name="globe" className={styles.icon} />
      <span>{currentLanguage.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
