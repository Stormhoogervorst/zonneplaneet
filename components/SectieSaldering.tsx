import { Knop, Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

/*
 * Deze sectie deelt alleen de scherpe, isometrische vormentaal met de
 * keuzeblokken. Neem dit patroon niet over in andere secties.
 */

const svgProps = {
  "aria-hidden": true,
  viewBox: "0 0 72 72",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.25",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: rijenlijstIcoonClasses,
} as const;

function SlimmeMeterIcoon() {
  return (
    <svg {...svgProps}>
      <path d="M36 9 57 20.5 36 32 15 20.5Z" />
      <path d="M15 20.5v31L36 63l21-11.5v-31M36 32v31" />
      <path d="m20 27 11 6v13l-11-6Z" />
      <path d="m22.5 31.5 6 3.25M22.5 35.5l6 3.25" />
      <path d="m41 37 11-6v16l-11 6Z" />
      <path d="m44 41.5 5-2.75M46.5 36.75v10" />
    </svg>
  );
}

function MuntstukIcoon() {
  return (
    <svg {...svgProps}>
      <path d="M12 32.5c0-6.5 10.7-11.75 24-11.75s24 5.25 24 11.75-10.7 11.75-24 11.75-24-5.25-24-11.75Z" />
      <path d="M12 32.5v8.5c0 6.5 10.7 11.75 24 11.75S60 47.5 60 41v-8.5" />
      <path d="M16.5 42.5v7.75M23 46v8M30 48v8M55.5 42.5v7.75M49 46v8M42 48v8" />
      <path d="M40.5 27.5c-1.15-1.1-2.75-1.7-4.5-1.7-3.3 0-6 2.45-6 5.45s2.7 5.45 6 5.45c1.75 0 3.35-.6 4.5-1.7M27.5 30h9M27.5 33h8" />
    </svg>
  );
}

function HuisMetZonIcoon() {
  return (
    <svg {...svgProps}>
      <path d="M11 31 34 18l23 13-23 13Z" />
      <path d="M16 34v16l18 10 18-10V34M34 44v16" />
      <path d="m21 31 13-7.25L47 31l-13 7.25Z" />
      <path d="M20 53 34 45l14 8" />
      <circle cx="55" cy="16" r="5" />
      <path d="M55 7V3M55 29v-4M64 16h4M42 16h4M61.5 9.5l3-3M45.5 25.5l3-3M61.5 22.5l3 3M45.5 6.5l3 3" />
    </svg>
  );
}

function ThuisbatterijIcoon() {
  return (
    <svg {...svgProps}>
      <path d="M36 12 58 25 36 38 14 25Z" />
      <path d="M14 25v24M58 25v24M36 38v24" />
      <path d="M14 49 36 62 58 49" />
      <path d="M14 33 36 46M14 40 36 53" />
      <path d="M50 38 44 47h4l-4 8 6-9h-4Z" />
    </svg>
  );
}

const salderingsRijen = [
  {
    titel: "Salderen stopt",
    icoon: <SlimmeMeterIcoon />,
    beschrijving:
      "Tot en met 31 december 2026 streep je teruggeleverde stroom volledig weg tegen je verbruik. Vanaf 1 januari 2027 kan dat niet meer.",
  },
  {
    titel: "Terugleververgoeding",
    icoon: <MuntstukIcoon />,
    beschrijving:
      "Je krijgt vanaf 2027 een vergoeding voor de stroom die je teruglevert. Tot 2030 is die minimaal de helft van het kale leveringstarief, zonder belastingen.",
  },
  {
    titel: "Zelf verbruiken",
    icoon: <HuisMetZonIcoon />,
    beschrijving:
      "Stroom die je direct zelf gebruikt is meer waard dan stroom die je teruglevert, omdat je daarover geen energiebelasting betaalt. Hoe meer je zelf verbruikt op het moment dat je opwekt, hoe gunstiger het uitpakt.",
  },
  {
    titel: "Thuisbatterij",
    icoon: <ThuisbatterijIcoon />,
    beschrijving:
      "Een thuisbatterij slaat stroom op die je overdag opwekt, zodat je hem 's avonds zelf gebruikt in plaats van teruglevert. Of dat in jouw situatie uit kan, hangt af van je verbruik, je dak en je energiecontract.",
  },
];

export function SectieSaldering() {
  return (
    <Rijenlijst
      eyebrow="SALDERINGSREGELING"
      id="salderen-deadline"
      kop="Waarom nu: op 1 januari 2027 stopt de salderingsregeling. Tot en met 31 december 2026 kun je nog volledig salderen."
      rijen={salderingsRijen}
    >
      <Knop
        className="flex w-full md:inline-flex md:w-auto"
        href="/kennisbank"
        metPijl
        variant="groot"
      >
        Kennisbank
      </Knop>
    </Rijenlijst>
  );
}
