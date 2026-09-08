"use server";

import { getClub } from "@/lib/clubs";
import { bewaarLead, bewaarPartnerLead } from "@/lib/leads";
import {
  stuurBevestiging,
  stuurDoorNaarZonneplaneet,
  stuurPartnerAanmelding,
} from "@/lib/mail";
import { magAanmelden } from "@/lib/rate-limit";
import {
  aanmeldingSchema,
  normaliseerTelefoon,
  partnerAanmeldingSchema,
  type AanmeldState,
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
    naam: formData.get("naam"),
    email: formData.get("email"),
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
    console.error("Lead opslaan mislukt; er zijn geen mails verstuurd.", fout);
    return {
      success: false,
      message:
        "Je aanmelding kon niet worden opgeslagen. Probeer het later opnieuw.",
    };
  }

  const mailResultaten = await Promise.allSettled([
    stuurBevestiging(lead),
    stuurDoorNaarZonneplaneet(lead, club),
  ]);
  const mailNamen = ["bevestiging aan lid", "doorzending naar Zonneplaneet"];

  mailResultaten.forEach((mailResultaat, index) => {
    if (mailResultaat.status === "rejected") {
      console.error(`Mail mislukt: ${mailNamen[index]}.`, {
        leadId: lead.id,
        fout: mailResultaat.reason,
      });
    }
  });

  return {
    success: true,
    clubcode: lead.clubcode,
    meetConversie: true,
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
  } catch (fout) {
    console.error("Mail over partneraanmelding mislukt.", {
      leadId: lead.id,
      fout,
    });
  }

  return { success: true, meetConversie: true };
}
