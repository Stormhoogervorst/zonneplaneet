import { PaginaStatement } from "@/components/PaginaStatement";

export function LedenStatement() {
  return (
    <PaginaStatement
      headingId="leden-statement-titel"
      tekst="Je betaalt minder dan wanneer je het zelf regelt, en je vereniging krijgt een vast bedrag per installatie. Dezelfde panelen, dezelfde installateur, alleen loopt het via je club."
      knopHref="/leden"
      knopLabel="Meld me aan"
    />
  );
}
