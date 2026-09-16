import Image, { type StaticImageData } from "next/image";
import logoNavy from "@/public/logo-zonneplaneet-navy.png";
import logoWit from "@/public/logo-zonneplaneet-wit.png";

/** Het vlak waarop het woordmerk ligt, want dat bepaalt de kleur van het beeld. */
type Ondergrond = "licht" | "donker";

const logoBestand: Record<Ondergrond, StaticImageData> = {
  licht: logoNavy,
  donker: logoWit,
};

const actieMaat = {
  "h-8": "text-[1.75rem]",
  "h-12": "text-[2.625rem]",
} as const;

type WoordmerkProps = {
  alt?: string;
  klasseHoogte: keyof typeof actieMaat;
  loading?: "eager" | "lazy";
  ondergrond: Ondergrond;
};

/**
 * Het woordmerk "zonneplaneet" plus "ACTIE" in oranje, dezelfde lettergrootte
 * en een kleine ruimte ertussen.
 */
export function Woordmerk({
  alt = "",
  klasseHoogte,
  loading,
  ondergrond,
}: WoordmerkProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Image
        src={logoBestand[ondergrond]}
        alt={alt}
        loading={loading}
        className={`${klasseHoogte} w-auto`}
      />
      <span
        className={`${actieMaat[klasseHoogte]} font-normal leading-none tracking-[-0.02em] text-oranje`}
      >
        ACTIE
      </span>
    </span>
  );
}
