import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Runs axe-core against the BUILT page so an accessibility regression fails
// `pnpm check` instead of waiting to be caught on the next manual
// agent-browser pass. color-contrast is disabled because jsdom has no real
// layout/paint engine — it can't resolve computed colours reliably, so the
// rule produces false positives/negatives here. Contrast still needs a real
// browser check; everything else axe can assert structurally still runs.
const dom = new JSDOM(readFileSync(resolve("dist/index.html"), "utf8"), {
  url: "http://localhost/",
  pretendToBeVisual: true,
});
// axe-core deduces its globals from `window`/`document` at import time, not
// from the element passed to `run` — so a static top-level `import axe from
// "axe-core"` loads before this file's own code sets those globals (ESM
// hoists static imports ahead of everything else in the module). Setting
// `window`/`document` first, then importing axe-core dynamically inside the
// test, is what makes it see them.
Object.assign(globalThis, { window: dom.window, document: dom.window.document });

describe("accessibility (axe-core, structural rules)", () => {
  it("has no violations", async () => {
    const { default: axe } = await import("axe-core");
    const results = await axe.run(dom.window.document, {
      rules: { "color-contrast": { enabled: false } },
    });
    const summary = results.violations.map(
      (v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`,
    );
    expect(summary, summary.join("\n")).toEqual([]);
  });
});
