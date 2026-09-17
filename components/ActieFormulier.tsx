import { meldActieAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import type { ActieType } from "@/lib/validatie";

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
  {
    naam: "postcode",
    label: "Postcode",
    soort: "tekst",
    autoComplete: "postal-code",
    verplicht: true,
  },
  {
    naam: "akkoord",
    label: (
      <>
        Ik geef toestemming om mijn gegevens te gebruiken voor deze actie. Ik ga
        akkoord met de{" "}
        <a href="/voorwaarden" className="underline">
          algemene voorwaarden
        </a>
        .
      </>
    ),
    soort: "vinkje",
    verplicht: true,
    volleBreedte: true,
  },
];

type ActieFormulierProps = {
  actie: ActieType;
};

export function ActieFormulier({ actie }: ActieFormulierProps) {
  return (
    <ContactFormulier
      id={`${actie}-formulier`}
      titel="Meld je aan"
      paneel="navy"
      velden={velden}
      verborgenVelden={[{ naam: "actie", waarde: actie }]}
      action={meldActieAan}
      beginState={{ success: false }}
      knopLabel="Meld me aan"
      knopBezigLabel="Aanmelden…"
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst: "We hebben je gegevens ontvangen.",
      }}
      foto={{
        src: "/windmolens-schapen.webp",
        alt: "Rij windmolens langs een dijk met schapen in het gras ervoor",
      }}
      plausibleEvent="CashbackAanmelding"
    />
  );
}
