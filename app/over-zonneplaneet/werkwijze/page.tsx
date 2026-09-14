import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Werkwijze",
  description: "Over onze werkwijze.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function WerkwijzePage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Werkwijze</h1>
      {/* TODO: Vul de tekst over onze werkwijze in. */}
      <p className="mt-4">TODO: tekst volgt.</p>
    </main>
  );
}
