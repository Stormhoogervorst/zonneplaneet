import type { ComponentType } from "react";
import {
  IconKlok,
  IconStaafgrafiek,
  IconTelefoonLaden,
} from "@/components/RijIconen";
import { IconTegel, Kaart, Tag } from "@/components/ui";

const kaarten: {
  Icoon: ComponentType<{ className?: string }>;
  titel: string;
  beschrijving: string;
}[] = [
  {
    Icoon: IconTelefoonLaden,
    titel: "Status van je laadsessie",
    beschrijving:
      "Zie in één oogopslag of je auto laadt, hoe ver hij is en wanneer hij klaar is.",
  },
  {
    Icoon: IconKlok,
    titel: "Plan een laadmoment",
    beschrijving:
      "Geef aan wanneer je auto beschikbaar moet zijn. De app kiest dan een passend moment om te laden.",
  },
  {
    Icoon: IconStaafgrafiek,
    titel: "Inzicht in je verbruik",
    beschrijving:
      "Volg hoeveel energie je auto gebruikt per sessie en over langere periodes.",
  },
];

export function LaadpaalApp() {
  return (
    <section aria-labelledby="laadpaal-app" className="bg-salderingsvlak py-24">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <div className="mb-14">
          <Tag>APP</Tag>
          <h2
            id="laadpaal-app"
            className="mt-6 max-w-[24ch] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-normal text-navy"
          >
            Via de app beheer je je laadpaal vanaf je telefoon.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-body-donker">
            Kies vooraf wanneer je wilt laden of start een sessie direct wanneer
            dat nodig is. Zo pas je het laden aan op je dagelijkse planning.
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {kaarten.map(({ Icoon, titel, beschrijving }) => (
            <li key={titel} className="flex">
              <Kaart className="flex h-full w-full flex-col bg-keuzekaart p-8">
                <IconTegel className="size-16 [&>svg]:size-7">
                  <Icoon />
                </IconTegel>
                <h3 className="mt-6 text-[1.25rem] font-semibold text-navy">
                  {titel}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-body-donker">
                  {beschrijving}
                </p>
              </Kaart>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[0.9375rem] leading-[1.6] text-body-donker">
          Meldingen houden je op de hoogte van actieve en afgeronde laadsessies.
          En dankzij automatische updates beschik je altijd over de nieuwste
          functies.
        </p>
      </div>
    </section>
  );
}
