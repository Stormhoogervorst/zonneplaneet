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
      "Voordeel op zonnepanelen, thuisbatterijen en laadpalen | Zonneplaneet ACTIE",
  },
  description:
    "Via je sportvereniging of via referral. Wij leveren en installeren.",
};

export default function Home() {
  return (
    <main data-hero-balk data-installateur>
      {/* TODO: Bevestig de overkoepelende hero-kop, subregel, knoptekst, title en description. */}
      <Hero
        kop={
          <>
            Voordeel op zonnepanelen,
            <br />
            thuisbatterijen en laadpalen
          </>
        }
        subregel="Via je sportvereniging of via referral. Wij leveren en installeren."
        knoptekst="Bekijk de acties"
        knoplink="#acties"
        foto="/zonnepanelen-bedrijfsdak.jpg"
        alt="Lange rijen zonnepanelen op het dak van een bedrijfshal onder een lichte hemel"
        overlayKlasse="bg-[rgba(7,39,55,0.65)]"
      />
      <HomepageActiekaarten />
      <SectieSaldering kop="Op 1 januari 2027 stopt de salderingsregeling. Wat dat voor je energierekening betekent, hangt vooral af van hoeveel stroom je zelf direct gebruikt." />
      <SectieInstallateur />
      <HomepageContact titel="Benieuwd welke actie bij jou past?" />
    </main>
  );
}
