import "server-only";

import { randomUUID } from "node:crypto";
import type {
  Aanmelding,
  Contactbericht,
  PartnerAanmelding,
} from "@/lib/validatie";

export type LeadStatus =
  "aangemeld" | "offerte" | "getekend" | "geinstalleerd" | "afgevallen";

export type Lead = Aanmelding & {
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
