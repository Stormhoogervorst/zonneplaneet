import "server-only";

import { randomUUID } from "node:crypto";
import type {
  Aanmelding,
  ActieAanmelding,
  Contactbericht,
  LedenAanmelding,
  PartnerAanmelding,
  ReferralAanmelding,
  ShowroomAfspraak,
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

export type ShowroomLead = ShowroomAfspraak & {
  id: string;
  aangemaaktOp: string;
};

export function logLeadVerzonden(leadId: string, actie: string): void {
  console.info(`Lead verzonden ${leadId} ${actie}`);
}

export function logLeadNietVerzonden(lead: unknown): void {
  console.error("[LEAD-NIET-VERZONDEN]", JSON.stringify(lead));
}

export async function bewaarLead(aanmelding: Aanmelding): Promise<Lead> {
  const lead: Lead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
    status: "aangemeld",
    bedrag: null,
  };

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

  return lead;
}

export async function bewaarShowroomAfspraak(
  aanmelding: ShowroomAfspraak,
): Promise<ShowroomLead> {
  const lead: ShowroomLead = {
    ...aanmelding,
    id: randomUUID(),
    aangemaaktOp: new Date().toISOString(),
  };

  return lead;
}
