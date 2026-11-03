import { Link } from "react-router";
import styles from "./SidebarBrand.module.css";

const SidebarBrand = () => {
  return (
    <Link className={styles.brand} to="/dashboard" aria-label="Bookly — на главную">
      <span className={styles.mark} aria-hidden="true">b</span>
      <span className={styles.wordmark}>bookly<span>.</span></span>
    </Link>
  );
};

export default SidebarBrand;
