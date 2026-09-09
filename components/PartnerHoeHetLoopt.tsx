import { Tijdlijn } from "@/components/Tijdlijn";

const stappen = [
  {
    nummer: "01",
    titel: "Aanmelden",
    beschrijving:
      "Het lid meldt zich aan op de clubpagina en krijgt meteen een bevestiging met de clubcode.",
  },
  {
    nummer: "02",
    titel: "Offerte",
    beschrijving:
      "Zonneplaneet neemt binnen twee werkdagen contact op en zet de ledenkorting op de offerte.",
  },
  {
    nummer: "03",
    titel: "Installatie",
    beschrijving:
      "Na akkoord plant Zonneplaneet de installatie in. De club hoeft hier niets voor te doen.",
  },
  {
    nummer: "04",
    titel: "Uitbetaling",
    beschrijving:
      "Na installatie ontvangt de club haar vergoeding. Elke maand krijgt het bestuur een overzicht van aanmeldingen, offertes en installaties.",
  },
];

export function PartnerHoeHetLoopt() {
  return (
    <Tijdlijn
      eyebrow="HOE HET LOOPT"
      headingId="hoe-het-loopt"
      titel="Van aanmelding tot uitbetaling"
      alinea="De club deelt de actie, de leden melden zich zelf aan en Zonneplaneet doet de rest. Elke maand krijgt het bestuur een overzicht."
      stappen={stappen}
    />
  );
}
