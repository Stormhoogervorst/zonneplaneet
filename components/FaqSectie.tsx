import type { ReactNode } from "react";
import { Accordeon, Tag } from "@/components/ui";

export type FaqVraag = {
  antwoord: string;
  inhoud?: ReactNode;
  standaardOpen?: boolean;
  vraag: string;
};

type FaqSectieProps = {
  eyebrow: string;
  headingId: string;
  vragen: FaqVraag[];
};

/**
 * Smaller container dan de overige paginasecties: een FAQ leest slecht over
 * volle breedte. Kopblok gecentreerd, accordeon als rijen met haarlijnen.
 * Items staan dicht bij het laden, tenzij `standaardOpen` is gezet.
 * JSON-LD neemt alleen vragen met een antwoord op.
 */
export function FaqSectie({ eyebrow, headingId, vragen }: FaqSectieProps) {
  const vragenMetAntwoord = vragen.filter(
    (item) => item.antwoord.trim() !== "",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nl-NL",
    mainEntity: vragenMetAntwoord.map(({ vraag, antwoord }) => ({
      "@type": "Question",
      name: vraag,
      acceptedAnswer: {
        "@type": "Answer",
        text: antwoord,
      },
    })),
  };

  return (
    <section
      aria-labelledby={headingId}
      className="scroll-mt-[var(--hoogte-headerbalk)] bg-salderingsvlak py-20 md:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-[1000px] px-8 md:px-16">
        <div className="mb-16 text-center">
          <Tag className="mx-auto font-mono">{eyebrow}</Tag>
          <h2
            id={headingId}
            className="mt-10 text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal text-navy"
          >
            Veelgestelde vragen
          </h2>
        </div>

        <Accordeon
          variant="lijnen"
          items={vragenMetAntwoord.map((item) => ({
            vraag: item.vraag,
            antwoord: item.inhoud ?? item.antwoord,
            standaardOpen: item.standaardOpen,
          }))}
        />
      </div>
    </section>
  );
}
