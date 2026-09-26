# Serpentina Transfers

Live: https://danielbutnar.github.io/serpentina-transfers/

Concept portfolio site: online booking for a fictional airport-transfer company in Brașov (Otopeni, Brașov-Ghimbav, Sibiu, Cluj to Brașov, Poiana Brașov, Bran, Predeal, Sinaia). EN/RO/DE. Not a real company; every page says so.

## Status (2026-09-27)

- [x] Idea, Claude Design brief and copy deck (`docs/`); design direction "Wayfinding grid" picked by the owner (`design-v2/`).
- [x] Home page: live quote, name sign, price table, fleet, FAQ, contact.
- [x] Booking in three steps (`/book`): demo flight lookup, passengers and luggage, vehicle that fits, return trip, confirmation with calendar file and WhatsApp share. Romanian pages show lei.
- [x] Manage booking (`/manage`): find, change pickup time, cancel with the refund rule.
- [x] Owner dashboard (`/admin`): rides following the clock, driver assignment, website bookings, price editor that changes the whole site in this browser.
- [x] 20 route pages per language plus an overview (`/routes`), with a map drawn from real coordinates.
- [x] Case study (`/case-study`) in EN/RO/DE; Contra screenshots in `docs/contra/`.
- [x] Live on GitHub Pages, deployed by `.github/workflows/pages.yml` (runs `pnpm check` first). Live site check: PASS, 0 errors on all 78 pages. Lighthouse (lab, 27 Sep 2026): desktop performance 100, phone 73–94 between runs; accessibility 100, best practices 100.
- [ ] Owner reviews the RO/DE texts (`src/i18n/*-ro.ts`, `src/i18n/*-de.ts`, `ro.ts`, `de.ts`).
- [ ] Optional: real Stripe test-mode checkout (needs a server, e.g. Vercel, instead of GitHub Pages).
