import { Knop } from "@/components/ui";

export function HomepageIntro() {
  return (
    <section
      aria-labelledby="homepage-intro-titel"
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id="homepage-intro-titel"
          className="max-w-[62ch] [overflow-wrap:normal] text-[clamp(1.5rem,3vw,2rem)] leading-[1.35] font-normal hyphens-none text-navy [word-break:normal]"
        >
          Jij koopt je zonnepanelen, thuisbatterij of laadpaal. En jouw
          installatie levert de kas van je club geld op, zonder dat de club zelf
          iets betaalt. Zo profiteren jij en je vereniging van dezelfde aankoop.
        </h2>

        <Knop href="/partner" variant="extern" metPijl className="mt-8">
          Zo werkt het voor clubs
        </Knop>
      </div>
    </section>
  );
}
