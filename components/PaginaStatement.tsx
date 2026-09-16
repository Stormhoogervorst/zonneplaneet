import type { ComponentProps, ReactNode } from "react";
import { Knop, Tag } from "@/components/ui";

type PaginaStatementProps = {
  headingId: string;
  tekst: string;
  children?: ReactNode;
  eyebrow?: string;
  knopHref?: ComponentProps<typeof Knop>["href"];
  knopLabel?: string;
};

/**
 * Zelfde patroon als `HomepageIntro`: één grote alinea op het lichte vlak,
 * optioneel een eyebrow erboven en een pil met een losse pijlcirkel eronder.
 * `/partner` en `/leden` delen deze opzet.
 */
export function PaginaStatement({
  headingId,
  tekst,
  children,
  eyebrow,
  knopHref,
  knopLabel,
}: PaginaStatementProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        {eyebrow ? <Tag>{eyebrow}</Tag> : null}

        <h2
          id={headingId}
          className={`${eyebrow ? "mt-6" : ""} max-w-[62ch] [overflow-wrap:normal] text-[clamp(1.5rem,3vw,2rem)] leading-[1.35] font-normal hyphens-none text-navy [word-break:normal]`}
        >
          {tekst}
        </h2>

        {children}

        {knopHref && knopLabel ? (
          <Knop href={knopHref} variant="extern" metPijl className="mt-8">
            {knopLabel}
          </Knop>
        ) : null}
      </div>
    </section>
  );
}
