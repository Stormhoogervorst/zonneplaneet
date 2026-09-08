import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtikel, getArtikelSlugs, type Artikel } from "@/lib/artikelen";

type ArtikelPageProps = {
  params: Promise<{ artikel: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArtikelSlugs().map((artikel) => ({ artikel }));
}

export async function generateMetadata({
  params,
}: ArtikelPageProps): Promise<Metadata> {
  const { artikel: slug } = await params;
  const artikel = getArtikel(slug);

  if (!artikel) {
    notFound();
  }

  return {
    title: artikel.titel,
    description: artikel.beschrijving,
    /* TODO: Indexeren als de kennisbank weer in de navigatie komt. */
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/kennisbank/${artikel.slug}`,
    },
  };
}

function formatteerDatum(datum: string) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(datum));
}

function ArtikelInhoud({ artikel }: { artikel: Artikel }) {
  const alineas = artikel.inhoud.split(/\r?\n\r?\n/).filter(Boolean);

  return (
    <div className="mt-12">
      {alineas.map((alinea) => (
        <p key={alinea} className="mt-4 first:mt-0">
          {alinea}
        </p>
      ))}
    </div>
  );
}

export default async function ArtikelPage({ params }: ArtikelPageProps) {
  const { artikel: slug } = await params;
  const artikel = getArtikel(slug);

  if (!artikel) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const artikelUrl = new URL(`/kennisbank/${artikel.slug}`, siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.titel,
    description: artikel.beschrijving,
    datePublished: artikel.gepubliceerdOp,
    dateModified: artikel.bijgewerktOp,
    inLanguage: "nl-NL",
    mainEntityOfPage: artikelUrl,
    publisher: {
      "@type": "Organization",
      name: "Clubactie",
    },
  };

  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article>
        <Link className="underline" href="/kennisbank">
          Terug naar de kennisbank
        </Link>
        <header className="mt-6">
          <h1 className="text-3xl font-semibold">{artikel.titel}</h1>
          <p className="mt-4">{artikel.samenvatting}</p>
          <p className="mt-4">
            Gepubliceerd op{" "}
            <time dateTime={artikel.gepubliceerdOp}>
              {formatteerDatum(artikel.gepubliceerdOp)}
            </time>
            . Bijgewerkt op{" "}
            <time dateTime={artikel.bijgewerktOp}>
              {formatteerDatum(artikel.bijgewerktOp)}
            </time>
            .
          </p>
        </header>

        <ArtikelInhoud artikel={artikel} />
      </article>

      <section aria-labelledby="clubbestuur" className="mt-12">
        <h2 id="clubbestuur" className="text-2xl font-semibold">
          Zit je in een clubbestuur?
        </h2>
        <p className="mt-4">
          Lees wat de clubactie vraagt en wat die voor je vereniging kan
          betekenen.
        </p>
        <Link className="mt-4 inline-block underline" href="/partner">
          Bekijk de informatie voor clubs
        </Link>
      </section>
    </main>
  );
}
