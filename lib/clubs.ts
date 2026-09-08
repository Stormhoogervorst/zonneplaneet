import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Club = {
  naam: string;
  code: string;
  plaats: string;
  logo: string;
  ledenaantal: string;
  vergoedingPerInstallatie: string;
  kortingPanelen: string;
  kortingBatterij: string;
  quote: {
    tekst: string;
    naam: string;
    rol: string;
  };
  bestuurRegel: string;
  faq: Array<{
    vraag: string;
    antwoord: string;
  }>;
};

export type ClubMetSlug = Club & {
  slug: string;
};

const clubsMap = join(process.cwd(), "content", "clubs");

export function getClubSlugs(): string[] {
  return readdirSync(clubsMap)
    .filter((bestandsnaam) => bestandsnaam.endsWith(".json"))
    .map((bestandsnaam) => bestandsnaam.replace(/\.json$/, ""))
    .sort();
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
