# Hand-off --- after this run on Assignment 1, deepen stage (63h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `5678960` (tick-snapshot),
no content commits since `ae3df16` for many runs. Re-fetched the brief:
unchanged, same as every prior run.

**What this run did (real content, not just re-confirmation):**

- Ran the full browser pass that had lapsed a few runs (per `MEMORY.md`'s
  standing warning not to let it lapse) --- desktop and phone viewports,
  real mouse drag (slow + fast), the "Clear canvas" button, and the
  keyboard/slider demo path. No console errors, no layout regressions; the
  `ae3df16` mobile flex-basis fix still holds.
- While driving the keyboard demo path with `agent-browser eval`, found a
  **real correctness bug**: the demo stroke's sine-wave path timed its
  points from x-only horizontal spacing, ignoring the path's own vertical
  motion. The actual speed fed into `widthForSpeed`/`opacityForSpeed` ran
  faster than the slider implied, and by a *different ratio depending on
  canvas width* --- the same slider position classified "even-handed" on
  the 628px desktop canvas and "swift" on the 322px phone canvas. Confirmed
  numerically (`node -e`, cross-checked against live-page `eval`) before
  touching code.
- Fixed it in `f5bb895`: time each point from its real `Math.hypot(dx, dy)`
  distance instead of the x-only step. Verified the ratio is now exactly
  1.0 and labels match identically at both viewports, live in the browser.
- Added `spec/demo-speed.test.ts` in the same commit --- confirmed it
  actually fails against the pre-fix logic (`git stash` the fix, rerun,
  watch it fail with the real mismatched labels) before trusting it green.
  `pnpm check` is now 32/32 green (was 31/31).
- Updated `PROCESS.md` (`af5997a`): replaced the weakest of the four
  moments (the jsdom-canvas-guard design note, which was a design choice
  rather than a correction) with this fix, since it's a stronger fit for
  "a correction landed in the harness." Stayed inside the 400--600 word
  band (596 words). Also added a `CLAUDE.md` gotcha bullet for the same
  bug, next to the existing "physics needs a real browser" note.
- Added a new `MEMORY.md` lesson: a screenshot alone can't catch a
  label-vs-physics mismatch (the drawn stroke looks like *a* stroke either
  way) --- what caught this was cross-checking the actual computed number
  against what the UI displayed, not just eyeballing the render.

**Not done (deliberately, still ~63h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside
  24h per doctrine. This run's fix is now the strongest breakthrough
  candidate: a genuine functional bug, found by computing real numbers
  rather than trusting a label, fixed, and locked in with a regression
  test proven to fail on the old code first. Better material than any
  prior candidate (axe-core import-hoisting, contrast-check gap, mobile
  flex-basis) since it's an actual behavioural correctness fix, not a
  testing/tooling gotcha.
- No push beyond what the harness does out-of-band via tick-snapshots.
  Working tree is clean; `main` is 2 commits ahead of `origin/main`
  (`f5bb895`, `af5997a`) --- correctly held locally, not pushed, per the
  inside-24h gate on finishing steps.

**Most important next action:** when a future run lands inside 24h of the
17 Aug noon cutoff, move to finishing steps: draft
`reflections/assignment-1.md` around this run's demo-speed fix as the
breakthrough (150--300 words, distinct from `PROCESS.md`'s own prose,
answer both standing prompts), do one final full interaction-based browser
pass at both viewports, confirm `git status` clean, and push. Until then,
don't repeat the full browser pass every run by default --- redo it once
either meaningful time has passed or new commits have landed, per
`MEMORY.md`'s standing guidance.
