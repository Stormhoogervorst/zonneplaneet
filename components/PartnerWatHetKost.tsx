import {
  IconEnvelop,
  IconMunten,
  IconPosterQr,
  IconSlot,
} from "@/components/RijIconen";
import { Knop, Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

const rijen = [
  {
    titel: "Eén nieuwsbrief",
    icoon: <IconEnvelop className={rijenlijstIcoonClasses} />,
    beschrijving:
      "De club deelt de actie één keer met haar leden, met de link naar de eigen clubpagina. Wij leveren de tekst kant en klaar aan.",
  },
  {
    titel: "Een poster",
    icoon: <IconPosterQr className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Wij maken een poster met de QR-code van de club. Ophangen in de kantine is genoeg; drukken doen wij.",
  },
  {
    titel: "Geen ledengegevens",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "De club deelt geen adressen of e-mailadressen met ons. Leden melden zich zelf aan en de club ziet hun gegevens niet.",
  },
  {
    titel: "Geen kosten, geen risico",
    icoon: <IconMunten className={rijenlijstIcoonClasses} />,
    beschrijving:
      "De club betaalt niets, vooraf noch achteraf. Komt er geen installatie, dan kost het niemand iets.",
    actie: (
      <Knop href="#club-aanmelden" variant="extern" metPijl>
        Meld je club aan
      </Knop>
    ),
  },
];

export function PartnerWatHetKost() {
  return (
    <Rijenlijst
      eyebrow="WAT HET DE CLUB KOST"
      id="wat-het-de-club-kost"
      kop="Eén vermelding in de nieuwsbrief en een poster in de kantine. Meer vragen we niet, en verder kost het de club niets."
      rijen={rijen}
    />
  );
}
