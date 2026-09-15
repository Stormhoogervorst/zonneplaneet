-- Naam splitsen in voornaam en achternaam. E-mail mag leeg blijven: we bellen
-- dan, en sturen geen bevestigingsmail.

alter table leads
  add column voornaam text,
  add column achternaam text;

update leads
set
  voornaam = case
    when naam is null or btrim(naam) = '' then ''
    when position(' ' in btrim(naam)) = 0 then btrim(naam)
    else split_part(btrim(naam), ' ', 1)
  end,
  achternaam = case
    when naam is null or btrim(naam) = '' then ''
    when position(' ' in btrim(naam)) = 0 then ''
    else btrim(substr(btrim(naam), position(' ' in btrim(naam)) + 1))
  end;

alter table leads
  alter column voornaam set not null,
  alter column achternaam set not null;

alter table leads drop column naam;

alter table leads
  alter column email drop not null;
