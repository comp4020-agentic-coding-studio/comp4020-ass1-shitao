# Hand-off --- after run 7 on Assignment 1, deepen stage (117h → ~116h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `82795c0` matching
`origin/main` (a harness tick-snapshot commit that had already pushed run
6's `ae3df16` mobile fix out-of-band --- expected, not a doctrine issue,
per `MEMORY.md`'s out-of-band-commits note). Run 6's hand-off said to keep
doing fresh screenshot passes and not let them lapse, but flagged nothing
outstanding otherwise.

**What this run did (verification only, no commits):**

- Refetched the brief/spec JSON --- unchanged from runs 1--6.
- `git log`/`git status`: confirmed the above, nothing surprising.
- Ran `pnpm check` (31/31 green), `pnpm check:evidence` (fails only on the
  still-gated missing `reflections/assignment-1.md`, exactly as expected
  this far from cutoff), and `pnpm dlx linkinator ./dist --silent` against
  a fresh build (3 links, all resolve) --- the two checks CLAUDE.md notes
  as CI-only/local-only that hadn't been explicitly re-run in a few runs.
- Rather than redoing run 6's full interaction-based browser pass
  immediately (low marginal value 6h after it was last done), did a
  lighter but still real verification: served `dist/` locally, opened it
  in `agent-browser` at the phone viewport (390×844), and screenshotted
  the controls area specifically --- confirmed run 6's flex-basis fix
  still holds (slider → hint → Clear canvas → status all tightly packed,
  no dead gap) and `agent-browser console`/`errors` came back empty. This
  was checking a memory claim before trusting it forward, not a fresh
  discovery pass.
- Hit the documented `cd`-inside-a-backgrounded-command gotcha again
  (`(cd dist && python3 -m http.server ... &)` left the shell's cwd
  sitting in `dist/`) --- caught it the same way `MEMORY.md` says to
  (noticing the path looked wrong), `cd`ed back explicitly, confirmed
  `git status` clean from the repo root afterward. Didn't add a new memory
  entry since the existing one already covers this exactly and worked as
  intended; nothing new to generalise.
- No new bugs found. No commits this run --- there was nothing to change.

**Not done (deliberately, still ~116h out):**

- `reflections/assignment-1.md` still doesn't exist --- correctly gated to
  inside the 24h finishing window. Breakthrough candidates still on the
  table from run 6's hand-off: the axe-core ESM-import-hoisting fix
  (`a2b4e8c`/`1c48777`), the contrast-check gap closure
  (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix
  (`ae3df16`). Decide when actually drafting, inside 24h.
- No push needed beyond what the harness already did out-of-band; nothing
  local and uncommitted to hold back on anyway this run.

**Most important next action:** the artefact is genuinely stable ---
checks green, evidence check behaving as expected, links clean, a live
phone-viewport pass just confirmed no regression. Don't manufacture new
scope against a satisfied brief. Keep doing the periodic real-browser
check (it doesn't need to be every single run, but shouldn't lapse for
several runs running either); this run's lighter spot-check counts as
that for this cycle. When a future run lands inside 24h of the 17 Aug noon
cutoff, move to the finishing steps: draft `reflections/assignment-1.md`
(pick one breakthrough from the candidates above), do one final full
interaction-based browser pass at both viewports (keyboard, resize
mid-drag, slow-connection substitute), confirm `git status` clean, and
push.
