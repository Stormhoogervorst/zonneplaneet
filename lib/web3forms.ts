import {
  contactRolLabels,
  ledenInteresseLabels,
  referralInteresseLabels,
  vervolgstapLabels,
} from "@/lib/validatie";

export const web3formsActies = [
  "contact",
  "clubactie",
  "referral",
  "showroom",
] as const;
export type Web3FormsActie = (typeof web3formsActies)[number];

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const sleutels: Record<Web3FormsActie, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY,
  clubactie: process.env.NEXT_PUBLIC_WEB3FORMS_LEDEN_KEY,
  referral: process.env.NEXT_PUBLIC_WEB3FORMS_REFERRAL_KEY,
  showroom: process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY,
};

const sleutelNamen: Record<Web3FormsActie, string> = {
  contact: "NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY",
  clubactie: "NEXT_PUBLIC_WEB3FORMS_LEDEN_KEY",
  referral: "NEXT_PUBLIC_WEB3FORMS_REFERRAL_KEY",
  showroom: "NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY",
};

const vinkVeldenPerActie: Record<Web3FormsActie, readonly string[]> = {
  clubactie: ["akkoord"],
  referral: ["toestemming"],
  contact: [],
  showroom: [],
};

const interesseLabels: Record<string, string> = {
  ...ledenInteresseLabels,
  ...referralInteresseLabels,
  panelen: "Zonnepanelen",
  batterij: "Thuisbatterij",
  beide: "Zonnepanelen en thuisbatterij",
  laadpaal: "Laadpaal",
};

const actieLabels: Record<Web3FormsActie, string> = {
  contact: "Contact",
  clubactie: "Clubactie",
  referral: "Referral",
  showroom: "Showroomafspraak",
};

const waardeLabels: Record<string, Record<string, string>> = {
  interesse: interesseLabels,
  vervolgstap: vervolgstapLabels,
  rol: contactRolLabels,
  actie: actieLabels,
};

const sleutelLabels: Record<string, string> = {
  voornaam: "Voornaam",
  achternaam: "Achternaam",
  telefoon: "Telefoonnummer",
  email: "E-mailadres",
  interesse: "Interesse",
  clubnaam: "Vereniging",
  clubplaats: "Plaats van de vereniging",
  vervolgstap: "Vervolgstap",
  akkoord: "Toestemming",
  actie: "Formulier",
  clubcode: "Clubcode",
  clubslug: "Clubpagina",
  postcode: "Postcode",
  rol: "Rol",
  bericht: "Bericht",
  aandragerNaam: "Naam van de aandrager",
  aandragerEmail: "E-mailadres van de aandrager",
  aandragerTelefoon: "Telefoonnummer van de aandrager",
  plaats: "Plaats",
  opmerking: "Opmerking",
  toestemming: "Toestemming om gegevens door te geven",
  naam: "Naam",
  woonplaats: "Woonplaats",
};

const referralSleutelLabels: Record<string, string> = {
  voornaam: "Voornaam van de aangedragene",
  achternaam: "Achternaam van de aangedragene",
  email: "E-mailadres van de aangedragene",
  telefoon: "Telefoonnummer van de aangedragene",
  plaats: "Plaats van de aangedragene",
  interesse: "Interesse van de aangedragene",
};

function isWeb3FormsActie(actie: string): actie is Web3FormsActie {
  return (web3formsActies as readonly string[]).includes(actie);
}

export function web3formsSleutel(actie: string): string {
  if (!isWeb3FormsActie(actie)) {
    throw new Error(
      `Onbekend formuliertype "${actie}". Verwachte waarden: contact, clubactie, referral of showroom.`,
    );
  }

  const sleutel = sleutels[actie]?.trim();
  if (!sleutel) {
    throw new Error(
      `Web3Forms-sleutel ontbreekt voor ${actie}. Zet ${sleutelNamen[actie]} in de omgevingsvariabelen.`,
    );
  }

  return sleutel;
}

function isInternVeld(naam: string): boolean {
  return naam === "website" || naam.startsWith("$");
}

function isAangevinkt(waarde: string | undefined): boolean {
  return waarde === "on" || waarde === "true" || waarde === "ja";
}

function labelVoorSleutel(actie: Web3FormsActie, naam: string): string {
  if (actie === "referral" && naam in referralSleutelLabels) {
    return referralSleutelLabels[naam];
  }

  return sleutelLabels[naam] ?? naam;
}

function labelVoorWaarde(naam: string, waarde: string): string {
  return waardeLabels[naam]?.[waarde] ?? waarde;
}

