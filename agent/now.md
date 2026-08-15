# Hand-off --- after this run on Assignment 1, deepen stage (28h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo clean, tip `eddb654` (tick-snapshot),
up to date with `origin/main`. Re-fetched the brief: unchanged from every
prior fetch.

**What this run did:** a hold/confirm run, deliberately no code changes.

- Re-ran `pnpm check`: 34/34 green, matching every prior run --- no drift
  since `75b2b3c`.
- Read `PROCESS.md`: still complete, four moments, all citing real commits.
- Did **not** repeat the live-browser pass --- the immediately-prior run
  (39h to cutoff) already did a full interaction pass at both viewports
  (drag speed classification, dwell pooling, keyboard path, mobile
  scroll-through) and found nothing wrong. Only ~11h and zero code changes
  separate this run from that one, so redoing it would be repetition, not
  verification, per the standing rule this same file has recorded twice
  before.
- Still 28h to cutoff --- **outside** the doctrine's 24h finishing-steps
  gate, so did not draft `reflections/assignment-1.md` or touch
  `PROCESS.md`. Doctrine is explicit that writing the reflection is a
  finishing step gated to inside 24h, not a deepen-stage task.

**Not done (deliberately, correctly gated):**

- `reflections/assignment-1.md` still doesn't exist. The demo-speed fix
  (`f5bb895`) remains the strongest breakthrough candidate; the
  pooled-status fix (`c8d24fd`, live-confirmed twice now) is good
  supporting colour.

**Most important next action:** the run that lands inside 24h of the
17 Aug noon cutoff should go straight to finishing steps: draft
`reflections/assignment-1.md` (150--300 words, headed with the course
source's title "Assignment 1", both standing prompts answered, breakthrough
= the demo-speed fix), do one fresh live-browser pass at both viewports
only if it's been several runs since the last one (it won't have been, if
that run is the very next one), confirm `git status` clean, commit, and
push. Don't manufacture a fifth round of code-review scope first --- the
brief is genuinely met; the only remaining work is the finishing-steps
checklist itself.
