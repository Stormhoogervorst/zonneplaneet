import { PaginaHero } from "@/components/PaginaHero";

export function WinactieHero() {
  return (
    <PaginaHero
      eyebrow="WINACTIE"
      headingId="winactie-hero-titel"
      titel="TODO"
      alinea="TODO"
      foto={{
        src: "/zonnepanelen-woningen.jpg",
        alt: "Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken",
      }}
    />
  );
}
