import { useTranslation } from "react-i18next";

import type { HeaderUser } from "../../types";
import styles from "./UserMenu.module.css";

interface UserMenuProps {
  user: HeaderUser;
  onClick?: () => void;
}

const UserMenu = ({ user, onClick }: UserMenuProps) => {
  const { t } = useTranslation();

  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      aria-label={t("header.openProfile", { name: user.name })}
      title={user.name}
    >
      <span className={styles.avatar} aria-hidden="true">
        {user.initials}
      </span>
    </button>
  );
};

export default UserMenu;
