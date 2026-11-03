import type { SVGProps } from "react";

export type HeaderIconName = "chevron-right" | "globe" | "bell";

interface HeaderIconProps extends SVGProps<SVGSVGElement> {
  name: HeaderIconName;
}

const HeaderIcon = ({ name, ...props }: HeaderIconProps) => {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      {...commonProps}
      {...props}
    >
      {name === "chevron-right" && <path d="m9 18 6-6-6-6" />}

      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21c-2.2-2.4-3.3-5.4-3.3-9S9.8 5.4 12 3Z" />
        </>
      )}

      {name === "bell" && (
        <>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
          <path d="M10 21h4" />
        </>
      )}
    </svg>
  );
};

export default HeaderIcon;
