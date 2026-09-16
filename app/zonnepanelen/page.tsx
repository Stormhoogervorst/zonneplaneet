import type { Metadata } from "next";
import { FaqSectie } from "@/components/FaqSectie";
import { Hero } from "@/components/Hero";
import { PaginaStatement } from "@/components/PaginaStatement";
import { IconMunten, IconShowroom, IconSlot } from "@/components/RijIconen";
import { SectieAfspraak } from "@/components/SectieAfspraak";
import { Tijdlijn } from "@/components/Tijdlijn";
import { Rijenlijst, rijenlijstIcoonClasses, StatKaart } from "@/components/ui";

export const metadata: Metadata = {
  title: "Zonnepanelen",
  description:
    "Wek je eigen groene energie op met zonnepanelen. Van advies tot installatie, afgestemd op je woning en energiegebruik.",
};

const rijen = [
  {
    titel: "Direct besparen",
    icoon: <IconMunten className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Je wekt zelf groene stroom op en verlaagt direct je energiekosten. De stroom die je zelf verbruikt hoef je niet in te kopen bij je energieleverancier.",
  },
  {
    titel: "Lagere drempel om te starten",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "De prijzen van zonnepanelen zijn de afgelopen jaren gedaald en de installatie is eenvoudiger dan ooit. Dat maakt instappen nu extra aantrekkelijk.",
  },
  {
    titel: "Toekomstbestendig",
    icoon: <IconShowroom className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Zonnepanelen vormen een slimme basis voor toekomstige oplossingen zoals een thuisbatterij, laadpaal of warmtepomp.",
  },
];

const stappen = [
  {
    nummer: "01",
    titel: "Voorbereiding",
    beschrijving:
      "Onze werkvoorbereiders nemen contact met je op en zorgen dat alle details voor de installatie goed zijn afgestemd.",
  },
  {
    nummer: "02",
    titel: "Installatie",
    beschrijving:
      "Onze gecertificeerde monteurs plaatsen en sluiten alles aan volgens de hoogste veiligheidsnormen.",
  },
  {
    nummer: "03",
    titel: "Uitleg",
    beschrijving:
      "Na de installatie lopen onze monteurs samen met jou het systeem door. Je krijgt uitleg over de werking én de app.",
  },
  {
    nummer: "04",
    titel: "Service",
    beschrijving:
      "Ook na oplevering kun je rekenen op ons servicenetwerk. Voor vragen of ondersteuning zijn we bereikbaar en komen we indien nodig op locatie.",
  },
];

const vragen = [
  {
    vraag: "Blijven zonnepanelen rendabel zonder salderen?",
    antwoord:
      "Ja. De stroom die je zelf verbruikt hoef je niet in te kopen, en voor teruggeleverde stroom ontvang je een vergoeding. Wat dat in jouw situatie oplevert, hangt af van je verbruik, je dak en je energiecontract.",
    standaardOpen: true,
    /* TODO: noem het teruglevertarief alleen met een vastgesteld bedrag;
       6 à 7 cent per kWh niet overnemen, dat is een markttarief dat verandert. */
  },
  {
    vraag: "Wat verandert er op 1 januari 2027?",
    antwoord:
      "Tot en met 31 december 2026 kun je teruggeleverde stroom nog volledig wegstrepen tegen je verbruik. Vanaf 1 januari 2027 kan dat niet meer. Je krijgt dan een vergoeding van je energieleverancier voor de stroom die je teruglevert. Tot 2030 moet die vergoeding minimaal de helft zijn van het kale leveringstarief, zonder belastingen.",
  },
  {
    vraag: "Hoeveel zonnepanelen heb ik nodig?",
    antwoord:
      "Dat hangt af van je jaarverbruik, de ruimte op je dak en de ligging ervan. Een dak op het zuiden levert per paneel meer op dan een dak op het oosten of westen, maar een oost-westopstelling verdeelt de opbrengst gelijkmatiger over de dag. In het adviesgesprek rekenen we dit voor jouw situatie uit.",
  },
  {
    vraag: "Mijn dak ligt deels in de schaduw. Heeft dat zin?",
    antwoord:
      "Ja. Met micro-omvormers werkt ieder paneel afzonderlijk. Valt er schaduw op één paneel, dan heeft dat nauwelijks invloed op de opbrengst van de rest van het systeem. Bij een systeem met één centrale omvormer is dat anders.",
  },
  {
    vraag: "Wat is het verschil tussen glas-glas en gewone panelen?",
    antwoord:
      "Bij glas-glas panelen zit de cel tussen twee glasplaten in plaats van tussen glas en folie. Dat geeft een sterkere constructie en betrouwbaardere prestaties op lange termijn.",
  },
  {
    vraag: "Wat gebeurt er met mijn zonnepanelen bij stroomuitval?",
    antwoord:
      "Bij een stroomstoring schakelt de omvormer automatisch uit. Dat is een veiligheidseis: zo kan er geen stroom het net op gaan terwijl monteurs eraan werken. Je zonnepanelen leveren tijdens een storing dus geen stroom aan je woning, tenzij je een systeem hebt dat daar speciaal op is ingericht.",
  },
  {
    vraag: "Kan ik zonnepanelen financieren?",
    antwoord:
      "Ja. Via de Energiebespaarlening van het Nationaal Warmtefonds leen je tegen 0% rente bij een gezamenlijk verzamelinkomen tot €60.000. Daarboven gold in 2026 een rente tussen circa 3,7% en 4,3%. Wat het in jouw situatie kost, hangt af van je inkomen, het leenbedrag en de looptijd. Daarnaast bieden wij zelf financieringsmogelijkheden aan; vraag ernaar in het adviesgesprek.",
  },
  {
    vraag: "Heb ik een vergunning nodig?",
    antwoord:
      "In de meeste gevallen niet. Zonnepanelen op een schuin dak zijn doorgaans vergunningvrij als ze in hetzelfde vlak liggen als het dak. Bij een monument, in een beschermd stadsgezicht of bij een plat dak kunnen andere regels gelden. Twijfel je, informeer dan bij je gemeente.",
  },
  /* TODO: "Hoe lang duurt de installatie?" — tekst aanleveren. */
  /* TODO: "Welke garantie krijg ik?" — tekst aanleveren, inclusief de exacte
     garantietermijnen op panelen, omvormers en installatie. */
];

