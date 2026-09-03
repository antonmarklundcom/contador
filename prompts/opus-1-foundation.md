# Phase A1 — Foundation. Paste into a fresh OPUS session.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md` (create it if missing).
Execute plan §5.1 under the autonomy protocol §4. Build nothing outside the plan.

Inputs: `docs/reference/design-canvas-home.dc.html` (option `1b` block only, plus its "Guía de estilo")
and `docs/reference/site-scan-2026-09-02.md` (§2 URL inventory is the route contract).

Phase rules:
- Branch `phase/a1-foundation` off latest `main` (if `main` has no commits yet, this branch becomes the base: push it and open the PR against `main`).
- Load skills at the matching step: `nodejs-mysql-hostinger-stack` (scaffold conventions only; NO database), `nextjs-deploy-hostinger`, `nextjs-national-lead-gen`, `vendercrm-lead-capture`, `paraguay-business-apps`.
- The content model in plan §2 is the contract every later phase consumes: types first, exported from `src/content/types.ts`, documented in `README.md`.
- One dynamic `app/[slug]/page.tsx` serves every legacy flat path (trailingSlash: true). Verify all 21 scan §2 URLs in the `verify` smoke test.
- Design tokens come from the 1b style guide verbatim; do not invent colors. Bricolage Grotesque via `next/font/google`.
- Lead API must work with no env vars (degraded mode) — never block on the VenderCRM key.
- Do not write service copy; seed `services.ts` with slug/path/title/cluster/navLabel only.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `npm run verify` green (typecheck + lint + route smoke test asserting 200/301/410 per plan §5.1.6);
`/` renders header, footer, WhatsApp FAB with 1b tokens; `/api/lead` returns 200 in degraded mode;
GitHub Actions workflow runs verify+build on PRs; `.env.example`, `README.md`, `KNOWN-ISSUES.md` exist;
PREVIEW: Playwright screenshots of `/`, `/servicios/`, `/marangatu/`, `/contacto/` at 1440 and 390 px saved to `docs/screenshots/a1/` and embedded in the PR body; `README.md` has a 3-line "Preview locally" section (`npm ci && npm run dev`, open http://localhost:3000) and a "Deploy to Hostinger" section listing the exact hPanel steps to connect this GitHub repo so every merge to `main` auto-deploys to the staging subdomain (build `npm run build`, start `npm run start`, env vars from `.env.example`); PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/opus-2-home.md`, model **Opus**.
