import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { LedenFaq } from "@/components/LedenFaq";
import { LedenFormulier } from "@/components/LedenFormulier";
import { LedenHoeHetWerkt } from "@/components/LedenHoeHetWerkt";
import {
  SectieSaldering,
  salderingKopVoorClubs,
} from "@/components/SectieSaldering";
import { STANDAARD_VERGOEDING } from "@/lib/clubs";

const ledenAlinea = `Jouw aanschaf van een duurzame energieoplossing levert jouw (sport)club ${STANDAARD_VERGOEDING} op. Het enige wat jij hoeft te doen is je aanmelden. Je krijgt dan meer informatie over het product waar je interesse in hebt, en ga je tot aanschaf over, dan ontvangt jouw club ${STANDAARD_VERGOEDING}.`;

export const metadata: Metadata = {
  title: "Sponsor je club",
  description: ledenAlinea,
  alternates: {
    canonical: "/leden",
  },
};

export default function LedenPage() {
  return (
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Sponsor je club"
        subregel={
          <>
            Jouw aanschaf van een duurzame energieoplossing levert jouw
            (sport)club{" "}
            <Link href="/voorwaarden" className="underline">
              {STANDAARD_VERGOEDING}
            </Link>{" "}
            op. Het enige wat jij hoeft te doen is je aanmelden. Je krijgt dan
            meer informatie over het product waar je interesse in hebt, en ga je
            tot aanschaf over, dan ontvangt jouw club{" "}
            <Link href="/voorwaarden" className="underline">
              {STANDAARD_VERGOEDING}
            </Link>
            .
          </>
        }
        foto="/zonnepanelen-woningen.jpg"
        alt="Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken"
      />

      <LedenFormulier />

      <LedenHoeHetWerkt />

      <SectieSaldering kop={salderingKopVoorClubs} />

      <LedenFaq />
    </main>
  );
}
