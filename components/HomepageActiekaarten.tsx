import type { ComponentType } from "react";
import Link from "next/link";
import { LaadpaalIcoon, ZonnepaneelIcoon } from "@/components/KeuzeKaarten";
import { IconTegel } from "@/components/ui";

const actieblokken: {
  id: string;
  titel: string;
  beschrijving: string;
  href: string;
  Icoon: ComponentType;
}[] = [
  {
    id: "actie-clubactie",
    titel: "Clubactie",
    beschrijving: "Sponsor je vereniging bij je aanschaf.",
    href: "/clubactie",
    Icoon: ZonnepaneelIcoon,
  },
  {
    id: "actie-referral",
    titel: "Referral",
    beschrijving: "Draag iemand aan en verdien €200.",
    href: "/referral",
    Icoon: LaadpaalIcoon,
  },
];

function SchuinePijl() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0 ml-auto size-5 shrink-0 text-oranje-diep group-hover:text-navy"
    >
      <path
        d="M7 17 17 7m0 0H9m8 0v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HomepageActiekaarten() {
  return (
    <section
      id="acties"
      aria-labelledby="acties-titel"
      className="scroll-mt-8 bg-vlak py-24"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2 id="acties-titel" className="sr-only">
          Acties
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {actieblokken.map(({ id, titel, beschrijving, href, Icoon }) => (
            <Link
              key={id}
              href={href}
              className="actie-keuzeblok group flex min-h-[120px] items-center gap-6 bg-keuzekaart p-8 transition-[background-color] duration-200 hover:bg-oranje motion-reduce:transition-none"
            >
              <IconTegel className="size-16 !rounded-none [&>svg]:size-7">
                <Icoon />
              </IconTegel>
              <div className="min-w-0">
                <h3 className="text-[1.375rem] font-semibold text-navy">
                  {titel}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-body-donker group-hover:text-navy">
                  {beschrijving}
                </p>
              </div>
              <SchuinePijl />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
