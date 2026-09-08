import type { HTMLAttributes, ReactNode } from "react";

type IconTegelProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  children: ReactNode;
  label?: string;
};

export function IconTegel({
  children,
  className = "",
  label,
  ...props
}: IconTegelProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={`inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-oranje text-navy [&>svg]:size-6 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
