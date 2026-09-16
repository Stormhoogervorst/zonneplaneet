import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { LaadpaalApp } from "@/components/LaadpaalApp";
import { PaginaStatement } from "@/components/PaginaStatement";
import { IconMunten, IconPosterQr, IconSlot } from "@/components/RijIconen";
import { ShowroomAfspraak } from "@/components/ShowroomAfspraak";
import { Tijdlijn } from "@/components/Tijdlijn";
import { Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

export const metadata: Metadata = {
  title: "Laadpaal",
  description:
    "Laad je elektrische auto eenvoudig op je eigen oprit. Met een slimme laadoplossing heb je altijd een laadpunt binnen handbereik en bepaal je zelf wanneer je auto wordt opgeladen.",
};

const rijen = [
  {
    titel: "Je auto klaar wanneer jij vertrekt",
    icoon: <IconPosterQr className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Geef aan wanneer je de auto nodig hebt en plan je laadmoment eenvoudig vooraf via de app.",
  },
  {
    titel: "Grip op je laadmomenten",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Kies zelf wanneer je laadt en stem je laadsessies af op momenten die gunstig zijn voor jouw energieverbruik.",
  },
  {
    titel: "Rijden op energie van je eigen dak",
    icoon: <IconMunten className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Gebruik beschikbare zonne-energie om je auto op te laden en haal meer uit de stroom die je zelf opwekt.",
  },
];

const techniekKaarten = [
  {
    titel: "Dynamische load balancing",
    beschrijving:
      "Het laadvermogen wordt afgestemd op de beschikbare capaciteit in je woning, zodat je auto en andere apparaten veilig naast elkaar kunnen worden gebruikt.",
  },
  {
    titel: "Altijd up-to-date",
    beschrijving:
      "Automatische software-updates zorgen dat je laadpaal continu wordt verbeterd.",
  },
  {
    titel: "Stabiele verbinding",
    beschrijving:
      "Dankzij een beveiligde 4G-verbinding werkt je laadpaal betrouwbaar, zonder afhankelijk te zijn van wifi.",
  },
];

/* Zelfde vier stappen als op /zonnepanelen. */
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

export default function LaadpaalPage() {
  return (
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Slim en comfortabel laden bij je thuis"
        subregel="Laad je elektrische auto eenvoudig op je eigen oprit. Met een slimme laadoplossing heb je altijd een laadpunt binnen handbereik en bepaal je zelf wanneer je auto wordt opgeladen."
        knoptekst="Gratis advies aanvragen"
        knoplink="/contact"
        foto="/zonnepanelen-bedrijfsdak.jpg"
        alt="Lange rijen zonnepanelen op het dak van een bedrijfshal"
      />

      <Rijenlijst
        eyebrow="LAADPAAL"
        id="laadpaal-voordelen"
        kop="Comfort, controle en besparing in één."
        rijen={rijen}
      />

      <PaginaStatement
        headingId="laadpaal-smartcharge"
        eyebrow="SMARTCHARGE"
        tekst="SmartCharge stemt het laden automatisch af op je planning en energiegebruik. Stel via de app in wanneer je auto beschikbaar moet zijn, dan bepaalt het systeem een passend laadmoment. Heb je zonnepanelen of een dynamisch contract, dan kun je je laadstrategie daarop afstemmen. Wil je niet wachten, kies dan voor direct laden."
      />

      <section
        aria-labelledby="laadpaal-techniek"
        className="bg-salderingsvlak py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16">
          <h2
            id="laadpaal-techniek"
            className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-normal text-navy"
          >
            Techniek
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-[2px]">
            {techniekKaarten.map(({ titel, beschrijving }) => (
              <div key={titel} className="bg-keuzekaart px-10 py-12">
                <h3 className="text-[1.5rem] font-normal text-navy">{titel}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.6] text-body-donker">
                  {beschrijving}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Tijdlijn
        eyebrow="INSTALLATIE"
        headingId="laadpaal-installatie"
        titel="Bij jou thuis in vier stappen"
        alinea="Van de eerste voorbereiding tot de service na oplevering. Zo weet je wat je kunt verwachten."
        stappen={stappen}
      />

      <LaadpaalApp />

      <ShowroomAfspraak />

      <PaginaStatement
        headingId="laadpaal-contact"
        eyebrow="ALLES VOOR JOUW ENERGIE THUIS"
        tekst="Slim laden, opslaan en besparen, gewoon bij jou thuis. Van zonnepanelen en thuisbatterij tot laadpaal: we zorgen voor een oplossing die past bij jouw woning en energiegebruik. Inclusief installatie en service."
        knopHref="/contact"
        knopLabel="Gratis advies aanvragen"
      />
    </main>
  );
}
