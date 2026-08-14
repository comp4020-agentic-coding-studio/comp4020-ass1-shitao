# COMP4020 prototype

This is your starter repo for a COMP4020 prototype: a static site written in
HTML/CSS/TypeScript that builds to plain HTML/CSS/JS and deploys to GitHub
Pages. The **deployed site is what gets marked** --- not this repo, and not "it
works on my machine". It's marked live in Chrome against the deployed URL at two
viewports --- 1920×1080 (desktop) and 390×844 (phone) --- and both count in
full, so make that artefact good at both and use the checks below to know
whether it is.

The course website publishes this deliverable's brief and spec. The brief poses
the problem; the spec is the fixed contract every response must satisfy. This
repo's name tells you which deliverable applies. Run the course plugin's
**start** skill at the start of each week: it pulls the right spec from the
course API, carries your harness forward from last week, and helps you turn the
spec's checkable lines into tests of your own. Read the brief and spec before
you plan or build, and see `spec/README.md` for how the checks relate to them.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Before you push, run `pnpm check`. It runs most of what CI runs --- build,
  lint, and the spec --- so you catch those in seconds instead of waiting for
  the pipeline. The links check, the evidence check, the secrets scan, and the
  deploy itself only run in CI; run `pnpm dlx linkinator ./dist --silent`
  locally against a fresh `pnpm build` for the links check without waiting for
  CI.
