import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderBalk } from "@/components/HeaderBalk";

type HeroKnop = {
  knoplink: string;
  knoptekst: string;
};

type HeroZonderKnop = {
  knoplink?: never;
  knoptekst?: never;
};

type HeroInhoud = {
  kop: ReactNode;
  /** Optioneel beeld boven de kop, bijvoorbeeld een clublogo van 64px hoog. */
  logo?: { alt: string; src: string };
  subregel: string;
};

type HeroUitgelijnd = HeroInhoud &
  (HeroKnop | HeroZonderKnop) & {
    alt: string;
    foto: StaticImageData | string;
    overlayKlasse?: never;
    /** Tweekoloms hero: kop links, tekst en knop rechts, foto eronder. */
    uitgelijnd: true;
  };

type HeroVol = HeroInhoud &
  HeroKnop & {
    alt: string;
    foto: StaticImageData | string;
    overlayKlasse?: string;
    uitgelijnd?: never;
    logo?: never;
  };

type HeroProps = HeroUitgelijnd | HeroVol;

const STER_PAD =
  "M12 2.6 14.86 8.9l6.84.79-5.1 4.47 1.45 6.73L12 17.72l-6.05 3.17 1.45-6.73-5.1-4.47 6.84-.79L12 2.6Z";

function Ster({ half = false }: { half?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[16px]" aria-hidden="true">
      {half ? (
        <>
          <path d={STER_PAD} fill="currentColor" opacity="0.28" />
          <path
            d={STER_PAD}
            fill="currentColor"
            clipPath="url(#hero-ster-helft)"
          />
          <defs>
            <clipPath id="hero-ster-helft">
              <rect width="12" height="24" />
            </clipPath>
          </defs>
        </>
      ) : (
        <path d={STER_PAD} fill="currentColor" />
      )}
    </svg>
  );
}

function HeroBeoordeling({ klasse }: { klasse: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${klasse}`}>
      {/* TODO: Bevestig bron en peildatum van het cijfer 4,2. */}
      <span>Beoordeeld met een 4,2 gemiddeld</span>
      <span
        aria-hidden="true"
        className="inline-flex items-center gap-0.5 text-oranje"
      >
        <Ster />
        <Ster />
        <Ster />
        <Ster />
        <Ster half />
      </span>
    </p>
  );
}

function UitgelijndeHero({
  alt,
  foto,
  knoplink,
  knoptekst,
  kop,
  logo,
  subregel,
}: HeroUitgelijnd) {
  const compact = Boolean(logo);

  return (
    <section aria-labelledby="hero-titel">
      <div className="bg-salderingsvlak">
        <HeaderBalk ondergrond="licht" />
        <div
          className={
            compact
              ? "mx-auto max-w-[1440px] px-8 pt-6 pb-8 md:flex md:items-end md:justify-between md:gap-16 md:px-16 md:pt-8 md:pb-10"
              : "mx-auto max-w-[1440px] px-8 pt-24 pb-14 md:flex md:items-end md:justify-between md:gap-16 md:px-16 md:pt-32 md:pb-20"
          }
        >
          <div className="min-w-0 md:w-[52%] md:shrink-0">
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
                  ? "text-[clamp(1.875rem,5vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.02em] [overflow-wrap:normal] hyphens-none [word-break:normal] text-navy"
                  : "text-[clamp(2rem,5vw,4.25rem)] leading-[1.05] font-normal tracking-[-0.02em] [overflow-wrap:normal] hyphens-none [word-break:normal] text-navy"
              }
            >
              {kop}
            </h1>
          </div>

          <div
            className={
              compact
                ? "mt-4 min-w-0 md:mt-0 md:w-[38%]"
                : "mt-8 min-w-0 md:mt-0 md:w-[38%]"
            }
          >
            <p className="text-[1.0625rem] leading-[1.6] text-body-donker">
              {subregel}
            </p>

            {knoplink && knoptekst ? (
              <div
                className={
                  compact
                    ? "mt-6 flex items-center justify-start gap-2 md:gap-3"
                    : "mt-8 flex items-center justify-start gap-2 md:gap-3"
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
            ) : null}

            {compact ? null : (
              <HeroBeoordeling klasse="mt-6 text-body text-body-donker" />
            )}
          </div>
        </div>
      </div>

      <div
        className={
          compact
            ? "relative aspect-[16/9] w-full md:aspect-[21/9]"
            : "relative aspect-[4/3] w-full md:aspect-[21/9]"
        }
      >
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

  const { knoplink, knoptekst, kop, subregel } = props;

  return (
    <section
      aria-labelledby="hero-titel"
      className="relative h-screen min-h-[640px] overflow-hidden"
    >
      <Image
        src={props.foto}
        alt={props.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/* Eén egale laag. 0.42 haalt 2,55:1 op het lichtste punt; 0.62 haalt 4,55:1. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${props.overlayKlasse ?? "bg-[rgba(7,39,55,0.62)]"}`}
      />

      {/* Bovenbalk: doorzichtig over de foto. */}
      <div className="absolute inset-x-0 top-0 z-30">
        <HeaderBalk ondergrond="donker" />
      </div>

      {/* Onder md links uitgelijnd; vanaf md gecentreerd zoals eerder. */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 pt-[104px] text-left md:items-center md:px-8 md:text-center">
        <HeroBeoordeling klasse="mb-8 text-[0.9375rem] text-tag md:justify-center" />

        <h1
          id="hero-titel"
          className="w-full min-w-0 text-balance text-[clamp(2.5rem,9vw,4.5rem)] leading-[1.0] font-normal tracking-[-0.02em] text-white"
        >
          {kop}
        </h1>

        <p className="mt-6 max-w-[34ch] text-left text-[1.125rem] leading-[1.6] text-[rgba(255,255,255,0.9)] md:mx-auto md:mt-8 md:max-w-[46ch] md:text-center">
          {subregel}
        </p>

        {/* Knoprij: de oranje cirkel staat los naast de pil, niet erin */}
        <div className="mt-10 flex items-center justify-start gap-2 md:justify-center md:gap-3">
          <Link
            href={knoplink}
            className="flex h-13 w-auto items-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy md:h-14 md:px-8"
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
