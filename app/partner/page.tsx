import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { PartnerAanmeldFormulier } from "@/components/PartnerAanmeldFormulier";
import { PartnerFaq } from "@/components/PartnerFaq";
import { PartnerHoeHetLoopt } from "@/components/PartnerHoeHetLoopt";
import { PartnerStatement } from "@/components/PartnerStatement";
import { PartnerWatHetKost } from "@/components/PartnerWatHetKost";
import { PartnerWatWijDoen } from "@/components/PartnerWatWijDoen";
import {
  SectieInstallateur,
  installateurAlineaVoorClubs,
} from "@/components/SectieInstallateur";
import { STANDAARD_VERGOEDING } from "@/lib/clubs";

export const metadata: Metadata = {
  title: "Clubactie voor sportverenigingen",
  description:
    "Lees wat de samenwerking met Zonneplaneet Actie oplevert en wat er van een sportvereniging wordt gevraagd.",
  alternates: {
    canonical: "/partner",
  },
};

export default function PartnerPage() {
  return (
    <main data-hero-balk data-installateur>
      <Hero
        uitgelijnd
        kop="Een actie die je clubkas laat meeprofiteren"
        subregel={`Je vereniging deelt de actie met haar leden. Meer hoeft de club niet te doen. Elke installatie levert de clubkas ${STANDAARD_VERGOEDING} op, zonder kosten en zonder risico.`}
        foto="/zonnepanelen-bedrijfsdak.jpg"
        alt="Lange rijen zonnepanelen op het dak van een bedrijfshal"
      />

      <PartnerStatement />

      <PartnerWatHetKost />

      <PartnerWatWijDoen />

      <PartnerHoeHetLoopt />

      <SectieInstallateur alinea={installateurAlineaVoorClubs} />

      {/* De FAQ ligt tegen het aanmeldformulier aan: bestuurders lezen eerst de
          antwoorden en vullen daarna in. */}
      <PartnerFaq />

      {/* Het aanmeldformulier loopt over de volle breedte: foto links, ijsblauw
          paneel rechts. Daarom staat het buiten de tekstcontainer. */}
      <PartnerAanmeldFormulier />
    </main>
  );
}
