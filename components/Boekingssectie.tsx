"use client";

import dynamic from "next/dynamic";
import { Tag } from "@/components/ui";

const embedVakClasses =
  "mt-6 h-[620px] min-h-[620px] w-full max-w-[900px] overflow-auto md:h-[560px] md:min-h-[560px]";

function EmbedPlaceholder() {
  return <div className="h-full w-full" />;
}

const Boekingsmodule = dynamic(
  () =>
    import("@/components/Boekingsmodule").then((mod) => mod.Boekingsmodule),
  {
    ssr: false,
    loading: () => <EmbedPlaceholder />,
  },
);

/**
 * Agenda-embed op /contact. Client-only via next/dynamic, met een vaste
 * hoogte zodat de Cal-iframe niet tot nul inklapt.
 */
export function Boekingssectie() {
  return (
    <section
      aria-labelledby="contact-afspraak"
      className="bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <Tag className="font-mono">AFSPRAAK</Tag>
        <h2
          id="contact-afspraak"
          className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-normal text-navy"
        >
          Plan direct een afspraak in de showroom in
        </h2>
        <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-body-donker">
          Kies zelf een moment dat jou uitkomt. Het gesprek duurt ongeveer 30
          minuten.
        </p>
        <div className={embedVakClasses}>
          <Boekingsmodule />
        </div>
      </div>
    </section>
  );
}