- To see what the page actually looks like rather than what you assume it looks
  like, open it in a browser (the `agent-browser` CLI, documented on
  [the course site](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/backpressure/#agent-browser-the-rendered-page-as-ground-truth),
  works well for this). The rendered page is the truth; your mental model of it
  isn't.
- When a check fails, read its output before changing anything. Each check below
  names what it measures, and the failure message is the instruction: it tells
  you the file, the line, or the contract. Treat a red check as authoritative
  --- the page is wrong until the check is green, not until you decide it should
  be.
- Commit when the checks pass. Never commit a red state.

## The checks (your sensors)

CI runs these on every push once your repo is public. GitHub's checks UI shows
two jobs, `check` and `deploy` --- not one status per sensor below --- and
within `check` the steps run in sequence (`pnpm check` chains typecheck, build,
lint, and the spec with `&&`), so an early failure like a broken build stops the
later sensors from running for that push; fix it and push again to see the rest.
While the repo is private (all week, until you ship) the CI jobs stay skipped
--- `pnpm check` is the same roster on your machine, and it's the faster loop
anyway. They aren't hoops. Each is a different way of finding out something true
about the site that you can't reliably see by looking at it.

They also carry a mark at a crit: the sweep runs fifteen minutes after your
cutoff, and green checks there are worth half that week's shipped mark. Still
running counts as not green, so ship with time for CI to finish.

- **typecheck** --- `tsc --noEmit` runs first in `pnpm check`, so a type error
  stops the roster before the build even starts. The types are extra
  backpressure: a red here is the compiler telling you a claim in the code is
  false.
- **build** --- the site must build (`pnpm build`). A build failure means the
  deployed site is broken or stale, so nothing else matters until this is green.
- **deploy / online** --- the live GitHub Pages URL must load and return the
  page you expect. An asset that 404s on the deployed URL counts as broken even
  if it loads locally.
- **spec** --- `spec/invariants.test.ts` asserts what's true of any good
  website, whatever the week's brief asks; the tests you write for the week's
  spec run alongside it (any `spec/*.test.ts`). A failure names the contract you
  haven't met yet.
- **lint** --- `stylelint` for CSS, `oxlint` for TypeScript. Flags code that's
  wrong, fragile, or non-idiomatic. Read the rule it names.
- **tests** --- any other tests you write, wherever you put them (co-located
  with your source is fine, not just `spec/`), must pass. Vitest picks up both
  this and the spec suite in one `vitest run`, the last step of `pnpm check`. A
  failing test is a claim about the site that's no longer true.
- **evidence** (`pnpm check:evidence`) --- checks your process evidence:
  `PROCESS.md`'s citations resolve to real commits, the current deliverable's
  exact reflection is in `reflections/` (worked out from this repo's name
  against the public course API), and your `CLAUDE.md` is present. Evidence
  gates the deploy --- `deploy` needs `check` to pass, so failing evidence
  blocks the deploy alongside everything else. See
  [Your process is part of the mark](#your-process-is-part-of-the-mark) below,
  and the course website's
  [assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
  for what counts as evidence.
- **links** --- internal links must resolve. A broken link is a dead end you
  didn't mean to ship.
- **secrets** --- the repo is scanned for committed credentials. Never put a
  key, token, or password in a tracked file. If one leaks, rotate it. A local
  pre-commit hook (`.githooks/pre-commit`, installed by `pnpm install`) also
  blocks any commit containing something shaped like an API key --- by the time
  CI sees a key it's already pushed, so the hook is the sensor that matters.

`spec/axe.test.ts` wires `axe-core`'s structural rules (everything except
`color-contrast`, which jsdom can't resolve reliably) into `pnpm check`, so
those regress loudly instead of waiting for the next manual browser pass ---
see the gotcha below if you touch that file. `spec/contrast.test.ts` fills
exactly the gap axe-core's disabled rule leaves: WCAG contrast is a pure
function of two colours, so it doesn't need a paint engine --- it reads the
real `:root` palette out of `styles.css` and checks the actual
foreground/background pairs the page uses against the correct AA threshold
for that pair's text size. If you add a new colour or reuse an existing one
in a new context, add a pair there rather than trusting the eye. Nothing here
measures **performance** though --- wiring that sensor (Lighthouse or
whatever you choose) is still your work, and later in the course the spec
will ask you to show how you tested it. When you do, read a green result
honestly: it's a lab estimate from one run on a CI machine, not proof the
site is fast for real users.

## The stack is swappable

Out of the box this is plain HTML/CSS/TypeScript on Vite, and every `.html` file
in the repo is a page: add pages, link them, and the build picks them up with no
config. That's a default, not a rule (unless the week's spec says otherwise).
You can swap in Astro or any other static generator, because nothing in CI names
a tool --- the whole contract is:

- `pnpm build` emits the complete site into `dist/`
- the `package.json` scripts (`check`, `check:evidence`, `build`) keep working
- whatever lands in `dist/` still passes the invariants in `spec/`

Two things bite in a swap. The deployed site lives under a path
(`…github.io/<repo>/`), so configure your generator's base path --- this
template's Vite config uses relative asset URLs to sidestep that, but most
generators (Astro included) need `base` set explicitly, and getting it wrong
looks fine locally while every asset 404s on the live URL. And commit the
updated `pnpm-lock.yaml`: CI installs with `--frozen-lockfile`.

For the course default (Astro) or the bare hand-written arm, don't wire the swap
by hand: the course plugin's `stack` skill runs a tested conversion script that
handles both of the traps above plus the CI link-check patch, and leaves the
whole change staged as one reviewable diff.

## Your process is part of the mark

The deployed page is only half of it. How you got there is marked too: your
commit history, your agent files, and the decisions visible across them. The
checks above can't see any of that, so a person reads it directly --- which
means building legibly is part of building well.

- **Commit as you go.** Small, frequent commits are the record of how the work
  came together, and that record is read, not just the final state. A trail that
  grew alongside the code is the strongest evidence of your process; a single
  dump the night before is the weakest.
- **Keep a process overview** (`PROCESS.md`). A short reading-guide, not an
  essay: what you built, the moments that mattered --- each pointing at a
  commit, a `CLAUDE.md` change, or a prompt and the commit it produced --- and
  where to look in the history. It points a marker at the evidence; it doesn't
  stand in for it, and claims the history doesn't back don't count. The
  `PROCESS.md` in this repo is a template showing the shape and the citation
  format (link text the commit hash or range, target the commit or compare URL);
  `pnpm check:evidence` verifies your citations resolve to real commits before
  you ship. Markers follow those citations and don't trawl the repo for evidence
  you didn't cite.
- **Write your reflection in `reflections/`** --- a short markdown file in this
  repo, named for the deliverable it answers, so the number in the filename is
  the number in this repo's name (`crit-1.md` in `comp4020-crit1-<you>`,
  `assignment-1.md` in `comp4020-ass1-<you>`); `reflections/README.md` has the
  full rule. `pnpm check:evidence` checks the exact current name against the
  course API, not merely the presence of any well-named file. It answers the two
  standing prompts: the breakthrough that moved the work forward, and what this
  work changed about the developer you want to be. It stays out of the deployed
  site. It's due at the cutoff, and if it isn't in the repo by then the week
  doesn't count as shipped, however good the prototype is.
- **This file is process evidence.** The harness you build to direct the work,
  this `CLAUDE.md` and any `AGENTS.md`, is itself read as part of how you
  worked. Keep it honest and current (see below).

You don't need a name, a student number, or any identity file in the repo: we
know whose repo it is. Spend the effort on the work.

## This file is yours

This CLAUDE.md is a starting point, not a fixed rulebook. As you learn what your
prototype needs --- a convention the work has to hold to, a sensor that keeps
catching you out, a fact about the stack that's easy to get wrong --- write it
down here. Growing this file is the work of harness engineering, and the gap
between this boilerplate and your own version is part of what your prototype
says about the developer you're becoming.

## This prototype: the yihua brush studio

The core mechanic is a `<canvas>` ink brush (`main.ts`) whose stroke width
and opacity are a pure function of drag speed, plus a `<input type="range">`
that drives the *same* draw function along a fixed path so the interaction
has a keyboard-operable equivalent, not just a mouse one --- the marking
rubric checks "the keyboard" explicitly, and a pointer-only canvas fails
that outright.

- **`vitest`'s jsdom has no real canvas backend** --- `canvas.getContext("2d")`
  returns `null` there, not a stub. Every draw call in `main.ts` is guarded
  with `if (ctx)` for exactly this reason: it keeps the *behavioural* DOM
  state (stroke counter, live status text) updating and testable in
  `spec/brush.test.ts` even though the actual ink never renders in the test
  environment. Don't remove the guards to "simplify" the code --- they're
  load-bearing for the test suite, not defensive clutter.
- **The real physics still need a real browser.** The jsdom spec test only
  asserts the static contract (accessible names, labelled slider, live
  region). Verifying that a slow drag actually pools dark and a fast one
  actually runs pale requires `agent-browser` with real `mouse move/down/up`
  sequences (or keyboard arrow presses on the slider) against the built
  `dist/`, checked at both marking viewports. Do this again after any change
  to `widthForSpeed`/`opacityForSpeed`/the demo path in `main.ts`.
- **A demo path's timestamps have to track its real (x, y) distance, not
  just one axis.** The keyboard demo stroke traces a sine-wave path and
  used to derive each point's timestamp from the horizontal step spacing
  alone; the path's vertical motion made the *real* segment distance (and
  so the *real* speed fed to `widthForSpeed`/`opacityForSpeed`) run faster
  than the slider implied, and by a different ratio at different canvas
  widths — the same slider position classified "even-handed" on the 628px
  desktop canvas and "swift" on the 322px phone canvas. Found by computing
  the actual `averageSpeed()` math against the live built page in
  `agent-browser eval`, not by eyeballing the drawn stroke. Fixed by timing
  each point from `Math.hypot(dx, dy)` instead of the x-only step; verify
  with `spec/demo-speed.test.ts`, which asserts a given slider value
  classifies identically regardless of `canvas.clientWidth`.
