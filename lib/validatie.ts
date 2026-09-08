import { z } from "zod";

export const interesses = ["panelen", "batterij", "beide", "laadpaal"] as const;

export const aanmeldingSchema = z.object({
  naam: z
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
    .boolean({ error: "Geef toestemming om je gegevens door te sturen." })
    .refine(
      (akkoord) => akkoord,
      "Geef toestemming om je gegevens door te sturen.",
    ),
});

export type Aanmelding = z.infer<typeof aanmeldingSchema>;
export type AanmeldVeld = keyof Aanmelding;

export type AanmeldState = {
  success: boolean;
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
});

export type PartnerAanmelding = z.infer<typeof partnerAanmeldingSchema>;
export type PartnerAanmeldVeld = keyof PartnerAanmelding;

export type PartnerAanmeldState = {
  success: boolean;
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
  naam: z
    .string({ error: "Vul je naam in." })
    .trim()
    .min(2, "Vul je volledige naam in."),
  email: z
    .string({ error: "Vul je e-mailadres in." })
    .trim()
    .email("Vul een geldig e-mailadres in."),
  /* Optioneel: we hebben het e-mailadres al om te antwoorden. */
  telefoon: z
    .string()
    .trim()
    .refine(
      (telefoon) =>
        telefoon === "" ||
        /^\+31[1-9]\d{8}$/.test(normaliseerTelefoon(telefoon)),
      "Vul een geldig Nederlands telefoonnummer in, of laat dit veld leeg.",
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
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<ContactVeld, string[]>>;
};

/** De vorm van de action-state die `ContactFormulier` leest. */
export type FormulierState = {
  success: boolean;
  message?: string;
  meetConversie?: boolean;
  errors?: Partial<Record<string, string[]>>;
};

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
