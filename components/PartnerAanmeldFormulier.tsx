import { meldClubAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierVeld,
} from "@/components/ContactFormulier";

const velden: FormulierVeld[] = [
  {
    naam: "clubnaam",
    label: "Clubnaam",
    soort: "tekst",
    autoComplete: "organization",
    verplicht: true,
  },
  {
    naam: "plaats",
    label: "Plaats",
    soort: "tekst",
    autoComplete: "address-level2",
    verplicht: true,
  },
  {
    naam: "contactpersoon",
    label: "Naam contactpersoon",
    soort: "tekst",
    autoComplete: "name",
    verplicht: true,
  },
  {
    naam: "ledenaantal",
    label: "Aantal leden",
    soort: "getal",
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
  /* TODO: `opmerking` staat niet in partnerAanmeldingSchema en gaat daardoor
     niet mee naar de opslag of de mail. Voeg het veld toe aan de validatie, de
     server action en de mailtemplate, of haal dit veld weg. */
  {
    naam: "opmerking",
    label: "Opmerking (optioneel)",
    soort: "tekstvlak",
    regels: 4,
    volleBreedte: true,
  },
];

export function PartnerAanmeldFormulier() {
  return (
    <ContactFormulier
      id="club-aanmelden"
      titel="Aanmelden"
      velden={velden}
      action={meldClubAan}
      beginState={{ success: false }}
      knopLabel="Meld mijn club aan"
      knopBezigLabel="Aanmelden…"
      naschrift="We nemen binnen twee werkdagen contact op."
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst:
          "We hebben de gegevens van je club ontvangen. We bellen je binnen twee werkdagen om de vervolgstappen te bespreken.",
      }}
      foto={{
        src: "/zonnepanelen-woningen.jpg",
        alt: "Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken",
      }}
      plausibleEvent="Partneraanmelding"
    />
  );
}
