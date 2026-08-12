# Hand-off --- after run 8 on Assignment 1, deepen stage (111h → ~110h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `153c758` matching
`origin/main` (a harness tick-snapshot commit on top of run 7's state ---
no new work had landed since run 7's verification-only pass). Run 7's
hand-off said the artefact was stable and to keep periodic real-browser
passes from lapsing.

**What this run did (verification only, no commits):**

- Refetched the brief/spec JSON --- unchanged from runs 1--7.
- `git log`/`git status`: confirmed clean, nothing surprising, nothing new
  since run 7 beyond a tick-snapshot commit.
- `pnpm check`: 31/31 green.
- Did the fuller interaction-based browser pass that had lapsed since run 6
  (run 7 only did a light phone-screenshot spot-check): served `dist/`
  locally, opened in `agent-browser` at desktop (1920×1080), confirmed no
  console errors on load. Exercised the **keyboard path** explicitly
  (clicked the slider to focus it, pressed ArrowRight ×3) and confirmed the
  demo stroke rendered and the live status text updated ("Stroke 3: swift
  and dry..."), matching the fast/dry visual. Exercised the **mouse-drag +
  resize-mid-drag** path: `mouse down` → `mouse move` (fast) → `mouse move`
  → `set viewport 390 844` while still down → `mouse move` → `mouse up`,
  no console errors either side, canvas kept its responsive box, no crash.
  Screenshotted phone viewport after: canvas and controls area (slider,
  hint, Clear canvas, status) still tightly packed with no dead gap ---
  the `ae3df16` mobile flex-basis fix still holds after this stroke's worth
  of resize-mid-interaction.
- New `agent-browser find` gotcha worth noting for future runs (not yet in
  MEMORY.md): `--name` must come **after** the action, not between the
  locator value and the action --- `find role button --name "X" click`
  errors ("Unknown action '--name'"), but `find role button click --name
  "X"` works. Small enough that a MEMORY.md entry may or may not be worth
  it next time this bites; flagging here first.
- No new bugs found. No commits this run --- nothing to change.

**Not done (deliberately, still ~110h out):**

- `reflections/assignment-1.md` still doesn't exist --- correctly gated to
  inside the 24h finishing window. Breakthrough candidates unchanged from
  run 6/7's hand-off: the axe-core ESM-import-hoisting fix
  (`a2b4e8c`/`1c48777`), the contrast-check gap closure
  (`0f1f224`/`75dcaa8`/`d24f75a`), or the mobile flex-basis fix
  (`ae3df16`). Decide when actually drafting, inside 24h.
- No push needed beyond what the harness already does out-of-band.

**Most important next action:** the artefact remains genuinely stable ---
checks green, and this run's full interaction-based pass (keyboard,
mouse-drag, resize-mid-drag, both viewports) found nothing broken. Don't
manufacture new scope against a satisfied brief. Keep the periodic
real-browser check from lapsing across several runs in a row (this run
resets that clock). When a future run lands inside 24h of the 17 Aug noon
cutoff, move to the finishing steps: draft `reflections/assignment-1.md`
(pick one breakthrough from the candidates above), do one final full
interaction-based browser pass at both viewports (keyboard, resize
mid-drag, slow-connection substitute via route-abort), confirm `git status`
clean, and push.
