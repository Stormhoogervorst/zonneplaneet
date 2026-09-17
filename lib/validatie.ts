import { z } from "zod";

export const interesses = ["panelen", "batterij", "beide", "laadpaal"] as const;

export const ledenInteresses = [
  "zonnepanelen",
  "thuisbatterij",
  "warmtepomp",
  "laadpaal",
  "weet-ik-nog-niet",
] as const;

export const ledenInteresseLabels: Record<
  (typeof ledenInteresses)[number],
  string
> = {
  zonnepanelen: "Zonnepanelen",
  thuisbatterij: "Thuisbatterij",
  warmtepomp: "Warmtepomp",
  laadpaal: "Laadpaal",
  "weet-ik-nog-niet": "Weet ik nog niet",
};

export const vervolgstappen = [
  "bellen",
  "showroom",
  "thuisbezoek",
  "informatie",
] as const;

export const vervolgstapLabels: Record<
  (typeof vervolgstappen)[number],
  string
> = {
  bellen: "Ik wil gebeld worden voor meer informatie",
  showroom: "Ik wil een afspraak in de showroom",
  thuisbezoek: "Ik wil een bezoek bij mij thuis",
  informatie: "Stuur me eerst informatie",
};

export type Vervolgstap = (typeof vervolgstappen)[number];

function naamDeel(leegMelding: string) {
  return z.string({ error: leegMelding }).trim().min(1, leegMelding);
}

const geldigEmailadres = z
  .string()
  .trim()
  .email("Vul een geldig e-mailadres in.");

/** Leeg wordt `null`; een ingevulde waarde moet een geldig adres zijn. */
export const optioneelEmailSchema = z
  .string()
  .trim()
  .transform((waarde) => (waarde === "" ? undefined : waarde))
  .pipe(geldigEmailadres.optional())
  .transform((waarde) => waarde ?? null);

export const aanmeldingSchema = z.object({
  voornaam: naamDeel("Vul je voornaam in."),
  achternaam: naamDeel("Vul je achternaam in."),
  email: optioneelEmailSchema,
  telefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  postcode: z
    .string({ error: "Vul je postcode in." })
    .trim()
    .regex(
      /^[1-9]\d{3}\s?[a-zA-Z]{2}$/,
      "Vul een geldige Nederlandse postcode in.",
    ),
  interesse: z.enum(interesses, {
    error: "Kies waar je interesse in hebt.",
  }),
  clubcode: z
    .string({ error: "Je clubcode ontbreekt." })
    .trim()
    .min(1, "Je clubcode ontbreekt."),
  clubslug: z
    .string({ error: "Je clubpagina ontbreekt." })
    .trim()
    .min(1, "Je clubpagina ontbreekt."),
  akkoord: z
    .boolean({ error: "Geef toestemming om je gegevens te gebruiken." })
    .refine(
      (akkoord) => akkoord,
      "Geef toestemming om je gegevens te gebruiken.",
    ),
});

export type Aanmelding = z.infer<typeof aanmeldingSchema>;
export type AanmeldVeld = keyof Aanmelding;

export const ledenAanmeldingSchema = z.object({
  voornaam: naamDeel("Vul je voornaam in."),
  achternaam: naamDeel("Vul je achternaam in."),
  telefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  email: optioneelEmailSchema,
  interesse: z.enum(ledenInteresses, {
    error: "Kies waar je interesse in hebt.",
  }),
  clubnaam: z
    .string({ error: "Vul de naam van je vereniging in." })
    .trim()
    .min(2, "Vul de naam van je vereniging in."),
  clubplaats: z
    .string({ error: "Vul de plaats van je vereniging in." })
    .trim()
    .min(2, "Vul de plaats van je vereniging in."),
  vervolgstap: z.enum(vervolgstappen, {
    error: "Kies wat je wilt.",
  }),
  actie: z.literal("clubactie", {
    error:
      "Deze actie is niet bekend. Open de pagina opnieuw en probeer het nog een keer.",
  }),
  akkoord: z
    .boolean({ error: "Geef toestemming om je gegevens te gebruiken." })
    .refine(
      (akkoord) => akkoord,
      "Geef toestemming om je gegevens te gebruiken.",
    ),
});

