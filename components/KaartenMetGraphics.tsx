import type { ComponentType } from "react";

export type GraphicKaart = {
  beschrijving: string;
  graphic: ComponentType<{ className?: string }>;
  titel: string;
};

type KaartenMetGraphicsProps = {
  headingId: string;
  intro?: string;
  kaarten: GraphicKaart[];
  titel: string;
  voettekst?: string;
};

/**
 * Drie kaarten met product- of waardegraphics. `/partner`, `/leden` en
 * `/thuisbatterij` delen deze opzet; teksten, graphics en optionele
 * voettekst verschillen.
 */
export function KaartenMetGraphics({
  headingId,
  intro,
  kaarten,
  titel,
  voettekst,
}: KaartenMetGraphicsProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        {intro ? (
          <div className="mb-24 md:flex md:items-start md:justify-between md:gap-16">
            <div className="min-w-0 md:w-[45%]">
              <h2
                id={headingId}
                className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
              >
                {titel}
              </h2>
            </div>
            <div className="min-w-0 md:w-[38%]">
              <p className="text-[1.0625rem] leading-[1.6] text-body-donker">
                {intro}
              </p>
            </div>
          </div>
        ) : (
          <h2
            id={headingId}
            className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
          >
            {titel}
          </h2>
        )}

        <div
          className={`grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 ${intro ? "" : "mt-12"}`}
        >
          {kaarten.map(
            ({ titel: kaartTitel, graphic: Graphic, beschrijving }) => (
              <div
                key={kaartTitel}
                className="flex h-full flex-col bg-keuzekaart p-10"
              >
                <div className="flex h-[120px] items-center justify-center">
                  <Graphic className="size-20" />
                </div>
                <h3 className="mt-8 text-[1.375rem] font-semibold text-navy">
                  {kaartTitel}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.6] text-body-donker">
                  {beschrijving}
                </p>
              </div>
            ),
          )}
        </div>

        {voettekst ? (
          <p className="mt-10 max-w-[70ch] text-[0.9375rem] leading-[1.6] text-body-donker">
            {voettekst}
          </p>
        ) : null}
      </div>
    </section>
  );
}
