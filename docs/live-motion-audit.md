# Production motion audit — 28 October 2026

Compared the public production site at https://my-portfolio-kappa-beige-71.vercel.app/ with the supplied 25.5-second phone video, the master prompt, and the later animation v2 specification. Production corresponds to merged PR #11, tree `969bc88080d3fd7fc975d187a28705bd0c99a12a`. The browser viewport was 1363 × 936.

The video is a motion reference. Its other person's identity, violet overlay and full-page yellow chapters are intentionally excluded by the supplied specification.

| Step / approximate video interval | Production observation | Result / source |
|---|---|---|
| Opening, 2–5s and 18–21s | Session curtain, oversized outlined surname, real dim portrait and readable name/role/nav. Enter on “Reveal portrait details” lights the portrait permanently; mask becomes `none`; red ellipse and arrow appear. | Present. `VideoReferenceHero.tsx`, `TorchReveal.tsx`. Free pointer coverage/lag was not exercised in this browser pass. |
| Subject, 5–7s | Ivory chapter, serif ghost text resolves to opacity 1 / blur 0, yellow duotone portrait, marker highlights and factual specification rows. | Present. `EditorialSubject.tsx`, `GhostResolve.tsx`, `ClipReveal.tsx`. Exact video timing is approximate. |
| Projects, 7–9s | Pin starts at scroll 2099; PageDown moves the track horizontally. Keyboard focus on the third project brings it to x=59px. Source screenshots, contributions and real repository links remain visible. | Present. `ProjectCaseStudies.tsx`, `CaseFileVisual.tsx`. |
| Toolkit, 9–11s | Rows enter from opposing sides with skew; grouped skill lists and short rising band exist. **Descriptions computed at 32.712px while actual skills were only 16px.** | Visual gap fixed: old paragraph display rules now target `.toolkit-words`, restoring large skill type and 16px sentence-case descriptions. `globals.css`. |
| Interlude, 11–13s | Eight extrusion layers and desktop pin exist. At scroll 12080, the sheet was already rising while supporting lines were hidden; by scroll 12808 the lines were opaque but covered by the sheet. | Timing gap fixed: remove competing scrubbed opacity on line parents; their existing GhostResolve owns the reveal. Finish extrusion in the first 30.5% of the pin timeline. `ContactPrelude.tsx`. |
| Hand/pill, 0–2s and 13–15s | Ivory surface, real inline-SVG hand and five connected individually drawn strings. Changing path geometry observed; Pause tug changes rig to paused, Resume restores it. Offscreen rig pauses. | Present. `CollaborateSection.tsx`, `PullingHand.tsx`, `useCollaborationRig.ts`. Free pointer drag/tilt was not exercised in this pass. |
| Contact, 15–17s | Enter opens the ink panel directly, with no default word burst. Background is rgb(16,16,20), body scroll locks, focus enters Close dialog. Shift+Tab wraps to the final form button; Tab wraps back. Nested résumé opens, Escape returns focus to View résumé. Contact Escape returns focus to the pill and unlocks scrolling. | Present. Real email/GitHub/LinkedIn and Start a Project mailto match existing source. No message was sent. |

Global Pause animations switches the case track to a vertical block and the rig to its static reduced state. Resume restores Lenis and animation. No broken loaded images, horizontal document overflow, or production-origin console errors appeared in the checked flow.

## Source and validation

This remains the existing Next.js 16 / React 19 / TypeScript application. GSAP owns the opening, scroll sequences and rig model; Framer Motion owns UI interactions and contact layout transition on separate elements. Existing scoped contexts, observers, pointer variables and cleanup remain intact. No portrait, résumé detail, project claim, contact URL or dependency changed. No configuration value is needed.

After both corrections: `npm run lint`, `npm run typecheck`, `npm run test:content` (7/7), `npm run build`, and `git diff --check` pass. The baseline browser suite and Lighthouse results in `animation-spec-v2.md` are earlier local-production evidence, **not reruns for this patch**.

## Remaining verification

The corrections are review changes and are not part of the production site until merged and deployed. Verify their rendered result on the preview/production deployment before marking them visually accepted. This cloud browser exposes no viewport or media-emulation controls, so fresh mobile/tablet touch, OS prefers-reduced-motion and low-power tests were not performed. Its supported interaction API also did not expose free pointer movement/drag. Those checks remain open; the global pause check does not substitute for OS preference testing. Do not interpret this audit as a complete all-device sign-off.
