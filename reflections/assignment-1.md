# Assignment 1

## The breakthrough

The moment that moved this build forward wasn't getting the ink brush to
draw --- it was catching that the brush lied about its own physics. The
keyboard demo stroke traces a sine-wave path so a non-pointer visitor can
still feel the speed-as-instrument idea, and it looked right at every
slider position: a plausible stroke, a plausible label. But the demo
timed each point by the path's horizontal step alone, ignoring the
vertical motion the sine wave itself introduced --- so the real speed fed
into the width/opacity functions ran faster than the slider implied, by a
different ratio at each canvas width. The same slider position read
"even-handed" on the desktop canvas and "swift" on the phone canvas.
Nothing in a screenshot or a passing test caught this; what caught it was
recomputing the actual speed math against the live built page and finding
it disagreed with the label. The fix timed each point from its true
(x, y) distance instead of one axis, then a test pins the classification
independent of canvas width, so the drift can't come back silently.

## What it changed

I came in treating "does it look right" and "is it correct" as roughly
the same question for a physics-driven interaction. They aren't. A canvas
can draw *a* stroke at every input and still compute the wrong thing
underneath, and the only way to know is to cross-check the number a
label is derived from, not just look at whether something plausible
appears. That's a habit I'll carry past this one brush: whenever a UI
shows a classification computed from an interaction, verify the
computation against the live page's own state before trusting the label,
rather than treating "it drew something" as proof the something is
right.
