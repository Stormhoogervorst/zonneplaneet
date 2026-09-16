"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  logWeb3FormsGelukt,
  logWeb3FormsMislukt,
  planShowroomAfspraak,
} from "@/app/aanmelden/actions";
import { Knop } from "@/components/ui";
import { meetPlausibleEvent } from "@/lib/plausible";
import { verstuurViaWeb3Forms } from "@/lib/web3forms";

const VERZENDFOUT = "Verzenden is mislukt. Probeer het later opnieuw.";
const BEVESTIGING =
  "We hebben je bericht ontvangen. We nemen contact met je op.";

const web3formsOnderweg = new Set<string>();
const web3formsAfgerond = new Set<string>();

const velden = [
  {
    naam: "naam",
    label: "Naam",
    autoComplete: "name",
    soort: "text" as const,
  },
  {
    naam: "telefoon",
    label: "Telefoonnummer",
    autoComplete: "tel",
    soort: "tel" as const,
    inputMode: "tel" as const,
  },
  {
    naam: "woonplaats",
    label: "Woonplaats",
    autoComplete: "address-level2",
    soort: "text" as const,
  },
];

/**
 * Volbreed navy blok met een kort afspraakformulier. Zelfde component op
 * `/over-zonneplaneet` en `/contact`; geen tweede variant.
 */
export function ShowroomAfspraak() {
  const [state, formAction, pending] = useActionState(planShowroomAfspraak, {
    success: false,
  });
  const [web3Bezig, setWeb3Bezig] = useState(false);
  const [web3Gelukt, setWeb3Gelukt] = useState(false);
  const [web3Fout, setWeb3Fout] = useState("");
  const formulierRef = useRef<HTMLFormElement>(null);
  const snapshotRef = useRef<FormData | null>(null);
  const conversieGemeten = useRef(false);
  const toonBevestiging = state.success || web3Gelukt;
  const bezig = pending || web3Bezig;
  const foutmelding = web3Fout || state.message;
  const titelId = "showroom-afspraak-titel";

  useEffect(() => {
    if (!state.magVerzenden || !state.leadId || web3Gelukt) {
      return;
    }

    const snapshot = snapshotRef.current;
    if (!snapshot) {
      return;
    }

    void verstuurShowroom(
      state.leadId,
      state.lead,
      snapshot,
      setWeb3Bezig,
      () => setWeb3Gelukt(true),
      setWeb3Fout,
    );
  }, [state.lead, state.leadId, state.magVerzenden, web3Gelukt]);

  useEffect(() => {
    if ((web3Gelukt || state.success) && !conversieGemeten.current) {
      meetPlausibleEvent("ShowroomAfspraak");
      conversieGemeten.current = true;
    }
  }, [state.success, web3Gelukt]);

  function bijVerzenden(event: FormEvent<HTMLFormElement>) {
    snapshotRef.current = new FormData(event.currentTarget);
    if (!state.magVerzenden || !state.leadId || web3Gelukt) {
      return;
    }

    event.preventDefault();
    void verstuurShowroom(
      state.leadId,
      state.lead,
      snapshotRef.current,
      setWeb3Bezig,
      () => setWeb3Gelukt(true),
      setWeb3Fout,
    );
  }

  return (
    <section
      id="showroom-afspraak"
      aria-labelledby={titelId}
      className="bg-navy py-20 text-white"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        {toonBevestiging ? (
          <div role="status" aria-live="polite">
            <h2 id={titelId} className="text-display-m text-tag">
              Bericht ontvangen
            </h2>
            <p className="mt-4 text-body-l text-white">{BEVESTIGING}</p>
          </div>
        ) : (
          <form
            ref={formulierRef}
            action={formAction}
            onSubmit={bijVerzenden}
            className="formulier-op-navy"
            noValidate
          >
            <h2 id={titelId} className="text-display-m text-tag">
              Maak een afspraak in een van onze showrooms
            </h2>
            <p className="mt-4 max-w-[44ch] text-body-l text-white">
              Laat je gegevens achter, dan nemen we contact op om een moment af
              te spreken.
            </p>

            <div aria-hidden="true" className="sr-only">
              <label htmlFor="showroom-afspraak-website">Website</label>
              <input
                id="showroom-afspraak-website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
              />
            </div>
            <input type="hidden" name="actie" value="showroom" />

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {velden.map((veld) => {
                const veldId = `showroom-afspraak-${veld.naam}`;
                const foutId = `${veldId}-fout`;
                const fout = state.errors?.[veld.naam]?.[0];

                return (
                  <div key={veld.naam} className="min-w-0">
                    <label
                      htmlFor={veldId}
                      className="mb-3 block font-mono text-xs tracking-[0.08em] text-tag uppercase"
                    >
                      {veld.label}
                    </label>
                    <input
                      id={veldId}
                      name={veld.naam}
                      type={veld.soort}
                      inputMode={
                        "inputMode" in veld ? veld.inputMode : undefined
                      }
                      autoComplete={veld.autoComplete}
                      required
                      aria-invalid={Boolean(fout)}
                      aria-describedby={fout ? foutId : undefined}
                      className={`block min-h-12 w-full rounded-none border-b bg-transparent pb-3 text-body-l text-white ${
                        fout
                          ? "border-red-300 focus:border-red-300"
                          : "border-white/35 focus:border-tag"
                      }`}
                    />
                    {fout ? (
                      <p id={foutId} className="mt-3 text-sm text-red-300">
                        {fout}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {foutmelding ? (
              <p role="alert" className="mt-8 text-sm text-red-300">
                {foutmelding}
              </p>
            ) : null}

            <div className="mt-12">
              <Knop
                type="submit"
                variant="primair"
                disabled={bezig}
                className="h-14 w-full disabled:opacity-60 md:w-auto"
              >
                {bezig ? "Afspraak plannen…" : "Plan mijn afspraak"}
              </Knop>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

async function verstuurShowroom(
  leadId: string,
  lead: unknown,
  formulierData: FormData,
  opBezig: (waarde: boolean) => void,
  opGelukt: () => void,
  opFout: (melding: string) => void,
): Promise<void> {
  if (web3formsAfgerond.has(leadId) || web3formsOnderweg.has(leadId)) {
    return;
  }

  web3formsOnderweg.add(leadId);
  opBezig(true);
  opFout("");

  try {
    await verstuurViaWeb3Forms(formulierData, leadId);
    web3formsAfgerond.add(leadId);
    try {
      await logWeb3FormsGelukt(leadId, "showroom");
    } catch (logFout) {
      console.error(logFout);
    }
    opGelukt();
  } catch (fout) {
    web3formsOnderweg.delete(leadId);
    console.error(fout);
    opFout(VERZENDFOUT);
    try {
      await logWeb3FormsMislukt(lead);
    } catch (logFout) {
      console.error(logFout);
    }
  } finally {
    opBezig(false);
  }
}
