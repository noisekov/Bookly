import { useTranslation } from "react-i18next";
import { SidebarIcon } from "../SidebarIcon/SidebarIcon";
import styles from "./WorkspaceSwitcher.module.css";

interface WorkspaceSwitcherProps {
  name: string;
  description: string;
}

const WorkspaceSwitcher = ({ name, description }: WorkspaceSwitcherProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.workspace} aria-label={t("sidebar.workspace")}>
      <span className={styles.avatar} aria-hidden="true">{name.charAt(0)}</span>
      <span className={styles.details}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <SidebarIcon name="chevron-down" className={styles.chevron} />
    </div>
  );
};

export default WorkspaceSwitcher;
