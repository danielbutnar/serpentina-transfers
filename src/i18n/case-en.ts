// English copy for the case study page (/[lang]/case-study). case-ro.ts and case-de.ts have the same shape.
// Every figure here must stay true: update it when the site changes.
export const caseEn = {
  metaTitle: "Case study · Serpentina Transfers (concept)",
  metaDescription: "How the Serpentina Transfers concept was designed and built: booking flow, owner dashboard, route pages, accessibility and speed.",
  eyebrow: "Case study",
  title: "Serpentina Transfers: a booking site for airport transfers",
  lead: "A concept website for a fictional transfer company in Brașov, designed and built as a portfolio project. It shows what a small transfer or tour business can have: a fixed price in seconds, a booking finished on a phone in under a minute, and a dashboard behind it.",
  tryBooking: "Try the booking",
  openDashboard: "Open the owner demo",
  briefTitle: "The brief",
  brief:
    "Travellers land at Bucharest Otopeni, Brașov-Ghimbav, Sibiu or Cluj and need to get to Brașov, Poiana Brașov, Bran, Predeal or Sinaia. Many are German or Austrian, and many book late at night on a phone. The site has to answer three questions at once: how much, how do I book, and who picks me up.",
  doesTitle: "What the site does",
  does: [
    "A fixed price on the first screen, per vehicle, in euro, or in lei on the Romanian pages.",
    "The driver’s sign with the traveller’s name, updated while they type.",
    "Booking in three steps: flight lookup, passengers and luggage, a vehicle that fits, return trip, calendar file.",
    "Manage booking: change the pickup time or cancel, with the refund rule explained before confirming.",
    "An owner dashboard: today’s rides with statuses that follow the clock, driver assignment, and a price editor that changes the whole site.",
    "20 route pages with a map drawn from real coordinates, all in English, Romanian and German.",
  ],
  shots: {
    home: "The home page on a desktop: headline, the driver’s sign with the name typed in the form, and the yellow booking panel with a fixed price.",
    booking: "Booking step 1 on a phone: date, pickup time and a flight found by its number.",
    dashboard: "The owner dashboard: key figures and today’s rides, with a delayed flight and rides waiting for a driver.",
  },
  designTitle: "Design decisions",
  design:
    "The look comes from airport wayfinding: yellow and black signs, numbered sections, a strict grid and square corners. The memorable element is the name sign every traveller knows from the arrivals hall. There are no photos: the vehicles and the map are drawn in code. The direction was chosen from two options made in Claude Design, then built by hand.",
  a11yTitle: "Accessibility",
  a11y: "axe checks every page at 375, 768 and 1440 px, and the booking and cancel flows are tested with the keyboard alone: a skip link, a visible label on every field, errors in words next to the field with a summary that takes focus, a native dialog for cancelling, a visible focus ring, and no animation for people who turn motion off.",
  speedTitle: "Speed",
  speed:
    "Lighthouse lab runs on the live site (27 September 2026): performance 100 on desktop; on a throttled phone the score ranged from 73 to 94 between runs on a modest laptop. Accessibility 100 and best practices 100 in every run. The SEO score is lower on purpose: a concept should not show up in search results.",
  builtTitle: "Built with",
  built: [
    "Next.js 16 as a static site on GitHub Pages",
    "React 19, TypeScript, Tailwind CSS 4",
    "34 unit tests for prices, bookings, routes and the dashboard rules",
    "Formatting, types, lint and tests checked on every push",
    "No cookies, no trackers, no requests to other sites",
  ],
  demoTitle: "What is demo",
  demo: "Nothing is charged and nothing is sent. The card payment is a labelled placeholder where a real site would open Stripe’s checkout, bookings are kept only in the visitor’s browser, and prices, drivers and flights are sample data.",
  credit: "Design and build: Daniel Butnar.",
};

export type CaseDictionary = typeof caseEn;
