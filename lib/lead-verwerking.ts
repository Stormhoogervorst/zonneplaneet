import "server-only";

import { randomUUID } from "node:crypto";

import {
  verstuurLeadMail,
  type LeadMailInvoer,
  type LeadMailResultaat,
} from "@/lib/mail";

export type VerwerkLeadInvoer = Omit<LeadMailInvoer, "leadId">;

export type VerwerkLeadResultaat = { ok: true; leadId: string } | { ok: false };

type MislukteMail = Extract<LeadMailResultaat, { ok: false }>;

type VerwerkLeadOpties = {
  verstuur?: (invoer: LeadMailInvoer) => Promise<LeadMailResultaat>;
  wacht?: (ms: number) => Promise<void>;
};

const RETRY_MS = 700;

function isOpnieuwProberen(resultaat: MislukteMail): boolean {
  if (
    resultaat.code === "netwerk" ||
    resultaat.code === "rate_limit_exceeded"
  ) {
    return true;
  }

  const status = resultaat.statusCode;
  return status === 429 || (typeof status === "number" && status >= 500);
}

function zonderPersoonsgegevens(melding: string): string {
  return melding
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[e-mail]")
    .replace(/(?:\+31|0031|0)(?:[\s-]?\d){8,10}/g, "[telefoon]");
}

function logMislukt(
  leadId: string,
  type: string,
  resultaat: MislukteMail,
): void {
  const code = resultaat.code ?? "onbekend";
  const melding = zonderPersoonsgegevens(resultaat.error);
  console.error(
    `[LEAD-NIET-VERZONDEN] leadId=${leadId} type=${type} code=${code} melding=${melding}`,
  );
}

function wachtStandaard(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function verwerkLead(
  invoer: VerwerkLeadInvoer,
  opties: VerwerkLeadOpties = {},
): Promise<VerwerkLeadResultaat> {
  const verstuur = opties.verstuur ?? verstuurLeadMail;
  const wacht = opties.wacht ?? wachtStandaard;
  const leadId = randomUUID();
  const mail = { ...invoer, leadId };

  const eerste = await verstuur(mail);
  if (eerste.ok) {
    return { ok: true, leadId };
  }

  if (!isOpnieuwProberen(eerste)) {
    logMislukt(leadId, invoer.type, eerste);
    return { ok: false };
  }

  await wacht(RETRY_MS);
  const tweede = await verstuur(mail);
  if (tweede.ok) {
    return { ok: true, leadId };
  }

  logMislukt(leadId, invoer.type, tweede);
  return { ok: false };
}
