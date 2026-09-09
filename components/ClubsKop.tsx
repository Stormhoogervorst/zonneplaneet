import { PaginaHero } from "@/components/PaginaHero";

/**
 * Kopblok van `/clubs`: dezelfde opzet als `/partner`, zonder de foto eronder.
 * Daaronder volgt het ijsblauwe zoekvlak.
 */
export function ClubsKop() {
  return (
    <PaginaHero
      eyebrow="VOOR LEDEN"
      headingId="clubs-kop-titel"
      titel="Zoek je vereniging"
      alinea="Vind je club en meld je aan op haar eigen pagina. Daar staat precies welke korting voor jouw vereniging geldt."
    />
  );
}
