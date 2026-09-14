export const GERESERVEERDE_SLUGS = [
  "clubactie",
  "cashback",
  "winactie",
  "referral",
  "clubs",
  "ledenvoordeel",
  "leden",
  "partner",
  "contact",
  "over-zonneplaneet",
  "kennisbank",
  "privacy",
  "voorwaarden",
  "actievoorwaarden",
  "styleguide",
] as const;

export type GereserveerdeSlug = (typeof GERESERVEERDE_SLUGS)[number];
