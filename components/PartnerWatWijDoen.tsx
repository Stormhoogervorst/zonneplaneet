import { KaartenMetGraphics } from "@/components/KaartenMetGraphics";
import {
  GraphicAanspreekpunt,
  GraphicGevolgd,
  GraphicKlaargezet,
} from "@/components/WaardeGraphics";

const kaarten = [
  {
    titel: "Alles staat klaar",
    graphic: GraphicKlaargezet,
    beschrijving:
      "De club krijgt een eigen pagina, een poster met QR-code en een kant-en-klare nieuwsbrieftekst.",
  },
  {
    titel: "Elke aanmelding gevolgd",
    graphic: GraphicGevolgd,
    beschrijving:
      "We houden bij wat er met elke aanmelding gebeurt, van eerste contact tot installatie.",
  },
  {
    titel: "De club blijft erbuiten",
    graphic: GraphicAanspreekpunt,
    beschrijving:
      "Leden melden zich zelf aan. De club deelt geen ledengegevens en voert geen verkoopgesprekken.",
  },
];

export function PartnerWatWijDoen() {
  return (
    <KaartenMetGraphics
      headingId="wat-wij-doen"
      titel="Wat wij doen"
      intro="De club deelt de actie. Wij leveren, installeren en regelen alles daartussenin, zodat het bestuur er geen werk aan heeft."
      kaarten={kaarten}
      voettekst="Het bestuur hoeft niets te schrijven of te ontwerpen. Elke maand krijgt het bestuur een overzicht van de aanmeldingen, en er is één aanspreekpunt."
    />
  );
}
