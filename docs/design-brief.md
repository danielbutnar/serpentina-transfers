# Serpentina Transfers: Claude Design brief

Written 2026-09-26. Concept portfolio site for a fictional airport-transfer company in Brașov. The design is made in Claude Design and the code in Claude Code.

## How to use this file

1. In Claude Design, create a new project called "Serpentina Transfers".
2. Paste **Part 1** as the first message and attach `copy-deck.md` (all texts, EN/RO/DE).
3. Send the **stage prompts** in Part 3 one at a time. Review each stage and fix it with inline comments before sending the next one.
4. Stage 1 ends with you choosing one of three directions. Tell Claude Design which one, and delete the other two from the project.
5. After stage 8, use Share → **Hand off to Claude Code** and open the bundle in `C:\Users\danie\code\danielbutnar\serpentina-transfers`.

---

## Part 1: Project context (paste as the first message)

```text
Project: Serpentina Transfers, a concept website for a fictional airport-transfer company in Brașov, Romania. It is a portfolio piece for a freelance web developer (shown on Contra). It must look and work like a real business, and carry a visible "Concept project, not a real company" label on every page.

Who books (the fictional customers): tourists and business travellers landing at Bucharest Otopeni (OTP), Brașov-Ghimbav (GHV), Sibiu (SBZ) or Cluj (CLJ) who need to get to Brașov, Poiana Brașov, Bran, Predeal or Sinaia. Many are German or Austrian. Families with luggage, skiers in winter, late-night arrivals. Most book on a phone, often outside office hours.

Who judges the portfolio: owners of small tour, transfer and guesthouse businesses, and clients hiring on Contra. They must see: a fixed price within seconds, a booking finished in under a minute on a phone, and an owner dashboard behind it.

Primary job of the site: get a fixed price and book a transfer in under a minute on a phone.

Languages: EN (design in English), RO and DE through a language switch in the header. German runs about 30 % longer than English, so every button and label must survive the German text at 375 px. Prices in EUR; the RO version shows lei first and euro second.

Hard rules:
- Every screen at 375 px and 1440 px.
- WCAG 2.2 AA: text contrast at least 4.5:1, UI parts 3:1, visible keyboard focus, touch targets at least 44 px, one h1 per page, a visible label on every field (never placeholder-only), errors in words next to the field and not by colour alone, everything usable with the keyboard, motion that stops under prefers-reduced-motion.
- No photographs, no stock images, no real company logos. Illustrations are drawn in SVG or CSS.
- No testimonials, star ratings or customer counts: a concept has none, and invented ones would mislead.
- No real airline names or logos. Demo flights use the made-up prefix "ZZ" and a small "Demo flight data" note.
- Fonts from Google Fonts only, and they must render ș ț ă â î ä ö ü ß.
- Avoid these generic patterns: meta text joined with middle dots, ALL-CAPS labels above headings, arrows appended to button text, rows of identical rounded cards with the same soft shadow, gradients as decoration, a cream background with a terracotta accent, fade-and-slide-up entrances on every section. One orchestrated motion moment per page at most.
- No dark mode in this version.

Target stack for the hand-off: Next.js 16 (App Router), Tailwind CSS 4, next-intl for EN/RO/DE, Stripe Checkout in test mode. Name components by what they are: QuoteForm, NameSign, RouteStrip, VehiclePicker, BookingSteps, PriceSummary, RideTable, PriceEditor.

Use the texts in the attached copy-deck.md exactly (EN column). Where a text is missing, write it in the same voice: plain, specific, short, sentence case, "you" for the traveller, "we" for the company.
```

---

## Part 2: Content and data (reference, attach or paste when a stage needs it)

### Airports and destinations

Sample figures for the concept. Distances and times are approximate and get checked again before the build.

