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

/** Contact is een knop in de header en een link in de voettekst. */
export const contactLink: NavigatieLink = {
  href: "/contact",
  label: "Contact",
};

export type FooterKolom = {
  titel: string;
  links: NavigatieLink[];
};

/**
 * Voettekstkolommen uit `navigatie`. Een ouderlink komt erbij als die nog
 * niet tussen de kinderen staat, zodat Producten niet dubbel loopt en
 * Clubactie wel naar `/clubactie` wijst. Losse items plus contact vormen
 * de kolom Meer.
 */
export function footerKolommen(): FooterKolom[] {
  const metKinderen = navigatie.filter(heeftKinderen);
  const zonderKinderen = navigatie.filter((item) => !heeftKinderen(item));

  const kolommen: FooterKolom[] = metKinderen.map((item) => {
    const ouder: NavigatieLink = { href: item.href, label: item.label };
    const ouderStaatErin = item.kinderen.some((kind) => kind.href === ouder.href);

    return {
      titel: item.label,
      links: ouderStaatErin ? item.kinderen : [ouder, ...item.kinderen],
    };
  });

  kolommen.push({
    titel: "Meer",
    links: [
      ...zonderKinderen.map(({ href, label }) => ({ href, label })),
      contactLink,
    ],
  });

  return kolommen;
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
