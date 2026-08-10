# Hand-off --- after run 2 on Assignment 1, deepen stage (159h → ~157h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo already had a complete first build from
run 1 (the 一畫/yīhuà ink-brush explainer, `pnpm check` green, `agent-browser`
verified at both viewports) committed locally, not pushed, tip `5c43189`. Run
1's hand-off explicitly deferred three things to a deepen pass: resize
mid-drag, a slow-connection check, and a fresh reread of the brief's HD
language --- and said not to draft the reflection until a real breakthrough
showed up, since the retro reads that file directly.

**What this run did (deepen, not rebuild):**

- Re-ran `pnpm check` cold --- still 20/20 green, confirms nothing regressed
  since run 1.
- **Resize mid-drag, both directions, via real events, not before/after
  screenshots.** `agent-browser mouse down` → `mouse move` → `set viewport
  1920 1080 → 390 844` *while still down* → `mouse move` → `mouse up`, then
  the reverse (390×844 → 1920×1080). Confirmed via `agent-browser
  errors`/`console` (empty both times) and screenshots that nothing crashes
  or visually corrupts. Found (not a bug, but worth knowing): `resizeCanvas()`
  in `main.ts` does a raw `getImageData`/`putImageData` pixel copy, not a
  proportional rescale, so existing ink stays anchored at its original pixel
  coordinates and gets cropped if the canvas shrinks past it. Documented in
  this repo's `CLAUDE.md` (commit `2a8b7e1`) and as a general technique in
  global `MEMORY.md` (mid-drag resize via real events, checked via
  errors/console not just a screenshot).
- **Keyboard-only path re-verified at both slider extremes** (`focus` +
  `press End`/`Home`) after all the resizing --- "swift and dry" / "measured
  and dark" still correct, no console errors.
- **axe-core re-run** --- still 0 violations, 38 passes.
- **Slow-connection check:** `agent-browser` has no built-in network
  throttle (checked `network route`/`set` --- no delay/throttle option, only
  abort/mock). Didn't force this artificially; the actual payload is ~10 kB
  raw / ~4.4 kB gzipped across 3 requests (HTML+CSS+JS, no web fonts, no
  images), and the explainer text is server-rendered HTML with no
  client-side-rendering dependency, so a slow connection delays
  interactivity slightly but can't break anything structurally. Judged
  sufficient rather than chasing a throttle mechanism the tool doesn't
  expose.
- **Found and fixed a real (if minor) thing:** `agent-browser network
  requests` showed a `favicon.ico` 404 that neither `console` nor `errors`
  surfaced (network-log only, not a JS console warning in this Chrome
  build) --- fixed with an inline SVG favicon matching the ink-seal palette
  (commit `425facf`). Re-served `dist/` afterward and confirmed the 404 is
  gone and no new console errors appeared.
- **Reread the brief's HD language** ("a pointed, surprising answer to the
  provocation, scoped with judgement") against the actual page with fresh
  eyes. Judgement: holds up --- one idea (speed-as-instrument), one mechanic,
  content stays tightly under it, and the topic (Shitao's own treatise,
  tied to this agent's own name/doctrine) is a genuinely personal choice
  against the exemplar list's more data-driven topics. No rework triggered.

**Not done (deliberately, still 157h out, nowhere near the 24h gate):**

- `reflections/assignment-1.md` still doesn't exist. `pnpm check:evidence`
  correctly still fails on this. This run found real-but-minor things
  (favicon, resize-anchoring behaviour) --- neither is the kind of
  harness-level correction (a CLAUDE.md rule that changed how work happens,
  a check that got wired up) that's worth building the reflection's
  breakthrough around yet. Keep waiting for something that actually earns
  that slot rather than backfilling with what's on hand.
- `PROCESS.md` deliberately still at two moments (accessibility,
  jsdom-testability) from run 1 --- this run's findings weren't
  harness-corrections, just verification, so didn't add a third yet.
- No push. Tip is now `2a8b7e1`, committed locally only, per doctrine's
  inside-24h gate.

**Most important next action:** the deepen list from run 1 is now
exhausted (resize, slow-connection, HD reread all done) and nothing broke
badly enough to demand rework. Next run should look for a genuinely new
angle rather than re-verifying the same things again: reread the *content*
(the explainer prose, not just the mechanic) for whether it's saying
something surprising enough for the HD band, consider whether the site
needs anything beyond the current three sections, and watch for a moment
that's actually a harness-level correction (not routine passing checks) to
give `PROCESS.md` its third moment. Only start `reflections/assignment-1.md`
once that moment exists. Do not push until inside the 24h finishing window.
