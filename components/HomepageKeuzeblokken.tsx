import {
  HuisbatterijIcoon,
  KeuzeKaarten,
  LaadpaalIcoon,
  ZonnepaneelIcoon,
  type KeuzeKaart,
} from "@/components/KeuzeKaarten";

const keuzeblokken: KeuzeKaart[] = [
  {
    id: "keuze-lid",
    titel: "Ik ben lid van een vereniging",
    beschrijving:
      "Koop zonnepanelen, een thuisbatterij of een laadpaal via je club. Meld je aan en geef aan bij welke vereniging je hoort.",
    href: "/leden",
    Icoon: ZonnepaneelIcoon,
  },
  /* TODO: Zet `href: "/kennisbank"` terug als de kennisbank weer live gaat. */
  {
    id: "keuze-opbrengst",
    titel: "Ik wil weten wat het mij oplevert",
    beschrijving: "Lees hoe zonnepanelen, thuisbatterijen en laadpalen werken.",
    Icoon: HuisbatterijIcoon,
  },
  {
    id: "keuze-bestuur",
    titel: "Ik zit in een clubbestuur",
    beschrijving:
      "Lees wat de actie kan opleveren en wat we van de club vragen.",
    href: "/partner",
    Icoon: LaadpaalIcoon,
  },
];

export function HomepageKeuzeblokken() {
  return (
    <section aria-labelledby="kies-onderdeel" className="bg-vlak py-24">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id="kies-onderdeel"
          className="mb-14 text-[1.75rem] leading-tight font-normal text-navy"
        >
          Kies het onderdeel dat bij je past
        </h2>

        <KeuzeKaarten kaarten={keuzeblokken} />
      </div>
    </section>
  );
}
