import type { ReactNode, SVGProps } from "react";

export type CalendarIconName =
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "users";

interface CalendarIconProps extends SVGProps<SVGSVGElement> {
  name: CalendarIconName;
  size?: number;
}

const CalendarIcon = ({ name, size = 16, ...props }: CalendarIconProps) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<CalendarIconName, ReactNode> = {
    "chevron-left": <path d="m10 5-5 5 5 5" />,
    "chevron-right": <path d="m6 5 5 5-5 5" />,
    "chevron-down": <path d="m5 7 5 5 5-5" />,
    users: (
      <>
        <path d="M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20" />
        <circle cx="10" cy="7" r="3.5" />
        <path d="M20 20v-1.5a4 4 0 0 0-2.8-3.8M16.5 3.7a3.5 3.5 0 0 1 0 6.7" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      {...common}
      {...props}
    >
      {paths[name]}
    </svg>
  );
};

export default CalendarIcon;
