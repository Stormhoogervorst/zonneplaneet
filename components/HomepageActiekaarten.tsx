import {
  HuisbatterijIcoon,
  KeuzeKaarten,
  LaadpaalIcoon,
  ZonnepaneelIcoon,
  type KeuzeKaart,
} from "@/components/KeuzeKaarten";

const actiekaarten: KeuzeKaart[] = [
  {
    id: "actie-clubactie",
    titel: "Clubactie",
    beschrijving:
      "Koop via je sportvereniging met ledenkorting. Je club verdient aan elke installatie.",
    href: "/clubactie",
    Icoon: ZonnepaneelIcoon,
  },
  {
    id: "actie-cashback",
    titel: "Cashback",
    beschrijving: "TODO: één zin over de cashback-actie.",
    href: "/cashback",
    Icoon: HuisbatterijIcoon,
  },
  {
    id: "actie-winactie",
    titel: "Winactie",
    beschrijving: "TODO: één zin over de winactie.",
    href: "/winactie",
    Icoon: LaadpaalIcoon,
  },
];

export function HomepageActiekaarten() {
  return (
    <section
      id="acties"
      aria-labelledby="acties-titel"
      className="scroll-mt-8 bg-vlak py-24"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2 id="acties-titel" className="sr-only">
          Acties
        </h2>
        <KeuzeKaarten kaarten={actiekaarten} />
      </div>
    </section>
  );
}
