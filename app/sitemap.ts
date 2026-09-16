import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  /* TODO: Zet /kennisbank en de artikel-URL's terug als de kennisbank weer
     live gaat. */
  return [
    { url: new URL("/", siteUrl).toString() },
    { url: new URL("/clubactie", siteUrl).toString() },
    { url: new URL("/leden", siteUrl).toString() },
    { url: new URL("/partner", siteUrl).toString() },
    { url: new URL("/zonnepanelen", siteUrl).toString() },
    { url: new URL("/thuisbatterij", siteUrl).toString() },
    { url: new URL("/laadpaal", siteUrl).toString() },
  ];
}
