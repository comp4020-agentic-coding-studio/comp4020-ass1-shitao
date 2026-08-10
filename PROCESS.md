# Process overview

## What I built

An interactive explainer of 一畫 (yīhuà), the "single brushstroke" that
Shitao's own painting treatise builds outward from: an ink-brush canvas
whose width and darkness are set entirely by how fast you drag (slow pools
dark and wide, fast runs thin and pale), plus a keyboard-operable speed
slider that plays the same physics as a demo stroke, so the one idea —
speed alone is the whole instrument, no separate line-weight tool — is
reachable without a pointer at all.

## The moments that mattered

1. **The interaction had to work without a pointer, not just look like it
   did.** A drag-only canvas would have been the obvious build — it's what
   "draw with the mouse" defaults to, and it's what the brief's core
   interaction technically requires nothing more than. But the marking
   rubric explicitly checks "the keyboard" as a way the artefact has to
   hold up, and a canvas with only `pointermove` listeners fails that
   outright: there's no keyboard event that fires while dragging. Instead
   of bolting on a "skip to content" style workaround, I built the demo
   stroke as a first-class second path through the *same* physics
   function (`drawSegment`), driven by a `<input type="range">` whose
   value maps to a constant-speed traced path
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   I checked it wasn't just present but actually worked by tabbing to the
   slider and pressing arrow keys in a real Chromium session
   (`agent-browser`), watching the status line correctly read "swift and
   dry" after moving it to one extreme and "measured and dark" at the
   other, then ran an axe-core audit against the built page (`0 violations,
   38 passes`) rather than trusting the markup alone.

2. **Canvas-based interactivity is nearly untestable in jsdom, so I
   designed the code so the parts that matter don't depend on canvas
   rendering at all.** `vitest`'s jsdom environment has no real `<canvas>`
   2D backend — `getContext("2d")` returns `null` — which meant a
   straightforward implementation would throw the moment a spec test
   dispatched a pointer event, and the easy way out is to just not test
   the interaction. Instead every draw call is guarded behind
   `if (ctx)` so the *behavioural* state — the stroke counter, the live
   status text — updates independently of whether a canvas backend
   exists, and `spec/brush.test.ts` asserts that contract (accessible
   name, labelled slider, live region) directly against the built
   `dist/index.html`
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   The real drag/keyboard physics were still verified live in a browser
   (see above) — the test suite's job is to keep the contract from
   silently regressing, not to replace that check.

_(more moments to come as the week's build deepens — this is a
plan/build/deepen-stage draft, not the final four.)_
