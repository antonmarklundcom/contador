# Phase A1 — Foundation (HTML + PHP). Paste into a fresh OPUS session.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §5.1 under the autonomy protocol §4. Build nothing outside the plan.

Inputs: `docs/reference/design-canvas-home.dc.html` (option `1b` block only, plus its "Guía de estilo")
and `docs/reference/site-scan-2026-09-02.md` (§2 URL inventory is the route contract).

STACK IS FIXED (plan §1.5): plain HTML + PHP 8 on Hostinger shared hosting. No Next.js, no Node at runtime, no build step, no framework, no database. Node is allowed only inside `tests/` for Playwright screenshots. Ignore the abandoned branch `claude/opus-1-foundation-prompt-65vkrc` (Next.js attempt).

Phase rules:
- Branch `phase/a1-foundation` off latest `main`.
- Load skills at the matching step: `vendercrm-lead-capture` (static HTML+PHP section), `nextjs-national-lead-gen` (§2 architecture, §3 SEO only), `paraguay-business-apps` (§1 money, §2 RUC), `nextjs-deploy-hostinger` (shared-hosting hPanel/File Manager/Git-deploy mechanics only).
- The content model in plan §2 is the contract every later phase consumes: write `content/services.php` seed and `templates/service.php` first, document the array shape in `README.md`.
- Directory-per-route with `index.php`; `.htaccess` per plan §5.1.6; `router.php` for `php -S` mimics the same rules so `verify.sh` can assert 200/301/410 on all 21 scan §2 URLs plus the new routes.
- Design tokens come from the 1b style guide verbatim as CSS custom properties; do not invent colors. Self-host Bricolage Grotesque woff2.
- `enviar.php` must work with no `config.php` (degraded mode) — never block on the VenderCRM key.
- Do not write service copy; seed `services.php` with slug/path/title/cluster/navLabel only.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `./verify.sh` green (php -l + route smoke test + duplicate title/description check); `/` renders header, footer, WhatsApp FAB with 1b tokens; `enviar.php` returns `{ok:true, degraded:true}` without a key; GitHub Actions runs `verify.sh` on PRs; `deploy/make-zip.sh` produces a zip that passes the smoke test when unzipped into a fresh `php -S` root; `config.example.php`, `README.md` ("Preview locally", "Deploy to Hostinger", "Content model"), `KNOWN-ISSUES.md` exist;
PREVIEW: Playwright screenshots of `/`, `/servicios/`, `/marangatu/`, `/contacto/` at 1440 and 390 px saved to `docs/screenshots/a1/` and embedded in the PR body; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/opus-2-home.md`, model **Opus**.
