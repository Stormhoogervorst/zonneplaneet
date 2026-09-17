import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* TODO: Haal deze disallow weg als de kennisbank weer live gaat. */
      disallow: ["/kennisbank"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
