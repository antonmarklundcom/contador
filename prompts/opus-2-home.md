# Phase A2 — Homepage + shared partials + Servicios hub. Paste into a fresh OPUS session, ONLY after phase A1 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §5.2 under the autonomy protocol §4. Build nothing outside the plan.

Phase rules:
- Branch `phase/a2-home` off latest `main`. A1 unmerged ⇒ finish it first.
- Stack is HTML + PHP partials + one CSS file + vanilla JS (plan §1.5). No build tools.
- Load skills: `nextjs-national-lead-gen` (§4 pattern menu only), `paraguay-business-apps` (terminology).
- Port the 1b artboard section by section (`docs/reference/design-canvas-home.dc.html`, `data-screen-label="1b ..."`). Match spacing, type scale, card and pill styles. Responsive to 390px. No inline styles; CSS goes below the tokens block in `assets/css/site.css`.
- Plan §1.4 is absolute: no invented names, numbers, or quotes. Stats and testimonials render only from `content/site.php`; when empty, use the fallbacks named in §5.2.1.
- Six service cards per plan §1.8 (five from 1b + Auditoría). Every card links to real legacy paths.
- Make the partials `process.php`, `cta-band.php`, `service-card-grid.php`, `testimonials.php`, `industries.php` reusable and parameterised — B-phases reuse them and may not modify them.
- Copy in "usted", Spanish (PY). Homepage title/description per §5.2.5.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `/` and `/servicios/` match 1b at 1440 and 390 widths (screenshots in `docs/screenshots/a2/` and in the PR body);
Lighthouse mobile performance ≥ 90 on `/` against `php -S`; `AccountingService` JSON-LD valid; `./verify.sh` green; `deploy/make-zip.sh` still works; PR merged.

## After this phase — model switch
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-1-services.md`, model **Sonnet**.
