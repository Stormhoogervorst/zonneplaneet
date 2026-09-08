import Image from "next/image";
import Link from "next/link";
import { HeaderBalk } from "@/components/HeaderBalk";
import heroFoto from "@/app/images/homepage-hero-zonnepanelen.jpg";

export function HomepageHero() {
  return (
    <section
      aria-labelledby="hero-titel"
      className="relative h-screen min-h-[640px] overflow-hidden"
    >
      <Image
        src={heroFoto}
        alt="Zonnepanelen op het dak van een schuur in een weiland"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {/* Eén egale laag: de kop staat gecentreerd, dus het contrast moet overal gelijk zijn */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(7,39,55,0.45)]"
      />

      {/* Bovenbalk: dezelfde balk als de rest van de site, doorzichtig over de
          foto en daarom in de donkere variant */}
      <div className="absolute inset-x-0 top-0 z-30">
        <HeaderBalk ondergrond="donker" />
      </div>

      {/* Gecentreerde inhoud: de pt houdt de kop vrij van de bovenbalk op korte schermen */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-[104px] text-center md:px-8">
        <h1
          id="hero-titel"
          className="mx-auto max-w-[17ch] text-[clamp(2.25rem,6.5vw,5.5rem)] leading-[1.05] font-normal tracking-[-0.02em] text-balance text-white"
        >
          Ledenvoordeel voor zonne-energie
        </h1>

        <p className="mx-auto mt-8 max-w-[46ch] text-[1.125rem] leading-[1.6] text-[rgba(255,255,255,0.9)]">
          Voor leden van aangesloten sportverenigingen.
        </p>

        {/* Knoprij: de oranje cirkel staat los naast de pil, niet erin */}
        <div className="mt-10 flex items-center justify-center gap-2 md:gap-3">
          <Link
            href="#kies-onderdeel"
            className="flex h-13 items-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy md:h-14 md:px-8"
          >
            Bekijk de opties
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
