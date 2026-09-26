import type { CaseDictionary } from "./case-en";

// German copy for the case study page (formal "Sie"). Draft for the owner's review.
export const caseDe: CaseDictionary = {
  metaTitle: "Fallstudie · Serpentina Transfers (Konzept)",
  metaDescription: "Wie das Konzept Serpentina Transfers gestaltet und gebaut wurde: Buchung, Inhaber-Dashboard, Streckenseiten, Barrierefreiheit und Tempo.",
  eyebrow: "Fallstudie",
  title: "Serpentina Transfers: eine Buchungswebsite für Flughafentransfers",
  lead: "Eine Konzept-Website für ein fiktives Transferunternehmen in Brașov, gestaltet und gebaut als Portfolio-Projekt. Sie zeigt, was ein kleines Transfer- oder Tourunternehmen haben kann: einen Festpreis in Sekunden, eine Buchung in unter einer Minute auf dem Handy und ein Dashboard dahinter.",
  tryBooking: "Buchung ausprobieren",
  openDashboard: "Inhaber-Demo öffnen",
  briefTitle: "Die Aufgabe",
  brief:
    "Reisende landen in Bukarest Otopeni, Brașov-Ghimbav, Sibiu oder Cluj und wollen nach Brașov, Poiana Brașov, Bran, Predeal oder Sinaia. Viele kommen aus Deutschland oder Österreich, viele buchen spätabends auf dem Handy. Die Website muss drei Fragen auf einmal beantworten: Was kostet es, wie buche ich, und wer holt mich ab?",
  doesTitle: "Was die Website kann",
  does: [
    "Ein Festpreis auf der ersten Seite, pro Fahrzeug, in Euro oder auf den rumänischen Seiten in Lei.",
    "Das Schild des Fahrers mit dem Namen des Fahrgasts, das sich beim Tippen mitändert.",
    "Buchung in drei Schritten: Flugsuche, Personen und Gepäck, ein passendes Fahrzeug, Rückfahrt, Kalenderdatei.",
    "Buchung verwalten: Abholzeit ändern oder stornieren, mit der Erstattungsregel vor der Bestätigung.",
    "Ein Inhaber-Dashboard: die Fahrten des Tages mit einem Status, der der Uhr folgt, Fahrerzuweisung und ein Preiseditor, der die ganze Website ändert.",
    "20 Streckenseiten mit einer Karte aus echten Koordinaten, alles auf Englisch, Rumänisch und Deutsch.",
  ],
  shots: {
    home: "Die Startseite am Desktop: Überschrift, das Fahrerschild mit dem im Formular eingegebenen Namen und das gelbe Buchungsfeld mit Festpreis.",
    booking: "Buchungsschritt 1 auf dem Handy: Datum, Abholzeit und ein über die Nummer gefundener Flug.",
    dashboard: "Das Inhaber-Dashboard: Kennzahlen und die Fahrten des Tages, mit einem verspäteten Flug und Fahrten, die noch einen Fahrer brauchen.",
  },
  designTitle: "Gestaltung",
  design:
    "Der Look kommt aus der Flughafen-Beschilderung: gelbe und schwarze Schilder, nummerierte Abschnitte, ein strenges Raster und eckige Formen. Das prägende Element ist das Namensschild, das jeder Reisende aus der Ankunftshalle kennt. Es gibt keine Fotos: Fahrzeuge und Karte sind im Code gezeichnet. Die Richtung wurde aus zwei Entwürfen in Claude Design gewählt und dann von Hand umgesetzt.",
  a11yTitle: "Barrierefreiheit",
  a11y: "axe prüft jede Seite bei 375, 768 und 1440 px, Buchung und Stornierung werden nur mit der Tastatur getestet: ein Link zum Inhalt, eine sichtbare Beschriftung an jedem Feld, Fehler in Worten direkt am Feld mit einer Zusammenfassung, die den Fokus erhält, ein nativer Dialog zum Stornieren, ein sichtbarer Fokus und keine Animation für alle, die Bewegung ausgeschaltet haben.",
  speedTitle: "Tempo",
  speed:
    "Lighthouse-Labormessungen auf der Live-Website (27. September 2026): Leistung 100 am Desktop; auf einem gedrosselten Handy lag der Wert je nach Durchlauf zwischen 73 und 94, gemessen auf einem einfachen Laptop. Barrierefreiheit 100 und Best Practices 100 in jedem Durchlauf. Der SEO-Wert ist absichtlich niedriger: Ein Konzept soll nicht in Suchergebnissen erscheinen.",
  builtTitle: "Technik",
  built: [
    "Next.js 16 als statische Website auf GitHub Pages",
    "React 19, TypeScript, Tailwind CSS 4",
    "34 Unit-Tests für Preise, Buchungen, Strecken und die Dashboard-Regeln",
    "Formatierung, Typen, Lint und Tests bei jedem Push geprüft",
    "Keine Cookies, keine Tracker, keine Anfragen an andere Websites",
  ],
  demoTitle: "Was Demo ist",
  demo: "Es wird nichts berechnet und nichts verschickt. Die Kartenzahlung ist ein gekennzeichneter Platzhalter, an dem eine echte Website den Stripe-Checkout öffnen würde, Buchungen bleiben nur im Browser des Besuchers, und Preise, Fahrer und Flüge sind Beispieldaten.",
  credit: "Gestaltung und Umsetzung: Daniel Butnar.",
};
