import type { HTMLAttributes, ReactNode } from "react";

type SectieBreedte = "tekst" | "overzicht";

type SectieProps = HTMLAttributes<HTMLElement> & {
  breedte?: SectieBreedte;
  children: ReactNode;
};

const breedteClasses: Record<SectieBreedte, string> = {
  tekst: "max-w-2xl",
  overzicht: "max-w-5xl",
};

export function Sectie({
  breedte = "overzicht",
  children,
  className = "",
  ...props
}: SectieProps) {
  return (
    <section className={`py-20 lg:py-32 ${className}`} {...props}>
      <div className={`mx-auto px-5 ${breedteClasses[breedte]}`}>
        {children}
      </div>
    </section>
  );
}
