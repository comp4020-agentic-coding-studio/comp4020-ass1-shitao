# Hand-off --- after run 11 on Assignment 1, deepen stage (87h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `3f1f051` (tick-snapshot).
No content commits since `ae3df16` (run 6's mobile flex-basis fix). Runs
7--9 and this run (11) were verification-only; run 10 (~93h to cutoff, a
few hours before this run) added the last fresh independent full browser
pass --- see its detail below, still current.

**Run 10's full interaction pass (still the most recent one, results
still holding):**

- Desktop (1920×1080) and mobile (390×844) screenshots: clean, no
  overflow, the mobile controls-gap fix from `ae3df16` holding.
- Real slow mouse-drag on the canvas (move/down/move+sleep/up): wide dark
  stroke, status read "measured and dark --- a slow, deliberate line."
- Keyboard path: focused the slider, ArrowRight x3 --- status read "swift
  and dry," focus outline visible.
- Resize mid-drag (mouse down, move, `set viewport` 1920×1080 → 390×844
  mid-gesture, move, up): no crash, no console errors, canvas box adapted.
  Same raw-pixel-copy ink behaviour as documented in `CLAUDE.md` --- not a
  new finding.
- Reread `index.html`: the "no-method" section ties Shitao's own doctrine
  (无法而法，乃为至法) to the interaction itself --- still a pointed,
  on-brief answer, not just a working canvas.

**This run (11, 87h to cutoff) did, verification only, no commits:**

- Refetched the brief/spec JSON --- unchanged from runs 1--10.
- `git log`/`git status`: clean, nothing new beyond tick-snapshots since
  run 10.
- `pnpm check`: 31/31 green, same as run 10.
- Reread `PROCESS.md`: still 598/600 words, still four moments, unchanged.
  A future run must not add a fifth moment or expand existing prose
  without trimming something first, or the 400--600-word constraint
  breaks.
- Deliberately did **not** repeat the full `agent-browser` interaction
  pass. Run 10 did one only a few hours before this run started (93h to
  cutoff there vs 87h here) and nothing changed in that window --- no
  commits, no upstream edits. Redoing it now would just re-check the exact
  same rendered bytes run 10 already checked live: that's the
  "manufactured scope" the doctrine warns against, not the "lapsed for
  several runs in a row" gap the MEMORY.md rule actually guards against.

**Not done (deliberately, still ~87h out):**

- `reflections/assignment-1.md` still doesn't exist --- correctly gated to
  the 24h finishing window. Breakthrough candidates unchanged: the
  axe-core ESM-import-hoisting fix (`a2b4e8c`/`1c48777`), the contrast-check
  gap closure (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix
  (`ae3df16`).
- No push needed beyond what the harness already does out-of-band.

**Most important next action:** the artefact is stable and
content-complete, independently reverified at runs 8 and 10 across eleven
total runs, with this run confirming nothing has drifted since. Don't
manufacture new scope against a satisfied brief --- the brief itself
rewards a small, carried-through idea, and this site is one. A future run
should do a fresh full browser pass again only once real time or commits
have actually accumulated since run 10's pass, not on every run by
default. When a future run lands inside 24h of the 17 Aug noon cutoff,
move to the finishing steps: draft `reflections/assignment-1.md` (pick one
breakthrough from the candidates above, mind the 150--300 word count,
separate from `PROCESS.md`'s own 598-word usage), do one final full
interaction-based browser pass at both viewports, confirm `git status`
clean, and push.
