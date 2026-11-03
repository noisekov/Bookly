import { Fragment } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import HeaderIcon from "../HeaderIcon/HeaderIcon";
import type { HeaderBreadcrumb } from "../../types";
import styles from "./Breadcrumbs.module.css";

interface BreadcrumbsProps {
  items: HeaderBreadcrumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label={t("header.breadcrumbsLabel")}>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <HeaderIcon name="chevron-right" className={styles.separator} />
            )}

            {item.to && !isCurrent ? (
              <Link className={styles.link} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span
                className={isCurrent ? styles.current : styles.label}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
