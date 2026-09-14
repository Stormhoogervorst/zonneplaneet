import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over Zonneplaneet",
  description: "Informatie over Zonneplaneet.",
  robots: {
    index: false,
    follow: true,
  },
};

const onderdelen = [
  { href: "/over-zonneplaneet/werkwijze", titel: "Werkwijze" },
  { href: "/over-zonneplaneet/garanties", titel: "Garanties" },
  { href: "/over-zonneplaneet/reviews", titel: "Reviews" },
] as const;

export default function OverZonneplaneetPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Over Zonneplaneet</h1>

      <nav aria-label="Onderdelen" className="mt-12">
        <ul>
          {onderdelen.map((onderdeel) => (
            <li key={onderdeel.href} className="mt-4">
              <Link href={onderdeel.href} className="underline">
                {onderdeel.titel}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
