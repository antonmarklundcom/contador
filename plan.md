# contador.com.py — rebuild plan

Replace the WordPress/Elementor site at contador.com.py with a bespoke Next.js site in design direction **1B "Firma moderna"** (ink blue, amber accent, Bricolage Grotesque, cards). Keep every existing page title and URL path. Rewrite and improve copy. Add a real conversion path (WhatsApp + lead form → VenderCRM), real SEO metadata, and a small set of tools that make the site genuinely useful.

Reference inputs (committed, read them — do not re-scan the live site):

- `docs/reference/site-scan-2026-09-02.md` — full inventory of the live site: nav, all 21 URLs, verbatim copy of every service page, gaps and copy bugs.
- `docs/keyword-research.md` — Keyword Planner data (2026-09) and the eight plan changes it drove.
- `docs/reference/design-canvas-home.dc.html` — design canvas. Build **only** option `1b` (the `<div class="dv-opt" id="1b">` block, lines ~155–300, plus its "Guía de estilo"). Ignore 1a, 1c, 2a, 2b.

| Phase | Model | Prompt file | Plan sections | PR |
|---|---|---|---|---|
| A1 | Opus | `prompts/opus-1-foundation.md` | §5.1 | Foundation: scaffold, design system, layout, routes, SEO infra, lead API, deploy config |
| A2 | Opus | `prompts/opus-2-home.md` | §5.2 | Homepage (1B port) + shared sections + Servicios hub |
| B1 | Sonnet | `prompts/sonnet-1-services.md` | §6.1 | 12 legacy service pages + new /contabilidad/ and /irp/ pages, rewritten copy |
| B2 | Sonnet | `prompts/sonnet-2-pages.md` | §6.2 | Nosotros, Contacto, Precios, legal, 404, blog + 5 launch articles |
| B3 | Sonnet | `prompts/sonnet-3-tools.md` | §6.3 | Tools: aguinaldo calc, liquidación de salario calc, vencimientos calendar, IVA calc, EAS-vs-SRL comparador, "¿Qué necesita?" quiz |
| B4 | Sonnet | `prompts/sonnet-4-polish-launch.md` | §6.4 | Imagery, performance, a11y, analytics, Hostinger deploy, redirect verification, GBP |

One PR per phase. One fresh session per PR. Phases run in table order; a phase never starts on top of an unmerged previous phase.

---

## 1. Decisions already made (locked — do not re-litigate)

