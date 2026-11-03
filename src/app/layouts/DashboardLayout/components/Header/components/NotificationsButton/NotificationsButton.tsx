import { useTranslation } from "react-i18next";

import HeaderIcon from "../HeaderIcon/HeaderIcon";
import styles from "./NotificationsButton.module.css";

interface NotificationsButtonProps {
  unreadCount?: number;
  onClick?: () => void;
}

const NotificationsButton = ({
  unreadCount = 0,
  onClick,
}: NotificationsButtonProps) => {
  const { t } = useTranslation();
  const label = unreadCount > 0
    ? t("header.notificationsWithUnread", { count: unreadCount })
    : t("header.notifications");

  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <HeaderIcon name="bell" className={styles.icon} />
      {unreadCount > 0 && <span className={styles.indicator} aria-hidden="true" />}
    </button>
  );
};

export default NotificationsButton;
