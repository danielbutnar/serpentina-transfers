// English copy for the route pages (/[lang]/routes/…). routes-ro.ts and routes-de.ts have the same shape.
export const routesEn = {
  metaTitle: "{code} → {to}: airport transfer (concept)",
  metaDescription: "Fixed-price transfer from {airport} to {to}: about {km} km, {time} by car. Concept website.",
  title: "{airport} to {to}",
  introVia: "About {km} km and {time} by car, via {via}. Fixed price per vehicle, whatever the traffic.",
  introDirect: "About {km} km and {time} by car. Fixed price per vehicle, whatever the traffic.",
  facts: { distance: "Distance", time: "Drive time", car: "Car, 1–4 passengers", minibus: "Minibus, 5–8 passengers" },
  book: "Book this route",
  meetTitle: "Where you meet your driver",
  meet: "After baggage claim, at the arrivals exit of {airport}. Your driver holds a sign with your name and follows your flight, so a late landing is no problem.",
  roadTitle: "On the road",
  road: {
    prahova:
      "From Otopeni the car takes the A3 motorway to Ploiești, then the DN1 through the Prahova Valley. On Friday evenings and Sunday afternoons the DN1 is busy, so allow up to an hour more. The price stays the same.",
    local: "A short ride on local roads: Brașov-Ghimbav airport is just west of Brașov.",
    fagaras: "The DN1 runs east from Sibiu along the Făgăraș Mountains, through Făgăraș and Codlea.",
    transylvania: "The route crosses Transylvania through Târgu Mureș and Sighișoara, a medieval town worth a stop on the way back.",
  },
  winter: "From November to March our cars run on winter tyres and carry snow chains for the mountain roads.",
  others: "Other routes from {airport}",
  index: {
    metaTitle: "All routes · Serpentina Transfers (concept)",
    title: "All routes",
    intro: "Fixed prices per vehicle from four airports to five destinations. Pick a route to see the map and the details.",
    seeAll: "See all routes",
  },
};

export type RoutesDictionary = typeof routesEn;
