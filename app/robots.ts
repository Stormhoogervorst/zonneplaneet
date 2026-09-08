import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
