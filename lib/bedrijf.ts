import { getSiteUrl } from "@/lib/site-url";

export const BEDRIJFSNAAM = "Zonneplaneet B.V.";
export const KVK_NUMMER = "98474960";

export const VESTIGING = {
  straat: "Cruquiusweg 6",
  postcode: "6827 BL",
  plaats: "Arnhem",
} as const;

/** TODO: telefoonnummer aanleveren. */
export const TELEFOON = "";

export const EMAIL = "zonneplaneetactie@gmail.com";

export function isBedrijfsVeldGevuld(waarde: string | undefined): boolean {
  const tekst = waarde?.trim() ?? "";

  if (tekst === "") {
    return false;
  }

  return !/^TODO\b/i.test(tekst);
}

export function formatteerVestigingsadres(): string | null {
  if (
    !isBedrijfsVeldGevuld(VESTIGING.straat) ||
    !isBedrijfsVeldGevuld(VESTIGING.postcode) ||
    !isBedrijfsVeldGevuld(VESTIGING.plaats)
  ) {
    return null;
  }

  return `${VESTIGING.straat}, ${VESTIGING.postcode} ${VESTIGING.plaats}`;
}

export type Bedrijfsgegeven = {
  label: string;
  waarde: string;
  href?: string;
};

export function footerBedrijfsgegevens(): Bedrijfsgegeven[] {
  const regels: Bedrijfsgegeven[] = [
    { label: "Bedrijfsnaam", waarde: BEDRIJFSNAAM },
    { label: "KvK-nummer", waarde: KVK_NUMMER },
  ];

  const adres = formatteerVestigingsadres();
  if (adres) {
    regels.push({ label: "Vestigingsadres", waarde: adres });
  }

  if (isBedrijfsVeldGevuld(TELEFOON)) {
    regels.push({
      label: "Telefoon",
      waarde: TELEFOON,
      href: `tel:${TELEFOON}`,
    });
  }

  if (isBedrijfsVeldGevuld(EMAIL)) {
    regels.push({
      label: "E-mail",
      waarde: EMAIL,
      href: `mailto:${EMAIL}`,
    });
  }

  return regels;
}

export function contactBedrijfsgegevens(): Bedrijfsgegeven[] {
  const regels: Bedrijfsgegeven[] = [
    { label: "Bedrijfsnaam", waarde: BEDRIJFSNAAM },
    { label: "KvK-nummer", waarde: KVK_NUMMER },
  ];

  const adres = formatteerVestigingsadres();
  if (adres) {
    regels.push({ label: "Vestigingsadres", waarde: adres });
  }

  if (isBedrijfsVeldGevuld(EMAIL)) {
    regels.push({
      label: "E-mail",
      waarde: EMAIL,
      href: `mailto:${EMAIL}`,
    });
  }

  if (isBedrijfsVeldGevuld(TELEFOON)) {
    regels.push({
      label: "Telefoon",
      waarde: TELEFOON,
      href: `tel:${TELEFOON}`,
    });
  }

  return regels;
}

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BEDRIJFSNAAM,
    url: siteUrl,
    logo: new URL("/logo-zonneplaneet-navy.png", siteUrl).toString(),
    identifier: {
      "@type": "PropertyValue",
      name: "KvK",
      value: KVK_NUMMER,
    },
  };

  if (isBedrijfsVeldGevuld(EMAIL)) {
    jsonLd.email = EMAIL;
  }

  const adres = formatteerVestigingsadres();
  if (adres) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: VESTIGING.straat,
      postalCode: VESTIGING.postcode,
      addressLocality: VESTIGING.plaats,
      addressCountry: "NL",
    };
  }

  if (isBedrijfsVeldGevuld(TELEFOON)) {
    jsonLd.telephone = TELEFOON;
  }

  return jsonLd;
}
