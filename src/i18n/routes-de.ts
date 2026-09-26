import type { RoutesDictionary } from "./routes-en";

// German copy for the route pages (formal "Sie"). Draft for the owner's review.
export const routesDe: RoutesDictionary = {
  metaTitle: "{code} → {to}: Flughafentransfer (Konzept)",
  metaDescription: "Transfer zum Festpreis von {airport} nach {to}: etwa {km} km, {time} mit dem Auto. Konzept-Website.",
  title: "Von {airport} nach {to}",
  introVia: "Etwa {km} km und {time} mit dem Auto, über {via}. Festpreis pro Fahrzeug, egal wie der Verkehr ist.",
  introDirect: "Etwa {km} km und {time} mit dem Auto. Festpreis pro Fahrzeug, egal wie der Verkehr ist.",
  facts: { distance: "Entfernung", time: "Fahrzeit", car: "Pkw, 1–4 Personen", minibus: "Kleinbus, 5–8 Personen" },
  book: "Diese Strecke buchen",
  meetTitle: "Wo Sie Ihren Fahrer treffen",
  meet: "Nach der Gepäckausgabe am Ausgang der Ankunftshalle von {airport}. Ihr Fahrer hält ein Schild mit Ihrem Namen und verfolgt Ihren Flug, eine verspätete Landung ist also kein Problem.",
  roadTitle: "Unterwegs",
  road: {
    prahova:
      "Ab Otopeni geht es über die Autobahn A3 bis Ploiești, dann auf der DN1 durch das Prahova-Tal. Freitagabends und sonntagnachmittags ist die DN1 stark befahren, rechnen Sie mit bis zu einer Stunde mehr. Der Preis bleibt gleich.",
    local: "Eine kurze Fahrt auf Landstraßen: Der Flughafen Brașov-Ghimbav liegt direkt westlich von Brașov.",
    fagaras: "Die DN1 führt von Sibiu nach Osten entlang des Făgăraș-Gebirges, über Făgăraș und Codlea.",
    transylvania:
      "Die Strecke führt quer durch Siebenbürgen über Târgu Mureș und Sighișoara, eine mittelalterliche Stadt, die auf dem Rückweg einen Halt lohnt.",
  },
  winter: "Von November bis März fahren unsere Autos mit Winterreifen und haben Schneeketten für die Bergstraßen dabei.",
  others: "Weitere Strecken ab {airport}",
  index: {
    metaTitle: "Alle Strecken · Serpentina Transfers (Konzept)",
    title: "Alle Strecken",
    intro: "Festpreise pro Fahrzeug von vier Flughäfen zu fünf Zielen. Wählen Sie eine Strecke für Karte und Details.",
    seeAll: "Alle Strecken ansehen",
  },
};
