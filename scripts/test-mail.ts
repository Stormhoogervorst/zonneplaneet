import { verstuurLeadMail } from "../lib/mail";

const resultaat = await verstuurLeadMail({
  type: "contact",
  subject: "TEST Resend - verwijderen",
  replyTo: "test@example.com",
  fromName: "Testpersoon",
  leadId: "test-resend",
  velden: {
    Naam: "Café",
    Bericht: `één & "aanhalingstekens" <b>vet</b>`,
  },
});

if (resultaat.ok) {
  console.log(resultaat.id);
} else {
  console.error(resultaat.error);
  process.exitCode = 1;
}
