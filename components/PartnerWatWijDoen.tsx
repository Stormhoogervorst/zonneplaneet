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
      "De club krijgt een eigen pagina, een poster met QR-code en een kant-en-klare nieuwsbrieftekst. Het bestuur hoeft niets te schrijven of te ontwerpen.",
  },
  {
    titel: "Elke aanmelding gevolgd",
    graphic: GraphicGevolgd,
    beschrijving:
      "We houden bij wat er met elke aanmelding gebeurt, van eerste contact tot installatie. Elke maand krijgt het bestuur daar een overzicht van.",
  },
  {
    titel: "De club blijft erbuiten",
    graphic: GraphicAanspreekpunt,
    beschrijving:
      "Leden melden zich zelf aan, dus de club deelt geen ledengegevens en voert geen verkoopgesprekken. Wij zijn het enige aanspreekpunt.",
  },
];

export function PartnerWatWijDoen() {
  return (
    <KaartenMetGraphics
      headingId="wat-wij-doen"
      titel="Wat wij doen"
      intro="De club deelt de actie en Zonneplaneet installeert. Alles daartussenin regelen wij, zodat het bestuur er geen werk aan heeft."
      kaarten={kaarten}
    />
  );
}
