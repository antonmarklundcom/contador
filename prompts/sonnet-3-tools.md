# Phase B3 — Tools. Paste into a fresh SONNET session, ONLY after phase B2 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.3 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): no changes to the CSS tokens block, `partials/header.php`, `partials/footer.php`, `lib/*`, `templates/service.php` structure, `enviar.php`, `.htaccess`.

Phase rules:
- Branch `phase/b3-tools` off latest `main`. B2 unmerged ⇒ finish it first.
- Stack is HTML + PHP + vanilla JS (plan §1.5). Each tool = `/herramientas/<slug>/index.php` + `assets/js/tools/<slug>.js`. No bundler, no framework.
- Load skill: `paraguay-business-apps` (§1 guaraní formatting, RUC rules).
- Six tools under `/herramientas/`, in this order: calculadora de aguinaldo (with "proporcional" mode), liquidación de salario/finiquito (IPS 9 % line shown), vencimientos by RUC terminación, IVA calculator, comparador EAS/SRL/Unipersonal, "¿Qué necesita?" quiz. Labour rules live in `content/laboral.php`, vencimientos in `content/vencimientos.php`, both with a visible `lastReviewed` date; results carry an "orientativo" disclaimer. Do not scrape.
- Each tool page has 200–300 words of SEO copy readable without JS and a CTA that opens the lead form prefilled with the result.
- Keyboard-operable, no console errors, `tool_used` analytics event through `assets/js/analytics.js`.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `/herramientas/` + 6 tool URLs work end to end with keyboard only; `./verify.sh` green; screenshots in `docs/screenshots/b3/` and the PR; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-4-polish-launch.md`, model **Sonnet**.
