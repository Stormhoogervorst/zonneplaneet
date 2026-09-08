import type { Metadata } from "next";
import Link from "next/link";
import { getAlleArtikelen } from "@/lib/artikelen";

export const metadata: Metadata = {
  title: "Kennisbank over zonne-energie",
  description:
    "Lees uitleg over zonnepanelen, thuisbatterijen en laadpalen via je sportvereniging.",
  /* TODO: Indexeren als de kennisbank weer in de navigatie komt. */
  robots: {
    index: false,
    follow: true,
  },
};

export default function KennisbankPage() {
  const artikelen = getAlleArtikelen();

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Kennisbank</h1>
      <p className="mt-4 max-w-2xl">
        Hier vind je uitleg over zonnepanelen, thuisbatterijen en laadpalen.
      </p>

      <section aria-labelledby="artikelen" className="mt-12">
        <h2 id="artikelen" className="text-2xl font-semibold">
          Artikelen
        </h2>
        <ul className="mt-6">
          {artikelen.map((artikel) => (
            <li key={artikel.slug} className="mt-6 first:mt-0">
              <article aria-labelledby={`artikel-${artikel.slug}`}>
                <h3
                  id={`artikel-${artikel.slug}`}
                  className="text-xl font-semibold"
                >
                  <Link
                    className="underline"
                    href={`/kennisbank/${artikel.slug}`}
                  >
                    {artikel.titel}
                  </Link>
                </h3>
                <p className="mt-4">{artikel.samenvatting}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
