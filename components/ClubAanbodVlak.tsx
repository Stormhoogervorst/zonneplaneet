import type { Club } from "@/lib/clubs";

type ClubAanbodVlakProps = {
  club: Club;
};

/**
 * IJsblauw vlak direct onder de hero: de kortingsbedragen uit de club-JSON.
 * Navy op tag haalt 10,5:1.
 */
export function ClubAanbodVlak({ club }: ClubAanbodVlakProps) {
  return (
    <section
      aria-labelledby="aanbod-titel"
      className="bg-tag py-10 text-navy"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2 id="aanbod-titel" className="sr-only">
          Korting voor leden
        </h2>

        <dl className="grid grid-cols-2 gap-6 md:gap-20">
          <div className="flex min-w-0 flex-col">
            <dt className="order-2 mt-3 text-xl font-semibold">
              korting op zonnepanelen
            </dt>
            <dd className="order-1 text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
              {club.kortingPanelen}
            </dd>
          </div>
          <div className="flex min-w-0 flex-col">
            <dt className="order-2 mt-3 text-xl font-semibold">
              korting op een thuisbatterij
            </dt>
            <dd className="order-1 text-[clamp(2rem,5vw,3.5rem)] leading-none font-normal">
              {club.kortingBatterij}
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-xl font-semibold">
          Na een installatie ontvangt de club {club.vergoedingPerInstallatie}.
        </p>
      </div>
    </section>
  );
}
