import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { PlausibleAnalytics } from "@/components/PlausibleAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zonneplaneet Actie",
    template: "%s | Zonneplaneet Actie",
  },
  description:
    "Meld je via je sportvereniging aan voor informatie van Zonneplaneet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-navy">
        <PlausibleAnalytics />
        <a
          href="#inhoud"
          className="absolute -translate-y-full bg-white px-4 py-2 focus:translate-y-0"
        >
          Ga naar de inhoud
        </a>
        <SiteHeader />
        <div id="inhoud" tabIndex={-1} className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
