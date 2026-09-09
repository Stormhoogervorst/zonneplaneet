import type { Metadata } from "next";
import { ClubKiezer } from "@/components/ClubKiezer";
import { LedenFaq } from "@/components/LedenFaq";
import { LedenHero } from "@/components/LedenHero";
import { LedenHoeHetWerkt } from "@/components/LedenHoeHetWerkt";
import { LedenStatement } from "@/components/LedenStatement";
import { LedenWatJeKrijgt } from "@/components/LedenWatJeKrijgt";
import { LedenWatJeKuntKopen } from "@/components/LedenWatJeKuntKopen";
import {
  SectieInstallateur,
  installateurAlineaVoorClubs,
} from "@/components/SectieInstallateur";
import {
  SectieSaldering,
  salderingKopVoorClubs,
} from "@/components/SectieSaldering";

export const metadata: Metadata = {
  title: "Zonnepanelen kopen via je club",
  description:
    "Ben je lid van een aangesloten vereniging, dan koop je zonnepanelen, een thuisbatterij of een laadpaal met ledenkorting. Zoek je club en meld je aan.",
};

export default function LedenPage() {
  return (
    <main data-installateur data-donker-einde>
      <LedenHero />

      <LedenStatement />

      <LedenWatJeKrijgt />

      <LedenWatJeKuntKopen />

      <LedenHoeHetWerkt />

      <SectieSaldering kop={salderingKopVoorClubs} />

      <SectieInstallateur alinea={installateurAlineaVoorClubs} />

      <LedenFaq />

      <ClubKiezer />
    </main>
  );
}
