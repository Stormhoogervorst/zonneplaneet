import {
  contactBedrijfsgegevens,
  isBedrijfsVeldGevuld,
  EMAIL,
  TELEFOON,
  type Bedrijfsgegeven,
} from "@/lib/bedrijf";

function Gegeven({ gegeven }: { gegeven: Bedrijfsgegeven }) {
  return (
    <div>
      <dt className="text-[0.9375rem] font-semibold text-navy">
        {gegeven.label}
      </dt>
      <dd className="mt-2 text-body-l">
        {gegeven.href ? (
          <a className="underline" href={gegeven.href}>
            {gegeven.waarde}
          </a>
        ) : (
          gegeven.waarde
        )}
      </dd>
    </div>
  );
}

export function SectieContactgegevens() {
  const gegevens = contactBedrijfsgegevens();

  return (
    <section
      aria-labelledby="contactgegevens-titel"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-8 md:px-16">
        <h2 id="contactgegevens-titel" className="text-display-m text-navy">
          Contactgegevens
        </h2>
        <p className="mt-4 max-w-[46ch] text-body-l text-body-donker">
          {isBedrijfsVeldGevuld(EMAIL) && isBedrijfsVeldGevuld(TELEFOON)
            ? "Je kunt het formulier gebruiken. Je kunt ons ook mailen of bellen."
            : isBedrijfsVeldGevuld(EMAIL)
              ? "Je kunt het formulier gebruiken. Je kunt ons ook mailen."
              : isBedrijfsVeldGevuld(TELEFOON)
                ? "Je kunt het formulier gebruiken. Je kunt ons ook bellen."
                : "Je kunt het formulier gebruiken."}
        </p>
        {/* TODO: telefoonnummer aanleveren. */}
        <dl className="mt-10 grid gap-8 sm:grid-cols-2">
          {gegevens.map((gegeven) => (
            <Gegeven key={gegeven.label} gegeven={gegeven} />
          ))}
        </dl>
      </div>
    </section>
  );
}
