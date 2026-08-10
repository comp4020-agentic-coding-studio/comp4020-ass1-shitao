# Hand-off --- after run 1 on Assignment 1, plan/build stage (165h → ~161h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Fresh repo, first run on it. Due
noon Mon 17 Aug 2026 (Australia/Canberra). This is an individual assignment,
not a crit --- 20% of the course, three criteria (legibility of process 45%,
working artefact 20%, response to brief 35%), and the week 4 crit
(`crits/03-a1-retro`) reads `reflections/assignment-1.md` directly as the
retro entry --- there is no second reflection to write.

**Brief:** "Build an interactive explainer of something you think more
people should know or understand." One strong idea, one dataset/mechanic,
nothing else; static/client-side; works at both marking viewports; a
visitor action has to change what they see. `PROCESS.md` this time is
400--600 words, three or four moments, and explicitly rewards moments where
a correction landed in the harness (a `CLAUDE.md` rule, a check wired up)
over routine retry-until-green.

**What I built:** an interactive explainer of 一畫 (yīhuà, "the single
brushstroke") --- Shitao's own foundational painting concept, the thing my
name and doctrine's epigraph ("无法而法，乃为至法") come from. Core mechanic:
an ink-brush `<canvas>` whose stroke width/opacity are a pure function of
drag speed (slow = dark, wide, pooling; fast = thin, pale, dry) --- no
separate line-weight control, speed alone is the instrument. Paired with a
keyboard-operable `<input type="range">` "demo stroke speed" slider that
drives the *same* draw function along a fixed path, so the rubric's
explicit "holds up under the keyboard" check has a real answer, not just a
mouse-only gesture. Below the canvas: short explainer content grounding the
mechanic in real sourced quotes (Met Museum, Berger Foundation, Goodreads
treatise excerpts --- see this run's WebSearch) about yihua's practical
level (a design begins/ends with one stroke) and metaphysical level ("myriad
strokes reunited in oneness"), ending on Shitao's "method of no-method."

**Verification this run:** `pnpm check` green (typecheck, build, oxlint,
stylelint, 20/20 vitest). Real `agent-browser` pass at 1920×1080 and
390×844 against a locally-served `dist/`: simulated an actual slow drag
(→ "measured and dark") and fast drag (→ "swift and dry") with `mouse
move/down/up`, confirmed the keyboard-only path works by focusing the
slider and pressing arrow keys (status updated correctly, canvas rendered a
real demo stroke), checked the clear button, and ran an axe-core audit
(`0 violations, 38 passes`). No console errors at either viewport. This is
the first Shitao run to actually simulate a canvas drag rather than just
screenshot a static page --- worth keeping as the pattern for any future
canvas/pointer-driven prototype: `agent-browser get box <sel>` for
coordinates, then `mouse move/down/up` sequences, not just static
screenshots.

**Harness update this run:** hit the familiar `no-descending-specificity`
stylelint trap (`nav a` before plain `a`) immediately --- fixed structurally
with a `.brand` class per [[MEMORY]]'s standing note, not by reordering.
Also documented in this repo's `CLAUDE.md` (commit `08e1e0e`) that
`vitest`'s jsdom has no real canvas backend (`getContext("2d")` returns
`null`, not a stub), so `main.ts` guards every draw call behind `if (ctx)`
to keep the *behavioural* DOM state (stroke counter, live status text)
testable in `spec/brush.test.ts` even though jsdom never actually renders
ink. This is worth folding into global `MEMORY.md` if a future canvas-based
week hits the same thing.

**PROCESS.md:** drafted with the first two moments already (the
keyboard-accessibility design decision, and the jsdom-canvas testability
guard) --- both are harness-level corrections, not retries, and both are
cited against the real commit `0b29194` (commit-then-cite, not the other
way, per standing note). Deliberately left at two moments with a note that
more are coming --- doctrine's own read on "the strongest moments are ones
where a correction landed in the harness" means I should let 1--2 more
real moments accumulate through the week rather than padding to four now.

**Not done yet (deliberately, since this run is at 161h out, nowhere near
the 24h finishing gate):**
- `reflections/assignment-1.md` --- doesn't exist yet. `pnpm check:evidence`
  correctly fails on this right now; that's expected, not a bug, until the
  finishing stage.
- No push. Repo is committed locally only (`08e1e0e` is the tip) per
  doctrine's inside-24h gate for finishing steps including the push.
- Haven't tried a slow-connection or resize-mid-drag stress test yet (the
  HD band for the artefact criterion specifically calls out "a resize
  mid-interaction" and "a slow connection") --- `resizeCanvas()` in
  `main.ts` already attempts to preserve ink via `getImageData`/
  `putImageData` on resize, but this hasn't actually been exercised with a
  real viewport resize mid-stroke. Worth doing in a deepen-stage run.
- Haven't reread the response-to-the-brief rubric's HD language ("a
  pointed, surprising answer... scoped with judgement") against the
  finished page with fresh eyes --- worth a self-crit pass mid-week once
  the explainer text has had a chance to sit.

**Most important next action:** this deliverable has a real week ahead of
it (165h at start of this run) --- next run should be a genuine deepen
pass, not a repeat of today's plan/build: stress-test resize-mid-drag and a
throttled connection, reread the brief's HD band against the actual page,
and only then start drafting `reflections/assignment-1.md` once there's a
real breakthrough to name (the retro reads this file directly, so it's
worth waiting for something true rather than writing early and backfilling
later). Do not push until inside the 24h finishing window.
