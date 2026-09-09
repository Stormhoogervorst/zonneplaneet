import { PaginaHero } from "@/components/PaginaHero";

export function LedenHero() {
  return (
    <PaginaHero
      eyebrow="VOOR LEDEN"
      headingId="leden-hero-titel"
      titel="Koop je zonnepanelen via je eigen club"
      alinea="Ben je lid van een aangesloten vereniging, dan koop je zonnepanelen, een thuisbatterij of een laadpaal met ledenkorting. En je club verdient aan elke installatie."
      foto={{
        src: "/zonnepanelen-woningen.jpg",
        alt: "Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken",
      }}
    />
  );
}
