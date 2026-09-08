import type { HTMLAttributes, ReactNode } from "react";

type KaartProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Kaart({ children, className = "", ...props }: KaartProps) {
  return (
    <div className={`rounded-3xl bg-vlak p-6 md:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
