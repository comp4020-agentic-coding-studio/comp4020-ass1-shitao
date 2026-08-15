# Hand-off --- after this run on Assignment 1, deepen stage (39h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `b23c7d1` (tick-snapshot),
up to date with `origin/main`. Re-fetched the brief: unchanged.

**What this run did (live-browser verification pass, per the standing
"don't let it lapse for several runs" rule --- it had been two runs since
the last one):**

- `pnpm check`: 34/34 green, matching every prior run --- no drift.
- Served `dist/` locally, opened it in `agent-browser` (needed
  `--args "--no-sandbox"` *before* the subcommand, per `MEMORY.md` --- this
  is now confirmed a third time, treat it as settled).
- Desktop (1920×1080): screenshot clean, matches prior passes.
- Real interaction pass on the canvas, using in-viewport coordinates (box
  was fully on-screen this time, checked before trusting it): a slow drag
  classified "measured and dark", a fast drag "swift and dry", and a
  deliberate dwell (near-zero movement across several pointermoves spanning
  >120ms of real wall time) correctly produced "saturated and pooling" ---
  this is the live confirmation that the `c8d24fd` pooled-status fix from a
  few runs ago actually fires end to end, not just in the jsdom spec test.
- Keyboard path: focused the range input via `eval` (`agent-browser find
  ... focus` isn't a valid action --- only click/fill/check/hover/text ---
  so `eval "...focus()"` is the way to drive focus manually), pressed
  `ArrowRight` a few times, got a sensible "even-handed" classification at
  slider value 53. Keyboard-operable path still works.
- Mobile (390×844): screenshotted top to bottom in three scroll steps.
  Nothing overflows, the slider/button row still has no dead gap (the
  `flex-basis: auto` mobile reset from run 6's fix is still in place and
  still correct), and the page ends cleanly. No console errors
  (`agent-browser errors`/`console` both empty) at any point in the pass.
- Did not re-test the mid-drag resize case this run (viewport resize while
  pointer is down) --- `resizeCanvas`'s raw-pixel-copy behaviour hasn't
  changed and was already verified acceptable in an earlier run; re-running
  it with nothing changed would be repetition, not verification.
- Shut down the local server afterward.

**Net result: a fourth clean confirmation that the site is content-complete.**
No code changes this run --- nothing to commit, nothing found wrong across
either static review (prior run) or this live pass.

**Not done (deliberately, still 39h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside 24h.
  The demo-speed fix (`f5bb895`) remains the strongest breakthrough
  candidate for that entry; the pooled-status fix (`c8d24fd`) is good
  supporting colour, now doubly verified live this run.

**Most important next action:** when a future run lands inside 24h of the
17 Aug noon cutoff, move to finishing steps: draft
`reflections/assignment-1.md` around the demo-speed fix as the
breakthrough (150--300 words, answer both standing prompts), do one final
interaction-based browser pass at both viewports if it's been a while
again, confirm `git status` clean, and push. Until then, don't manufacture
a fifth round of code-review scope against a brief that's genuinely met ---
the one standing obligation is the periodic live-browser re-check, and
this run just did it.
