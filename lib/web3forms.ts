import "server-only";

import type { ContactLead, LedenLead, ReferralLead } from "@/lib/leads";
import {
  contactRolLabels,
  ledenInteresseLabels,
  referralInteresseLabels,
  vervolgstapLabels,
} from "@/lib/validatie";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
/* Publieke Web3Forms-sleutels: /contact, /leden en /referral zijn drie
   aparte formulieren. Mag via de bijbehorende env-var worden overschreven. */
const contactSleutel = "f5da23a1-0691-4931-b6d1-3130c2bb2b8f";
const ledenSleutel = "9a89e48b-f9b4-4b53-beda-88843da0931e";
const referralSleutel = "77eaa729-5fe1-45b5-9d87-869159bf9550";

function accessKey(naam: string, fallback: string): string {
  const uitEnv = process.env[naam]?.trim();
  return uitEnv && uitEnv.length > 0 ? uitEnv : fallback;
}

function volledigeNaam(persoon: { voornaam: string; achternaam: string }) {
  return `${persoon.voornaam} ${persoon.achternaam}`;
}

async function verstuur(formulier: FormData): Promise<void> {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    body: formulier,
    cache: "no-store",
  });

  let data: { success?: boolean; message?: string };
  try {
    data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };
  } catch (fout) {
    throw new Error(
      `Web3Forms gaf geen geldig antwoord (${response.status}).`,
      { cause: fout },
    );
  }

  if (!data.success) {
    throw new Error(
      `Web3Forms-verzending mislukt: ${data.message ?? "onbekende fout"}`,
    );
  }
}

export async function stuurContactViaWeb3Forms(
  lead: ContactLead,
): Promise<void> {
  const formulier = new FormData();
  formulier.append(
    "access_key",
    accessKey("WEB3FORMS_CONTACT_ACCESS_KEY", contactSleutel),
  );
  formulier.append(
    "subject",
    `Nieuw contactbericht: ${contactRolLabels[lead.rol]}`,
  );
  formulier.append("from_name", "Zonneplaneet Actie");
  formulier.append("name", `${lead.voornaam} ${lead.achternaam}`);
  formulier.append("email", lead.email);
  formulier.append("voornaam", lead.voornaam);
  formulier.append("achternaam", lead.achternaam);
  formulier.append(
    "telefoon",
    lead.telefoon === "" ? "niet opgegeven" : lead.telefoon,
  );
  formulier.append("rol", contactRolLabels[lead.rol]);
  formulier.append("message", lead.bericht);
  formulier.append("lead_id", lead.id);

  await verstuur(formulier);
}

export async function stuurLedenViaWeb3Forms(lead: LedenLead): Promise<void> {
  const formulier = new FormData();
  formulier.append(
    "access_key",
    accessKey("WEB3FORMS_LEDEN_ACCESS_KEY", ledenSleutel),
  );
  formulier.append(
    "subject",
    `Nieuwe aanmelding via ${lead.clubnaam} — ${vervolgstapLabels[lead.vervolgstap]}`,
  );
  formulier.append("from_name", "Zonneplaneet Actie");
  formulier.append("name", volledigeNaam(lead));
  if (lead.email) {
    formulier.append("email", lead.email);
  }
  formulier.append("voornaam", lead.voornaam);
  formulier.append("achternaam", lead.achternaam);
  formulier.append("telefoon", lead.telefoon);
  formulier.append("interesse", ledenInteresseLabels[lead.interesse]);
  formulier.append("clubnaam", lead.clubnaam);
  formulier.append("clubplaats", lead.clubplaats);
  formulier.append("vervolgstap", vervolgstapLabels[lead.vervolgstap]);
  formulier.append("actie", lead.actie);
  formulier.append("lead_id", lead.id);
  formulier.append(
    "message",
    [
      `Via: ${lead.clubnaam} (${lead.clubplaats})`,
      `Actie: ${lead.actie}`,
      `Vervolgstap: ${vervolgstapLabels[lead.vervolgstap]}`,
      "",
      `Voornaam: ${lead.voornaam}`,
      `Achternaam: ${lead.achternaam}`,
      `Telefoon: ${lead.telefoon}`,
      lead.email
        ? `E-mail: ${lead.email}`
        : "E-mail: niet opgegeven. Neem contact op via telefoon.",
      `Interesse: ${ledenInteresseLabels[lead.interesse]}`,
      `Lead-id: ${lead.id}`,
    ].join("\n"),
  );

  await verstuur(formulier);
}

export async function stuurReferralViaWeb3Forms(
  lead: ReferralLead,
): Promise<void> {
  const formulier = new FormData();
  formulier.append(
    "access_key",
    accessKey("WEB3FORMS_REFERRAL_ACCESS_KEY", referralSleutel),
  );
  formulier.append(
    "subject",
    `Referral — ${volledigeNaam(lead)} via ${lead.aandragerNaam}`,
  );
  formulier.append("from_name", "Zonneplaneet Actie");
  formulier.append("name", lead.aandragerNaam);
  formulier.append("email", lead.aandragerEmail);
  formulier.append("aandrager_naam", lead.aandragerNaam);
  formulier.append("aandrager_email", lead.aandragerEmail);
  formulier.append(
    "aandrager_telefoon",
    lead.aandragerTelefoon === "" ? "niet opgegeven" : lead.aandragerTelefoon,
  );
  formulier.append("voornaam", lead.voornaam);
  formulier.append("achternaam", lead.achternaam);
  formulier.append("aangedragene_email", lead.email);
  formulier.append("telefoon", lead.telefoon);
  formulier.append("plaats", lead.plaats);
  formulier.append("interesse", referralInteresseLabels[lead.interesse]);
  formulier.append(
    "opmerking",
    lead.opmerking === "" ? "geen" : lead.opmerking,
  );
  formulier.append("toestemming", "ja");
  formulier.append("lead_id", lead.id);
  formulier.append(
    "message",
    [
      "Nieuwe referral via het aanmeldformulier",
      "",
      "Aandrager",
      `Naam: ${lead.aandragerNaam}`,
      `E-mail: ${lead.aandragerEmail}`,
      `Telefoon: ${
        lead.aandragerTelefoon === ""
          ? "niet opgegeven"
          : lead.aandragerTelefoon
      }`,
      "",
      "Aangedragene",
      `Voornaam: ${lead.voornaam}`,
      `Achternaam: ${lead.achternaam}`,
      `E-mail: ${lead.email}`,
      `Telefoon: ${lead.telefoon}`,
      `Plaats: ${lead.plaats}`,
      `Interesse: ${referralInteresseLabels[lead.interesse]}`,
      `Opmerking: ${lead.opmerking === "" ? "geen" : lead.opmerking}`,
      "",
      "Toestemming om gegevens door te geven: ja",
      `Lead-id: ${lead.id}`,
    ].join("\n"),
  );

  await verstuur(formulier);
}
