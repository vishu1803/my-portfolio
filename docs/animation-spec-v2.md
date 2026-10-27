# Animation specification v2

Baseline: merged PR #10, source tree 5304a67b34922c4ea1bf3d5074cf7ab4e1d8c1c6. Browser inspection confirmed the real portrait mask, five connected strings, running tug, contact focus return and Escape. The baseline contact panel was violet and the primary action invoked physics.

| Scene | Baseline | Implementation |
|---|---|---|
| Hero | Partial | TorchReveal: accessible dim base, actual masked content, ambient glow, configurable radius/softness, permanent lights-on by coverage, movement, keyboard or touch; low-power static path |
| About | Partial | GhostResolve offset copies, ClipReveal, existing duotone/parallax and factual bio |
| Projects | Existing sequence | Preserve pin/progress/layouts; reusable image masks; defer hover springs until nearby |
| Toolkit | Existing | Preserve grouped real skills, skew entrances and short accent band |
| Evidence | Palette conflict | Ivory background; preserve resume-backed ledger and count |
| Interlude | Partial | Eight transform-based extrusion layers, ghost resolve and sheet-over pin |
| Collaborate | Partial | Let’s collaborate pill, pointer tilt, focus/hover sweep, connected tension model, existing genuine SVG hand |
| Contact | Palette/flow conflict | Ink panel, direct shared-layout expansion, Start a Project mailto; optional physics remains accessible |
| Global | Existing | Preserve navigation, progress, session intro, pause and reduced-motion cleanup |

GSAP owns opening/scroll timelines, image masks, annotation draw and the rig model. Framer owns button, tilt, magnetic, navigation and overlay UI transforms on separate elements. Pointer tracking writes CSS variables through rAF. New observers, tweens, callbacks and listeners have scoped cleanup.

The portrait and supplied resume were reviewed again. No identity, project facts or contact URLs changed. No contact configuration is needed. Optional `NEXT_PUBLIC_ENABLE_WORD_BURST=true` enables physics before the primary contact action; the default is off. “Play with words” retains the working opt-in interaction independently.

Production build and TypeScript validation passed. Lint and all seven content checks passed. The full browser suite passed 37/37, including responsive layout, permanent lights-on, portrait coverage, touch auto-reveal, low-power fallback, optional physics, direct ink contact, nested focus, Escape, runtime reduced motion and manual pause. Console and page-exception capture was clean. The final isolated local-production Lighthouse mobile run scored **92 performance / 100 accessibility**, with FCP 0.9s, LCP 3.3s, TBT 60ms, speed index 1.9s and CLS 0. Both requested score gates passed. Recordings: [1440px desktop](https://chatgpt.com/library?file_id=libfile_0f4ab229a32c8191bc26848fa7c2451c&account_id=personal) and [390px mobile](https://chatgpt.com/library?file_id=libfile_b429e5a5f4a48191ad7ef670973f1a57&account_id=personal). Desktop/mobile collaboration frames were visually reviewed. Scores describe this local simulated-mobile run, not a production deployment guarantee.
