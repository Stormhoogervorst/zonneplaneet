import type { ReactNode } from "react";
import { Tag } from "./Tag";

/**
 * Rijenlijst is het rijenpatroon met haarlijnen: een kopblok en daaronder
 * rijen met een label, een isometrisch lijnicoon en een beschrijving.
 * De rijtitels zijn labels, geen koppen, dus de lijst is een `dl`.
 */

/** Iconen in een Rijenlijst gebruiken deze klassen, zodat elke rij dezelfde
 * maat en kleur houdt: 48px op mobiel, 64px vanaf md. */
export const rijenlijstIcoonClasses = "size-12 text-navy md:size-16";

export type RijenlijstRij = {
  titel: string;
  icoon: ReactNode;
  beschrijving: string;
  /** Optionele knop onder de hele rij, links uitgelijnd. */
  actie?: ReactNode;
};

type RijenlijstProps = {
  /** Id van de h2, waar de sectie via aria-labelledby naar verwijst. */
  id: string;
  eyebrow: string;
  kop: string;
  rijen: RijenlijstRij[];
  /** Optionele inhoud onder de rijen, bijvoorbeeld een knop. */
  children?: ReactNode;
};

export function Rijenlijst({
  id,
  eyebrow,
  kop,
  rijen,
  children,
}: RijenlijstProps) {
  return (
    <section aria-labelledby={id} className="bg-salderingsvlak py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="mb-20">
          <Tag>{eyebrow}</Tag>
          <h2
            id={id}
            className="mt-6 max-w-[44ch] text-[1.75rem] leading-[1.35] font-normal text-navy"
          >
            {kop}
          </h2>
        </div>

        {/* Alleen haarlijnen tussen de rijen: de laatste rij wordt niet
            afgesloten met een lijn. */}
        <dl>
          {rijen.map(({ titel, icoon, beschrijving, actie }) => (
            <div
              key={titel}
              className={
                actie
                  ? "border-t border-salderingslijn pt-10 pb-0 md:grid md:grid-cols-12 md:items-start md:pt-14"
                  : "border-t border-salderingslijn py-10 md:grid md:grid-cols-12 md:items-start md:py-14"
              }
            >
              <dt className="text-[1.0625rem] font-semibold text-navy md:col-span-3">
                {titel}
              </dt>
              <dd
                aria-hidden="true"
                className="mt-5 md:col-span-3 md:col-start-4 md:mt-0"
              >
                {icoon}
              </dd>
              <dd className="mt-4 text-[0.9375rem] leading-[1.6] text-body-donker md:col-span-5 md:col-start-8 md:mt-0">
                {beschrijving}
              </dd>
              {actie ? (
                <dd className="mt-16 list-none md:col-span-12 md:mt-20">
                  {actie}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>

        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
