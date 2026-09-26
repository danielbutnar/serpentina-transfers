# Serpentina Transfers: copy deck (EN / RO / DE)

Written 2026-09-26 for the Claude Design brief (`design-brief.md`) and later for the `messages/*.json` files in the code.

- **Every RO and DE string is a draft.** Review them yourself (native speaker) before the build.
- Voice: plain, specific, short, sentence case. "You" for the traveller, "we" for the company. German uses formal **Sie**, Romanian uses informal **tu**.
- `{curly}` parts are filled in by the code. Example values come from the sample trip: Anna Schmidt, flight ZZ 1234, Otopeni to Poiana Brașov, €105.

## UX copy: hero headline

### Recommended copy
**h1**: Airport transfers to Brașov and the mountains

### Alternatives
| Option | Copy | Tone | Best for |
| --- | --- | --- | --- |
| A | Airport transfers to Brașov and the mountains | Plain, factual | Default. Says what the business does, and Google reads it as such |
| B | Your name is already at arrivals. | Warm, visual | Only with direction A, where the name sign carries the promise |
| C | From the runway to the ridge, at a fixed price. | Evocative | Direction C (poster), if the route pages carry the SEO |

### Rationale
The h1 is the only line everyone reads, so it says what is sold and where. The direction's visual (the sign, the road strip, the poster) carries the personality, and the subline carries the two promises that matter most to a traveller who just landed: the price is fixed, and someone is waiting.

### Localisation notes
- **German order button (§ 312j BGB, "Button-Lösung")**: the button that completes a paid booking must say clearly that it creates a payment obligation. "Zahlungspflichtig buchen" is the safe wording; keep it even in the demo, because it shows DACH clients you know the rule.
- Prices: EN `€105`, DE `105 €`, RO `525 lei` with `(105 €)` after it. Thousands: EN `1,000`, DE and RO `1.000`.
- Times: EN `14:35`, DE `14:35 Uhr`, RO `14:35` or `ora 14:35`. Durations: EN `3 h 15`, DE `3 Std. 15 Min.`, RO `3 h 15 min`.
- German runs about 30 % longer: check "Weiter zu Ihren Daten", "Zahlungspflichtig buchen" and the vehicle names at 375 px.
- RO vehicle names (autoturism, monovolum, microbuz) need your check: pick the words a Romanian customer would use for a 7-seat and a 16-seat vehicle.

---

## Header and footer

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| nav.routes | Routes | Rute | Strecken |
| nav.fleet | Fleet | Flotă | Fahrzeuge |
| nav.faq | FAQ | Întrebări | FAQ |
| nav.manage | Manage booking | Gestionează rezervarea | Buchung verwalten |
| nav.book | Book a transfer | Rezervă un transfer | Transfer buchen |
| nav.language | Language | Limba | Sprache |
| concept.tag | Concept project, not a real company | Proiect concept, nu o firmă reală | Konzeptprojekt, kein echtes Unternehmen |
| footer.concept | Serpentina Transfers is a concept project by Daniel Butnar. The company, prices, drivers and flights are invented. | Serpentina Transfers este un proiect concept realizat de Daniel Butnar. Firma, prețurile, șoferii și zborurile sunt inventate. | Serpentina Transfers ist ein Konzeptprojekt von Daniel Butnar. Unternehmen, Preise, Fahrer und Flüge sind erfunden. |
| footer.contact | Contact | Contact | Kontakt |
| footer.privacy | Privacy | Confidențialitate | Datenschutz |
| footer.imprint | Imprint | Informații legale | Impressum |
| footer.caseStudy | Case study | Studiu de caz | Fallstudie |
| footer.ownerDemo | Owner demo | Demo pentru proprietar | Inhaber-Demo |

