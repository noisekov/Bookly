import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.css";
import Sidebar from "../../app/layouts/DashboardLayout/components/Sidebar/Sidebar";
import Header from "../../app/layouts/DashboardLayout/components/Header";
import CalendarWidget from "../../app/layouts/Calendar";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles["main-wrapper"]}>
        <Header
          breadcrumbs={[
            {
              label: "Bloom",
              to: "/dashboard",
            },
            {
              label: t("calendar.title"),
            },
          ]}
          user={{
            name: "Екатерина",
            initials: "EK",
          }}
          notificationsCount={1}
          onNotificationsClick={() => {
            alert("Открыть панель уведомлений");
          }}
          onUserMenuClick={() => {
            alert("Открыть меню пользователя");
          }}
        />
        <main className={styles.content}>
          <CalendarWidget />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
