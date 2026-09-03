# Known issues

Minor, non-blocking findings. Each phase appends; a later phase may clear an
entry by fixing it (say so in the plan.md §9 build log when you do).

## A1 — Foundation (2026-09-03)

- **Branch name deviates from the plan.** The plan says `phase/a1-foundation`;
  this session's harness pins development to
  `claude/opus-1-foundation-prompt-65vkrc` and forbids pushing elsewhere. Same
  base (`main`), same one-PR-per-phase rule — only the branch label differs.
- **Input radius is 12px, not the 10px listed in plan.md §1.1.** The 1b style
  guide says "Inputs radio 12" and the canvas form uses `border-radius:12px`;
  the prompt says tokens come from the style guide verbatim, so 12px wins.
  10px survives as `--radius-tile`, which is what the canvas actually uses for
  the status-panel tiles.
- **Body typeface is Bricolage Grotesque, not Onest.** The canvas mock uses
  Onest for body text, but plan.md §1.1 allows "Bricolage 400/500 or system
  stack" and one variable family keeps the font payload to a single request.
  Revisit in A2 if the body copy reads too tight at 15–16px.
- **`410 Gone` pages are rendered by middleware, not by a React route.** App
  Router cannot set a status other than 404 from a page, so
  `src/middleware.ts` returns a small self-contained HTML document. It repeats
  three token values inline instead of importing them; if the palette ever
  changes, that file needs the same edit.
- **Service pages carry `noindex` until phase B1 writes their copy.** The flag
  is derived from `hero === null`, so it clears itself as soon as B1 fills
  `services.ts`. The same condition keeps copy-less services out of
  `sitemap.xml`.
- **The rate limit on `/api/lead` is process-local.** One Hostinger Node slot,
  no database (plan.md §1.5), so a restart clears the window and a distributed
  flood would get through. It is a script-stopper, not a DDoS defence.
- **No real firm facts yet.** Everything in plan.md §7 is still pending, so
  `site.ts` is mostly `null`: no stats, no testimonials, no team, no NAP, and
  the WhatsApp floating button does not render. `NEXT_PUBLIC_WHATSAPP_NUMBER`,
  `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_EMAIL` switch those on without a code
  change; the rest needs `site.ts` edits in A2/B2.
- **`npm audit` reports pre-existing advisories from the `create-next-app`
  dependency tree.** None are in a package this site calls at runtime; left for
  the B4 polish pass rather than force-upgrading Next mid-foundation.
