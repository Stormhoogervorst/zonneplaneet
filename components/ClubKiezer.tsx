import Image from "next/image";
import { Knop } from "@/components/ui";

/**
 * Zelfde split-layout als het contactformulier: foto links, paneel rechts.
 * De clubkeuze staat op `/clubs`. Deze sectie stuurt daarheen.
 */
export function ClubKiezer() {
  return (
    <section
      id="clubs"
      aria-labelledby="clubs-titel"
      className="scroll-mt-[calc(var(--hoogte-headerbalk)+2rem)] py-0"
    >
      <div className="md:flex md:min-h-[760px]">
        <div className="relative aspect-[4/3] min-w-0 md:aspect-auto md:w-1/2">
          <Image
            src="/windmolens-schapen.webp"
            alt="Rij windmolens langs een dijk met schapen in het gras ervoor"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center bg-navy px-8 py-16 md:w-1/2 md:px-16 md:py-24">
          <h2 id="clubs-titel" className="text-display-m text-tag">
            Zoek je vereniging
          </h2>

          <p className="mt-6 text-body-l text-white">
            Kies je club en meld je in één keer aan.
          </p>

          <Knop
            href="/clubs"
            variant="groot"
            metPijl
            className="mt-10 w-full md:w-auto"
          >
            Zoek je club
          </Knop>

          <Knop
            href="/partner"
            variant="stil"
            className="mt-8 h-auto min-h-0 justify-start px-0 text-left whitespace-normal text-white!"
          >
            Staat jouw vereniging er niet bij? Tip je bestuur
          </Knop>
        </div>
      </div>
    </section>
  );
}
