import "server-only";

import { Resend } from "resend";

import {
  contactRolLabels,
  ledenInteresseLabels,
  referralInteresseLabels,
  vervolgstapLabels,
} from "@/lib/validatie";

export const leadMailTypes = [
  "contact",
  "clubactie",
  "referral",
  "partner",
  "cashback",
  "winactie",
] as const;

export type LeadMailType = (typeof leadMailTypes)[number];

export type LeadMailInvoer = {
  type: string;
  subject: string;
  fromName?: string;
  replyTo?: string;
  velden: Record<string, string>;
  leadId: string;
};

export type LeadMailBericht = {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  fromName?: string;
};

export type LeadMailResultaat =
  | { ok: true; id: string }
  | {
      ok: false;
      error: string;
      code?: string;
      statusCode?: number | null;
    };

const interesseLabels: Record<string, string> = {
  ...ledenInteresseLabels,
  ...referralInteresseLabels,
  panelen: "Zonnepanelen",
  batterij: "Thuisbatterij",
  beide: "Zonnepanelen en thuisbatterij",
  laadpaal: "Laadpaal",
};

const actieLabels: Record<LeadMailType, string> = {
  contact: "Contact",
  clubactie: "Clubactie",
  referral: "Referral",
  partner: "Partner",
  cashback: "Cashback",
  winactie: "Winactie",
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
  contactpersoon: "Contactpersoon",
  ledenaantal: "Aantal leden",
};

const referralSleutelLabels: Record<string, string> = {
  voornaam: "Voornaam van de aangedragene",
  achternaam: "Achternaam van de aangedragene",
  email: "E-mailadres van de aangedragene",
  telefoon: "Telefoonnummer van de aangedragene",
  plaats: "Plaats van de aangedragene",
  interesse: "Interesse van de aangedragene",
};

const emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isLeadMailType(type: string): type is LeadMailType {
  return (leadMailTypes as readonly string[]).includes(type);
}

function labelVoorSleutel(type: LeadMailType, naam: string): string {
  if (type === "referral" && naam in referralSleutelLabels) {
    return referralSleutelLabels[naam];
  }

  return sleutelLabels[naam] ?? naam;
}

function labelVoorWaarde(naam: string, waarde: string): string {
  return waardeLabels[naam]?.[waarde] ?? waarde;
}

export function onderwerpVoorLead(
  type: string,
  velden: Record<string, string>,
): string {
  if (!isLeadMailType(type)) {
    throw new Error(
      `Onbekend formuliertype "${type}". Verwachte waarden: ${leadMailTypes.join(", ")}.`,
    );
  }

  if (type === "contact") {
    const rol = velden.rol ? labelVoorWaarde("rol", velden.rol) : "";
    return rol ? `Nieuw contactbericht: ${rol}` : "Nieuw contactbericht";
  }

  if (type === "referral") {
    const aangedragene =
      `${velden.voornaam ?? ""} ${velden.achternaam ?? ""}`.trim();
    return aangedragene
      ? `Referral — ${aangedragene} via ${velden.aandragerNaam ?? ""}`.trim()
      : "Referral";
  }

  if (type === "partner") {
    return velden.clubnaam
      ? `Nieuwe clubaanmelding: ${velden.clubnaam}`
      : "Nieuwe clubaanmelding";
  }

  if (type === "cashback" || type === "winactie") {
    return `Nieuwe aanmelding: ${type}`;
  }

  const club = velden.clubnaam || velden.clubcode;
  return club ? `Aanmelding clubactie — ${club}` : "Aanmelding clubactie";
}

export function afzenderVoorLead(
  type: string,
  velden: Record<string, string>,
): { fromName?: string; replyTo?: string } {
  if (!isLeadMailType(type)) {
    throw new Error(
      `Onbekend formuliertype "${type}". Verwachte waarden: ${leadMailTypes.join(", ")}.`,
    );
  }

  if (type === "referral") {
    return {
      ...(velden.aandragerNaam ? { fromName: velden.aandragerNaam } : {}),
      ...(velden.aandragerEmail ? { replyTo: velden.aandragerEmail } : {}),
    };
  }

  if (type === "partner") {
    return {
      ...(velden.contactpersoon ? { fromName: velden.contactpersoon } : {}),
      ...(velden.email ? { replyTo: velden.email } : {}),
    };
  }

  const naam = `${velden.voornaam ?? ""} ${velden.achternaam ?? ""}`.trim();
  return {
    ...(naam ? { fromName: naam } : {}),
    ...(velden.email ? { replyTo: velden.email } : {}),
  };
}

export function veldenVoorLeadMail(
  type: string,
  velden: Record<string, string>,
): Record<string, string> {
  if (!isLeadMailType(type)) {
    throw new Error(
      `Onbekend formuliertype "${type}". Verwachte waarden: ${leadMailTypes.join(", ")}.`,
    );
  }

  const mailVelden: Record<string, string> = {};

  for (const [naam, waarde] of Object.entries(velden)) {
    if (naam === "Samenvatting") {
      continue;
    }
    mailVelden[labelVoorSleutel(type, naam)] = labelVoorWaarde(naam, waarde);
  }

  mailVelden.Samenvatting = Object.entries(mailVelden)
    .map(([naam, waarde]) => `${naam}: ${waarde}`)
    .join("\n");

  return mailVelden;
}

