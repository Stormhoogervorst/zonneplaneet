"use server";

import { getClub } from "@/lib/clubs";
import {
  bewaarActieLead,
  bewaarContactbericht,
  bewaarLead,
  bewaarLedenLead,
  bewaarPartnerLead,
  bewaarReferralLead,
  logLeadNietVerzonden,
  logLeadVerzonden,
} from "@/lib/leads";
import {
  stuurActieAanmelding,
  stuurPartnerAanmelding,
} from "@/lib/mail";
import { magAanmelden } from "@/lib/rate-limit";
import {
  aanmeldingSchema,
  actieAanmeldingSchema,
  contactSchema,
  ledenAanmeldingSchema,
  normaliseerTelefoon,
  partnerAanmeldingSchema,
  referralSchema,
  type AanmeldState,
  type ContactState,
  type FormulierState,
  type PartnerAanmeldState,
} from "@/lib/validatie";

export async function meldAan(
  prevState: AanmeldState,
  formData: FormData,
): Promise<AanmeldState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    const clubcode = formData.get("clubcode");
    return {
      success: true,
      clubcode: typeof clubcode === "string" ? clubcode : undefined,
    };
  }

  if (!(await magAanmelden("lidaanmelding"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak geprobeerd je aan te melden. Wacht even en probeer het later opnieuw.",
    };
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
  };

  let lead;
  try {
    lead = await bewaarLead(aanmelding);
  } catch (fout) {
    console.error(
      "Lead opslaan mislukt; er is niets naar Web3Forms gestuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  return {
    success: false,
    magVerzenden: true,
    leadId: lead.id,
    lead,
    clubcode: lead.clubcode,
  };
}

export async function meldLidAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return { success: true };
  }

  if (!(await magAanmelden("lidaanmelding"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak geprobeerd je aan te melden. Wacht even en probeer het later opnieuw.",
    };
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

  let lead;
  try {
    lead = await bewaarLedenLead(aanmelding);
  } catch (fout) {
    console.error(
      "Lead opslaan mislukt; er is niets naar Web3Forms gestuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  return {
    success: false,
    magVerzenden: true,
    leadId: lead.id,
    lead,
  };
}

export async function meldClubAan(
  prevState: PartnerAanmeldState,
  formData: FormData,
): Promise<PartnerAanmeldState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return { success: true };
  }

  if (!(await magAanmelden("partneraanmelding"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak geprobeerd je club aan te melden. Wacht even en probeer het later opnieuw.",
    };
  }

  const resultaat = partnerAanmeldingSchema.safeParse({
    clubnaam: formData.get("clubnaam"),
    plaats: formData.get("plaats"),
    contactpersoon: formData.get("contactpersoon"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon"),
    ledenaantal: formData.get("ledenaantal"),
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

  let lead;
  try {
    lead = await bewaarPartnerLead(aanmelding);
  } catch (fout) {
    console.error(
      "Partneraanmelding opslaan mislukt; er is geen mail verstuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  try {
    await stuurPartnerAanmelding(lead);
    logLeadVerzonden(lead.id, "partner");
  } catch (fout) {
    console.error("Mail over partneraanmelding mislukt.", {
      leadId: lead.id,
      fout,
    });
    logLeadNietVerzonden(lead);
  }

  return { success: true, meetConversie: true };
}

export async function stuurContact(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return { success: true };
  }

  if (!(await magAanmelden("contactbericht"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak een bericht verstuurd. Wacht even en probeer het later opnieuw.",
    };
  }

  const resultaat = contactSchema.safeParse({
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon") ?? "",
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
    telefoon:
      resultaat.data.telefoon === ""
        ? ""
        : normaliseerTelefoon(resultaat.data.telefoon),
  };

  let lead;
  try {
    lead = await bewaarContactbericht(bericht);
  } catch (fout) {
    console.error(
      "Contactbericht opslaan mislukt; er is niets naar Web3Forms gestuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je bericht kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  return {
    success: false,
    magVerzenden: true,
    leadId: lead.id,
    lead,
  };
}

export async function meldActieAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return { success: true };
  }

  if (!(await magAanmelden("actieaanmelding"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak geprobeerd je aan te melden. Wacht even en probeer het later opnieuw.",
    };
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

  let lead;
  try {
    lead = await bewaarActieLead(aanmelding);
  } catch (fout) {
    console.error(
      "Actie-aanmelding opslaan mislukt; er is geen mail verstuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  const mailResultaten = await Promise.allSettled([stuurActieAanmelding(lead)]);
  const mailNamen = ["actie-aanmelding naar Zonneplaneet Actie"];
  let actieVerzonden = true;

  mailResultaten.forEach((mailResultaat, index) => {
    if (mailResultaat.status === "rejected") {
      actieVerzonden = false;
      console.error(`Mail mislukt: ${mailNamen[index]}.`, {
        leadId: lead.id,
        actie: lead.actie,
        fout: mailResultaat.reason,
      });
    }
  });

  if (actieVerzonden) {
    logLeadVerzonden(lead.id, lead.actie);
  } else {
    logLeadNietVerzonden(lead);
  }

  return { success: true, meetConversie: true };
}

export async function meldReferralAan(
  prevState: FormulierState,
  formData: FormData,
): Promise<FormulierState> {
  void prevState;

  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return { success: true };
  }

  if (!(await magAanmelden("referral"))) {
    return {
      success: false,
      message:
        "Je hebt te vaak geprobeerd iemand aan te dragen. Wacht even en probeer het later opnieuw.",
    };
  }

  const resultaat = referralSchema.safeParse({
    aandragerNaam: formData.get("aandragerNaam"),
    aandragerEmail: formData.get("aandragerEmail"),
    aandragerTelefoon: formData.get("aandragerTelefoon") ?? "",
    voornaam: formData.get("voornaam"),
    achternaam: formData.get("achternaam"),
    email: formData.get("email"),
    telefoon: formData.get("telefoon"),
    plaats: formData.get("plaats"),
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
    aandragerTelefoon:
      resultaat.data.aandragerTelefoon === ""
        ? ""
        : normaliseerTelefoon(resultaat.data.aandragerTelefoon),
    telefoon: normaliseerTelefoon(resultaat.data.telefoon),
  };

  let lead;
  try {
    lead = await bewaarReferralLead(aanmelding);
  } catch (fout) {
    console.error(
      "Referral opslaan mislukt; er is niets naar Web3Forms gestuurd.",
      fout,
    );
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  return {
    success: false,
    magVerzenden: true,
    leadId: lead.id,
    lead,
  };
}

export async function logWeb3FormsGelukt(
  leadId: string,
  actie: string,
): Promise<void> {
  logLeadVerzonden(leadId, actie);
}

export async function logWeb3FormsMislukt(lead: unknown): Promise<void> {
  logLeadNietVerzonden(lead);
}
