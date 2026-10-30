import { useTranslation } from "react-i18next";
import Header from "../../shared/ui/Header/Header";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>{t("main.logo")}</aside>
      <div className={styles["main-wrapper"]}>
        <Header></Header>
        <main className={styles.content}>{t("main.widgets")}</main>
      </div>
    </div>
  );
};

export default HomePage;
