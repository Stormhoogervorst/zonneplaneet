import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

type RateLimitStatus = {
  pogingen: number;
  verlooptOp: number;
};

declare global {
  var __aanmeldRateLimits: Map<string, RateLimitStatus> | undefined;
}

const rateLimits =
  globalThis.__aanmeldRateLimits ?? new Map<string, RateLimitStatus>();
globalThis.__aanmeldRateLimits = rateLimits;

const maximumPogingen = 5;
const vensterInMilliseconden = 10 * 60 * 1000;

function hashWaarde(waarde: string) {
  return createHash("sha256").update(waarde).digest("hex");
}

export async function magAanmelden(actie: string): Promise<boolean> {
  const aanvraagHeaders = await headers();
  const doorgestuurd = aanvraagHeaders.get("x-forwarded-for");
  const ipAdres =
    aanvraagHeaders.get("x-real-ip") ??
    doorgestuurd?.split(",").at(-1)?.trim() ??
    "onbekend";
  const sleutel = `${actie}:${hashWaarde(ipAdres)}`;
  const nu = Date.now();

  for (const [bestaandeSleutel, status] of rateLimits) {
    if (status.verlooptOp <= nu) {
      rateLimits.delete(bestaandeSleutel);
    }
  }

  const status = rateLimits.get(sleutel);
  if (!status) {
    rateLimits.set(sleutel, {
      pogingen: 1,
      verlooptOp: nu + vensterInMilliseconden,
    });
    return true;
  }

  if (status.pogingen >= maximumPogingen) {
    return false;
  }

  status.pogingen += 1;
  return true;
}

// TODO: Vervang deze in-memory limiter voor productie door een gedeelde, persistente store zodat alle Vercel-instances dezelfde limiet gebruiken.
