"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef } from "react";
import { meldClubAan } from "@/app/aanmelden/actions";
import { Knop } from "@/components/ui";
import { meetPlausibleEvent } from "@/lib/plausible";
import type { PartnerAanmeldState, PartnerAanmeldVeld } from "@/lib/validatie";

const initialState: PartnerAanmeldState = {
  success: false,
};

/* Monospace komt uit de systeemstack; er wordt geen extra font geladen. */
const labelClasses =
  "mb-3 block font-mono text-xs tracking-[0.08em] text-navy uppercase";

/* Alleen een onderlijn, en een raakhoogte van 48px inclusief padding. De navy
   focusring hoort bij `formulier-op-ijsblauw` in `app/globals.css`. */
const veldClasses =
  "block min-h-12 w-full rounded-none border-b border-navy/30 bg-transparent pb-3 text-body-l text-navy focus:border-navy";

/* red-800 haalt 5,7:1 op ijsblauw; de lichtere tinten vallen er weg. */
const veldFoutClasses = "border-red-800 focus:border-red-800";

export function PartnerAanmeldFormulier() {
  const [state, formAction, pending] = useActionState(
    meldClubAan,
    initialState,
  );
  const conversieGemeten = useRef(false);

  useEffect(() => {
    if (state.success && state.meetConversie && !conversieGemeten.current) {
      meetPlausibleEvent("Partneraanmelding");
      conversieGemeten.current = true;
    }
  }, [state.meetConversie, state.success]);

  const veldFout = (veld: PartnerAanmeldVeld) => state.errors?.[veld]?.[0];

  const veldClassName = (veld: PartnerAanmeldVeld) =>
    veldFout(veld) ? `${veldClasses} ${veldFoutClasses}` : veldClasses;

  const foutProps = (veld: PartnerAanmeldVeld, foutId: string) => ({
    "aria-invalid": Boolean(veldFout(veld)),
    "aria-describedby": veldFout(veld) ? foutId : undefined,
  });

  return (
    <section
      id="club-aanmelden"
      aria-labelledby="club-aanmelden-titel"
      className="scroll-mt-[var(--hoogte-headerbalk)] py-0"
    >
      <div className="md:flex md:min-h-[720px]">
        {/* Fotokolom: onder md een liggend vlak, vanaf md de volle kolomhoogte */}
        <div className="relative aspect-[4/3] min-w-0 md:aspect-auto md:w-1/2">
          <Image
            src="/zonnepanelen-woningen.jpg"
            alt="Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Formulierkolom: ijsblauw paneel met het formulier of de bevestiging */}
        <div className="flex min-w-0 flex-col justify-center bg-tag px-8 py-16 md:w-1/2 md:px-16 md:py-24">
          {state.success ? (
            <div role="status" aria-live="polite">
              <h2
                id="club-aanmelden-titel"
                className="text-display-m text-navy"
              >
                Aanmelding ontvangen
              </h2>
              <p className="mt-6 text-body-l text-navy/80">
                We hebben de gegevens van je club ontvangen. We bellen je binnen
                twee werkdagen om de vervolgstappen te bespreken.
              </p>
            </div>
          ) : (
            <form
              action={formAction}
              className="formulier-op-ijsblauw"
              noValidate
            >
              <h2
                id="club-aanmelden-titel"
                className="mb-12 text-display-m text-navy"
              >
                Aanmelden
              </h2>

              <div aria-hidden="true" className="sr-only">
                <label htmlFor="partner-website">Website</label>
                <input
                  id="partner-website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="clubnaam" className={labelClasses}>
                    Clubnaam
                  </label>
                  <input
                    className={veldClassName("clubnaam")}
                    id="clubnaam"
                    name="clubnaam"
                    type="text"
                    autoComplete="organization"
                    required
                    {...foutProps("clubnaam", "clubnaam-fout")}
                  />
                  {veldFout("clubnaam") && (
                    <p id="clubnaam-fout" className="mt-3 text-sm text-red-800">
                      {veldFout("clubnaam")}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="plaats" className={labelClasses}>
                    Plaats
                  </label>
                  <input
                    className={veldClassName("plaats")}
                    id="plaats"
                    name="plaats"
                    type="text"
                    autoComplete="address-level2"
                    required
                    {...foutProps("plaats", "plaats-fout")}
                  />
                  {veldFout("plaats") && (
                    <p id="plaats-fout" className="mt-3 text-sm text-red-800">
                      {veldFout("plaats")}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="contactpersoon" className={labelClasses}>
                    Naam contactpersoon
                  </label>
                  <input
                    className={veldClassName("contactpersoon")}
                    id="contactpersoon"
                    name="contactpersoon"
                    type="text"
                    autoComplete="name"
                    required
                    {...foutProps("contactpersoon", "contactpersoon-fout")}
                  />
                  {veldFout("contactpersoon") && (
                    <p
                      id="contactpersoon-fout"
                      className="mt-3 text-sm text-red-800"
                    >
                      {veldFout("contactpersoon")}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="ledenaantal" className={labelClasses}>
                    Aantal leden
                  </label>
                  <input
                    className={veldClassName("ledenaantal")}
                    id="ledenaantal"
                    name="ledenaantal"
                    type="number"
                    inputMode="numeric"
                    autoComplete="off"
                    min="1"
                    step="1"
                    required
                    {...foutProps("ledenaantal", "ledenaantal-fout")}
                  />
                  {veldFout("ledenaantal") && (
                    <p
                      id="ledenaantal-fout"
                      className="mt-3 text-sm text-red-800"
                    >
                      {veldFout("ledenaantal")}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="partner-email" className={labelClasses}>
                    E-mailadres
                  </label>
                  <input
                    className={veldClassName("email")}
                    id="partner-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...foutProps("email", "partner-email-fout")}
                  />
                  {veldFout("email") && (
                    <p
                      id="partner-email-fout"
                      className="mt-3 text-sm text-red-800"
                    >
                      {veldFout("email")}
                    </p>
                  )}
                </div>

                <div className="min-w-0">
                  <label htmlFor="partner-telefoon" className={labelClasses}>
                    Telefoonnummer
                  </label>
                  <input
                    className={veldClassName("telefoon")}
                    id="partner-telefoon"
                    name="telefoon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    {...foutProps("telefoon", "partner-telefoon-fout")}
                  />
                  {veldFout("telefoon") && (
                    <p
                      id="partner-telefoon-fout"
                      className="mt-3 text-sm text-red-800"
                    >
                      {veldFout("telefoon")}
                    </p>
                  )}
                </div>

                {/* TODO: `opmerking` staat niet in partnerAanmeldingSchema en gaat
                    daardoor niet mee naar de opslag of de mail. Voeg het veld toe
                    aan de validatie, de server action en de mailtemplate, of haal
                    dit veld weg. */}
                <div className="min-w-0 md:col-span-2">
                  <label htmlFor="opmerking" className={labelClasses}>
                    Opmerking (optioneel)
                  </label>
                  <textarea
                    className={veldClasses}
                    id="opmerking"
                    name="opmerking"
                    rows={4}
                  />
                </div>
              </div>

              <hr className="mt-14 border-t border-navy/25" />

              {state.message && (
                <p role="alert" className="mt-8 text-sm text-red-800">
                  {state.message}
                </p>
              )}

              {/* Navy in plaats van oranje: een oranje pil haalt op ijsblauw
                  maar 2,6:1 en is dan niet meer als knop te onderscheiden. */}
              <Knop
                type="submit"
                variant="donker"
                disabled={pending}
                className="mt-12 h-14 w-full disabled:opacity-60 md:w-auto"
              >
                {pending ? "Aanmelden…" : "Meld mijn club aan"}
              </Knop>

              <p className="mt-6 text-sm text-navy/80">
                We nemen binnen twee werkdagen contact op.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