## Hero and QuoteForm

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| hero.title | Airport transfers to Brașov and the mountains | Transferuri de la aeroport la Brașov și la munte | Flughafentransfers nach Brașov und in die Berge |
| hero.subline | Fixed price when you book. Your driver follows your flight and waits at arrivals with your name on a sign. | Preț fix din momentul rezervării. Șoferul îți urmărește zborul și te așteaptă la sosiri cu numele tău pe o pancartă. | Festpreis ab der Buchung. Ihr Fahrer verfolgt Ihren Flug und wartet in der Ankunftshalle mit Ihrem Namen auf einem Schild. |
| hero.signBand (direction A, same in every language) | Arrivals / Sosiri / Ankunft | Arrivals / Sosiri / Ankunft | Arrivals / Sosiri / Ankunft |
| quote.from | From | De la | Von |
| quote.to | To | Până la | Nach |
| quote.when | Date and time | Data și ora | Datum und Uhrzeit |
| quote.flight | Or your flight number | Sau numărul zborului | Oder Ihre Flugnummer |
| quote.flightHint | We set the pickup from your landing time. | Stabilim ora de preluare după ora aterizării. | Wir richten die Abholung nach Ihrer Landezeit. |
| quote.passengers | Passengers | Pasageri | Fahrgäste |
| quote.signName | Name on the sign | Numele de pe pancartă | Name auf dem Schild |
| quote.signNameHint | Your driver holds this up at arrivals. | Șoferul o ține la sosiri. | Ihr Fahrer hält es in der Ankunftshalle hoch. |
| quote.loading | Calculating price… | Calculăm prețul… | Preis wird berechnet … |
| quote.price | {price} fixed price | {price} preț fix ({eur}) | {price} Festpreis |
| quote.priceMeta | {vehicle}, about {duration} | {vehicle}, circa {duration} | {vehicle}, ca. {duration} |
| quote.cta | Book this transfer | Rezervă transferul | Diesen Transfer buchen |
| airport.OTP | Bucharest Otopeni (OTP) | București Otopeni (OTP) | Bukarest Otopeni (OTP) |
| airport.GHV | Brașov-Ghimbav (GHV) | Brașov-Ghimbav (GHV) | Brașov-Ghimbav (GHV) |
| airport.SBZ | Sibiu (SBZ) | Sibiu (SBZ) | Sibiu (SBZ) |
| airport.CLJ | Cluj-Napoca (CLJ) | Cluj-Napoca (CLJ) | Cluj-Napoca (CLJ) |

## How it works

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| how.title | How it works | Cum funcționează | So funktioniert es |
| how.1.title | Book at a fixed price | Rezervi la preț fix | Zum Festpreis buchen |
| how.1.body | Choose your route and vehicle. You see the full price before you pay. | Alegi ruta și mașina. Vezi prețul întreg înainte să plătești. | Wählen Sie Strecke und Fahrzeug. Sie sehen den vollen Preis, bevor Sie zahlen. |
| how.2.title | We follow your flight | Îți urmărim zborul | Wir verfolgen Ihren Flug |
| how.2.body | If your flight is late, your driver waits. You don't need to call us. | Dacă zborul întârzie, șoferul te așteaptă. Nu trebuie să ne suni. | Hat Ihr Flug Verspätung, wartet Ihr Fahrer. Sie müssen uns nicht anrufen. |
| how.3.title | Meet your driver at arrivals | Te întâlnești cu șoferul la sosiri | Treffen Sie Ihren Fahrer in der Ankunftshalle |
| how.3.body | After baggage claim, look for your name on a sign. The driver's name and phone number reach you by SMS the day before. | După ce îți iei bagajele, caută-ți numele pe o pancartă. Numele și telefonul șoferului le primești prin SMS cu o zi înainte. | Achten Sie nach der Gepäckausgabe auf Ihren Namen auf einem Schild. Name und Telefonnummer des Fahrers erhalten Sie am Vortag per SMS. |

## Promises

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| promise.title | What you can count on | Pe ce te poți baza | Darauf können Sie sich verlassen |
| promise.fixed | The price you book is the price you pay, fuel and waiting included. | Plătești prețul din rezervare, cu combustibilul și așteptarea incluse. | Sie zahlen den gebuchten Preis, Kraftstoff und Wartezeit inklusive. |
| promise.wait | 60 minutes of free waiting after your flight lands. | 60 de minute de așteptare gratuită după aterizare. | 60 Minuten kostenlose Wartezeit nach der Landung. |
| promise.cancel | Free cancellation up to 24 hours before pickup. | Anulare gratuită cu până la 24 de ore înainte de preluare. | Kostenlose Stornierung bis 24 Stunden vor der Abholung. |
| promise.night | Same price at 3 a.m. | Același preț și la 3 noaptea. | Derselbe Preis auch um 3 Uhr nachts. |
| promise.kids | Child seats free on request. | Scaune pentru copii gratuite, la cerere. | Kindersitze kostenlos auf Anfrage. |

