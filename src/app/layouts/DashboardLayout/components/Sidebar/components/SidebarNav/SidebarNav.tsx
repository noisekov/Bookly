import { useTranslation } from "react-i18next";
import SidebarNavItem from "../SidebarNavItem/SidebarNavItem";
import styles from "./SidebarNav.module.css";

interface SidebarNavProps {
  bookingsCount?: number;
}

const SidebarNav = ({ bookingsCount }: SidebarNavProps) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav} aria-label={t("sidebar.workspaceNavigation")}>
      <div className={styles.group}>
        <p className={styles.heading}>{t("sidebar.workspaceSection")}</p>
        <SidebarNavItem to="/dashboard" end icon="grid" label={t("sidebar.overview")} />
        <SidebarNavItem to="/dashboard/calendar" icon="calendar" label={t("sidebar.calendar")} />
        <SidebarNavItem
          to="/dashboard/bookings"
          icon="bookings"
          label={t("sidebar.bookings")}
          badge={bookingsCount}
        />
        <SidebarNavItem to="/dashboard/clients" icon="clients" label={t("sidebar.clients")} />
        <SidebarNavItem to="/dashboard/team" icon="team" label={t("sidebar.team")} />
        <SidebarNavItem to="/dashboard/services" icon="services" label={t("sidebar.services")} />
      </div>

      <div className={styles.group}>
        <SidebarNavItem to="/dashboard/settings" icon="settings" label={t("sidebar.settings")} />
        <SidebarNavItem to="/dashboard/help" icon="help" label={t("sidebar.help")} />
      </div>
    </nav>
  );
};

export default SidebarNav;
