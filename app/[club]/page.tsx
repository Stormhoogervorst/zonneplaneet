import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AanmeldFormulier } from "@/components/AanmeldFormulier";
import { SectieSaldering } from "@/components/SectieSaldering";
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
    <main className="mx-auto max-w-5xl px-5 py-12">
      <header>
        <Image
          src={club.logo}
          alt={`Logo van ${club.naam}`}
          width={320}
          height={120}
          priority
        />
        <h1 className="mt-6 text-3xl font-semibold">{club.naam}</h1>
        <p className="mt-4 max-w-2xl">
          Als lid krijg je {club.kortingPanelen} korting op zonnepanelen en{" "}
          {club.kortingBatterij} korting op een thuisbatterij. Na een installatie
          ontvangt de club {club.vergoedingPerInstallatie}.
        </p>
        <p className="mt-4 max-w-2xl">{club.bestuurRegel}</p>
      </header>

      <section aria-labelledby="werking" className="mt-12">
        <h2 id="werking" className="text-2xl font-semibold">
          Zo werkt het
        </h2>
        <ol className="mt-6 list-decimal space-y-4 pl-5">
          <li>Je meldt je aan met je contactgegevens en interesse.</li>
          <li>
            Wij sturen je aanmelding met de clubcode door naar Zonneplaneet.
          </li>
          <li>
            Zonneplaneet neemt contact op en verzorgt een eventuele offerte,
            verkoop en installatie.
          </li>
        </ol>
      </section>

      <section aria-labelledby="ervaring" className="mt-12">
        <h2 id="ervaring" className="text-2xl font-semibold">
          Ervaring van een lid
        </h2>
        <blockquote className="mt-6">
          <p>“{club.quote.tekst}”</p>
          <footer className="mt-4">
            {club.quote.naam}, {club.quote.rol}
          </footer>
        </blockquote>
      </section>

      <section aria-labelledby="aanmelden" className="mt-12">
        <h2 id="aanmelden" className="text-2xl font-semibold">
          Meld je aan
        </h2>
        <AanmeldFormulier clubslug={slug} clubcode={club.code} />
      </section>

      <div className="mt-12">
        <SectieSaldering />
      </div>

      <section aria-labelledby="faq" className="mt-12">
        <h2 id="faq" className="text-2xl font-semibold">
          Veelgestelde vragen
        </h2>
        <dl className="mt-6">
          {club.faq.map((item) => (
            <div key={item.vraag} className="mt-6 first:mt-0">
              <dt className="font-semibold">{item.vraag}</dt>
              <dd className="mt-4">{item.antwoord}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
