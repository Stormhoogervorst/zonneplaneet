import Link from "next/link";
import { BureaubladNavigatie } from "@/components/BureaubladNavigatie";
import { MobielMenu } from "@/components/MobielMenu";
import { Woordmerk } from "@/components/Woordmerk";
import { Knop } from "@/components/ui";
import { navigatie } from "@/lib/navigatie";

const contact = { href: "/contact", label: "Contact" };

/** Het vlak waarop de doorzichtige balk ligt, want dat bepaalt de kleuren. */
type Ondergrond = "licht" | "donker";

const tekstClasses: Record<Ondergrond, string> = {
  licht: "text-navy",
  donker: "text-white",
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
        aria-label="Zonneplaneet ACTIE, naar de homepage"
        className="flex shrink-0 items-center"
      >
        <Woordmerk ondergrond={ondergrond} klasseHoogte="h-8" loading="eager" />
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
