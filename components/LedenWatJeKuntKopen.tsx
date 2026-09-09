import { KaartenMetGraphics } from "@/components/KaartenMetGraphics";
import {
  GraphicLaadpaal,
  GraphicThuisbatterij,
  GraphicZonnepanelen,
} from "@/components/ProductGraphics";

const kaarten = [
  {
    titel: "Zonnepanelen",
    graphic: GraphicZonnepanelen,
    beschrijving:
      "Zelf stroom opwekken. Hoe meer je daarvan direct zelf gebruikt, hoe gunstiger dat uitpakt.",
  },
  {
    titel: "Thuisbatterij",
    graphic: GraphicThuisbatterij,
    beschrijving:
      "Stroom die je overdag opwekt 's avonds zelf gebruiken in plaats van terugleveren.",
  },
  {
    titel: "Laadpaal",
    graphic: GraphicLaadpaal,
    beschrijving:
      "Thuis laden op je eigen stroom, met een installatie die op je meterkast is afgestemd.",
  },
];

export function LedenWatJeKuntKopen() {
  return (
    <KaartenMetGraphics
      headingId="wat-je-kunt-kopen"
      titel="Wat je kunt kopen"
      intro="Via de actie van je club krijg je korting op drie dingen. Wat in jouw situatie het meest oplevert, rekent Zonneplaneet uit in de offerte."
      kaarten={kaarten}
    />
  );
}
