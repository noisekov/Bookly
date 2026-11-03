export interface HeaderBreadcrumb {
  label: string;
  to?: string;
}

export interface HeaderUser {
  name: string;
  initials: string;
}

export type SystemStatusKind = "online" | "degraded" | "offline";
