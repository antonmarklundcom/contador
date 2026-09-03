# Phase B1 — 14 service pages. Paste into a fresh SONNET session, ONLY after phase A2 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.1 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): do not change the CSS tokens block, `partials/header.php`, `partials/footer.php`, `lib/*`, the structure of `templates/service.php`, `enviar.php`, or `.htaccess`. Need something there? Work around it and add a Backlog note in plan §10. Adding content keys, new partials, or CSS below the tokens is fine.

Phase rules:
- Branch `phase/b1-services` off latest `main`. A2 unmerged ⇒ finish it first.
- Stack is HTML + PHP partials (plan §1.5). All copy lives in `content/services.php`; page files stay 3 lines.
- Load skills: `paraguay-business-apps`, `nextjs-national-lead-gen` (§3 SEO only).
- Source copy = `docs/reference/site-scan-2026-09-02.md` §3 (verbatim legacy text). REWRITE it: "usted", tighter,
  600–900 words per page, keyword-first H1 that still contains the legacy title label. Never paste paragraphs verbatim.
- Fix the three copy-paste bugs in scan §6.9 with genuinely new passages (EAS closing CTA; Auditoría Impositiva benefits; Auditoría Forense FAQ 3).
- Write the new `/contabilidad/` and `/irp/` pages from scratch (plan §6.1.3, 3b) and the Guía blocks on Marangatu/Ekuatia/IRE/RUC (§6.1.3c). Read `docs/keyword-research.md` first for the H2 targets.
- Every page: unique title ≤ 60 chars, unique description 120–155 chars, FAQ (3–5) with `FAQPage` JSON-LD, 3 related services, service-specific WhatsApp prefill text. Everything escaped through `e()`.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: all 14 service URLs render full copy; `FAQPage` JSON-LD validates on each; no duplicate titles/descriptions; `./verify.sh` green; screenshots of 3 service pages in `docs/screenshots/b1/` and the PR; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-2-pages.md`, model **Sonnet**.
