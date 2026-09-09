import type { Metadata } from "next";
import { ActieFormulier } from "@/components/ActieFormulier";
import { WinactieHero } from "@/components/WinactieHero";
import { WinactieUitleg } from "@/components/WinactieUitleg";

/* TODO: title en description vervangen als de actietekst definitief is. */
export const metadata: Metadata = {
  title: "Winactie",
  description: "TODO",
  robots: {
    index: false,
    follow: true,
  },
};

export default function WinactiePage() {
  return (
    <main data-donker-einde data-geen-vertrouwensblok>
      <WinactieHero />
      <WinactieUitleg />
      <ActieFormulier actie="winactie" />
    </main>
  );
}
