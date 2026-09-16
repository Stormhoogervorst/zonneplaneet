import { meldReferralAan } from "@/app/aanmelden/actions";
import {
  ContactFormulier,
  type FormulierBlok,
  type FormulierVeld,
} from "@/components/ContactFormulier";
import { referralInteresseLabels, referralInteresses } from "@/lib/validatie";

const aandragerVelden: FormulierVeld[] = [
  {
    naam: "aandragerNaam",
    label: "Naam",
    soort: "tekst",
    autoComplete: "name",
    verplicht: true,
  },
  {
    naam: "aandragerEmail",
    label: "E-mailadres",
    soort: "email",
    autoComplete: "email",
    verplicht: true,
  },
  {
    naam: "aandragerTelefoon",
    label: "Telefoonnummer",
    soort: "telefoon",
    autoComplete: "tel",
    verplicht: true,
  },
];

const aangedrageneVelden: FormulierVeld[] = [
  {
    naam: "voornaam",
    label: "Voornaam",
    soort: "tekst",
    autoComplete: "section-aangedragene given-name",
    verplicht: true,
  },
  {
    naam: "achternaam",
    label: "Achternaam",
    soort: "tekst",
    autoComplete: "section-aangedragene family-name",
    verplicht: true,
  },
  {
    naam: "email",
    label: "E-mailadres",
    soort: "email",
    autoComplete: "section-aangedragene email",
    verplicht: true,
  },
  {
    naam: "telefoon",
    label: "Telefoonnummer",
    soort: "telefoon",
    autoComplete: "section-aangedragene tel",
    verplicht: true,
  },
  {
    naam: "plaats",
    label: "Plaats",
    soort: "tekst",
    autoComplete: "section-aangedragene address-level2",
    verplicht: true,
  },
  {
    naam: "interesse",
    label: "Waar heeft diegene interesse in?",
    soort: "keuze",
    leegLabel: "Kies een optie",
    keuzes: referralInteresses.map((waarde) => ({
      waarde,
      label: referralInteresseLabels[waarde],
    })),
    verplicht: true,
    volleBreedte: true,
  },
  {
    naam: "opmerking",
    label: "Opmerking (optioneel)",
    soort: "tekstvlak",
    regels: 3,
    volleBreedte: true,
  },
];

const toestemmingVeld: FormulierVeld = {
  naam: "toestemming",
  label:
    "Ik heb toestemming van deze persoon om zijn of haar gegevens door te geven.",
  soort: "vinkje",
  verplicht: true,
  volleBreedte: true,
};

const blokken: FormulierBlok[] = [
  { kopje: "↳ JOUW GEGEVENS", velden: aandragerVelden },
  { kopje: "↳ WIE JE AANDRAAGT", velden: aangedrageneVelden },
];

export function ReferralFormulier() {
  return (
    <ContactFormulier
      id="referral-formulier"
      titel="Jullie gegevens"
      paneel="navy"
      blokken={blokken}
      velden={[toestemmingVeld]}
      verborgenVelden={[{ naam: "actie", waarde: "referral" }]}
      action={meldReferralAan}
      beginState={{ success: false }}
      knopLabel="Draag deze persoon aan"
      knopBezigLabel="Versturen…"
      naschrift={
        <>
          <p>
            Je ontvangt €200 zodra degene die je aandraagt de installatie heeft
            laten uitvoeren.
          </p>
          <div className="mt-4 space-y-1 text-[0.875rem] leading-[1.6] text-white/70">
            <p>Je ontvangt het bedrag na installatie, niet bij aanmelding.</p>
            <p>De persoon die je aandraagt mag nog niet bij ons bekend zijn.</p>
          </div>
        </>
      }
      bevestiging={{
        titel: "Aanmelding ontvangen",
        tekst: "We hebben je bericht ontvangen. We nemen contact met je op.",
      }}
      foto={{
        src: "/windmolens-schapen.webp",
        alt: "Rij windmolens langs een dijk met schapen in het gras ervoor",
      }}
      plausibleEvent="ReferralAanmelding"
    />
  );
}
