# contador.com.py — rebuild plan

Replace the WordPress/Elementor site at contador.com.py with a bespoke **static HTML + PHP** site in design direction **1B "Firma moderna"** (ink blue, amber accent, Bricolage Grotesque, cards), hosted on Hostinger shared hosting. Keep every existing page title and URL path. Rewrite and improve copy. Add a real conversion path (WhatsApp + lead form → VenderCRM via a server-side PHP handler), real SEO metadata, and a small set of tools that make the site genuinely useful.

Reference inputs (committed, read them — do not re-scan the live site):

- `docs/reference/site-scan-2026-09-02.md` — full inventory of the live site: nav, all 21 URLs, verbatim copy of every service page, gaps and copy bugs.
- `docs/keyword-research.md` — Keyword Planner data (2026-09) and the plan changes it drove.
- `docs/reference/design-canvas-home.dc.html` — design canvas. Build **only** option `1b` (the `<div class="dv-opt" id="1b">` block, lines ~155–300, plus its "Guía de estilo"). Ignore 1a, 1c, 2a, 2b.

| Phase | Model | Prompt file | Plan sections | PR |
|---|---|---|---|---|
| A1 | Opus | `prompts/opus-1-foundation.md` | §5.1 | Foundation: PHP templating, design system CSS, layout partials, all routes, `.htaccess`, SEO helpers, `enviar.php` lead handler, verify script, deploy zip |
| A2 | Opus | `prompts/opus-2-home.md` | §5.2 | Homepage (1B port) + shared partials + Servicios hub |
| B1 | Sonnet | `prompts/sonnet-1-services.md` | §6.1 | 12 legacy service pages + new /contabilidad/ and /irp/ pages, rewritten copy |
| B2 | Sonnet | `prompts/sonnet-2-pages.md` | §6.2 | Nosotros, Contacto, Precios, legal, 404, blog + 5 launch articles |
| B3 | Sonnet | `prompts/sonnet-3-tools.md` | §6.3 | Tools: aguinaldo calc, liquidación de salario calc, vencimientos calendar, IVA calc, EAS-vs-SRL comparador, "¿Qué necesita?" quiz |
| B4 | Sonnet | `prompts/sonnet-4-polish-launch.md` | §6.4 | Imagery, performance, a11y, analytics, Hostinger upload, redirect verification, GBP |

One PR per phase. One fresh session per PR. Phases run in table order; a phase never starts on top of an unmerged previous phase.

---

## 1. Decisions already made (locked — do not re-litigate)

