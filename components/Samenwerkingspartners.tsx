import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

type PartnerLogo = {
  naam: string;
  bestand: string;
};

/* TODO: zet de logo's als SVG in /public/partners/. Vul daarna deze array
   met { naam, bestand }. */
const partners: PartnerLogo[] = [];

const partnersMap = join(process.cwd(), "public", "partners");

function bestaandePartners(logos: PartnerLogo[]): PartnerLogo[] {
  return logos.filter(
    ({ naam, bestand }) =>
      naam.trim() !== "" &&
      bestand.trim() !== "" &&
      existsSync(join(partnersMap, bestand)),
  );
}

export function Samenwerkingspartners() {
  const logos = bestaandePartners(partners);

  if (logos.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="samenwerkingspartners-titel"
      className="bg-salderingsvlak py-20"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2
          id="samenwerkingspartners-titel"
          className="text-center text-[1.5rem] font-normal text-navy"
        >
          Wij werken samen met de beste partijen in de markt
        </h2>

        <ul className="mt-10 grid grid-cols-2 items-center gap-10 md:grid-cols-4">
          {logos.map(({ naam, bestand }) => (
            <li key={bestand} className="flex justify-center">
              <Image
                src={`/partners/${bestand}`}
                alt={naam}
                width={160}
                height={40}
                className="h-auto max-h-10 w-auto object-contain opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
