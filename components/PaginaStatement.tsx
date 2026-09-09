import type { ComponentProps } from "react";
import { Knop } from "@/components/ui";

type PaginaStatementProps = {
  headingId: string;
  knopHref: ComponentProps<typeof Knop>["href"];
  knopLabel: string;
  tekst: string;
};

/**
 * Zelfde patroon als `HomepageIntro`: één grote alinea en een pil met een
 * losse pijlcirkel op het lichte vlak. `/partner` en `/leden` delen deze opzet.
 */
export function PaginaStatement({
  headingId,
  knopHref,
  knopLabel,
  tekst,
}: PaginaStatementProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id={headingId}
          className="max-w-[62ch] [overflow-wrap:normal] text-[clamp(1.5rem,3vw,2rem)] leading-[1.35] font-normal hyphens-none text-navy [word-break:normal]"
        >
          {tekst}
        </h2>

        <Knop href={knopHref} variant="extern" metPijl className="mt-8">
          {knopLabel}
        </Knop>
      </div>
    </section>
  );
}
