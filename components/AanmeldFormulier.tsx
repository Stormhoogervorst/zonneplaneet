"use client";

import { useActionState, useEffect, useRef } from "react";
import { meldAan } from "@/app/aanmelden/actions";
import { meetPlausibleEvent } from "@/lib/plausible";
import type { AanmeldState, AanmeldVeld } from "@/lib/validatie";

const initialState: AanmeldState = {
  success: false,
};

type AanmeldFormulierProps = {
  clubslug: string;
  clubcode: string;
};

export function AanmeldFormulier({
  clubslug,
  clubcode,
}: AanmeldFormulierProps) {
  const [state, formAction, pending] = useActionState(meldAan, initialState);
  const conversieGemeten = useRef(false);

  useEffect(() => {
    if (
      state.success &&
      state.meetConversie &&
      !conversieGemeten.current
    ) {
      meetPlausibleEvent("Aanmelding", {
        clubcode: state.clubcode ?? clubcode,
      });
      conversieGemeten.current = true;
    }
  }, [clubcode, state.clubcode, state.meetConversie, state.success]);

  if (state.success) {
    return (
      <div role="status" aria-live="polite" className="mt-6">
        <h3 className="text-xl font-semibold">Aanmelding ontvangen</h3>
        <p className="mt-4">
          We hebben je aanmelding ontvangen. Je clubcode is{" "}
          <strong>{state.clubcode ?? clubcode}</strong>. Noem deze code als
          Zonneplaneet je belt.
        </p>
      </div>
    );
  }

  const veldFout = (veld: AanmeldVeld) => state.errors?.[veld]?.[0];
  const invoerClassName = "mt-1 w-full border border-slate-400 px-3 py-2";

  return (
    <form action={formAction} className="mt-6" noValidate>
      <input type="hidden" name="clubslug" value={clubslug} />
      <input type="hidden" name="clubcode" value={clubcode} />

      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div>
        <label htmlFor="naam">Naam</label>
        <input
          className={invoerClassName}
          id="naam"
          name="naam"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(veldFout("naam"))}
          aria-describedby={veldFout("naam") ? "naam-fout" : undefined}
        />
        {veldFout("naam") && (
          <p id="naam-fout" className="mt-1 text-red-700">
            {veldFout("naam")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="email">E-mail</label>
        <input
          className={invoerClassName}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(veldFout("email"))}
          aria-describedby={veldFout("email") ? "email-fout" : undefined}
        />
        {veldFout("email") && (
          <p id="email-fout" className="mt-1 text-red-700">
            {veldFout("email")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="telefoon">Telefoon</label>
        <input
          className={invoerClassName}
          id="telefoon"
          name="telefoon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={Boolean(veldFout("telefoon"))}
          aria-describedby={
            veldFout("telefoon") ? "telefoon-fout" : undefined
          }
        />
        {veldFout("telefoon") && (
          <p id="telefoon-fout" className="mt-1 text-red-700">
            {veldFout("telefoon")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="postcode">Postcode</label>
        <input
          className={invoerClassName}
          id="postcode"
          name="postcode"
          type="text"
          autoComplete="postal-code"
          inputMode="text"
          required
          aria-invalid={Boolean(veldFout("postcode"))}
          aria-describedby={
            veldFout("postcode") ? "postcode-fout" : undefined
          }
        />
        {veldFout("postcode") && (
          <p id="postcode-fout" className="mt-1 text-red-700">
            {veldFout("postcode")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="interesse">Waar heb je interesse in?</label>
        <select
          className={invoerClassName}
          id="interesse"
          name="interesse"
          autoComplete="off"
          required
          defaultValue=""
          aria-invalid={Boolean(veldFout("interesse"))}
          aria-describedby={
            veldFout("interesse") ? "interesse-fout" : undefined
          }
        >
          <option value="" disabled>
            Kies een optie
          </option>
          <option value="panelen">Zonnepanelen</option>
          <option value="batterij">Thuisbatterij</option>
          <option value="beide">Zonnepanelen en thuisbatterij</option>
          <option value="laadpaal">Laadpaal</option>
        </select>
        {veldFout("interesse") && (
          <p id="interesse-fout" className="mt-1 text-red-700">
            {veldFout("interesse")}
          </p>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-start gap-2">
          <input
            id="akkoord"
            name="akkoord"
            type="checkbox"
            autoComplete="off"
            required
            aria-invalid={Boolean(veldFout("akkoord"))}
            aria-describedby={
              veldFout("akkoord") ? "akkoord-fout" : undefined
            }
          />
          <label htmlFor="akkoord">
            Ik geef toestemming om mijn gegevens met mijn clubcode door te
            sturen naar Zonneplaneet.
          </label>
        </div>
        {veldFout("akkoord") && (
          <p id="akkoord-fout" className="mt-1 text-red-700">
            {veldFout("akkoord")}
          </p>
        )}
      </div>

      {state.message && (
        <p role="alert" className="mt-4 text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 bg-navy px-4 py-2 text-white disabled:opacity-60"
      >
        {pending ? "Aanmelden…" : "Meld me aan"}
      </button>
      <p className="mt-4">
        Vrijblijvend. Je zit nergens aan vast tot je een offerte tekent.
      </p>
    </form>
  );
}
