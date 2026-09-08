import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

export type ArtikelFrontmatter = {
  titel: string;
  beschrijving: string;
  samenvatting: string;
  gepubliceerdOp: string;
  bijgewerktOp: string;
  slug: string;
};

export type Artikel = ArtikelFrontmatter & {
  inhoud: string;
};

const artikelenMap = join(process.cwd(), "content", "artikelen");
const frontmatterPatroon =
  /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const vereisteVelden: Array<keyof ArtikelFrontmatter> = [
  "titel",
  "beschrijving",
  "samenvatting",
  "gepubliceerdOp",
  "bijgewerktOp",
  "slug",
];

function leesArtikelBestand(bestandsnaam: string): Artikel {
  const bron = readFileSync(join(artikelenMap, bestandsnaam), "utf8");
  const onderdelen = bron.match(frontmatterPatroon);

  if (!onderdelen) {
    throw new Error(`Frontmatter ontbreekt in "${bestandsnaam}".`);
  }

  const waarden = Object.fromEntries(
    onderdelen[1]
      .split(/\r?\n/)
      .filter((regel) => regel.trim() !== "")
      .map((regel) => {
        const scheiding = regel.indexOf(":");

        if (scheiding === -1) {
          throw new Error(`Ongeldige frontmatterregel in "${bestandsnaam}".`);
        }

        return [
          regel.slice(0, scheiding).trim(),
          regel.slice(scheiding + 1).trim(),
        ];
      }),
  );

  for (const veld of vereisteVelden) {
    if (!waarden[veld]) {
      throw new Error(`Frontmatterveld "${veld}" ontbreekt in "${bestandsnaam}".`);
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(waarden.slug)) {
    throw new Error(`De slug in "${bestandsnaam}" is niet URL-vriendelijk.`);
  }

  if (basename(bestandsnaam, ".mdx") !== waarden.slug) {
    throw new Error(
      `De bestandsnaam en slug van "${bestandsnaam}" komen niet overeen.`,
    );
  }

  for (const datumveld of ["gepubliceerdOp", "bijgewerktOp"] as const) {
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(waarden[datumveld]) ||
      Number.isNaN(Date.parse(waarden[datumveld]))
    ) {
      throw new Error(
        `Frontmatterveld "${datumveld}" in "${bestandsnaam}" is geen geldige datum.`,
      );
    }
  }

  return {
    titel: waarden.titel,
    beschrijving: waarden.beschrijving,
    samenvatting: waarden.samenvatting,
    gepubliceerdOp: waarden.gepubliceerdOp,
    bijgewerktOp: waarden.bijgewerktOp,
    slug: waarden.slug,
    inhoud: onderdelen[2].trim(),
  };
}

export function getAlleArtikelen(): Artikel[] {
  const artikelen = readdirSync(artikelenMap)
    .filter((bestandsnaam) => bestandsnaam.endsWith(".mdx"))
    .map(leesArtikelBestand)
    .sort((a, b) => b.gepubliceerdOp.localeCompare(a.gepubliceerdOp));

  const slugs = new Set<string>();
  for (const artikel of artikelen) {
    if (slugs.has(artikel.slug)) {
      throw new Error(`Dubbele artikelslug: "${artikel.slug}".`);
    }
    slugs.add(artikel.slug);
  }

  return artikelen;
}

export function getArtikelSlugs(): string[] {
  return getAlleArtikelen().map((artikel) => artikel.slug);
}

export function getArtikel(slug: string): Artikel | null {
  return (
    getAlleArtikelen().find((artikel) => artikel.slug === slug) ?? null
  );
}
