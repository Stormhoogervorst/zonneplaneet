import type { Metadata } from "next";
import { PartnerAanmeldFormulier } from "@/components/PartnerAanmeldFormulier";
import { PartnerFaq } from "@/components/PartnerFaq";
import { PartnerHero } from "@/components/PartnerHero";
import { PartnerHoeHetLoopt } from "@/components/PartnerHoeHetLoopt";
import { PartnerStatement } from "@/components/PartnerStatement";
import { PartnerWatHetKost } from "@/components/PartnerWatHetKost";
import { PartnerWatWijDoen } from "@/components/PartnerWatWijDoen";
import {
  SectieInstallateur,
  installateurAlineaVoorClubs,
} from "@/components/SectieInstallateur";

export const metadata: Metadata = {
  title: "Clubactie voor sportverenigingen",
  description:
    "Lees wat de samenwerking met Zonneplaneet Actie oplevert en wat er van een sportvereniging wordt gevraagd.",
};

export default function PartnerPage() {
  return (
    <main data-installateur>
      <PartnerHero />

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
