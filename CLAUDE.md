@AGENTS.md

# Serpentina Transfers

Concept portfolio site: a fictional airport-transfer company in Brașov, one landing page in EN/RO/DE with a live fixed-price quote, a name sign that follows what you type, and a demo booking (no payment, no data sent anywhere). Next.js 16 (App Router), Tailwind CSS 4, no i18n library. Package manager: pnpm. Static export (`output: "export"`), deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`: https://danielbutnar.github.io/serpentina-transfers/

## Commands

```bash
pnpm dev            # http://localhost:3000
pnpm check          # format check + typecheck + lint + unit tests (node --run, no nested pnpm)
pnpm test           # tsx --test src/**/*.test.ts
pnpm build          # static export to out/ (locally at the root; CI sets PAGES_BASE_PATH=/serpentina-transfers)
node ~/.claude/skills/web-qa/scripts/design-lint.mjs --root .   # ratchet in design-lint.json
```

## Architecture

- `src/app/[lang]/layout.tsx` is the root layout (sets `<html lang>`); `dynamicParams = false`, so only en/ro/de exist. A static export has no redirects: `public/index.html` forwards `/` to `en/` (meta refresh plus links). Unmatched URLs get `404.html` from `src/app/global-not-found.tsx` (experimental `globalNotFound` flag). In `next dev`, open `/en`.
- CSP is a `<meta>` tag (`src/lib/csp.ts`, production only) because GitHub Pages sends no headers; it needs `'unsafe-inline'` for Next's inline scripts.
- Windows quirk (Next 16.3): a local `next build` writes prefetch files as `<route>/__next.$d$lang/__PAGE__.txt` instead of `<route>/__next.$d$lang.__PAGE__.txt`, so a local copy of `out/` logs 404s on link prefetch. The Linux build in CI is correct; do not deploy an `out/` built on Windows.
- Copy: `src/i18n/en.ts` defines the `Dictionary` shape; `ro.ts` and `de.ts` must match it (TypeScript enforces). RO uses "tu", DE uses "Sie"; RO/DE are drafts for the owner's review. Placeholders like `{from}` are filled with `fill()` from `src/i18n/config.ts`, because dictionaries are passed to client components and must stay plain strings.
- Fares: `src/lib/fares.ts` (pure, tested). Car price covers 1–4 passengers; minibus (5–8) is car × 1.6 rounded to 5 €. Prices are sample data from the Claude Design hand-off.
- `src/components/quote/QuoteProvider.tsx` holds the one booking state shared by the form, the name sign and both price tables (desktop matrix, phone board). Picking a price loads it into the form and scrolls to `#booking`.
- Pages: `/[lang]/` home, `book/` (BookingFlow), `manage/`, `admin/` (owner demo), `routes/` and `routes/<airport>-<destination>/` (20 per language, `src/lib/routes.ts`), `case-study/`. Copy per page lives in `src/i18n/<page>-<lang>.ts`, wired into `en.ts`/`ro.ts`/`de.ts`.
- Browser storage is the demo backend (`src/lib/storage.ts`): the home draft and the flow in sessionStorage; bookings and driver assignments in localStorage. Pages that read it render after hydration (`useIsClient` loaders).
- Prices: `PriceTable` in `fares.ts`; the owner's edits live in localStorage and reach every component through `usePrices()` (`src/lib/prices.ts`, useSyncExternalStore, prerendered HTML shows the defaults). Always pass the table to `quote()`/`priceLines()`/`vehiclePrice()`.
- Rules with tests: `booking.ts` (vehicle fit, 6-hour notice, prices), `manage.ts` (24-hour free cancellation, refund), `dashboard.ts` (ride status by the clock; no driver = "unassigned"), `route-map.ts` (projection, route frames), `routes.ts` (slugs).
- Browser tests live outside the repo (Playwright scripts in the session scratchpad); the repo's gate is `pnpm check` plus the web-qa site check. Case-study figures (tests, Lighthouse) must stay true: update `src/i18n/case-*.ts` when they change.
- The contact block's WhatsApp button only shows a "not connected" note; phone and e-mail are placeholders (`+40 268 000 000`, `hello@serpentina.example`). Keep it that way: no real numbers, no fake reviews, "Concept project, not a real company" on every page, `robots: noindex`.

## Design

Source: Claude Design, direction "Wayfinding grid" chosen by the owner on 2026-09-26. The exports are in `design-v2/` (`Serpentina Transfers v2.dc.html` = desktop 1280 + mobile 390); `design/` holds the earlier two-direction round. Tokens live in `src/app/globals.css`.

- Colours: ink `#151515` (text, bars, borders), paper `#F3F1EB` (background), sign yellow `#E0A526` (booking panel, selected price, accents; always with ink text, never yellow text on paper), sign-soft `#F6E3B5` (price hover), muted `#3F3D37` (secondary text), label `#5A5850` (small labels on paper or white only; on yellow use muted or ink), paper-2 `#E9E6DE` (vehicle stripes), on-ink-muted `#D6D3CB`.
- Type: Public Sans (400–900) for everything, JetBrains Mono for small uppercase labels, codes and figures. Both via `next/font/google` (self-hosted at build), subsets latin + latin-ext for ș ț ä ö ü ß.
- Structure: thick ink rules (3px) and black section bars numbered 01–04 like airport signs; square corners everywhere; the price in very heavy type.
- Memorable element: the white name sign, which repeats the name typed in the form (in the hero on desktop, inside the yellow panel on phones).
- Breakpoints: phone layout below `lg` for the hero, below `md` for the price table; checked at 375, 768 and 1440 px.
- Vehicles are drawn in SVG (`VehicleDrawing.tsx`), never photos.
- Focus ring: 3px ink outline; inside `.on-ink` containers it turns yellow.
- Keep (deliberate, allowed in `design-lint.json`): ink/paper palette, uppercase mono labels, numbered section bars, wayfinding arrows, middle-dot separators, striped vehicle backdrops.
- Avoid: photos, soft shadows, rounded corners, new hex values outside the tokens.
