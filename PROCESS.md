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
   I checked it worked by tabbing to the slider and pressing arrow keys in a
   real Chromium session (`agent-browser`), watching the status read "swift
   and dry" at one extreme and "measured and dark" at the other, then ran a
   one-off axe-core audit against the built page (0 violations, 38 passes)
   rather than trusting the markup alone.

2. **A demo animation reusing the real draw function can still play the
   wrong speed.** Re-checking the keyboard path live, I found the demo
   stroke timed its points by the sine-wave path's horizontal spacing
   alone, ignoring its vertical motion — the actual speed fed to
   width/opacity ran faster than the slider claimed, by a different factor
   per canvas width. The same slider position read "even-handed" on the
   628px desktop canvas and "swift" on the 322px phone canvas: a
   keyboard-only visitor would feel two different instruments at the two
   marking viewports. I confirmed the discrepancy numerically against the
   live page before touching code, fixed it by timing each point from its
   true (x, y) distance
   ([`f5bb895`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/f5bb895)),
   and added `spec/demo-speed.test.ts`, checked to fail against the old
   logic (`git stash`) before trusting it green.

3. **The axe-core pass was a one-off manual check, so I moved it into the
   harness instead of trusting myself to repeat it.** Moment 1's audit was a
   single live-page run — true then, but nothing would catch a later
   regression. I added
   `spec/axe.test.ts`
   ([`a2b4e8c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/a2b4e8c)),
   running axe-core's structural rules inside `pnpm check`. Wiring it up
   exposed a real gotcha: axe-core reads `window`/`document` from
   `globalThis` at *import* time, and ESM hoists static imports ahead of the
   rest of the module — assigning those globals after a static
   `import axe from "axe-core"` was already too late. I confirmed the cause
   at a bare Node REPL: globals set *before* a dynamic `import()` worked,
   set after a static one didn't. I then stripped the canvas's
   `aria-label`, confirmed a legible failure, and restored `dist/` before
   rerunning green — the test wasn't a rubber stamp.

4. **This file said contrast was "not measured here" — an acknowledged gap,
   not a closed one — so I closed it.** `spec/axe.test.ts` disables
   `color-contrast` because jsdom has no paint engine to resolve colours
   from, but contrast is a pure function of two hex values — no engine
   needed. `spec/contrast.test.ts`
   ([`0f1f224`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0f1f224))
   reads the real `:root` palette from `styles.css` and checks every
   text/background pair against the right AA threshold, so a palette edit
   is caught rather than trusted by eye. I confirmed it wasn't a rubber
   stamp by weakening `--seal`, watching five pairs fail with their real
   ratios, then restoring the file and rerunning green.