## Popular routes and fleet

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| routes.title | Popular routes | Rute populare | Beliebte Strecken |
| routes.col.route | Route | Rută | Strecke |
| routes.col.time | Drive time | Durata | Fahrzeit |
| routes.col.price | Sedan from | Autoturism, de la | Limousine ab |
| fleet.title | Our cars | Mașinile noastre | Unsere Fahrzeuge |
| fleet.sedan | Sedan | Autoturism | Limousine |
| fleet.sedan.body | Up to 3 passengers and 3 large suitcases. | Până la 3 pasageri și 3 valize mari. | Bis zu 3 Fahrgäste und 3 große Koffer. |
| fleet.van | Van | Monovolum | Van |
| fleet.van.body | Up to 7 passengers and 7 large suitcases, or 4 passengers with skis. | Până la 7 pasageri și 7 valize mari, sau 4 pasageri cu schiuri. | Bis zu 7 Fahrgäste und 7 große Koffer oder 4 Fahrgäste mit Skiern. |
| fleet.minibus | Minibus | Microbuz | Kleinbus |
| fleet.minibus.body | Up to 16 passengers and 16 large suitcases. | Până la 16 pasageri și 16 valize mari. | Bis zu 16 Fahrgäste und 16 große Koffer. |
| extras.title | Extras | Extra | Extras |
| extras.childSeat | Child seat, free | Scaun pentru copii, gratuit | Kindersitz, kostenlos |
| extras.skiBag | Ski or snowboard bag, €5 each | Husă de schi sau snowboard, 25 lei bucata | Ski- oder Snowboardtasche, je 5 € |
| extras.return | Return trip at the same price | Transfer retur la același preț | Rückfahrt zum selben Preis |

## FAQ

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| faq.1.q | Where do I meet my driver? | Unde mă întâlnesc cu șoferul? | Wo treffe ich meinen Fahrer? |
| faq.1.a | After baggage claim, at the arrivals exit. Your driver holds a sign with your name. | După ce îți iei bagajele, la ieșirea de la sosiri. Șoferul ține o pancartă cu numele tău. | Nach der Gepäckausgabe am Ausgang der Ankunftshalle. Ihr Fahrer hält ein Schild mit Ihrem Namen. |
| faq.2.q | What if my flight is late? | Ce se întâmplă dacă zborul întârzie? | Was passiert, wenn mein Flug Verspätung hat? |
| faq.2.a | We follow your flight number and move the pickup to the real landing time. Waiting is free for 60 minutes after landing. | Urmărim numărul zborului și mutăm preluarea la ora reală a aterizării. Așteptarea e gratuită 60 de minute după aterizare. | Wir verfolgen Ihre Flugnummer und verschieben die Abholung auf die tatsächliche Landezeit. Die ersten 60 Minuten nach der Landung warten wir kostenlos. |
| faq.3.q | What does the price include? | Ce include prețul? | Was ist im Preis enthalten? |
| faq.3.a | The car, the driver, fuel, 60 minutes of waiting and your luggage. Child seats are free; ski or snowboard bags cost €5 each. | Mașina, șoferul, combustibilul, 60 de minute de așteptare și bagajele. Scaunele pentru copii sunt gratuite; o husă de schi sau snowboard costă 25 lei. | Fahrzeug, Fahrer, Kraftstoff, 60 Minuten Wartezeit und Ihr Gepäck. Kindersitze sind kostenlos, Ski- oder Snowboardtaschen kosten je 5 €. |
| faq.4.q | How do I pay? | Cum plătesc? | Wie bezahle ich? |
| faq.4.a | By card when you book, or in cash or by card to the driver. Either way you get an invoice by email. | Cu cardul la rezervare, sau cash ori cu cardul la șofer. În ambele cazuri primești factura pe e-mail. | Mit Karte bei der Buchung oder bar bzw. mit Karte beim Fahrer. In beiden Fällen erhalten Sie die Rechnung per E-Mail. |
| faq.5.q | Can I cancel? | Pot anula? | Kann ich stornieren? |
| faq.5.a | Yes, free of charge up to 24 hours before pickup. After that you get 50 % back. | Da, gratuit cu până la 24 de ore înainte de preluare. După aceea primești înapoi 50 %. | Ja, kostenlos bis 24 Stunden vor der Abholung. Danach erstatten wir 50 %. |
| faq.6.q | Do you drive in winter? | Circulați și iarna? | Fahren Sie auch im Winter? |
| faq.6.a | Yes, all year. From November to March our cars have winter tyres and carry snow chains. | Da, tot anul. Din noiembrie până în martie mașinile au anvelope de iarnă și lanțuri în portbagaj. | Ja, das ganze Jahr. Von November bis März fahren unsere Autos mit Winterreifen und haben Schneeketten dabei. |

