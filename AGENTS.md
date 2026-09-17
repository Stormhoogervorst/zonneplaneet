<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

FASE: designsysteem en pagina-ontwerp zijn klaar. De site is in onderhoud
en uitbreiding.
De site heet Zonneplaneet Actie. Clubactie is één van de acties (route
`/clubactie`), geen merknaam. In lopende tekst blijft "clubactie" staan als
zelfstandig naamwoord.
Het designsysteem staat in `app/globals.css` en `components/ui/`. Gebruik deze tokens
en primitives bij volgende ontwerprondes; maak geen lokale varianten opnieuw.
Voeg geen dependencies toe: geen UI-library, geen icon-library, geen form-library
en geen animatiebibliotheek. Vraag het als je denkt er een nodig te hebben.
Goedgekeurde uitzondering: `@calcom/embed-react`, alleen voor de
showroomboeking op `/contact`, `/over-zonneplaneet`, `/zonnepanelen`,
`/thuisbatterij` en `/laadpaal` (`components/Boekingsmodule.tsx`).
Gebruik semantische HTML: één h1 per pagina, section met een kop erboven, button voor
acties en a voor navigatie. Geef elke sectie een herkenbare naam in de code, zodat de
designronde secties kan vervangen in plaats van pagina's te herschrijven.

KLEUREN
Uitsluitend de tokens uit app/globals.css. Geen kale Tailwind-kleurklassen als
bg-blue-900 of text-orange-500.
--color-navy #072737 donkere vlakken, koppen, primaire knop
--color-navy-licht #0C2A40 subtiel contrast binnen een donker vlak
--color-oranje #E94E12 accent: onderstrepingen, iconen, actieve staat
--color-oranje-diep #C43F0C gevulde knoppen met witte tekst, oranje tekst op wit
--color-tag #BFD9E5 alleen voor eyebrow-labels, nooit voor knoppen of interactieve
elementen; navy erop haalt 10,5:1
--color-vlak #F4F4F2 zachte kaartachtergronden
Succes emerald, fouten red, neutrale grijzen slate. Geen andere hues.

Oranje is geen tekstkleur. #E94E12 haalt 3,8:1 op wit en 4,1:1 op navy, allebei onder
de 4,5:1 die gewone tekst nodig heeft. Gebruik oranje voor vlakken, randen en iconen.
Navy tekst op oranje mag alleen als grote tekst: minimaal 20px en 600, of minimaal
24px en 400. De primaire `Knop` voldoet hieraan met 20px en 600. Moet er oranje tekst
op wit komen, gebruik dan #C43F0C (5,2:1 op wit).
Uitzondering: het woordmerk zet "ACTIE" in `--color-oranje` (`components/Woordmerk.tsx`
en de grote footer-svg). Dat is merkteken, geen lopende tekst.

Pagina's zijn overwegend licht: wit vlak, navy tekst, navy als donker blok voor de
header en het Zonneplaneet-vertrouwensblok in de footer.

TYPOGRAFIE
Gebruik uitsluitend Outfit via `next/font`, self-hosted met gewichten 400 en 600.
Gebruik 400 voor displaykoppen; grootte geeft de kop visueel gewicht.
De schaal staat in `@theme` en levert deze Tailwind-utilities:
text-display-xl clamp(2.75rem, 7vw, 5.5rem) regelhoogte 0.95 tracking -0.03em
text-display-l clamp(2rem, 5vw, 3.5rem) regelhoogte 1.0 tracking -0.02em
text-display-m clamp(1.5rem, 3vw, 2.25rem) regelhoogte 1.1
text-body-l 1.125rem regelhoogte 1.6
text-body 1rem regelhoogte 1.6

VORM EN PRIMITIVES
Kaarten gebruiken `rounded-3xl`, icoontegels `rounded-2xl` en knoppen zijn volledig
rond. Gebruik geen schaduwen, gradients of diepte-effecten.
Hergebruik uit `components/ui/`:
Knop varianten `primair`, `donker`, `wit`, `groot`, `grootDonker`, `stil`,
`extern`; optioneel `metPijl`.
`groot` is de hero-knop: een oranje pil met navy tekst van 20px en 600, en met
`metPijl` een LOSSE oranje cirkel ernaast (72px desktop, 56px mobiel) met een navy
pijl die 45 graden schuin omhoog wijst. De cirkel zit dus niet in de pil.
Op mobiel vult de pil de volledige breedte met min-hoogte 56px en staat de cirkel
ernaast; de piltekst mag daar over twee regels lopen.
Kaart vlakachtergrond, `rounded-3xl`, ruime padding
IconTegel oranje vierkant met navy icoon
Sectie verticale ritmiek en containerbreedtes — alleen nog in gebruik op
`/styleguide`. Pagina's bouwen hun secties zelf.
Accordeon toegankelijke `details`/`summary`; dicht wit, open navy
`/styleguide` toont alle tokens en primitives en blijft `noindex`.

