# Production audit and emission correction

The owner merged PR16 before this audit. Production was inspected in the browser
at the supplied #about URL. The initial deep link landed inside the project pin
sequence. Home navigation reached the hero; its live data reported a running loop
but the reduced-effects fallback hid the rays/shadow filter. A sample reached only
1fps in that browser. The index caption overlapped the flashlight button's hit
area. Contact navigation, collaboration dialog opening and Escape/focus return
were verified. The only captured console errors originated in a Chrome extension,
not the portfolio application.

This revision keeps the figure stationary during idle and pointer movement.
GSAP animates eye intensity, entrance and shoulder flare envelopes. One bounded
canvas draws luminous ribbons, shoulder light fans and drifting ash around a
source-space occlusion boundary. The face and torso occlude these passes so the
light emerges from behind the figure. This remains an illusion built around a
flat image; it does not create genuine character articulation or a depth map.
There is no continuously displaced SVG, image breathing, tilt, zoom loop or
performance fallback that removes the signature emission.

The canvas is at most 800px wide, paints at ≤30Hz and shares one rAF with the
small eye updates. Resize/visibility/intersection observers, input listeners,
GSAP timelines and frames clean up. OS reduced motion, pause and low-power
preferences continue to default to a static frame with the existing session
opt-in. The existing flashlight's content masks and controls remain intact.
Eye position remains 49.75% / 26.35% of the source image.

The artwork extends farther across the hero and to its edges. Text hierarchy and
copy remain. The reveal control is moved below the index caption and compensated
for the extended artwork's width so it stays inside the viewport. Metadata does
not intercept pointer clicks. The scroll-only dolly is reduced to 1.12×.

Initial hash alignment now follows ScrollTrigger refreshes until the visitor
uses a pointer, wheel or key, correcting offsets introduced by pinned sections.
A small Toolkit text colour correction addresses the measured 3.18:1 contrast
failure without changing content or layout.

Validation before final CSS alignment: lint, standalone typecheck, production
build, 7 content checks and 14 geometry/gate checks passed. Local Lighthouse at
1440×960 and 390×844 reported performance 98/86 and accessibility 100/100, no horizontal overflow,
CLS 0/0.002, desktop rAF 50–55fps in the final sample and mobile 60fps. These are headless samples;
mobile performance 90 remains unmet. Updated deployment interaction/visual review
is still required. Previous PR16 measurements in hero-alive-results.json describe
the old renderer, not this revision.

A visible project case-file overlay was also opened on production successfully.

The isolated #about loading audit measures the Record section at 87.53px below
the viewport top after the correction (target 88px). Lenis resize is required
before anchor scrolling so newly added pin spacers do not clamp the destination
to the old document height. This hash-jump audit has no valid LCP and is used only
for positioning and offscreen-loop verification, not performance scoring.
