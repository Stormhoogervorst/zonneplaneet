import "server-only";

import { Resend } from "resend";
import type { Club } from "@/lib/clubs";
import type {
  ActieLead,
  Lead,
  LedenLead,
  PartnerLead,
  ReferralLead,
} from "@/lib/leads";
import type { Aanmelding } from "@/lib/validatie";

const interesseLabels: Record<Aanmelding["interesse"], string> = {
  panelen: "Zonnepanelen",
  batterij: "Thuisbatterij",
  beide: "Zonnepanelen en thuisbatterij",
  laadpaal: "Laadpaal",
};

function volledigeNaam(persoon: { voornaam: string; achternaam: string }) {
  return `${persoon.voornaam} ${persoon.achternaam}`;
}

function afzender(van: string): string {
  const tussen = van.match(/<([^>]+)>/);
  const email = (tussen ? tussen[1] : van).trim();
  return `Zonneplaneet Actie <${email}>`;
}

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const van = process.env.MAIL_VAN;
  const zonneplaneet = process.env.MAIL_ZONNEPLANEET;

  if (!apiKey || !van || !zonneplaneet) {
    throw new Error(
      "Mailconfiguratie ontbreekt. Controleer RESEND_API_KEY, MAIL_VAN en MAIL_ZONNEPLANEET.",
    );
  }

  return { resend: new Resend(apiKey), van: afzender(van), zonneplaneet };
}

export async function stuurBevestiging(lead: Lead): Promise<void> {
  if (!lead.email) {
    return;
  }

  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: lead.email,
    subject: `Je aanmelding via ${lead.clubcode}`,
    text: [
      `Hoi ${lead.voornaam},`,
      "",
      "We hebben je aanmelding ontvangen.",
      `Je clubcode is ${lead.clubcode}. Noem deze code als we je bellen.`,
      "We nemen binnen twee werkdagen contact met je op.",
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
    ...(lead.email ? { replyTo: lead.email } : {}),
    subject: `Nieuwe aanmelding via ${club.naam}`,
    text: [
      `Via: ${club.naam} — ledenvoordeel van toepassing`,
      "",
      `Voornaam: ${lead.voornaam}`,
      `Achternaam: ${lead.achternaam}`,
      `Telefoon: ${lead.telefoon}`,
      `E-mail: ${lead.email ?? "niet opgegeven. Neem contact op via telefoon."}`,
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

export async function stuurLedenBevestiging(lead: LedenLead): Promise<void> {
  if (!lead.email) {
    return;
  }

  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: lead.email,
    subject: "We hebben je aanmelding ontvangen",
    text: [
      `Hoi ${lead.voornaam},`,
      "",
      "We hebben je aanmelding ontvangen.",
      "We nemen binnen twee werkdagen contact met je op.",
      "",
      "Je zit nergens aan vast tot je een offerte tekent.",
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(`Bevestigingsmail mislukt: ${resultaat.error.message}`);
  }
}

export async function stuurPartnerAanmelding(lead: PartnerLead): Promise<void> {
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
    throw new Error(
      `Mail over clubaanmelding mislukt: ${resultaat.error.message}`,
    );
  }
}

/* Het actietype staat in de onderwerpregel, zodat cashback en winactie
   uit elkaar te houden zijn. */
export async function stuurActieAanmelding(lead: ActieLead): Promise<void> {
  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: van,
    replyTo: lead.email,
    subject: `Nieuwe aanmelding: ${lead.actie}`,
    text: [
      `Nieuwe aanmelding via de ${lead.actie}-pagina`,
      "",
      `Actie: ${lead.actie}`,
      `Voornaam: ${lead.voornaam}`,
      `Achternaam: ${lead.achternaam}`,
      `E-mail: ${lead.email}`,
      `Telefoon: ${lead.telefoon}`,
      `Postcode: ${lead.postcode}`,
      "",
      `Lead-id: ${lead.id}`,
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(
      `Mail over actie-aanmelding mislukt: ${resultaat.error.message}`,
    );
  }
}

export async function stuurReferralBevestigingAandrager(
  lead: ReferralLead,
): Promise<void> {
  // TODO: Noem de €200-beloning hier, met de voorwaarde dat diegene de
  // installatie heeft laten uitvoeren. Uitbetalingstekst volgt.
  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: lead.aandragerEmail,
    subject: "We hebben je aanmelding ontvangen",
    text: [
      `Hoi ${lead.aandragerNaam},`,
      "",
      "Bedankt. We hebben je aanmelding ontvangen.",
      `We nemen binnen twee werkdagen contact op met ${volledigeNaam(lead)}, de persoon die je hebt aangedragen.`,
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(
      `Bevestigingsmail aan aandrager mislukt: ${resultaat.error.message}`,
    );
  }
}

export async function stuurReferralBevestigingAangedragene(
  lead: ReferralLead,
): Promise<void> {
  const { resend, van } = getMailConfig();
  const resultaat = await resend.emails.send({
    from: van,
    to: lead.email,
    subject: "Iemand heeft je bij ons aangedragen",
    text: [
      `Hoi ${lead.voornaam},`,
      "",
      `${lead.aandragerNaam} heeft je naam bij Zonneplaneet Actie achtergelaten.`,
      "We nemen binnen twee werkdagen contact met je op.",
      "",
      "Wil je liever geen contact? Mail ons dan even, dan verwijderen we je gegevens.",
    ].join("\n"),
  });

  if (resultaat.error) {
    throw new Error(
      `Bevestigingsmail aan aangedragene mislukt: ${resultaat.error.message}`,
    );
  }
}
