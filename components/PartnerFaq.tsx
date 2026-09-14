import { FaqSectie } from "@/components/FaqSectie";

/* Eén bron voor de accordeon en het FAQPage-schema, zodat de zichtbare tekst
   en het schema niet uit elkaar kunnen lopen. */
const vragen = [
  {
    vraag: "Krijgt de club persoonsgegevens van leden?",
    antwoord:
      "Nee. Aanmeldingen komen rechtstreeks bij ons binnen. De club ontvangt alleen het maandelijkse overzicht zonder persoonsgegevens.",
  },
  {
    vraag: "Wie behandelt vragen van leden?",
    antwoord:
      "Wij behandelen vragen over producten, offertes, verkoop en installatie.",
  },
  {
    vraag: "Wanneer ontvangt de club een vergoeding?",
    antwoord:
      "De vergoeding ontstaat nadat we een installatie hebben uitgevoerd.",
  },
  {
    vraag: "Verplicht een aanmelding de club tot deelname?",
    antwoord:
      "Nee. De aanmelding is een verzoek om contact. We leggen de afspraken vast voordat de actie begint.",
  },
];

export function PartnerFaq() {
  return (
    <FaqSectie
      eyebrow="VOOR BESTUURDERS"
      headingId="faq-bestuurders"
      vragen={vragen}
    />
  );
}
