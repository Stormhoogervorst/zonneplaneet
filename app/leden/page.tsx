import type { Metadata } from "next";
import { ContactKop } from "@/components/ContactKop";
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
};

export default function LedenPage() {
  return (
    <main data-geen-vertrouwensblok>
      <ContactKop
        headingId="leden-kop-titel"
        titel="Sponsor je club"
        alinea={ledenAlinea}
      />

      <LedenFormulier />

      <LedenHoeHetWerkt />

      <SectieSaldering kop={salderingKopVoorClubs} />

      <LedenFaq />
    </main>
  );
}
