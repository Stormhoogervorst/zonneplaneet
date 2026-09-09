import Link from "next/link";
import { meldActieAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import type { ActieType } from "@/lib/validatie";

const velden: FormulierVeld[] = [
  {
    naam: "naam",
    label: "Naam",
    soort: "tekst",
    autoComplete: "name",
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
    label: "Ik geef toestemming om mijn gegevens te gebruiken voor deze actie.",
    soort: "vinkje",
    verplicht: true,
    volleBreedte: true,
  },
];

type ActieFormulierProps = {
  actie: ActieType;
};

export function ActieFormulier({ actie }: ActieFormulierProps) {
  const isWinactie = actie === "winactie";

  return (
    <ContactFormulier
      id={`${actie}-formulier`}
      titel="Meld je aan"
      paneel="navy"
      velden={velden}
      verborgenVelden={[{ naam: "actie", waarde: actie }]}
      action={meldActieAan}
      beginState={{ success: false }}
      knopLabel={isWinactie ? "Doe mee" : "Meld me aan"}
      knopBezigLabel="Aanmelden…"
      naschrift="TODO"
      bijKnop={
        isWinactie ? (
          <Link
            href="/actievoorwaarden"
            className="text-sm text-tag underline underline-offset-4"
          >
            Lees de actievoorwaarden
          </Link>
        ) : undefined
      }
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst: "We hebben je gegevens ontvangen.",
      }}
      foto={{
        src: "/windmolens-schapen.webp",
        alt: "Rij windmolens langs een dijk met schapen in het gras ervoor",
      }}
      plausibleEvent={isWinactie ? "WinactieAanmelding" : "CashbackAanmelding"}
    />
  );
}
