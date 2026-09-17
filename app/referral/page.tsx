import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
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
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Draag iemand aan en verdien €200"
        subregel={
          <>
            Ken je iemand die zonnepanelen, een thuisbatterij, een warmtepomp of
            een laadpaal overweegt? Laat hier jullie gegevens achter. Gaat
            diegene over tot aanschaf, dan ontvang jij{" "}
            <Link href="/voorwaarden" className="underline">
              €200
            </Link>
            .
          </>
        }
        foto="/thuisbatterij-installatie.jpg"
        alt="Zonnepanelen en thuisbatterijen gemonteerd tegen een lichte wand"
      />

      <ReferralFormulier />
    </main>
  );
}
