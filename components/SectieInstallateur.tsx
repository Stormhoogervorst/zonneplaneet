import Image from "next/image";

export function SectieInstallateur() {
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
            Zonneplaneet levert en installeert. Wij regelen de actie voor je
            club en zorgen dat je korting op de offerte staat. Zonneplaneet
            werkt vanuit Assen en Arnhem.
          </h2>

          <div className="mt-8 flex items-center gap-2">
            <a
              href="https://www.zonneplaneet.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full bg-oranje px-6 text-xl font-semibold text-navy"
            >
              Bekijk Zonneplaneet
              <span className="sr-only"> (opent in een nieuw venster)</span>
            </a>
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-oranje"
            >
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none">
                <path
                  d="M7 17 17 7M17 7H8M17 7v9"
                  stroke="#072737"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

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
