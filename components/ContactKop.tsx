import { Tag } from "@/components/ui";

type ContactKopProps = {
  alinea: string;
  eyebrow?: string;
  headingId: string;
  titel: string;
  /** Extra regel direct onder de h1, bijvoorbeeld een slogan. */
  slogan?: string;
  /** Standaard de grote displaykop; `l` is een trede kleiner, voor langere titels. */
  titelMaat?: "xl" | "l";
};

const titelMaatClasses = {
  xl: "text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-[-0.02em]",
  l: "text-display-l",
} as const;

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
  slogan,
  titelMaat = "xl",
}: ContactKopProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="-mt-[var(--hoogte-headerbalk)] bg-salderingsvlak pt-[calc(var(--hoogte-headerbalk)+10rem)] pb-20"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-8 md:grid-cols-[45%_42%] md:justify-between md:gap-x-16 md:px-16">
        {eyebrow ? (
          <Tag className="font-mono md:col-start-2 md:row-start-1">
            {eyebrow}
          </Tag>
        ) : null}

        <div
          className={`mt-8 min-w-0 md:col-start-1 md:row-start-1 md:mt-0 md:self-end ${eyebrow ? "md:row-span-2" : ""}`}
        >
          <h1
            id={headingId}
            className={`font-normal text-navy ${titelMaatClasses[titelMaat]}`}
          >
            {titel}
          </h1>
          {slogan ? (
            <p className="mt-4 text-[1.5rem] leading-snug font-normal text-navy">
              {slogan}
            </p>
          ) : null}
        </div>

        <p
          className={`mt-8 min-w-0 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-body-donker md:col-start-2 ${eyebrow ? "md:row-start-2" : "md:row-start-1 md:self-end"}`}
        >
          {alinea}
        </p>
      </div>
    </section>
  );
}
