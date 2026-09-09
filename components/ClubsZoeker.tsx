"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Knop } from "@/components/ui";

export type ClubsZoekerClub = {
  slug: string;
  naam: string;
  plaats: string;
  logo: string;
};

type ClubsZoekerProps = {
  clubs: ClubsZoekerClub[];
};

function SchuinePijl() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 shrink-0 text-oranje-diep"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5m0 0H6m5.5 0V10" />
    </svg>
  );
}

export function ClubsZoeker({ clubs }: ClubsZoekerProps) {
  const [zoek, setZoek] = useState("");

  const zichtbaar = useMemo(() => {
    const term = zoek.trim().toLocaleLowerCase("nl-NL");
    if (!term) {
      return clubs;
    }

    return clubs.filter(
      (club) =>
        club.naam.toLocaleLowerCase("nl-NL").includes(term) ||
        club.plaats.toLocaleLowerCase("nl-NL").includes(term),
    );
  }, [clubs, zoek]);

  return (
    <section
      aria-labelledby="clubs-zoek-titel"
      className="bg-tag py-20 text-navy md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id="clubs-zoek-titel"
          className="text-[1.75rem] font-normal text-navy"
        >
          Kies je vereniging
        </h2>

        <div role="search" className="mt-8 w-full max-w-[640px]">
          <label
            htmlFor="clubs-zoek"
            className="mb-3 block text-[0.9375rem] font-semibold text-navy"
          >
            Zoek op naam of plaats
          </label>
          <input
            id="clubs-zoek"
            type="search"
            value={zoek}
            onChange={(event) => setZoek(event.target.value)}
            autoComplete="off"
            className="clubs-zoekveld h-14 w-full rounded-[0.75rem] border border-navy/20 bg-white px-4 text-body text-navy"
          />
        </div>

        {zichtbaar.length === 0 ? (
          <div role="status" aria-live="polite" className="mt-10">
            <p className="text-body-l text-navy">Geen vereniging gevonden.</p>
            <Knop href="/partner" variant="stil" className="mt-6 px-0">
              Tip je bestuur
            </Knop>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zichtbaar.map((club) => (
              <li key={club.slug}>
                <Link
                  href={`/${club.slug}`}
                  className="clubkaart flex items-center gap-4 rounded-[1.25rem] border border-navy/12 bg-white p-6 transition-[border-color] duration-200 hover:border-navy"
                >
                  <Image
                    src={club.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[1.125rem] font-semibold text-navy">
                      {club.naam}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-navy">
                      {club.plaats}
                    </span>
                  </span>
                  <SchuinePijl />
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16">
          <p className="text-body-l text-navy">
            Staat jouw vereniging er niet bij?
          </p>
          <Knop href="/partner" className="mt-6">
            Tip je bestuur
          </Knop>
        </div>
      </div>
    </section>
  );
}