## Booking flow

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| book.step.trip | Trip | Călătoria | Fahrt |
| book.step.details | Your details | Datele tale | Ihre Daten |
| book.step.payment | Payment | Plata | Zahlung |
| book.stepOf | Step {n} of 3 | Pasul {n} din 3 | Schritt {n} von 3 |
| book.vehicle | Vehicle | Mașina | Fahrzeug |
| book.vehicleTooSmall | Too small for {n} passengers | Prea mică pentru {n} pasageri | Zu klein für {n} Fahrgäste |
| book.childSeats | Child seats | Scaune pentru copii | Kindersitze |
| book.skiBags | Ski or snowboard bags | Huse de schi sau snowboard | Ski- oder Snowboardtaschen |
| book.return | Add a return trip | Adaugă transfer retur | Rückfahrt hinzufügen |
| book.toDetails | Continue to your details | Continuă la datele tale | Weiter zu Ihren Daten |
| book.name | Full name | Nume complet | Vor- und Nachname |
| book.nameHint | We put this on the sign at arrivals. | Îl scriem pe pancarta de la sosiri. | Wir schreiben ihn auf das Schild in der Ankunftshalle. |
| book.email | Email | E-mail | E-Mail |
| book.phone | Mobile number | Număr de mobil | Mobilnummer |
| book.phoneHint | With country code. We text you the driver's details. | Cu prefixul țării. Îți trimitem datele șoferului prin SMS. | Mit Ländervorwahl. Wir schicken Ihnen die Fahrerdaten per SMS. |
| book.notes | Notes for the driver (optional) | Mențiuni pentru șofer (opțional) | Hinweise für den Fahrer (optional) |
| book.toPayment | Continue to payment | Continuă la plată | Weiter zur Zahlung |
| book.back | Back | Înapoi | Zurück |
| book.summary | Your transfer | Transferul tău | Ihr Transfer |
| book.total | Total | Total | Gesamt |
| book.payCard | Pay now by card | Plătești acum cu cardul | Jetzt mit Karte zahlen |
| book.payDriver | Pay the driver, in cash or by card | Plătești la șofer, cash sau cu cardul | Beim Fahrer zahlen, bar oder mit Karte |
| book.submitCard | Book and pay {price} | Rezervă și plătește {price} | Zahlungspflichtig buchen |
| book.submitDriver | Book now, pay the driver | Rezervă acum, plătești la șofer | Zahlungspflichtig buchen |
| book.terms | Our booking terms apply. How we use your data: privacy policy. | Se aplică condițiile noastre de rezervare. Cum folosim datele tale: politica de confidențialitate. | Es gelten unsere Buchungsbedingungen. Wie wir Ihre Daten nutzen: Datenschutzerklärung. |
| book.demo | Demo: no real payment is taken. Use the test card 4242 4242 4242 4242. | Demo: nu se face nicio plată reală. Folosește cardul de test 4242 4242 4242 4242. | Demo: Es wird keine echte Zahlung ausgeführt. Nutzen Sie die Testkarte 4242 4242 4242 4242. |

