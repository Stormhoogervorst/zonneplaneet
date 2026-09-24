import Link from "next/link";
import { Woordmerk } from "@/components/Woordmerk";
import { BEDRIJFSNAAM, EMAIL, KVK_NUMMER, VESTIGING } from "@/lib/bedrijf";
import { footerKolommen, type NavigatieLink } from "@/lib/navigatie";

const linkClass =
  "inline-flex min-h-11 items-center text-white underline decoration-white/40 underline-offset-4 hover:decoration-white";

function FooterLink({ href, label }: NavigatieLink) {
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const jaar = new Date().getFullYear();
  const kolommen = footerKolommen();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="Zonneplaneet ACTIE, naar de homepage"
              className="inline-flex"
            >
              <Woordmerk ondergrond="donker" klasseHoogte="h-12" />
            </Link>
            <h2 className="mt-6 text-body-l font-semibold">
              Wij leveren en installeren
            </h2>
            <p className="mt-4 max-w-prose">
              We nemen contact op met aangemelde leden en verzorgen advies,
              verkoop en installatie.
            </p>
            <address className="mt-6 not-italic">
              <p>{BEDRIJFSNAAM}</p>
              <p className="mt-1">KvK {KVK_NUMMER}</p>
              <p className="mt-4">{VESTIGING.straat}</p>
              <p>
                {VESTIGING.postcode} {VESTIGING.plaats}
              </p>
              <p className="mt-4">
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
              </p>
              <p className="mt-4">We werken vanuit Assen en Arnhem.</p>
            </address>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {kolommen.map((kolom) => (
              <nav key={kolom.titel} aria-label={kolom.titel} className="min-w-0">
                <h2 className="text-body font-semibold">{kolom.titel}</h2>
                <ul className="mt-2">
                  {kolom.links.map((link) => (
                    <li key={link.href}>
                      <FooterLink href={link.href} label={link.label} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {jaar} {BEDRIJFSNAAM}
          </p>
          <nav aria-label="Juridische informatie">
            <ul className="flex flex-col sm:flex-row sm:gap-6">
              <li>
                <FooterLink href="/privacy" label="Privacy" />
              </li>
              <li>
                <FooterLink href="/voorwaarden" label="Voorwaarden" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