export function zonderRegeleinden(waarde: string): string {
  return waarde
    .replace(/[\r\n]+/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function htmlEscape(waarde: string): string {
  return waarde
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function geldigEmailadres(waarde: string | undefined): string | undefined {
  if (!waarde) {
    return undefined;
  }

  const schoon = zonderRegeleinden(waarde);
  if (!emailPatroon.test(schoon)) {
    return undefined;
  }

  return schoon;
}

function formulierLabel(type: string): string {
  return isLeadMailType(type) ? actieLabels[type] : type;
}

function veldenMetSamenvatting(
  velden: Record<string, string>,
): Record<string, string> {
  if ("Samenvatting" in velden) {
    return velden;
  }

  const mailVelden = { ...velden };
  mailVelden.Samenvatting = Object.entries(velden)
    .map(([naam, waarde]) => `${naam}: ${waarde}`)
    .join("\n");
  return mailVelden;
}

export function bouwLeadMail(invoer: LeadMailInvoer): LeadMailBericht {
  const subject = zonderRegeleinden(invoer.subject);
  const fromName = invoer.fromName
    ? zonderRegeleinden(invoer.fromName)
    : undefined;
  const replyTo = geldigEmailadres(invoer.replyTo);
  const formulier = formulierLabel(invoer.type);
  const velden = veldenMetSamenvatting(invoer.velden);

  const tekstRegels = [
    `Formulier: ${formulier}`,
    `Lead-id: ${invoer.leadId}`,
    ...(fromName ? [`Afzender: ${fromName}`] : []),
    "",
    ...Object.entries(velden).map(([label, waarde]) => `${label}: ${waarde}`),
  ];

  const htmlRijen = Object.entries(velden)
    .map(([label, waarde]) => {
      const cel = htmlEscape(waarde).replaceAll("\n", "<br>");
      return `<tr><th align="left">${htmlEscape(label)}</th><td>${cel}</td></tr>`;
    })
    .join("");

  const afzenderHtml = fromName
    ? `<p><strong>Afzender:</strong> ${htmlEscape(fromName)}</p>`
    : "";

  const html = [
    `<p><strong>Formulier:</strong> ${htmlEscape(formulier)}</p>`,
    `<p><strong>Lead-id:</strong> ${htmlEscape(invoer.leadId)}</p>`,
    afzenderHtml,
    `<table cellpadding="6" cellspacing="0" border="1"><tbody>${htmlRijen}</tbody></table>`,
  ]
    .filter(Boolean)
    .join("");

  return {
    subject,
    html,
    text: tekstRegels.join("\n"),
    ...(fromName ? { fromName } : {}),
    ...(replyTo ? { replyTo } : {}),
  };
}

type MailOmgeving = {
  apiKey: string;
  from: string;
  to: string[];
};

function leesMailOmgeving(): MailOmgeving | { error: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim() ?? "";
  const from = process.env.RESEND_FROM?.trim() ?? "";
  const to = (process.env.LEAD_NOTIFY_TO ?? "")
    .split(",")
    .map((adres) => adres.trim())
    .filter(Boolean);

  if (!apiKey) {
    return {
      error:
        "RESEND_API_KEY ontbreekt. Zet RESEND_API_KEY in de omgevingsvariabelen.",
    };
  }

  if (!from) {
    return {
      error:
        "RESEND_FROM ontbreekt. Zet RESEND_FROM in de omgevingsvariabelen.",
    };
  }

  if (to.length === 0) {
    return {
      error:
        "LEAD_NOTIFY_TO ontbreekt. Zet LEAD_NOTIFY_TO in de omgevingsvariabelen, als één adres of als kommagescheiden lijst.",
    };
  }

  return { apiKey, from, to };
}

function fouttekst(fout: unknown): string {
  if (fout instanceof Error && fout.message) {
    return fout.message;
  }

  return "De mail kon niet worden verstuurd.";
}

export async function verstuurLeadMail(
  invoer: LeadMailInvoer,
): Promise<LeadMailResultaat> {
  const omgeving = leesMailOmgeving();
  if ("error" in omgeving) {
    return { ok: false, error: omgeving.error, code: "configuratie" };
  }

  const bericht = bouwLeadMail(invoer);

  try {
    const resend = new Resend(omgeving.apiKey);
    const { data, error } = await resend.emails.send(
      {
        from: omgeving.from,
        to: omgeving.to,
        subject: bericht.subject,
        html: bericht.html,
        text: bericht.text,
        ...(bericht.replyTo ? { replyTo: bericht.replyTo } : {}),
      },
      { idempotencyKey: invoer.leadId },
    );

    if (error) {
      return {
        ok: false,
        error: error.message || "Resend wees de mail af.",
        code: error.name,
        statusCode: error.statusCode,
      };
    }

    if (!data?.id) {
      return {
        ok: false,
        error: "Resend gaf geen mail-id terug.",
        code: "geen_id",
      };
    }

    return { ok: true, id: data.id };
  } catch (fout) {
    return { ok: false, error: fouttekst(fout), code: "netwerk" };
  }
}
