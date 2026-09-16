import type { Metadata } from "next";
import Image from "next/image";
import { ContactKop } from "@/components/ContactKop";
import { PaginaStatement } from "@/components/PaginaStatement";
import { Samenwerkingspartners } from "@/components/Samenwerkingspartners";
import { ShowroomAfspraak } from "@/components/ShowroomAfspraak";
import {
  IconEnvelop,
  IconPosterQr,
  IconShowroom,
  IconSlot,
} from "@/components/RijIconen";
import { Rijenlijst, rijenlijstIcoonClasses } from "@/components/ui";

export const metadata: Metadata = {
  title: "Over Zonneplaneet",
  description:
    "Zonneplaneet helpt huishoudens en bedrijven bij het maken van praktische keuzes voor hun energiegebruik, met zonnepanelen, thuisbatterijen en andere energieoplossingen.",
  robots: {
    index: false,
    follow: true,
  },
};

const rijen = [
  {
    titel: "Advies op jouw situatie",
    icoon: <IconPosterQr className={rijenlijstIcoonClasses} />,
    beschrijving:
      "Ons buitendienstteam bekijkt samen met jou welke energieoplossing aansluit op jouw woning of bedrijf. Daarbij houden we rekening met je energieverbruik, de mogelijkheden op locatie en je wensen voor de toekomst.",
  },
  {
    titel: "Gecertificeerde monteurs",
    icoon: <IconSlot className={rijenlijstIcoonClasses} />,
    beschrijving:
      "De installatie is bij ons in veilige handen. Onze monteurs zijn ervaren vakmensen en volledig gecertificeerd. Zij werken met oog voor kwaliteit, veiligheid en duurzaamheid. Zo ben je verzekerd van een betrouwbare installatie die jarenlang meegaat. Levering en installatie doorgaans binnen een maand.",
  },
  {
    titel: "Eigen showrooms",
    icoon: <IconShowroom className={rijenlijstIcoonClasses} />,
    beschrijving:
      "In onze showrooms bekijk je alles met eigen ogen en krijg je het volledig uitgelegd. Zo weet je precies waarvoor je kiest voordat je beslist.",
  },
  {
    titel: "Persoonlijk en overzichtelijk",
    icoon: <IconEnvelop className={rijenlijstIcoonClasses} />,
    beschrijving:
      "We willen dat elke klant zich gehoord voelt en met een goed gevoel overstapt naar duurzame energie. Zo maken we verduurzamen overzichtelijk, persoonlijk en passend bij iedere situatie.",
  },
];

export default function OverZonneplaneetPage() {
  return (
    <main data-geen-vertrouwensblok>
      <ContactKop
        headingId="over-zonneplaneet-kop-titel"
        eyebrow="OVER ONS"
        titel="Over Zonneplaneet"
        slogan="Samen naar een duurzaam huis"
        alinea="Zonneplaneet helpt huishoudens en bedrijven bij het maken van praktische keuzes voor hun energiegebruik. Met zonnepanelen, thuisbatterijen en andere energieoplossingen kijken we naar wat past bij de locatie, het verbruik en de wensen van de klant."
      />

      {/* Foto: /zonnepanelen-bedrijfsdak.jpg, breed landschap dat op 21/9 leesbaar blijft. */}
      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        <Image
          src="/zonnepanelen-bedrijfsdak.jpg"
          alt="Lange rijen zonnepanelen op het dak van een bedrijfshal"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <PaginaStatement
        headingId="over-begeleiding-titel"
        eyebrow="VAN ADVIES TOT INSTALLATIE"
        tekst="Bij Zonneplaneet begeleiden we het hele traject. Van het eerste contact en een passend advies tot de installatie en ondersteuning daarna."
      />

      <Rijenlijst
        eyebrow="WAAR WIJ VOOR STAAN"
        id="waar-wij-voor-staan"
        kop="Duidelijke communicatie, maatwerk met goede producten en service die verder gaat dan de installatie."
        rijen={rijen}
      />

      <Samenwerkingspartners />

      <ShowroomAfspraak />

      <PaginaStatement
        headingId="over-energie-thuis-titel"
        eyebrow="ALLES VOOR JOUW ENERGIE THUIS"
        tekst="Slim laden, opslaan en besparen, gewoon bij jou thuis. Van zonnepanelen en thuisbatterij tot laadpaal: we zorgen voor een oplossing die past bij jouw woning en energiegebruik. Inclusief installatie en service."
        knopHref="/contact"
        knopLabel="Neem contact op"
      />
    </main>
  );
}
