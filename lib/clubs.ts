import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { GERESERVEERDE_SLUGS } from "@/lib/routes";

/** Vergoeding aan de club per uitgevoerde installatie. */
export const STANDAARD_VERGOEDING = "€250";

export type Club = {
  naam: string;
  code: string;
  plaats: string;
  logo: string;
  ledenaantal: string;
  vergoedingPerInstallatie: string;
  kortingPanelen: string;
  kortingBatterij: string;
  quote?: {
    tekst: string;
    naam: string;
    rol: string;
  };
  bestuurRegel?: string;
  faq: Array<{
    vraag: string;
    antwoord: string;
  }>;
};

/** Lege velden en JSON-placeholders tellen niet als gepubliceerde inhoud. */
export function isClubVeldGevuld(waarde: string | undefined): boolean {
  const tekst = waarde?.trim() ?? "";

  if (tekst === "") {
    return false;
  }

  return !/^TODO\b/i.test(tekst);
}

export function clubHeeftQuote(
  club: Club,
): club is Club & { quote: NonNullable<Club["quote"]> } {
  return (
    isClubVeldGevuld(club.quote?.tekst) &&
    isClubVeldGevuld(club.quote?.naam) &&
    isClubVeldGevuld(club.quote?.rol)
  );
}

export function clubHeeftBestuurRegel(
  club: Club,
): club is Club & { bestuurRegel: string } {
  return isClubVeldGevuld(club.bestuurRegel);
}

export type ClubMetSlug = Club & {
  slug: string;
};

const clubsMap = join(process.cwd(), "content", "clubs");

const gereserveerdeSlugs = new Set<string>(GERESERVEERDE_SLUGS);

export function getClubSlugs(): string[] {
  const slugs = readdirSync(clubsMap)
    .filter((bestandsnaam) => bestandsnaam.endsWith(".json"))
    .map((bestandsnaam) => bestandsnaam.replace(/\.json$/, ""))
    .sort();

  for (const slug of slugs) {
    if (gereserveerdeSlugs.has(slug)) {
      throw new Error(`Clubslug '${slug}' botst met een gereserveerde route.`);
    }
  }

  return slugs;
}

export function getClub(slug: string): Club | null {
  if (!getClubSlugs().includes(slug)) {
    return null;
  }

  const inhoud = readFileSync(join(clubsMap, `${slug}.json`), "utf8");
  return JSON.parse(inhoud) as Club;
}

export function getAlleClubs(): ClubMetSlug[] {
  return getClubSlugs().map((slug) => {
    const club = getClub(slug);

    if (!club) {
      throw new Error(`Clubcontent voor "${slug}" kon niet worden geladen.`);
    }

    return { ...club, slug };
  });
}
