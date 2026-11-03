import type { ReactNode } from "react";

export type SidebarIconName =
  | "grid"
  | "calendar"
  | "bookings"
  | "clients"
  | "team"
  | "services"
  | "settings"
  | "help"
  | "external"
  | "chevron-down";

interface SidebarIconProps {
  name: SidebarIconName;
  className?: string;
}

const paths: Record<SidebarIconName, ReactNode> = {
  grid: (
    <>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18M8 14h3M8 17h3" />
    </>
  ),
  bookings: (
    <>
      <path d="M8.5 8.5 6.8 6.8a3.5 3.5 0 0 0-5 5l3 3a3.5 3.5 0 0 0 5 0l2-2" />
      <path d="m15.5 15.5 1.7 1.7a3.5 3.5 0 0 0 5-5l-3-3a3.5 3.5 0 0 0-5 0l-2 2" />
      <path d="m8 16 8-8" />
    </>
  ),
  clients: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20v-1.5A5.5 5.5 0 0 1 8 13h2a5.5 5.5 0 0 1 5.5 5.5V20" />
      <path d="M16 4.8a3.5 3.5 0 0 1 0 6.5M17 14a5 5 0 0 1 4.5 5v1" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 20v-1.3A5.3 5.3 0 0 1 7.8 13h2.4a5.3 5.3 0 0 1 5.3 5.3V20M16 14a4.5 4.5 0 0 1 5.5 4.4V20" />
    </>
  ),
  services: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <path d="M8 3.5v5M15 9.5v5M10 15.5v5" />
    </>
  ),
  settings: (
    <>
      <path d="M12 3.2 14 4l2-.2 1.2 1.7 1.9.8.2 2.1 1.1 1.7-.9 1.9.1 2.1-1.7 1.2-.8 1.9-2.1.2-1.7 1.1-1.9-.9-2.1.1-1.2-1.7-1.9-.8-.2-2.1-1.1-1.7.9-1.9-.1-2.1 1.7-1.2.8-1.9 2.1-.2L12 3.2Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.6 2.6 0 1 1 4.4 1.9c-1.2 1-1.9 1.4-1.9 3" />
      <path d="M12 17.5h.01" />
    </>
  ),
  external: (
    <>
      <path d="M13 4h7v7M20 4l-9 9" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
};

export const SidebarIcon = ({ name, className }: SidebarIconProps) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {paths[name]}
  </svg>
);
