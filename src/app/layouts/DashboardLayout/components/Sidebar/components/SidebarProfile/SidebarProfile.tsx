import styles from "./SidebarProfile.module.css";

interface SidebarProfileProps {
  name: string;
  role: string;
  initials: string;
}

const SidebarProfile = ({ name, role, initials }: SidebarProfileProps) => {
  return (
    <div className={styles.profile}>
      <span className={styles.avatar}>{initials}</span>
      <span className={styles.details}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
      </span>
    </div>
  );
};

export default SidebarProfile;
