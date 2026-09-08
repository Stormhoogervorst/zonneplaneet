import {
  GraphicAanspreekpunt,
  GraphicGevolgd,
  GraphicKlaargezet,
} from "@/components/WaardeGraphics";

const kaarten = [
  {
    titel: "Alles staat klaar",
    graphic: GraphicKlaargezet,
    beschrijving:
      "De club krijgt een eigen pagina, een poster met QR-code en een kant-en-klare nieuwsbrieftekst. Het bestuur hoeft niets te schrijven of te ontwerpen.",
  },
  {
    titel: "Elke aanmelding gevolgd",
    graphic: GraphicGevolgd,
    beschrijving:
      "We houden bij wat er met elke aanmelding gebeurt, van eerste contact tot installatie. Elke maand krijgt het bestuur daar een overzicht van.",
  },
  {
    titel: "De club blijft erbuiten",
    graphic: GraphicAanspreekpunt,
    beschrijving:
      "Leden melden zich zelf aan, dus de club deelt geen ledengegevens en voert geen verkoopgesprekken. Wij zijn het enige aanspreekpunt.",
  },
];

/**
 * De kaarten staan in dezelfde container, met dezelfde naad en in hetzelfde
 * grijs als de keuzeblokken op de homepage, zodat het iets lichtere sectievlak
 * ertussendoor en eromheen blijft schijnen. Vanaf md staat de tekst onderin en
 * vult de graphic
 * de ruimte daarboven, gecentreerd in die ruimte en niet in de hele kaart. Op
 * mobiel volgen graphic, titel en tekst elkaar gewoon op.
 */
export function PartnerWatWijDoen() {
  return (
    <section
      aria-labelledby="wat-wij-doen"
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="mb-24 md:flex md:items-start md:justify-between md:gap-16">
          <div className="min-w-0 md:w-[45%]">
            <h2
              id="wat-wij-doen"
              className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
            >
              Wat wij doen
            </h2>
          </div>
          <div className="min-w-0 md:w-[38%]">
            <p className="text-[1.0625rem] leading-[1.6] text-body-donker">
              De club deelt de actie en Zonneplaneet installeert. Alles
              daartussenin regelen wij, zodat het bestuur er geen werk aan
              heeft.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-[2px]">
          {kaarten.map(({ titel, graphic: Graphic, beschrijving }) => (
            <div
              key={titel}
              className="bg-keuzekaart px-10 py-12 md:flex md:aspect-square md:min-h-[420px] md:flex-col md:py-0"
            >
              <div className="md:flex md:flex-1 md:items-center md:justify-center">
                <Graphic className="size-24 md:size-32" />
              </div>

              <div className="mt-8 md:mt-0 md:pb-10">
                <h3 className="text-[1.5rem] font-normal text-navy">{titel}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.6] text-body-donker">
                  {beschrijving}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
