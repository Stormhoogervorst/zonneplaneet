import type { Metadata } from "next";
import { HomepageContact } from "@/components/HomepageContact";
import { HomepageHero } from "@/components/HomepageHero";
import { HomepageIntro } from "@/components/HomepageIntro";
import { HomepageKeuzeblokken } from "@/components/HomepageKeuzeblokken";
import { SectieInstallateur } from "@/components/SectieInstallateur";

export const metadata: Metadata = {
  title: "Ledenvoordeel via je sportvereniging",
  description:
    "Lees hoe het ledenvoordeel via sportverenigingen werkt en vind informatie voor leden en clubbesturen.",
};

export default function Home() {
  return (
    <main data-homepage data-installateur>
      <HomepageHero />

      <HomepageIntro />

      <HomepageKeuzeblokken />

      <SectieInstallateur />

      {/* TODO: Sectie "Aangesloten clubs" staat tijdelijk uit. Terugzetten met
          getAlleClubs() uit lib/clubs en het anker #aangesloten-clubs. */}

      <HomepageContact />
    </main>
  );
}
