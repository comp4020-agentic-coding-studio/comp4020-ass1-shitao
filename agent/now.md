# Hand-off --- after run 4 on Assignment 1, deepen stage (141h → ~139h to cutoff)

**Deliverable:** `comp4020-ass1-shitao`. Due noon Mon 17 Aug 2026
(Australia/Canberra). Individual, 20% of the course, three criteria
(legibility of process 45%, working artefact 20%, response to brief 35%).
The week 4 crit (`crits/03-a1-retro`) reads `reflections/assignment-1.md`
directly as the retro entry.

**State at start of this run:** repo had a complete, deepened build from
runs 1--3 (the 一畫/yīhuà ink-brush explainer) with `PROCESS.md` at three
moments (591 words) and `pnpm check` 21/21 green. Tip was `1c48777` locally;
`origin/main` had advanced to `39eabdc` via the harness's own tick-snapshot
push (expected, not a push I made). Run 3's hand-off said the punch list
(resize, slow-connection, HD-reread, one harness correction) was exhausted
and asked the next run to either reread the explainer prose for the HD
"response to brief" band, or find a second harness-level correction if one
turned up naturally.

**What this run did:**

- Refetched the brief and marking bands in full (they're unchanged from
  runs 1--3). Reread `index.html`'s prose fresh: the yihua/speed-as-
  sole-instrument idea already reads as pointed and well-scoped against the
  HD "response to brief" band --- didn't touch it, since adding more would
  risk the brief's own "one idea... nothing else" discipline more than it
  would help.
- Did a full real-browser pass with `agent-browser` against the built
  `dist/` (it had been three runs since the last one, right at the edge of
  what `MEMORY.md`'s standing lesson tolerates): mouse-drag physics (slow →
  thick/dark, fast → thin/pale) confirmed correct at 1920×1080; the full
  keyboard slider range (Home/End) confirmed both classification extremes;
  tab order confirmed correct (brand link → canvas → slider → clear button);
  phone viewport (390×844) confirmed no overflow and the same drag physics
  working via simulated pointer events. No console errors either viewport.
  Nothing was broken --- this was confirmation, not a fix.
- Found the second harness-level correction run 3 left room for: this
  repo's own `CLAUDE.md` had been asserting, since the axe-core moment,
  that "nothing here measures... the contrast half of accessibility" ---
  true when written, but a standing disclaimer rather than a closed gap.
  Added `spec/contrast.test.ts`
  ([`0f1f224`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/0f1f224)),
  which reads the real `:root` palette straight out of `styles.css` (regex,
  not a hardcoded duplicate, so a palette edit can't go unnoticed) and
  checks every actual text/background pair the page uses against the
  correct WCAG AA threshold for its size. Verified it wasn't a rubber stamp
  by temporarily weakening `--seal` and confirming five pairs failed with
  their real computed ratios, before restoring the file. `pnpm check` is now
  31/31 green (up from 21).
- Updated this repo's `CLAUDE.md`
  ([`75dcaa8`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/75dcaa8))
  so the checks section reflects what's actually measured now, instead of
  leaving the stale "not measured" claim standing next to a check that now
  measures it.
- Rewrote `PROCESS.md` to add this as a fourth moment, trimming the existing
  three moments' prose to make room and land back inside the 400--600 word
  band (598 words)
  ([`d24f75a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass1-shitao/commit/d24f75a)).
  Ran `pnpm check:evidence` after --- it correctly still fails only on the
  missing reflection, confirming the citations resolve.

**Not done (deliberately, still 139h out, nowhere near the 24h gate):**

- `reflections/assignment-1.md` still doesn't exist, and doctrine gates
  writing it to inside the 24h finishing window even though the moment that
  will anchor its breakthrough now exists. Two real candidates now: the
  axe-core/ESM-import-hoisting fix (`a2b4e8c`, `1c48777`), or the contrast
  check closing this run's own `CLAUDE.md` gap (`0f1f224`, `75dcaa8`,
  `d24f75a`). Decide which is the stronger breakthrough story when you
  actually draft it --- don't decide now.
- No push. Tip is now `d24f75a`, committed locally only, per doctrine's
  inside-24h gate. (The harness's tick-snapshot commit will likely push this
  to `origin/main` on its own schedule regardless --- expected, not a
  violation.)

**Most important next action:** `PROCESS.md` is now at 4 moments (its cap)
and 598 words (near the top of the 400--600 band) --- don't add a fifth
without cutting one of the existing four first. The remaining known gap
named in `CLAUDE.md` is **performance** (Lighthouse or equivalent), which
the file itself says is still "your work" and the spec will ask for later
in the course --- not necessarily assignment-1's job, so don't manufacture
urgency there. With the punch list and both harness-correction slots now
used, the next few runs' real job is: (a) keep the periodic real-browser
pass going (don't let it lapse the way it did between runs 10--13 on the
crit before this one), (b) watch for anything a fresh rereading of the
brief's HD bands surfaces that this run's read missed, and (c) hold off on
the reflection and the push until inside 24h.
