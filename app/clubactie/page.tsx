import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomepageContact } from "@/components/HomepageContact";
import { HomepageIntro } from "@/components/HomepageIntro";
import { HomepageKeuzeblokken } from "@/components/HomepageKeuzeblokken";
import {
  SectieInstallateur,
  installateurAlineaVoorClubs,
} from "@/components/SectieInstallateur";
import heroFoto from "@/app/images/homepage-hero-zonnepanelen.jpg";

export const metadata: Metadata = {
  title: "Ledenvoordeel via je sportvereniging",
  description:
    "Lees hoe het ledenvoordeel via sportverenigingen werkt en vind informatie voor leden en clubbesturen.",
};

export default function ClubactiePage() {
  return (
    <main data-hero-balk data-installateur>
      <Hero
        uitgelijnd
        kop={
          <>
            Ledenvoordeel
            <br />
            voor zonne-energie
          </>
        }
        subregel="Voor leden van sportverenigingen."
        knoptekst="Bekijk de opties"
        knoplink="#kies-onderdeel"
        foto={heroFoto}
        alt="Zonnepanelen op het dak van een schuur in een weiland"
      />

      <HomepageIntro />

      <HomepageKeuzeblokken />

      <SectieInstallateur alinea={installateurAlineaVoorClubs} />

      {/* TODO: Sectie "Aangesloten clubs" staat tijdelijk uit. Terugzetten met
          getAlleClubs() uit lib/clubs en het anker #aangesloten-clubs. */}

      <HomepageContact titel="Benieuwd wat we voor jouw club kunnen betekenen?" />
    </main>
  );
}
