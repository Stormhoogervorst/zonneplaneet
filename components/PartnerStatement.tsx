import { Knop } from "@/components/ui";

/**
 * Zelfde patroon als `HomepageIntro`: één grote alinea en een pil met een
 * losse pijlcirkel op het lichte vlak.
 */
export function PartnerStatement() {
  return (
    <section
      aria-labelledby="partner-statement-titel"
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id="partner-statement-titel"
          className="max-w-[62ch] [overflow-wrap:normal] text-[clamp(1.5rem,3vw,2rem)] leading-[1.35] font-normal hyphens-none text-navy [word-break:normal]"
        >
          Je leden kopen vroeg of laat toch zonnepanelen, een thuisbatterij of
          een laadpaal. Gebeurt dat via de actie van je eigen vereniging, dan
          gaat er bij elke installatie een vast bedrag naar de clubkas. Dezelfde
          aankoop, alleen levert hij nu ook de club iets op.
        </h2>

        <Knop
          href="#club-aanmelden"
          variant="extern"
          metPijl
          className="mt-8"
        >
          Meld je club aan
        </Knop>
      </div>
    </section>
  );
}
