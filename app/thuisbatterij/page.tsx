import type { Metadata } from "next";
import { FaqSectie } from "@/components/FaqSectie";
import { Hero } from "@/components/Hero";
import { KaartenMetGraphics } from "@/components/KaartenMetGraphics";
import { PaginaStatement } from "@/components/PaginaStatement";
import {
  GraphicMeterkast,
  GraphicOmvormer,
  GraphicThuisbatterij,
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

const installatieKaarten = [
  {
    titel: "Thuisbatterij",
    graphic: GraphicThuisbatterij,
    beschrijving:
      "Slaat je eigen opgewekte zonne-energie op voor later. Welke capaciteit past, hangt af van je verbruik en je zonnepanelen.",
  },
  {
    titel: "Omvormer",
    graphic: GraphicOmvormer,
    beschrijving:
      "Zet opgeslagen gelijkstroom om naar wisselstroom voor gebruik in huis. De batterij krijgt een eigen omvormer, los van die van je zonnepanelen.",
  },
  {
    titel: "Aansluiting in de meterkast",
    graphic: GraphicMeterkast,
    beschrijving:
      "Een kabel loopt naar je meterkast, waar een aparte groep wordt geplaatst. Zo blijft je installatie veilig en stabiel.",
  },
];

const stappen = [
  {
    nummer: "01",
    titel: "Voorbereiding",
    /* TODO: tekst aanleveren. */
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
    standaardOpen: true,
  },
  {
    vraag: "Slaat de batterij mijn stroom op als de zon schijnt?",
    antwoord:
      "De batterij slaat op wat je op dat moment niet zelf verbruikt. Draait de wasmachine terwijl de zon schijnt, dan gaat die stroom eerst naar je huis. Wat overblijft gaat naar de batterij, en pas als die vol is lever je terug aan het net.",
  },
  {
    vraag: "Is een aparte omvormer nodig?",
    antwoord:
      "Ja. Een thuisbatterij wordt altijd geleverd met een eigen omvormer, los van de omvormer van je zonnepanelen. Die zet opgeslagen gelijkstroom om naar wisselstroom voor gebruik in huis, en andersom. Het vermogen bepaalt hoe snel de batterij laadt en ontlaadt, doorgaans tussen 4,4 kW en 10 kW.",
  },
  {
    vraag: "Hoeveel energie past er in een thuisbatterij?",
    antwoord:
      "Dat verschilt per model. Welke capaciteit bij jou past, hangt af van je verbruik, de opbrengst van je zonnepanelen en hoe je de batterij wilt gebruiken. Een grotere batterij is niet automatisch beter: als je hem nooit leeg krijgt, betaal je voor capaciteit die je niet benut. In het adviesgesprek rekenen we dit voor jouw situatie uit.",
  },
  {
    vraag: "Heb ik zonnepanelen nodig voor een thuisbatterij?",
    antwoord:
      "Niet per se. Met zonnepanelen sla je je eigen opgewekte stroom op. Zonder zonnepanelen kan een batterij nog steeds nut hebben bij een dynamisch energiecontract: je laadt dan op momenten dat stroom goedkoper is en gebruikt die energie later. Of dat in jouw geval uitkomt, hangt af van je verbruik en je contract.",
  },
  {
    vraag: "Waar komt de batterij te staan?",
    antwoord:
      "Meestal op een praktische plek uit het zicht, zoals de zolder, de garage of de bijkeuken. Vanuit de batterij loopt een kabel naar je meterkast, waar een aparte groep wordt geplaatst. Zo blijft je elektrische installatie veilig en stabiel.",
  },
  {
    vraag: "Is een thuisbatterij veilig?",
    antwoord:
      "Onze thuisbatterijen werken met LFP-technologie. Die staat bekend om een lange levensduur, een hoog veiligheidsniveau en goede thermische stabiliteit. De installatie wordt uitgevoerd door gecertificeerde monteurs en na aansluiting gecontroleerd en gebruiksklaar opgeleverd.",
  },
  {
    vraag: "Heb ik bij stroomuitval nog stroom uit mijn batterij?",
    antwoord:
      "Niet automatisch. Een standaardinstallatie schakelt bij een storing uit, omdat er geen stroom het net op mag gaan terwijl monteurs eraan werken. Wil je bij stroomuitval wél stroom in huis houden, dan is daar een aparte voorziening voor nodig. Vraag ernaar in het adviesgesprek.",
  },
  {
    vraag: "Kan ik een thuisbatterij financieren?",
    antwoord:
      "Ja. Via de Energiebespaarlening van het Nationaal Warmtefonds kun je voor een thuisbatterij maximaal €8.500 lenen. Bij een gezamenlijk verzamelinkomen tot €60.000 is de rente 0%. Actuele voorwaarden staan op warmtefonds.nl.",
  },
  /* TODO: "Hoe lang gaat een thuisbatterij mee?" — tekst aanleveren, inclusief
     de garantietermijn en het aantal laadcycli. */
  /* TODO: "Wat kost een thuisbatterij?" — tekst aanleveren. Geen
     terugverdientijd, besparingsbedragen of rendementsclaims. */
];

export default function ThuisbatterijPage() {
  return (
    <main data-hero-balk data-geen-vertrouwensblok>
      <Hero
        uitgelijnd
        kop="Meer grip op je eigen energie"
        subregel="Met een thuisbatterij bewaar je energie om deze op een ander moment in huis te gebruiken. Zo benut je meer van je eigen opgewekte stroom en stem je je energiegebruik beter af op jouw huishouden."
        knoptekst="Gratis advies aanvragen"
        knoplink="/contact"
        foto="/thuisbatterij-installatie.jpg"
        alt="Zonnepanelen en thuisbatterijen gemonteerd tegen een lichte wand"
      />

      <Rijenlijst
        eyebrow="THUISBATTERIJ"
        id="thuisbatterij-voordelen"
        kop="Energie bewaren voor het moment dat je haar nodig hebt."
        rijen={rijen}
        className="pt-20 pb-8 md:pt-28 md:pb-10"
      />

      <PaginaStatement
        headingId="thuisbatterij-hoe-het-werkt"
        eyebrow="HOE HET WERKT"
        className="pt-8 pb-20 md:pt-10 md:pb-28"
        tekst="De thuisbatterij bewaart energie wanneer deze beschikbaar is en maakt haar weer beschikbaar wanneer je woning energie nodig heeft. Afhankelijk van je installatie houdt het systeem rekening met je verbruik, de opbrengst van je zonnepanelen en actuele stroomprijzen."
      />

      <KaartenMetGraphics
        headingId="thuisbatterij-installatie-onderdelen"
        titel="Wat wordt er geïnstalleerd"
        kaarten={installatieKaarten}
        voettekst="De batterij komt meestal op zolder, in de garage of in de bijkeuken. Het vermogen van de omvormer bepaalt de snelheid van laden en ontladen, doorgaans tussen 4,4 kW en 10 kW. Na aansluiting wordt het systeem gecontroleerd en gebruiksklaar opgeleverd."
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
