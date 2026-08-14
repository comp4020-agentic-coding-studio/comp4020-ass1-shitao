import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Regression test for a real bug: the keyboard-operable demo stroke timed
// its points from the horizontal (x-only) spacing along the sine-wave demo
// path, not the real point-to-point distance. Since the path also moves
// vertically, the speed it actually played back was inflated above what the
// slider implied — and by a different factor depending on the canvas's
// width, so the same slider position classified as "even-handed" on a wide
// canvas and "swift" on a narrow one (desktop vs phone, at the two marking
// viewports). Fixed by timing each point from its real (x, y) distance so a
// segment's speed always matches the slider, on any canvas width.
const dom = new JSDOM(readFileSync(resolve("index.html"), "utf8"), {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
Object.assign(globalThis, { window: dom.window, document: dom.window.document });

describe("demo-stroke speed (keyboard path)", () => {
  it("classifies the same slider value the same way at different canvas widths", async () => {
    await import("../main");

    const canvas = document.querySelector<HTMLCanvasElement>(
      '[data-testid="brush-canvas"]',
    );
    const slider = document.querySelector<HTMLInputElement>(
      '[data-testid="speed-slider"]',
    );
    const status = document.querySelector('[data-testid="stroke-status"]');
    if (!canvas || !slider || !status) {
      throw new Error("expected brush-canvas, speed-slider and stroke-status in index.html");
    }
    const speedSlider = slider;
    const strokeStatus = status;

    function labelAt(width: number, sliderValue: number): string {
      Object.defineProperty(canvas, "clientWidth", { value: width, configurable: true });
      Object.defineProperty(canvas, "clientHeight", { value: 258, configurable: true });
      speedSlider.value = String(sliderValue);
      speedSlider.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
      return strokeStatus.textContent?.replace(/^Stroke \d+/, "Stroke N") ?? "";
    }

    // 322 and 628 are this site's real canvas widths at the two marking
    // viewports (phone and desktop respectively) as of this test's writing.
    for (const sliderValue of [10, 40, 70, 100]) {
      expect(labelAt(322, sliderValue)).toBe(labelAt(628, sliderValue));
    }
  });
});
