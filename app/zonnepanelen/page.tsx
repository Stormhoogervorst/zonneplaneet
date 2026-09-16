import type { Metadata } from "next";
import Image from "next/image";
import { FaqSectie } from "@/components/FaqSectie";
import { Hero } from "@/components/Hero";
import { PaginaStatement } from "@/components/PaginaStatement";
import { IconMunten, IconShowroom, IconSlot } from "@/components/RijIconen";
import { ShowroomAfspraak } from "@/components/ShowroomAfspraak";
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
    /* TODO: noem het teruglevertarief alleen met een vastgesteld bedrag;
       6 à 7 cent per kWh niet overnemen, dat is een markttarief dat verandert. */
  },
];

export default function ZonnepanelenPage() {
  return (
    <main data-hero-balk>
      {/* TODO: onderbouwing of schrappen: "geen tijdelijke acties of schijnkortingen". */}
      {/* TODO: onderbouwing of schrappen: hogere woningwaarde van gemiddeld €5.800. */}
      {/* TODO: onderbouwing of schrappen: "Tien jaar lang geen zorgen en geen onverwachte kosten". */}
      {/* TODO: onderbouwing of schrappen: terugverdientijd van 5 tot 8 jaar. */}
      <Hero
        compact
        kop="Duurzaam en zorgeloos besparen"
        subregel="Met zonnepanelen van Zonneplaneet wek je je eigen groene energie op en verlaag je direct je energiekosten. Je profiteert van de nieuwste technologie, professionele installatie en persoonlijke service."
        knoptekst="Gratis advies aanvragen"
        knoplink="/contact"
      />

      {/* Foto: /zonnepanelen-woningen.jpg */}
      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        <Image
          src="/zonnepanelen-woningen.jpg"
          alt="Rij nieuwbouwwoningen met zonnepanelen op de dakvlakken"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Rijenlijst
        eyebrow="ZONNEPANELEN"
        id="zonnepanelen-voordelen"
        kop="Ook met veranderende regels blijft zonne-energie voordelig."
        rijen={rijen}
      />

      <PaginaStatement
        headingId="zonnepanelen-techniek"
        eyebrow="TECHNIEK"
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

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            <StatKaart
              getal="€380"
              label="PER JAAR MET ZONNEPANELEN EN DYNAMISCH CONTRACT"
              variant="navy"
            />
            <StatKaart
              getal="€540"
              label="PER JAAR MET ZONNEPANELEN EN VAST CONTRACT"
              variant="oranje"
            />
            <StatKaart
              getal="€1.050"
              label="PER JAAR ZONDER ZONNEPANELEN"
              variant="navy"
            />
          </div>

          <p className="mt-6 text-[0.875rem] leading-[1.6] text-body-grijs">
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

      <ShowroomAfspraak />

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
