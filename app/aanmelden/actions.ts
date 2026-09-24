"use server";

import { getClub } from "@/lib/clubs";
import { meldingVoorLaadtijd } from "@/lib/laadtijd";
import { verwerkLead } from "@/lib/lead-verwerking";
import {
  afzenderVoorLead,
  onderwerpVoorLead,
  veldenVoorLeadMail,
} from "@/lib/mail";
import {
  aanmeldingSchema,
  actieAanmeldingSchema,
  contactSchema,
  FORMULIER_GELADEN_VELD,
  FORMULIER_VERZONDEN_VELD,
  honeypotGevuld,
  ledenAanmeldingSchema,
  normaliseerTelefoon,
  partnerAanmeldingSchema,
  referralSchema,
  type AanmeldState,
  type ContactState,
  type FormulierState,
  type PartnerAanmeldState,
} from "@/lib/validatie";

const VERZENDFOUT = "Verzenden is mislukt. Probeer het later opnieuw.";

function teSnelVerzonden(formData: FormData): string | undefined {
  // TODO: rate limiting per IP. Een teller in het proces deelt geen staat
  // tussen Vercel-instances. Dat vraagt aparte infra, bijvoorbeeld Upstash.
  return meldingVoorLaadtijd(
    formData.get(FORMULIER_GELADEN_VELD),
    formData.get(FORMULIER_VERZONDEN_VELD),
  );
}

function stopBijHoneypot(formData: FormData, type: string): boolean {
  if (!honeypotGevuld(formData)) {
    return false;
  }

  console.warn(type, "honeypot");
  return true;
}

function tekstVan(waarde: unknown): string | undefined {
  if (waarde == null) {
    return undefined;
  }

  const tekst = String(waarde).trim();
  return tekst === "" ? undefined : tekst;
}

function mailVelden(
  bron: Record<string, unknown>,
  vinkjes: readonly string[],
): Record<string, string> {
  const velden: Record<string, string> = {};

  for (const [naam, waarde] of Object.entries(bron)) {
    if (vinkjes.includes(naam)) {
      velden[naam] = waarde === true ? "ja" : "nee";
      continue;
    }

    const tekst = tekstVan(waarde);
    if (tekst !== undefined) {
      velden[naam] = tekst;
    }
  }

  return velden;
}

async function verstuurLead(
  type: string,
  velden: Record<string, string>,
): Promise<FormulierState> {
  const afzender = afzenderVoorLead(type, velden);
  const resultaat = await verwerkLead({
    type,
    subject: onderwerpVoorLead(type, velden),
    ...afzender,
    velden: veldenVoorLeadMail(type, velden),
  });

  if (!resultaat.ok) {
    return { success: false, message: VERZENDFOUT };
  }

  return { success: true, meetConversie: true };
}

