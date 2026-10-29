# Hero motion revision

## Before implementation: verified findings

On the deployed PR15 version, the live DOM reported `data-art-motion=running`,
`data-art-quality=full`, a 430 × 505 canvas, three mounted mist layers, eye glow
and grain. Two samples showed changing camera, breathing and eye-pulse values.
The global Pause button was off. The hook contains no localStorage persistence.
The browser inspection API did not expose navigator directly; device hints were
not guessed. The full-quality branch establishes that no motion gate blocked
that inspected browser. This does not establish the user's own OS preference.

The presentation was the problem: 35% dim base, 54 mostly subpixel embers,
4px breathing, a slow camera drift, and an independent parent entrance hiding
the artwork while its own entrance was already running. The old rAF path was
capped at 40fps. The original app preloader remains outside this hero-only scope;
its first-visit delay precedes the hero entrance.

## Scope and implementation

Only the hero composition, artwork motion, diagnostics and hero-specific helpers
change. The single supplied artwork, real About portrait, flashlight component,
other sections, navigation, projects, contact links and footer credit remain.
Existing hero facts are consolidated or moved to the metadata strip. The visible
name is one H1; the decorative duplicate surname is removed; N°01 occurs once.

- `src/config/heroMotion.ts` is the intensity/duration configuration.
- `AnimeHero.tsx` owns one model, one rAF, one canvas and a single animated SVG
  filter. Pure image markup is duplicated by the unchanged flashlight component.
- GSAP owns entrance, camera, breathing, rays, mist, eye/flare and pulse models.
  A single render loop writes transform/opacity/filter/clip-path to their distinct
  wrappers. Framer owns only hover/focus presentation on separate UI elements.
- A dark-luminance SVG mask derives from the supplied image. The face is excluded
  from displacement. Frequency and seed are stable; only a noise offset drifts.
  Its working SVG is 512 × 287.75, composited at the artwork's cover scale.
- Image effects reuse next/image's selected responsive source, avoiding an extra
  full-resolution original download. Both copies share `sizes="100vw"` and the
  existing priority image; canvas/filter initialization is deferred after paint.
- Desktop dolly pins for 120vh on fine pointers at ≥900px width and ≥650px height.
  Zoom originates at the measured face; the mist accelerates, glow intensifies,
  text exits, and a red ink wipe completes the handoff. No pin on mobile, reduced
  motion or low-power devices. Keyboard focus restores the faded CTA block.
- Touch gets automatic drift, 40 particles, gradient mist without additional blur,
  and no displacement, flare or chromatic burst. Desktop uses 96 particles.
- Offscreen/hidden-tab observers pause the model timelines and cancel the rAF.
  Cleanup restores styles, disconnects observers, removes listeners and kills
  timelines/ScrollTriggers. SVG and canvas are removed for the static state.

## Motion preferences and diagnosis

`?debug=motion` is an explicitly opted-in developer panel, available on preview
and production URLs so the deployed site can be diagnosed. It is never displayed
on a normal visit. It shows OS reduced motion, global pause, low power, session
opt-in, mounted layers, rAF status, measured hero-loop FPS and SVG updates/s.
FPS is measured from real callbacks; it is not a configured target or compositor
benchmark, and a headless sample is not a mid-range laptop performance claim.

OS reduced motion, global pause and low-power hints produce a composed still.
The visible button allows a hero-only opt-in held in memory for this mount.
It does not change OS settings, localStorage or other sections' preferences.
A later OS preference/global Pause event revokes the opt-in. A separate Pause
hero action is available while opted in. Pinning and flash-like events stay off
for OS-reduced/low-power opt-ins.

Sustained measured frame pressure invokes an additional, visible `reduced`
effects budget: it drops the expensive filter/rays/pointer-light/glitch and mist
blur and extra image filtering/blending while preserving camera movement, eyes, mist and particles. The panel
reports this fallback rather than silently claiming the full effect is running.

## Tuning

Source image: 2048 × 1151. `--eye-x:49.75%`, `--eye-y:26.35%` remain the measured
midpoint of the two eyes. `--art-pos:50% 50%` controls cover positioning and
`--grade:.85` controls the red grade (0 restores the source treatment).
CSS container units provide the exact cover geometry before hydration;
ResizeObserver supplies matching face origins and image/eye positioning.

## Contrast

| Text | Background | WCAG ratio |
| --- | --- | ---: |
| Bone #E9E2D0 | Ink #0B0B0C | 15.23:1 |
| Ash #A5A5AA | Ink #0B0B0C | 8.02:1 |
| Bright red #FF3B47 | Ink #0B0B0C | 5.59:1 |

A left/bottom scrim protects the image-backed text. Lighthouse did not flag hero
text contrast in the rendered checks. Its existing Toolkit paragraph contrast
finding (3.18:1) is outside this change and has not been silently restyled.

## Verification status

Lint, standalone typecheck, production build, 7 project-content checks and 14
motion-gate/geometry/asset checks pass. The latter include source-eye geometry
and the 1440px/390px CSS cover fallback, plus default and explicit-opt-in paths
for all three motion gates. No extra dependency is introduced.

The acceptance checklist is not complete until actual runtime recordings,
keyboard/touch/pause/offscreen interactions and performance targets are verified.
Do not interpret a successful build, a filmstrip, or the tests above as those
interaction checks. Lighthouse measurements and remaining blockers are recorded
in the PR; do not merge based on compilation alone.

## Latest local Lighthouse samples

Lighthouse 13.5, production build, 1440 × 960 and 390 × 844, DPR1.
The read-only motion gatherer samples before full-page capture; full-page capture
is disabled because its temporary viewport resize distorted later FPS readings.
These are headless samples, not a physical laptop/device certification.

| Mode | Performance | Accessibility | Best practices | Debug FPS | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop, motion enabled | 93 | 96 | 100 | 30 | 0 |
| Mobile, motion enabled | 85 | 96 | 100 | 60 | 0.002 |
| Desktop, OS reduced motion | 99 | 96 | 100 | 0 (static) | 0 |
| Mobile, OS reduced motion | 87 | 96 | 100 | 0 (static) | 0.002 |

Both animated samples entered the measured reduced-effects budget. Full
shadow/ray performance is therefore not certified by these numbers. Reduced
motion removes the canvas and animated SVG, with the H1 visible and no overflow.
The mobile responsive source was 640px; desktop was 1920px, rather than 3840px.
The 96 accessibility score includes the unchanged Toolkit contrast finding.

**Not ready to merge:** the requested mobile performance ≥90 and desktop ≥50fps
are not met by these samples. Real desktop/touch/keyboard/override/pause/hidden-tab
interaction recordings and a deployed console check remain pending. The local
Lighthouse console-error audit passes, but is not a deployed console inspection.
