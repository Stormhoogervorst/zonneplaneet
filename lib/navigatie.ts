export type NavigatieLink = {
  href: string;
  label: string;
};

/**
 * De hoofdnavigatie. Een item toevoegen is een regel hier; de header rendert
 * deze array op desktop en in het hamburgermenu.
 */
export const navigatie: NavigatieLink[] = [
  { label: "Clubactie", href: "/clubactie" },
  { label: "Referral", href: "/referral" },
  { label: "Over Zonneplaneet", href: "/over-zonneplaneet" },
];
