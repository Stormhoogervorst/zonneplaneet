import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Knop } from "@/components/ui";
import logoNavy from "@/public/logo-zonneplaneet-navy.png";
import logoWit from "@/public/logo-zonneplaneet-wit.png";

const navigatie = [
  { href: "/", label: "Home" },
  { href: "/kennisbank", label: "Kennisbank" },
  { href: "/partner", label: "Voor clubs" },
];

const contact = { href: "/partner#club-aanmelden", label: "Contact" };

/** Het vlak waarop de doorzichtige balk ligt, want dat bepaalt de kleuren. */
type Ondergrond = "licht" | "donker";

const tekstClasses: Record<Ondergrond, string> = {
  licht: "text-navy",
  donker: "text-white",
};

/* Het logo bestaat in één kleur; daarom een navy en een wit bestand. */
const logoBestand: Record<Ondergrond, StaticImageData> = {
  licht: logoNavy,
  donker: logoWit,
};

const contactKnopVariant = {
  licht: "donker",
  donker: "wit",
} as const;

/**
 * De bovenbalk: logo, gecentreerde navigatie en rechts de contactknop. Onder
 * `lg` is er geen ruimte voor de navigatie; daar staat het menu in een
 * uitklapper en zit contact in dat menu.
 */
export function HeaderBalk({ ondergrond }: { ondergrond: Ondergrond }) {
  return (
    <div
      className={`relative flex h-[var(--hoogte-headerbalk)] items-center px-8 md:px-16 ${tekstClasses[ondergrond]}`}
    >
      <Link
        href="/"
        aria-label="Zonneplaneet, naar de homepage"
        className="flex shrink-0 items-center"
      >
        <Image
          src={logoBestand[ondergrond]}
          alt=""
          loading="eager"
          className="h-8 w-auto"
        />
      </Link>

      <nav
        aria-label="Hoofdnavigatie"
        className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ul className="flex gap-12 text-[1.0625rem]">
          {navigatie.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="opacity-90 transition-opacity duration-200 hover:opacity-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* De zichtbaarheid zit op de wrapper, want `Knop` brengt zijn eigen
          display-klasse mee */}
      <span className="ml-auto hidden shrink-0 lg:block">
        <Knop href={contact.href} variant={contactKnopVariant[ondergrond]}>
          {contact.label}
        </Knop>
      </span>

      <details className="relative ml-auto shrink-0 lg:hidden">
        <summary
          aria-label="Open het menu"
          className="flex cursor-pointer list-none flex-col gap-2 py-2 [&::-webkit-details-marker]:hidden"
        >
          <span aria-hidden="true" className="block h-0.5 w-10 bg-current" />
          <span aria-hidden="true" className="block h-0.5 w-10 bg-current" />
          <span aria-hidden="true" className="block h-0.5 w-10 bg-current" />
        </summary>
        <nav
          aria-label="Menu"
          className="absolute top-[calc(100%+1.25rem)] right-0 min-w-56 rounded-2xl border border-[rgba(255,255,255,0.2)] bg-navy p-2 text-white"
        >
          <ul>
            {[...navigatie, contact].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-body-l"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
}
