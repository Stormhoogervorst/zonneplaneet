import {
  IconEnvelop,
  IconMunten,
  IconPosterQr,
  IconSlot,
} from "@/components/RijIconen";
import { Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

/* IconEnvelop, IconPosterQr en IconSlot horen hier inhoudelijk niet bij.
   Er is geen icoon voor vrijblijvend, één installateur of de clubkas.
   TODO: voeg passende iconen toe en vervang deze stand-ins. */
const rijen = [
  {
    titel: "Ledenkorting",
    icoon: <IconMunten className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Je krijgt korting op zonnepanelen, thuisbatterijen en laadpalen. Het exacte bedrag staat op de pagina van je eigen club.",
  },
  {
    titel: "Vrijblijvend",
    icoon: <IconEnvelop className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Je meldt je aan en krijgt een offerte. Pas als je tekent gebeurt er iets.",
  },
  {
    titel: "Eén installateur",
    icoon: <IconPosterQr className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Wij leveren en installeren. Geen vergelijkingssite, geen tussenpersonen die je bellen.",
  },
  {
    titel: "Je club verdient mee",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Bij elke installatie gaat er een vast bedrag naar de kas van je vereniging, zonder dat de club iets betaalt.",
  },
];

export function LedenWatJeKrijgt() {
  return (
    <Rijenlijst
      eyebrow="WAT JE KRIJGT"
      id="wat-je-krijgt"
      kop="Ledenkorting, één aanspreekpunt en een vereniging die eraan verdient."
      rijen={rijen}
    />
  );
}
