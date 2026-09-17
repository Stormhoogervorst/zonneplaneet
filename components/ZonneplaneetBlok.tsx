import Link from "next/link";
import { Woordmerk } from "@/components/Woordmerk";
import { footerBedrijfsgegevens } from "@/lib/bedrijf";

type ZonneplaneetBlokProps = {
  className?: string;
  headingId: string;
};

export function ZonneplaneetBlok({
  className = "",
  headingId,
}: ZonneplaneetBlokProps) {
  const gegevens = footerBedrijfsgegevens();

  return (
    <section
      aria-labelledby={headingId}
      className={`bg-navy-licht px-5 py-6 text-white ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Het logo is wit met transparantie en kan dus alleen op een donker vlak */}
        <Woordmerk ondergrond="donker" klasseHoogte="h-8" alt="Zonneplaneet" />
        <h2 id={headingId} className="mt-4 text-2xl font-semibold">
          Wij leveren en installeren
        </h2>
        <p className="mt-4">
          We nemen contact op met aangemelde leden en verzorgen advies, verkoop
          en installatie.
        </p>
        <address className="mt-4 not-italic">
          {gegevens.map((gegeven) => (
            <p key={gegeven.label} className="mt-4 first:mt-0">
              {gegeven.label}:{" "}
              {gegeven.href ? (
                <a className="underline" href={gegeven.href}>
                  {gegeven.waarde}
                </a>
              ) : (
                gegeven.waarde
              )}
            </p>
          ))}
        </address>
        {/* TODO: telefoonnummer aanleveren. */}
        <Link className="mt-4 inline-block underline" href="/over-zonneplaneet">
          Over Zonneplaneet
        </Link>
      </div>
    </section>
  );
}
