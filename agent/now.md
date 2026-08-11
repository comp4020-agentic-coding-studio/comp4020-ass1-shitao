# Hand-off --- after run 6 on Assignment 1, deepen stage (124h → ~123h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo had a complete, deepened build from
runs 1--5 (the 一畫/yīhuà ink-brush explainer), `PROCESS.md` at its cap of
four moments (598 words), `pnpm check` 31/31 green, keyboard/resize-mid-
drag/slow-connection all previously verified live in a browser. Tip was
`2c36a95`/`4ce29f7` (harness tick-snapshot), matching `origin/main` ---
expected. Run 5's hand-off said the obvious punch list was exhausted and
flagged only "keep the periodic real-browser pass going" as ongoing work.

**What this run did:**

- Refetched the brief/spec JSON --- unchanged from runs 1--5.
- Took the hand-off's own advice: did a fresh, ordinary screenshot pass
  (not a targeted interaction test) at both marking viewports against a
  clean `pnpm build` served locally, since the last several runs'
  "periodic pass" had all been narrowly scoped (network-abort, resize-
  mid-drag) rather than a plain look at the rendered page.
- Desktop (1920×1080) was clean. Phone (390×844) had a real, previously
  unnoticed bug: a ~150px dead gap between the speed-slider block and the
  "Clear canvas" button. Root cause: `.control`'s `flex: 1 1 16rem`
  (sized for the desktop row layout) survived into the mobile media
  query's `flex-direction: column` override, and a flex-basis always
  sizes along the *current* main axis --- so "16rem" became a 256px
  minimum height around ~100px of real content. Fixed with `flex-basis:
  auto` inside the same media query
  ([`ae3df16`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/ae3df16)).
  Verified via `getBoundingClientRect()` before/after (256px → 102px) and
  a re-screenshot; confirmed desktop untouched (still a clean row) and
  the real pointer-drag interaction still works post-fix
  (`agent-browser mouse down/move/up` on the canvas still produced a
  status update). `pnpm check` still 31/31 after.
- This is a routine bug-fix, not a harness-level correction (no new check
  added --- CSS layout at a real viewport still isn't something any
  automated check here can see), so it does **not** go into `PROCESS.md`,
  which stays at its four-moment cap per the spec's "three or four, not
  more."
- Updated `MEMORY.md`'s existing "content-complete was true of the brief,
  not every viewport" note with this as a third confirmation, and folded
  in the specific CSS trap (flex-basis surviving a flex-direction flip in
  a media query) as a durable, generalisable gotcha. (Briefly created a
  separate per-topic memory file with a `[[wikilink]]`, then reverted ---
  that's not this project's established convention; doctrine names only
  `MEMORY.md` and `now.md` as self-authored memory here, so keep
  everything in those two.)
- No push. Tip is now `ae3df16`, committed locally only, per doctrine's
  inside-24h gate (123h is nowhere near it).

**Not done (deliberately, still ~123h out):**

- `reflections/assignment-1.md` still doesn't exist --- gated to inside
  the 24h finishing window. Breakthrough candidates on the table: the
  axe-core ESM-import-hoisting fix (`a2b4e8c`/`1c48777`), the contrast-
  check gap closure (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile
  flex-basis fix from this run (`ae3df16`) --- the last is a good
  breakthrough candidate too, since it's a concrete "found via actually
  looking, not via checks" story, even though it's not a `PROCESS.md`
  moment (harness-correction is the bar there, not here). Decide when
  actually drafting.

**Most important next action:** keep doing exactly what this run did ---
reread the brief fresh, take stock via `git log` (don't trust `now.md`
prose alone), and don't let a real screenshot pass at both viewports lapse
for several runs running, even when checks are green and nothing upstream
changed. This run is the third time that exact pattern (green checks, no
upstream changes, still a real bug) has paid off across this agent's
history. If a future run's screenshot pass turns up genuinely nothing for
several runs in a row, that's fine --- don't manufacture scope --- but
don't stop looking. Otherwise: hold the reflection and the push until
inside 24h of the 17 Aug noon cutoff.
