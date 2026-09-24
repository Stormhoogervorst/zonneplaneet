import assert from "node:assert/strict";
import test from "node:test";

import { verwerkLead, type VerwerkLeadInvoer } from "./lead-verwerking";
import type { LeadMailInvoer, LeadMailResultaat } from "./mail";

const invoer: VerwerkLeadInvoer = {
  type: "contact",
  subject: "Nieuw contactbericht",
  fromName: "Jan Jansen",
  replyTo: "jan@example.nl",
  velden: {
    Naam: "Jan Jansen",
    Telefoonnummer: "0612345678",
    "E-mailadres": "jan@example.nl",
    Bericht: "Graag bellen",
  },
};

function mislukt(
  code: string,
  statusCode: number | null,
  error = "Resend-fout",
): LeadMailResultaat {
  return { ok: false, error, code, statusCode };
}

async function metLog(run: () => Promise<void>): Promise<unknown[][]> {
  const regels: unknown[][] = [];
  const origineel = console.error;
  console.error = (...args: unknown[]) => {
    regels.push(args);
  };
  try {
    await run();
  } finally {
    console.error = origineel;
  }
  return regels;
}

function zonderPersoonsgegevens(regels: unknown[][]): void {
  const tekst = JSON.stringify(regels);
  assert.equal(tekst.includes("Jan Jansen"), false);
  assert.equal(tekst.includes("jan@example.nl"), false);
  assert.equal(tekst.includes("0612345678"), false);
  assert.equal(tekst.includes("Graag bellen"), false);
}

test("succes geeft het Lead-id terug en verstuurt één keer", async () => {
  const pogingen: LeadMailInvoer[] = [];
  let gewacht = 0;
  const regels = await metLog(async () => {
    const resultaat = await verwerkLead(invoer, {
      verstuur: async (mail) => {
        pogingen.push(mail);
        return { ok: true, id: "resend-1" };
      },
      wacht: async () => {
        gewacht += 1;
      },
    });
    assert.equal(resultaat.ok, true);
    if (resultaat.ok) {
      assert.equal(resultaat.leadId, pogingen[0]?.leadId);
    }
  });

  assert.equal(pogingen.length, 1);
  assert.equal(gewacht, 0);
  assert.equal(regels.length, 0);
});

test("een 5xx wordt één keer opnieuw geprobeerd en blijft daarna een fout", async () => {
  let pogingen = 0;
  const wachttijden: number[] = [];
  const regels = await metLog(async () => {
    const resultaat = await verwerkLead(invoer, {
      verstuur: async () => {
        pogingen += 1;
        return mislukt(
          "internal_server_error",
          500,
          "server down jan@example.nl",
        );
      },
      wacht: async (ms) => {
        wachttijden.push(ms);
      },
    });
    assert.deepEqual(resultaat, { ok: false });
  });

  assert.equal(pogingen, 2);
  assert.deepEqual(wachttijden, [700]);
  assert.equal(regels.length, 1);
  assert.match(String(regels[0]?.[0]), /code=internal_server_error/);
  assert.match(String(regels[0]?.[0]), /\[e-mail\]/);
  zonderPersoonsgegevens(regels);
});

test("succes bij de retry geeft alsnog hetzelfde Lead-id terug", async () => {
  const ids: string[] = [];
  const regels = await metLog(async () => {
    const resultaat = await verwerkLead(invoer, {
      verstuur: async (mail) => {
        ids.push(mail.leadId);
        if (ids.length === 1) {
          return mislukt("rate_limit_exceeded", 429);
        }
        return { ok: true, id: "resend-2" };
      },
      wacht: async () => {},
    });
    assert.equal(resultaat.ok, true);
    if (resultaat.ok) {
      assert.equal(resultaat.leadId, ids[0]);
    }
  });

  assert.deepEqual(ids[0], ids[1]);
  assert.equal(regels.length, 0);
});

test("beide pogingen gebruiken hetzelfde Lead-id als idempotency key", async () => {
  const sleutels: string[] = [];
  await metLog(async () => {
    await verwerkLead(invoer, {
      verstuur: async (mail) => {
        sleutels.push(mail.leadId);
        return mislukt("internal_server_error", 500);
      },
      wacht: async () => {},
    });
  });

  assert.equal(sleutels.length, 2);
  assert.equal(sleutels[0], sleutels[1]);
  assert.match(sleutels[0] ?? "", /^[0-9a-f-]{36}$/i);
});

test("een validatiefout wordt niet opnieuw geprobeerd", async () => {
  let pogingen = 0;
  let gewacht = 0;
  const regels = await metLog(async () => {
    const resultaat = await verwerkLead(invoer, {
      verstuur: async () => {
        pogingen += 1;
        return mislukt(
          "validation_error",
          422,
          "Ongeldig adres jan@example.nl",
        );
      },
      wacht: async () => {
        gewacht += 1;
      },
    });
    assert.deepEqual(resultaat, { ok: false });
  });

  assert.equal(pogingen, 1);
  assert.equal(gewacht, 0);
  assert.match(String(regels[0]?.[0]), /type=contact/);
  assert.match(String(regels[0]?.[0]), /code=validation_error/);
  zonderPersoonsgegevens(regels);
});
