import Image from "next/image";
import Link from "next/link";
import logoZonneplaneet from "@/public/logo-zonneplaneet-wit.png";

type ZonneplaneetBlokProps = {
  className?: string;
  headingId: string;
};

export function ZonneplaneetBlok({
  className = "",
  headingId,
}: ZonneplaneetBlokProps) {
  return (
    <section
      aria-labelledby={headingId}
      className={`bg-navy-licht px-5 py-6 text-white ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        {/* Het logo is wit met transparantie en kan dus alleen op een donker vlak */}
        <Image
          src={logoZonneplaneet}
          alt="Zonneplaneet"
          className="h-8 w-auto"
        />
        <h2 id={headingId} className="mt-4 text-2xl font-semibold">
          Wij leveren en installeren
        </h2>
        <p className="mt-4">
          We nemen contact op met aangemelde leden en verzorgen advies, verkoop
          en installatie.
        </p>
        {/* TODO: Vul het gecontroleerde KvK-nummer van Zonneplaneet in. */}
        <p className="mt-4">KvK-nummer: nog in te vullen</p>
        <Link className="mt-4 inline-block underline" href="/over-zonneplaneet">
          Over Zonneplaneet
        </Link>
      </div>
    </section>
  );
}
