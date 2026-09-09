import { Tag } from "@/components/ui";

export type TijdlijnStap = {
  beschrijving: string;
  nummer: string;
  titel: string;
};

type TijdlijnProps = {
  alinea: string;
  eyebrow: string;
  headingId: string;
  stappen: TijdlijnStap[];
  titel: string;
};

/**
 * De tijdlijn loopt vanaf md horizontaal: elke stap heeft een navy cirkel met
 * daarnaast een stippellijn die tot de rand van de kolom doorloopt, ook bij de
 * laatste stap. Onder md kantelt de lijn mee en verbindt hij de cirkels
 * verticaal, behalve na de laatste stap.
 */
export function Tijdlijn({
  alinea,
  eyebrow,
  headingId,
  stappen,
  titel,
}: TijdlijnProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="mb-24">
          <Tag className="font-mono">{eyebrow}</Tag>
          <h2
            id={headingId}
            className="mt-8 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
          >
            {titel}
          </h2>
          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-body-donker">
            {alinea}
          </p>
        </div>

        <ol className="grid list-none grid-cols-1 gap-12 md:grid-cols-4 md:items-start md:gap-10">
          {stappen.map(({ nummer, titel: stapTitel, beschrijving }, index) => (
            <li key={nummer} className="relative">
              <div className="mb-10 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-[52px] shrink-0 place-items-center rounded-full bg-navy font-mono text-[0.9375rem] text-tag"
                >
                  {nummer}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 border-t border-dashed border-stippellijn md:block"
                />
              </div>

              {index < stappen.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-[52px] -bottom-12 left-[26px] border-l border-dashed border-stippellijn md:hidden"
                />
              ) : null}

              <div className="pl-[calc(52px+1rem)] md:pl-0">
                <h3 className="text-[1.75rem] font-normal text-navy">
                  {stapTitel}
                </h3>
                <p className="mt-5 text-[0.9375rem] leading-[1.6] text-body-donker">
                  {beschrijving}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