1. **Design = option 1B** from the canvas. Palette: `#0F1B2D` ink blue, `#F2B62B` amber action, `#B4831B` amber text, `#FFFFFF` bg, `#F4F6FA` surface, `#E6EAF0` border, `#5B6779` secondary text, `#25A35A` WhatsApp/ok, `#E9F7EE`/`#1E7A45` success tint. Type: Bricolage Grotesque 800 for display (64/48/44/28), 600 22 for card titles; body Bricolage 400/500 with a system-sans fallback; `ui-monospace` for the dashboard/mock-panel numbers. Radii: 999px pills, 16px cards, 10px inputs, 6px chips.
2. **Keep all legacy titles and URL paths exactly** (trailing slash, flat slugs). The 12 service URLs, `/nosotros/`, `/contacto/`, `/blog/`, `/precios/` stay. Placeholders (`/single-service/`, `/hello-world/`, `/category/uncategorized/`, `/?page_id=3`) get 410 or 301 via `.htaccess` (see §5.1). Design and copy are free to change; page **titles** (the H1 label + the concept) are not.
3. **Copy language: Spanish (Paraguay), formal "usted"** everywhere, as in 1B. The old site mixes "vos"; do not carry that over. No English theme leftovers.
4. **No fabricated facts.** The 1B mock contains invented names, stats, and quotes (Mariana Benítez, Rodrigo Cáceres, "180+ empresas", San Roque, FacturaPY, the three testimonials). None of it ships. Every fact about the firm comes from `content/site.php` (populated from §7). Where a value is missing, the partial hides or uses a neutral phrasing ("Contadores públicos matriculados"), never a placeholder number. Testimonials section renders only when the array is non-empty.
5. **Stack: plain HTML + PHP 8 on Hostinger shared hosting. No Node at runtime, no build step, no database, no framework.** PHP is used only as a templating layer (includes + one data array per content type) and for the form handler. One hand-written CSS file (`assets/css/site.css`, custom properties for the tokens), vanilla JS in `assets/js/`, Bricolage Grotesque self-hosted in `assets/fonts/` (woff2 subset). Directory-per-route: `/marangatu/index.php` etc., so URLs match the legacy trailing-slash form with zero rewriting. Deploy = upload the site files to `public_html/`, either as a zip through hPanel File Manager or via Hostinger's Git deploy. `npm`/Node may be used **only** inside `tests/` for the Playwright smoke test and screenshots; the site never depends on it.
6. **Conversion path:** WhatsApp deep link (`wa.me/<number>?text=...`) is primary; lead form posts to `/enviar.php`, which validates, rate-limits, and forwards to VenderCRM `/api/v1/leads` with the key from `config.php` (gitignored; `config.example.php` committed) per the `vendercrm-lead-capture` skill (static HTML+PHP section). Missing key → handler appends to `logs/leads.log` (`.htaccess`-protected) and still returns success with `degraded: true`; the UI shows WhatsApp as fallback. No email transport.
7. **Model policy:** phases run on Opus (foundation, home) and Sonnet (everything else). Fable is never a phase, subagent, or spawned session; Fable's role is Anton's own planning/review chats.
8. **Homepage service framing:** 1B's "cinco servicios" cards map onto the legacy pages. Card → links: Contabilidad mensual → `/contabilidad/` (new page, §6.1); Impuestos: IVA e IRE → `/iva/`, `/ire-simple/`, `/marangatu/`; Nómina → `/ips/`; Apertura de empresas y RUC → `/eas/`, `/ruc/`; Facturación electrónica → `/ekuatia/`. A sixth card "Auditoría" → `/auditoria/` (the legacy silo is real content and ranks; it must stay visible). Asesoría lives in the Impuestos card as secondary link and in the hub.
9. **Servicios hub `/servicios/`** keeps the three legacy clusters as section headings (Soluciones digitales de cumplimiento / Gestión empresarial / Auditoría) because that grouping is the existing IA and internal-link structure.
10. **Precios:** `/precios/` becomes a real page with three plans (Emprendedor / Pyme / Empresa) using "desde ₲ X /mes" only if §7 provides numbers; until then plans list scope with "Cotización en 48 h" CTA and no prices. Never USD, never Lorem.
11. **Blog stays** (`/blog/`), one PHP file per article under `/blog/<slug>/index.php` with a shared article template. `/hello-world/` and `/category/uncategorized/` → 410.

## 2. Content model (PHP arrays, no DB)

