import { Tag } from "@/components/ui";

type ContactKopProps = {
  alinea: string;
  eyebrow: string;
  headingId: string;
  titel: string;
};

/**
 * Compact kopblok: de kop links, de tag en de toelichting rechts. `/contact`
 * en `/referral` gebruiken dit patroon.
 *
 * De bovenbalk is doorzichtig en telt mee in de flow. Dit vlak trekt zich er
 * met een negatieve marge onder, zodat de balk dezelfde kleur krijgt als de
 * sectie; de balkhoogte komt daarom bovenop de padding.
 *
 * Een grid in plaats van een flexrij, net als in `PartnerHero`: op mobiel
 * horen tag, kop en tekst in die volgorde onder elkaar te staan, en met twee
 * flexkolommen zou de tag boven de kop niet los van de tekst te plaatsen zijn.
 */
export function ContactKop({
  alinea,
  eyebrow,
  headingId,
  titel,
}: ContactKopProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="-mt-[var(--hoogte-headerbalk)] bg-salderingsvlak pt-[calc(var(--hoogte-headerbalk)+10rem)] pb-20"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-8 md:grid-cols-[45%_42%] md:justify-between md:gap-x-16 md:px-16">
        <Tag className="font-mono md:col-start-2 md:row-start-1">{eyebrow}</Tag>

        <h1
          id={headingId}
          className="mt-8 min-w-0 text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-normal tracking-[-0.02em] text-navy md:col-start-1 md:row-span-2 md:row-start-1 md:mt-0 md:self-end"
        >
          {titel}
        </h1>

        <p className="mt-8 min-w-0 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-body-donker md:col-start-2 md:row-start-2">
          {alinea}
        </p>
      </div>
    </section>
  );
}
