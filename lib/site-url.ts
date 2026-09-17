export const PRODUCTIE_SITE_URL = "https://zonneplaneetactie.nl";

export function getSiteUrl(): string {
  const ingesteld = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

  if (ingesteld) {
    return ingesteld;
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTIE_SITE_URL;
  }

  return "http://localhost:3000";
}
