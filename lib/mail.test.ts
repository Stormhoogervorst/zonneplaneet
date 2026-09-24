import assert from "node:assert/strict";
import test from "node:test";

import {
  afzenderVoorLead,
  bouwLeadMail,
  onderwerpVoorLead,
  veldenVoorLeadMail,
} from "./mail";

test("subject per formuliertype", () => {
  assert.equal(
    onderwerpVoorLead("contact", { rol: "bestuurslid" }),
    "Nieuw contactbericht: bestuurslid",
  );
  assert.equal(onderwerpVoorLead("contact", {}), "Nieuw contactbericht");
  assert.equal(
    onderwerpVoorLead("referral", {
      voornaam: "Sam",
      achternaam: "de Vries",
      aandragerNaam: "Noor",
    }),
    "Referral — Sam de Vries via Noor",
  );
  assert.equal(onderwerpVoorLead("referral", {}), "Referral");
  assert.equal(
    onderwerpVoorLead("partner", { clubnaam: "SV Noord" }),
    "Nieuwe clubaanmelding: SV Noord",
  );
  assert.equal(
    onderwerpVoorLead("cashback", {}),
    "Nieuwe aanmelding: cashback",
  );
  assert.equal(
    onderwerpVoorLead("clubactie", { clubcode: "NOORD" }),
    "Aanmelding clubactie — NOORD",
  );
});

test("afzender en replyTo hangen van het formuliertype af", () => {
  assert.deepEqual(
    afzenderVoorLead("referral", {
      aandragerNaam: "Noor",
      aandragerEmail: "noor@example.nl",
      email: "sam@example.nl",
    }),
    { fromName: "Noor", replyTo: "noor@example.nl" },
  );
  assert.deepEqual(
    afzenderVoorLead("partner", {
      contactpersoon: "Piet",
      email: "piet@club.nl",
    }),
    { fromName: "Piet", replyTo: "piet@club.nl" },
  );
  assert.deepEqual(
    afzenderVoorLead("contact", {
      voornaam: "Jan",
      achternaam: "Jansen",
      email: "jan@example.nl",
    }),
    { fromName: "Jan Jansen", replyTo: "jan@example.nl" },
  );
  assert.deepEqual(afzenderVoorLead("clubactie", {}), {});
});

test("Nederlandse labels en Samenvatting", () => {
  const velden = veldenVoorLeadMail("referral", {
    voornaam: "Sam",
    interesse: "zonnepanelen",
  });

  assert.equal(velden["Voornaam van de aangedragene"], "Sam");
  assert.equal(velden["Interesse van de aangedragene"], "Zonnepanelen");
  assert.match(velden.Samenvatting, /Voornaam van de aangedragene: Sam/);
  assert.match(
    velden.Samenvatting,
    /Interesse van de aangedragene: Zonnepanelen/,
  );
});

test("html escapet alle gebruikersinvoer", () => {
  const bericht = bouwLeadMail({
    type: "contact",
    subject: "Nieuw contactbericht",
    fromName: `Ann <script>`,
    leadId: `lead"1`,
    velden: {
      Bericht: `Hallo <b>daar</b> & "tot ziens"`,
    },
  });

  assert.equal(bericht.html.includes("<script>"), false);
  assert.equal(bericht.html.includes("<b>"), false);
  assert.match(bericht.html, /Ann &lt;script&gt;/);
  assert.match(bericht.html, /lead&quot;1/);
  assert.match(
    bericht.html,
    /Hallo &lt;b&gt;daar&lt;\/b&gt; &amp; &quot;tot ziens&quot;/,
  );
  assert.match(bericht.html, /Formulier:/);
  assert.match(bericht.html, /Lead-id:/);
  assert.match(bericht.text, /Hallo <b>daar<\/b>/);
});

test("regeleinden verdwijnen uit subject, fromName en replyTo", () => {
  const bericht = bouwLeadMail({
    type: "contact",
    subject: "Nieuw contactbericht\r\nBcc: kwaad@example.nl",
    fromName: "Jan\nJansen",
    replyTo: "jan@example.nl\r\nBcc: kwaad@example.nl",
    leadId: "lead-1",
    velden: { Bericht: "Hoi" },
  });

  assert.equal(bericht.subject.includes("\n"), false);
  assert.equal(bericht.subject.includes("\r"), false);
  assert.equal(bericht.subject, "Nieuw contactbericht Bcc: kwaad@example.nl");
  assert.equal(bericht.fromName, "Jan Jansen");
  assert.equal(bericht.replyTo, undefined);
});

test("replyTo ontbreekt zonder geldig e-mailadres", () => {
  const zonder = bouwLeadMail({
    type: "contact",
    subject: "Nieuw contactbericht",
    leadId: "lead-1",
    velden: { Bericht: "Hoi" },
  });
  const ongeldig = bouwLeadMail({
    type: "contact",
    subject: "Nieuw contactbericht",
    replyTo: "geen-adres",
    leadId: "lead-1",
    velden: { Bericht: "Hoi" },
  });
  const geldig = bouwLeadMail({
    type: "contact",
    subject: "Nieuw contactbericht",
    replyTo: " jan@example.nl ",
    leadId: "lead-1",
    velden: { Bericht: "Hoi" },
  });

  assert.equal(zonder.replyTo, undefined);
  assert.equal(ongeldig.replyTo, undefined);
  assert.equal(geldig.replyTo, "jan@example.nl");
});

test("Samenvatting wordt toegevoegd als die ontbreekt", () => {
  const bericht = bouwLeadMail({
    type: "clubactie",
    subject: "Aanmelding clubactie",
    leadId: "lead-9",
    velden: { Voornaam: "Kim" },
  });

  assert.match(bericht.text, /Samenvatting: Voornaam: Kim/);
  assert.match(bericht.html, /Formulier:.*Clubactie/);
  assert.match(bericht.html, /lead-9/);
});
