# contador.com.py

Bespoke Next.js rebuild of the WordPress site at contador.com.py, in design
direction **1B "Firma moderna"**.

The plan is the contract: read [`plan.md`](plan.md) before changing anything,
plus its §9 build log and [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md). Phase prompts
live in [`prompts/`](prompts/); reference inputs (live-site scan, keyword
research, design canvas) in [`docs/`](docs/).

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4, design tokens in `src/app/globals.css` |
| Type | Bricolage Grotesque via `next/font/google` (self-hosted, no CLS) |
| Content | Typed TS modules + MDX under `src/content/` — **no database** |
| Leads | `POST /api/lead` → VenderCRM `/api/v1/leads` |
| Hosting | Hostinger managed Node.js slot (standard output, not static export) |

## Getting started

```bash
npm ci
cp .env.example .env.local   # every value is optional; see below
npm run dev                  # http://localhost:3000
```

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run smoke` | Boots the built server and asserts the status of every URL in the live-site inventory |
| `npm run verify` | typecheck + lint + build + smoke — **the gate every PR must pass** |

`npm run verify` is what CI runs (`.github/workflows/ci.yml`).

## Environment

Nothing is required to run the site — every integration degrades gracefully
(plan.md §4.5). See [`.env.example`](.env.example) for the full list.

- `NEXT_PUBLIC_SITE_URL` — canonical origin. Set it on staging too, so staging
  never canonicalises to production.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_EMAIL` —
  while unset, the WhatsApp floating button, the tel:/mailto: links and the
  footer NAP rows simply do not render. No placeholder numbers ever ship
  (plan.md §1.4).
- `VENDERCRM_URL` / `VENDERCRM_API_KEY` — **server-only**. Never prefix these
  with `NEXT_PUBLIC_`; that would ship the key to the browser and let anyone
  write into the pipeline. With either missing, `POST /api/lead` still answers
  `200 {ok: true, degraded: true}`, logs the lead and the UI keeps offering
  WhatsApp.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GOOGLE_ADS_ID` — wired in
  phase B4; the analytics helper is a no-op until they are set.

## Content model

`src/content/types.ts` is the contract every later phase consumes. Later phases
may add **optional** fields; they must never rename or remove one.

| File | Holds |
|---|---|
| `types.ts` | Every content type. Start here. |
| `site.ts` | Firm facts. Unconfirmed values stay `null` — components hide the block rather than invent a placeholder. |
| `services.ts` | The 14 services and the three legacy clusters. A1 seeds identity only; **phase B1 writes the copy**. |
| `pages.ts` | Non-service pages and their baseline metadata. |
| `nav.ts` | Header, mega-menu and footer link trees, derived from the above. |
| `precios.ts` | Pricing plans. Prices render only when `monthlyFromPyg` is set. |
| `ui.ts` | Every UI string — the single-locale i18n layer. |
| `blog/*.mdx` | Articles with YAML frontmatter (`title`, `description`, `date`, `tags`, `relatedServices`). |

### Routing

One dynamic route, `src/app/[slug]/page.tsx`, serves all 14 service pages,
including the flat legacy slugs (`/auditoria-auditoria-forense/`) that must not
change. `trailingSlash: true` preserves the WordPress URL form exactly.

WordPress leftovers are handled deliberately (plan.md §5.1.6):

| URL | Response |
|---|---|
| `/single-service/`, `/hello-world/`, `/category/uncategorized/` | `410 Gone` via `src/middleware.ts` |
| `/?page_id=3` | `301` → `/privacidad/` |
| `/wp-sitemap*.xml` | `301` → `/sitemap.xml` |

`npm run smoke` asserts every one of these. If you change a route, change the
case list in `scripts/smoke.mjs` in the same commit — that list is what stops a
later phase silently dropping a ranking URL.

## Deploy (Hostinger)

Per the `nextjs-deploy-hostinger` playbook:

1. Merge to `main`.
2. hPanel → Websites → Add Website → **Node.js Apps** → Import Git Repository →
   select this repo and the `main` branch.
3. Confirm the detected settings: build `npm run build`, start `npm start`.
4. Add the environment variables from `.env.example` in hPanel — secrets never
   go in the repo.
5. Deploy, then map the domain and re-deploy so `NEXT_PUBLIC_SITE_URL` matches
   the final origin (env changes need a redeploy, a restart is not enough).

Full DNS cutover checklist is written in phase B4 (`docs/launch-checklist.md`).
