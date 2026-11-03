import { useTranslation } from "react-i18next";
import styles from "./Sidebar.module.css";
import SidebarBrand from "./components/SidebarBrand/SidebarBrand";
import WorkspaceSwitcher from "./components/WorkspaceSwitcher/WorkspaceSwitcher";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import SidebarPromo from "./components/SidebarPromo/SidebarPromo";
import SidebarProfile from "./components/SidebarProfile/SidebarProfile";

export interface SidebarProps {
  workspaceName?: string;
  workspaceType?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  bookingsCount?: number;
  bookingPageUrl?: string;
}

const Sidebar = ({
  workspaceName = "Bloom",
  workspaceType = "Beauty studio",
  userName = "Екатерина",
  userRole = "Владелец студии",
  userInitials = "EK",
  bookingsCount = 12,
  bookingPageUrl = "/booking/bloom",
}: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <aside className={styles.sidebar} aria-label={t("sidebar.workspaceNavigation")}>
      <SidebarBrand />

      <div className={styles.main}>
        <WorkspaceSwitcher name={workspaceName} description={workspaceType} />
        <SidebarNav bookingsCount={bookingsCount} />
        <SidebarPromo bookingPageUrl={bookingPageUrl} />
      </div>

      <SidebarProfile
        name={userName}
        role={userRole}
        initials={userInitials}
      />
    </aside>
  );
};

export default Sidebar;
