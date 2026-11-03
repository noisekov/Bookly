import ButtonTheme from "../../../../../shared/ui/ButtonTheme/ButtonTheme";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import SystemStatus from "./components/SystemStatus/SystemStatus";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import NotificationsButton from "./components/NotificationsButton/NotificationsButton";
import UserMenu from "./components/UserMenu/UserMenu";
import type { HeaderBreadcrumb, HeaderUser, SystemStatusKind } from "./types";
import styles from "./Header.module.css";

interface HeaderProps {
  breadcrumbs: HeaderBreadcrumb[];
  user: HeaderUser;
  systemStatus?: SystemStatusKind;
  notificationsCount?: number;
  onNotificationsClick?: () => void;
  onUserMenuClick?: () => void;
}

const Header = ({
  breadcrumbs,
  user,
  systemStatus = "online",
  notificationsCount = 0,
  onNotificationsClick,
  onUserMenuClick,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className={styles.actions}>
        <SystemStatus status={systemStatus} />
        <LanguageSwitcher />
        <div className={styles.themeSwitcher}>
          <ButtonTheme />
        </div>
        <NotificationsButton
          unreadCount={notificationsCount}
          onClick={onNotificationsClick}
        />
        <UserMenu user={user} onClick={onUserMenuClick} />
      </div>
    </header>
  );
};

export default Header;
