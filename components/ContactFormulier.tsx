"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { Knop } from "@/components/ui";
import { meetPlausibleEvent } from "@/lib/plausible";
import type { FormulierState } from "@/lib/validatie";

/**
 * De sectie met een foto links en een formulier rechts. `/partner` gebruikt het
 * ijsblauwe paneel, `/contact`, `/cashback` en `/winactie` het navy paneel.
 * Alles wat per pagina verschilt komt via props binnen; er is geen tweede
 * variant van dit blok.
 */
type Paneel = "ijsblauw" | "navy";

type VeldGedeeld = {
  naam: string;
  label: string;
  autoComplete?: string;
  verplicht?: boolean;
  /** Over beide kolommen in plaats van één, vanaf md. */
  volleBreedte?: boolean;
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
  | (VeldGedeeld & { soort: "vinkje" });

type ContactFormulierProps = {
  /** Ankernaam van de sectie; ook het voorvoegsel van alle veld-id's. */
  id: string;
  titel: string;
  velden: FormulierVeld[];
  action: (
    state: FormulierState,
    formData: FormData,
  ) => Promise<FormulierState>;
  beginState: FormulierState;
  knopLabel: string;
  knopBezigLabel: string;
  naschrift: string;
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
  const conversieGemeten = useRef(false);
  const stijl = stijlen[paneel];
  const titelId = `${id}-titel`;

  useEffect(() => {
    if (state.success && state.meetConversie && !conversieGemeten.current) {
      meetPlausibleEvent(plausibleEvent, plausibleProps);
      conversieGemeten.current = true;
    }
  }, [plausibleEvent, plausibleProps, state.meetConversie, state.success]);

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
          {state.success ? (
            <div role="status" aria-live="polite">
              <h2 id={titelId} className={`text-display-m ${stijl.titel}`}>
                {bevestiging.titel}
              </h2>
              <p className={`mt-6 text-body-l ${stijl.naschrift}`}>
                {bevestiging.tekst}
              </p>
            </div>
          ) : (
            <form action={formAction} className={stijl.formulier} noValidate>
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

              <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                {velden.map((veld) => {
                  const veldId = `${id}-${veld.naam}`;
                  const foutId = `${veldId}-fout`;
                  const fout = state.errors?.[veld.naam]?.[0];

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
                            aria-describedby={fout ? foutId : undefined}
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

                  const veldClassName = `${veldClasses} ${stijl.veldTekst} ${
                    fout ? stijl.veldRandFout : stijl.veldRand
                  }`;
                  const veldProps = {
                    id: veldId,
                    name: veld.naam,
                    required: veld.verplicht,
                    autoComplete: veld.autoComplete,
                    "aria-invalid": Boolean(fout),
                    "aria-describedby": fout ? foutId : undefined,
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
                              <option key={keuze.waarde} value={keuze.waarde}>
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
                            veld.soort === "telefoon" || veld.soort === "getal"
                              ? inputModes[veld.soort]
                              : undefined
                          }
                          min={veld.soort === "getal" ? 1 : undefined}
                          step={veld.soort === "getal" ? 1 : undefined}
                          className={veldClassName}
                        />
                      )}

                      {fout && (
                        <p id={foutId} className={`mt-3 text-sm ${stijl.fout}`}>
                          {fout}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <hr className={`mt-14 border-t ${stijl.scheiding}`} />

              {state.message && (
                <p role="alert" className={`mt-8 text-sm ${stijl.fout}`}>
                  {state.message}
                </p>
              )}

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Knop
                  type="submit"
                  variant={stijl.knop}
                  disabled={pending}
                  className="h-14 w-full disabled:opacity-60 md:w-auto"
                >
                  {pending ? knopBezigLabel : knopLabel}
                </Knop>
                {bijKnop}
              </div>

              <p className={`mt-6 text-sm ${stijl.naschrift}`}>{naschrift}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
