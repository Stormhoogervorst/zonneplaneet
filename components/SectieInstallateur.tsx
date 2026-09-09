import Image from "next/image";
import { Knop } from "@/components/ui";

export const installateurAlineaVoorClubs =
  "Zonneplaneet levert en installeert. Wij regelen de actie voor je club en zorgen dat je korting op de offerte staat. Zonneplaneet werkt vanuit Assen en Arnhem.";

export function SectieInstallateur({
  alinea = installateurAlineaVoorClubs,
}: {
  alinea?: string;
}) {
  return (
    <section
      aria-labelledby="installateur-titel"
      className="bg-[#F2F2F1] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:flex md:flex-row-reverse md:items-center md:gap-16 md:px-16">
        <div className="min-w-0 md:w-[38%] md:shrink-0">
          <h2
            id="installateur-titel"
            className="text-[1.25rem] leading-[1.5] font-normal text-navy md:text-[1.375rem]"
          >
            {alinea}
          </h2>

          {/* De pijlcirkel hoort binnen de link, zodat ook een klik daarop
              naar Zonneplaneet gaat. */}
          <Knop
            href="https://www.zonneplaneet.nl/"
            variant="extern"
            metPijl
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
          >
            Bekijk Zonneplaneet
            <span className="sr-only"> (opent in een nieuw venster)</span>
          </Knop>
        </div>

        <div className="relative mt-12 aspect-[4/3] min-w-0 w-full overflow-hidden md:mt-0 md:aspect-[16/10] md:w-[62%]">
          <Image
            src="/thuisbatterij-installatie.jpg"
            alt="Zonnepanelen en thuisbatterijen gemonteerd tegen een lichte wand"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
