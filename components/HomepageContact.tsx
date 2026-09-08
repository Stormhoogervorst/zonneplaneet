import { Knop } from "@/components/ui";

export function HomepageContact() {
  return (
    <section
      aria-labelledby="homepage-contact-titel"
      className="bg-tag bg-[url('/patroon-kruisjes.svg')] bg-repeat py-24 md:py-32"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-8 text-center md:px-16">
        <h2
          id="homepage-contact-titel"
          className="max-w-[20ch] text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.15] font-normal text-balance text-navy"
        >
          Benieuwd wat we voor jouw club kunnen betekenen?
        </h2>

        <Knop
          href="/partner"
          variant="grootDonker"
          metPijl
          className="mt-10 justify-center"
        >
          Neem contact op
        </Knop>
      </div>
    </section>
  );
}
