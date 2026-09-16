import { PaginaHero } from "@/components/PaginaHero";
import { STANDAARD_VERGOEDING } from "@/lib/clubs";

export function PartnerHero() {
  return (
    <PaginaHero
      eyebrow="VOOR CLUBS"
      headingId="partner-hero-titel"
      titel="Een actie die je clubkas laat meeprofiteren"
      alinea={`Je vereniging deelt de actie met haar leden. Meer hoeft de club niet te doen. Elke installatie levert de clubkas ${STANDAARD_VERGOEDING} op, zonder kosten en zonder risico.`}
      foto={{
        src: "/zonnepanelen-bedrijfsdak.jpg",
        alt: "Lange rijen zonnepanelen op het dak van een bedrijfshal",
      }}
    />
  );
}
