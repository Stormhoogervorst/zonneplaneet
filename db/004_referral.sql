-- Referral: de lead-rij gaat over de aangedragene (bestaande naam, e-mail
-- en telefoon). De aandrager komt in aparte kolommen. Bij club-, partner-,
-- contact- en overige actie-leads blijven deze velden NULL.
-- Plaats, interesse en opmerking van de aangedragene horen bij de lead zelf
-- en gaan mee in de insert op de bestaande of daarbij behorende kolommen.

alter table leads
  add column aandrager_naam text,
  add column aandrager_email text,
  add column aandrager_telefoon text;
