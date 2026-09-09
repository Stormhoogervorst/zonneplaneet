import { IconEnvelop, IconPosterQr, IconSlot } from "@/components/RijIconen";
import { Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

/* Iconen zijn stand-ins tot de rijen inhoudelijk bekend zijn.
   TODO: vervang titels, teksten en iconen als de winactie vaststaat. */
const rijen = [
  {
    titel: "TODO",
    icoon: <IconEnvelop className={rijenlijstIcoonClasses} />,
    beschrijving: "TODO",
  },
  {
    titel: "TODO",
    icoon: <IconPosterQr className={rijenlijstIcoonClasses} />,
    beschrijving: "TODO",
  },
  {
    titel: "TODO",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving: "TODO",
  },
];

export function WinactieUitleg() {
  return (
    <Rijenlijst eyebrow="TODO" id="winactie-uitleg" kop="TODO" rijen={rijen} />
  );
}