## Flight lookup

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| flight.searching | Looking up your flight… | Căutăm zborul… | Flug wird gesucht … |
| flight.found | {flight} from {city} lands at {time}. Your driver waits at arrivals from {pickup}. | {flight} din {city} aterizează la {time}. Șoferul te așteaptă la sosiri de la {pickup}. | {flight} aus {city} landet um {time} Uhr. Ihr Fahrer wartet ab {pickup} Uhr in der Ankunftshalle. |
| flight.demo | Demo flight data | Date de zbor demonstrative | Demo-Flugdaten |

## Confirmation

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| done.title | Transfer booked | Transfer rezervat | Transfer gebucht |
| done.body | Booking {ref}. We sent the details to {email}. | Rezervarea {ref}. Ți-am trimis detaliile pe {email}. | Buchung {ref}. Die Details haben wir an {email} geschickt. |
| done.nextTitle | What happens next | Ce urmează | Wie es weitergeht |
| done.next1 | The day before pickup, you get your driver's name and phone number by SMS. | Cu o zi înainte primești prin SMS numele și telefonul șoferului. | Am Vortag erhalten Sie Name und Telefonnummer Ihres Fahrers per SMS. |
| done.next2 | We follow flight {flight}. If it lands late, your driver waits. | Urmărim zborul {flight}. Dacă aterizează mai târziu, șoferul te așteaptă. | Wir verfolgen Flug {flight}. Landet er später, wartet Ihr Fahrer. |
| done.next3 | After baggage claim, look for this sign: | După ce îți iei bagajele, caută pancarta asta: | Achten Sie nach der Gepäckausgabe auf dieses Schild: |
| done.calendar | Add to calendar | Adaugă în calendar | Zum Kalender hinzufügen |
| done.whatsapp | Share on WhatsApp | Trimite pe WhatsApp | Per WhatsApp teilen |
| done.manage | Manage booking | Gestionează rezervarea | Buchung verwalten |

## Errors

Pattern: what happened, then how to fix it. Shown next to the field and repeated in an error summary at the top of the step.

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| error.summary | Check {n} fields before you continue: | Verifică {n} câmpuri înainte să continui: | Bitte prüfen Sie {n} Felder, bevor Sie fortfahren: |
| error.name | Enter your full name so the driver can put it on the sign. | Scrie numele complet, ca șoferul să-l poată pune pe pancartă. | Geben Sie Ihren vollständigen Namen ein, damit der Fahrer ihn auf das Schild schreiben kann. |
| error.email | Enter an email address like name@example.com. | Scrie o adresă de e-mail de forma nume@exemplu.ro. | Geben Sie eine E-Mail-Adresse wie name@beispiel.de ein. |
| error.phone | Enter a mobile number with the country code, like +44 7700 900123. | Scrie numărul de mobil cu prefixul țării, de exemplu +40 722 123 456. | Geben Sie eine Mobilnummer mit Ländervorwahl ein, z. B. +49 151 23456789. |
| error.flightNotFound | We can't find flight {flight} on {date}. Check the number on your ticket, or enter your landing time instead. | Nu găsim zborul {flight} pe {date}. Verifică numărul pe bilet sau scrie ora aterizării. | Wir finden Flug {flight} am {date} nicht. Prüfen Sie die Nummer auf Ihrem Ticket oder geben Sie stattdessen die Landezeit ein. |
| error.tooSoon | Pickups need at least 6 hours' notice. Choose a later time, or call us on +40 268 000 000. | Preluările se rezervă cu cel puțin 6 ore înainte. Alege o oră mai târzie sau sună-ne la +40 268 000 000. | Abholungen brauchen mindestens 6 Stunden Vorlauf. Wählen Sie eine spätere Uhrzeit oder rufen Sie uns an: +40 268 000 000. |
| error.tooManyPassengers | A sedan takes up to 3 passengers. Choose the van for 4 to 7. | Autoturismul ia cel mult 3 pasageri. Pentru 4–7 pasageri alege monovolumul. | Eine Limousine fasst bis zu 3 Fahrgäste. Für 4 bis 7 wählen Sie den Van. |
| error.cardDeclined | Your bank declined the card. Try another card, or choose to pay the driver. | Banca a refuzat cardul. Încearcă alt card sau alege plata la șofer. | Ihre Bank hat die Karte abgelehnt. Versuchen Sie eine andere Karte oder zahlen Sie beim Fahrer. |
| error.priceFailed | We couldn't calculate the price. Check your connection and try again. | Nu am putut calcula prețul. Verifică conexiunea și încearcă din nou. | Der Preis konnte nicht berechnet werden. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut. |
| error.retry | Try again | Încearcă din nou | Erneut versuchen |

