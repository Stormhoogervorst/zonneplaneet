import type { Metadata } from "next";
import { stuurContact } from "@/app/aanmelden/actions";
import { SectieAfspraak } from "@/components/SectieAfspraak";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import { Hero } from "@/components/Hero";
import { SectieContactgegevens } from "@/components/SectieContactgegevens";
import { contactRolLabels, contactRollen } from "@/lib/validatie";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Stel je vraag over de clubactie, als lid van een vereniging of als bestuurslid.",
  /* Deze pagina is nog niet uitgekristalliseerd en heeft geen zoekwaarde; ze
     staat daarom ook niet in app/sitemap.ts. */
  robots: {
    index: false,
    follow: true,
  },
};

const velden: FormulierVeld[] = [
  {
    naam: "voornaam",
    label: "Voornaam",
    soort: "tekst",
    autoComplete: "given-name",
    verplicht: true,
  },
  {
    naam: "achternaam",
    label: "Achternaam",
    soort: "tekst",
    autoComplete: "family-name",
    verplicht: true,
  },
  {
    naam: "email",
    label: "E-mailadres",
    soort: "email",
    autoComplete: "email",
    verplicht: true,
  },
  {
    naam: "telefoon",
    label: "Telefoonnummer",
    soort: "telefoon",
    autoComplete: "tel",
    verplicht: true,
  },
  /* Dit veld bepaalt of een bericht naar de clubwerving of naar de
     leden-afhandeling gaat en scheelt daarmee een heen-en-weer. */
  {
    naam: "rol",
    label: "Ik ben…",
    soort: "keuze",
    leegLabel: "Maak een keuze",
    keuzes: contactRollen.map((rol) => ({
      waarde: rol,
      label: contactRolLabels[rol],
    })),
    verplicht: true,
  },
  {
    naam: "bericht",
    label: "Bericht",
    soort: "tekstvlak",
    regels: 4,
    verplicht: true,
    volleBreedte: true,
  },
];

export default function ContactPage() {
  return (
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Contact"
        subregel="Stel je vraag over de clubactie. Ben je lid van een vereniging, dan helpen we je op weg met je aanmelding. Ben je bestuurslid, dan kijken we samen wat de actie voor je club betekent."
        foto="/windmolens-schapen.webp"
        alt="Rij windmolens langs een dijk met schapen in het gras ervoor"
      />

      <SectieAfspraak
        headingId="contact-afspraak"
        kop="Plan een afspraak in onze showroom"
        subregel=""
      />

      <SectieContactgegevens />

      {/* Foto links, navy paneel met het formulier rechts. */}
      <ContactFormulier
        id="contact-formulier"
        titel="Stuur een bericht"
        paneel="navy"
        velden={velden}
        verborgenVelden={[{ naam: "actie", waarde: "contact" }]}
        action={stuurContact}
        beginState={{ success: false }}
        knopLabel="Stuur mijn bericht"
        knopBezigLabel="Versturen…"
        bevestiging={{
          titel: "Bericht ontvangen",
          tekst: "We hebben je bericht ontvangen. We nemen contact met je op.",
        }}
        foto={{
          src: "/windmolens-schapen.webp",
          alt: "Rij windmolens langs een dijk met schapen in het gras ervoor",
        }}
        plausibleEvent="Contactbericht"
      />
    </main>
  );
}