```
config.example.php          // VENDERCRM_URL, VENDERCRM_API_KEY, GA4_ID, ADS_ID, SITE_URL — copied to config.php on the server
content/site.php            // firm facts: name, phone, whatsapp, email, address, hours, matricula, foundedYear, teamSize, socials, stats[], testimonials[], team[], credentials[]
content/services.php        // array keyed by slug: path, title (legacy H1), navLabel, cluster, seoTitle, metaDescription, hero{eyebrow,h1,h2,lead}, includes[], sections[], benefits[], faq[], cta{label,whatsappText}, related[]
content/nav.php             // header + footer link trees (derived from services + static pages)
content/ui.php              // all UI strings (single-locale i18n layer)
content/precios.php         // plans
content/blog.php            // article index: slug, title, description, date, tags (body lives in the article file)
content/vencimientos.php, content/laboral.php   // tool rule tables with lastReviewed (B3)
lib/bootstrap.php           // loads config (or example defaults), content, helpers
lib/helpers.php             // e($str) escaping, url(), asset() with cache-busting, whatsapp_link(), fmt_gs()
lib/seo.php                 // head() builder: title template, description, canonical, OG, JSON-LD
partials/head.php, header.php, footer.php, whatsapp-fab.php, breadcrumbs.php, faq.php, cta-band.php, process.php, service-card-grid.php, testimonials.php, industries.php, status-panel.php, lead-form.php
templates/service.php       // renders one service from content/services.php; each /<slug>/index.php is 3 lines: set $slug, require template
templates/article.php       // blog article wrapper
router.php                  // for `php -S` only: maps /x/ → /x/index.php and mimics the .htaccess gone/redirect rules
```

Every page file is `<dir>/index.php` and starts with `require __DIR__.'/../lib/bootstrap.php';`. All output goes through `e()`.

Identifiers in English; slugs/copy in Spanish. The `services.php` record shape is fixed in A1 and consumed unchanged by B1. B-phases may add optional keys but never rename or remove.

## 3. Feature scope

**Core (A1–B2):** design system CSS, responsive layout, sticky header with services mega-menu (CSS + small JS), WhatsApp floating button, homepage (1B), Servicios hub, 14 service pages (12 legacy + /contabilidad/ + /irp/), Nosotros, Contacto with form, Precios, Privacidad, Términos, 404, Blog index + article template + 5 articles, SEO (titles, descriptions, canonical, OG, `sitemap.xml`, `robots.txt`, JSON-LD: AccountingService/LocalBusiness, BreadcrumbList, FAQPage, Article), `.htaccess` redirects/410s, `enviar.php` → VenderCRM, deploy zip script.

**Tools (B3, share one `herramientas/` layout, priority order from keyword data):** calculadora de aguinaldo (≈5 000 searches/mo, with a first-class "proporcional" mode), calculadora de liquidación de salario / finiquito (5 400/mo, IPS 9 % line shown), DNIT vencimientos calendar by RUC terminación ("Recordarme por WhatsApp" CTA), IVA calculator (10 % / 5 % inclusive-exclusive), comparador EAS vs SRL vs Unipersonal, "¿Qué necesita?" 4-question quiz that pre-fills the lead form. All vanilla JS, progressively enhanced (page copy readable without JS).

**Polish (B4):** imagery via Higgsfield (illustrative only, no captioned identity claims), Lighthouse ≥ 95 mobile, a11y pass, GA4 + Google Ads conversion events (whatsapp_click, lead_submit, tool_used), Hostinger upload, DNS cutover checklist, GBP link and NAP consistency.

## 4. Autonomy protocol (every phase prompt copies these rules by reference)

