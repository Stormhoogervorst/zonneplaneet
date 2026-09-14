import type { Metadata } from "next";
import { ContactKop } from "@/components/ContactKop";
import { ReferralFormulier } from "@/components/ReferralFormulier";

export const metadata: Metadata = {
  title: "Draag iemand aan",
  description:
    "Ken je iemand die zonnepanelen, een thuisbatterij, een warmtepomp of een laadpaal overweegt? Laat hier jullie gegevens achter, dan nemen we contact op.",
  /* De actievoorwaarden staan nog niet vast; deze pagina heeft daarom geen
     zoekwaarde en staat ook niet in app/sitemap.ts. */
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReferralPage() {
  return (
    <main data-donker-einde data-geen-vertrouwensblok>
      <ContactKop
        headingId="referral-kop-titel"
        eyebrow="REFERRAL"
        titel="Draag iemand aan"
        alinea="Ken je iemand die zonnepanelen, een thuisbatterij, een warmtepomp of een laadpaal overweegt? Laat hier jullie gegevens achter, dan nemen we contact op."
      />

      <ReferralFormulier />
    </main>
  );
}
