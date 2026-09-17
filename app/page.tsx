import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomepageActiekaarten } from "@/components/HomepageActiekaarten";
import { HomepageContact } from "@/components/HomepageContact";
import { SectieInstallateur } from "@/components/SectieInstallateur";
import { SectieSaldering } from "@/components/SectieSaldering";
import { organizationJsonLd } from "@/lib/bedrijf";

export const metadata: Metadata = {
  title: {
    absolute: "Voordeel op duurzame energie | Zonneplaneet ACTIE",
  },
  description:
    "Zonnepanelen, thuisbatterijen, warmtepompen en laadpalen. Via je sportvereniging of via referral.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = organizationJsonLd();

  return (
    <main data-hero-balk data-installateur>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* TODO: Bevestig de overkoepelende knoptekst. */}
      <Hero
        kop="Voordeel op duurzame energie"
        subregel="Zonnepanelen, thuisbatterijen, warmtepompen en laadpalen. Via je sportvereniging of via referral."
        knoptekst="Bekijk de acties"
        knoplink="#acties"
        foto="/zonnepanelen-bedrijfsdak.jpg"
        alt="Lange rijen zonnepanelen op het dak van een bedrijfshal onder een lichte hemel"
        overlayKlasse="bg-[rgba(7,39,55,0.62)]"
      />
      <HomepageActiekaarten />
      <SectieSaldering kop="Op 1 januari 2027 stopt de salderingsregeling. Wat dat voor je energierekening betekent, hangt vooral af van hoeveel stroom je zelf direct gebruikt." />
      <SectieInstallateur />
      <HomepageContact titel="Benieuwd welke actie bij jou past?" />
    </main>
  );
}
