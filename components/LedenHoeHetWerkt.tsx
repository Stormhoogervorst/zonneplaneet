import { Tijdlijn } from "@/components/Tijdlijn";

const stappen = [
  {
    nummer: "01",
    titel: "Aanmelden",
    beschrijving:
      "Je vult het formulier in. We nemen binnen twee werkdagen contact op.",
  },
  {
    nummer: "02",
    titel: "Contact",
    beschrijving:
      "We bellen je binnen twee werkdagen om je situatie door te nemen.",
  },
  {
    nummer: "03",
    titel: "Offerte",
    beschrijving:
      "Je krijgt een vrijblijvende offerte met de ledenkorting er al op verwerkt.",
  },
  {
    nummer: "04",
    titel: "Installatie",
    beschrijving:
      "Na akkoord plannen we de installatie in. Je club ontvangt daarna haar vergoeding.",
  },
];

export function LedenHoeHetWerkt() {
  return (
    <Tijdlijn
      eyebrow="HOE HET WERKT"
      headingId="hoe-het-werkt"
      titel="Van aanmelding tot installatie"
      alinea="Je meldt je aan via het formulier. De rest gaat vanzelf."
      stappen={stappen}
    />
  );
}
