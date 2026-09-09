import type { Metadata } from "next";
import { ActieFormulier } from "@/components/ActieFormulier";
import { CashbackHero } from "@/components/CashbackHero";
import { CashbackUitleg } from "@/components/CashbackUitleg";

/* TODO: title en description vervangen als de actietekst definitief is. */
export const metadata: Metadata = {
  title: "Cashback",
  description: "TODO",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CashbackPage() {
  return (
    <main data-donker-einde data-geen-vertrouwensblok>
      <CashbackHero />
      <CashbackUitleg />
      <ActieFormulier actie="cashback" />
    </main>
  );
}
