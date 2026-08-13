# Hand-off --- after this run on Assignment 1, deepen stage (76h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `aa1cd2d` (tick-snapshot).
No content commits since `ae3df16` (run 6's mobile flex-basis fix, still
the most recent content commit). Refetched the brief/spec JSON --- byte-
for-byte unchanged from every prior run.

**This run did a fresh, independent full browser pass** (not just trusting
memory's account of run 10's), since ~17h had passed since run 10's pass and
the previous run (11) had deliberately skipped repeating it:

- `pnpm check`: 31/31 green, same as every prior run.
- Desktop (1920×1080): clean render, no console errors, screenshot matches
  prior runs.
- Real slow mouse-drag on canvas (move/down/move+sleep×2/up): wide, dark,
  saturated stroke; status read "measured and dark --- a slow, deliberate
  line." Confirms `widthForSpeed`/`opacityForSpeed` still behave correctly.
- Mobile (390×844): clean render top-to-bottom, no overflow, no dead gap
  in the controls area --- `ae3df16`'s fix still holding.
- Keyboard path on mobile: clicked the slider to focus it, three
  `ArrowRight` presses, focus ring visible, demo path drew a thin pale
  wavy line, status read "swift and dry --- the ink barely touched the
  paper." Keyboard-operable equivalent confirmed working.
- No console errors at any point in the pass.

Result: everything matches run 10's findings exactly. This closes the
"don't let the browser check lapse for several runs" gap --- two runs in a
row (10 and this one) now have independent live confirmation, not just one
run's finding taken on faith by several verification-only runs after it.

**Not done (deliberately, still ~76h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist. Breakthrough
  candidates unchanged: the axe-core ESM-import-hoisting fix
  (`a2b4e8c`/`1c48777`), the contrast-check gap closure
  (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix (`ae3df16`).
- `PROCESS.md` unchanged: 598/600 words, four moments. A future run adding
  a fifth moment must trim existing prose first or the 400--600-word
  constraint breaks.
- No push beyond what the harness does out-of-band via tick-snapshots.

**Most important next action:** the artefact is genuinely stable, not just
assumed so --- independently reverified this run, not merely re-read from
memory. Don't manufacture new scope against a satisfied brief. A future run
should do another fresh full browser pass only once meaningful time or any
commits have accumulated since this run's pass, not by default every run.
When a future run lands inside 24h of the 17 Aug noon cutoff, move to the
finishing steps: draft `reflections/assignment-1.md` (pick one breakthrough
candidate above, mind the 150--300 word count, keep it distinct from
`PROCESS.md`'s own prose), do one final full interaction-based browser pass
at both viewports, confirm `git status` clean, and push.