| From \ To (sedan price, distance, drive time) | Brașov | Poiana Brașov | Bran | Predeal | Sinaia |
| --- | --- | --- | --- | --- | --- |
| Bucharest Otopeni (OTP) | €95, 170 km, 3 h | €105, 185 km, 3 h 15 | €115, 200 km, 3 h 30 | €85, 145 km, 2 h 30 | €75, 125 km, 2 h 10 |
| Brașov-Ghimbav (GHV) | €20, 12 km, 20 min | €30, 25 km, 35 min | €30, 25 km, 35 min | €35, 35 km, 45 min | €50, 60 km, 1 h 10 |
| Sibiu (SBZ) | €85, 145 km, 2 h 15 | €90, 155 km, 2 h 30 | €85, 140 km, 2 h 20 | €100, 170 km, 2 h 45 | €110, 190 km, 3 h 05 |
| Cluj-Napoca (CLJ) | €150, 270 km, 4 h | €160, 285 km, 4 h 15 | €160, 290 km, 4 h 20 | €165, 295 km, 4 h 30 | €175, 320 km, 4 h 50 |

- Van price = sedan × 1.4, minibus = sedan × 2, rounded to €5. RO shows lei at a fixed sample rate of €1 = 5 lei.
- The main route from Otopeni: A3 motorway to Ploiești, then DN1 through the Prahova Valley (Câmpina, Sinaia, Bușteni, Predeal) to Brașov. DN1 is slow on Friday evenings and Sunday afternoons.
- Views for illustrations: Brașov has Tâmpa hill with the white BRAȘOV letters; Poiana Brașov has the ski slopes under Postăvarul; Bran has the castle on its rock; Sinaia and Bușteni have the Bucegi wall; Predeal is forest on the pass.

### Vehicles

| Vehicle | Passengers | Luggage |
| --- | --- | --- |
| Sedan | up to 3 | 3 large suitcases |
| Van | up to 7 | 7 large suitcases, or 4 plus skis |
| Minibus | up to 16 | 16 large suitcases |

Extras: child seat (free), ski or snowboard bag (€5 each), return trip (same price back).

### Promises (the company's rules, used across the site)

- Fixed price agreed at booking, including fuel and waiting.
- The driver follows the flight number; 60 minutes of free waiting after landing.
- Free cancellation up to 24 hours before pickup; later, 50 % back.
- Same price at night, no night surcharge.
- Bookings need at least 6 hours' notice.
- Pay by card when booking, or pay the driver in cash or by card.
- Winter tyres November to March, snow chains in the boot.

### Sample people and data (all fictional)

- Drivers: Mihai (RO, EN), Ioana (RO, EN, DE), Radu (RO, EN), Andrei (RO, DE), Sorin (RO, EN, IT).
- Example traveller: Anna Schmidt, 2 passengers, flight ZZ 1234 from Munich, lands at Otopeni on 12 March at 14:35, going to Poiana Brașov.
- Booking reference format: SRP-4827.
- Contact: +40 268 000 000, hello@serpentina.example (the .example domain is reserved, so it can never reach a real person).

---

## Part 3: Stage prompts (send one at a time)

### Stage 1: Three directions for the home hero

