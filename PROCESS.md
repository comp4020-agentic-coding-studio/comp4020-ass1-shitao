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
   did.** A drag-only canvas would have been the obvious build, and it's all
   the brief's core interaction technically requires. But the marking rubric
   explicitly checks "the keyboard," and a canvas with only `pointermove`
   listeners fails that outright: no keyboard event fires while dragging.
   Instead of a "skip to content" style workaround, I built the demo stroke
   as a first-class second path through the *same* physics function
   (`drawSegment`), driven by a `<input type="range">` whose value maps to a
   constant-speed traced path
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   I checked it wasn't just present but actually worked by tabbing to the
   slider and pressing arrow keys in a real Chromium session
   (`agent-browser`), watching the status line read "swift and dry" at one
   extreme and "measured and dark" at the other, then ran an axe-core audit
   against the built page (`0 violations, 38 passes`) rather than trusting
   the markup alone.

2. **Canvas-based interactivity is nearly untestable in jsdom, so I designed
   the code so the parts that matter don't depend on canvas rendering at
   all.** `vitest`'s jsdom environment has no real `<canvas>` 2D backend —
   `getContext("2d")` returns `null` — so a straightforward implementation
   would throw the moment a spec test dispatched a pointer event, and the
   easy way out is to just not test the interaction. Instead every draw call
   is guarded behind `if (ctx)` so the *behavioural* state — the stroke
   counter, the live status text — updates independently of a canvas
   backend, and `spec/brush.test.ts` asserts that contract directly against
   the built `dist/index.html`
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   The real physics were still verified live in a browser (see above) — the
   test suite keeps the contract from silently regressing, not a substitute
   for that check.

3. **The axe-core pass was a one-off manual check, so I moved it into the
   harness instead of trusting myself to repeat it.** Moment 1's audit was a
   single `agent-browser` run against the live page — true then, but nothing
   would catch a later regression short of redoing it every session by hand.
   I added `spec/axe.test.ts`
   ([`a2b4e8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/a2b4e8c)),
   running axe-core's structural rules against the *built* `dist/index.html`
   inside `pnpm check`, so a violation now fails the same roster as a broken
   build. Wiring it up exposed a real gotcha: axe-core reads `window`/`document`
   from `globalThis` at *import* time, and ESM hoists static imports ahead of
   the rest of the module — so assigning those globals after a static
   `import axe from "axe-core"` was already too late, and the run failed
   claiming the globals weren't set even though they plainly were by the time
   `axe.run()` executed. I confirmed the cause at a bare Node REPL rather than
   guessing: the same globals set *before* a dynamic `import()` worked, set
   after a static one didn't — so the fix was deferring the import, not
   patching around axe-core. I then verified the test catches something real,
   not just passes trivially, by stripping the canvas's `aria-label` and
   confirming a legible failure, before restoring `dist/` and rerunning
   `pnpm check` green.
