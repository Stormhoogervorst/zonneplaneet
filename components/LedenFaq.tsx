import { FaqSectie } from "@/components/FaqSectie";

/* Eén bron voor de accordeon en het FAQPage-schema, zodat de zichtbare tekst
   en het schema niet uit elkaar kunnen lopen. */
const vragen = [
  {
    vraag: "Zit ik ergens aan vast?",
    antwoord:
      "Nee. Je krijgt een vrijblijvende offerte. Pas als je tekent gebeurt er iets.",
  },
  {
    vraag: "Wat gebeurt er met mijn gegevens?",
    antwoord:
      "We gebruiken je voornaam, achternaam, telefoonnummer en de gegevens van je vereniging om contact met je op te nemen. Een e-mailadres is niet verplicht. Je club ziet je gegevens niet.",
  },
  {
    vraag: "Moet ik lid zijn?",
    antwoord:
      "Ja, de korting geldt voor leden van aangesloten verenigingen. Staat jouw club er niet bij, tip dan je bestuur.",
  },
  {
    vraag: "Kost het mijn club iets?",
    antwoord:
      "Nee. De club deelt de actie en verdient aan elke installatie, zonder kosten en zonder risico.",
  },
];

export function LedenFaq() {
  return (
    <FaqSectie eyebrow="VOOR LEDEN" headingId="faq-leden" vragen={vragen} />
  );
}
