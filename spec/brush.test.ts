import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// This week's brief requires "a visitor action changes what they see" —
// the core interaction has to be a mouse/touch drag on the canvas *and* a
// keyboard-operable equivalent, so these tests assert both are wired into
// the contract, not just one path to the same effect.

const distPath = resolve("dist/index.html");
const doc = new JSDOM(readFileSync(distPath, "utf8")).window.document;

describe("the brush studio", () => {
  it("has a drawable canvas with an accessible name explaining both input paths", () => {
    const canvas = doc.querySelector('[data-testid="brush-canvas"]');
    expect(canvas, "canvas is the core interactive surface").toBeTruthy();
    const label = canvas?.getAttribute("aria-label") ?? "";
    expect(label.toLowerCase()).toContain("drag");
    expect(label.toLowerCase()).toContain("keyboard");
  });

  it("offers a keyboard-operable speed control with a real label", () => {
    const slider = doc.querySelector<HTMLInputElement>(
      '[data-testid="speed-slider"]',
    );
    expect(slider, "keyboard users need a non-pointer path to the same effect").toBeTruthy();
    expect(slider?.getAttribute("type")).toBe("range");
    const id = slider?.getAttribute("id");
    const label = id ? doc.querySelector(`label[for="${id}"]`) : null;
    expect(label, "slider must have an associated <label>").toBeTruthy();
  });

  it("has a live status region that starts with a default message", () => {
    const status = doc.querySelector('[data-testid="stroke-status"]');
    expect(status).toBeTruthy();
    expect(status?.getAttribute("aria-live")).toBe("polite");
    expect(status?.textContent?.trim()).not.toBe("");
  });

  it("lets a visitor clear the canvas and start again", () => {
    expect(doc.querySelector('[data-testid="clear-button"]')).toBeTruthy();
  });
});

describe("the explainer content", () => {
  it("names the concept and grounds it in the treatise", () => {
    const text = doc.body.textContent ?? "";
    expect(text).toContain("一畫");
    expect(text.toLowerCase()).toContain("no-method");
  });
});
