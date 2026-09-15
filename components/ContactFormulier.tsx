"use client";

import Image from "next/image";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { logWeb3FormsGelukt, logWeb3FormsMislukt } from "@/app/aanmelden/actions";
import { Knop } from "@/components/ui";
import { meetPlausibleEvent } from "@/lib/plausible";
import type { FormulierState } from "@/lib/validatie";
import { verstuurViaWeb3Forms } from "@/lib/web3forms";

const VERZENDFOUT = "Verzenden is mislukt. Probeer het later opnieuw.";

const web3formsOnderweg = new Set<string>();
const web3formsAfgerond = new Set<string>();

async function verstuurWeb3FormsVanuitFormulier(
  leadId: string,
  lead: unknown,
  formulier: HTMLFormElement,
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
    const formulierData = new FormData(formulier);
    const actie = String(formulierData.get("actie") ?? "");
    await verstuurViaWeb3Forms(formulierData, leadId);
    web3formsAfgerond.add(leadId);
    try {
      await logWeb3FormsGelukt(leadId, actie);
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

/**
 * De sectie met een foto links en een formulier rechts. `/partner` gebruikt het
 * ijsblauwe paneel, `/contact` en `/referral` het navy
 * paneel. Alles wat per pagina verschilt komt via props binnen; er is geen
 * tweede variant van dit blok.
 */
type Paneel = "ijsblauw" | "navy";

type VeldGedeeld = {
  naam: string;
  label: string;
  autoComplete?: string;
  verplicht?: boolean;
  /** Over beide kolommen in plaats van één, vanaf md. */
  volleBreedte?: boolean;
  /** Korte toelichting onder het veld, bijvoorbeeld bij een optioneel e-mailadres. */
  hulptekst?: string;
};

export type FormulierVeld =
  | (VeldGedeeld & { soort: "tekst" | "email" | "telefoon" | "getal" })
  | (VeldGedeeld & { soort: "tekstvlak"; regels: number })
  | (VeldGedeeld & {
      soort: "keuze";
      /** Tekst van de lege eerste optie, zodat de bezoeker zelf kiest. */
      leegLabel: string;
      keuzes: ReadonlyArray<{ waarde: string; label: string }>;
    })
  | (VeldGedeeld & {
      soort: "radio";
      keuzes: ReadonlyArray<{ waarde: string; label: string }>;
    })
  | (VeldGedeeld & { soort: "vinkje" });

export type FormulierBlok = {
  /** Monospace kopje boven de velden, bijvoorbeeld "↳ JOUW GEGEVENS". */
  kopje?: string;
  velden: FormulierVeld[];
};

type ContactFormulierProps = {
  /** Ankernaam van de sectie; ook het voorvoegsel van alle veld-id's. */
  id: string;
  titel: string;
  velden?: FormulierVeld[];
  /** Groepen velden met een kopje. Komen boven `velden` te staan. */
  blokken?: ReadonlyArray<FormulierBlok>;
  action: (
    state: FormulierState,
    formData: FormData,
  ) => Promise<FormulierState>;
  beginState: FormulierState;
  knopLabel: string;
  knopBezigLabel: string;
  naschrift: ReactNode;
  bevestiging: { titel: string; tekst: string };
  foto: { src: string; alt: string };
  plausibleEvent: string;
  paneel?: Paneel;
  /** Waarden die meegaan in de POST, zonder zichtbaar veld. */
  verborgenVelden?: ReadonlyArray<{ naam: string; waarde: string }>;
  /** Zichtbare inhoud direct bij de verzendknop, bijvoorbeeld een link. */
  bijKnop?: ReactNode;
  /** Extra klassen op de sectie, bijvoorbeeld een andere scroll-marge. */
  className?: string;
  /** Extra Plausible-eigenschappen bij een geslaagde verzending. */
  plausibleProps?: Record<string, string>;
};

type Paneelstijl = {
  vlak: string;
  formulier: string;
  titel: string;
  label: string;
  /* De tekstkleur staat los van de randkleur, zodat een veld met een fout zijn
     kleur houdt. Randkleuren gaan nooit samen in één klassenreeks: dan zou de
     volgorde in het gegenereerde CSS bepalen welke wint. */
  veldTekst: string;
  veldRand: string;
  veldRandFout: string;
  fout: string;
  scheiding: string;
  naschrift: string;
  knop: "donker" | "primair";
};

const stijlen: Record<Paneel, Paneelstijl> = {
  /* Op ijsblauw haalt een oranje pil maar 2,6:1 en is hij niet meer als knop te
     onderscheiden; daarom navy. red-800 haalt er 5,7:1. */
  ijsblauw: {
    vlak: "bg-tag",
    formulier: "formulier-op-ijsblauw",
    titel: "text-navy",
    label: "text-navy",
    veldTekst: "text-navy",
    veldRand: "border-navy/30 focus:border-navy",
    veldRandFout: "border-red-800 focus:border-red-800",
    fout: "text-red-800",
    scheiding: "border-navy/25",
    naschrift: "text-navy/80",
    knop: "donker",
  },
  /* Op navy valt red-800 weg; red-300 haalt er 7,4:1. De oranje pil met navy
     tekst van 20px en 600 mag als grote tekst. */
  navy: {
    vlak: "bg-navy",
    formulier: "formulier-op-navy",
    titel: "text-white",
    label: "text-tag",
    veldTekst: "text-white",
    veldRand: "border-white/35 focus:border-tag",
    veldRandFout: "border-red-300 focus:border-red-300",
    fout: "text-red-300",
    scheiding: "border-white/25",
    naschrift: "text-white/80",
    knop: "primair",
  },
};

/* Monospace komt uit de systeemstack; er wordt geen extra font geladen. */
const labelClasses = "mb-3 block font-mono text-xs tracking-[0.08em] uppercase";

/* Alleen een onderlijn, en een raakhoogte van 48px inclusief padding. De
   focusring en de autofill-fix per paneel horen bij `app/globals.css`. */
const veldClasses =
  "block min-h-12 w-full rounded-none border-b bg-transparent pb-3 text-body-l";

const inputTypes = {
  tekst: "text",
  email: "email",
  telefoon: "tel",
  getal: "number",
} as const;

const inputModes = {
  telefoon: "tel",
  getal: "numeric",
} as const;

export function ContactFormulier({
  id,
  titel,
  velden,
  blokken,
  action,
  beginState,
  knopLabel,
  knopBezigLabel,
  naschrift,
  bevestiging,
  foto,
  plausibleEvent,
  paneel = "ijsblauw",
  verborgenVelden,
  bijKnop,
  className,
  plausibleProps,
}: ContactFormulierProps) {
  const [state, formAction, pending] = useActionState(action, beginState);
  const [web3Bezig, setWeb3Bezig] = useState(false);
  const [web3Gelukt, setWeb3Gelukt] = useState(false);
  const [web3Fout, setWeb3Fout] = useState("");
  const formulierRef = useRef<HTMLFormElement>(null);
  const conversieGemeten = useRef(false);
  const stijl = stijlen[paneel];
  const titelId = `${id}-titel`;
  const internBlokken: ReadonlyArray<FormulierBlok> = [
    ...(blokken ?? []),
    ...(velden && velden.length > 0 ? [{ velden }] : []),
  ];
  const toonBevestiging = state.success || web3Gelukt;
  const bezig = pending || web3Bezig;
  const foutmelding = web3Fout || state.message;

  useEffect(() => {
    if (!state.magVerzenden || !state.leadId || web3Gelukt) {
      return;
    }

    const formulier = formulierRef.current;
    if (!formulier) {
      return;
    }

    void verstuurWeb3FormsVanuitFormulier(
      state.leadId,
      state.lead,
      formulier,
      setWeb3Bezig,
      () => setWeb3Gelukt(true),
      setWeb3Fout,
    );
  }, [state.lead, state.leadId, state.magVerzenden, web3Gelukt]);

  useEffect(() => {
    const magMeten =
      web3Gelukt || (state.success && Boolean(state.meetConversie));
    if (magMeten && !conversieGemeten.current) {
      meetPlausibleEvent(plausibleEvent, plausibleProps);
      conversieGemeten.current = true;
    }
  }, [
    plausibleEvent,
    plausibleProps,
    state.meetConversie,
    state.success,
    web3Gelukt,
  ]);

  function bijVerzenden(event: FormEvent<HTMLFormElement>) {
    if (!state.magVerzenden || !state.leadId || web3Gelukt) {
      return;
    }

    event.preventDefault();
    void verstuurWeb3FormsVanuitFormulier(
      state.leadId,
      state.lead,
      event.currentTarget,
      setWeb3Bezig,
      () => setWeb3Gelukt(true),
      setWeb3Fout,
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={titelId}
      className={`py-0 ${className ?? "scroll-mt-[var(--hoogte-headerbalk)]"}`}
    >
      <div className="md:flex md:min-h-[760px]">
        {/* Fotokolom: onder md een liggend vlak, vanaf md de volle kolomhoogte */}
        <div className="relative aspect-[4/3] min-w-0 md:aspect-auto md:w-1/2">
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Formulierkolom: het paneel met het formulier of de bevestiging */}
        <div
          className={`flex min-w-0 flex-col justify-center px-8 py-16 md:w-1/2 md:px-16 md:py-24 ${stijl.vlak}`}
        >
          {toonBevestiging ? (
            <div role="status" aria-live="polite">
              <h2 id={titelId} className={`text-display-m ${stijl.titel}`}>
                {bevestiging.titel}
              </h2>
              <p className={`mt-6 text-body-l ${stijl.naschrift}`}>
                {bevestiging.tekst}
              </p>
            </div>
          ) : (
            <form
              ref={formulierRef}
              action={formAction}
              onSubmit={bijVerzenden}
              className={stijl.formulier}
              noValidate
            >
              <h2
                id={titelId}
                className={`mb-12 text-display-m ${stijl.titel}`}
              >
                {titel}
              </h2>

              <div aria-hidden="true" className="sr-only">
                <label htmlFor={`${id}-website`}>Website</label>
                <input
                  id={`${id}-website`}
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {verborgenVelden?.map((veld) => (
                <input
                  key={veld.naam}
                  type="hidden"
                  name={veld.naam}
                  value={veld.waarde}
                />
              ))}

              {internBlokken.map((blok, blokIndex) => (
                <div
                  key={blok.kopje ?? `blok-${blokIndex}`}
                  className={blokIndex > 0 ? "mt-14" : undefined}
                >
                  {blok.kopje ? (
                    <h3
                      className={`mb-8 block font-mono text-xs tracking-[0.08em] uppercase ${stijl.label}`}
                    >
                      {blok.kopje}
                    </h3>
                  ) : null}

                  <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                    {blok.velden.map((veld) => {
                      const veldId = `${id}-${veld.naam}`;
                      const foutId = `${veldId}-fout`;
                      const hulpId = `${veldId}-hulp`;
                      const fout = state.errors?.[veld.naam]?.[0];
                      const beschrijving = [
                        veld.hulptekst ? hulpId : undefined,
                        fout ? foutId : undefined,
                      ]
                        .filter(Boolean)
                        .join(" ");

                      if (veld.soort === "vinkje") {
                        return (
                          <div
                            key={veld.naam}
                            className={`min-w-0 ${
                              veld.volleBreedte ? "md:col-span-2" : ""
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <input
                                id={veldId}
                                name={veld.naam}
                                type="checkbox"
                                required={veld.verplicht}
                                autoComplete="off"
                                aria-invalid={Boolean(fout)}
                                aria-describedby={
                                  beschrijving || undefined
                                }
                                className={`mt-1 size-5 shrink-0 accent-oranje ${stijl.veldTekst}`}
                              />
                              <label
                                htmlFor={veldId}
                                className={`text-[0.9375rem] leading-[1.6] ${stijl.naschrift}`}
                              >
                                {veld.label}
                              </label>
                            </div>
                            {fout && (
                              <p
                                id={foutId}
                                className={`mt-3 text-sm ${stijl.fout}`}
                              >
                                {fout}
                              </p>
                            )}
                          </div>
                        );
                      }

                      if (veld.soort === "radio") {
                        return (
                          <fieldset
                            key={veld.naam}
                            className={`min-w-0 ${
                              veld.volleBreedte ? "md:col-span-2" : ""
                            }`}
                            aria-invalid={Boolean(fout)}
                            aria-describedby={beschrijving || undefined}
                          >
                            <legend
                              className={`${labelClasses} ${stijl.label}`}
                            >
                              {veld.label}
                            </legend>
                            <div className="flex flex-col">
                              {veld.keuzes.map((keuze) => {
                                const keuzeId = `${veldId}-${keuze.waarde}`;
                                return (
                                  <label
                                    key={keuze.waarde}
                                    htmlFor={keuzeId}
                                    className={`flex min-h-12 cursor-pointer items-center gap-3 ${stijl.naschrift}`}
                                  >
                                    <input
                                      id={keuzeId}
                                      name={veld.naam}
                                      type="radio"
                                      value={keuze.waarde}
                                      required={veld.verplicht}
                                      className="size-5 shrink-0 accent-oranje"
                                    />
                                    <span className="text-[0.9375rem] leading-[1.6]">
                                      {keuze.label}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                            {fout ? (
                              <p
                                id={foutId}
                                className={`mt-3 text-sm ${stijl.fout}`}
                              >
                                {fout}
                              </p>
                            ) : null}
                          </fieldset>
                        );
                      }

                      const veldClassName = `${veldClasses} ${stijl.veldTekst} ${
                        fout ? stijl.veldRandFout : stijl.veldRand
                      }`;
                      const veldProps = {
                        id: veldId,
                        name: veld.naam,
                        required: veld.verplicht,
                        autoComplete: veld.autoComplete,
                        "aria-invalid": Boolean(fout),
                        "aria-describedby": beschrijving || undefined,
                      };

                      return (
                        <div
                          key={veld.naam}
                          className={`min-w-0 ${
                            veld.volleBreedte ? "md:col-span-2" : ""
                          }`}
                        >
                          <label
                            htmlFor={veldId}
                            className={`${labelClasses} ${stijl.label}`}
                          >
                            {veld.label}
                          </label>

                          {veld.soort === "tekstvlak" ? (
                            <textarea
                              {...veldProps}
                              rows={veld.regels}
                              className={veldClassName}
                            />
                          ) : veld.soort === "keuze" ? (
                            <div className="relative">
                              {/* De eigen pijl houdt de onderlijn intact; een
                                  native select tekent zijn eigen vlak en rand. */}
                              <select
                                {...veldProps}
                                defaultValue=""
                                className={`${veldClassName} appearance-none pr-10 [&>option]:text-navy`}
                              >
                                <option value="">{veld.leegLabel}</option>
                                {veld.keuzes.map((keuze) => (
                                  <option
                                    key={keuze.waarde}
                                    value={keuze.waarde}
                                  >
                                    {keuze.label}
                                  </option>
                                ))}
                              </select>
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute right-1 bottom-4 ${stijl.label}`}
                              >
                                <svg
                                  viewBox="0 0 16 16"
                                  className="size-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m3 6 5 5 5-5" />
                                </svg>
                              </span>
                            </div>
                          ) : (
                            <input
                              {...veldProps}
                              type={inputTypes[veld.soort]}
                              inputMode={
                                veld.soort === "telefoon" ||
                                veld.soort === "getal"
                                  ? inputModes[veld.soort]
                                  : undefined
                              }
                              min={veld.soort === "getal" ? 1 : undefined}
                              step={veld.soort === "getal" ? 1 : undefined}
                              className={veldClassName}
                            />
                          )}

                          {veld.hulptekst ? (
                            <p
                              id={hulpId}
                              className={`mt-3 text-sm ${stijl.naschrift}`}
                            >
                              {veld.hulptekst}
                            </p>
                          ) : null}

                          {fout && (
                            <p
                              id={foutId}
                              className={`mt-3 text-sm ${stijl.fout}`}
                            >
                              {fout}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <hr className={`mt-14 border-t ${stijl.scheiding}`} />

              {foutmelding ? (
                <p role="alert" className={`mt-8 text-sm ${stijl.fout}`}>
                  {foutmelding}
                </p>
              ) : null}

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Knop
                  type="submit"
                  variant={stijl.knop}
                  disabled={bezig}
                  className="h-14 w-full disabled:opacity-60 md:w-auto"
                >
                  {bezig ? knopBezigLabel : knopLabel}
                </Knop>
                {bijKnop}
              </div>

              <div className={`mt-6 text-sm ${stijl.naschrift}`}>{naschrift}</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