1. **Design = option 1B** from the canvas. Palette: `#0F1B2D` ink blue, `#F2B62B` amber action, `#B4831B` amber text, `#FFFFFF` bg, `#F4F6FA` surface, `#E6EAF0` border, `#5B6779` secondary text, `#25A35A` WhatsApp/ok, `#E9F7EE`/`#1E7A45` success tint. Type: Bricolage Grotesque 800 for display (64/48/44/28), 600 22 for card titles; body sans (use Bricolage 400/500 or system stack per canvas guide); `ui-monospace` for the dashboard/mock-panel numbers. Radii: 999px pills, 16px cards, 10px inputs, 6px chips.
2. **Keep all legacy titles and URL paths exactly** (trailing slash, flat slugs). The 12 service URLs, `/nosotros/`, `/contacto/`, `/blog/`, `/precios/` stay. Placeholders (`/single-service/`, `/hello-world/`, `/category/uncategorized/`, `/?page_id=3`) get 410 or 301 (see §5.1). Design and copy are free to change; page **titles** (the H1 label + the concept) are not.
3. **Copy language: Spanish (Paraguay), formal "usted"** everywhere, as in 1B. The old site mixes "vos"; do not carry that over. No English theme leftovers.
4. **No fabricated facts.** The 1B mock contains invented names, stats, and quotes (Mariana Benítez, Rodrigo Cáceres, "180+ empresas", San Roque, FacturaPY, the three testimonials). None of it ships. Every fact about the firm comes from `src/content/site.ts` (populated from §7). Where a value is missing, the component hides or uses a neutral phrasing ("Contadores públicos matriculados"), never a placeholder number. Testimonials section renders only when `testimonials.length > 0`.
5. **Stack:** Next.js 15 App Router + TypeScript + Tailwind, no database. Content lives in typed TS/MDX files under `src/content/`. Hosted on Hostinger managed Node.js (Anton's proven pattern, `nextjs-deploy-hostinger`). `trailingSlash: true` in `next.config`.
6. **Conversion path:** WhatsApp deep link (`wa.me/<number>?text=...`) is primary; lead form posts to `POST /api/lead` on the site, which forwards to VenderCRM `/api/v1/leads` (`vendercrm-lead-capture` skill). Missing `VENDERCRM_API_KEY` → handler logs and returns success with a `degraded: true` flag; the UI still shows WhatsApp as fallback. No email transport.
7. **Model policy:** phases run on Opus (foundation, home) and Sonnet (everything else). Fable is never a phase, subagent, or spawned session; Fable's role is Anton's own planning/review chats.
8. **Homepage service framing:** 1B's "cinco servicios" cards map onto the legacy pages. Card → links: Contabilidad mensual → `/contabilidad/` (new page, §6.1); Impuestos: IVA e IRE → `/iva/`, `/ire-simple/`, `/marangatu/`; Nómina → `/ips/`; Apertura de empresas y RUC → `/eas/`, `/ruc/`; Facturación electrónica → `/ekuatia/`. A sixth card "Auditoría" → `/auditoria/` (the legacy silo is real content and ranks; it must stay visible). Asesoría lives in the Impuestos card as secondary link and in the hub.
9. **Servicios hub `/servicios/`** keeps the three legacy clusters as section headings (Soluciones digitales de cumplimiento / Gestión empresarial / Auditoría) because that grouping is the existing IA and internal-link structure.
10. **Precios:** `/precios/` becomes a real page with three plans (Emprendedor / Pyme / Empresa) using "desde ₲ X /mes" only if §7 provides numbers; until then plans list scope with "Cotización en 48 h" CTA and no prices. Never USD, never Lorem.
11. **Blog stays** (`/blog/`), MDX, 5 launch articles written in B2. `/hello-world/` and `/category/uncategorized/` → 410.

## 2. Content model (no DB)

```
src/content/site.ts        // firm facts: name, phone, whatsapp, email, address, hours, matrícula, foundedYear, teamSize, socials, stats[], testimonials[]
src/content/services.ts    // Service[]: slug, path, title (legacy H1), navLabel, cluster, seoTitle, metaDescription, hero{eyebrow,h1,h2,lead}, sections[], benefits[], faq[], cta{label,whatsappText}, related[]
src/content/nav.ts         // header + footer link trees (derived from services + static pages)
src/content/blog/*.mdx     // frontmatter: title, description, date, slug, tags
src/content/precios.ts     // plans
```

Identifiers in English; slugs/copy in Spanish. All UI strings in `src/content/ui.ts` (single-locale i18n layer, so a Portuguese/English variant later is a file, not a refactor).

Service record shape is fixed in A1 and consumed unchanged by B1. B-phases may add optional fields but never rename or remove.

## 3. Feature scope

**Core (A1–B2):** design system, responsive layout, sticky header with services mega-menu, WhatsApp floating button, homepage (1B), Servicios hub, 14 service pages (12 legacy + /contabilidad/ + /irp/), Nosotros, Contacto with form, Precios, Privacidad, Términos, 404, Blog index + article template + 5 articles, SEO (titles, descriptions, canonical, OG, sitemap, robots, JSON-LD: AccountingService/LocalBusiness, BreadcrumbList, FAQPage, Article), redirects/410s, lead API → VenderCRM, deploy config.

**Tools (B3, share one `herramientas/` layout, priority order from keyword data):** calculadora de aguinaldo (≈5 000 searches/mo), calculadora de liquidación de salario / finiquito (5 400/mo), DNIT vencimientos calendar by RUC terminación ("Recordarme por WhatsApp" CTA), IVA calculator (10% / 5% inclusive-exclusive), comparador EAS vs SRL vs Unipersonal, "¿Qué necesita?" 4-question quiz that pre-fills the lead form.

**Polish (B4):** imagery via Higgsfield (illustrative only, no captioned identity claims), Lighthouse ≥ 95 mobile, a11y pass, GA4 + Google Ads conversion events (whatsapp_click, lead_submit, tool_used), Hostinger deploy, DNS cutover checklist, GBP link and NAP consistency.

## 4. Autonomy protocol (every phase prompt copies these rules by reference)

1. Work until every exit criterion of the phase passes; never ask permission for in-plan work.
2. One PR per phase. Branch `phase/<id>` off latest `main`. Create the PR, watch CI/build, merge when green. Red build is the session's own work. Never start on top of an unmerged previous phase.
3. Minor non-blocking issues → `KNOWN-ISSUES.md`, keep building.
4. Stop and ask ONLY for: a missing credential with no graceful fallback, or a bad-foundation decision (content model shape, route structure, lead API contract) where guessing wrong forces a rewrite. Everything else: choose reasonably, record in the build log, continue.
5. Missing env values never block: document in `.env.example`, degrade gracefully.
6. Every phase prompt is re-runnable: check what exists on the branch first, continue from the first unmet exit criterion.
7. Model-B (Sonnet) hard limits: no changes to the design tokens, layout components, content model types, lead API, or `next.config`. Need something there? Work around it and write a Backlog note.
8. Model cost guardrail: Fable is never used for build phases, subagents, or spawned sessions. Phase tables only ever name Opus and Sonnet. If a session believes Fable is needed, it stops and asks Anton with the reason.
9. Phase handoff, only when four gates pass: PR merged green; exit checklist passed; pre-handoff audit done (re-run `npm run build` + `npm run verify`, adversarially re-read your own merged diff, fix findings); build-log entry committed. Then spawn the next phase as a NEW session via the claude-code-remote `create_session` tool: inherit environment and permission mode (never `plan`), set `model` per the phase table, `prompt` exactly `Read prompts/<next-file>.md in this repo and execute it.` Then end with the phase report. Fallback without `create_session`: continue in the same window if the next phase uses the same model; stop and report at a model switch.
10. Build log: before merging, append a 5–10 line dated entry to §9. Fresh sessions orient from plan.md + §9 + KNOWN-ISSUES.md only.
11. Quality bar for copy: every page has a unique `<title>` (≤ 60 chars, keyword first, "| Contador.com.py" suffix), a unique meta description (120–155 chars), one H1 that contains the target keyword, and at least 3 internal links to sibling services. No paragraph from the scan is pasted verbatim: rewrite, tighten, fix the three known copy-paste bugs (scan §6.9).

## 5. Model-A phases (Opus)

### 5.1 A1 — Foundation

Skills to load: `nodejs-mysql-hostinger-stack` (scaffold conventions only, skip DB), `nextjs-deploy-hostinger`, `nextjs-national-lead-gen` (§2 architecture, §3 SEO), `vendercrm-lead-capture`, `paraguay-business-apps` (§1 money format, §2 RUC validation util).

1. `create-next-app` (App Router, TS, Tailwind, `src/`), `trailingSlash: true`, `output` standard (Hostinger Node). Scripts: `build`, `start`, `lint`, `typecheck`, `verify` (runs typecheck + lint + a route smoke test that hits every path in §5.1.6 on a built server and asserts 200/301/410).
2. Design system from 1B: Tailwind theme tokens (colors, radii, shadows), `next/font` Bricolage Grotesque (weights 400/500/600/800), base typography scale, `Button` (primary amber, secondary outline, whatsapp green), `Card`, `Section` (with eyebrow/title/lead), `Pill`, `Stat`, `FaqAccordion` (native `<details>`), `Breadcrumbs`, `StatusPanel` (the "Panel del cliente" mock from the hero, generic labels, no client name).
3. Layout: `Header` (logo wordmark "contador.com.py", nav: Servicios mega-menu with the three clusters + Nosotros, Precios, Blog, Contacto; right side WhatsApp pill + "Pedir cotización" amber button), mobile drawer, `Footer` (4 columns as 1B: firm blurb, Servicios (all 14), Firma, Contacto with NAP), `WhatsAppFab`. Skip links, focus styles, `lang="es-PY"`.
4. Content model (§2) with types, `site.ts` filled from §7 or `null`s, `services.ts` seeded with slug/path/title/cluster/navLabel for all 14 services (copy fields empty; B1 fills them). `ui.ts` strings.
5. Routing: a single dynamic `app/[slug]/page.tsx` that resolves against `services.ts` and static pages by slug (so every legacy flat path is served by one template), plus explicit routes for `/`, `/servicios/`, `/blog/`, `/blog/[slug]/`, `/precios/`, `/contacto/`, `/nosotros/`, `/privacidad/`, `/terminos/`, `/herramientas/*` (placeholders). `generateStaticParams` for all.
6. Redirect/410 map in `next.config` + `middleware` where needed: `/single-service/` → 410, `/hello-world/` → 410, `/category/uncategorized/` → 410, `/?page_id=3` → 301 `/privacidad/`, `/wp-sitemap.xml` → 301 `/sitemap.xml`, `/auditoria-auditoria-*` unchanged (canonical, no redirect).
7. SEO infra: `generateMetadata` helper (title template, description, canonical from `NEXT_PUBLIC_SITE_URL`, OG defaults), `sitemap.ts`, `robots.ts`, JSON-LD helpers (`AccountingService` + `LocalBusiness` from `site.ts`, `BreadcrumbList`, `FAQPage`, `Article`), default OG image route.
8. Lead API `POST /api/lead`: zod-validated `{name, phone, email?, need, message?, utm*}`, idempotency key, forwards to VenderCRM, degraded mode, rate limit by IP (in-memory), honeypot field. `LeadForm` client component with the "¿Qué necesita?" chip selector from 1B and success state pointing to WhatsApp.
9. `.env.example`, `KNOWN-ISSUES.md`, `README.md` (run/deploy), GitHub Actions workflow: `npm ci && npm run verify && npm run build` on PR.

Exit: `npm run verify` green; every URL in scan §2 responds per §5.1.6; `/` renders header/footer/fab with tokens; `/api/lead` returns 200 in degraded mode and 200 with a real key when `VENDERCRM_API_KEY` is set; PR merged.

### 5.2 A2 — Homepage + shared sections + Servicios hub

Skills: `nextjs-national-lead-gen` (§4 pattern menu), `paraguay-business-apps` (terminology check: DNIT, SIFEN, Marangatu, IPS, MTESS, IRE, F.120).

1. Port 1B section by section, in order: Hero (eyebrow pill, H1, lead, two CTAs, three stats from `site.stats` or hidden, `StatusPanel`), Servicios (6 cards per §1.8, numbered 01–06, "¿No sabe qué necesita?" strip), Credibilidad (two photo slots + "14 años" badge only if `foundedYear`; four ✓ bullets from `site.credentials`), Proceso (4 steps), Casos (testimonials, hidden when empty; if hidden, replace with a "Rubros que atendemos" strip: comercio, servicios, construcción, importación, profesionales, gastronomía), Contacto (split: copy + WhatsApp + NAP left, `LeadForm` right), Footer already from A1.
2. Match 1B spacing (88px section padding desktop, 64px gutters → responsive), type scale, card style. Mobile: single column, hero panel below copy, sticky bottom WhatsApp bar.
3. Extract `ProcessSection`, `CtaBand`, `ServiceCardGrid`, `TestimonialsSection`, `IndustriesStrip` as reusable components (B-phases reuse them on service pages).
4. `/servicios/` hub: hero, three cluster sections each with `ServiceCardGrid` of its services (all 14 including `/contabilidad/` and `/irp/` under Gestión empresarial), process, CTA band.
5. Homepage SEO: title "Contador en Asunción | Estudio contable para pymes | Contador.com.py", description, `AccountingService` JSON-LD, OG image.
6. Copy: rewrite from scan §4.1 + 1B. Keep the H1 concept "Estudio contable y contabilidad en Paraguay" as keyword anchor but use 1B's promise headline; example: H1 "Estudio contable en Asunción: impuestos, contabilidad y nómina sin llegar tarde".

Exit: `/` and `/servicios/` visually match 1B at 1440 and 390 widths (screenshot both, attach to PR); Lighthouse mobile perf ≥ 90 on `/`; `verify` green; PR merged.

## 6. Model-B phases (Sonnet)

Hard limits (§4.7). Data access only through `src/content/*` and the components A1/A2 built.

### 6.1 B1 — Service pages (14)

Skills: `paraguay-business-apps`, `nextjs-national-lead-gen` §3.

1. Service page template (in `app/[slug]/page.tsx` via a `ServicePage` component): Breadcrumbs (Inicio › Servicios › [Cluster] › Title; audit children add › Auditoría), hero (eyebrow = cluster, H1 = legacy title enriched, H2 = descriptive headline, lead, CTA pair), "Qué incluye" checklist, body sections (2–4, from the scan's real content, rewritten), Beneficios (3–4 cards), Proceso (reuse), FAQ (3–5, accordion + `FAQPage` JSON-LD), related services (3), CTA band with service-specific WhatsApp prefill text.
2. Fill `services.ts` for all 12 legacy pages from scan §3, rewriting in "usted", tightening to ~600–900 words each, fixing scan §6.9 bugs (EAS closing CTA, Auditoría Impositiva benefits, Auditoría Forense FAQ 3). Keep the legacy H1 label visible in the H1 (e.g. "Marangatu: gestión de su cuenta ante la DNIT").
3. New page `/contabilidad/` "Contabilidad mensual" (cluster: Gestión empresarial) — the 1B service 01 has no legacy page; write it fresh: libros, conciliaciones, estados financieros (H2s for balance general, estado de resultados, flujo de efectivo), cierre antes del día 5, informe mensual.
3b. New page `/irp/` "IRP — Impuesto a la Renta Personal" (cluster: Gestión empresarial): quiénes deben inscribirse, rangos, deducciones, presentación anual, servicio de liquidación. 1 600 searches/mo with zero legacy coverage.
3c. `/marangatu/` and `/ekuatia/` get a "Guía rápida" block (cómo ingresar, recuperar clave, errores frecuentes; Marangatu: "Marangatu 2.0", consulta de RUC, ESET; Ekuatia: "Ekuatia vs Ekuatia'i", "¿Qué es SIFEN?"; `/ekuatia/` H1 names Ekuatia'i because it has 22 200 searches/mo and +309 % growth) because both terms are navigational giants; `/marangatu/` also gets an H2 "Certificado de Cumplimiento Tributario" (fastest-growing query). `/ire-simple/` gets H2s for Resimple, IRE General and Formulario 120.
4. `/auditoria/` sub-hub: keeps the 3 child cards.
5. Unique title/description per page (§4.11), sibling links, `related[]` filled.

Exit: 14 service URLs render with full copy, FAQ JSON-LD validates, no page shares a title or description, `verify` green, PR merged.

### 6.2 B2 — Secondary pages + blog

1. `/nosotros/`: rewrite scan §4.2 (real, good content) in "usted" plus 1B "Quiénes somos" structure; team members only from `site.team` (hidden if empty); values; credentials; CTA.
2. `/contacto/`: 1B contact split, `LeadForm`, WhatsApp, NAP, map embed only if address confirmed, hours.
3. `/precios/` per §1.10.
4. `/privacidad/`, `/terminos/`: real Spanish legal text for a Paraguayan accounting firm (Ley 6534/2020 data protection reference, confidentiality of tax credentials), dated.
5. `not-found.tsx` with search-free helpful links.
6. Blog: `/blog/` index (cards), `/blog/[slug]/` article template with Article JSON-LD, author = firm, reading time, related services. Five launch articles (900–1300 words each, "usted"): "Cómo se calcula el aguinaldo en Paraguay (con ejemplos)"; "IRE Simple vs Resimple vs IRE General: cuál le corresponde y el Formulario 120"; "Cómo habilitarse en SIFEN y emitir factura electrónica (E-kuatia)"; "Cómo obtener el Certificado de Cumplimiento Tributario en Marangatu"; "Abrir una EAS en Paraguay: pasos, costos y plazos". Each article links to its calculator/service.
7. Footer legal links and social links only render when set.

Exit: all pages above 200 with unique metadata, blog index shows 5 posts, `verify` green, PR merged.

### 6.3 B3 — Tools

1. `/herramientas/` index + six tools, each a client component inside the A1 layout, each with its own SEO page copy (200–300 words) and a CTA that opens `LeadForm` prefilled with the tool result. Build in this order (keyword volume): aguinaldo, liquidación de salario, vencimientos, IVA, comparador, quiz.
1b. Calculadora de aguinaldo (`/herramientas/calculadora-aguinaldo/`): salarios percibidos por mes del año (12 inputs or "mismo salario todos los meses"), result = suma/12 in ₲, with a first-class "aguinaldo proporcional" toggle (months worked) and an FAQ on cuándo se cobra. Rules table in `src/content/laboral.ts` with `lastReviewed`.
1c. Calculadora de liquidación de salario / finiquito (`/herramientas/liquidacion-de-salario/`): fecha ingreso/egreso, salario, motivo (renuncia / despido injustificado / justificado), output: salario proporcional, IPS 9 % deduction shown as its own line, vacaciones proporcionales, aguinaldo proporcional, preaviso, indemnización (Código del Trabajo art. 91 y ss.). Show a "valores orientativos" disclaimer and the WhatsApp CTA.
2. Vencimientos: input RUC terminación (0–9), output this month's and next month's dates for IVA mensual, IRE (annual), IPS; data table in `src/content/vencimientos.ts` with a `lastReviewed` date shown on page. Plain rule table, no scraping.
3. IVA calculator: monto, tipo (10% / 5% / exento), incluido/excluido; guaraní formatting via `paraguay-business-apps` §1.
4. Comparador EAS / SRL / Unipersonal: static comparison table + "cuál le conviene" 3-question mini-quiz.
5. "¿Qué necesita?" quiz (4 steps) → recommends services (links) + prefilled lead form.
6. Analytics events `tool_used` (name) via the A1 analytics helper (no-op until GA id set).

Exit: six tools work with keyboard only, no console errors, `verify` green, PR merged.

### 6.4 B4 — Imagery, polish, launch

Skills: `higgsfield-web-imagery`, `nextjs-deploy-hostinger`, `gbp-optimizer`.

1. Images: hero portrait slot, team/office ambience, service card illustrations (one style Element, ink-blue duotone), OG image. Illustrative only; no captioned identity claims (skill rule 1). Cost preflight first; ≤ 12 generations. `next/image`, AVIF/WebP, sized.
2. Performance: Lighthouse mobile ≥ 95 perf / 100 a11y / 100 SEO on `/`, one service page, one article. Font subsetting, no layout shift on the hero panel.
3. Analytics: GA4 + Google Ads tag via env ids; events whatsapp_click, lead_submit, tool_used, phone_click; consent banner minimal (Paraguay has no cookie-banner mandate; keep a small notice linking /privacidad/).
4. Deploy: Hostinger Node.js slot per `nextjs-deploy-hostinger` (env vars, build command, start), staging on the Hostinger subdomain, then DNS cutover checklist in README (WordPress off, `wp-sitemap.xml` redirect live, Search Console resubmit, GBP website URL).
5. Post-cutover verification script: curl every scan §2 URL from the live domain, assert status per §5.1.6, print report.
6. GBP: NAP identical to `site.ts`; categories "Contador", "Asesor fiscal"; write the GBP description + 3 posts drafts into `docs/gbp.md`.

Exit: live site on Hostinger staging URL passes the verification script; Lighthouse targets met; `docs/launch-checklist.md` written with numbered manual steps for Anton; PR merged. STOP and report (no further phase).

## 7. Human-inputs checklist (Anton)

| Item | First needed | Status |
|---|---|---|
| Firm legal name, matrícula numbers, partner names + titles (or "none published") | A2 | pending |
| Real phone + WhatsApp number (Paraguayan, e.g. +595 98x xxx xxx) | A1 | pending |
| Email address | A1 | pending |
| Street address (confirm "Edificio Skytower, Asunción" or replace), hours | A1 | pending |
| Founding year, team size, any real stats (clients, on-time %) | A2 | pending |
| Real testimonials (name, business, city) or none | A2 | pending |
| Plan prices in ₲ for Emprendedor / Pyme / Empresa, or "no prices" | B2 | pending |
| VenderCRM base URL + site API key | A1 (degraded OK) | pending |
| Hostinger account + Node slot, domain DNS access | B4 | pending |
| GA4 measurement id, Google Ads conversion id/labels | B4 | pending |
| Social profile URLs (or none) | B2 | pending |
| Existing legal text in WP admin drafts, if any | B2 | pending |

## 8. Open business questions (parked)

- Do we want a client portal (real "Panel del cliente") later? The hero mock hints at it; a login is out of scope now.
- Second language (English for foreign investors opening companies in Paraguay)? The i18n layer allows it later.
- Google Ads campaign structure: see `docs/keyword-research.md` §Ads shortlist.

## 9. Build log & handoff

(empty — every phase appends before merging)

## 10. Backlog

- Client portal / login.
- English version of apertura-de-empresa pages for foreign founders.
- WhatsApp vencimiento reminders (needs backend + DB).
- Case studies once real clients agree.
