# Process overview

## What I built

An interactive explainer of 一畫 (yīhuà), the "single brushstroke" Shitao's
own treatise builds outward from: an ink-brush canvas whose width and
darkness are set entirely by drag speed (slow pools dark and wide, fast
runs thin and pale), plus a keyboard-operable speed slider that plays the
same physics as a demo stroke — so the one idea, speed as the whole
instrument, is reachable without a pointer at all.

## The moments that mattered

1. **The interaction had to work without a pointer, not just look like it
   did.** A drag-only canvas is all the brief's core interaction technically
   requires, but the rubric explicitly checks "the keyboard," and a canvas
   with only `pointermove` listeners fails that outright — no keyboard
   event fires while dragging. Rather than a "skip to content" workaround,
   I built the demo stroke as a first-class second path through the *same*
   physics function (`drawSegment`), driven by an `<input type="range">`
   mapped to a constant-speed traced path
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   I checked it actually worked by tabbing to the slider and pressing arrow
   keys in a real Chromium session (`agent-browser`), watching the status
   read "swift and dry" at one extreme and "measured and dark" at the
   other, then ran a one-off axe-core audit against the built page
   (`0 violations, 38 passes`) rather than trusting the markup alone.

2. **Canvas-based interactivity is nearly untestable in jsdom, so I designed
   the code so the parts that matter don't depend on canvas rendering at
   all.** `vitest`'s jsdom has no real `<canvas>` 2D backend —
   `getContext("2d")` returns `null` — so a naive implementation throws the
   moment a spec test dispatches a pointer event. Instead every draw call is
   guarded behind `if (ctx)`, so the *behavioural* state — stroke counter,
   live status text — updates independently of canvas, and
   `spec/brush.test.ts` asserts that contract against the built
   `dist/index.html`
   ([`0b29194`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0b29194)).
   The real physics stayed verified live in a browser (see above); the test
   just guards against silent regression afterward.

3. **The axe-core pass was a one-off manual check, so I moved it into the
   harness instead of trusting myself to repeat it.** Moment 1's audit was a
   single live-page run — true then, but nothing would catch a later
   regression short of redoing it by hand every session. I added
   `spec/axe.test.ts`
   ([`a2b4e8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/a2b4e8c)),
   running axe-core's structural rules against the built page inside
   `pnpm check`. Wiring it up exposed a real gotcha: axe-core reads
   `window`/`document` from `globalThis` at *import* time, and ESM hoists
   static imports ahead of the rest of the module — assigning those globals
   after a static `import axe from "axe-core"` was already too late, so the
   run failed claiming they weren't set even though they plainly were. I
   confirmed the cause at a bare Node REPL: globals set *before* a dynamic
   `import()` worked, set after a static one didn't. I then stripped the
   canvas's `aria-label`, confirmed a legible failure, and restored `dist/`
   before rerunning green — the test wasn't a rubber stamp.

4. **This file said contrast was "not measured here" — an acknowledged
   gap, not a closed one — so I closed it.** `spec/axe.test.ts` disables
   `color-contrast` because jsdom has no paint engine to resolve colours
   from, but contrast is a pure function of two hex values — no engine
   needed. `spec/contrast.test.ts`
   ([`0f1f224`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0f1f224))
   reads the real `:root` palette out of `styles.css` and checks every
   text/background pair against the right AA threshold, so a palette edit
   is caught rather than trusted by eye. I confirmed it wasn't a rubber
   stamp by weakening `--seal` and watching five pairs fail with their real
   ratios, before restoring the file and rerunning green.
