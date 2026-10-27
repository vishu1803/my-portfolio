# Scene motion verification — 27 October 2026

Implementation follows the supplied scene-by-scene brief, building on merged PRs #5 and #6. This records local production-build validation; it does not certify the current main-branch deployment.

## Results

| Check | Result |
|---|---|
| `npm run build` | Pass — Next.js production compilation, TypeScript and static generation |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass |
| `npm run test:content` | 7 passed, 0 failed |
| `npm run test:browser` | 28 passed, 0 failed; no captured browser console errors or page exceptions |
| Lighthouse, mobile simulated throttling | Performance 91; accessibility 100 |
| Lighthouse timing | FCP 0.9s; LCP 3.3s; TBT 140ms; speed index 1.6s; CLS 0 |

Lighthouse ran against the local production server in headless Chromium at 390 × 844, independently of other browser suites. Scores vary with hardware, network, cache and deployment. The audit still identifies main-thread work, framework legacy polyfills and the render-blocking stylesheet as improvement opportunities. The measured score is not a promise of an identical deployed score.

## Behavior covered

- Real masked portrait/yellow layer, initial desktop darkness, pointer reveal, keyboard inspection, touch drift and static reduced-motion state.
- Five chapter navigation, active underline, reading progress and Lenis anchors. Numeric anchor targets account for header spacing without subtracting CSS scroll padding twice.
- Subject letter/word reveals, duotone portrait, marker sweeps and resume-backed facts.
- Desktop pinned horizontal cases, progress and active number; keyboard focus scrolls each case into view. Six actual project images and links remain present. Hover tilt and independent depth labels respond.
- Project notes/index dialogs render outside the pinned scene. Decorative numbers cannot intercept pointer events. Nested resume and contact overlays preserve their focus order.
- Toolkit groups, lead marker, rising yellow band, evidence ledger, truthful counter and desktop interlude.
- Connected fingertip/string/pill endpoints, pause behavior, pointer response, drag spring and suppression of clicks after dragging.
- Six running Matter.js bodies, Escape cancellation, timed contact transition and touch fallback. Engine, frames, timers, contexts, triggers and listeners are disposed. Physics loads only when used on desktop.
- Contact labels, real links, keyboard trap, clipboard write, email-draft form, Escape and focus restoration. No message is sent by the site.
- Every scene at 1440 × 1000 and 390 × 844 without horizontal overflow. Below 768px, cases stack vertically. Both initial reduced motion and changing the preference at runtime remove Lenis/pins and use static/direct alternatives.

Screenshots were inspected locally for layout and are not included as public repository assets. Automated touch emulation supplements desktop browser testing; physical-device testing remains advisable after deployment.

## Content and configuration

Existing identity, portrait, resume, project sources, email, LinkedIn and GitHub remain authoritative. Counters use only the existing 300+ practice claim and the actual six case studies. No reference CGPA, invented percentages, clients or credentials were added.

`src/data/certifications.ts` is deliberately empty. The filterable animated component is ready for verified certification records and stays absent until those are provided. No contact-service credentials are required. The form opens a prefilled draft in the visitor's email app.

## Ownership and cleanup

GSAP owns scroll timelines, image treatment, letter/word entrances, SVG drawing and scene backgrounds in scoped contexts. Framer Motion owns interactive transforms and UI transitions on separate wrappers. The existing collaboration rig retains its own connected coordinate model. Matter.js owns only the brief desktop word scene. A reactive external-store motion preference tears down active systems when the OS preference changes.

The root font variables are attached to `html`, so CSS typography tokens resolve for both the page and portals. Coarse-pointer portrait paint is visible before hydration to avoid a JavaScript-dependent LCP delay; its CSS mask remains active.
