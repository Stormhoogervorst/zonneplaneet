import type { HTMLAttributes, ReactNode } from "react";

type SectieKopVariant = "links" | "midden";

type SectieKopProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  variant?: SectieKopVariant;
};

const variantClasses: Record<SectieKopVariant, string> = {
  links: "text-left",
  midden: "text-center",
};

export function SectieKop({
  children,
  className = "",
  variant = "midden",
  ...props
}: SectieKopProps) {
  return (
    <h2
      className={`text-display-l text-navy ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}
