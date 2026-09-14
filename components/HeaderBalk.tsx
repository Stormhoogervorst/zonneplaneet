import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BureaubladNavigatie } from "@/components/BureaubladNavigatie";
import { MobielMenu } from "@/components/MobielMenu";
import { Knop } from "@/components/ui";
import { navigatie } from "@/lib/navigatie";
import logoNavy from "@/public/logo-zonneplaneet-navy.png";
import logoWit from "@/public/logo-zonneplaneet-wit.png";

const contact = { href: "/contact", label: "Contact" };

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
 * De bovenbalk: logo, gecentreerde navigatie uit `lib/navigatie` en rechts de
 * contactknop. Onder `lg` past die rij niet; daar staat alles in een
 * fullscreen hamburgermenu.
 */
export function HeaderBalk({ ondergrond }: { ondergrond: Ondergrond }) {
  return (
    <div
      className={`relative flex h-[var(--hoogte-headerbalk)] items-center gap-4 px-8 xl:px-16 ${tekstClasses[ondergrond]}`}
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

      <BureaubladNavigatie items={navigatie} />

      <span className="hidden shrink-0 lg:block">
        <Knop href={contact.href} variant={contactKnopVariant[ondergrond]}>
          {contact.label}
        </Knop>
      </span>

      <MobielMenu items={navigatie} contact={contact} />
    </div>
  );
}
