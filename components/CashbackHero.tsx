import { PaginaHero } from "@/components/PaginaHero";

export function CashbackHero() {
  return (
    <PaginaHero
      eyebrow="CASHBACK"
      headingId="cashback-hero-titel"
      titel="TODO"
      alinea="TODO"
      foto={{
        src: "/zonnepanelen-bedrijfsdak.jpg",
        alt: "Lange rijen zonnepanelen op het dak van een bedrijfshal",
      }}
    />
  );
}
