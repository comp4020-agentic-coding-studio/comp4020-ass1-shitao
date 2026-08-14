# Hand-off --- after this run on Assignment 1, deepen stage (52h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `4fad2b9` (tick-snapshot),
`main.ts`/`af5997a` demo-speed fix from the previous run already pushed
out-of-band via tick-snapshot (normal, per `MEMORY.md`). Re-fetched the
brief: unchanged. Ran `pnpm check`: 32/32 green.

**What this run did (a second real bug, found by code review not just
browser-driving):**

- Reviewed `main.ts` end to end rather than just re-running checks. Grepped
  every call site of `finishStroke`/`classify`'s `pooled` parameter and
  found it hard-coded to `false` everywhere (`pointerup`, `pointercancel`,
  the keyboard demo) --- the "saturated and pooling — the brush lingered"
  status message was dead code, even though `poolAt()` visibly draws the
  ink pool on canvas when a drag dwells in place past 120ms. The interaction
  half worked; the status text describing it never could.
- First live-browser attempts to reproduce this gave a *false negative* ---
  zero events reached the canvas at all, no console error either. Chased it
  down (not blamed on "flaky agent-browser") and found the real cause:
  `agent-browser get box` returns full-page coordinates, not coordinates
  clipped to `window.innerHeight`, so a point that looks inside the
  reported canvas box can be below the actual visible viewport. Confirmed
  via `document.elementFromPoint` returning `null` at that point. New
  `MEMORY.md` tooling-gotcha entry on this, plus a "grep call sites before
  driving the UI" working-habits entry, since the static-analysis finding
  was reliable and the live-browser attempt initially wasn't (for reasons
  unrelated to the actual bug).
- Fixed in `c8d24fd`: track `strokeDidPool` across the pointer lifecycle
  (set true wherever `poolAt` actually fires, reset on `pointerdown`) and
  pass that into `finishStroke` instead of a constant. Also guarded
  `canvas.setPointerCapture?.()` since jsdom doesn't implement it, so a new
  regression test could dispatch real `PointerEvent`s without crashing.
- `spec/pooling.test.ts` dispatches synthetic pointer events with
  controlled `timeStamp`s; watched it fail against the pre-fix code first
  (`git stash push -- main.ts`, ran the test, saw the real failure, popped
  the stash) before trusting it green. `pnpm check` is now 34/34 (was
  32/32).
- Verified live in a real Chromium session (`agent-browser`, no-sandbox
  args) at both marking viewports with in-viewport coordinates this time:
  status correctly reads "Stroke N: saturated and pooling — the brush
  lingered" at both 1920×1080 and 390×844, no console errors, screenshots
  looked right (dark pool visible on the canvas).
- Documented the fix and the viewport-clipping false-negative in `CLAUDE.md`
  (`75b2b3c`), in the per-file gotcha list, following the file's existing
  pattern. Deliberately did **not** touch `PROCESS.md` --- it's already at
  its 4-moment cap (per the spec's "three or four, not more"), and the four
  moments already there (keyboard-first-class, demo-speed fix, axe-core
  wiring, contrast-check wiring) are all strong harness-level corrections.
  This fix stands on its own via commit history + the CLAUDE.md note, which
  is fine: not every good fix needs to be a featured "moment."

**Not done (deliberately, still 52h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside 24h
  per doctrine. The demo-speed fix (from the previous run) remains the
  strongest breakthrough candidate for the reflection; this run's
  pooled-status fix is good supporting material for `PROCESS.md`-adjacent
  colour but doesn't need its own reflection mention given the 150--300
  word budget.
- No push beyond what the harness does out-of-band via tick-snapshots.
  Working tree is clean; `main` is 2 commits ahead of `origin/main`
  (`c8d24fd`, `75b2b3c`) --- correctly held locally, per the inside-24h gate
  on finishing steps.

**Most important next action:** when a future run lands inside 24h of the
17 Aug noon cutoff, move to finishing steps: draft
`reflections/assignment-1.md` around the demo-speed fix (`f5bb895`) as the
breakthrough (150--300 words, distinct from `PROCESS.md`'s own prose, answer
both standing prompts), do one final full interaction-based browser pass at
both viewports (using in-viewport coordinates --- check
`window.innerWidth`/`innerHeight` first, don't trust `get box` numbers
blindly per the new `MEMORY.md` gotcha), confirm `git status` clean, and
push. Until then, the site is genuinely content-complete after two rounds
of real bug-finding (demo-speed, pooled-status) on top of an already-solid
build --- don't manufacture a third round of scope without a concrete lead;
a targeted code-review pass (grep every flag's call sites, re-check every
`if`/`else` branch is reachable) is a cheaper next move than another full
browser sweep if a future run has spare time before 24h.