```text
Design only the home page hero (header plus the first screen) at 1440 px and at 375 px, three times, once for each direction below. Use Anna Schmidt's trip from Part 2 as the filled-in example. Show the price result state, not the empty form. Then stop and wait for me to pick one.

Every direction has the same hero content: the h1 and subline from the copy deck, the QuoteForm (From, To, date and time or flight number, passengers, name on the sign), the price result (€105 fixed price, sedan, about 3 h 15) and the "Book this transfer" button.

Direction A, "Arrivals": the moment every transfer customer knows, the driver holding a card with your name at arrivals.
- Colours: Terminal #E9EBEE (background), Graphite #1E2227 (text), Wayfinding yellow #FFCB05 (sign band and primary button, always with graphite text, never yellow text on light), Marker blue #1C3FAA (the handwritten name, links, focus ring), Gate green #0B7250 (on-time and confirmed), Delay red #B42318 (delays and errors).
- Type: Atkinson Hyperlegible Next for everything; Caveat Brush only for the name on the sign.
- Hero: a yellow wayfinding band with a landing-plane pictogram and "Arrivals / Sosiri / Ankunft". Left: h1, subline, QuoteForm. Right: a white card sign, slightly tilted, with the traveller's name in marker lettering. The sign rewrites itself as the visitor types the name. On 375 px the sign sits above the form, smaller, and the price plus button become a sticky bar at the bottom.
- Memorable element: your own name on the driver's sign, live as you type.

Direction B, "Road strip": the road itself, drawn like a strip map in the colours of Romanian road signs.
- Colours: Lane white #F3F4F0 (background), Asphalt #25292E (text and dark bands), Motorway green #1A6E43 (motorway sections, white text on it), Road blue #1E4E9C (national-road sections and primary buttons, white text), Reflector amber #F0A500 (selected stop and focus ring, only on asphalt).
- Type: Overpass (it descends from the classic road-sign lettering) for everything, heavy weights for sign text.
- Hero: a blue direction sign carries the result ("Poiana Brașov, 185 km, 3 h 15, sedan, €105"). Under the QuoteForm, a full-width RouteStrip: OTP, A3 in green to Ploiești, DN1 in blue through Câmpina, Sinaia, Predeal, Brașov, to Poiana, with km under each stop. It changes colour where the real road changes class. On load a small car marker runs the strip once. On 375 px the strip turns vertical.
- Memorable element: the route strip that shows the real road, motorway to mountain road, for the trip you picked.

Direction C, "Poster": a 1930s Romanian travel poster of the place you are going.
- Colours: Snow #EEF2F3 (background), Bucegi slate #2B4561 (headings, far mountains), Fir #2E5B48 (near slopes), Dawn ochre #D9A036 (sun and primary button, with Ink text), Ink #141C24 (body text).
- Type: Josefin Sans for display, Public Sans for text and forms.
- Hero: flat, layered silhouettes of the chosen destination's view (Bran castle on its rock, Poiana slopes under Postăvarul, Bucegi wall for Sinaia, Tâmpa for Brașov) with a serpentine road ribbon curving into the picture. The QuoteForm sits in the poster's lower band like its caption. Changing "To" swaps the picture with a short cross-fade.
- Memorable element: the destination's own poster, redrawn when you change where you are going.
```

My recommendation for the owner, not for Claude Design: **A**. It is the only one that could not belong to a tours or guesthouse site, it turns the booking form into a small interactive moment, and it is furthest from Ursa's map and night sky. B is the runner-up and suits the route pages. C sits closest to Ursa's drawn mountains.

### Stage 2: Home page

```text
Continue in direction [A/B/C] only. Design the full home page at 1440 px and 375 px, in this order:
1. Header: wordmark "Serpentina Transfers", links Routes, Fleet, FAQ, "Manage booking", language switch EN/RO/DE, button "Book a transfer", and the concept tag.
2. Hero from stage 1.
3. How it works: three steps (this is a real sequence, so numbering is fine), texts from the copy deck.
4. Promises: five short promises from the copy deck. Not five identical cards; give them one structure that fits the direction (a sign board, a road-side list, a poster margin).
5. Popular routes: a table or list of routes with the lowest price and the drive time, each linking to its route page.
6. Fleet preview: sedan, van, minibus, with capacity drawn as simple icons (people, suitcases, skis).
7. FAQ: the six questions from the copy deck as an accordion (native details/summary).
8. Footer: contact, concept note, links to Privacy, Imprint, Case study.
Also show the header and hero in German at 375 px to prove nothing breaks.
```

### Stage 3: Booking flow

