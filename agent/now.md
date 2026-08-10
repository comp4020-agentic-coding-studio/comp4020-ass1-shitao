# Hand-off --- after run 3 on Assignment 1, deepen stage (148h → ~146h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo had a complete, deepened build from
runs 1--2 (the 一畫/yīhuà ink-brush explainer), `pnpm check` 20/20 green,
resize-mid-drag/keyboard/slow-connection/HD-reread all verified. Run 2's
hand-off had exhausted its deepen list and explicitly said: look for a new
angle, and specifically watch for a genuine harness-level correction to
give `PROCESS.md` a third moment (its first two, from run 1, were real but
not harness-level). Tip was `2a8b7e1` locally; `origin/main` had since
advanced to `3d89153` via the harness's own tick-snapshot push (not a push
I made --- expected per the "out-of-band commits are normal" and
"publishing is the harness's job" notes in `MEMORY.md`).

**What this run did:**

- Fetched the current brief (unchanged in substance from what run 1--2
  worked from) and reread it against the site with fresh eyes --- still
  holds: one idea, one mechanic, personal point of view.
- Re-ran `pnpm check` cold: still 20/20 green, confirmed nothing regressed.
- Found the harness-level correction the last hand-off asked for:
  **accessibility checking was a manual, repeat-by-hand `agent-browser`
  step with no automated backstop.** Added `spec/axe.test.ts`, which runs
  axe-core's structural rules (color-contrast disabled --- jsdom has no
  paint engine to resolve it reliably) against the built `dist/index.html`
  inside `pnpm check`, so a real accessibility regression now fails the
  same roster as a broken build
  ([`a2b4e8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/a2b4e8c)).
- Hit and diagnosed a real bug getting there: axe-core reads `window`/
  `document` from `globalThis` at *import* time, and ESM hoists static
  imports ahead of the rest of the module, so a static `import axe from
  "axe-core"` evaluated before this file's own jsdom-globals assignment ever
  ran. Confirmed the mechanism at a bare Node REPL (dynamic import after
  setting globals works, static import before doesn't) before fixing it ---
  didn't just guess-and-check. Fixed by deferring to a dynamic
  `await import("axe-core")` inside the test. Documented as a tooling
  gotcha in both this repo's `CLAUDE.md` and the global `MEMORY.md`, since
  it'll bite again anywhere axe-core meets a hand-built jsdom instance.
- Verified the new test isn't a rubber stamp: temporarily stripped the
  canvas's `aria-label` from the built HTML, confirmed the test failed with
  a legible `role-img-alt` message, restored `dist/`, reran `pnpm check`
  green before committing.
- Wrote this up as `PROCESS.md`'s third moment (591 words total, within the
  400--600 band) and committed
  ([`1c48777`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/1c48777)).
  This is the genuine harness-level moment the last two hand-offs were
  waiting for --- a check wired up, not a retry.

**Not done (deliberately, still 146h out, nowhere near the 24h gate):**

- `reflections/assignment-1.md` still doesn't exist. `pnpm check:evidence`
  correctly still fails on this. Even though the moment that earns the
  reflection's breakthrough now exists, doctrine gates *writing* the
  reflection to the "Finishing steps (inside 24h)" list, not to "once a
  good moment exists" --- so don't draft it yet. Note the moment for when
  the time comes: the axe-core/ESM-import-hoisting fix (commits
  `a2b4e8c`, `1c48777`).
- No push. Tip is now `1c48777`, committed locally only, per doctrine's
  inside-24h gate. (Same caveat as before: the harness's tick-snapshot
  commit will likely push this to `origin/main` anyway on its own
  schedule --- that's expected, not a violation.)
- Did not reopen `agent-browser` this run --- no rendering-affecting code
  changed (only test/process files), so a repeat visual pass wasn't
  warranted this time. Don't let this stretch past a run or two without a
  real browser check per the standing lesson in `MEMORY.md` (about content
  changes) --- but note this run's exemption was for a genuinely
  non-visual change, not routine skipping.

**Most important next action:** still 146h out --- there's no urgency, but
there also isn't an obvious next deepening target now that the last two
hand-offs' punch lists (resize, slow-connection, HD-reread, harness
correction) are all done. Next run should reread the explainer prose itself
for whether it's saying something surprising enough for the HD "response to
brief" band (not just re-verify mechanics again), and keep an eye out for
either (a) a second harness-level correction --- `PROCESS.md` can hold
3--4 moments, so there's room for one more --- or (b) accept 3 moments as
sufficient and start turning attention toward whether the reflection's
eventual breakthrough needs anything more than the axe-core story. Do not
draft `reflections/assignment-1.md` or push until inside the 24h finishing
window.
