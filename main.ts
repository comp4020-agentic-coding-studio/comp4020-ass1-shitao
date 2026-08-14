// The single-brushstroke studio: an ink brush whose width and darkness are
// driven entirely by drawing speed, plus a keyboard-operable slider that
// plays the same physics as a demo stroke for anyone who can't drag a
// pointer. `ctx` is null under jsdom (no canvas backend in the test env), so
// every draw call is guarded — the DOM state (status text, stroke count)
// still updates without it, which is what the spec tests exercise.

type Point = { x: number; y: number; t: number };

const canvas = document.querySelector<HTMLCanvasElement>(
  '[data-testid="brush-canvas"]',
);
const slider = document.querySelector<HTMLInputElement>(
  '[data-testid="speed-slider"]',
);
const clearButton = document.querySelector<HTMLButtonElement>(
  '[data-testid="clear-button"]',
);
const status = document.querySelector<HTMLElement>(
  '[data-testid="stroke-status"]',
);

const ctx = canvas?.getContext("2d") ?? null;

const MIN_WIDTH = 2;
const MAX_WIDTH = 26;
const MAX_OPACITY = 0.92;
const MIN_OPACITY = 0.18;
// px/ms beyond which a stroke is "as dry as it gets"
const FAST_REFERENCE_SPEED = 1.4;

let strokeCount = 0;
let currentStroke: Point[] = [];
let pooling: { x: number; y: number; since: number } | null = null;

function widthForSpeed(speedPxPerMs: number): number {
  const t = Math.min(speedPxPerMs / FAST_REFERENCE_SPEED, 1);
  return MAX_WIDTH - t * (MAX_WIDTH - MIN_WIDTH);
}

function opacityForSpeed(speedPxPerMs: number): number {
  const t = Math.min(speedPxPerMs / FAST_REFERENCE_SPEED, 1);
  return MAX_OPACITY - t * (MAX_OPACITY - MIN_OPACITY);
}

function classify(avgSpeed: number, pooled: boolean): string {
  if (pooled) return "saturated and pooling — the brush lingered";
  if (avgSpeed < FAST_REFERENCE_SPEED * 0.25)
    return "measured and dark — a slow, deliberate line";
  if (avgSpeed < FAST_REFERENCE_SPEED * 0.65)
    return "even-handed — neither rushed nor held back";
  return "swift and dry — the ink barely touched the paper";
}

function drawSegment(from: Point, to: Point): void {
  if (!ctx) return;
  const dt = Math.max(to.t - from.t, 1);
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const speed = dist / dt;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = widthForSpeed(speed);
  ctx.strokeStyle = `rgba(26, 22, 20, ${opacityForSpeed(speed)})`;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function poolAt(x: number, y: number, radius: number): void {
  if (!ctx) return;
  ctx.fillStyle = `rgba(26, 22, 20, ${MAX_OPACITY})`;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function averageSpeed(points: Point[]): number {
  if (points.length < 2) return 0;
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const dist = points.reduce((sum, p, i) => {
    if (i === 0) return sum;
    const prev = points[i - 1]!;
    return sum + Math.hypot(p.x - prev.x, p.y - prev.y);
  }, 0);
  const dt = Math.max(last.t - first.t, 1);
  return dist / dt;
}

function finishStroke(points: Point[], pooled: boolean): void {
  if (points.length < 2 || !status) return;
  strokeCount += 1;
  const label = classify(averageSpeed(points), pooled);
  status.textContent = `Stroke ${strokeCount}: ${label}.`;
}

function pointerPos(canvasEl: HTMLCanvasElement, event: PointerEvent): Point {
  const rect = canvasEl.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top, t: event.timeStamp };
}

if (canvas) {
  canvas.addEventListener("pointerdown", (event) => {
    canvas.setPointerCapture(event.pointerId);
    currentStroke = [pointerPos(canvas, event)];
    pooling = null;
  });

  canvas.addEventListener("pointermove", (event) => {
    if (currentStroke.length === 0) return;
    const point = pointerPos(canvas, event);
    const prev = currentStroke[currentStroke.length - 1]!;
    const dt = Math.max(point.t - prev.t, 1);
    const dist = Math.hypot(point.x - prev.x, point.y - prev.y);
    const speed = dist / dt;

    // Dwelling in place pools ink, like a real brush left resting.
    if (dist < 1.5) {
      if (!pooling || pooling.x !== prev.x || pooling.y !== prev.y) {
        pooling = { x: prev.x, y: prev.y, since: prev.t };
      }
      const dwell = point.t - pooling.since;
      if (dwell > 120) poolAt(pooling.x, pooling.y, Math.min(4 + dwell / 60, MAX_WIDTH));
    } else {
      pooling = null;
      drawSegment(prev, point);
    }

    void speed;
    currentStroke.push(point);
  });

  const endStroke = (pooled: boolean) => () => {
    finishStroke(currentStroke, pooled);
    currentStroke = [];
    pooling = null;
  };

  canvas.addEventListener("pointerup", endStroke(false));
  canvas.addEventListener("pointercancel", endStroke(false));
}

if (clearButton && canvas) {
  clearButton.addEventListener("click", () => {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (status) status.textContent = "Canvas cleared — draw another stroke.";
  });
}

// The demo stroke traces a fixed S-curve at a constant speed set by the
// slider, so a keyboard-only visitor feels the same width/opacity physics
// without ever touching a pointer.
if (slider && canvas) {
  slider.addEventListener("input", () => {
    const speedFraction = Number(slider.value) / 100;
    const speed = speedFraction * FAST_REFERENCE_SPEED * 1.1;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 260;
    const steps = 40;
    const path: Point[] = [];
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      path.push({
        x: width * 0.1 + progress * width * 0.8,
        y: height / 2 + Math.sin(progress * Math.PI * 2) * (height * 0.28),
        t: 0,
      });
    }
    // Time each point by its real distance along the curve — not just the
    // horizontal spacing — so a segment's speed (and the width/opacity it
    // drives through the shared draw function) matches the slider's chosen
    // speed everywhere, including where the sine wave is steep. Using the
    // x-only spacing here previously inflated the real speed above what the
    // slider implied, and by a different factor at different canvas widths.
    const safeSpeed = Math.max(speed, 0.02);
    for (let i = 1; i < path.length; i++) {
      const prev = path[i - 1]!;
      const point = path[i]!;
      const dist = Math.hypot(point.x - prev.x, point.y - prev.y);
      point.t = prev.t + Math.max(dist / safeSpeed, 1);
    }
    if (ctx) {
      for (let i = 1; i < path.length; i++) {
        drawSegment(path[i - 1]!, path[i]!);
      }
    }
    finishStroke(path, false);
  });
}

function resizeCanvas(): void {
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const displayWidth = canvas.clientWidth || 600;
  const displayHeight = canvas.clientHeight || 260;
  const targetWidth = Math.round(displayWidth * ratio);
  const targetHeight = Math.round(displayHeight * ratio);
  if (canvas.width === targetWidth && canvas.height === targetHeight) return;

  const previous = ctx?.getImageData(0, 0, canvas.width, canvas.height) ?? null;
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  if (ctx) {
    ctx.scale(ratio, ratio);
    if (previous) ctx.putImageData(previous, 0, 0);
  }
}

if (canvas) {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}
