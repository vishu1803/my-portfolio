# Editorial section motion

Scope: chapters after the hero and their navigation. Hero animation, fonts, palette, existing copy, links, data, section order and artwork are retained. This change adds no media or dependencies.

## Reference review

Reviewed the supplied 25.5-second phone recording and inspected production through its Cases, Toolkit and Contact navigation. The reference uses a horizontal project folio, masked text/image entrances, a typographic closing interlude and a tethered invitation button opening contact details. These patterns guide the motion within the portfolio's existing visual system.

Production already contains these sections. The implementation refines their choreography and addresses friction in the existing transitions rather than introducing replacement pages.

## Changes

- Subject: stronger portrait mask and short entrances while direct navigation stays readable.
- Cases: sequential image masks and independent copy movement; measured card offsets for jumps and active tracking. Six numbered controls reuse the existing case titles as accessible labels. Only keyboard focus automatically aligns a case, so a pointer click cannot unexpectedly move its target.
- The horizontal rail runs on fine-pointer screens at least 1024 × 820. Touch, shorter windows, reduced motion, manual pause and low-power fallback retain readable vertical case files. Removed velocity blur/skew on the section heading.
- Project image trees stay mounted when pointer capabilities/preferences change. GSAP animates the outer image mask; Framer Motion owns the inner pointer tilt and UI feedback.
- Toolkit: staggered category/description/word-row reveals and drawing rules. Hover no longer dims the other skills.
- Record: drawing rules, staggered copy and masked date/value entrances. Existing count-up remains independent.
- Closing interlude: clipped line entrances and modest desktop depth without another pinned viewport. Contact enters as a rising sheet; the existing hand, strings, drag, overlay, form and links remain available. Reduced motion removes the shared-layout morph.
- Footer: short clipped name entrance. Navigation uses the measured header height for anchor offsets, and Subject no longer incorrectly appears current while the visitor is in the hero.
- Tuning: `src/config/editorialMotion.ts`. Scoped GSAP contexts, media queries, observers and listeners revert on unmount/preference changes.

## Validation

- Lint, TypeScript and the final production build passed.
- Existing content and hero playback policy checks: 14/14 passed.
- Case rail policy checks: 5/5 passed, covering unequal offsets, final-panel clamping, reverse scrolling, midpoint ties and zero-distance layouts.
- Git comparison confirms the hero, flashlight, global stylesheet, font configuration, data and public media are unchanged.

Browser validation of the changed branch is pending deployment. Managed local preview is unavailable: its launcher appends Vite-only `--host`/`--strictPort` arguments to this Next.js project. Application scripts were not changed to compensate. The production browser review does not verify unpublished changes. No new FPS, Lighthouse or recording claim is made.

Before merging, review the branch preview at desktop and mobile widths: scroll through all six cases in both directions; use numbered controls and keyboard Tab; check short-screen vertical flow; follow every chapter anchor; toggle reduced motion/pause; open Contact and close with Escape; verify focus returns and scrolling resumes.
