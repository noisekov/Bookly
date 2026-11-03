import { NavLink } from "react-router";
import type { SidebarIconName } from "../SidebarIcon/SidebarIcon";
import { SidebarIcon } from "../SidebarIcon/SidebarIcon";
import styles from "./SidebarNavItem.module.css";

interface SidebarNavItemProps {
  to: string;
  label: string;
  icon: SidebarIconName;
  badge?: number;
  end?: boolean;
}

const SidebarNavItem = ({ to, label, icon, badge, end }: SidebarNavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")
      }
      title={label}
    >
      <SidebarIcon name={icon} className={styles.icon} />
      <span className={styles.label}>{label}</span>
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </NavLink>
  );
};

export default SidebarNavItem;