export type LedenAanmelding = z.infer<typeof ledenAanmeldingSchema>;
export type LedenAanmeldVeld = keyof LedenAanmelding;

export type AanmeldState = {
  success: boolean;
  magVerzenden?: boolean;
  leadId?: string;
  lead?: unknown;
  message?: string;
  clubcode?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<AanmeldVeld, string[]>>;
};

export const partnerAanmeldingSchema = z.object({
  clubnaam: z
    .string({ error: "Vul de naam van je club in." })
    .trim()
    .min(2, "Vul de volledige naam van je club in."),
  plaats: z
    .string({ error: "Vul de plaats van je club in." })
    .trim()
    .min(2, "Vul de plaats van je club in."),
  contactpersoon: z
    .string({ error: "Vul je naam in." })
    .trim()
    .min(2, "Vul je volledige naam in."),
  email: z
    .string({ error: "Vul je e-mailadres in." })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  telefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  ledenaantal: z.coerce
    .number({ error: "Vul in hoeveel leden je club heeft." })
    .int("Vul het aantal leden in als een heel getal.")
    .positive("Vul een aantal groter dan nul in."),
  opmerking: z.string().trim(),
  actie: z.literal("partner", {
    error:
      "Deze actie is niet bekend. Open de pagina opnieuw en probeer het nog een keer.",
  }),
});

export type PartnerAanmelding = z.infer<typeof partnerAanmeldingSchema>;
export type PartnerAanmeldVeld = keyof PartnerAanmelding;

export type PartnerAanmeldState = {
  success: boolean;
  magVerzenden?: boolean;
  leadId?: string;
  lead?: unknown;
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<PartnerAanmeldVeld, string[]>>;
};

export const contactRollen = ["lid", "bestuurslid", "anders"] as const;

/* Deze labels staan in het keuzeveld én in de onderwerpregel van de mail, zodat
   een bericht meteen bij de clubwerving of de leden-afhandeling terechtkomt. */
export const contactRolLabels: Record<(typeof contactRollen)[number], string> =
  {
    lid: "lid van een vereniging",
    bestuurslid: "bestuurslid",
    anders: "anders",
  };

export const contactSchema = z.object({
  voornaam: naamDeel("Vul je voornaam in."),
  achternaam: naamDeel("Vul je achternaam in."),
  email: z
    .string({ error: "Vul je e-mailadres in." })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  telefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  rol: z.enum(contactRollen, {
    error:
      "Kies wat voor jou geldt, zodat je bericht bij de juiste persoon komt.",
  }),
  bericht: z
    .string({ error: "Vul je bericht in." })
    .trim()
    .min(10, "Schrijf in een paar woorden waar je vraag over gaat."),
});

export type Contactbericht = z.infer<typeof contactSchema>;
export type ContactVeld = keyof Contactbericht;

export type ContactState = {
  success: boolean;
  magVerzenden?: boolean;
  leadId?: string;
  lead?: unknown;
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<ContactVeld, string[]>>;
};

/** De vorm van de action-state die `ContactFormulier` leest. */
export type FormulierState = {
  success: boolean;
  magVerzenden?: boolean;
  leadId?: string;
  lead?: unknown;
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<string, string[]>>;
};

/** Honeypot: bots vullen dit, mensen niet. De naam lijkt niet op een echt veld. */
export const HONEYPOT_VELD = "bedrijfsnaam-controle";

export function honeypotGevuld(formData: FormData): boolean {
  const waarde = formData.get(HONEYPOT_VELD);
  return typeof waarde === "string" && waarde.trim() !== "";
}

export const actieTypen = ["cashback", "winactie"] as const;