export async function meldAan(
  prevState: AanmeldState,
  formData: FormData,
): Promise<AanmeldState> {
  void prevState;

  if (stopBijHoneypot(formData, "clubactie")) {
    const clubcode = formData.get("clubcode");
    return {
      success: true,
      clubcode: typeof clubcode === "string" ? clubcode : undefined,
    };
  }

  const tijdFoutAan = teSnelVerzonden(formData);
  if (tijdFoutAan) {
    return { success: false, message: tijdFoutAan };
  }

  const resultaat = aanmeldingSchema.safeParse({
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    email: formData.get("email") ?? "",
    telefoon: formData.get("telefoon"),
    postcode: formData.get("postcode"),
    interesse: formData.get("interesse"),
    clubcode: formData.get("clubcode"),
    clubslug: formData.get("clubslug"),
    akkoord: formData.get("akkoord") === "on",
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const club = getClub(resultaat.data.clubslug);
  if (!club || club.code !== resultaat.data.clubcode) {
    return {
      success: false,
      message:
        "Deze clubgegevens kloppen niet. Open de clubpagina opnieuw en probeer het nog een keer.",
    };
  }

  const aanmelding = {
    ...resultaat.data,
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
    postcode: resultaat.data.postcode.toUpperCase(),
    actie: "clubactie",
    clubnaam: club.naam,
  };

  return verstuurLead("clubactie", mailVelden(aanmelding, ["akkoord"]));
}

export async function meldLidAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  if (stopBijHoneypot(formData, "clubactie")) {
    return { success: true };
  }

  const tijdFoutLid = teSnelVerzonden(formData);
  if (tijdFoutLid) {
    return { success: false, message: tijdFoutLid };
  }

  const resultaat = ledenAanmeldingSchema.safeParse({
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    telefoon: formData.get("telefoon"),
    email: formData.get("email") ?? "",
    interesse: formData.get("interesse"),
    clubnaam: formData.get("clubnaam"),
    clubplaats: formData.get("clubplaats"),
    vervolgstap: formData.get("vervolgstap"),
    actie: formData.get("actie"),
    akkoord: formData.get("akkoord") === "on",
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const aanmelding = {
    ...resultaat.data,
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
  };

  return verstuurLead("clubactie", mailVelden(aanmelding, ["akkoord"]));
}

export async function meldClubAan(
  prevState: PartnerAanmeldState,
  formData: FormData,
): Promise<PartnerAanmeldState> {
  void prevState;

  if (stopBijHoneypot(formData, "partner")) {
    return { success: true };
  }

  const tijdFoutClub = teSnelVerzonden(formData);
  if (tijdFoutClub) {
    return { success: false, message: tijdFoutClub };
  }

  const resultaat = partnerAanmeldingSchema.safeParse({
    clubnaam: formData.get("clubnaam"),
    plaats: formData.get("plaats"),
    contactpersoon: formData.get("contactpersoon"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon"),
    ledenaantal: formData.get("ledenaantal"),
    opmerking: formData.get("opmerking") ?? "",
    actie: formData.get("actie"),
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const aanmelding = {
    ...resultaat.data,
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
  };

  return verstuurLead("partner", mailVelden(aanmelding, []));
}

export async function stuurContact(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  void prevState;

  if (stopBijHoneypot(formData, "contact")) {
    return { success: true };
  }

  const tijdFoutContact = teSnelVerzonden(formData);
  if (tijdFoutContact) {
    return { success: false, message: tijdFoutContact };
  }

  const resultaat = contactSchema.safeParse({
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon"),
    rol: formData.get("rol"),
    bericht: formData.get("bericht"),
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const bericht = {
    ...resultaat.data,
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
    actie: "contact",
  };

  return verstuurLead("contact", mailVelden(bericht, []));
}

export async function meldActieAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  const actieType = formData.get("actie");
  if (
    stopBijHoneypot(
      formData,
      actieType === "cashback" || actieType === "winactie"
        ? actieType
        : "actie",
    )
  ) {
    return { success: true };
  }

  const tijdFoutActie = teSnelVerzonden(formData);
  if (tijdFoutActie) {
    return { success: false, message: tijdFoutActie };
  }

  const resultaat = actieAanmeldingSchema.safeParse({
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon"),
    postcode: formData.get("postcode"),
    actie: formData.get("actie"),
    akkoord: formData.get("akkoord") === "on",
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const aanmelding = {
    ...resultaat.data,
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
    postcode: resultaat.data.postcode.toUpperCase(),
  };

  return verstuurLead(
    resultaat.data.actie,
    mailVelden(aanmelding, ["akkoord"]),
  );
}

export async function meldReferralAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  if (stopBijHoneypot(formData, "referral")) {
    return { success: true };
  }

  const tijdFoutReferral = teSnelVerzonden(formData);
  if (tijdFoutReferral) {
    return { success: false, message: tijdFoutReferral };
  }

  const resultaat = referralSchema.safeParse({
    aandragerNaam: formData.get("aandragerNaam"),
    aandragerEmail: formData.get("aandragerEmail"),
    aandragerTelefoon: formData.get("aandragerTelefoon"),
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    telefoon: formData.get("telefoon"),
    interesse: formData.get("interesse"),
    opmerking: formData.get("opmerking") ?? "",
    actie: formData.get("actie"),
    toestemming: formData.get("toestemming") === "on",
  });

  if (!resultaat.success) {
    return {
      success: false,
      message: "Controleer de gemarkeerde velden en probeer het opnieuw.",
      errors: resultaat.error.flatten().fieldErrors,
    };
  }

  const aanmelding = {
    ...resultaat.data,
    aandragerTelefoon: normaliseerTelefoon(resultaat.data.aandragerTelefoon),
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
  };

  return verstuurLead("referral", mailVelden(aanmelding, ["toestemming"]));
}
