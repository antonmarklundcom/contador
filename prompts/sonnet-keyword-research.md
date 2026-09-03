# Keyword research intake. Paste into a fresh SONNET session, any time. Not a build phase.

You are updating `docs/keyword-research.md` in this repo with new Google Ads Keyword Planner exports that Anton pastes into this chat. Read `docs/keyword-research.md` and `plan.md` first.

Rules:
1. Anton pastes raw KWP text (Swedish UI: "Sökord som du har angett" = entered keywords, "Sökordsförslag" = suggestions; columns are keyword, monthly volume, 3-month change, YoY change, competition Låg/Medel/Hög, ad impression share, bid low, bid high in SEK). Parse it; do not ask him to reformat.
2. Only add rows for terms that change something: volume ≥ 100, or strong growth with commercial intent, or a term that reveals a missing page/H2/tool. Terms ≤ 10 volume are grouped into one theme line, never listed individually. Competitor brand names and job-seeker terms (ISO auditor, "auditor interno jr") go into one "ignore" line.
3. For every kept row write the concrete consequence: which page, which H1/H2, which tool mode, or "Ads shortlist". Keep the existing table style.
4. Apply the consequences to `plan.md` (§6.1 / §6.2 / §6.3 wording) and to the matching `prompts/sonnet-*.md` files only if the affected phase is NOT yet merged (check `plan.md` §9 build log and merged PRs). If it is merged, add the item to `plan.md` §10 Backlog instead.
5. Keep a running "Ads shortlist" section: exact/phrase terms with volume ≥ 100, commercial intent, and a landing page that exists or is planned. Never include navigational login terms (marangatu, ekuatia bare).
6. When done: branch `docs/kwp-<date>`, commit, open a PR against `main`, merge it, reply with a 5-line summary of what changed. Ask nothing; if a term is ambiguous, note it in the doc under "Unclear" and move on.
