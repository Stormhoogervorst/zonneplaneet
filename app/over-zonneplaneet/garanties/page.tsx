import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garanties",
  description: "Over onze garanties.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GarantiesPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Garanties</h1>
      {/* TODO: Vul de tekst over onze garanties in. */}
      <p className="mt-4">TODO: tekst volgt.</p>
    </main>
  );
}
