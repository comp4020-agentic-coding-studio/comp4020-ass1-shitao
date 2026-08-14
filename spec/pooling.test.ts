import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Regression test for a real bug: `finishStroke` took a `pooled` flag meant
// to report "saturated and pooling — the brush lingered" when a drag
// dwelled in place long enough to trigger `poolAt`'s visual ink pool, but
// every call site (pointerup, pointercancel, the keyboard demo) passed a
// hard-coded `false` — so that status message was dead code no real
// interaction could ever produce, even though the pooling *effect* on
// canvas worked. Fixed by tracking whether a dwell actually crossed the
// pooling threshold during the current stroke and reporting that in the
// final status, rather than a constant.
const dom = new JSDOM(readFileSync(resolve("index.html"), "utf8"), {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
Object.assign(globalThis, { window: dom.window, document: dom.window.document });

function pointerEvent(type: string, x: number, y: number, t: number) {
  const event = new dom.window.PointerEvent(type, {
    clientX: x,
    clientY: y,
    pointerId: 1,
    bubbles: true,
  });
  Object.defineProperty(event, "timeStamp", { value: t, configurable: true });
  return event;
}

describe("pointer-drawn stroke pooling", () => {
  it("reports pooling in the status once a dwell crosses the threshold", async () => {
    await import("../main");
    const canvas = document.querySelector<HTMLCanvasElement>(
      '[data-testid="brush-canvas"]',
    );
    const status = document.querySelector('[data-testid="stroke-status"]');
    if (!canvas || !status) {
      throw new Error("expected brush-canvas and stroke-status in index.html");
    }

    canvas.dispatchEvent(pointerEvent("pointerdown", 100, 100, 0));
    canvas.dispatchEvent(pointerEvent("pointermove", 100.5, 100.5, 50));
    // Same spot, 150ms later: crosses the 120ms dwell threshold.
    canvas.dispatchEvent(pointerEvent("pointermove", 100.5, 100.5, 200));
    canvas.dispatchEvent(pointerEvent("pointerup", 100.5, 100.5, 200));

    expect(status.textContent).toContain("saturated and pooling");
  });

  it("does not report pooling for an ordinary fast drag", async () => {
    const canvas = document.querySelector<HTMLCanvasElement>(
      '[data-testid="brush-canvas"]',
    );
    const status = document.querySelector('[data-testid="stroke-status"]');
    if (!canvas || !status) {
      throw new Error("expected brush-canvas and stroke-status in index.html");
    }

    canvas.dispatchEvent(pointerEvent("pointerdown", 0, 0, 1000));
    canvas.dispatchEvent(pointerEvent("pointermove", 50, 0, 1020));
    canvas.dispatchEvent(pointerEvent("pointermove", 100, 0, 1040));
    canvas.dispatchEvent(pointerEvent("pointerup", 100, 0, 1040));

    expect(status.textContent).not.toContain("saturated and pooling");
  });
});
