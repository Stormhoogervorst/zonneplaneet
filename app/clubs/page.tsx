import type { Metadata } from "next";
import { ClubsKop } from "@/components/ClubsKop";
import { ClubsZoeker } from "@/components/ClubsZoeker";
import { getAlleClubs } from "@/lib/clubs";

export const metadata: Metadata = {
  title: "Zoek je vereniging",
  description:
    "Vind je club en meld je aan op haar eigen pagina. Daar staat precies welke korting voor jouw vereniging geldt.",
};

export default function ClubsPage() {
  const clubs = getAlleClubs()
    .map(({ slug, naam, plaats, logo }) => ({ slug, naam, plaats, logo }))
    .sort((a, b) => a.naam.localeCompare(b.naam, "nl"));

  return (
    <main data-geen-vertrouwensblok>
      <ClubsKop />
      <ClubsZoeker clubs={clubs} />
    </main>
  );
}
