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

      <section aria-labelledby="gebruik" className="mt-12">
        <h2 id="gebruik" className="text-2xl font-semibold">
          Waarvoor we je gegevens gebruiken
        </h2>
        <p className="mt-4">
          We gebruiken je gegevens samen met de clubcode om contact met je op te
          nemen over je aanvraag.
        </p>
        <p className="mt-4">
          Je sportvereniging ziet geen persoonsgegevens uit je aanmelding.
        </p>
        {/* TODO: Laat de verwerking van persoonsgegevens juridisch controleren. */}
      </section>

      <section aria-labelledby="afspraak" className="mt-12">
        <h2 id="afspraak" className="text-2xl font-semibold">
          Afspraak inplannen via Cal.com
        </h2>
        <p className="mt-4">
          Op de contactpagina kun je zelf een gesprek van ongeveer 30 minuten
          inplannen. De agenda wordt geladen via Cal.com, een externe dienst.
        </p>
        <p className="mt-4">
          Als je een moment kiest, verwerkt Cal.com de gegevens die je in het
          boekingsformulier invult. Dat gaat in ieder geval om je naam, je
          e-mailadres en het gekozen tijdstip. Cal.com kan ook technische
          gegevens vastleggen, zoals je IP-adres en browsergegevens. Die
          verwerking loopt via Cal.com, niet via onze eigen formulieren.
        </p>
        {/* TODO: Laat juridisch controleren welke velden het 30-minuten-event
           exact uitvraagt, de grondslag, de bewaartermijn, de
           verwerkersovereenkomst met Cal.com en of de embed cookies of
           vergelijkbare technieken plaatst. */}
        <p className="mt-4">
          Wil je geen afspraak via Cal.com, gebruik dan het contactformulier op
          dezelfde pagina.
        </p>
      </section>

      <section aria-labelledby="referral" className="mt-12">
        <h2 id="referral" className="text-2xl font-semibold">
          Als iemand jou bij ons aandraagt
        </h2>
        <p className="mt-4">
          Via het referralformulier kan iemand jouw voornaam, achternaam,
          e-mailadres, telefoonnummer en plaats doorgeven, plus waar jij
          mogelijk interesse in hebt en een eventuele opmerking. We slaan die
          gegevens op samen met de naam, het e-mailadres en het telefoonnummer
          van de persoon die jou aandraagt.
        </p>
        <p className="mt-4">
          We sturen jou altijd een bericht, zodat je weet hoe we aan je gegevens
          komen. Wil je geen contact, mail ons dan. Dan verwijderen we je
          gegevens.
        </p>
        {/* TODO: Laat deze referral-tekst juridisch controleren, inclusief grondslag en de procedure voor verwijderen. */}
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
