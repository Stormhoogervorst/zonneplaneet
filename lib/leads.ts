import "server-only";

import { randomUUID } from "node:crypto";
import type {
  Aanmelding,
  ActieAanmelding,
  Contactbericht,
  LedenAanmelding,
  PartnerAanmelding,
  ReferralAanmelding,
} from "@/lib/validatie";

export type LeadStatus =
  "aangemeld" | "offerte" | "getekend" | "geinstalleerd" | "afgevallen";

export type Lead = Aanmelding & {
  id: string;
  aangemaaktOp: string;
  status: LeadStatus;
  bedrag: number | null;
};

export type LedenLead = LedenAanmelding & {
  id: string;
  aangemaaktOp: string;
  status: LeadStatus;
  bedrag: number | null;
};

export type PartnerLead = PartnerAanmelding & {
  id: string;
  aangemaaktOp: string;
};

export type ContactLead = Contactbericht & {
  id: string;
  aangemaaktOp: string;
};

export type ActieLead = ActieAanmelding & {
  id: string;
  aangemaaktOp: string;
};

export type ReferralLead = ReferralAanmelding & {
  id: string;
  aangemaaktOp: string;
};

export async function bewaarLead(aanmelding: Aanmelding): Promise<Lead> {
  const lead: Lead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
    status: "aangemeld",
    bedrag: null,
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  console.info("Tijdelijke leadopslag, nog niet in een database:", lead);

  return lead;
}

export async function bewaarLedenLead(
  aanmelding: LedenAanmelding,
): Promise<LedenLead> {
  const lead: LedenLead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
    status: "aangemeld",
    bedrag: null,
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  console.info("Tijdelijke leadopslag, nog niet in een database:", lead);

  return lead;
}

export async function bewaarPartnerLead(
  aanmelding: PartnerAanmelding,
): Promise<PartnerLead> {
  const lead: PartnerLead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  console.info(
    "Tijdelijke opslag van partneraanmelding, nog niet in een database:",
    lead,
  );

  return lead;
}

export async function bewaarContactbericht(
  bericht: Contactbericht,
): Promise<ContactLead> {
  const lead: ContactLead = {
    ...bericht,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  console.info(
    "Tijdelijke opslag van contactbericht, nog niet in een database:",
    lead,
  );

  return lead;
}

export async function bewaarActieLead(
  aanmelding: ActieAanmelding,
): Promise<ActieLead> {
  const lead: ActieLead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  console.info(
    "Tijdelijke opslag van actie-aanmelding, nog niet in een database:",
    lead,
  );

  return lead;
}

export async function bewaarReferralLead(
  aanmelding: ReferralAanmelding,
): Promise<ReferralLead> {
  const lead: ReferralLead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
  };

  // TODO: Vervang deze tijdelijke log door een database-insert die voltooid is voordat deze functie terugkeert.
  // De rij gaat over de aangedragene (voornaam, achternaam, email, telefoon).
  // De aandrager komt in aandrager_naam, aandrager_email en aandrager_telefoon;
  // zie db/004_referral.sql. Naamsplitsing: db/005_naamvelden.sql.
  console.info(
    "Tijdelijke opslag van referral, nog niet in een database:",
    lead,
  );

  return lead;
}
