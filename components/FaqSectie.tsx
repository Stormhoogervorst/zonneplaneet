import { Accordeon, Tag } from "@/components/ui";

export type FaqVraag = {
  antwoord: string;
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
 * Alle items staan dicht bij het laden.
 */
export function FaqSectie({ eyebrow, headingId, vragen }: FaqSectieProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nl-NL",
    mainEntity: vragen.map(({ vraag, antwoord }) => ({
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
          <Tag className="mx-auto font-mono">
            {eyebrow}
          </Tag>
          <h2
            id={headingId}
            className="mt-10 text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-normal text-navy"
          >
            Veelgestelde vragen
          </h2>
        </div>

        <Accordeon variant="lijnen" items={vragen} />
      </div>
    </section>
  );
}
