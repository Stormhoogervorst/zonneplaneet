import assert from "node:assert/strict";
import test from "node:test";

import {
  beoordeelLaadtijd,
  MELDING_ONGELDIGE_TIJD,
  MELDING_TE_SNEL,
  meldingVoorLaadtijd,
} from "./laadtijd";

const geladen = "1700000000000";
const verzonden = "1700000002500";

test("geldige tijden met minstens 2 seconden verschil zijn ok", () => {
  assert.equal(beoordeelLaadtijd(geladen, verzonden), "ok");
  assert.equal(beoordeelLaadtijd(geladen, "1700000002000"), "ok");
  assert.equal(meldingVoorLaadtijd(geladen, verzonden), undefined);
});

test("een ontbrekend veld is ongeldig", () => {
  assert.equal(beoordeelLaadtijd(null, verzonden), "ongeldig");
  assert.equal(beoordeelLaadtijd(geladen, null), "ongeldig");
  assert.equal(beoordeelLaadtijd(undefined, verzonden), "ongeldig");
  assert.equal(meldingVoorLaadtijd(null, verzonden), MELDING_ONGELDIGE_TIJD);
});

test("een lege string is ongeldig", () => {
  assert.equal(beoordeelLaadtijd("", verzonden), "ongeldig");
  assert.equal(beoordeelLaadtijd(geladen, ""), "ongeldig");
  assert.equal(meldingVoorLaadtijd("", ""), MELDING_ONGELDIGE_TIJD);
});

test("abc is ongeldig", () => {
  assert.equal(beoordeelLaadtijd("abc", verzonden), "ongeldig");
  assert.equal(beoordeelLaadtijd(geladen, "abc"), "ongeldig");
  assert.equal(meldingVoorLaadtijd("abc", verzonden), MELDING_ONGELDIGE_TIJD);
});

test("een verschil kleiner dan 2 seconden is te snel", () => {
  assert.equal(beoordeelLaadtijd(geladen, "1700000001999"), "te-snel");
  assert.equal(meldingVoorLaadtijd(geladen, "1700000001999"), MELDING_TE_SNEL);
});

test("een negatief verschil is te snel", () => {
  assert.equal(beoordeelLaadtijd(verzonden, geladen), "te-snel");
  assert.equal(meldingVoorLaadtijd(verzonden, geladen), MELDING_TE_SNEL);
});

test("een afwijkende serverklok beïnvloedt het resultaat niet", () => {
  const origineel = Date.now;
  Date.now = () => 0;
  try {
    assert.equal(beoordeelLaadtijd(geladen, verzonden), "ok");
    assert.equal(beoordeelLaadtijd(geladen, "1700000001000"), "te-snel");
    assert.equal(beoordeelLaadtijd("", verzonden), "ongeldig");
  } finally {
    Date.now = origineel;
  }
});
