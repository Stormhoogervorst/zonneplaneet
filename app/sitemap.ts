import type { MetadataRoute } from "next";
import { getAlleArtikelen } from "@/lib/artikelen";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const artikelUrls: MetadataRoute.Sitemap = getAlleArtikelen().map(
    (artikel) => ({
      url: new URL(`/kennisbank/${artikel.slug}`, siteUrl).toString(),
      lastModified: new Date(artikel.bijgewerktOp),
    }),
  );

  return [
    { url: new URL("/", siteUrl).toString() },
    { url: new URL("/partner", siteUrl).toString() },
    { url: new URL("/kennisbank", siteUrl).toString() },
    ...artikelUrls,
  ];
}