1. Work until every exit criterion of the phase passes; never ask permission for in-plan work.
2. One PR per phase. Branch `phase/<id>` off latest `main`. Create the PR, watch CI, merge when green. Red CI is the session's own work. Never start on top of an unmerged previous phase.
3. Minor non-blocking issues → `KNOWN-ISSUES.md`, keep building.
4. Stop and ask ONLY for: a missing credential with no graceful fallback, or a bad-foundation decision (content model shape, route structure, `enviar.php` contract) where guessing wrong forces a rewrite. Everything else: choose reasonably, record in the build log, continue.
5. Missing config values never block: document in `config.example.php`, degrade gracefully.
6. Every phase prompt is re-runnable: check what exists on the branch first, continue from the first unmet exit criterion.
7. Model-B (Sonnet) hard limits: no changes to the tokens block of `assets/css/site.css`, `partials/header.php`, `partials/footer.php`, `lib/*`, the structure of `templates/service.php`, `enviar.php`, `.htaccess`. Need something there? Work around it and write a Backlog note. Adding a new partial, a new content key, or a new CSS block below the tokens is allowed.
8. Model cost guardrail: Fable is never used for build phases, subagents, or spawned sessions. Phase tables only ever name Opus and Sonnet. If a session believes Fable is needed, it stops and asks Anton with the reason.
9. Phase handoff, only when four gates pass: PR merged green; exit checklist passed; pre-handoff audit done (re-run `./verify.sh` on main, adversarially re-read your own merged diff, fix findings); build-log entry committed. Then spawn the next phase as a NEW session via the claude-code-remote `create_session` tool: inherit environment and permission mode (never `plan`), set `model` per the phase table, `prompt` exactly `Read prompts/<next-file>.md in this repo and execute it.` Then end with the phase report. Fallback without `create_session`: continue in the same window if the next phase uses the same model; stop and report at a model switch.
10. Build log: before merging, append a 5–10 line dated entry to §9. Fresh sessions orient from plan.md + §9 + KNOWN-ISSUES.md only.
11. Quality bar for copy: every page has a unique `<title>` (≤ 60 chars, keyword first, "| Contador.com.py" suffix), a unique meta description (120–155 chars), one H1 that contains the target keyword, and at least 3 internal links to sibling services. No paragraph from the scan is pasted verbatim: rewrite, tighten, fix the three known copy-paste bugs (scan §6.9).
12. Every phase attaches Playwright screenshots (1440 and 390 px) of the pages it touched to `docs/screenshots/<phase>/` and embeds them in the PR body, so each PR is a visual preview. Every phase also re-runs `deploy/make-zip.sh` so `main` always has a deployable zip recipe.

## 5. Model-A phases (Opus)

### 5.1 A1 — Foundation

Skills to load: `vendercrm-lead-capture` (static HTML+PHP section), `nextjs-national-lead-gen` (§2 architecture and §3 SEO only; ignore the Next.js parts), `paraguay-business-apps` (§1 money format, §2 RUC validation → port to PHP and JS helpers), `nextjs-deploy-hostinger` only for the hPanel / File Manager / Git-deploy mechanics of shared hosting.

