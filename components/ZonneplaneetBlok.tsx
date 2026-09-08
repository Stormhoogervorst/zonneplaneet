import Image from "next/image";
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
          Zonneplaneet is de installateur
        </h2>
        <p className="mt-4">
          Zonneplaneet neemt contact op met aangemelde leden en verzorgt advies,
          verkoop en installatie.
        </p>
        {/* TODO: Vul het gecontroleerde KvK-nummer van Zonneplaneet in. */}
        <p className="mt-4">KvK-nummer: nog in te vullen</p>
        {/* TODO: Vervang de tijdelijke URL door de gecontroleerde reviewlink. */}
        <a className="mt-4 inline-block underline" href="#">
          Bekijk reviews van Zonneplaneet
        </a>
      </div>
    </section>
  );
}
