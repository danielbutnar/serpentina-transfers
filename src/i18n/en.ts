import { bookEn } from "./book-en";
import { adminEn } from "./admin-en";
import { manageEn } from "./manage-en";

// English copy. Base texts come from the Claude Design hand-off; ro.ts and de.ts must have the same shape.
export const en = {
  meta: {
    title: "Serpentina Transfers: Brașov airport transfers (concept)",
    description:
      "Concept website for a fictional airport-transfer company in Brașov: fixed prices from Otopeni, Brașov-Ghimbav, Sibiu and Cluj, booked in under a minute.",
  },
  skip: "Skip to the booking form",
  concept: "Concept project, not a real company",
  portfolio: "Portfolio work",
  nav: { label: "Main", routes: "Routes", fleet: "Fleet", faq: "FAQ", contact: "Contact" },
  languageLabel: "Language",
  airports: { OTP: "Bucharest Otopeni", GHV: "Brașov-Ghimbav", SBZ: "Sibiu", CLJ: "Cluj-Napoca" },
  hero: {
    title: "Airport transfers to Brașov and the mountains",
    sub: "Fixed price up front. Book in under a minute on your phone. Your driver waits at arrivals with your name on a sign.",
    destinationsLabel: "Destinations",
    signNote: "This is the sign your driver holds at arrivals.",
  },
  sign: { company: "Serpentina Transfers", yourName: "Your name", preview: "Preview of the sign your driver holds" },
  form: {
    title: "Your transfer",
    from: "From",
    to: "To",
    date: "Date and time",
    passengers: "Passengers",
    fewer: "Fewer passengers",
    more: "More passengers",
    signLabel: "Name on the sign",
    fixed: "fixed price",
    car: "Car · up to 4 passengers",
    minibus: "Minibus · 5–8 passengers",
    book: "Book this transfer",
    included: "Fuel, luggage and 60 min of waiting included.",
  },
  routes: {
    title: "Routes & prices",
    note: "Price per vehicle: car (1–4) / minibus (5–8). Click a price to load it into the form.",
    noteMobile: "Car / minibus price. Tap a route to load it into the form.",
    matrixHead: "To ↓ / From →",
    caption: "Price per vehicle from each airport to each destination",
    airportsLabel: "Airport",
    destination: "Destination",
    cell: "{from} to {to}: car {car}, minibus {minibus}. Load into the form",
    loaded: "{from} to {to} is now in the form.",
  },
  fleet: {
    title: "Fleet",
    items: [
      { name: "Sedan", spec: "1–3 pax · 3 suitcases" },
      { name: "Estate", spec: "1–4 pax · 5 suitcases or skis" },
      { name: "Minibus", spec: "5–8 pax · 8 suitcases" },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Where will the driver meet me?",
        a: "In the arrivals hall, right after baggage claim, holding a sign with the name you entered when booking.",
      },
      {
        q: "What if my flight is late?",
        a: "We track your flight and adjust the pickup time. Up to 60 minutes of waiting after landing is included in the price.",
      },
      {
        q: "Is the price really fixed?",
        a: "Yes. The price you see includes fuel, luggage and waiting time. It does not change with traffic or delays.",
      },
      { q: "Do you have child seats?", a: "Yes, free of charge. Add the child’s age in the booking notes." },
      { q: "How do I pay?", a: "By card online after booking, or by card or cash to the driver." },
    ],
  },
  contact: {
    title: "Questions before you book?",
    sub: "WhatsApp in English, Romanian or German. 24/7.",
    whatsapp: "Message us on WhatsApp",
    demo: "This is a concept, so WhatsApp isn’t connected. The phone number and email address are placeholders.",
  },
  map: { mountains: "Carpathians", label: "Map of the route from {from} to {to}, about {km} km." },
  book: bookEn,
  manage: manageEn,
  admin: adminEn,
  links: { label: "More", book: "Book a transfer", manage: "Manage booking", owner: "Owner demo" },
};

export type Dictionary = typeof en;
