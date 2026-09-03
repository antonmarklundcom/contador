# Phase B1 — 13 service pages. Paste into a fresh SONNET session, ONLY after phase A2 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.1 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): do not change design tokens, layout components, content model types, the lead API,
or `next.config`. Need something there? Work around it and add a Backlog note in plan §10.

Phase rules:
- Branch `phase/b1-services` off latest `main`. A2 unmerged ⇒ finish it first.
- Load skills: `paraguay-business-apps`, `nextjs-national-lead-gen` (§3 SEO).
- Source copy = `docs/reference/site-scan-2026-09-02.md` §3 (verbatim legacy text). REWRITE it: "usted", tighter,
  600–900 words per page, keyword-first H1 that still contains the legacy title label. Never paste paragraphs verbatim.
- Fix the three copy-paste bugs in scan §6.9 with genuinely new passages (EAS closing CTA; Auditoría Impositiva benefits; Auditoría Forense FAQ 3).
- Write the new `/contabilidad/` page from scratch (plan §6.1.3).
- Every page: unique title ≤ 60 chars, unique description 120–155 chars, FAQ (3–5) with `FAQPage` JSON-LD, 3 related services, service-specific WhatsApp prefill text.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: all 13 service URLs render full copy; `FAQPage` JSON-LD validates on each; no duplicate titles/descriptions
(add a check to `verify`); `npm run verify` green; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-2-pages.md`, model **Sonnet**.