```text
Design the booking flow at 1440 px and 375 px, as three steps plus a confirmation. The route and trip from the home QuoteForm arrive filled in.
- Step bar with the three step names from the copy deck, current step marked in words and not only by colour.
- Step 1 "Trip": route, date and time or flight number (show the flight lookup result "ZZ 1234 from Munich lands at 14:35"), passengers, VehiclePicker (sedan, van, minibus with capacity and price each; vehicles too small for the group are shown disabled with the reason), extras (child seats, ski bags), return trip toggle.
- Step 2 "Your details": full name (feeds the name sign, show the sign small next to the field), email, mobile number with country code, notes for the driver.
- Step 3 "Payment": summary, choice "Pay now by card" or "Pay the driver", the demo notice with the test card, the button texts from the copy deck.
- Confirmation: "Transfer booked", reference SRP-4827, the name sign, what happens next, buttons "Add to calendar", "Share on WhatsApp", "Manage booking".
- PriceSummary: a side panel on desktop; on 375 px a sticky bottom bar with the total and the continue button, expandable to the full summary.
- Back always works and keeps what was entered.
```

### Stage 4: Route page, Fleet, FAQ

```text
Design three more pages at 1440 px and 375 px:
1. Route page template, filled with "Otopeni Airport to Poiana Brașov": h1 with the route, distance and drive time, the route drawn in the direction's style, price per vehicle, where you meet the driver, what to expect on the road (DN1 traffic on Friday evenings and Sunday afternoons, winter tyres), three route questions, and a booking panel with the route filled in.
2. Fleet: the three vehicles with passengers, luggage, skis, and the extras with prices.
3. FAQ: the six questions plus a contact block.
```

### Stage 5: Manage booking

```text
Design "Manage booking" at 1440 px and 375 px: a form with booking reference and email, then the booking view (trip, time, vehicle, price, payment status, driver details that appear 24 hours before pickup), with actions "Change pickup time" and "Cancel transfer". The cancel action opens a confirmation dialog with the texts from the copy deck.
```

### Stage 6: Owner dashboard

```text
Design the owner dashboard, desktop first at 1440 px, and a usable 375 px version where the table becomes a list. It is opened from the footer link "Owner demo" with no password; a banner says it uses sample data and resets every night.
1. Today's rides (RideTable): 8 sample rides with pickup time, passenger, route, flight, vehicle, driver, status. Statuses: Scheduled, Driver on the way, Waiting at arrivals, On board, Completed, and one "Flight delayed 40 min" flag. Two rides have no driver yet, with an "Assign driver" select.
2. Drivers: the five drivers, their languages, and today's rides each.
3. Route prices (PriceEditor): the price table from Part 2, editable, with "Save prices" and the saved message from the copy deck.
Statuses use words and icons, not colour alone. Keep it calm and dense; this is a work tool.
```

### Stage 7: States and edge cases

```text
Show these states in the chosen direction, at 375 px unless noted:
- QuoteForm empty, loading ("Calculating price…"), and result.
- Flight lookup: found, not found (error text from the copy deck).
- Pickup less than 6 hours away (error).
- Too many passengers for the chosen vehicle.
- Form errors on step 2 (name, email, phone), all shown at once with an error summary at the top that links to each field.
- Card declined on step 3.
- Dashboard with no rides today (empty state), at 1440 px.
- 404 page.
- Keyboard focus visible on the QuoteForm, the VehiclePicker and the dialog.
```

### Stage 8: Case study page

```text
Design a "Case study" page at 1440 px and 375 px that explains this concept to someone hiring a web developer. Sections: The brief, What the site does, Design decisions, Accessibility, Speed, Built with. Use short placeholder paragraphs; the real text comes after the build. Include room for three screenshots (home, booking on a phone, dashboard). Same header and footer as the rest of the site.
```

### Hand-off

When stage 8 is done, use Share → Hand off to Claude Code. Then open a Claude Code session in `C:\Users\danie\code\danielbutnar\serpentina-transfers` and paste the hand-off together with this sentence: "Build this in Next.js 16 as described in docs/design-brief.md, texts from docs/copy-deck.md."