export const actieAanmeldingSchema = z.object({
  voornaam: naamDeel("Vul je voornaam in."),
  achternaam: naamDeel("Vul je achternaam in."),
  email: z
    .string({ error: "Vul je e-mailadres in." })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  telefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  postcode: z
    .string({ error: "Vul je postcode in." })
    .trim()
    .regex(
      /^[1-9]\d{3}\s?[a-zA-Z]{2}$/,
      "Vul een geldige Nederlandse postcode in.",
    ),
  actie: z.enum(actieTypen, {
    error:
      "Deze actie is niet bekend. Open de pagina opnieuw en probeer het nog een keer.",
  }),
  akkoord: z
    .boolean({ error: "Geef toestemming om je gegevens te gebruiken." })
    .refine(
      (akkoord) => akkoord,
      "Geef toestemming om je gegevens te gebruiken.",
    ),
});

export type ActieType = (typeof actieTypen)[number];
export type ActieAanmelding = z.infer<typeof actieAanmeldingSchema>;
export type ActieAanmeldVeld = keyof ActieAanmelding;

export type ActieAanmeldState = {
  success: boolean;
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<ActieAanmeldVeld, string[]>>;
};

export const referralInteresses = [
  "zonnepanelen",
  "thuisbatterij",
  "warmtepomp",
  "laadpaal",
  "weet-ik-niet",
] as const;

export const referralInteresseLabels: Record<
  (typeof referralInteresses)[number],
  string
> = {
  zonnepanelen: "Zonnepanelen",
  thuisbatterij: "Thuisbatterij",
  warmtepomp: "Warmtepomp",
  laadpaal: "Laadpaal",
  "weet-ik-niet": "Weet ik niet",
};

export const referralSchema = z.object({
  aandragerNaam: z
    .string({ error: "Vul je naam in." })
    .trim()
    .min(2, "Vul je volledige naam in."),
  aandragerEmail: z
    .string({ error: "Vul je e-mailadres in." })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  aandragerTelefoon: z
    .string({ error: "Vul je telefoonnummer in." })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  voornaam: naamDeel("Vul de voornaam in van de persoon die je aandraagt."),
  achternaam: naamDeel("Vul de achternaam in van de persoon die je aandraagt."),
  email: z
    .string({
      error: "Vul het e-mailadres in van de persoon die je aandraagt.",
    })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  telefoon: z
    .string({
      error: "Vul het telefoonnummer in van de persoon die je aandraagt.",
    })
    .trim()
    .refine(
      (telefoon) => /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in.",
    ),
  plaats: z
    .string({ error: "Vul de plaats in van de persoon die je aandraagt." })
    .trim()
    .min(2, "Vul de plaats in van de persoon die je aandraagt."),
  interesse: z.enum(referralInteresses, {
    error: "Kies waar diegene interesse in heeft.",
  }),
  opmerking: z.string().trim(),
  actie: z.literal("referral", {
    error:
      "Deze actie is niet bekend. Open de pagina opnieuw en probeer het nog een keer.",
  }),
  toestemming: z
    .boolean({
      error: "Bevestig dat je toestemming hebt om deze gegevens door te geven.",
    })
    .refine(
      (toestemming) => toestemming,
      "Bevestig dat je toestemming hebt om deze gegevens door te geven.",
    ),
});

export type ReferralAanmelding = z.infer<typeof referralSchema>;
export type ReferralVeld = keyof ReferralAanmelding;

export function normaliseerTelefoon(telefoon: string): string {
  let nummer = telefoon.trim().replace(/[()\s.-]/g, "");

  if (nummer.startsWith("0031")) {
    nummer = `+31${nummer.slice(4)}`;
  }

  if (nummer.startsWith("+310")) {
    nummer = `+31${nummer.slice(4)}`;
  }

  if (nummer.startsWith("0")) {
    nummer = `+31${nummer.slice(1)}`;
  }

  return nummer;
}
