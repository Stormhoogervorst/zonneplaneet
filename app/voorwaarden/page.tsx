import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voorwaarden",
  description: "Lees de voorwaarden van Zonneplaneet Actie.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function VoorwaardenPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Voorwaarden</h1>

      <section aria-labelledby="rol" className="mt-12">
        <h2 id="rol" className="text-2xl font-semibold">
          Onze rol
        </h2>
        <p className="mt-4">
          Via Zonneplaneet Actie kunnen leden van sportverenigingen zich
          aanmelden voor zonnepanelen, thuisbatterijen en laadpalen. Wij leveren
          en installeren de producten.
        </p>
        {/* TODO: Laat deze omschrijving juridisch controleren. */}
      </section>

      <section aria-labelledby="aanmelding" className="mt-12">
        <h2 id="aanmelding" className="text-2xl font-semibold">
          Je aanmelding
        </h2>
        <p className="mt-4">
          Een aanmelding is een verzoek om contact. Aan de aanmelding zelf kun
          je geen recht op een aanbod, korting of installatie ontlenen.
        </p>
        {/* TODO: Laat de voorwaarden voor deelname en eventuele clubkorting juridisch controleren. */}
      </section>

      <section aria-labelledby="aansprakelijkheid" className="mt-12">
        <h2 id="aansprakelijkheid" className="text-2xl font-semibold">
          Verantwoordelijkheid
        </h2>
        <p className="mt-4">
          Wij zijn verantwoordelijk voor offertes, advies, verkoop en
          installatie.
        </p>
        {/* TODO: Voeg na juridische controle bepalingen over aansprakelijkheid, klachten en toepasselijk recht toe. */}
      </section>
    </main>
  );
}
