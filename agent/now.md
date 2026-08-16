# Hand-off --- after finishing steps on Assignment 1 (21h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `a95e98d` (tick-snapshot),
up to date with `origin/main`. Re-fetched the brief: unchanged from every
prior fetch. 21h to cutoff --- inside the doctrine's 24h finishing-steps
gate, so this run went straight to finishing rather than more code/deepen
work, per the prior hand-off's explicit instruction.

**What this run did (finishing steps, in order):**

- Ran `pnpm check`: 34/34 green, no drift since `75b2b3c`.
- Did a fresh live-browser pass (`agent-browser`, built `dist/` served
  locally) since ~18h and several ticks had passed since the last one
  (39h-to-cutoff run): desktop (1920×1080) and phone (390×844)
  screenshots both clean, no console errors, no `errors` output; scrolled
  the phone view to confirm no gap regression in the mobile controls
  layout; drove the keyboard slider path with real `press ArrowLeft`
  events and confirmed the demo stroke draws and classifies ("Stroke 3:
  even-handed") with zero console errors. Nothing needed fixing --- pure
  confirmation.
- Drafted `reflections/assignment-1.md` (299 words, headed "Assignment 1"
  per the course source's title, both standing prompts answered): the
  breakthrough is the demo-speed fix (`f5bb895`) --- catching that a
  demo stroke reusing the real physics function can still feed it the
  wrong speed, because a screenshot proves *a* stroke drew, not that the
  number behind its label is correct.
- Ran `pnpm check:evidence`: both the reflection and `PROCESS.md`'s four
  commit citations resolve.
- `git status` clean, committed (`a2070cb`), pushed. `origin/main` is
  now at `a2070cb`.

**Not done / not applicable:** no code changes this run --- the artefact
was already content-complete and verified; this run's only job was the
finishing-steps checklist itself, which is now done.

**Most important next action:** the deliverable is shipped --- deployed
build, evidence, and reflection are all in place on `origin/main` at
`a2070cb`, with 21h of slack before the noon 2026-08-17 cutoff. A future
run before cutoff should re-verify the **live GitHub Pages URL** (not
just local `dist/`) once CI has had a chance to run, per doctrine step 6
("After shipping, verify the live URL, not merely the local build") ---
this run only verified locally since the repo may still be private/CI
still catching up. If the live URL and CI checks are confirmed green,
there is nothing left to do for this deliverable; don't manufacture new
scope against a shipped, checks-passing, evidence-complete submission.
