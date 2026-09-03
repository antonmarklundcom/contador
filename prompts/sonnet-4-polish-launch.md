# Phase B4 — Imagery, performance, analytics, launch. Paste into a fresh SONNET session, ONLY after phase B3 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.4 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): no changes to design tokens, layout components, content model types, lead API, `next.config`
(exception: image domains / analytics env wiring explicitly required by this phase).

Phase rules:
- Branch `phase/b4-launch` off latest `main`. B3 unmerged ⇒ finish it first.
- Load skills: `higgsfield-web-imagery` (cost preflight first; ≤ 12 generations; illustrative only, no captioned identity claims), `nextjs-deploy-hostinger`, `gbp-optimizer`.
- Lighthouse mobile targets: ≥ 95 performance, 100 a11y, 100 SEO on `/`, one service page, one article. Record numbers in the PR.
- Analytics via env ids only; events per plan §6.4.3.
- Deploy to the Hostinger Node slot and staging subdomain; write `docs/launch-checklist.md` with numbered manual steps (DNS cutover, WordPress off, Search Console, GBP URL).
- Post-cutover verification script `scripts/verify-live.ts` per plan §6.4.5.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: staging URL passes `verify-live`; Lighthouse targets met; `docs/launch-checklist.md` and `docs/gbp.md` written; PR merged.

## After this phase — STOP
No further phase. End with the closing report: staging URL, Lighthouse numbers, the launch checklist, and the
exact numbered manual steps Anton must do (env vars, DNS, GBP). Do not spawn a session.
