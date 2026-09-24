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
  {
    label: "Producten",
    href: "/zonnepanelen",
    kinderen: [
      { label: "Zonnepanelen", href: "/zonnepanelen" },
      { label: "Thuisbatterij", href: "/thuisbatterij" },
      { label: "Laadpaal", href: "/laadpaal" },
    ],
  },
  {
    label: "Clubactie",
    href: "/clubactie",
    kinderen: [
      { label: "Voor leden", href: "/leden" },
      { label: "Voor clubs", href: "/partner" },
    ],
  },
  { label: "Referral", href: "/referral" },
  { label: "Over Zonneplaneet", href: "/over-zonneplaneet" },
];

export function heeftKinderen(
  item: NavigatieItem,
): item is NavigatieItem & { kinderen: NavigatieLink[] } {
  return (item.kinderen?.length ?? 0) > 0;
}

export function isNavigatieHuidig(pathname: string, href: string): boolean {
  return pathname === href;
}

export function isNavigatieItemHuidig(
  pathname: string,
  item: NavigatieItem,
): boolean {
  if (isNavigatieHuidig(pathname, item.href)) {
    return true;
  }

  if (heeftKinderen(item)) {
    return item.kinderen.some((kind) => isNavigatieHuidig(pathname, kind.href));
  }

  return false;
}
