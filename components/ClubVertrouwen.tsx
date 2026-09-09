import { clubHeeftBestuurRegel, clubHeeftQuote, type Club } from "@/lib/clubs";

type ClubVertrouwenProps = {
  club: Club;
};

/**
 * Club-specifiek vertrouwen, bewust vlak boven het formulier. Ontbreken
 * bestuursregel en quote, dan rendert deze sectie niets.
 */
export function ClubVertrouwen({ club }: ClubVertrouwenProps) {
  const bestuurRegel = clubHeeftBestuurRegel(club) ? club.bestuurRegel : null;
  const quote = clubHeeftQuote(club) ? club.quote : null;

  if (!bestuurRegel && !quote) {
    return null;
  }

  return (
    <section aria-labelledby="club-vertrouwen-titel" className="bg-white py-10">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        {bestuurRegel ? (
          <h2
            id="club-vertrouwen-titel"
            className="max-w-[46ch] text-[1.25rem] leading-[1.5] font-normal text-navy md:text-[1.375rem]"
          >
            {bestuurRegel}
          </h2>
        ) : (
          <h2 id="club-vertrouwen-titel" className="sr-only">
            Ervaring van een lid
          </h2>
        )}

        {quote ? (
          <blockquote className={bestuurRegel ? "mt-8" : undefined}>
            <p className="max-w-[46ch] text-[1.25rem] leading-[1.5] font-normal text-navy md:text-[1.375rem]">
              “{quote.tekst}”
            </p>
            <footer className="mt-4 text-body text-body-donker">
              {quote.naam}, {quote.rol}
            </footer>
          </blockquote>
        ) : null}
      </div>
    </section>
  );
}
