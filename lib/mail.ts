import "server-only";

import { Resend } from "resend";
import type { Club } from "@/lib/clubs";
import type { Lead, PartnerLead } from "@/lib/leads";
import type { Aanmelding } from "@/lib/validatie";

const interesseLabels: Record<Aanmelding["interesse"], string> = {
  panelen: "Zonnepanelen",
  batterij: "Thuisbatterij",
  beide: "Zonnepanelen en thuisbatterij",
  laadpaal: "Laadpaal",
};

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const van = process.env.MAIL_VAN;
  const zonneplaneet = process.env.MAIL_ZONNEPLANEET;

  if (!apiKey || !van || !zonneplaneet) {
    throw new Error(
      "Mailconfiguratie ontbreekt. Controleer RESEND_API_KEY, MAIL_VAN en MAIL_ZONNEPLANEET.",
    );
  }

  return { resend: new Resend(apiKey), van, zonneplaneet };
}

export async function stuurBevestiging(lead: Lead): Promise<void> {
  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: lead.email,
    subject: `Je aanmelding via ${lead.clubcode}`,
    text: [
      `Hoi ${lead.naam},`,
      "",
      "We hebben je aanmelding ontvangen en doorgestuurd naar Zonneplaneet.",
      `Je clubcode is ${lead.clubcode}. Noem deze code als Zonneplaneet je belt.`,
      "Zonneplaneet neemt binnen twee werkdagen contact met je op.",
      "",
      "Je zit nergens aan vast tot je een offerte tekent.",
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(`Bevestigingsmail mislukt: ${resultaat.error.message}`);
  }
}

export async function stuurDoorNaarZonneplaneet(
  lead: Lead,
  club: Club,
): Promise<void> {
  const { resend, van, zonneplaneet } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: zonneplaneet,
    replyTo: lead.email,
    subject: `Nieuwe aanmelding via ${club.naam}`,
    text: [
      `Via: ${club.naam} — ledenvoordeel van toepassing`,
      "",
      `Naam: ${lead.naam}`,
      `Telefoon: ${lead.telefoon}`,
      `E-mail: ${lead.email}`,
      `Postcode: ${lead.postcode}`,
      `Interesse: ${interesseLabels[lead.interesse]}`,
      `Clubcode: ${lead.clubcode}`,
      `Lead-id: ${lead.id}`,
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(`Doorzendmail mislukt: ${resultaat.error.message}`);
  }
}

export async function stuurPartnerAanmelding(
  lead: PartnerLead,
): Promise<void> {
  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: van,
    replyTo: lead.email,
    subject: `Nieuwe clubaanmelding: ${lead.clubnaam}`,
    text: [
      "Nieuwe aanmelding van een sportvereniging",
      "",
      `Clubnaam: ${lead.clubnaam}`,
      `Plaats: ${lead.plaats}`,
      `Contactpersoon: ${lead.contactpersoon}`,
      `E-mail: ${lead.email}`,
      `Telefoon: ${lead.telefoon}`,
      `Aantal leden: ${lead.ledenaantal}`,
      `Lead-id: ${lead.id}`,
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(`Mail over clubaanmelding mislukt: ${resultaat.error.message}`);
  }
}
