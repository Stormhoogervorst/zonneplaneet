import { meldAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import { interesses } from "@/lib/validatie";

const interesseLabels: Record<(typeof interesses)[number], string> = {
  panelen: "Zonnepanelen",
  batterij: "Thuisbatterij",
  beide: "Zonnepanelen en thuisbatterij",
  laadpaal: "Laadpaal",
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
    label: "E-mailadres (optioneel)",
    soort: "email",
    autoComplete: "email",
    hulptekst: "Vul je e-mailadres in als je een bevestiging wilt ontvangen.",
  },
  {
    naam: "telefoon",
    label: "Telefoonnummer",
    soort: "telefoon",
    autoComplete: "tel",
    verplicht: true,
  },
  {
    naam: "postcode",
    label: "Postcode",
    soort: "tekst",
    autoComplete: "postal-code",
    verplicht: true,
  },
  {
    naam: "interesse",
    label: "Waar heb je interesse in?",
    soort: "keuze",
    leegLabel: "Kies een optie",
    keuzes: interesses.map((waarde) => ({
      waarde,
      label: interesseLabels[waarde],
    })),
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "akkoord",
    label:
      "Ik geef toestemming om mijn gegevens met mijn clubcode te gebruiken voor mijn aanvraag.",
    soort: "vinkje",
    verplicht: true,
    volleBreedte: true,
  },
];

type AanmeldFormulierProps = {
  clubslug: string;
  clubcode: string;
};

export function AanmeldFormulier({
  clubslug,
  clubcode,
}: AanmeldFormulierProps) {
  return (
    <ContactFormulier
      id="aanmelden"
      className="scroll-mt-8"
      titel="Meld je aan"
      paneel="navy"
      velden={velden}
      verborgenVelden={[
        { naam: "clubslug", waarde: clubslug },
        { naam: "clubcode", waarde: clubcode },
      ]}
      action={meldAan}
      beginState={{ success: false }}
      knopLabel="Meld me aan"
      knopBezigLabel="Aanmelden…"
      naschrift="Vrijblijvend. Je zit nergens aan vast tot je een offerte tekent."
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst: `We hebben je aanmelding ontvangen. Je clubcode is ${clubcode}. Noem deze code als we je bellen.`,
      }}
      foto={{
        src: "/windmolens-schapen.webp",
        alt: "Rij windmolens langs een dijk met schapen in het gras ervoor",
      }}
      plausibleEvent="Aanmelding"
      plausibleProps={{ clubcode }}
    />
  );
}
