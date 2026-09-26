# Serpentina Transfers

Live: https://danielbutnar.github.io/serpentina-transfers/

Concept portfolio site: online booking for a fictional airport-transfer company in Brașov (Otopeni, Brașov-Ghimbav, Sibiu, Cluj to Brașov, Poiana Brașov, Bran, Predeal, Sinaia). EN/RO/DE. Not a real company; every page says so.

## Status (2026-09-26)

- [x] Idea chosen by the owner: transfer booking site (fills the gap next to the tours site and Ursa).
- [x] Claude Design brief and copy deck: `docs/`.
- [x] Design made in Claude Design; owner picked "Wayfinding grid" (exports in `design-v2/`).
- [x] Landing page built in Next.js 16: live quote, name sign, route tables, fleet, FAQ, contact, demo booking. `pnpm check` passes; axe finds no violations at 375 and 1440 px in all three languages.
- [ ] Owner reviews the RO/DE texts (`src/i18n/ro.ts`, `src/i18n/de.ts`).
- [x] GitHub repo `danielbutnar/serpentina-transfers` (public), deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main` (runs `pnpm check` first).
- [x] web-qa on the live URL: site-check PASS (0 errors; no robots.txt/sitemap.xml on purpose, every page is noindex). Core Web Vitals not measured yet (PageSpeed quota).
- [ ] Contra case study text and screenshots.
- [ ] Later, optional: booking flow with Stripe test mode, owner dashboard (needs designs first).
