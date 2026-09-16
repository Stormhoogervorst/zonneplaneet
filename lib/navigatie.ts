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
  { label: "Clubactie", href: "/clubactie" },
  { label: "Referral", href: "/referral" },
  { label: "Over Zonneplaneet", href: "/over-zonneplaneet" },
];

export function heeftKinderen(
  item: NavigatieItem,
): item is NavigatieItem & { kinderen: NavigatieLink[] } {
  return (item.kinderen?.length ?? 0) > 0;
}

/** /leden hoort bij de clubactie en heeft geen eigen nav-item. */
export function isNavigatieHuidig(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  }

  return href === "/clubactie" && pathname === "/leden";
}

export function isNavigatieItemHuidig(
  pathname: string,
  item: NavigatieItem,
): boolean {
  if (heeftKinderen(item)) {
    return item.kinderen.some((kind) => isNavigatieHuidig(pathname, kind.href));
  }

  return isNavigatieHuidig(pathname, item.href);
}
