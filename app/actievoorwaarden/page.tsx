import type { Metadata } from "next";

/* TODO: titel, description en tekst vervangen door de juridisch gecontroleerde
   actievoorwaarden van de winactie. */
export const metadata: Metadata = {
  title: "Actievoorwaarden",
  description: "TODO",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ActievoorwaardenPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Actievoorwaarden</h1>
      <p className="mt-4">TODO</p>
    </main>
  );
}