function onderwerpVoor(
  actie: Web3FormsActie,
  velden: Record<string, string>,
): string {
  if (actie === "showroom") {
    const naam = velden.naam ?? "";
    const woonplaats = velden.woonplaats ?? "";
    return `Showroomafspraak — ${naam}, ${woonplaats}`.trim();
  }

  if (actie === "contact") {
    const rol = velden.rol ? labelVoorWaarde("rol", velden.rol) : "";
    return rol ? `Nieuw contactbericht: ${rol}` : "Nieuw contactbericht";
  }

  if (actie === "referral") {
    const aangedragene =
      `${velden.voornaam ?? ""} ${velden.achternaam ?? ""}`.trim();
    return aangedragene
      ? `Referral — ${aangedragene} via ${velden.aandragerNaam ?? ""}`.trim()
      : "Referral";
  }

  const club = velden.clubnaam || velden.clubcode;
  return club ? `Aanmelding clubactie — ${club}` : "Aanmelding clubactie";
}

function afzender(
  actie: Web3FormsActie,
  velden: Record<string, string>,
): { from_name?: string; replyto?: string } {
  if (actie === "showroom") {
    return velden.naam ? { from_name: velden.naam } : {};
  }

  if (actie === "referral") {
    return {
      ...(velden.aandragerNaam ? { from_name: velden.aandragerNaam } : {}),
      ...(velden.aandragerEmail ? { replyto: velden.aandragerEmail } : {}),
    };
  }

  const naam = `${velden.voornaam ?? ""} ${velden.achternaam ?? ""}`.trim();
  return {
    ...(naam ? { from_name: naam } : {}),
    ...(velden.email ? { replyto: velden.email } : {}),
  };
}

function mailVeldenVoor(
  actie: Web3FormsActie,
  velden: Record<string, string>,
): Record<string, string> {
  const mailVelden: Record<string, string> = {};

  for (const [naam, waarde] of Object.entries(velden)) {
    mailVelden[labelVoorSleutel(actie, naam)] = labelVoorWaarde(naam, waarde);
  }

  mailVelden.Samenvatting = Object.entries(mailVelden)
    .map(([naam, waarde]) => `${naam}: ${waarde}`)
    .join("\n");

  return mailVelden;
}

/**
 * Zet de FormData van het formulier om naar de JSON-body voor Web3Forms.
 * `access_key`, `subject` en het lead-id worden hier pas toegevoegd.
 */
export function web3formsBodyUitFormulier(
  formData: FormData,
  leadId: string,
): {
  actie: Web3FormsActie;
  body: Record<string, string>;
  weggelaten: string[];
} {
  const ruw = Object.fromEntries(
    [...formData.entries()].filter(
      (invoer): invoer is [string, string] => typeof invoer[1] === "string",
    ),
  );
  const actie = String(ruw.actie ?? "").trim();
  if (!isWeb3FormsActie(actie)) {
    throw new Error(
      `Onbekend formuliertype "${actie}". Verwachte waarden: contact, clubactie, referral of showroom.`,
    );
  }

  delete ruw.website;
  for (const naam of Object.keys(ruw)) {
    if (naam.startsWith("$")) {
      delete ruw[naam];
    }
  }

  for (const vinkNaam of vinkVeldenPerActie[actie]) {
    ruw[vinkNaam] = isAangevinkt(ruw[vinkNaam]) ? "ja" : "nee";
  }

  const weggelaten: string[] = [];
  const velden: Record<string, string> = {};
  for (const [naam, waarde] of Object.entries(ruw)) {
    if (isInternVeld(naam)) {
      continue;
    }
    if (waarde.trim() === "" && !naam.toLowerCase().includes("telefoon")) {
      weggelaten.push(naam);
      continue;
    }
    velden[naam] = waarde;
  }

  const mailVelden = mailVeldenVoor(actie, velden);
  const body: Record<string, string> = {
    access_key: web3formsSleutel(actie),
    ...mailVelden,
    ...afzender(actie, velden),
    "Lead-id": leadId,
    subject: onderwerpVoor(actie, velden),
  };

  return { actie, body, weggelaten };
}

async function postNaarWeb3Forms(
  body: Record<string, string>,
): Promise<Response> {
  try {
    return await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    const formulierData = new FormData();
    for (const [naam, waarde] of Object.entries(body)) {
      formulierData.append(naam, waarde);
    }
    return await fetch(WEB3FORMS_URL, {
      method: "POST",
      body: formulierData,
    });
  }
}

export async function verstuurViaWeb3Forms(
  formData: FormData,
  leadId: string,
): Promise<{ weggelaten: string[] }> {
  const { body, weggelaten } = web3formsBodyUitFormulier(formData, leadId);
  const response = await postNaarWeb3Forms(body);

  let data: { success?: boolean; message?: string };
  try {
    data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };
  } catch (fout) {
    throw new Error(
      `Web3Forms gaf geen geldig JSON-antwoord (${response.status}).`,
      { cause: fout },
    );
  }

  if (response.status !== 200 || data.success !== true) {
    throw new Error(
      `Web3Forms-verzending mislukt (${response.status}): ${
        data.message ?? "onbekende fout"
      }`,
    );
  }

  return { weggelaten };
}
