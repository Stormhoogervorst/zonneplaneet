import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AanmeldFormulier } from "@/components/AanmeldFormulier";
import { ClubAanbodVlak } from "@/components/ClubAanbodVlak";
import { ClubFaq } from "@/components/ClubFaq";
import { ClubVertrouwen } from "@/components/ClubVertrouwen";
import { Hero } from "@/components/Hero";
import { LedenHoeHetWerkt } from "@/components/LedenHoeHetWerkt";
import { LedenWatJeKuntKopen } from "@/components/LedenWatJeKuntKopen";
import {
  SectieInstallateur,
  installateurAlineaVoorClubs,
} from "@/components/SectieInstallateur";
import {
  SectieSaldering,
  salderingKopVoorClubs,
} from "@/components/SectieSaldering";
import { getClub, getClubSlugs } from "@/lib/clubs";

type ClubPageProps = {
  params: Promise<{ club: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getClubSlugs().map((club) => ({ club }));
}

export async function generateMetadata({
  params,
}: ClubPageProps): Promise<Metadata> {
  const { club: slug } = await params;
  const club = getClub(slug);

  if (!club) {
    notFound();
  }

  return {
    title: `Ledenvoordeel van ${club.naam}`,
    description: `Meld je via ${club.naam} aan voor informatie van Zonneplaneet en steun de club bij een installatie.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { club: slug } = await params;
  const club = getClub(slug);

  if (!club) {
    notFound();
  }

  return (
    <main data-hero-balk data-installateur>
      <Hero
        compact
        logo={{ src: club.logo, alt: `Logo van ${club.naam}` }}
        kop={`Ledenvoordeel voor ${club.naam}`}
        subregel={`In ${club.plaats}. Korting op zonnepanelen en een thuisbatterij.`}
        knoptekst="Meld je aan"
        knoplink="#aanmelden"
      />

      <ClubAanbodVlak club={club} />

      <ClubVertrouwen club={club} />

      <AanmeldFormulier clubslug={slug} clubcode={club.code} />

      <LedenWatJeKuntKopen />

      <LedenHoeHetWerkt />

      <SectieSaldering kop={salderingKopVoorClubs} />

      <ClubFaq vragen={club.faq} />

      <SectieInstallateur alinea={installateurAlineaVoorClubs} />
    </main>
  );
}
