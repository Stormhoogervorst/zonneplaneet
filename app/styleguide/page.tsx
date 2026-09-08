import type { Metadata } from "next";
import {
  Accordeon,
  IconTegel,
  Kaart,
  Knop,
  Rijenlijst,
  rijenlijstIcoonClasses,
  Sectie,
  Tag,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Interne styleguide voor de interface van Clubactie.",
  robots: {
    index: false,
    follow: false,
  },
};

function ZonIcoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function KubusIcoon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={rijenlijstIcoonClasses}
    >
      <path d="M36 12 60 26 36 40 12 26Z" />
      <path d="M12 26v20l24 14 24-14V26M36 40v20" />
    </svg>
  );
}

export default function StyleguidePagina() {
  return (
    <main>
      <Sectie aria-labelledby="styleguide-titel">
        <header className="max-w-2xl">
          <p className="text-body font-semibold">Clubactie</p>
          <h1 id="styleguide-titel" className="mt-4 text-display-xl">
            Styleguide
          </h1>
          <p className="mt-6 text-body-l">
            De typografie, kleuren en interfacebouwstenen voor volgende
            ontwerprondes.
          </p>
        </header>
      </Sectie>

      <Sectie aria-labelledby="typografie-titel" className="bg-vlak">
        <h2 id="typografie-titel" className="text-display-m">
          Typografie
        </h2>
        <div className="mt-8 space-y-10">
          <div>
            <p className="text-body font-semibold">display-xl</p>
            <p className="mt-2 text-display-xl">Energie voor je huis</p>
          </div>
          <div>
            <p className="text-body font-semibold">display-l</p>
            <p className="mt-2 text-display-l">Een heldere keuze</p>
          </div>
          <div>
            <p className="text-body font-semibold">display-m</p>
            <p className="mt-2 text-display-m">Zo werkt de clubactie</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-body font-semibold">body-l</p>
              <p className="mt-2 text-body-l">
                Grote lopende tekst voor introducties en belangrijke uitleg.
              </p>
            </div>
            <div>
              <p className="text-body font-semibold">body</p>
              <p className="mt-2 text-body">
                Standaard lopende tekst voor kaarten, formulieren en antwoorden.
              </p>
            </div>
          </div>
        </div>
      </Sectie>

      <Sectie aria-labelledby="knoppen-titel">
        <h2 id="knoppen-titel" className="text-display-m">
          Knoppen
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Knop>Start mijn aanvraag</Knop>
          <Knop variant="donker">Lees hoe het werkt</Knop>
          <span className="bg-navy p-4">
            <Knop variant="wit">Contact</Knop>
          </span>
          <Knop variant="stil">Bekijk alle vragen</Knop>
          <Knop metPijl>Naar het formulier</Knop>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Knop metPijl variant="groot">
            Bekijk de opties
          </Knop>
          <Knop metPijl variant="grootDonker">
            Neem contact op
          </Knop>
        </div>
      </Sectie>

      <Sectie aria-labelledby="tags-titel">
        <h2 id="tags-titel" className="text-display-m">
          Tags
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Tag>Salderingsregeling</Tag>
          <Tag variant="navy">Contact</Tag>
        </div>
      </Sectie>

      <Sectie aria-labelledby="kaarten-titel" className="bg-vlak">
        <h2 id="kaarten-titel" className="text-display-m">
          Kaart en icoontegel
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Kaart className="bg-white">
            <IconTegel>
              <ZonIcoon />
            </IconTegel>
            <h3 className="mt-6 text-display-m">Zonnepanelen</h3>
            <p className="mt-4 text-body">
              Een kaart groepeert inhoud met een zachte vlakvulling en ruime
              witruimte.
            </p>
          </Kaart>
          <Kaart className="bg-navy text-white">
            <IconTegel label="Zon">
              <ZonIcoon />
            </IconTegel>
            <h3 className="mt-6 text-display-m">Donker contrastvlak</h3>
            <p className="mt-4 text-body">
              Dezelfde vormen werken ook binnen een donker informatievlak.
            </p>
          </Kaart>
        </div>
      </Sectie>

      <Sectie aria-labelledby="accordeon-titel">
        <h2 id="accordeon-titel" className="text-display-m">
          Accordeon
        </h2>
        <Accordeon
          className="mt-8"
          items={[
            {
              vraag: "Hoe werkt een open onderdeel?",
              antwoord:
                "Een open onderdeel gebruikt een navy vlak met witte tekst.",
            },
            {
              vraag: "Werkt dit zonder JavaScript?",
              antwoord:
                "Ja. De accordeon gebruikt de ingebouwde details- en summary-elementen.",
            },
            {
              vraag: "Kan ik dit met het toetsenbord bedienen?",
              antwoord:
                "Ja. De samenvatting is van zichzelf focusbaar en te openen met het toetsenbord.",
            },
          ]}
        />

        <h3 className="mt-12 text-body-l font-semibold">
          Variant vlak, voor een grijs sectievlak
        </h3>
        <div className="mt-6 bg-salderingsvlak p-8">
          <Accordeon
            variant="vlak"
            items={[
              {
                vraag: "Hoe werkt een open onderdeel op een grijs vlak?",
                antwoord:
                  "Het open onderdeel wordt wit en komt daarmee uit het grijs naar voren. De hoeken blijven recht.",
                standaardOpen: true,
              },
              {
                vraag: "Waarom is de vraag niet oranje?",
                antwoord:
                  "Oranje haalt op wit 3,8:1 en mag daarom geen tekst dragen. Het zit alleen in het gevulde cirkeltje.",
              },
            ]}
          />
        </div>
      </Sectie>

      <Rijenlijst
        eyebrow="Rijenlijst"
        id="rijenlijst-titel"
        kop="Een rijenlijst zet een label, een isometrisch icoon en een beschrijving naast elkaar, met een haarlijn tussen de rijen."
        rijen={[
          {
            titel: "Eerste rij",
            icoon: <KubusIcoon />,
            beschrijving:
              "De titel is een label in een dl, geen kop. Vanaf md staan label, icoon en beschrijving in een grid van twaalf kolommen.",
          },
          {
            titel: "Tweede rij",
            icoon: <KubusIcoon />,
            beschrijving:
              "Onder md komen de drie onderdelen onder elkaar te staan, links uitgelijnd.",
          },
        ]}
      />
    </main>
  );
}
