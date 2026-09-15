import Image from "next/image";
import { Tag } from "@/components/ui";

type PaginaHeroProps = {
  alinea: string;
  eyebrow: string;
  foto?: { alt: string; src: string };
  headingId: string;
  titel: string;
};

/**
 * Het lichte kopblok, optioneel met een volle-breedtefoto eronder. `/partner`
 * en `/leden` gebruiken dit blok.
 *
 * Onder md: kop, tag, alinea. Vanaf md: tag en alinea links, kop rechts.
 */
export function PaginaHero({
  alinea,
  eyebrow,
  foto,
  headingId,
  titel,
}: PaginaHeroProps) {
  return (
    <section aria-labelledby={headingId}>
      {/* Het vlak loopt onder de doorzichtige bovenbalk door, dus de
          balkhoogte komt bovenop de visuele pt-32. */}
      <div className="-mt-[var(--hoogte-headerbalk)] bg-salderingsvlak pt-[calc(var(--hoogte-headerbalk)+8rem)] pb-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-8 md:flex-row md:items-start md:justify-between md:gap-16 md:px-16">
          <div className="order-2 min-w-0 md:order-1 md:w-[36%] md:shrink-0">
            <Tag className="font-mono">{eyebrow}</Tag>
            <p className="mt-10 text-[1.0625rem] leading-[1.6] text-body-donker">
              {alinea}
            </p>
          </div>

          <h1
            id={headingId}
            className="order-1 min-w-0 text-[clamp(2rem,5vw,4.25rem)] leading-[1.1] font-normal tracking-[-0.02em] text-navy md:order-2 md:w-[52%] md:text-right"
          >
            {titel}
          </h1>
        </div>
      </div>

      {foto ? (
        <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
    </section>
  );
}
