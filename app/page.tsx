import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomepageActiekaarten } from "@/components/HomepageActiekaarten";
import { HomepageContact } from "@/components/HomepageContact";
import { SectieInstallateur } from "@/components/SectieInstallateur";
import { SectieSaldering } from "@/components/SectieSaldering";

/* TODO: Bevestig de overkoepelende title en description. */
export const metadata: Metadata = {
  title: {
    absolute:
      "Voordeel op zonnepanelen, thuisbatterijen en laadpalen | Zonneplaneet Actie",
  },
  description:
    "Via je sportvereniging, via cashback of via de winactie. Zonneplaneet levert en installeert.",
};

export default function Home() {
  return (
    <main data-hero-balk data-installateur>
      {/* TODO: Bevestig de overkoepelende hero-kop, subregel, knoptekst, title en description. */}
      <Hero
        kop="Voordeel op zonnepanelen, thuisbatterijen en laadpalen"
        subregel="Via je sportvereniging, via cashback of via de winactie. Zonneplaneet levert en installeert."
        knoptekst="Bekijk de acties"
        knoplink="#acties"
        foto="/zonnepanelen-bedrijfsdak.jpg"
        alt="Lange rijen zonnepanelen op het dak van een bedrijfshal onder een lichte hemel"
        overlayKlasse="bg-[rgba(7,39,55,0.65)]"
      />
      <HomepageActiekaarten />
      <SectieSaldering kop="Op 1 januari 2027 stopt de salderingsregeling. Wat dat voor je energierekening betekent, hangt vooral af van hoeveel stroom je zelf direct gebruikt." />
      <SectieInstallateur alinea="Zonneplaneet levert en installeert. Wij regelen de acties en zorgen dat je korting op de offerte staat. Zonneplaneet werkt vanuit Assen en Arnhem." />
      <HomepageContact
        tag="MEER WETEN"
        titel="Benieuwd welke actie bij jou past?"
      />
    </main>
  );
}
