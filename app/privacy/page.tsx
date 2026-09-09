import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Lees hoe Zonneplaneet Actie omgaat met persoonsgegevens.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Privacy</h1>

      <section aria-labelledby="gegevens" className="mt-12">
        <h2 id="gegevens" className="text-2xl font-semibold">
          Welke gegevens we vragen
        </h2>
        <p className="mt-4">
          We vragen alleen de contactgegevens en aanvraaggegevens die nodig zijn
          om je aanmelding te behandelen.
        </p>
        {/* TODO: Laat juridisch controleren welke gegevens en grondslag hier exact moeten staan. */}
      </section>

      <section aria-labelledby="doorgeven" className="mt-12">
        <h2 id="doorgeven" className="text-2xl font-semibold">
          Met wie we gegevens delen
        </h2>
        <p className="mt-4">
          We geven je gegevens samen met de clubcode door aan Zonneplaneet.
          Zonneplaneet gebruikt die gegevens om contact met je op te nemen over
          je aanvraag.
        </p>
        <p className="mt-4">
          Je sportvereniging ziet geen persoonsgegevens uit je aanmelding.
        </p>
        {/* TODO: Laat de rolverdeling en verwerkersafspraken met Zonneplaneet juridisch controleren. */}
      </section>

      <section aria-labelledby="bewaren" className="mt-12">
        <h2 id="bewaren" className="text-2xl font-semibold">
          Hoe lang we gegevens bewaren
        </h2>
        <p className="mt-4">
          We bewaren je gegevens zolang dat nodig is om je aanvraag af te
          handelen en om aan wettelijke verplichtingen te voldoen.
        </p>
        {/* TODO: Vul na juridische controle de concrete bewaartermijn per gegevenssoort in. */}
      </section>

      <section aria-labelledby="verwijderen" className="mt-12">
        <h2 id="verwijderen" className="text-2xl font-semibold">
          Je gegevens laten verwijderen
        </h2>
        <p className="mt-4">
          Je kunt ons vragen je gegevens te verwijderen. Gebruik daarvoor de
          contactgegevens van Zonneplaneet Actie. We laten je weten als we
          bepaalde gegevens wettelijk moeten bewaren.
        </p>
        {/* TODO: Voeg het gecontroleerde privacy-e-mailadres en de procedure voor verzoeken toe. */}
        {/* TODO: Laat rechten, uitzonderingen en reactietermijnen juridisch controleren. */}
      </section>
    </main>
  );
}