HERO
Twee varianten in `components/Hero.tsx`. Geen lokale kopieën.
- Schermvullend (zonder `uitgelijnd`): alleen de homepage. Foto over het
  scherm, gecentreerde witte kop, HeaderBalk op donkere ondergrond.
- Tweekoloms (`uitgelijnd: true`): h1 links, subregel en optionele knop
  rechts, foto over de volle breedte eronder. Productpagina's, clubactie,
  leden, partner, referral, contact, over-zonneplaneet en clubpagina's.
Clubpagina's gebruiken diezelfde tweekoloms variant, met het clublogo
(64px hoog) boven de h1 in de linkerkolom. Dat logo maakt de hero
compacter: minder padding en een lagere foto (`aspect-[16/9]` mobiel,
`aspect-[21/9]` desktop). Heeft een pagina geen knop in de hero, voeg er
dan geen toe.

NAVIGATIE
De items staan in `lib/navigatie.ts`: Producten (zonnepanelen,
thuisbatterij, laadpaal), Clubactie, Referral, Over Zonneplaneet.
`HeaderBalk` toont die rij vanaf `lg`, met een uitklapmenu op Producten.
Onder `lg` staat alles in het hamburgermenu (`MobielMenu`).
Pagina's met een Hero zetten `data-hero-balk` op `main`. Dan verbergt
`app/globals.css` de `SiteHeader`, omdat de Hero zelf de HeaderBalk
rendert. De voettekst blijft de navigatie voor de rest van de pagina.

