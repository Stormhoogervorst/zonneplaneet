import type { Metadata } from "next";
import { ContactKop } from "@/components/ContactKop";
import { LedenFaq } from "@/components/LedenFaq";
import { LedenFormulier } from "@/components/LedenFormulier";
import { LedenHoeHetWerkt } from "@/components/LedenHoeHetWerkt";
import { LedenWatJeKuntKopen } from "@/components/LedenWatJeKuntKopen";
import {
  SectieSaldering,
  salderingKopVoorClubs,
} from "@/components/SectieSaldering";

export const metadata: Metadata = {
  title: "Sponsor je club",
  description:
    "Vul je gegevens in en geef aan bij welke vereniging je hoort. We nemen binnen twee werkdagen contact op. Gaat het tot een aanschaf komen, dan maken we een vast bedrag over aan je club.",
};

export default function LedenPage() {
  return (
    <main>
      <ContactKop
        headingId="leden-kop-titel"
        eyebrow="VOOR LEDEN"
        titel="Sponsor je club"
        alinea="Vul je gegevens in en geef aan bij welke vereniging je hoort. We nemen binnen twee werkdagen contact op. Gaat het tot een aanschaf komen, dan maken we een vast bedrag over aan je club."
      />

      <LedenFormulier />

      <LedenWatJeKuntKopen />

      <LedenHoeHetWerkt />

      <SectieSaldering kop={salderingKopVoorClubs} />

      <LedenFaq />
    </main>
  );
}
