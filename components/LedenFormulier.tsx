import Link from "next/link";
import { meldLidAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import {
  ledenInteresseLabels,
  ledenInteresses,
  vervolgstapLabels,
  vervolgstappen,
} from "@/lib/validatie";

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
    naam: "telefoon",
    label: "Telefoonnummer",
    soort: "telefoon",
    autoComplete: "tel",
    verplicht: true,
  },
  {
    naam: "email",
    label: "E-mailadres (optioneel)",
    soort: "email",
    autoComplete: "email",
    hulptekst: "Vul je e-mailadres in als we je ook per mail mogen bereiken.",
  },
  {
    naam: "interesse",
    label: "Waar heb je interesse in?",
    soort: "keuze",
    leegLabel: "Kies een optie",
    keuzes: ledenInteresses.map((waarde) => ({
      waarde,
      label: ledenInteresseLabels[waarde],
    })),
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "clubnaam",
    label: "Naam van je vereniging",
    soort: "tekst",
    autoComplete: "organization",
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "clubplaats",
    label: "Plaats van je vereniging",
    soort: "tekst",
    autoComplete: "address-level2",
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "vervolgstap",
    label: "Wat wil je?",
    soort: "radio",
    keuzes: vervolgstappen.map((waarde) => ({
      waarde,
      label: vervolgstapLabels[waarde],
    })),
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "akkoord",
    label: (
      <>
        Ik geef toestemming om mijn gegevens te gebruiken voor mijn aanvraag.{" "}
        <Link href="/voorwaarden" className="underline">
          Ik ga akkoord met de actievoorwaarden.
        </Link>
      </>
    ),
    soort: "vinkje",
    verplicht: true,
    volleBreedte: true,
  },
];

export function LedenFormulier() {
  return (
    <ContactFormulier
      id="aanmelden"
      className="scroll-mt-[var(--hoogte-headerbalk)]"
      titel="Meld je aan"
      paneel="navy"
      velden={velden}
      verborgenVelden={[{ naam: "actie", waarde: "clubactie" }]}
      action={meldLidAan}
      beginState={{ success: false }}
      knopLabel="Meld me aan"
      knopBezigLabel="Aanmelden…"
      naschrift="Vrijblijvend. Je zit nergens aan vast tot je een offerte tekent."
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst: "We hebben je bericht ontvangen. We nemen contact met je op.",
      }}
      foto={{
        src: "/zonnepanelen-woningen.jpg",
        alt: "Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken",
      }}
      plausibleEvent="Aanmelding"
    />
  );
}
