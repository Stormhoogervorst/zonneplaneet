export const web3formsActies = ["contact", "clubactie", "referral"] as const;
export type Web3FormsActie = (typeof web3formsActies)[number];

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const sleutels: Record<Web3FormsActie, string | undefined> = {
  contact: process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY,
  clubactie: process.env.NEXT_PUBLIC_WEB3FORMS_LEDEN_KEY,
  referral: process.env.NEXT_PUBLIC_WEB3FORMS_REFERRAL_KEY,
};

const sleutelNamen: Record<Web3FormsActie, string> = {
  contact: "NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY",
  clubactie: "NEXT_PUBLIC_WEB3FORMS_LEDEN_KEY",
  referral: "NEXT_PUBLIC_WEB3FORMS_REFERRAL_KEY",
};

function isWeb3FormsActie(actie: string): actie is Web3FormsActie {
  return (web3formsActies as readonly string[]).includes(actie);
}

export function web3formsSleutel(actie: string): string {
  if (!isWeb3FormsActie(actie)) {
    throw new Error(
      `Onbekend formuliertype "${actie}". Verwachte waarden: contact, clubactie of referral.`,
    );
  }

  const sleutel = sleutels[actie]?.trim();
  if (!sleutel) {
    throw new Error(
      `Web3Forms-sleutel ontbreekt voor ${actie}. Zet ${sleutelNamen[actie]} in de omgevingsvariabelen.`,
    );
  }

  return sleutel;
}

function veldenUitFormulier(formData: FormData): Record<string, string> {
  const velden: Record<string, string> = {};

  for (const [naam, waarde] of formData.entries()) {
    if (naam === "website" || typeof waarde !== "string") {
      continue;
    }
    velden[naam] = waarde;
  }

  return velden;
}

function onderwerpVoor(
  actie: Web3FormsActie,
  velden: Record<string, string>,
): string {
  if (actie === "contact") {
    return velden.rol
      ? `Nieuw contactbericht: ${velden.rol}`
      : "Nieuw contactbericht";
  }

  if (actie === "referral") {
    const aangedragene = `${velden.voornaam ?? ""} ${velden.achternaam ?? ""}`.trim();
    return aangedragene
      ? `Referral — ${aangedragene} via ${velden.aandragerNaam ?? ""}`.trim()
      : "Referral";
  }

  const club = velden.clubnaam || velden.clubcode;
  return club ? `Aanmelding clubactie — ${club}` : "Aanmelding clubactie";
}

export async function verstuurViaWeb3Forms(
  formData: FormData,
  leadId: string,
): Promise<void> {
  const actie = String(formData.get("actie") ?? "").trim();
  if (!isWeb3FormsActie(actie)) {
    throw new Error(
      `Onbekend formuliertype "${actie}". Verwachte waarden: contact, clubactie of referral.`,
    );
  }

  const velden = veldenUitFormulier(formData);
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: web3formsSleutel(actie),
      ...velden,
      lead_id: leadId,
      subject: onderwerpVoor(actie, velden),
    }),
  });

  let data: { success?: boolean; message?: string };
  try {
    data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };
  } catch (fout) {
    throw new Error(
      `Web3Forms gaf geen geldig JSON-antwoord (${response.status}).`,
      { cause: fout },
    );
  }

  if (response.status !== 200 || data.success !== true) {
    throw new Error(
      `Web3Forms-verzending mislukt (${response.status}): ${
        data.message ?? "onbekende fout"
      }`,
    );
  }
}