1. Repo layout per §2. `lib/bootstrap.php` loads `config.php` if present else `config.example.php` defaults, then content and helpers. `.gitignore`: `config.php`, `logs/*`, `tests/node_modules/`, `tests/output/`, `dist/`.
2. Design system: `assets/css/site.css` with a `:root` tokens block (colors, radii, shadows, type scale from 1B), reset, typography, layout utilities (container, grid, section spacing 88px desktop → 56px mobile), components: buttons (primary amber, secondary outline, whatsapp green), card, section header (eyebrow/title/lead), pill, stat, FAQ (native `<details>`), breadcrumbs, status-panel (the "Panel del cliente" mock, generic labels, no client name), lead form. Self-host Bricolage Grotesque 400/500/600/800 woff2 with `font-display: swap`.
3. Layout partials: `header.php` (wordmark "contador.com.py", nav: Servicios mega-menu with the three clusters + Nosotros, Precios, Blog, Contacto; WhatsApp pill + "Pedir cotización" amber button; mobile drawer with a few lines of JS), `footer.php` (4 columns as 1B: firm blurb, Servicios (all 14), Firma, Contacto with NAP), `whatsapp-fab.php`, `head.php` (meta, OG, canonical, JSON-LD, font preload, CSS), skip link, focus styles, `lang="es-PY"`.
4. Content files per §2 with `site.php` filled from §7 or `null`s, `services.php` seeded with slug/path/title/cluster/navLabel for all 14 services (copy keys empty; B1 fills them), `ui.php` strings, `nav.php` derived.
5. Routes: a directory with a 3-line `index.php` for all 14 services (rendered through `templates/service.php` from the seed data) plus `/servicios/`, `/nosotros/`, `/contacto/`, `/precios/`, `/blog/`, `/privacidad/`, `/terminos/`, `/herramientas/` (placeholders rendering the title and one line of text are fine in A1), `/404.php`, `/index.php`.
6. `.htaccess`: `ErrorDocument 404 /404.php`; force trailing slash on directories; `Redirect gone` for `/single-service/`, `/hello-world/`, `/category/uncategorized/`; `RewriteCond %{QUERY_STRING} ^page_id=3$` → 301 `/privacidad/`; `/wp-sitemap.xml` → 301 `/sitemap.xml`; `/sitemap.xml` → `sitemap.php`; deny web access to `content/`, `lib/`, `partials/`, `templates/`, `logs/`, `config*.php`, `docs/`, `prompts/`, `tests/`, `deploy/`; gzip and cache headers for `assets/`.
7. SEO: `lib/seo.php` head builder (title template, description, canonical from `SITE_URL`, OG defaults, JSON-LD `AccountingService` + `LocalBusiness` from `site.php`, `BreadcrumbList`, `FAQPage`, `Article`); `sitemap.php` generated from the content arrays; static `robots.txt`; default OG image placeholder `assets/img/og-default.png`.
8. `enviar.php`: POST only, honeypot, same-origin check via `Origin`/`Referer`, validates `{name, phone, email?, need, message?, utm_*}`, file-based rate limit by IP in `logs/`, idempotency key from a hidden field, cURL to VenderCRM with a timeout, JSON response `{ok, degraded}`; `partials/lead-form.php` with the "¿Qué necesita?" chip selector from 1B, progressive enhancement (plain POST + redirect to `/contacto/?enviado=1` works without JS; JS upgrades to inline success pointing to WhatsApp).
9. Verify: `verify.sh` runs `php -l` on every PHP file, starts `php -S 127.0.0.1:8080 router.php`, curls every URL in scan §2 plus the new routes and asserts the expected status (200/301/410), checks that no two pages share a `<title>` or description, then stops the server. `tests/` holds a Playwright script (`npm ci` inside `tests/` only) that takes the screenshots. GitHub Actions on PRs: `verify.sh` + screenshots as a workflow artifact.
10. `deploy/make-zip.sh` builds `dist/contador-<date>.zip` containing exactly what goes to `public_html/` (excludes `docs/`, `prompts/`, `tests/`, `deploy/`, `.git*`, `config.php`, `logs/*`, `dist/`). `README.md` sections: "Preview locally" (`php -S localhost:8080 router.php`), "Deploy to Hostinger" (zip upload in File Manager, or Git deploy from hPanel; create `config.php` from `config.example.php` on the server; PHP 8.2), "Content model".

Exit: `./verify.sh` green; every URL in scan §2 responds per §5.1.6; `/` renders header/footer/fab with 1B tokens; `enviar.php` returns `{ok:true, degraded:true}` without a key and forwards with one; `deploy/make-zip.sh` produces a zip that, unzipped into a fresh `php -S` root, passes the same smoke test; Playwright screenshots (1440/390) of `/`, `/servicios/`, `/marangatu/`, `/contacto/` in `docs/screenshots/a1/` and in the PR body; README has "Preview locally" and "Deploy to Hostinger"; PR merged.

### 5.2 A2 — Homepage + shared partials + Servicios hub

Skills: `nextjs-national-lead-gen` (§4 pattern menu only), `paraguay-business-apps` (terminology check: DNIT, SIFEN, Marangatu, IPS, MTESS, IRE, F.120).

