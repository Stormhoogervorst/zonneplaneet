import type { HTMLAttributes, ReactNode } from "react";

type KaartProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Kaart({ children, className = "", ...props }: KaartProps) {
  const heeftAchtergrond = /(^|\s)bg-/.test(className);

  return (
    <div
      className={`rounded-3xl p-6 md:p-8 ${heeftAchtergrond ? "" : "bg-vlak"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
