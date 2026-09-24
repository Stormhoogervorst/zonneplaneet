const TIJD_PATROON = /^\d{13}$/;
const MINIMALE_LAADTIJD_MS = 2000;

export const MELDING_ONGELDIGE_TIJD =
  "Zet JavaScript aan of laad de pagina opnieuw en probeer het nog eens.";
export const MELDING_TE_SNEL = "Wacht even en probeer het opnieuw.";

export type Tijdcheck = "ok" | "ongeldig" | "te-snel";

function isClienttijd(waarde: unknown): waarde is string {
  return typeof waarde === "string" && TIJD_PATROON.test(waarde);
}

/** Vergelijkt twee clienttijden. Gebruikt de serverklok niet. */
export function beoordeelLaadtijd(
  geladen: unknown,
  verzonden: unknown,
): Tijdcheck {
  if (!isClienttijd(geladen) || !isClienttijd(verzonden)) {
    return "ongeldig";
  }

  const verschil = Number(verzonden) - Number(geladen);
  if (verschil < 0 || verschil < MINIMALE_LAADTIJD_MS) {
    return "te-snel";
  }

  return "ok";
}

export function meldingVoorLaadtijd(
  geladen: unknown,
  verzonden: unknown,
): string | undefined {
  const oordeel = beoordeelLaadtijd(geladen, verzonden);
  if (oordeel === "ok") {
    return undefined;
  }

  if (oordeel === "te-snel") {
    return MELDING_TE_SNEL;
  }

  return MELDING_ONGELDIGE_TIJD;
}