1. Port 1B section by section, in order: Hero (eyebrow pill, H1, lead, two CTAs, three stats from `site.stats` or hidden, status panel), Servicios (6 cards per §1.8, numbered 01–06, "¿No sabe qué necesita?" strip), Credibilidad (two photo slots + "N años" badge only if `foundedYear`; ✓ bullets from `site.credentials`), Proceso (4 steps), Casos (testimonials, hidden when empty; if hidden, render "Rubros que atendemos": comercio, servicios, construcción, importación, profesionales, gastronomía), Contacto (split: copy + WhatsApp + NAP left, lead form right), footer from A1.
2. Match 1B spacing, type scale, card style. Mobile: single column, hero panel below copy, sticky bottom WhatsApp bar.
3. Partials `process.php`, `cta-band.php`, `service-card-grid.php`, `testimonials.php`, `industries.php` are reusable and parameterised (B-phases reuse them on service pages and may not modify them).
4. `/servicios/` hub: hero, three cluster sections each with `service-card-grid.php` of its services (all 14 including `/contabilidad/` and `/irp/` under Gestión empresarial), process, CTA band.
5. Homepage SEO: title "Contador en Asunción | Estudio contable para pymes | Contador.com.py", description, `AccountingService` JSON-LD, OG image.
6. Copy: rewrite from scan §4.1 + 1B. Keep the H1 concept "Estudio contable y contabilidad en Paraguay" as keyword anchor but use 1B's promise headline; example H1: "Estudio contable en Asunción: impuestos, contabilidad y nómina sin llegar tarde".
7. CSS additions go below the tokens block in `site.css` under `/* == home == */`; no inline styles.

Exit: `/` and `/servicios/` visually match 1B at 1440 and 390 widths (screenshots in `docs/screenshots/a2/` and PR); Lighthouse mobile perf ≥ 90 on `/` (against `php -S`); `./verify.sh` green; PR merged.

## 6. Model-B phases (Sonnet)

Hard limits (§4.7). Data access only through `content/*.php` and the partials A1/A2 built.

### 6.1 B1 — Service pages (14)

Skills: `paraguay-business-apps`, `nextjs-national-lead-gen` §3 (SEO only). Read `docs/keyword-research.md` first for H2 targets.

