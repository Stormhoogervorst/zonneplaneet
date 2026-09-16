import { existsSync } from "node:fs";
import { join } from "node:path";
import { Knop, Tag } from "@/components/ui";

const videoMap = join(process.cwd(), "public", "video");
const videoBestand = "advies-tot-installatie.mp4";
const posterBestand = "advies-tot-installatie-poster.jpg";
const ondertitelBestand = "advies-tot-installatie.vtt";

function bestandBestaat(naam: string) {
  return existsSync(join(videoMap, naam));
}

function ShowroomTekst() {
  return (
    <>
      <Tag>DE SHOWROOM</Tag>
      {/* TODO: "De eerste energieshowroom van Nederland" is een claim over primeurschap en moet onderbouwd zijn. */}
      <h2
        id="over-showroom-titel"
        className="mt-6 max-w-[20ch] [overflow-wrap:normal] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-normal hyphens-none text-navy [word-break:normal]"
      >
        De eerste energieshowroom van Nederland
      </h2>
      <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-body-donker">
        In Arnhem staat onze energieshowroom. Hier zie je zonnepanelen,
        thuisbatterijen, warmtepompen en laadpalen met eigen ogen, en krijg je
        uitleg over wat ze in de praktijk doen. Samen kijken we welke oplossing
        past bij jouw woning, je verbruik en je plannen.
      </p>
      <Knop href="#afspraak" variant="groot" metPijl className="mt-8">
        Plan je bezoek
      </Knop>
    </>
  );
}

/**
 * Showroom in Arnhem, met optioneel een staande video ernaast. Alleen op
 * `/over-zonneplaneet`.
 */
export function SectieShowroom() {
  const heeftVideo = bestandBestaat(videoBestand);
  const heeftPoster = bestandBestaat(posterBestand);
  const heeftOndertiteling = bestandBestaat(ondertitelBestand);

  return (
    <section
      aria-labelledby="over-showroom-titel"
      className="bg-salderingsvlak py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        {heeftVideo ? (
          <div className="md:flex md:items-center md:gap-16">
            <div className="min-w-0 md:w-[58%] md:shrink-0">
              <ShowroomTekst />
            </div>
            <div className="mt-10 min-w-0 md:mt-0 md:w-[34%]">
              <div className="mx-auto w-full max-w-[300px] md:mr-0 md:ml-auto md:max-w-[320px]">
                <div className="aspect-[9/16] w-full overflow-hidden rounded-3xl">
                  <video
                    className="h-full w-full object-cover"
                    controls
                    controlsList="nodownload"
                    preload="none"
                    playsInline
                    poster={
                      heeftPoster
                        ? "/video/advies-tot-installatie-poster.jpg"
                        : undefined
                    }
                  >
                    <source
                      src="/video/advies-tot-installatie.mp4"
                      type="video/mp4"
                    />
                    {heeftOndertiteling ? (
                      <track
                        kind="captions"
                        srcLang="nl"
                        label="Nederlands"
                        src="/video/advies-tot-installatie.vtt"
                        default
                      />
                    ) : null}
                    Je browser kan deze video niet afspelen.
                  </video>
                </div>
                {/* TODO: korte tekstuele samenvatting van wat er in de video te zien is. */}
                {/* TODO: Nederlandse ondertiteling in /public/video/advies-tot-installatie.vtt. */}
              </div>
            </div>
          </div>
        ) : (
          <ShowroomTekst />
        )}
      </div>
    </section>
  );
}
