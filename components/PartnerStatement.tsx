import { PaginaStatement } from "@/components/PaginaStatement";
import { STANDAARD_VERGOEDING } from "@/lib/clubs";

export function PartnerStatement() {
  return (
    <PaginaStatement
      headingId="partner-statement-titel"
      tekst={`Je leden kopen vroeg of laat toch zonnepanelen, een thuisbatterij of een laadpaal. Gebeurt dat via de actie van je eigen vereniging, dan gaat er bij elke installatie ${STANDAARD_VERGOEDING} naar de clubkas. Dezelfde aankoop, alleen levert hij nu ook de club iets op.`}
      knopHref="#club-aanmelden"
      knopLabel="Meld je club aan"
    />
  );
}
