import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "Lees de algemene voorwaarden van Zonneplaneet B.V.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function VoorwaardenPage() {
  return (
    <main
      data-geen-vertrouwensblok
      className="mx-auto max-w-[68ch] px-5 py-12 text-[1.0625rem] leading-[1.7] text-navy"
    >
      <h1 className="text-3xl font-semibold">Algemene voorwaarden</h1>
      <p className="mt-4">Versie: januari 2025</p>

      <p className="mt-4">
        Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen,
        offertes, overeenkomsten en werkzaamheden van:
      </p>

      <address className="mt-6 not-italic">
        <strong>Zonneplaneet B.V.</strong>
        <br />
        Cruquiusweg 6
        <br />
        6827BL Arnhem
        <br />
        KvK-nummer: 98474960
        <br />
        E-mail: offerte@zonneplaneet.nl
        <br />
        Website: www.zonneplaneet.nl
      </address>

      <section aria-labelledby="artikel-1">
        <h2 id="artikel-1" className="mt-12 text-2xl font-semibold">
          Artikel 1. Definities
        </h2>

        <p className="mt-4">
          1. In deze algemene voorwaarden wordt verstaan onder:
        </p>

        <p className="mt-4">
          <strong>Zonneplaneet B.V.:</strong> Zonneplaneet B.V., gevestigd te
          Arnhem, alsmede haar rechtsopvolgers.
        </p>

        <p className="mt-4">
          <strong>Klant:</strong> iedere natuurlijke persoon die handelt voor
          privédoeleinden en met Zonneplaneet B.V. een overeenkomst aangaat of
          wenst aan te gaan.
        </p>

        <p className="mt-4">
          <strong>Overeenkomst:</strong> iedere overeenkomst tussen Zonneplaneet
          B.V. en de Klant betreffende de levering van producten en/of diensten.
        </p>

        <p className="mt-4">
          <strong>Producten:</strong> onder meer zonnepanelen, thuisbatterijen,
          laadpalen, airco&apos;s, warmtepompen, kozijnen en aanverwante
          materialen.
        </p>

        <p className="mt-4">
          <strong>Werkzaamheden:</strong> alle door Zonneplaneet B.V.
          uitgevoerde installatie-, montage-, advies-, onderhouds- en
          servicewerkzaamheden.
        </p>

        <p className="mt-4">
          <strong>Schriftelijk:</strong> per brief of per e-mail.
        </p>
      </section>
      <section aria-labelledby="artikel-2">
        <h2 id="artikel-2" className="mt-12 text-2xl font-semibold">
          Artikel 2. Toepasselijkheid
        </h2>

        <p className="mt-4">
          1. Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen,
          offertes, overeenkomsten, aanvullende opdrachten en vervolgopdrachten
          van Zonneplaneet B.V.
        </p>

        <p className="mt-4">
          2. Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien
          deze schriftelijk door Zonneplaneet B.V. zijn bevestigd.
        </p>

        <p className="mt-4">
          3. Indien een bepaling van deze voorwaarden nietig of vernietigbaar
          blijkt te zijn, blijven de overige bepalingen volledig van kracht.
        </p>

        <p className="mt-4">
          4. Op alle rechtsverhoudingen tussen Zonneplaneet B.V. en de Klant is
          uitsluitend Nederlands recht van toepassing.
        </p>

        <p className="mt-4">
          5. Geschillen worden voorgelegd aan de bevoegde Nederlandse rechter.
        </p>
      </section>
      <section aria-labelledby="artikel-3">
        <h2 id="artikel-3" className="mt-12 text-2xl font-semibold">
          Artikel 3. Offertes en totstandkoming van de overeenkomst
        </h2>

        <p className="mt-4">
          1. Alle offertes en aanbiedingen van Zonneplaneet B.V. zijn
          vrijblijvend, tenzij uitdrukkelijk anders vermeld.
        </p>

        <p className="mt-4">
          2. Kennelijke vergissingen, druk-, schrijf- of rekenfouten binden
          Zonneplaneet B.V. niet.
        </p>

        <p className="mt-4">3. Een overeenkomst komt tot stand:</p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">
            na schriftelijke bevestiging door Zonneplaneet B.V.;
          </li>
          <li className="mt-2">
            na ondertekening van de offerte door de Klant; of
          </li>
          <li className="mt-2">
            zodra Zonneplaneet B.V. feitelijk met de uitvoering is begonnen.
          </li>
        </ol>

        <p className="mt-4">
          4. Afbeeldingen, berekeningen, opbrengstprognoses,
          besparingsberekeningen, terugverdientijden en andere verstrekte
          gegevens zijn indicatief en kunnen niet worden aangemerkt als een
          garantie, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.
        </p>

        <p className="mt-4">
          5. Indien door onjuiste of onvolledige informatie van de Klant
          aanvullende werkzaamheden noodzakelijk zijn, worden deze beschouwd als
          meerwerk en afzonderlijk in rekening gebracht.
        </p>

        <p className="mt-4">
          6. Zonneplaneet B.V. is gerechtigd een aanbetaling van maximaal
          vijftig procent (50%) van het overeengekomen bedrag te verlangen.
        </p>
      </section>
      <section aria-labelledby="artikel-4">
        <h2 id="artikel-4" className="mt-12 text-2xl font-semibold">
          Artikel 4. Herroepingsrecht
        </h2>

        <p className="mt-4">
          1. Indien de overeenkomst op afstand of buiten de verkoopruimte wordt
          gesloten, heeft de Klant gedurende veertien (14) dagen na het sluiten
          van de overeenkomst het recht deze zonder opgave van redenen te
          ontbinden, overeenkomstig de wettelijke bepalingen.
        </p>

        <p className="mt-4">
          2. Indien de Klant verzoekt om uitvoering van de werkzaamheden binnen
          de herroepingstermijn, is de Klant bij ontbinding een evenredige
          vergoeding verschuldigd voor de reeds verrichte werkzaamheden en
          gemaakte kosten.
        </p>

        <p className="mt-4">
          3. Het herroepingsrecht vervalt indien de werkzaamheden volledig zijn
          uitgevoerd binnen de herroepingstermijn en de Klant vooraf
          uitdrukkelijk heeft ingestemd met onmiddellijke uitvoering en heeft
          verklaard afstand te doen van zijn herroepingsrecht.
        </p>
      </section>
      <section aria-labelledby="artikel-5">
        <h2 id="artikel-5" className="mt-12 text-2xl font-semibold">
          Artikel 5. Prijzen en betaling
        </h2>

        <p className="mt-4">
          1. Alle door Zonneplaneet B.V. genoemde prijzen zijn inclusief btw,
          tenzij uitdrukkelijk anders vermeld.
        </p>

        <p className="mt-4">
          2. Facturen dienen uiterlijk op de dag van installatie volledig te
          zijn voldaan, tenzij schriftelijk anders is overeengekomen.
        </p>

        <p className="mt-4">
          3. Bij niet-tijdige betaling is de Klant van rechtswege in verzuim en
          is wettelijke rente verschuldigd.
        </p>

        <p className="mt-4">
          4. Alle redelijke buitengerechtelijke incassokosten komen voor
          rekening van de Klant.
        </p>

        <p className="mt-4">
          5. Zonneplaneet B.V. is gerechtigd haar verplichtingen op te schorten
          zolang de Klant niet volledig aan zijn betalingsverplichtingen heeft
          voldaan.
        </p>

        <p className="mt-4">
          6. Eigendom van geleverde goederen gaat pas over op de Klant nadat
          alle facturen volledig zijn betaald.
        </p>
      </section>
      <section aria-labelledby="artikel-6">
        <h2 id="artikel-6" className="mt-12 text-2xl font-semibold">
          Artikel 6. Levering en installatie
        </h2>

        <p className="mt-4">
          1. Opgegeven leverings- en installatietermijnen zijn indicatief en
          gelden nimmer als fatale termijnen.
        </p>

        <p className="mt-4">
          2. Overschrijding van een leverings- of installatietermijn geeft de
          Klant geen recht op schadevergoeding, ontbinding of opschorting van de
          overeenkomst, tenzij de overschrijding het gevolg is van opzet of
          bewuste roekeloosheid van Zonneplaneet B.V.
        </p>

        <p className="mt-4">
          3. De Klant zorgt ervoor dat de installatielocatie op de afgesproken
          datum goed bereikbaar en veilig is en dat alle noodzakelijke
          voorzieningen aanwezig zijn.
        </p>

        <p className="mt-4">
          4. De Klant is verantwoordelijk voor het verkrijgen van eventuele
          vergunningen, toestemmingen van derden, goedkeuring van een VvE en
          andere vereiste toestemmingen.
        </p>

        <p className="mt-4">
          5. Indien de werkzaamheden niet kunnen worden uitgevoerd door
          omstandigheden die voor rekening van de Klant komen, is Zonneplaneet
          B.V. gerechtigd de gemaakte kosten en eventuele extra voorrijkosten in
          rekening te brengen.
        </p>

        <p className="mt-4">
          6. Weersomstandigheden, netcongestie, leveringsproblemen, vertragingen
          van leveranciers, overheidsmaatregelen of andere omstandigheden buiten
          de invloed van Zonneplaneet B.V. kunnen leiden tot uitstel van de
          werkzaamheden.
        </p>

        <p className="mt-4">
          7. Het risico van verlies of beschadiging van de geleverde producten
          gaat over op de Klant op het moment van levering of installatie.
        </p>
      </section>
      <section aria-labelledby="artikel-7">
        <h2 id="artikel-7" className="mt-12 text-2xl font-semibold">
          Artikel 7. Meerwerk
        </h2>

        <p className="mt-4">
          1. Werkzaamheden die niet zijn opgenomen in de offerte worden
          beschouwd als meerwerk.
        </p>

        <p className="mt-4">
          2. Meerwerk wordt uitgevoerd tegen de op dat moment geldende tarieven
          van Zonneplaneet B.V.
        </p>

        <p className="mt-4">
          3. Meerwerk kan mondeling worden overeengekomen en wordt geacht te
          zijn geaccepteerd indien de Klant de werkzaamheden laat uitvoeren
          zonder direct bezwaar te maken.
        </p>
      </section>
      <section aria-labelledby="artikel-8">
        <h2 id="artikel-8" className="mt-12 text-2xl font-semibold">
          Artikel 8. Oplevering
        </h2>

        <p className="mt-4">
          1. De installatie wordt geacht te zijn opgeleverd zodra:
        </p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">
            de installatie door de Klant in gebruik is genomen;
          </li>
          <li className="mt-2">
            de Klant heeft verklaard de installatie te accepteren; of
          </li>
          <li className="mt-2">
            Zonneplaneet B.V. de werkzaamheden heeft afgerond en de Klant niet
            binnen veertien dagen schriftelijk heeft geklaagd.
          </li>
        </ol>

        <p className="mt-4">
          2. Kleine gebreken die de normale werking van de installatie niet
          verhinderen, vormen geen reden om de oplevering te weigeren.
        </p>

        <p className="mt-4">
          3. Esthetische verschillen, kleurafwijkingen, kleine maatverschillen
          en geringe afwijkingen in afwerking geven geen recht op ontbinding van
          de overeenkomst.
        </p>
      </section>
      <section aria-labelledby="artikel-9">
        <h2 id="artikel-9" className="mt-12 text-2xl font-semibold">
          Artikel 9. Garantie
        </h2>

        <p className="mt-4">
          1. Op de geleverde producten geldt uitsluitend de wettelijke garantie
          en de eventuele fabrieksgarantie van de fabrikant.
        </p>

        <p className="mt-4">
          2. Zonneplaneet B.V. geeft geen verdergaande garantie dan
          uitdrukkelijk schriftelijk is overeengekomen.
        </p>

        <p className="mt-4">
          3. De wettelijke rechten van consumenten blijven onverminderd van
          kracht.
        </p>

        <p className="mt-4">4. Garantie vervalt indien:</p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">de installatie onjuist wordt gebruikt;</li>
          <li className="mt-2">
            de installatie door derden wordt gewijzigd of gerepareerd;
          </li>
          <li className="mt-2">
            de Klant zelf wijzigingen aanbrengt aan de hardware, bekabeling,
            software of instellingen;
          </li>
          <li className="mt-2">
            schade ontstaat door overmacht, brand, blikseminslag, waterschade of
            ondeskundig gebruik.
          </li>
        </ol>

        <p className="mt-4">
          5. Garantie op installatiewerkzaamheden wordt verleend voor zover
          wettelijk verplicht.
        </p>
      </section>
      <section aria-labelledby="artikel-10">
        <h2 id="artikel-10" className="mt-12 text-2xl font-semibold">
          Artikel 10. Terugverdiengarantie thuisbatterijen
        </h2>

        <p className="mt-4">
          1. Een terugverdiengarantie geldt uitsluitend indien deze
          uitdrukkelijk schriftelijk in de overeenkomst is opgenomen.
        </p>

        <p className="mt-4">
          2. De terugverdiengarantie heeft een looptijd van vier (4) jaar na de
          installatiedatum.
        </p>

        <p className="mt-4">
          3. Indien de overeengekomen terugverdienprestatie na vier jaar niet is
          behaald, zal Zonneplaneet B.V. de batterijcapaciteit kosteloos
          uitbreiden met maximaal tien (10) kWh.
        </p>

        <p className="mt-4">
          4. De uitbreiding wordt uitsluitend aangeboden indien:
        </p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">de batterij technisch uitbreidbaar is;</li>
          <li className="mt-2">
            de omvormer en elektrische installatie hiervoor geschikt zijn;
          </li>
          <li className="mt-2">
            de uitbreiding voldoet aan de geldende wet- en regelgeving.
          </li>
        </ol>

        <p className="mt-4">
          5. Indien uitbreiding technisch niet mogelijk is, biedt Zonneplaneet
          B.V. een gelijkwaardige oplossing.
        </p>

        <p className="mt-4">
          6. De terugverdiengarantie geldt uitsluitend indien:
        </p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">
            de volledige factuur uiterlijk op de installatiedag is voldaan;
          </li>
          <li className="mt-2">
            de Klant gedurende de volledige garantieperiode beschikt over een
            dynamisch energiecontract bij Prijspunten Energie;
          </li>
          <li className="mt-2">
            de Klant gedurende de garantieperiode klant blijft bij Prijspunten
            Energie;
          </li>
          <li className="mt-2">
            de installatie permanent verbonden is met internet;
          </li>
          <li className="mt-2">
            de Klant geen wijzigingen aanbrengt aan de batterij, omvormer,
            bekabeling, software, app-instellingen of energiesturing;
          </li>
          <li className="mt-2">de Klant storingen onverwijld meldt;</li>
          <li className="mt-2">
            Zonneplaneet B.V. toegang krijgt tot de benodigde meet- en
            gebruiksgegevens.
          </li>
        </ol>

        <p className="mt-4">7. De terugverdiengarantie vervalt indien:</p>

        <ol type="a" className="mt-4 list-[lower-alpha] pl-6">
          <li className="mt-2">
            de Klant overstapt naar een andere energieleverancier of
            contractvorm;
          </li>
          <li className="mt-2">
            de installatie offline is geweest gedurende een periode die de
            berekening van de prestaties beïnvloedt;
          </li>
          <li className="mt-2">
            wijzigingen worden aangebracht door de Klant of door derden;
          </li>
          <li className="mt-2">
            sprake is van oneigenlijk of ondeskundig gebruik;
          </li>
          <li className="mt-2">
            wetgeving, belastingregels, salderingsregels, netbeheer of
            energiemarkten wezenlijk wijzigen.
          </li>
        </ol>

        <p className="mt-4">
          8. Het vervallen van de terugverdiengarantie laat de wettelijke
          garantie en eventuele fabrieksgarantie onverlet.
        </p>
      </section>
      <section aria-labelledby="artikel-11">
        <h2 id="artikel-11" className="mt-12 text-2xl font-semibold">
          Artikel 11. Opbrengsten en besparingen
        </h2>

        <p className="mt-4">1. Zonneplaneet B.V. geeft geen garantie op:</p>

        <ul className="mt-4 list-disc pl-6">
          <li className="mt-2">opbrengsten van zonnepanelen;</li>
          <li className="mt-2">energiebesparingen;</li>
          <li className="mt-2">terugverdientijden;</li>
          <li className="mt-2">toekomstige energieprijzen;</li>
          <li className="mt-2">subsidies of belastingvoordelen.</li>
        </ul>

        <p className="mt-4">
          2. Alle berekeningen, prognoses en simulaties zijn indicatief en
          gebaseerd op de op dat moment bekende gegevens.
        </p>

        <p className="mt-4">
          3. Aan dergelijke berekeningen kunnen geen rechten worden ontleend,
          tenzij uitdrukkelijk schriftelijk een garantie is verstrekt.
        </p>
      </section>
      <section aria-labelledby="artikel-12">
        <h2 id="artikel-12" className="mt-12 text-2xl font-semibold">
          Artikel 12. Aansprakelijkheid
        </h2>

        <p className="mt-4">
          1. Zonneplaneet B.V. is uitsluitend aansprakelijk voor directe schade
          die het rechtstreekse gevolg is van een toerekenbare tekortkoming.
        </p>

        <p className="mt-4">
          2. Iedere aansprakelijkheid voor indirecte schade, gevolgschade,
          winstderving, gemiste besparingen en bedrijfsschade is uitgesloten.
        </p>

        <p className="mt-4">
          3. Indien Zonneplaneet B.V. aansprakelijk is, is de aansprakelijkheid
          beperkt tot het door de aansprakelijkheidsverzekering uitgekeerde
          bedrag.
        </p>

        <p className="mt-4">
          4. Indien geen uitkering plaatsvindt, is de aansprakelijkheid beperkt
          tot het factuurbedrag van de betreffende overeenkomst met een maximum
          van € 10.000.
        </p>

        <p className="mt-4">
          5. De aansprakelijkheidsbeperkingen gelden niet in geval van opzet of
          bewuste roekeloosheid van de leiding van Zonneplaneet B.V.
        </p>
      </section>
      <section aria-labelledby="artikel-13">
        <h2 id="artikel-13" className="mt-12 text-2xl font-semibold">
          Artikel 13. Overmacht
        </h2>

        <p className="mt-4">
          1. Onder overmacht wordt verstaan iedere omstandigheid buiten de
          invloed van Zonneplaneet B.V. waardoor nakoming van de overeenkomst
          redelijkerwijs niet kan worden verlangd.
        </p>

        <p className="mt-4">2. Hieronder vallen onder meer:</p>

        <ul className="mt-4 list-disc pl-6">
          <li className="mt-2">extreme weersomstandigheden;</li>
          <li className="mt-2">oorlog;</li>
          <li className="mt-2">pandemieën;</li>
          <li className="mt-2">stakingen;</li>
          <li className="mt-2">netcongestie;</li>
          <li className="mt-2">storingen bij leveranciers;</li>
          <li className="mt-2">transportproblemen;</li>
          <li className="mt-2">overheidsmaatregelen.</li>
        </ul>

        <p className="mt-4">
          3. Tijdens overmacht worden de verplichtingen van Zonneplaneet B.V.
          opgeschort.
        </p>

        <p className="mt-4">
          4. Indien de overmacht langer duurt dan zestig dagen, zijn beide
          partijen gerechtigd de overeenkomst schriftelijk te ontbinden.
        </p>
      </section>
      <section aria-labelledby="artikel-14">
        <h2 id="artikel-14" className="mt-12 text-2xl font-semibold">
          Artikel 14. Privacy
        </h2>

        <p className="mt-4">
          1. Zonneplaneet B.V. verwerkt persoonsgegevens conform de geldende
          privacywetgeving.
        </p>

        <p className="mt-4">
          2. Persoonsgegevens worden uitsluitend gebruikt voor de uitvoering van
          de overeenkomst, klantenservice, facturatie en wettelijke
          verplichtingen.
        </p>

        <p className="mt-4">
          3. Op de verwerking van persoonsgegevens is tevens de
          privacyverklaring van Zonneplaneet B.V. van toepassing.
        </p>
      </section>
      <section aria-labelledby="artikel-15">
        <h2 id="artikel-15" className="mt-12 text-2xl font-semibold">
          Artikel 15. Klachten
        </h2>

        <p className="mt-4">
          1. Klachten dienen zo spoedig mogelijk en uiterlijk binnen veertien
          dagen na ontdekking schriftelijk te worden gemeld via
          offerte@zonneplaneet.nl.
        </p>

        <p className="mt-4">
          2. Het indienen van een klacht schort de betalingsverplichting niet
          op.
        </p>

        <p className="mt-4">
          3. Zonneplaneet B.V. zal de klacht binnen een redelijke termijn
          behandelen.
        </p>
      </section>
      <section aria-labelledby="artikel-16">
        <h2 id="artikel-16" className="mt-12 text-2xl font-semibold">
          Artikel 16. Toepasselijk recht en geschillen
        </h2>

        <p className="mt-4">
          1. Op alle overeenkomsten met Zonneplaneet B.V. is uitsluitend
          Nederlands recht van toepassing.
        </p>

        <p className="mt-4">
          2. Geschillen worden voorgelegd aan de bevoegde rechter in het
          arrondissement Gelderland, tenzij dwingend recht anders bepaalt.
        </p>
      </section>
      <section aria-labelledby="artikel-17">
        <h2 id="artikel-17" className="mt-12 text-2xl font-semibold">
          Artikel 17. Slotbepalingen
        </h2>

        <p className="mt-4">
          1. Indien een bepaling van deze voorwaarden nietig of vernietigbaar
          blijkt, blijven de overige bepalingen volledig van kracht.
        </p>

        <p className="mt-4">
          2. Zonneplaneet B.V. is gerechtigd deze algemene voorwaarden te
          wijzigen. Gewijzigde voorwaarden worden tijdig bekendgemaakt.
        </p>

        <p className="mt-4">
          3. De meest recente versie van de algemene voorwaarden is te
          raadplegen via www.zonneplaneet.nl en wordt op verzoek kosteloos
          verstrekt.
        </p>
      </section>

      <section aria-labelledby="aanvullende-voorwaarden-acties">
        <h2
          id="aanvullende-voorwaarden-acties"
          className="mt-12 text-2xl font-semibold"
        >
          Aanvullende voorwaarden acties
        </h2>
        <p className="mt-4">
          De onderstaande bepalingen gelden naast de bovenstaande algemene
          voorwaarden en zijn uitsluitend van toepassing op de acties van
          Zonneplaneet Actie.
        </p>

        <section aria-labelledby="artikel-18">
          <h2 id="artikel-18" className="mt-12 text-2xl font-semibold">
            Artikel 18. Clubactie
          </h2>

          <p className="mt-4">
            1. De clubactie houdt in dat Zonneplaneet B.V. een vergoeding van
            € 250 uitkeert aan de door de Klant opgegeven vereniging, indien de
            Klant overgaat tot aanschaf van een product waarop de actie van
            toepassing is.
          </p>

          <p className="mt-4">
            2. De Klant ontvangt zelf geen korting op grond van deelname aan de
            clubactie.
          </p>

          <p className="mt-4">
            3. Deelname vindt plaats door aanmelding via de website, waarbij de
            Klant de naam en plaats van de vereniging opgeeft.
          </p>

          <p className="mt-4">
            4. De vergoeding wordt uitgekeerd nadat de installatie is opgeleverd
            en de volledige factuur door de Klant is voldaan.
          </p>

          <p className="mt-4">
            5. De uitkering vindt plaats uiterlijk dertig (30) dagen nadat
            zowel de oplevering als de volledige betaling van de factuur hebben
            plaatsgevonden.
          </p>

          <p className="mt-4">
            6. De vergoeding wordt per bankoverschrijving uitbetaald op een
            Nederlandse bankrekening op naam van de opgegeven vereniging of
            stichting. De vereniging of stichting levert daarvoor op eerste
            verzoek van Zonneplaneet B.V. schriftelijk de statutaire naam, het
            KvK-nummer, het IBAN-nummer en de tenaamstelling van de rekening
            aan. Zolang deze gegevens ontbreken of onjuist zijn, wordt de
            uitkering opgeschort.
          </p>

          <p className="mt-4">
            7. Per installatie wordt maximaal één vergoeding uitgekeerd.
          </p>

          <p className="mt-4">
            8. De opgegeven vereniging dient een in Nederland gevestigde
            vereniging of stichting zonder winstoogmerk te zijn.
          </p>

          <p className="mt-4">
            9. De clubactie geldt uitsluitend voor de aanschaf van zonnepanelen,
            een thuisbatterij, een laadpaal of een warmtepomp, of een combinatie
            daarvan. Andere producten van Zonneplaneet B.V. vallen buiten deze
            actie.
          </p>

          <p className="mt-4">
            10. Deelname aan de clubactie kan niet worden gecombineerd met
            andere acties waarbij de Klant zelf een korting of vergoeding
            ontvangt.
          </p>

          <p className="mt-4">
            11. Zonneplaneet B.V. is gerechtigd de actie op ieder moment te
            wijzigen of te beëindigen. Aanmeldingen die vóór de wijziging zijn
            gedaan, worden afgehandeld volgens de op dat moment geldende
            voorwaarden.
          </p>

          <p className="mt-4">
            12. Zonneplaneet B.V. behoudt zich het recht voor deelname te
            weigeren bij misbruik, onjuiste opgave of vermoeden daarvan.
          </p>
        </section>

        <section aria-labelledby="artikel-19">
          <h2 id="artikel-19" className="mt-12 text-2xl font-semibold">
            Artikel 19. Referralactie
          </h2>

          <p className="mt-4">
            1. De referralactie houdt in dat degene die een andere partij
            aandraagt (hierna: de Aandrager) een vergoeding van € 200 ontvangt,
            indien de aangedragen partij overgaat tot aanschaf van een product
            waarop de actie van toepassing is.
          </p>

          <p className="mt-4">
            2. De Aandrager meldt de aangedragen partij aan via de website en
            verklaart daarbij toestemming te hebben om diens gegevens door te
            geven.
          </p>

          <p className="mt-4">
            3. De aangedragen partij mag op het moment van aanmelding nog niet
            als klant of als lopende aanvraag bij Zonneplaneet B.V. bekend zijn.
          </p>

          <p className="mt-4">
            4. De vergoeding wordt uitgekeerd nadat de installatie bij de
            aangedragen partij is opgeleverd en de volledige factuur is voldaan.
          </p>

          <p className="mt-4">
            5. De uitkering vindt plaats uiterlijk dertig (30) dagen nadat
            zowel de oplevering als de volledige betaling van de factuur hebben
            plaatsgevonden.
          </p>

          <p className="mt-4">
            6. De vergoeding wordt per bankoverschrijving uitbetaald op een
            Nederlandse bankrekening op naam van de Aandrager. De Aandrager
            levert daarvoor op eerste verzoek van Zonneplaneet B.V. schriftelijk
            zijn naam, IBAN-nummer en de tenaamstelling van de rekening aan.
            Zolang deze gegevens ontbreken of onjuist zijn, wordt de uitkering
            opgeschort.
          </p>

          <p className="mt-4">
            7. Per aangedragen partij wordt maximaal één vergoeding uitgekeerd.
          </p>

          <p className="mt-4">
            8. Er geldt geen maximum aantal aanmeldingen per Aandrager.
          </p>

          <p className="mt-4">
            9. De Aandrager kan zichzelf niet aandragen.
          </p>

          <p className="mt-4">
            10. De referralactie kan worden gecombineerd met de clubactie.
          </p>

          <p className="mt-4">
            11. De Aandrager is zelf verantwoordelijk voor de fiscale gevolgen
            van de ontvangen vergoeding, waaronder de opgave in de
            belastingaangifte. Zonneplaneet B.V. verricht geen inhoudingen,
            tenzij zij daartoe wettelijk verplicht is. Aan deze voorwaarden
            kunnen geen rechten worden ontleend over de fiscale kwalificatie van
            de vergoeding.
          </p>

          <p className="mt-4">
            12. Zonneplaneet B.V. is gerechtigd de actie op ieder moment te
            wijzigen of te beëindigen. Aanmeldingen die vóór de wijziging zijn
            gedaan, worden afgehandeld volgens de op dat moment geldende
            voorwaarden.
          </p>

          <p className="mt-4">
            13. Zonneplaneet B.V. behoudt zich het recht voor uitkering te
            weigeren bij misbruik, onjuiste opgave of vermoeden daarvan.
          </p>
        </section>
      </section>
    </main>
  );
}
