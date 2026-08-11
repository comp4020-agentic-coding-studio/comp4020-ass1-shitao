# Hand-off --- after run 5 on Assignment 1, deepen stage (135h → ~133h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo had a complete, deepened build from
runs 1--4 (the 一畫/yīhuà ink-brush explainer), `PROCESS.md` at its cap of
four moments (598 words, near the top of the 400--600 band), `pnpm check`
31/31 green. Tip was `2725482` (a harness tick-snapshot commit already
matching `origin/main` --- expected, not something I pushed). Run 4's
hand-off named the next job as: keep the periodic real-browser pass going,
watch for anything a fresh brief reread surfaces, hold off on the
reflection and push until inside 24h.

**What this run did:**

- Refetched the brief/spec JSON in full --- unchanged from runs 1--4.
- Rereading the HD artefact band ("holds up under... a resize
  mid-interaction, a slow connection") against the record turned up one
  real gap: keyboard and resize-mid-drag were both actually verified in a
  real browser across earlier runs, but "slow connection" had only ever
  been asserted in band language, never tested --- confirmed via `git log
  --all --oneline | grep -i slow` returning nothing.
- `agent-browser` turns out to have no bandwidth-throttle primitive (no
  bandwidth/speed setting, only `network route <url> --abort` and `set
  offline on`). Used route-abort on `**/*.js` and `**/*.css` independently
  and in combination against the built `dist/`, at both 1920×1080 and
  390×844, as the closest honest substitute for "slow" (bounding the
  worst case: assets that never arrive). Result: with both blocked, the
  page falls back to legible unstyled HTML, no blank page, no console
  error; with CSS present and JS still blocked, the layout is fully
  styled and the canvas keeps its CSS-defined box (nothing is invisible
  pending JS); unrouting and reloading recovers cleanly, no console
  errors at any step, either viewport.
- This was confirmation, not a correction --- nothing in the code needed
  to change, so it isn't a `PROCESS.md` moment (that file stays at its
  four, per the spec's cap). Documented the method and result in
  `CLAUDE.md`
  ([`2c36a95`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/2c36a95))
  so a future run doesn't re-derive that `agent-browser` lacks a real
  throttle, and so the "slow connection" HD claim is backed by something
  a marker or teammate could rerun, not just asserted.
- Re-ran `pnpm check` after: still 31/31 green (no code touched this run).
- No push. Tip is now `2c36a95`, committed locally only, per doctrine's
  inside-24h gate.

**Not done (deliberately, still 133h out):**

- `reflections/assignment-1.md` still doesn't exist --- doctrine gates it
  to inside the 24h finishing window. Two real breakthrough candidates
  stand from run 3/4: the axe-core ESM-import-hoisting fix (`a2b4e8c`,
  `1c48777`), or the `CLAUDE.md`-gap-closing contrast check (`0f1f224`,
  `75dcaa8`, `d24f75a`). Decide when actually drafting it, not now.

**Most important next action:** the punch list is now genuinely exhausted
--- keyboard, resize-mid-drag, and (as of this run) slow-connection are
all actually verified in a real browser, not just claimed, and both
harness-correction slots the spec rewards (axe-core, contrast) are already
spent with `PROCESS.md` at its four-moment cap. The one still-open,
explicitly-named gap is **performance** (Lighthouse or equivalent), which
`CLAUDE.md` calls out as "still your work" and the spec later in the
course will ask for --- not clearly assignment-1's job, so don't
manufacture urgency there without rereading whether the brief has
changed. Otherwise the remaining real job across the next several runs is
just: (a) don't let the periodic real-browser pass lapse (last done this
run), (b) reread the brief fresh each run in case marking language
shifts, (c) hold the reflection and the push until inside 24h of the
17 Aug noon cutoff.
