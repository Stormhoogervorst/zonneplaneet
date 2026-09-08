import { Accordeon, Tag } from "@/components/ui";

/* Eén bron voor de accordeon en het FAQPage-schema, zodat de zichtbare tekst
   en het schema niet uit elkaar kunnen lopen. */
const vragen = [
  {
    vraag: "Krijgt de club persoonsgegevens van leden?",
    antwoord:
      "Nee. Aanmeldingen gaan rechtstreeks naar ons en Zonneplaneet. De club ontvangt alleen het maandelijkse overzicht zonder persoonsgegevens.",
  },
  {
    vraag: "Wie behandelt vragen van leden?",
    antwoord:
      "Zonneplaneet behandelt vragen over producten, offertes, verkoop en installatie.",
  },
  {
    vraag: "Wanneer ontvangt de club een vergoeding?",
    antwoord:
      "De vergoeding ontstaat nadat Zonneplaneet een installatie heeft uitgevoerd.",
  },
  {
    vraag: "Verplicht een aanmelding de club tot deelname?",
    antwoord:
      "Nee. De aanmelding is een verzoek om contact. We leggen de afspraken vast voordat de actie begint.",
  },
];

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

/**
 * Smaller container dan de overige partnersecties: een FAQ leest slecht over
 * volle breedte. Kopblok gecentreerd, accordeon als rijen met haarlijnen.
 * Alle items staan dicht bij het laden.
 */
export function PartnerFaq() {
  return (
    <section
      aria-labelledby="faq-bestuurders"
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
          <Tag className="mx-auto px-4 py-2 font-mono text-[0.8125rem]">
            VOOR BESTUURDERS
          </Tag>
          <h2
            id="faq-bestuurders"
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
