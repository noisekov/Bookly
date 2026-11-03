import { useTranslation } from "react-i18next";

import type { SystemStatusKind } from "../../types";
import styles from "./SystemStatus.module.css";

interface SystemStatusProps {
  status?: SystemStatusKind;
}

const SystemStatus = ({ status = "online" }: SystemStatusProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.status} data-status={status}>
      <span className={styles.indicator} aria-hidden="true" />
      <span className={styles.label}>{t(`header.systemStatus.${status}`)}</span>
    </div>
  );
};

export default SystemStatus;
