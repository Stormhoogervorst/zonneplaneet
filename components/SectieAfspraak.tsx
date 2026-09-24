"use client";

import dynamic from "next/dynamic";
import { Tag } from "@/components/ui";

const embedVakClasses =
  "mt-6 h-[620px] min-h-[620px] w-full max-w-[900px] overflow-auto md:h-[560px] md:min-h-[560px]";

const standaardKop = "Plan direct een gesprek in";
const standaardSubregel =
  "Kies zelf een moment dat jou uitkomt. Het gesprek duurt ongeveer 30 minuten.";

function EmbedPlaceholder() {
  return <div className="h-full w-full" />;
}

const Boekingsmodule = dynamic(
  () => import("@/components/Boekingsmodule").then((mod) => mod.Boekingsmodule),
  {
    ssr: false,
    loading: () => <EmbedPlaceholder />,
  },
);

type SectieAfspraakProps = {
  headingId: string;
  kop?: string;
  subregel?: string;
};

/**
 * Agenda-embed voor een showroomgesprek. Client-only via next/dynamic, met
 * een vaste hoogte zodat de Cal-iframe niet tot nul inklapt. Productpagina's,
 * `/contact` en `/over-zonneplaneet` delen deze sectie; alleen kop en
 * headingId kunnen verschillen.
 */
export function SectieAfspraak({
  headingId,
  kop = standaardKop,
  subregel = standaardSubregel,
}: SectieAfspraakProps) {
  return (
    <section
      id="afspraak"
      aria-labelledby={headingId}
      className="scroll-mt-8 bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <Tag className="font-mono">AFSPRAAK</Tag>
        <h2
          id={headingId}
          className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-normal text-navy"
        >
          {kop}
        </h2>
        {subregel ? (
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-body-donker">
            {subregel}
          </p>
        ) : null}
        <div className={embedVakClasses}>
          <Boekingsmodule />
        </div>
      </div>
    </section>
  );
}
