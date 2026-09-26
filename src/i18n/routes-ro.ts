import type { RoutesDictionary } from "./routes-en";

// Romanian copy for the route pages (informal "tu"). Draft for the owner's review.
export const routesRo: RoutesDictionary = {
  metaTitle: "{code} → {to}: transfer de la aeroport (concept)",
  metaDescription: "Transfer cu preț fix de la {airport} la {to}: circa {km} km, {time} cu mașina. Site concept.",
  title: "De la {airport} la {to}",
  introVia: "Circa {km} km și {time} cu mașina, prin {via}. Preț fix pe vehicul, oricât ar fi traficul.",
  introDirect: "Circa {km} km și {time} cu mașina. Preț fix pe vehicul, oricât ar fi traficul.",
  facts: { distance: "Distanța", time: "Durata", car: "Autoturism, 1–4 pasageri", minibus: "Microbuz, 5–8 pasageri" },
  book: "Rezervă ruta asta",
  meetTitle: "Unde te întâlnești cu șoferul",
  meet: "După ce îți iei bagajele, la ieșirea de la sosiri din {airport}. Șoferul ține o pancartă cu numele tău și îți urmărește zborul, așa că o aterizare întârziată nu e o problemă.",
  roadTitle: "Pe drum",
  road: {
    prahova:
      "De la Otopeni mașina merge pe autostrada A3 până la Ploiești, apoi pe DN1 prin Valea Prahovei. Vineri seara și duminică după-amiaza DN1 e aglomerat, așa că socotește până la o oră în plus. Prețul rămâne același.",
    local: "O cursă scurtă pe drumuri locale: aeroportul Brașov-Ghimbav este chiar la vest de Brașov.",
    fagaras: "DN1 merge spre est de la Sibiu, de-a lungul Munților Făgăraș, prin Făgăraș și Codlea.",
    transylvania: "Ruta traversează Transilvania prin Târgu Mureș și Sighișoara, un oraș medieval care merită o oprire la întoarcere.",
  },
  winter: "Din noiembrie până în martie mașinile au anvelope de iarnă și lanțuri pentru drumurile de munte.",
  others: "Alte rute de la {airport}",
  index: {
    metaTitle: "Toate rutele · Serpentina Transfers (concept)",
    title: "Toate rutele",
    intro: "Prețuri fixe pe vehicul de la patru aeroporturi la cinci destinații. Alege o rută ca să vezi harta și detaliile.",
    seeAll: "Vezi toate rutele",
  },
};
