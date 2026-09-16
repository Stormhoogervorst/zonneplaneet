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
  /** Standaard vierkant vanaf md. Zet uit bij langere kaartteksten. */
  vierkanteKaarten?: boolean;
};

/**
 * De drie kaarten met WaardeGraphics. `/partner` en `/leden` delen deze opzet;
 * alleen de teksten en welke graphic waar staat verschillen.
 */
export function KaartenMetGraphics({
  headingId,
  intro,
  kaarten,
  titel,
  vierkanteKaarten = true,
}: KaartenMetGraphicsProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="mb-24 md:flex md:items-start md:justify-between md:gap-16">
          <div className="min-w-0 md:w-[45%]">
            <h2
              id={headingId}
              className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
            >
              {titel}
            </h2>
          </div>
          {intro ? (
            <div className="min-w-0 md:w-[38%]">
              <p className="text-[1.0625rem] leading-[1.6] text-body-donker">
                {intro}
              </p>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-[2px]">
          {kaarten.map(
            ({ titel: kaartTitel, graphic: Graphic, beschrijving }) => (
              <div
                key={kaartTitel}
                className={
                  vierkanteKaarten
                    ? "bg-keuzekaart px-10 py-12 md:flex md:aspect-square md:min-h-[420px] md:flex-col md:py-0"
                    : "bg-keuzekaart px-10 py-12 md:flex md:min-h-[420px] md:flex-col"
                }
              >
                <div className="md:flex md:flex-1 md:items-center md:justify-center">
                  <Graphic className="size-24 md:size-32" />
                </div>

                <div className="mt-8 md:mt-0 md:pb-10">
                  <h3 className="text-[1.5rem] font-normal text-navy">
                    {kaartTitel}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.6] text-body-donker">
                    {beschrijving}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
