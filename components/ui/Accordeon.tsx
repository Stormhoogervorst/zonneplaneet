import type { ReactNode } from "react";

export type AccordeonItem = {
  antwoord: ReactNode;
  standaardOpen?: boolean;
  vraag: string;
};

/**
 * `licht` hoort op een witte pagina: dicht wit met een randje, open navy.
 * `vlak` hoort op een grijs sectievlak en werkt met vulling in plaats van
 * kleur: dicht alleen een omlijning op de sectiekleur, open een wit vlak dat
 * uit het grijs komt. Oranje zit daar alleen in het gevulde cirkeltje, nooit
 * in tekst of in de icoonlijn.
 * `lijnen` is de FAQ-rij: geen kaarten, alleen een haarlijn onder elk item.
 * Dicht een grijs pluscirkeltje, open een oranje cirkel met navy min.
 */
type AccordeonVariant = "licht" | "vlak" | "lijnen";

type AccordeonProps = {
  className?: string;
  items: AccordeonItem[];
  variant?: AccordeonVariant;
};

const lijstClasses: Record<AccordeonVariant, string> = {
  licht: "flex flex-col gap-3",
  vlak: "flex flex-col gap-3",
  lijnen: "accordeon-lijnen",
};

const detailsClasses: Record<AccordeonVariant, string> = {
  licht:
    "rounded-3xl border border-slate-200 bg-white px-6 py-4 text-navy transition-[background-color] duration-200 open:border-navy open:bg-navy open:text-white",
  vlak: "rounded-none border border-navy/15 bg-transparent px-7 py-6 transition-[background-color] duration-200 open:border-transparent open:bg-white",
  lijnen: "border-b border-stippellijn first:border-t",
};

const summaryClasses: Record<AccordeonVariant, string> = {
  licht: "min-h-12 gap-4",
  vlak: "gap-6",
  lijnen: "gap-8 py-7",
};

const vraagClasses: Record<AccordeonVariant, string> = {
  licht: "text-body font-semibold",
  vlak: "text-[1.125rem] font-medium text-navy",
  lijnen:
    "min-w-0 text-left text-[1.25rem] font-normal text-navy group-open:font-medium",
};

const cirkelClasses: Record<AccordeonVariant, string> = {
  licht: "size-8 border border-current",
  vlak: "size-9 border border-navy/25 text-navy transition-[background-color] duration-200 group-open:border-transparent group-open:bg-oranje",
  lijnen:
    "size-9 bg-navy/7 text-body-donker transition-[background-color] duration-200 group-open:bg-oranje group-open:text-navy",
};

const antwoordClasses: Record<AccordeonVariant, string> = {
  licht: "mt-4 text-body",
  vlak: "mt-4 max-w-[70ch] text-[0.9375rem] leading-[1.7] text-body-donker",
  lijnen: "max-w-[70ch] pb-7 text-[1rem] leading-[1.7] text-body-donker",
};

export function Accordeon({
  className = "",
  items,
  variant = "licht",
}: AccordeonProps) {
  return (
    <div className={`${lijstClasses[variant]} ${className}`}>
      {items.map((item) => (
        <details
          key={item.vraag}
          open={item.standaardOpen}
          className={`group ${detailsClasses[variant]}`}
        >
          <summary
            className={`flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden ${summaryClasses[variant]}`}
          >
            <h3 className={vraagClasses[variant]}>{item.vraag}</h3>

            {/* De verticale streep verdwijnt bij open, zodat de plus een min wordt. */}
            <span
              aria-hidden="true"
              className={`grid shrink-0 place-items-center rounded-full ${cirkelClasses[variant]}`}
            >
              <svg
                viewBox="0 0 14 14"
                className="size-[14px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M1 7h12" />
                <path d="M7 1v12" className="group-open:hidden" />
              </svg>
            </span>
          </summary>

          <div className={antwoordClasses[variant]}>{item.antwoord}</div>
        </details>
      ))}
    </div>
  );
}