export default function ZonnepanelenPage() {
  return (
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Duurzaam en zorgeloos besparen"
        subregel="Met zonnepanelen van Zonneplaneet wek je je eigen groene energie op en verlaag je direct je energiekosten. Je profiteert van de nieuwste technologie, professionele installatie en persoonlijke service."
        knoptekst="Gratis advies aanvragen"
        knoplink="/contact"
        foto="/zonnepanelen-woningen.jpg"
        alt="Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken"
      />

      <Rijenlijst
        eyebrow="ZONNEPANELEN"
        id="zonnepanelen-voordelen"
        kop="Ook met veranderende regels blijft zonne-energie voordelig."
        rijen={rijen}
        className="pt-20 pb-8 md:pt-28 md:pb-10"
      />

      <PaginaStatement
        headingId="zonnepanelen-techniek"
        eyebrow="TECHNIEK"
        className="pt-8 pb-20 md:pt-10 md:pb-28"
        tekst="Onze glas-glas zonnepanelen combineren een hoog vermogen met een sterke constructie. Met micro-omvormers werkt ieder paneel afzonderlijk, zodat verschillen in schaduw of ligging minder invloed hebben op de rest van het systeem."
      />

      <section
        aria-labelledby="zonnepanelen-besparing"
        className="bg-salderingsvlak py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <h2
            id="zonnepanelen-besparing"
            className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
          >
            Besparingsvoorbeeld
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatKaart
              getal="€380"
              label="PER JAAR MET ZONNEPANELEN EN DYNAMISCH CONTRACT"
            />
            <StatKaart
              getal="€540"
              label="PER JAAR MET ZONNEPANELEN EN VAST CONTRACT"
            />
            <StatKaart
              getal="€1.050"
              label="PER JAAR ZONDER ZONNEPANELEN"
            />
          </div>

          <p className="mt-6 text-[0.875rem] leading-[1.6] text-body-donker">
            Rekenvoorbeeld op basis van een verbruik van 3.500 kWh, een
            opbrengst van 3.486 kWh waarvan 40% direct in huis wordt gebruikt,
            en een stroomprijs van €0,30 per kWh bij een vast contract. Jouw
            situatie kan afwijken.
          </p>
        </div>
      </section>

      <Tijdlijn
        eyebrow="INSTALLATIE"
        headingId="zonnepanelen-installatie"
        titel="In vier stappen"
        alinea="Van de voorbereiding tot de service na oplevering."
        stappen={stappen}
      />

      <FaqSectie
        eyebrow="ZONNEPANELEN"
        headingId="zonnepanelen-faq"
        vragen={vragen}
      />

      <SectieAfspraak headingId="zonnepanelen-afspraak" />

      <PaginaStatement
        headingId="zonnepanelen-contact"
        eyebrow="ALLES VOOR JOUW ENERGIE THUIS"
        tekst="Slim laden, opslaan en besparen, gewoon bij jou thuis. Van zonnepanelen en thuisbatterij tot laadpaal: we zorgen voor een oplossing die past bij jouw woning en energiegebruik. Inclusief installatie en service."
        knopHref="/contact"
        knopLabel="Gratis advies aanvragen"
      />
    </main>
  );
}
