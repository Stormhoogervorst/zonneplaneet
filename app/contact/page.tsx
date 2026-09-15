import type { Metadata } from "next";
import { stuurContact } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import { ContactKop } from "@/components/ContactKop";
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
    label: "Telefoonnummer (optioneel)",
    soort: "telefoon",
    autoComplete: "tel",
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
    <main data-donker-einde data-geen-vertrouwensblok>
      <ContactKop
        headingId="contact-kop-titel"
        eyebrow="NEEM CONTACT OP"
        titel="Contact"
        alinea="Stel je vraag over de clubactie. Ben je lid van een vereniging, dan helpen we je op weg met je aanmelding. Ben je bestuurslid, dan kijken we samen wat de actie voor je club betekent."
      />

      {/* Foto links, navy paneel met het formulier rechts. Loopt over de volle
          breedte en sluit direct aan op het kopblok. */}
      <ContactFormulier
        id="contact-formulier"
        titel="Stuur een bericht"
        paneel="navy"
        velden={velden}
        action={stuurContact}
        beginState={{ success: false }}
        knopLabel="Stuur mijn bericht"
        knopBezigLabel="Versturen…"
        naschrift="We reageren binnen twee werkdagen."
        bevestiging={{
          titel: "Bericht ontvangen",
          tekst:
            "We hebben je bericht ontvangen en reageren binnen twee werkdagen.",
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
