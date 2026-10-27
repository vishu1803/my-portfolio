# Motion brief follow-up — 27 October 2026

Audit baseline: `9c20edb`, the merge of PR #7. The attached 14-effect implementation brief is a refinement of that implementation, so existing sections, content, routes, SEO, contact links and working interactions are retained.

| Effect | Baseline | Work in this follow-up |
|---|---|---|
| 1. Smooth scroll / one engine | exists | Extract `SmoothScroll`; retain one Lenis instance and GSAP ticker feed. Smooth return actions use the same instance. |
| 2. Preloader | partial | `Preloader` coordinates the first desktop curtain and hero, records completion in session storage and skips repeat visits. Mobile retains the nonblocking monogram; reduced motion skips the intro. |
| 3. Real torch | exists | Preserve the actual portrait/yellow mask, pointer smoothing, touch drift and inspection alternative. |
| 4. Hero / SVG drawing | exists | Preserve the line entrance and drawn circle/arrow; begin the desktop hero after the curtain. |
| 5. Colour flips | exists | Extract `ScrollColors`; preserve the scoped scrubbed backgrounds and readable chapter themes. |
| 6. Nav underline / progress | exists | Preserve shared-layout underline, active chapter and reading progress. |
| 7. Shared reveals | partial | Add `LineReveal`, `BlurIn`, `MarkerSweep` in `TextReveals`; apply to headings and supporting copy without duplicating existing scene/row entrances. Marker ink now animates a transform rather than background size. |
| 8. Count-up | exists | Preserve source-backed counters and accessible final values. |
| 9. Project track / tilt / glow | partial | Preserve track, progress, numbers, velocity treatment and 3D labels. Move the glow with pointer CSS variables; reset tilt when reduced motion becomes active. |
| 10. Toolkit | exists | Preserve grouped kinetic typography, hover dimming, lead highlight and yellow continuation. |
| 11. Interlude / sheet | exists | Preserve the desktop pin, scale and following sheet, plus the vertical mobile/static fallback. |
| 12. Hire-me rig / physics | partial | Preserve five connected strings, finger paths, pause and drag spring. Capture the actual pill centre for the burst and lazily load the burst component. |
| 13. Terminal contact | partial | Preserve typing, real links, form, counters and clipboard. Stagger the action content; add a dismiss-and-return-to-top action through Lenis. |
| 14. Cursor / magnetic UI | partial | Extract `Cursor` with an instant dot and lagged ring. Add `useMagnetic` with an 80px proximity region, a shared frame-coalesced pointer feed and offscreen cleanup. Cover hero and all terminal actions as well as case CTAs. |

## Implementation boundaries

- `MotionSystem` composes `SmoothScroll`, `ScrollColors` and `Cursor`. `Preloader` provides readiness to the hero independently of scrolling.
- `useScrollScene` loads the non-React ScrollTrigger plugin with a shared dynamic import. Every active scroll scene uses that boundary, scoped GSAP contexts and cancellation if unmounted before loading completes. `next/dynamic` is used for the React physics-burst component; Matter.js itself loads only in the desktop burst.
- Unopened resume, project-note, project-detail and project-index dialogs are split out of the initial client bundle. After first use, each stays mounted so its existing exit transition and dialog lifecycle remain available.
- Existing cinematic sequences retain their own timing. The new text wrappers animate inner content, magnetic wrappers own their springs, and scene transforms remain on separate elements. Reveal observers disconnect after their first entrance.
- The desktop curtain lasts about 950ms. The mobile monogram does not obscure the portrait or postpone its paint. A small fixed session check prevents a repeat-visit curtain flash; disabled storage still allows the intro to finish. A no-JavaScript fallback removes the curtain.
- Cursor ring growth and marker drawing use transforms. Pointer-driven CSS masks/glows and section colour transitions remain necessary to their requested visual effects. There are no new scroll locks, routes or personal claims.
- Screenshots capture the production build at 1440 × 1000 and 390 × 844. Contact details are masked only in the evidence captures; application content is intact. Automated tests, rather than still images, verify pinning, timing, typing, drag/throw, focus and cleanup.

## Validation

- Production build, TypeScript, lint and the seven content checks pass.
- The expanded browser suite passes **31 of 31** scenarios with no captured browser console errors or page exceptions. New checks exercise first-visit curtain/hero ordering, repeat-visit skipping, the instant dot versus lagged ring, magnetic hero actions, pointer glow, the captured burst origin, Space activation and contact return-to-top. Existing touch, nested-dialog, Escape, focus, clipboard, responsive and runtime reduced-motion checks remain in place.
- Final local production Lighthouse mobile run: performance **94**, accessibility **100**, FCP **0.9s**, LCP **2.9s**, TBT **120ms**, speed index **1.7s**, CLS **0**. This uses simulated mobile throttling at 390 × 844. Earlier runs before deferring unopened dialogs varied from 90 to 92; the final change reduced the initial dialog code. Measurements are environment-specific and do not certify a deployed score.
- The requested visual evidence contains 30 PNGs: 14 effects plus the extra burst stage, at each of the two viewport sizes, with an offline gallery. Screenshots remain outside the public repository.

No configuration values or new contact credentials are required. The existing certification-data limitation from the prior implementation is unchanged.
