# Phase B4 — Imagery, performance, analytics, launch. Paste into a fresh SONNET session, ONLY after phase B3 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.4 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): no changes to the CSS tokens block, `partials/header.php`, `partials/footer.php`, `lib/*`, `templates/service.php` structure, `enviar.php`, `.htaccess` (exception: cache/compression headers and analytics config wiring explicitly required by this phase).

Phase rules:
- Branch `phase/b4-launch` off latest `main`. B3 unmerged ⇒ finish it first.
- Stack is HTML + PHP on Hostinger shared hosting (plan §1.5). Deploy is a zip upload or hPanel Git deploy, not a Node app.
- Load skills: `higgsfield-web-imagery` (cost preflight first; ≤ 12 generations; illustrative only, no captioned identity claims), `nextjs-deploy-hostinger` (shared-hosting mechanics only), `gbp-optimizer`.
- Images pre-optimised to AVIF/WebP with `<picture>` fallbacks, explicit dimensions, lazy below the fold.
- Lighthouse mobile targets: ≥ 95 performance, 100 a11y, 100 SEO on `/`, one service page, one article. Record numbers in the PR.
- Analytics via `config.php` ids only; events per plan §6.4.3.
- Deploy with `deploy/make-zip.sh` to the Hostinger staging subdomain (or Git deploy); write `docs/launch-checklist.md` with numbered manual steps (config.php, PHP version, DNS cutover, WordPress off, Search Console, GBP URL).
- Post-cutover verification `deploy/verify-live.sh` per plan §6.4.5.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: staging URL passes `verify-live.sh`; Lighthouse targets met; `docs/launch-checklist.md` and `docs/gbp.md` written; PR merged.

## After this phase — STOP
No further phase. End with the closing report: staging URL, Lighthouse numbers, the launch checklist, and the
exact numbered manual steps Anton must do (config.php, DNS, GBP). Do not spawn a session.
