import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderBalk } from "@/components/HeaderBalk";

type HeroGedeeld = {
  knoplink: string;
  knoptekst: string;
  kop: ReactNode;
  /** Optioneel beeld boven de kop, bijvoorbeeld een clublogo van 64px hoog. */
  logo?: { alt: string; src: string };
  subregel: string;
};

type HeroCompact = HeroGedeeld & {
  /** Compacte hero: lichtgrijs vlak, kleinere kop, geen foto. */
  compact: true;
  alt?: never;
  foto?: never;
  overlayKlasse?: never;
  uitgelijnd?: never;
};

type HeroUitgelijnd = Omit<HeroGedeeld, "logo"> & {
  alt: string;
  compact?: never;
  foto: StaticImageData | string;
  logo?: never;
  overlayKlasse?: never;
  /** Tweekoloms hero: kop links, tekst en knop rechts, foto eronder. */
  uitgelijnd: true;
};

type HeroVol = HeroGedeeld & {
  alt: string;
  compact?: false;
  foto: StaticImageData | string;
  overlayKlasse?: string;
  uitgelijnd?: never;
};

type HeroProps = HeroCompact | HeroUitgelijnd | HeroVol;

function UitgelijndeHero({
  alt,
  foto,
  knoplink,
  knoptekst,
  kop,
  subregel,
}: HeroUitgelijnd) {
  return (
    <section aria-labelledby="hero-titel">
      <div className="bg-salderingsvlak">
        <HeaderBalk ondergrond="licht" />
        <div className="mx-auto max-w-[1440px] px-8 pt-24 pb-14 md:flex md:items-end md:justify-between md:gap-16 md:px-16 md:pt-32 md:pb-20">
          <div className="min-w-0 md:w-[52%] md:shrink-0">
            <h1
              id="hero-titel"
              className="text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] font-normal tracking-[-0.02em] text-navy"
            >
              {kop}
            </h1>
          </div>

          <div className="mt-8 min-w-0 md:mt-0 md:w-[38%]">
            <p className="text-[1.0625rem] leading-[1.6] text-body-donker">
              {subregel}
            </p>

            {/* Knoprij: de oranje cirkel staat los naast de pil, niet erin */}
            <div className="mt-8 flex items-center justify-start gap-2 md:gap-3">
              <Link
                href={knoplink}
                className="flex h-13 items-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy md:h-14 md:px-8"
              >
                {knoptekst}
              </Link>
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-oranje text-navy md:size-14"
              >
                <svg viewBox="0 0 24 24" fill="none" className="size-5">
                  <path
                    d="M7 17 17 7m0 0H9m8 0v8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        <Image
          src={foto}
          alt={alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function Hero(props: HeroProps) {
  if (props.uitgelijnd) {
    return <UitgelijndeHero {...props} />;
  }

  const { knoplink, knoptekst, kop, logo, subregel } = props;
  const compact = props.compact === true;

  return (
    <section
      aria-labelledby="hero-titel"
      className={
        compact
          ? "relative min-h-[55vh] bg-salderingsvlak"
          : "relative h-screen min-h-[640px] overflow-hidden"
      }
    >
      {compact ? null : (
        <>
          <Image
            src={props.foto}
            alt={props.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          {/* Eén egale laag: de kop staat gecentreerd, dus het contrast moet overal gelijk zijn */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${props.overlayKlasse ?? "bg-[rgba(7,39,55,0.45)]"}`}
          />
        </>
      )}

      {/* Bovenbalk: op de fotovariant doorzichtig over de foto (donker), op
          het grijze vlak de lichte variant. */}
      <div className="absolute inset-x-0 top-0 z-30">
        <HeaderBalk ondergrond={compact ? "licht" : "donker"} />
      </div>

      {/* Gecentreerde inhoud: de pt houdt de kop vrij van de bovenbalk op korte schermen.
          Compact staat in de flow, zodat de knop niet afkapt als 55vh te krap is. */}
      <div
        className={
          compact
            ? "relative z-10 flex min-h-[55vh] flex-col items-center justify-center px-6 pt-[104px] pb-8 text-center md:px-8"
            : "absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-[104px] text-center md:px-8"
        }
      >
        {logo ? (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={320}
            height={120}
            className="mb-4 h-16 w-auto"
            style={{ width: "auto", height: 64 }}
          />
        ) : null}

        <h1
          id="hero-titel"
          className={
            compact
              ? "mx-auto max-w-[22ch] [overflow-wrap:normal] text-[clamp(1.875rem,5vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.02em] text-balance hyphens-none [word-break:normal] text-navy"
              : "mx-auto max-w-[30ch] [overflow-wrap:normal] text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.05] font-normal tracking-[-0.02em] hyphens-none [word-break:normal] text-white"
          }
        >
          {kop}
        </h1>

        <p
          className={
            compact
              ? "mx-auto mt-4 max-w-[46ch] text-[1.125rem] leading-[1.6] text-body-donker md:mt-8"
              : "mx-auto mt-8 max-w-[46ch] text-[1.125rem] leading-[1.6] text-[rgba(255,255,255,0.9)]"
          }
        >
          {subregel}
        </p>

        {/* Knoprij: de oranje cirkel staat los naast de pil, niet erin */}
        <div
          className={
            compact
              ? "mt-6 flex items-center justify-center gap-2 md:mt-10 md:gap-3"
              : "mt-10 flex items-center justify-center gap-2 md:gap-3"
          }
        >
          <Link
            href={knoplink}
            className="flex h-13 items-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy md:h-14 md:px-8"
          >
            {knoptekst}
          </Link>
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-oranje text-navy md:size-14"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5">
              <path
                d="M7 17 17 7m0 0H9m8 0v8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
