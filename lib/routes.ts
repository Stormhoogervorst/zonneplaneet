export const GERESERVEERDE_SLUGS = [
  "clubactie",
  "cashback",
  "winactie",
  "clubs",
  "ledenvoordeel",
  "leden",
  "partner",
  "contact",
  "kennisbank",
  "privacy",
  "voorwaarden",
  "actievoorwaarden",
  "styleguide",
] as const;

export type GereserveerdeSlug = (typeof GERESERVEERDE_SLUGS)[number];
