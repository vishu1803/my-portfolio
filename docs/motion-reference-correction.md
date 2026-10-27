# Reference motion correction — 27 October 2026

## What the live comparison found

The production site was already running merged PR #5. The issue was in the implementation, rather than an old deployment or a reduced-motion setting: the inspected live browser reported reduced motion disabled.

The supplied 25.5-second video was inspected as a sequence, including its opening contact scene, hero illumination, project transitions, “one last thing” interlude, hand pull, word reveal and contact surface. The earlier acceptance checks established working controls; they did not establish the reference's choreography.

| Live gap | Correction |
|---|---|
| A two-pixel hand movement repeated once, then a static scene | A spring entrance followed by a visible 4.8-second tug cycle while the scene is in view |
| Pointer translated the whole string group separately from the hand and pill | One model computes fingertip positions, rotating hand, pill displacement and five cubic cord paths together |
| Hover was only a small tilt | Build / Hello / Together / Let’s Talk reveal around the pill; hover holds the automatic cycle steady for a stable click target |
| No direct tension interaction | Short horizontal Framer drag, attached cord endpoints and spring return; drag release does not open contact |
| Contact appeared as a fade rather than a connected surface | Fixed-layout coordinate root and spring shared-layout transition into the existing accessible overlay |
| Oversized contact scene and weak transition into it | Smaller scene/headline spacing and a short, scroll-linked “one last thing” interlude |
| One-off project fades | Retained entrances plus scroll-linked image movement on desktop |
| Hero caption collision at the actual 1363×936 live viewport | Responsive vertical placement; a bottom-relative layout reserves separation above the name/byline, including shorter laptops |

## Implementation

`src/hooks/useCollaborationRig.ts` owns the connected scene. GSAP animates a small model, with one scheduled paint per frame updating SVG cord paths and the decorative wrapper. Framer owns the actual button's drag/hover and contact overlay. Geometry is measured on resize rather than reading layout every frame. Cord endpoints account for the button's actual drag value and responsive SVG coordinates.

The automatic cycle pauses offscreen, while the document is hidden, under the overlay and on button hover/focus. A visible Pause tug / Resume tug control is provided. Save-data/low-memory devices omit the continuous cycle. Reduced motion retains a static scene and usable contact controls. Timelines, observers, visibility listeners, subscriptions and pending animation frames have cleanup.

## Validation

- Sampled the rendered entrance and ongoing cycle over eight frames, including after the entrance had finished. Button wrapper displacement changed from +85px through spring overshoot, then through roughly -1px to -16px and back during the resting tug.
- Recorded hover, drag and contact states. The first drag probe exposed an accidental dialog opening; the corrected probe recorded zero dialogs after drag release and one after an ordinary click.
- Browser tests now inspect ongoing motion, pause behavior, real SVG endpoints against button bounds, pointer deformation, hover word visibility, drag return/no accidental open, offscreen pause/resume, actual touch drag and hero-caption separation.
- Existing checks continue covering the flashlight, six projects, project/resume dialogs, keyboard isolation/Tab/Escape/focus restoration, four viewport widths, reduced motion and production console errors.

The complete motion/browser run passed **27 tests**, with zero captured production console or page errors. Typecheck, zero-warning lint, 7 source-content checks and the production build passed. An additional focused responsive/reduced-motion pass covers the final laptop-spacing correction. The reduced-motion first-load check also caught a server/client markup mismatch in the new pause control; rendering stable markup and using the media query to hide that control corrected it.

The reproducible suite is `npm run build && npm run test:browser` after `npx playwright install chromium`. See its final run results in the PR. No new runtime dependency or contact configuration was added.

This correction is prepared on a review branch. It is not a claim that the production URL changed before the branch is merged, nor that subjective reference matching is complete. Physical-device and other-browser review remain separate from Chromium emulation.
