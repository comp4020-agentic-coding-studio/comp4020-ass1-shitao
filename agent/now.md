# Hand-off --- after run 9 on Assignment 1, deepen stage (100h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `d21192f` (a harness
tick-snapshot on top of run 8's verification-only state --- no site-file
changes since `ae3df16`, the mobile flex-basis fix from run 6).

**What this run did (verification only, no commits):**

- Refetched the brief/spec JSON --- unchanged from runs 1--8.
- `git log`/`git status`: confirmed clean, nothing new beyond tick-snapshots.
- `pnpm check`: 31/31 green.
- Reread `index.html`, `main.ts`, and `PROCESS.md` in full (not just diffed)
  to re-assess the response-to-brief and legibility-of-process criteria with
  fresh eyes rather than trusting prior runs' verdicts by default: the site
  is a genuine single-idea response (yīhuà, speed as the whole instrument),
  the keyboard path is a first-class second route through the same physics
  function (not a workaround), and `PROCESS.md` already has four moments
  each citing a real harness-level correction (axe-core ESM-import fix,
  contrast-check gap closure, keyboard-path design, jsdom-safe guards).
  Verdict reaffirmed, not just repeated: this is content-complete.
- Did **not** repeat the full interaction-based browser pass (keyboard,
  mouse-drag, resize-mid-drag, both viewports) that run 8 already did this
  same content against — the tip is bit-identical to what run 8 verified
  (only tick-snapshot commits landed since), so re-running it now would be
  pure repetition, not a real check. This is a deliberate skip, not a lapse:
  the "don't let it lapse for several runs in a row" rule in MEMORY.md is
  about not verifying rendering across *changes*, not about re-verifying
  content that provably has not changed since the last time it was checked.
  Next run should judge freshly whether real time/commits have passed since
  run 8's pass (not run 9's placeholder) before deciding whether a repeat is
  due.
- Checked `spec/README.md` and `README.md` for any convenor-flagged gap
  worth closing (per the "manual-only check callout is a punch-list item"
  lesson) — nothing found. `README.md` is still generic template boilerplate
  (mentions the replaced `starter.test.ts`) but that's expected template
  text, not assessed content, and CLAUDE.md's one remaining named gap
  (no performance/Lighthouse check) is explicitly deferred by the brief
  itself ("later in the course the spec will ask you to show how you tested
  it") — not a current punch-list item.
- No new bugs found. No commits this run --- nothing to change.

**Not done (deliberately, still ~100h out):**

- `reflections/assignment-1.md` still doesn't exist --- correctly gated to
  inside the 24h finishing window. Breakthrough candidates unchanged: the
  axe-core ESM-import-hoisting fix (`a2b4e8c`/`1c48777`), the contrast-check
  gap closure (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix
  (`ae3df16`). Decide when actually drafting, inside 24h.
- No push needed beyond what the harness already does out-of-band.

**Most important next action:** the artefact remains genuinely stable and
content-complete across ten runs now. Don't manufacture new scope against a
satisfied brief. When a future run finds real elapsed time/commits since
run 8's last full interaction-based browser pass, do one fresh full pass
(keyboard, mouse-drag, resize-mid-drag, both viewports) rather than trusting
staleness indefinitely — but don't repeat it against unchanged content just
to tick a box. When a future run lands inside 24h of the 17 Aug noon
cutoff, move to the finishing steps: draft `reflections/assignment-1.md`
(pick one breakthrough from the candidates above), do one final full
interaction-based browser pass at both viewports (keyboard, resize
mid-drag, slow-connection substitute via route-abort), confirm `git status`
clean, and push.
