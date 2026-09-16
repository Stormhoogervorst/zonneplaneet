import type { Metadata } from "next";
import { ContactKop } from "@/components/ContactKop";
import { ReferralFormulier } from "@/components/ReferralFormulier";

export const metadata: Metadata = {
  title: "Draag iemand aan en verdien €200",
  description:
    "Ken je iemand die zonnepanelen, een thuisbatterij, een warmtepomp of een laadpaal overweegt? Gaat diegene over tot aanschaf, dan ontvang jij €200 na de installatie.",
  /* De uitbetalingstekst staat nog niet vast; deze pagina heeft daarom geen
     zoekwaarde en staat ook niet in app/sitemap.ts. */
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReferralPage() {
  return (
    <main data-geen-vertrouwensblok>
      <ContactKop
        headingId="referral-kop-titel"
        eyebrow="REFERRAL"
        titel="Draag iemand aan en verdien €200"
        titelMaat="l"
        alinea="Ken je iemand die zonnepanelen, een thuisbatterij, een warmtepomp of een laadpaal overweegt? Laat hier jullie gegevens achter. Gaat diegene over tot aanschaf, dan ontvang jij €200."
      />

      <ReferralFormulier />
    </main>
  );
}
