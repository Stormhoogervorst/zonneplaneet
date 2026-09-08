import Image from "next/image";
import { Tag } from "@/components/ui";

export function PartnerHero() {
  return (
    <section aria-labelledby="partner-hero-titel">
      {/* Deel 1: tekstblok op een licht vlak, de kop rechts uitgelijnd. Het vlak
          loopt onder de doorzichtige bovenbalk door, dus de balkhoogte komt
          bovenop de padding van de sectie. */}
      <div className="-mt-[var(--hoogte-headerbalk)] bg-salderingsvlak pt-[calc(var(--hoogte-headerbalk)+6rem)] pb-14 md:pt-[calc(var(--hoogte-headerbalk)+8rem)] md:pb-20">
        {/* Op mobiel staan tag, kop en tekst onder elkaar in die volgorde. Vanaf
            md vormen tag en tekst de linkerkolom en staat de kop rechts. */}
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-8 md:grid-cols-[36%_52%] md:justify-between md:gap-x-16 md:px-16">
          <Tag className="font-mono md:col-start-1 md:row-start-1">
            VOOR CLUBS
          </Tag>

          <h1
            id="partner-hero-titel"
            className="mt-6 min-w-0 text-[clamp(2rem,5vw,4.25rem)] leading-[1.1] font-normal tracking-[-0.02em] text-navy md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:text-right"
          >
            Een actie die je clubkas laat meeprofiteren
          </h1>

          <p className="mt-10 min-w-0 text-[1.0625rem] leading-[1.6] text-body-donker md:col-start-1 md:row-start-2">
            Je vereniging deelt de actie met haar leden. Meer hoeft de club niet
            te doen. Elke installatie levert de clubkas geld op, zonder kosten
            en zonder risico.
          </p>
        </div>
      </div>

      {/* Deel 2: brede foto over de volle breedte, sluit aan op het tekstblok */}
      <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
        <Image
          src="/zonnepanelen-bedrijfsdak.jpg"
          alt="Lange rijen zonnepanelen op het dak van een bedrijfshal"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
