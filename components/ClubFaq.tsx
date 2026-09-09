import { FaqSectie, type FaqVraag } from "@/components/FaqSectie";

type ClubFaqProps = {
  vragen: FaqVraag[];
};

export function ClubFaq({ vragen }: ClubFaqProps) {
  if (vragen.length === 0) {
    return null;
  }

  return <FaqSectie eyebrow="VOOR LEDEN" headingId="faq" vragen={vragen} />;
}
