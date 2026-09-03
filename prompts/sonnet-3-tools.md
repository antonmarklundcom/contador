# Phase B3 — Tools. Paste into a fresh SONNET session, ONLY after phase B2 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.3 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): no changes to design tokens, layout components, content model types, lead API, `next.config`.

Phase rules:
- Branch `phase/b3-tools` off latest `main`. B2 unmerged ⇒ finish it first.
- Load skill: `paraguay-business-apps` (§1 guaraní formatting, RUC rules).
- Four tools under `/herramientas/`: vencimientos by RUC terminación, IVA calculator, comparador EAS/SRL/Unipersonal, "¿Qué necesita?" quiz. Client components inside the existing layout.
- Vencimientos data is a reviewed static table (`src/content/vencimientos.ts`) with a visible `lastReviewed` date. Do not scrape.
- Each tool page has 200–300 words of SEO copy and a CTA that opens `LeadForm` prefilled with the result.
- Keyboard-operable, no console errors, `tool_used` analytics event through the A1 helper.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `/herramientas/` + 4 tool URLs work end to end with keyboard only; `npm run verify` green; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-4-polish-launch.md`, model **Sonnet**.