## Manage booking

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| manage.title | Manage booking | Gestionează rezervarea | Buchung verwalten |
| manage.ref | Booking reference | Codul rezervării | Buchungsnummer |
| manage.refHint | It starts with SRP, like SRP-4827. | Începe cu SRP, de exemplu SRP-4827. | Sie beginnt mit SRP, z. B. SRP-4827. |
| manage.email | Email used for the booking | E-mailul folosit la rezervare | E-Mail-Adresse der Buchung |
| manage.find | Find booking | Găsește rezervarea | Buchung finden |
| manage.notFound | We can't find booking {ref} with this email. Check both in your confirmation email. | Nu găsim rezervarea {ref} cu acest e-mail. Verifică-le pe amândouă în e-mailul de confirmare. | Wir finden die Buchung {ref} mit dieser E-Mail-Adresse nicht. Prüfen Sie beides in Ihrer Bestätigungs-E-Mail. |
| manage.driverPending | Driver details appear here 24 hours before pickup. | Datele șoferului apar aici cu 24 de ore înainte de preluare. | Die Fahrerdaten erscheinen hier 24 Stunden vor der Abholung. |
| manage.changeTime | Change pickup time | Schimbă ora de preluare | Abholzeit ändern |
| manage.timeChanged | Pickup moved to {time}. We sent the new details to {email}. | Preluarea s-a mutat la ora {time}. Ți-am trimis detaliile noi pe {email}. | Abholung auf {time} Uhr verschoben. Die neuen Details haben wir an {email} geschickt. |
| manage.cancel | Cancel transfer | Anulează transferul | Transfer stornieren |
| cancel.title | Cancel your transfer on {date}? | Anulezi transferul din {date}? | Transfer am {date} stornieren? |
| cancel.bodyFree | Cancellation is free until 24 hours before pickup. {price} goes back to your card within 5 to 10 days. | Anularea e gratuită până cu 24 de ore înainte de preluare. Primești înapoi {price} pe card în 5–10 zile. | Bis 24 Stunden vor der Abholung ist die Stornierung kostenlos. Sie erhalten {price} innerhalb von 5 bis 10 Tagen auf Ihre Karte zurück. |
| cancel.confirm | Cancel transfer | Anulează transferul | Transfer stornieren |
| cancel.keep | Keep transfer | Păstrează transferul | Transfer behalten |
| cancel.done | Transfer cancelled. {price} goes back to your card within 5 to 10 days. | Transfer anulat. Primești înapoi {price} pe card în 5–10 zile. | Transfer storniert. Sie erhalten {price} innerhalb von 5 bis 10 Tagen auf Ihre Karte zurück. |