1. Complete `templates/service.php`: breadcrumbs (Inicio › Servicios › [Cluster] › Title; audit children add › Auditoría), hero (eyebrow = cluster, H1 = legacy title enriched, H2 = descriptive headline, lead, CTA pair), "Qué incluye" checklist, body sections (2–4, from the scan's real content, rewritten), Beneficios (3–4 cards), Proceso (reuse), FAQ (3–5, `<details>` + `FAQPage` JSON-LD), related services (3), CTA band with service-specific WhatsApp prefill text. Structure stays; B1 fills sections and adds CSS below the tokens.
2. Fill `content/services.php` for all 12 legacy pages from scan §3, rewriting in "usted", tightening to ~600–900 words each, fixing scan §6.9 bugs (EAS closing CTA, Auditoría Impositiva benefits, Auditoría Forense FAQ 3). Keep the legacy H1 label visible in the H1 (e.g. "Marangatu: gestión de su cuenta ante la DNIT").
3. New page `/contabilidad/` "Contabilidad mensual" (cluster: Gestión empresarial) — write it fresh: libros, conciliaciones, estados financieros (H2s for balance general, estado de resultados, flujo de efectivo), cierre antes del día 5, informe mensual.
3b. New page `/irp/` "IRP — Impuesto a la Renta Personal" (cluster: Gestión empresarial): quiénes deben inscribirse, rangos, deducciones, presentación anual, servicio de liquidación. 1 600 searches/mo with zero legacy coverage.
3c. `/marangatu/` and `/ekuatia/` get a "Guía rápida" block (cómo ingresar, recuperar clave, errores frecuentes; Marangatu: "Marangatu 2.0", consulta de RUC, ESET, H2 "Certificado de Cumplimiento Tributario"; Ekuatia: "Ekuatia vs Ekuatia'i", "¿Qué es SIFEN?"; `/ekuatia/` H1 names Ekuatia'i because it has 22 200 searches/mo and +309 % growth). `/ire-simple/` gets H2s for Resimple, IRE General and Formulario 120. `/ruc/` H1 uses "Inscripción de RUC", H2 "Cómo inscribirse al RUC".
4. `/auditoria/` sub-hub keeps the 3 child cards.
5. Unique title/description per page (§4.11), sibling links, `related` filled.

Exit: 14 service URLs render with full copy, FAQ JSON-LD validates, no page shares a title or description (`verify.sh` checks), screenshots of 3 service pages, PR merged.

### 6.2 B2 — Secondary pages + blog

1. `/nosotros/`: rewrite scan §4.2 (real, good content) in "usted" plus 1B "Quiénes somos" structure; team only from `site.team` (hidden if empty); values; credentials; CTA.
2. `/contacto/`: 1B contact split, lead form, WhatsApp, NAP, map embed only if address confirmed, hours; `?enviado=1` success state.
3. `/precios/` per §1.10.
4. `/privacidad/`, `/terminos/`: real Spanish legal text for a Paraguayan accounting firm (Ley 6534/2020 data protection reference, confidentiality of tax credentials), dated.
5. `404.php` with helpful links.
6. Blog: `/blog/` index (cards from `content/blog.php`), `templates/article.php` with Article JSON-LD, author = firm, reading time, related services. Five launch articles as `/blog/<slug>/index.php` (900–1300 words each, "usted"): "Cómo se calcula el aguinaldo en Paraguay (con ejemplos)"; "IRE Simple vs Resimple vs IRE General: cuál le corresponde y el Formulario 120"; "Cómo habilitarse en SIFEN y emitir factura electrónica (Ekuatia'i)"; "Cómo obtener el Certificado de Cumplimiento Tributario en Marangatu"; "Abrir una EAS en Paraguay: pasos, costos y plazos". Each article links to its calculator/service.
7. Footer legal links and social links only render when set. `sitemap.php` picks up blog entries automatically.

Exit: all pages above 200 with unique metadata, blog index shows 5 posts, `./verify.sh` green, screenshots, PR merged.

### 6.3 B3 — Tools

1. `/herramientas/` index + six tools, each `/herramientas/<slug>/index.php` with 200–300 words of SEO copy, a vanilla-JS module in `assets/js/tools/<slug>.js`, and a CTA that opens the lead form prefilled with the result. Build in this order (keyword volume): aguinaldo, liquidación de salario, vencimientos, IVA, comparador, quiz.
1b. Calculadora de aguinaldo (`/herramientas/calculadora-aguinaldo/`): salarios percibidos por mes (12 inputs or "mismo salario todos los meses"), result = suma/12 in ₲, with a first-class "aguinaldo proporcional" toggle (months worked) and an FAQ on cuándo se cobra. Rules in `content/laboral.php` with `lastReviewed`.
1c. Calculadora de liquidación de salario / finiquito (`/herramientas/liquidacion-de-salario/`): fecha ingreso/egreso, salario, motivo (renuncia / despido injustificado / justificado), output: salario proporcional, IPS 9 % deduction as its own line, vacaciones proporcionales, aguinaldo proporcional, preaviso, indemnización (Código del Trabajo art. 91 y ss.). "Valores orientativos" disclaimer and WhatsApp CTA.
2. Vencimientos: input RUC terminación (0–9), output this month's and next month's dates for IVA mensual, IRE (annual), IPS; table in `content/vencimientos.php` with `lastReviewed` shown. No scraping.
3. IVA calculator: monto, tipo (10 % / 5 % / exento), incluido/excluido; guaraní formatting per `paraguay-business-apps` §1 (JS `Intl.NumberFormat('es-PY')`).
4. Comparador EAS / SRL / Unipersonal: static comparison table + "cuál le conviene" 3-question mini-quiz.
5. "¿Qué necesita?" quiz (4 steps) → recommends services (links) + prefilled lead form.
6. Analytics events `tool_used` (name) via the A1 `assets/js/analytics.js` helper (no-op until a GA id is configured).

Exit: six tools work with keyboard only and without console errors, page copy readable with JS disabled, `./verify.sh` green, screenshots, PR merged.

### 6.4 B4 — Imagery, polish, launch

Skills: `higgsfield-web-imagery`, `nextjs-deploy-hostinger` (shared-hosting mechanics only), `gbp-optimizer`.

1. Images: hero portrait slot, team/office ambience, service card illustrations (one style Element, ink-blue duotone), OG image. Illustrative only; no captioned identity claims (skill rule 1). Cost preflight first; ≤ 12 generations. Pre-optimised AVIF/WebP + fallback via `<picture>`, explicit width/height, lazy loading below the fold.
2. Performance: Lighthouse mobile ≥ 95 perf / 100 a11y / 100 SEO on `/`, one service page, one article. Font subsetting, no layout shift on the hero panel, minified CSS copy produced by a small script in `deploy/` and committed.
3. Analytics: GA4 + Google Ads tag via config ids; events whatsapp_click, lead_submit, tool_used, phone_click; small notice linking `/privacidad/` (no cookie-banner mandate in Paraguay).
4. Deploy: `deploy/make-zip.sh` → upload to the Hostinger staging subdomain (or Git deploy), create `config.php`, PHP 8.2, verify; `docs/launch-checklist.md` with numbered manual steps for Anton (DNS cutover, WordPress off, `wp-sitemap.xml` redirect live, Search Console resubmit, GBP website URL).
5. Post-cutover verification `deploy/verify-live.sh`: curl every scan §2 URL on the live domain, assert status per §5.1.6, print report.
6. GBP: NAP identical to `site.php`; categories "Contador", "Asesor fiscal"; GBP description + 3 post drafts into `docs/gbp.md`.

Exit: staging URL passes `verify-live.sh`; Lighthouse targets met; `docs/launch-checklist.md` and `docs/gbp.md` written; PR merged. STOP and report (no further phase).

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
| Hostinger shared-hosting account, staging subdomain, domain DNS access | B4 | pending |
| GA4 measurement id, Google Ads conversion id/labels | B4 | pending |
| Social profile URLs (or none) | B2 | pending |
| Existing legal text in WP admin drafts, if any | B2 | pending |

## 7b. Milestones (what is usable when)

| After merge of | You get |
|---|---|
| A1 | Local preview (`php -S localhost:8080 router.php`) with real header/footer/WhatsApp button and placeholder pages; a deploy zip that already runs on Hostinger |
| A2 | Homepage and Servicios hub look like 1B |
| B1 | All 14 service pages with real copy |
| B2 | **Publishable minimum**: every legacy URL has real content, legal pages, contact form. Could go live here if needed |
| B3 | Calculators and tools (SEO growth) |
| B4 | **Launch-ready**: images, Lighthouse, analytics, live verification, launch checklist |

Every phase's PR carries screenshots, and every merge can be zipped with `deploy/make-zip.sh` and uploaded to the staging subdomain, so a live preview is available from A1 on.

## 8. Open business questions (parked)

- Client portal (real "Panel del cliente") later? The hero mock hints at it; out of scope now and would need a different stack.
- Second language (English for foreign investors opening companies in Paraguay)? `content/ui.php` makes it a file, not a refactor.
- Google Ads campaign structure: see `docs/keyword-research.md` Ads shortlist.

## 9. Build log & handoff

- 2026-09-03 — Plan rewritten from Next.js to static HTML + PHP on Hostinger shared hosting (Anton's decision). The Opus A1 session that had started on the Next.js prompt was interrupted; its branch `claude/opus-1-foundation-prompt-65vkrc` is abandoned and must not be merged.

## 10. Backlog

- Client portal / login.
- English version of apertura-de-empresa pages for foreign founders.
- WhatsApp vencimiento reminders (needs backend + DB).
- Case studies once real clients agree.
