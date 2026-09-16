import "server-only";

import { Resend } from "resend";
import type { ActieLead, PartnerLead } from "@/lib/leads";

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
      ...(lead.opmerking ? [`Opmerking: ${lead.opmerking}`] : []),
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
