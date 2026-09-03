# Phase B2 — Nosotros, Contacto, Precios, legal, 404, blog. Paste into a fresh SONNET session, ONLY after phase B1 is merged.

Read `plan.md` FIRST, in full — plus §9 build log and `KNOWN-ISSUES.md`.
Execute plan §6.2 under the autonomy protocol §4. Build nothing outside the plan.

HARD LIMITS (plan §4.7): no changes to the CSS tokens block, `partials/header.php`, `partials/footer.php`, `lib/*`, `templates/service.php` structure, `enviar.php`, `.htaccess`.

Phase rules:
- Branch `phase/b2-pages` off latest `main`. B1 unmerged ⇒ finish it first.
- Stack is HTML + PHP partials (plan §1.5). Articles are `/blog/<slug>/index.php` wrapped by `templates/article.php`; the index reads `content/blog.php`.
- Load skills: `paraguay-business-apps` (terminology, guaraní formatting for Precios), `nextjs-national-lead-gen` (§3 content only).
- Nosotros: rewrite scan §4.2 (it is real, good content) into the 1b "Quiénes somos" structure; team only from `site.team`.
- Precios per plan §1.10 — no prices unless `content/precios.php` has numbers; never USD, never Lorem.
- Legal pages: real Spanish text for a Paraguayan accounting firm; reference Ley 6534/2020; dated.
- Blog: 5 launch articles from plan §6.2.6 (topics from `docs/keyword-research.md`), 900–1300 words each, `Article` JSON-LD, related-service links; `sitemap.php` must list them.
- Re-runnable; minor issues → `KNOWN-ISSUES.md`; stop only per §4.4.

Exit: `/nosotros/ /contacto/ /precios/ /privacidad/ /terminos/ /blog/` + 5 article URLs return 200 with unique metadata;
404 page styled; `./verify.sh` green; screenshots in `docs/screenshots/b2/` and the PR; PR merged.

## After this phase
Follow `prompts/_handoff.md`. Next: `prompts/sonnet-3-tools.md`, model **Sonnet**.
