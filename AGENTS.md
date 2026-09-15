<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

FASE: designsysteem gereed, pagina-ontwerp volgt
De site heet Zonneplaneet Actie. Clubactie is één van de acties (route
`/clubactie`), geen merknaam. In lopende tekst blijft "clubactie" staan als
zelfstandig naamwoord.
Het designsysteem staat in `app/globals.css` en `components/ui/`. Gebruik deze tokens
en primitives bij volgende ontwerprondes; maak geen lokale varianten opnieuw.
Voeg geen dependencies toe: geen UI-library, geen icon-library, geen form-library
en geen animatiebibliotheek. Vraag het als je denkt er een nodig te hebben.
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
Knop varianten `primair`, `donker`, `groot`, `stil`; optioneel `metPijl`
`groot` is de hero-knop: een oranje pil met navy tekst van 20px en 600, en met
`metPijl` een LOSSE oranje cirkel ernaast (72px desktop, 56px mobiel) met een navy
pijl die 45 graden schuin omhoog wijst. De cirkel zit dus niet in de pil.
Op mobiel vult de pil de volledige breedte met min-hoogte 56px en staat de cirkel
ernaast; de piltekst mag daar over twee regels lopen.
De full-screen hero staat in `components/Hero.tsx` en heeft een eigen bovenbalk
met logo, navigatie en menuknop. Daarom verbergt `app/globals.css` de `SiteHeader` op
pagina's met `data-hero-balk`; de navigatie voor de rest van de pagina staat in de footer.
Kaart vlakachtergrond, `rounded-3xl`, ruime padding
IconTegel oranje vierkant met navy icoon
Sectie verticale ritmiek en containerbreedtes
Accordeon toegankelijke `details`/`summary`; dicht wit, open navy
`/styleguide` toont alle tokens en primitives en blijft `noindex`.

BEWEGING
Alleen CSS, maximaal 300ms en altijd uit bij `prefers-reduced-motion`. Geen
animatiebibliotheek, scroll-gestuurde effecten of parallax. Een IntersectionObserver
mag alleen een CSS fade-in-up activeren.

SPACING EN LAYOUT
Standaard Tailwind-schaal. Gebruik `Sectie`: py-20 op mobiel en py-32 op desktop.
Binnen een sectie meestal mt-4 of mt-6. Tekstpagina's max-w-2xl px-5, overzichten
max-w-5xl px-5.

MAPPEN
app/ routes; app/[club] vangt alles op rootniveau af
app/aanmelden/ server actions
components/ gedeelde componenten
content/clubs/ één JSON per club, de bron voor clubpagina's
lib/ data-loaders, validatie, mail
Elke nieuwe statische route krijgt een eigen map in app/, anders vangt app/[club]
de URL af. Controleer bij elke nieuwe route of de slug niet botst met een clubcode.

SEO PER PAGINATYPE
homepage indexeren
partnerpagina indexeren
kennisbank indexeren
clubpagina's NIET indexeren: robots: { index: false, follow: true }
Reden: bijna-identieke pagina's; het verkeer komt uit nieuwsbrieven
en QR-codes, niet uit zoekmachines.
bedankpagina's niet indexeren
Elke geïndexeerde pagina krijgt een eigen title en description via de Metadata API en
wordt toegevoegd aan app/sitemap.ts. Clubpagina's nooit in de sitemap.

FORMULIEREN EN LEADS
Alle formulieren lopen via een server action met Zod-validatie en een
honeypotveld 'website'. Validatie gebeurt op de server. Verzending gaat vanuit
de browser naar Web3Forms. Er is geen eigen opslag. Leads staan in Web3Forms.
Een mislukte verzending is alleen in de Vercel-logs terug te vinden, met prefix
[LEAD-NIET-VERZONDEN]. Vraag nooit meer velden uit dan nodig; elk extra veld
kost conversie.

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
