import type { ComponentType } from "react";
import Link from "next/link";

/*
 * Deze kaarten wijken bewust af van de rest van de site: scherpe hoeken in
 * plaats van radius en geen pil-vormen. Neem dit patroon niet over in andere
 * secties, behalve waar dezelfde keuze- of actiekaart hoort.
 */

export function ZonnepaneelIcoon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-14 text-navy md:size-[72px]"
    >
      <path d="M36 16 64 30 36 44 8 30Z" />
      <path d="M8 30v4l28 14 28-14v-4M36 44v4" />
      <path d="M43 19.5 15 33.5M50 23 22 37M57 26.5 29 40.5" />
      <path d="M15 26.5 43 40.5M22 23 50 37M29 19.5 57 33.5" />
      <path d="M19 40v14M53 40v14" />
    </svg>
  );
}

export function HuisbatterijIcoon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-14 text-navy md:size-[72px]"
    >
      <path d="M36 12 58 25 36 38 14 25Z" />
      <path d="M14 25v24M58 25v24M36 38v24" />
      <path d="M14 49 36 62 58 49" />
      <path d="M14 33 36 46M14 40 36 53" />
      <path d="M50 38 44 47h4l-4 8 6-9h-4Z" />
    </svg>
  );
}

export function LaadpaalIcoon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-14 text-navy md:size-[72px]"
    >
      <path d="M36 14 44 18 36 22 28 18Z" />
      <path d="M28 18v34M44 18v34M36 22v34" />
      <path d="M36 28 42 25v8l-6 3Z" />
      <path d="M28 30c-6 2-7 9-2 12" />
      <path d="M26 42 24 45" />
      <path d="M23 48.7 36 56 49 48.7" />
    </svg>
  );
}

/**
 * Alle blokken hebben dezelfde opmaak. Een blok zonder `href` rendert als `div`
 * in plaats van als `Link`, maar houdt de hover en de tekst-reveal.
 */
export type KeuzeKaart = {
  id: string;
  titel: string;
  beschrijving: string;
  href?: string;
  Icoon: ComponentType;
};

export function KeuzeKaarten({ kaarten }: { kaarten: KeuzeKaart[] }) {
  return (
    <div
      className={`grid gap-3 sm:grid-cols-2 md:gap-[2px] ${
        kaarten.length > 2
          ? "lg:grid-cols-3"
          : "mx-auto w-full max-w-5xl"
      }`}
    >
      {kaarten.map(({ id, titel, beschrijving, href, Icoon }) => {
        const inhoud = (
          <>
            <span
              aria-hidden="true"
              className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors duration-200 md:group-hover:bg-navy md:group-hover:text-oranje md:group-focus-visible:bg-navy md:group-focus-visible:text-oranje"
            >
              <svg viewBox="0 0 14 14" fill="none" className="size-[14px]">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <div className="flex flex-col items-start md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:items-center md:px-8">
              <Icoon />
              <h3 className="mt-5 text-left text-lg font-semibold text-navy md:mt-8 md:text-center md:text-[1.0625rem]">
                {titel}
              </h3>
            </div>

            <div className="mt-3 w-full text-left md:invisible md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-8 md:pb-8 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:visible md:group-hover:opacity-100 md:group-focus-visible:visible md:group-focus-visible:opacity-100">
              <p className="text-base leading-[1.5] text-body-donker md:mt-4 md:max-w-[34ch] md:text-navy">
                {beschrijving}
              </p>
            </div>
          </>
        );

        const kaartClasses =
          "group relative flex flex-col items-start justify-start bg-keuzekaart p-6 transition-colors duration-200 active:bg-oranje focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy md:aspect-[4/5] md:block md:p-0 md:hover:bg-oranje md:focus-visible:bg-oranje";

        if (!href) {
          return (
            <div key={id} className={kaartClasses}>
              {inhoud}
            </div>
          );
        }

        return (
          <Link key={id} href={href} className={kaartClasses}>
            {inhoud}
          </Link>
        );
      })}
    </div>
  );
}