SPACING EN LAYOUT
De `Sectie`-primitive (`py-20 lg:py-32`, binnenin `px-5` plus `max-w-2xl`
of `max-w-5xl`) wordt alleen op `/styleguide` gebruikt.
Paginasecties gebruiken vrijwel overal `max-w-[1440px] px-8 md:px-16` en
`py-20 md:py-28`. Binnen een sectie meestal `mt-4` of `mt-6`.
Afwijkingen:
- Hero-binnenwerk: dezelfde 1440-container, andere verticale padding
  (`pt-24 pb-14 md:pt-32 md:pb-20`; clubpagina's compacter).
- Compacte blokken zoals `ClubAanbodVlak`: `py-10`.
- `HomepageContact`: `py-24 md:py-32`.
- Tekstpagina's (`/privacy`, `/voorwaarden`, kennisbankartikel):
  `max-w-2xl px-5 py-12`.
- Footer en kennisbank-overzicht: `max-w-5xl px-5`.

MAPPEN
app/ routes; app/[club] vangt alles op rootniveau af
app/aanmelden/ server actions
components/ gedeelde componenten
content/clubs/ één JSON per club, de bron voor clubpagina's
lib/ data-loaders, validatie
Elke nieuwe statische route krijgt een eigen map in app/, anders vangt app/[club]
de URL af. Controleer bij elke nieuwe route of de slug niet botst met een clubcode.

ROUTES
Gereserveerde slugs staan in `lib/routes.ts` (`GERESERVEERDE_SLUGS`).
`getClubSlugs()` in `lib/clubs.ts` gooit tijdens de build als een clubslug
daarmee botst. `/clubs` redirect naar `/leden` (`next.config.ts`).

SEO PER PAGINATYPE
Elke geïndexeerde pagina krijgt een eigen title en description via de
Metadata API en staat in `app/sitemap.ts`. Clubpagina's nooit in de sitemap.

Geen robots-override (dus indexeren, en in de sitemap tenzij hieronder anders):
- `/` indexeren
- `/clubactie` indexeren
- `/leden` indexeren
- `/partner` indexeren
- `/zonnepanelen` indexeren
- `/thuisbatterij` indexeren
- `/laadpaal` indexeren

`robots: { index: false, follow: true }`:
- clubpagina's (`app/[club]/page.tsx`) — bijna-identieke pagina's;
  verkeer komt uit nieuwsbrieven en QR-codes
- `/contact`
- `/referral`
- `/over-zonneplaneet`
- `/privacy`
- `/voorwaarden`
- `/kennisbank` en `/kennisbank/[artikel]` — tijdelijk uit; zie hieronder

`robots: { index: false, follow: false }`:
- `/styleguide`

Kennisbank staat tijdelijk uit. Bij livegang deze zes plekken terugzetten:
1. `app/sitemap.ts` — `/kennisbank` en artikel-URL's
2. `app/robots.ts` — `disallow: ["/kennisbank"]` weghalen
3. `app/kennisbank/page.tsx` — indexeren
4. `app/kennisbank/[artikel]/page.tsx` — indexeren
5. `components/HomepageKeuzeblokken.tsx` — `href: "/kennisbank"` terug
6. `components/SectieSaldering.tsx` — knop naar `/kennisbank` terug

FORMULIEREN EN LEADS
Alle formulieren lopen via een server action met Zod-validatie en een
honeypotveld `bedrijfsnaam-controle`. Validatie gebeurt op de server. Verzending
gaat daarna vanuit de browser naar Web3Forms. Er is geen eigen opslag. Leads
staan in Web3Forms.
Er zit geen maildienst in het project. Stel die niet voor. Er gaat daarom geen
bevestigingsmail naar de aanmelder; zet die belofte niet in teksten op de site.
Een mislukte verzending is alleen in de Vercel-logs terug te vinden, met prefix
[LEAD-NIET-VERZONDEN]. Vraag nooit meer velden uit dan nodig; elk extra veld
kost conversie.
Drie publieke keys, per formuliertype:
- `NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY` — contact en partner
- `NEXT_PUBLIC_WEB3FORMS_LEDEN_KEY` — clubactie/leden
- `NEXT_PUBLIC_WEB3FORMS_REFERRAL_KEY` — referral
De JSON-body voor Web3Forms komt uit `web3formsBodyUitFormulier` in
`lib/web3forms.ts`: die leest de `FormData`, dus een nieuw veld in het
formulier gaat automatisch mee.
De in-memory rate limiter (`lib/rate-limit.ts`) is verwijderd. Die deelde
geen staat tussen Vercel-instances en gaf daardoor een schijnlimiet.

CLAIMS
Niet op de site:
- terugverdientijden
- woningwaardestijgingen
- garantietermijnen in jaren
- besparingsbedragen zonder rekengrondslag
- teruglevertarieven per kWh
Het besparingsvoorbeeld op `/zonnepanelen` mag alleen mét de voetnoot
erbij (verbruik 3.500 kWh, opbrengst 3.486 kWh, 40% direct gebruikt,
stroomprijs €0,30 bij een vast contract).

PROPOSITIE
Er is geen ledenkorting. De koper betaalt de normale prijs; de club
ontvangt €250 per installatie. Dat bedrag staat in
`STANDAARD_VERGOEDING` in `lib/clubs.ts`.
Open: in `HomepageActiekaarten`, `LedenHoeHetWerkt` en
`PartnerHoeHetLoopt` staat het woord "ledenkorting" nog. Dat is
tegenstrijdig met deze regel.

MERK
Het woordmerk is "zonneplaneet ACTIE", met ACTIE in oranje. Dat staat in
`components/Woordmerk.tsx` (header) en als grote svg-tekst in
`components/SiteFooter.tsx`.

NEDERLANDSE TEKST
Je-vorm, geen u. Korte zinnen. Geen uitroeptekens, geen superlatieven als "de beste"
of "ongekend voordelig". Bedragen als €400, niet als "€ 400,-".
Knoppen zeggen wat er gebeurt: "Meld me aan", niet "Verstuur".
Foutmeldingen zeggen wat er misging en wat de bezoeker moet doen.
Verzin NOOIT cijfers: geen bedragen, percentages, ledenaantallen, klantaantallen of
besparingsclaims. Gebruik een TODO:-comment als een cijfer ontbreekt. Onjuiste
kortingsclaims zijn een juridisch risico.

AFRONDEN
Draai npm run build voordat je klaar meldt. Een taak is pas af als de build slaagt en
er geen TypeScript-fouten zijn. Meld welke TODO's je hebt achtergelaten.
