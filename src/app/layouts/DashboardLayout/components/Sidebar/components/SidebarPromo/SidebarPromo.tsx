import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { SidebarIcon } from "../SidebarIcon/SidebarIcon";
import styles from "./SidebarPromo.module.css";

interface SidebarPromoProps {
  bookingPageUrl: string;
}

const SidebarPromo = ({ bookingPageUrl }: SidebarPromoProps) => {
  const { t } = useTranslation();

  return (
    <section className={styles.promo} aria-labelledby="sidebar-promo-title">
      <span className={styles.promoIcon} aria-hidden="true">
        <SidebarIcon name="bookings" />
      </span>
      <h2 className={styles.title} id="sidebar-promo-title">
        {t("sidebar.onlineBooking")}
      </h2>
      <p className={styles.description}>{t("sidebar.onlineBookingDescription")}</p>
      <Link className={styles.link} to={bookingPageUrl}>
        <span>{t("sidebar.openBookingPage")}</span>
        <SidebarIcon name="external" className={styles.externalIcon} />
      </Link>
    </section>
  );
};

export default SidebarPromo;
