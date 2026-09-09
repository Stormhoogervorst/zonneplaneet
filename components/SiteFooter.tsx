import Image from "next/image";
import Link from "next/link";
import { ZonneplaneetBlok } from "@/components/ZonneplaneetBlok";
import logoZonneplaneet from "@/public/logo-zonneplaneet-wit.png";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-12 overflow-hidden bg-navy text-white">
      <div className="site-footer-trust">
        <ZonneplaneetBlok headingId="zonneplaneet-vertrouwen-footer" />
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 md:grid-cols-[1fr_1.25fr] md:py-28">
        <Image
          src={logoZonneplaneet}
          alt="Zonneplaneet"
          className="h-12 w-auto"
        />

        <nav aria-label="Voettekstnavigatie">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <Link href="/clubactie" className="text-body-l">
                Clubactie
              </Link>
            </li>
            <li>
              <Link href="/cashback" className="text-body-l">
                Cashback
              </Link>
            </li>
            <li>
              <Link href="/winactie" className="text-body-l">
                Winactie
              </Link>
            </li>
            <li>
              <Link href="/leden" className="text-body-l">
                Voor leden
              </Link>
            </li>
            <li>
              <Link href="/clubs" className="text-body-l">
                Zoek je club
              </Link>
            </li>
            <li>
              <Link href="/partner" className="text-body-l">
                Voor clubs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-body-l">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-5xl border-t border-white/20 px-5 py-6">
        <nav aria-label="Juridische informatie">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-white/80">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/voorwaarden">Voorwaarden</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        aria-hidden="true"
        className="h-[clamp(6rem,20vw,17rem)] overflow-hidden"
      >
        <svg
          viewBox="0 0 1200 250"
          className="w-full translate-y-[14%]"
          focusable="false"
        >
          <text
            x="16"
            y="220"
            className="fill-navy-licht font-sans text-[240px] font-normal tracking-[-0.06em]"
          >
            Zonneplaneet Actie
          </text>
        </svg>
      </div>
    </footer>
  );
}
