import { bookDe } from "./book-de";
import { manageDe } from "./manage-de";
import type { Dictionary } from "./en";

// German copy (formal "Sie"). Draft from the Claude Design hand-off, for the owner's review.
export const de: Dictionary = {
  meta: {
    title: "Serpentina Transfers: Flughafentransfer Brașov (Konzept)",
    description:
      "Konzept-Website für ein fiktives Transferunternehmen in Brașov: Festpreise ab Otopeni, Brașov-Ghimbav, Sibiu und Cluj, in unter einer Minute gebucht.",
  },
  skip: "Zum Buchungsformular springen",
  concept: "Konzeptprojekt, kein echtes Unternehmen",
  portfolio: "Portfolio-Arbeit",
  nav: { label: "Hauptnavigation", routes: "Strecken", fleet: "Flotte", faq: "FAQ", contact: "Kontakt" },
  languageLabel: "Sprache",
  airports: { OTP: "Bukarest Otopeni", GHV: "Brașov-Ghimbav", SBZ: "Sibiu", CLJ: "Cluj-Napoca" },
  hero: {
    // U+00AD soft hyphen, so phones break the long word as "Flughafen-transfers".
    title: "Flughafen\u00ADtransfers nach Brașov und in die Berge",
    sub: "Festpreis von Anfang an. In unter einer Minute per Handy gebucht. Ihr Fahrer wartet in der Ankunftshalle mit Ihrem Namen auf einem Schild.",
    destinationsLabel: "Ziele",
    signNote: "Dieses Schild hält Ihr Fahrer in der Ankunftshalle.",
  },
  sign: { company: "Serpentina Transfers", yourName: "Ihr Name", preview: "Vorschau des Schilds, das Ihr Fahrer hält" },
  form: {
    title: "Ihr Transfer",
    from: "Von",
    to: "Nach",
    date: "Datum und Uhrzeit",
    passengers: "Personen",
    fewer: "Weniger Personen",
    more: "Mehr Personen",
    signLabel: "Name auf dem Schild",
    fixed: "Festpreis",
    car: "Pkw · bis 4 Personen",
    minibus: "Kleinbus · 5–8 Personen",
    book: "Diesen Transfer buchen",
    included: "Kraftstoff, Gepäck und 60 Min. Wartezeit inklusive.",
  },
  routes: {
    title: "Strecken & Preise",
    note: "Preis pro Fahrzeug: Pkw (1–4) / Kleinbus (5–8). Klicken Sie auf einen Preis, um ihn ins Formular zu übernehmen.",
    noteMobile: "Preis Pkw / Kleinbus. Tippen Sie auf eine Strecke, um sie zu übernehmen.",
    matrixHead: "Nach ↓ / Von →",
    caption: "Preis pro Fahrzeug von jedem Flughafen zu jedem Ziel",
    airportsLabel: "Flughafen",
    destination: "Ziel",
    cell: "{from} nach {to}: Pkw {car}, Kleinbus {minibus}. Ins Formular übernehmen",
    loaded: "{from} nach {to} ist jetzt im Formular.",
  },
  fleet: {
    title: "Flotte",
    items: [
      { name: "Limousine", spec: "1–3 Pers. · 3 Koffer" },
      { name: "Kombi", spec: "1–4 Pers. · 5 Koffer oder Ski" },
      { name: "Kleinbus", spec: "5–8 Pers. · 8 Koffer" },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Wo treffe ich den Fahrer?",
        a: "In der Ankunftshalle direkt nach der Gepäckausgabe, mit einem Schild, auf dem der Name aus Ihrer Buchung steht.",
      },
      {
        q: "Was passiert, wenn mein Flug Verspätung hat?",
        a: "Wir verfolgen Ihren Flug und passen die Abholzeit an. Bis zu 60 Minuten Wartezeit nach der Landung sind im Preis enthalten.",
      },
      {
        q: "Ist der Preis wirklich fest?",
        a: "Ja. Der angezeigte Preis enthält Kraftstoff, Gepäck und Wartezeit. Er ändert sich nicht bei Stau oder Verspätungen.",
      },
      { q: "Gibt es Kindersitze?", a: "Ja, kostenlos. Geben Sie das Alter des Kindes in den Buchungsnotizen an." },
      { q: "Wie bezahle ich?", a: "Online per Karte nach der Buchung oder beim Fahrer per Karte oder bar." },
    ],
  },
  contact: {
    title: "Fragen vor der Buchung?",
    sub: "Per WhatsApp auf Englisch, Rumänisch oder Deutsch. Rund um die Uhr.",
    whatsapp: "Schreiben Sie uns per WhatsApp",
    demo: "Dies ist ein Konzeptprojekt, WhatsApp ist daher nicht verbunden. Telefonnummer und E-Mail-Adresse sind Platzhalter.",
  },
  map: { mountains: "Karpaten", label: "Karte der Strecke von {from} nach {to}, etwa {km} km." },
  book: bookDe,
  manage: manageDe,
  links: { label: "Mehr", book: "Transfer buchen", manage: "Buchung verwalten" },
};
