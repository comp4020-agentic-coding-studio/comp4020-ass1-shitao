import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// spec/axe.test.ts explicitly disables axe-core's color-contrast rule because
// jsdom has no real paint engine to resolve computed colours from. But WCAG
// contrast is a pure function of two colours and their pixel sizes — it
// doesn't need one. This test reads the real :root palette out of
// styles.css (so a palette edit is caught automatically, not silently
// stale) and checks the actual foreground/background pairs the page puts
// text in against the WCAG 2.1 AA threshold for that pair's text size.
const css = readFileSync(resolve("styles.css"), "utf8");

function readVar(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`--${name} not found in styles.css`);
  return match[1]!;
}

const ink = readVar("ink");
const paper = readVar("paper");
const paperDark = readVar("paper-dark");
const seal = readVar("seal");
// Literal (non-variable) colours used for the hint text and the canvas
// background — not in :root, so read them from their own rules directly.
const hintMatch = css.match(/\.instructions,\s*\n\.hint\s*\{\s*\n\s*color:\s*(#[0-9a-fA-F]{6})/);
if (!hintMatch) throw new Error("hint text colour not found in styles.css");
const hint = hintMatch[1]!;
const canvasBgMatch = css.match(/canvas\s*\{[^}]*background:\s*(#[0-9a-fA-F]{6})/);
if (!canvasBgMatch) throw new Error("canvas background colour not found in styles.css");
const canvasBg = canvasBgMatch[1]!;

function luminance(hex: string): number {
  const channels = [0, 2, 4].map((i) => parseInt(hex.slice(i + 1, i + 3), 16) / 255);
  const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!;
}

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for "large" text (>=24px, or
// >=18.66px bold) — https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
const AA_NORMAL = 4.5;
const AA_LARGE = 3;

const pairs = [
  { name: "body text on paper", fg: ink, bg: paper, large: false },
  { name: "body text inside .studio (paper-dark)", fg: ink, bg: paperDark, large: false },
  { name: "status text inside .studio (paper-dark)", fg: ink, bg: paperDark, large: false },
  { name: "instructions/hint text on paper", fg: hint, bg: paper, large: false },
  { name: "instructions/hint text on paper-dark", fg: hint, bg: paperDark, large: false },
  { name: "brand link and body links on paper", fg: seal, bg: paper, large: false },
  { name: "button border/text on paper-dark", fg: seal, bg: paperDark, large: false },
  { name: "button hover/focus text on seal background", fg: paper, bg: seal, large: false },
  { name: "canvas focus outline on canvas background", fg: seal, bg: canvasBg, large: false },
  // h1's accent span is clamp(1.6rem, 5vw, 2.4rem) — >=25.6px even at its
  // smallest, comfortably past the 24px "large text" line.
  { name: "h1 accent span (large heading text)", fg: seal, bg: paper, large: true },
];

describe("colour contrast (WCAG 2.1 AA, computed from styles.css)", () => {
  it.each(pairs)("$name meets its AA threshold", ({ fg, bg, large }) => {
    const ratio = contrastRatio(fg, bg);
    const threshold = large ? AA_LARGE : AA_NORMAL;
    expect(ratio).toBeGreaterThanOrEqual(threshold);
  });
});