## Owner dashboard

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| admin.demoBanner | Owner demo with sample data. Changes reset every night. | Demo pentru proprietar, cu date de exemplu. Modificările se resetează în fiecare noapte. | Inhaber-Demo mit Beispieldaten. Änderungen werden jede Nacht zurückgesetzt. |
| admin.today | Today's rides | Cursele de azi | Heutige Fahrten |
| admin.col.pickup | Pickup | Preluare | Abholung |
| admin.col.passenger | Passenger | Pasager | Fahrgast |
| admin.col.route | Route | Rută | Strecke |
| admin.col.flight | Flight | Zbor | Flug |
| admin.col.vehicle | Vehicle | Mașină | Fahrzeug |
| admin.col.driver | Driver | Șofer | Fahrer |
| admin.col.status | Status | Stare | Status |
| status.scheduled | Scheduled | Programată | Geplant |
| status.enRoute | Driver on the way | Șoferul e pe drum | Fahrer unterwegs |
| status.waiting | Waiting at arrivals | Așteaptă la sosiri | Wartet in der Ankunftshalle |
| status.onBoard | On board | Pasager preluat | Fahrgast an Bord |
| status.completed | Completed | Finalizată | Abgeschlossen |
| status.delayed | Flight delayed {minutes} min | Zbor întârziat {minutes} min | Flug {minutes} Min. verspätet |
| admin.noDriver | No driver yet | Fără șofer | Noch kein Fahrer |
| admin.assign | Assign driver | Alocă șofer | Fahrer zuweisen |
| admin.assigned | {driver} now drives the {time} pickup. | {driver} preia cursa de la {time}. | {driver} übernimmt die Abholung um {time} Uhr. |
| admin.empty | No rides today. New bookings appear here as soon as they're confirmed. | Nicio cursă azi. Rezervările noi apar aici imediat ce sunt confirmate. | Heute keine Fahrten. Neue Buchungen erscheinen hier, sobald sie bestätigt sind. |
| admin.drivers | Drivers | Șoferi | Fahrer |
| admin.speaks | Speaks | Vorbește | Spricht |
| admin.ridesToday | Rides today | Curse azi | Fahrten heute |
| admin.prices | Route prices | Prețuri pe rute | Streckenpreise |
| admin.savePrices | Save prices | Salvează prețurile | Preise speichern |
| admin.pricesSaved | Prices saved. New bookings use them from now on; existing bookings keep their price. | Prețuri salvate. Rezervările noi le folosesc de acum; cele existente își păstrează prețul. | Preise gespeichert. Neue Buchungen nutzen sie ab sofort, bestehende behalten ihren Preis. |
| admin.priceInvalid | Enter a price between €10 and €1,000. | Scrie un preț între 50 și 5.000 lei. | Geben Sie einen Preis zwischen 10 € und 1.000 € ein. |

## Route page (example: Otopeni to Poiana Brașov)

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| route.title | Otopeni Airport to Poiana Brașov | De la Aeroportul Otopeni la Poiana Brașov | Vom Flughafen Otopeni nach Poiana Brașov |
| route.intro | About 185 km and 3 h 15 by car, on the A3 motorway and then the DN1 through the Prahova Valley. | Circa 185 km și 3 h 15 min cu mașina, pe autostrada A3 și apoi pe DN1, prin Valea Prahovei. | Etwa 185 km und 3 Std. 15 Min. mit dem Auto, über die Autobahn A3 und dann die DN1 durch das Prahova-Tal. |
| route.traffic | On Friday evenings and Sunday afternoons the DN1 is busy. Allow up to an hour more; the price stays the same. | Vineri seara și duminică după-amiaza DN1 e aglomerat. Socotește până la o oră în plus; prețul rămâne același. | Freitagabends und sonntagnachmittags ist die DN1 stark befahren. Rechnen Sie mit bis zu einer Stunde mehr; der Preis bleibt gleich. |
| route.meetTitle | Where you meet your driver | Unde te întâlnești cu șoferul | Wo Sie Ihren Fahrer treffen |
| route.meet | After baggage claim, at the arrivals exit. Your driver holds a sign with your name. | După ce îți iei bagajele, la ieșirea de la sosiri. Șoferul ține o pancartă cu numele tău. | Nach der Gepäckausgabe am Ausgang der Ankunftshalle. Ihr Fahrer hält ein Schild mit Ihrem Namen. |
| route.winter | From November to March our cars run on winter tyres and carry snow chains for the last climb to Poiana. | Din noiembrie până în martie mașinile au anvelope de iarnă și lanțuri pentru urcarea spre Poiana. | Von November bis März fahren unsere Autos mit Winterreifen und haben Schneeketten für den letzten Anstieg nach Poiana dabei. |

## 404

| Key | EN | RO | DE |
| --- | --- | --- | --- |
| notFound.title | This page doesn't exist | Pagina asta nu există | Diese Seite gibt es nicht |
| notFound.body | The link may be old. Get a price on the home page, or check your booking. | Linkul poate fi vechi. Vezi un preț pe prima pagină sau verifică-ți rezervarea. | Der Link ist vielleicht veraltet. Einen Preis finden Sie auf der Startseite, Ihre Buchung unter „Buchung verwalten“. |
| notFound.home | Go to the home page | Mergi la prima pagină | Zur Startseite |
