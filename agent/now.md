# Hand-off --- after this run on Assignment 1, deepen stage (45h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `6cdd4b4` (tick-snapshot),
up to date with `origin/main` --- the two commits `now.md` previously
described as "held locally" (`c8d24fd`, `75b2b3c`) had already reached
origin via the harness's own tick-snapshot push, as expected (per
`MEMORY.md`'s "out-of-band commits are normal" note). Re-fetched the brief:
unchanged from what's already summarised in `MEMORY.md`.

**What this run did (a review pass, deliberately not a rebuild):**

- Ran `pnpm check`: 34/34 green, matching the previous run's count exactly
  --- no drift.
- Ran `pnpm check:evidence`: fails only on the still-gated missing
  `reflections/assignment-1.md`, which is correct at 45h out (reflection
  is a finishing step, gated to inside 24h).
- Confirmed `PROCESS.md` is 596/600 words --- inside the 400--600 band but
  with only 4 words of headroom; a future run editing it needs to watch
  that ceiling, not just the floor.
- Read `main.ts`, `index.html`, `styles.css` end to end looking for the
  same *shape* of bug the last two runs found (a dead branch, a
  label/physics mismatch, a flex-basis trap under a media query). Grepped
  every call site of `finishStroke`/`classify`/`pooled`/`strokeDidPool`
  (all live now, post the pooled-status fix), re-checked the demo-slider's
  distance-based timing math by hand, and re-checked the mobile media
  query's `.control { flex-basis: auto; }` reset (still present, still
  correct). Found nothing wrong. This is a real negative result, not a
  skipped check --- worth recording so a future run doesn't re-walk the
  exact same static-review ground from scratch without a new reason to.
- Did not re-open a live browser this run: the previous run's live
  interaction pass (both viewports, in-viewport coordinates, checked
  `window.innerWidth/innerHeight` first) was only hours earlier and
  nothing in the code has changed since, so re-running it now would be
  pure repetition rather than verification of anything new. Per
  `MEMORY.md`'s standing rule, don't let this lapse for *several runs in a
  row* --- if a future run at, say, 30h+ still hasn't re-opened a real
  browser since this morning's pass, that's the moment to do it again,
  not skip it a second time.

**Not done (deliberately, still 45h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside
  24h. The demo-speed fix (`f5bb895`) remains the strongest breakthrough
  candidate; the pooled-status fix (`c8d24fd`) is good supporting colour
  but doesn't need its own reflection mention given the 150--300 word
  budget.
- No new commits this run --- nothing changed, so there was nothing to
  commit. `git status` clean, `main` even with `origin/main`.

**Most important next action:** when a future run lands inside 24h of the
17 Aug noon cutoff, move to finishing steps: draft
`reflections/assignment-1.md` around the demo-speed fix as the
breakthrough (150--300 words, answer both standing prompts), do one final
full interaction-based browser pass at both viewports (in-viewport
coordinates, not raw `get box` numbers), confirm `git status` clean, and
push. Until then: the site is genuinely content-complete after two rounds
of real bug-finding on top of an already-solid build, confirmed again by
this run's full static-review pass turning up nothing new. Don't
manufacture a fourth round of scope without a concrete lead --- but if a
future run has spare time before 24h *and* it's been several runs since
the last live-browser pass, that periodic re-verification is the one
standing obligation left, not another code-review sweep.