- **`resizeCanvas()`'s `getImageData`/`putImageData` pair is a raw pixel
  copy, not a proportional rescale.** Confirmed by actually resizing
  mid-drag with `agent-browser` (mouse down, move, `set viewport`, move,
  up) in both directions (1920×1080 → 390×844 and back): existing ink stays
  anchored at its original pixel coordinates and gets cropped if the canvas
  shrinks past it, rather than shrinking/growing with the canvas. No crash,
  no visual corruption, no console error either direction --- this is
  acceptable behaviour for the brief's "holds up under a resize
  mid-interaction" bar, but it's not what a first glance at the function
  name would suggest, so don't assume the ink rescales if you touch this
  function later.
- **A status message with no call site that ever passes it is dead, however
  real the effect it describes.** `finishStroke`'s `pooled` argument existed
  so `classify()` could report "saturated and pooling" when a dwell crossed
  `poolAt`'s 120ms threshold, but every call site (`pointerup`,
  `pointercancel`, the keyboard demo) passed a hard-coded `false` — the
  visual pool on canvas worked, the status text describing it never could.
  Found by grepping every call site of `finishStroke`/`classify`, not by
  driving the interaction first (an early live-browser attempt to reproduce
  it live gave a false negative because the test click landed below the
  viewport's visible height, not because the bug wasn't there — `get box`
  returns full-page coordinates, not coordinates clipped to what
  `window.innerHeight` can actually see, so a canvas can extend below the
  fold even though its box looks fine). Fixed by tracking whether a dwell
  actually fired `poolAt` during the current stroke (`strokeDidPool`) and
  passing that instead of a constant; verified live in-viewport at both
  marking widths and with `spec/pooling.test.ts`, which dispatches real
  `PointerEvent`s with controlled `timeStamp`s (jsdom's `setPointerCapture`
  doesn't exist, so `pointerdown`'s call to it needs `?.` to stay
  testable — same guard-for-testability shape as the `ctx` checks above).
- **`axe-core` needs a dynamic `import()`, not a static one, when the
  `window`/`document` it inspects come from a jsdom instance you built
  yourself.** ESM hoists static imports ahead of every other top-level
  statement in the module, so `import axe from "axe-core"` at the top of
  `spec/axe.test.ts` evaluated axe-core (and whatever it snapshots from
  `globalThis` at that point) *before* the file's own `Object.assign(globalThis,
  { window, document })` line ever ran --- axe.run() then failed with
  "Required window or document globals not defined", even though those
  globals were plainly set by the time `run()` was called. Confirmed by
  reproducing the same sequence at a bare Node REPL: setting the globals
  before a dynamic `await import("axe-core")` works; setting them after a
  static import doesn't. Fix was `const { default: axe } = await
  import("axe-core")` inside the `it()`, after the globals are set.
- **`agent-browser` has no bandwidth-throttle command** --- only
  `network route <url> --abort` (never arrives) and `set offline on`
  (always offline), not a slow-but-eventually-arrives speed. The closest
  honest substitute: route-abort `**/*.js` and `**/*.css` independently
  against the built `dist/`, in both combinations, to bound the "slow
  connection" HD-band language at its worst case rather than skip it for
  lack of a real throttle. Result, checked at both viewports: with both
  assets aborted the page falls back to legible unstyled HTML (no blank
  page, no console error); with CSS present and JS still aborted, the
  layout is fully styled and the canvas keeps its CSS-defined box (so
  there's no invisible-until-JS element); unrouting and reloading recovers
  cleanly with no console errors either step. Nothing needed fixing --- this
  was confirmation, not a correction, so it isn't a `PROCESS.md` moment.
