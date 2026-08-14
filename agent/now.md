# Hand-off --- after this run on Assignment 1, deepen stage (69h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `280d34e` (tick-snapshot).
No content commits since `ae3df16` (run 6's mobile flex-basis fix, still
the most recent content commit) --- unchanged from the previous hand-off.
Re-fetched the brief/spec: still the same brief as every prior run (WebFetch
returned a summary rather than raw bytes this time, but nothing in it
contradicts any prior run's byte-for-byte confirmation).

**This run deliberately did NOT repeat the full interaction browser pass.**
The previous run did one independently (not just trusting run 10's memory)
only ~7 hours before this run started, and zero commits landed in between
--- re-running it now would be exactly the "manufacture scope against a
satisfied brief" pattern my own memory warns against. Instead this run:

- Ran `pnpm check`: still 31/31 green (typecheck, build, oxlint, stylelint,
  vitest all pass) --- confirms no silent drift since the last full pass.
- Re-read `index.html` end to end against the brief's rubric language
  ("one strong idea with a point of view," "pointed, surprising answer,"
  narrow disciplined scope like the exemplars). The single-page yīhuà
  explainer holds up on a fresh read: one interaction (drag-to-draw, speed
  as the only instrument), a practical/metaphysical two-level explanation
  tied directly to Shitao's own treatise, and a closing prompt ("draw a
  circle, then your name") that makes the idea concrete rather than just
  asserted. Nothing here reads as filler or scope creep.
- Confirmed no convenor-identity commits (`Ben Swift` /
  `COMP4020 teaching team`) have landed since the last check --- all commits
  since the last review are still `Shitao` tick-snapshots, so the standing
  "re-read reflections/README.md and CLAUDE.md after a convenor commit"
  check doesn't apply this run.

**Not done (deliberately, still ~69h out, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside 24h
  per doctrine. Breakthrough candidates unchanged: the axe-core ESM-import-
  hoisting fix (`a2b4e8c`/`1c48777`), the contrast-check gap closure
  (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix (`ae3df16`).
- `PROCESS.md` unchanged: 598/600 words, four moments. A future run adding
  a fifth moment must trim existing prose first or the 400--600-word
  constraint breaks.
- No fresh browser pass this run (see above) --- last one was independently
  done and confirmed working two runs ago now.
- No push beyond what the harness does out-of-band via tick-snapshots.

**Most important next action:** the artefact is stable and content-complete;
this run added a content-level re-read (not just technical checks) and found
nothing to change. A future run should only redo the full browser pass once
either meaningful time has passed since this run's `pnpm check` pass or any
commits have landed --- not by default every run. When a future run lands
inside 24h of the 17 Aug noon cutoff, move to the finishing steps: draft
`reflections/assignment-1.md` (pick one breakthrough candidate above, mind
the 150--300 word count, keep it distinct from `PROCESS.md`'s own prose), do
one final full interaction-based browser pass at both viewports, confirm
`git status` clean, and push.
