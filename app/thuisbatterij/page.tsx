import type { Metadata } from "next";
import Image from "next/image";
import { FaqSectie } from "@/components/FaqSectie";
import { Hero } from "@/components/Hero";
import { KaartenMetGraphics } from "@/components/KaartenMetGraphics";
import { PaginaStatement } from "@/components/PaginaStatement";
import {
  GraphicLaadpaal,
  GraphicThuisbatterij,
  GraphicZonnepanelen,
} from "@/components/ProductGraphics";
import { IconMunten, IconShowroom, IconSlot } from "@/components/RijIconen";
import { ShowroomAfspraak } from "@/components/ShowroomAfspraak";
import { Tijdlijn } from "@/components/Tijdlijn";
import { Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thuisbatterij",
  description:
    "Bewaar je eigen zonnestroom en gebruik die later in huis. Een thuisbatterij stemt opslag af op je verbruik, je panelen en je energiecontract.",
};

const rijen = [
  {
    titel: "Meer eigen stroom gebruiken",
    icoon: <IconMunten className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Bewaar de zonnestroom die je overdag niet direct gebruikt en zet deze later in. Zo hoef je minder elektriciteit van het net af te nemen.",
  },
  {
    titel: "Profiteren van prijsverschillen",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Bij een dynamisch energiecontract veranderen stroomprijzen gedurende de dag. Een thuisbatterij slaat energie op wanneer dat gunstig is en maakt deze later beschikbaar.",
  },
  {
    titel: "Veilige LFP-technologie",
    icoon: <IconShowroom className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Onze thuisbatterijen werken met LFP-technologie, bekend om een lange levensduur, een hoog veiligheidsniveau en goede thermische stabiliteit.",
  },
];

/* GraphicZonnepanelen en GraphicLaadpaal horen inhoudelijk niet bij omvormer
   en meterkast. Er zijn geen aparte ProductGraphics voor die onderdelen.
   TODO: voeg passende graphics toe en vervang deze stand-ins. */
const installatieKaarten = [
  {
    titel: "Thuisbatterij",
    graphic: GraphicThuisbatterij,
    beschrijving:
      "Slaat je eigen opgewekte zonne-energie op voor later, bijvoorbeeld 's avonds of op bewolkte dagen. Welke capaciteit past, hangt af van je verbruik, je zonnepanelen en hoe je de batterij wilt gebruiken. De batterij komt meestal op zolder, in de garage of in de bijkeuken.",
  },
  {
    titel: "Omvormer",
    graphic: GraphicZonnepanelen,
    beschrijving:
      "Zet opgeslagen gelijkstroom om naar wisselstroom voor gebruik in huis, en andersom. Het vermogen bepaalt de snelheid van laden en ontladen, doorgaans tussen 4,4 kW en 10 kW. De thuisbatterij krijgt een eigen omvormer, los van die van je zonnepanelen.",
  },
  {
    titel: "Aansluiting in de meterkast",
    graphic: GraphicLaadpaal,
    beschrijving:
      "Vanuit de batterij loopt een kabel naar je meterkast, waar een aparte groep wordt geplaatst. Zo blijft je elektrische installatie veilig en stabiel. Na aansluiting wordt het systeem gecontroleerd en gebruiksklaar opgeleverd.",
  },
];

const stappen = [
  {
    nummer: "01",
    titel: "Voorbereiding",
    beschrijving:
      "Na je bestelling controleren we je woning. We vragen je enkele foto's aan te leveren, bijvoorbeeld van de meterkast en de slimme meter. Op basis daarvan maken we een technisch plan.",
  },
  {
    nummer: "02",
    titel: "De installatiedag",
    /* TODO: tekst aanleveren. */
  },
  {
    nummer: "03",
    titel: "Service na installatie",
    /* TODO: tekst aanleveren. */
  },
];

const vragen = [
  {
    vraag:
      "Waarom is een thuisbatterij interessant nu de salderingsregeling stopt?",
    antwoord:
      "Vanaf 1 januari 2027 stopt de salderingsregeling. Daardoor wordt het belangrijker om een groter deel van je eigen zonne-energie direct te gebruiken of te bewaren. Met een thuisbatterij sla je overtollige zonnestroom op voor een later moment. Welke voordelen dat oplevert, hangt af van je verbruik, je zonnepanelen en de gekozen capaciteit.",
  },
  /* TODO: Slaat de batterij mijn stroom op als de zon schijnt? */
  /* TODO: Is een aparte omvormer nodig? */
  /* TODO: Hoeveel energie past er in een thuisbatterij? */
];

export default function ThuisbatterijPage() {
  return (
    <main data-hero-balk>
      <Hero
        compact
        kop="Meer grip op je eigen energie"
        subregel="Met een thuisbatterij bewaar je energie om deze op een ander moment in huis te gebruiken. Zo benut je meer van je eigen opgewekte stroom en stem je je energiegebruik beter af op jouw huishouden."
        knoptekst="Gratis advies aanvragen"
        knoplink="/contact"
      />

      {/* Foto: /thuisbatterij-installatie.jpg */}
      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        <Image
          src="/thuisbatterij-installatie.jpg"
          alt="Zonnepanelen en thuisbatterijen gemonteerd tegen een lichte wand"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Rijenlijst
        eyebrow="THUISBATTERIJ"
        id="thuisbatterij-voordelen"
        kop="Energie bewaren voor het moment dat je haar nodig hebt."
        rijen={rijen}
      />

      <PaginaStatement
        headingId="thuisbatterij-hoe-het-werkt"
        eyebrow="HOE HET WERKT"
        tekst="De thuisbatterij bewaart energie wanneer deze beschikbaar is en maakt haar weer beschikbaar wanneer je woning energie nodig heeft. Afhankelijk van je installatie houdt het systeem rekening met je verbruik, de opbrengst van je zonnepanelen en actuele stroomprijzen."
      />

      <KaartenMetGraphics
        headingId="thuisbatterij-installatie-onderdelen"
        titel="Wat wordt er geïnstalleerd"
        vierkanteKaarten={false}
        kaarten={installatieKaarten}
      />

      <Tijdlijn
        eyebrow="INSTALLATIE"
        headingId="thuisbatterij-installatie"
        titel="De drie stappen van jouw installatietraject"
        stappen={stappen}
      />

      <FaqSectie
        eyebrow="THUISBATTERIJ"
        headingId="thuisbatterij-faq"
        vragen={vragen}
      />

      <ShowroomAfspraak />

      <PaginaStatement
        headingId="thuisbatterij-contact"
        eyebrow="ALLES VOOR JOUW ENERGIE THUIS"
        tekst="Slim laden, opslaan en besparen, gewoon bij jou thuis. Van zonnepanelen en thuisbatterij tot laadpaal: we zorgen voor een oplossing die past bij jouw woning en energiegebruik. Inclusief installatie en service."
        knopHref="/contact"
        knopLabel="Gratis advies aanvragen"
      />
    </main>
  );
}
