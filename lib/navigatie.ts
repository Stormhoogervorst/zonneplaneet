export type NavigatieLink = {
  href: string;
  label: string;
};

export type NavigatieItem = NavigatieLink & {
  kinderen?: NavigatieLink[];
};

/**
 * De hoofdnavigatie. Een item toevoegen is een regel hier; de header rendert
 * deze array op desktop en in het hamburgermenu.
 */
export const navigatie: NavigatieItem[] = [
  { label: "Clubactie", href: "/clubactie" },
  { label: "Cashback", href: "/cashback" },
  { label: "Winactie", href: "/winactie" },
  { label: "Referral", href: "/referral" },
  {
    label: "Over Zonneplaneet",
    href: "/over-zonneplaneet",
    kinderen: [
      { label: "Werkwijze", href: "/over-zonneplaneet/werkwijze" },
      { label: "Garanties", href: "/over-zonneplaneet/garanties" },
      { label: "Reviews", href: "/over-zonneplaneet/reviews" },
    ],
  },
];

export function heeftKinderen(
  item: NavigatieItem,
): item is NavigatieItem & { kinderen: NavigatieLink[] } {
  return (item.kinderen?.length ?? 0) > 0;
}
