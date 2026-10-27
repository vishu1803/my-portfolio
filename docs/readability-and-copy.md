# Readability and motion audit — 27 October 2026

Baseline: merged PR #8. Running production-browser checks verified the real torch, connected tug, pinned track, reveal sequences, contact burst and reduced-motion path. No marquee is mounted in the active page; none is added as an unrelated effect. The baseline suite exposed two fixed-duration waits under the current slower runtime; those now wait for dialog removal and the completed scroll destination.

| Effect | Baseline | File |
|---|---|---|
| A1 Smooth scrolling | exists | `motion/SmoothScroll.tsx` |
| A2 Intro curtain | partial: counter absent | `motion/Preloader.tsx` |
| A3 Torch | exists | `interactive/TorchReveal.tsx` |
| A4 Hero / SVG draw | exists | `landing/VideoReferenceHero.tsx` |
| A5 Colour transitions | exists | `motion/ScrollColors.tsx` |
| A6 Nav underline / progress | exists | `landing/Navbar.tsx` |
| A7 Shared reveals | exists | `motion/TextReveals.tsx` |
| A8 Counters | exists | `motion/CountUp.tsx` |
| A9 Project track | exists | `landing/ProjectCaseStudies.tsx` |
| A10 Tilt / pointer glow | exists | `landing/CaseFileVisual.tsx` |
| A11 Toolkit | exists; semantics partial | `landing/ReferenceSkillInterlude.tsx` |
| A12 Interlude | exists; heading semantics partial | `landing/ContactPrelude.tsx` |
| A13 Hire me | exists; word keyboard control partial | `interactive/PhysicsBurst.tsx` |
| A14 Terminal contact | exists | `landing/CollaborateSection.tsx` |
| A15 Cursor / magnets | exists | `motion/Cursor.tsx`, `hooks/useMagnetic.ts` |
| Global pause switch | missing | `motion/AnimationToggle.tsx`, `hooks/useMotionPreference.ts` |

## Intended foreground/background pairs

Ratios use WCAG relative luminance for opaque endpoint colours. These values describe the specified settled states; browser contrast audits additionally check actual rendered styles. Mask labels use a near-opaque black backing. Skill depth fades and captions retain readable contrast rather than fading to decorative grey.

| Section / role | Foreground | Background | Contrast |
|---|---|---|---|
| Hero / cases / interlude / footer | `#eeeae0` | `#101014` | 15.80:1 |
| Dark chapter captions | `#c8c3b8` | `#101014` | 10.81:1 |
| Subject / toolkit / invitation | `#171719` | `#eae8e2` | 14.61:1 |
| Paper captions | `#4d493f` | `#eae8e2` | 7.32:1 |
| Evidence | `#25231d` | `#e5d92d` | 10.69:1 |
| Terminal contact | `#eeeae0` | `#242035` | 13.11:1 |
| Terminal captions | `#c2bacd` | `#242035` | 8.40:1 |
| Email action | `#ffffff` | `#b33229` | 6.17:1 |
| Torch label backing | `#eeeae0` | `#101014` | 15.80:1 |

## Copy changes for review

All project summaries below paraphrase existing source-backed scope. They do not add results, clients or claims of availability. The existing poetic lines remain as secondary copy.

| Project | Previous lead | New plain lead |
|---|---|---|
| Collaborative Task Manager | Shared work. Clear permissions. | Helps teams assign tasks, track progress and control access to shared work. |
| AI-Powered Code Review Assistant | A second set of eyes for code. | Helps developers review GitHub pull requests with automated code-quality feedback. |
| Object Detection Web App | An image becomes an interface. | Lets visitors upload images and inspect object-detection results in the browser. |
| Career Hub | Career stories with a source. | Helps candidates connect repository evidence, resume claims and job-fit analysis. |
| Product Data Explorer | A catalogue worth exploring. | Helps readers browse, search and filter a book catalogue. |
| 3D Portfolio | A portfolio with another dimension. | Introduces my work through an interactive portfolio with 3D assets. |

Other changes: “Inspect details” becomes “Inspect portrait details”; the hero states “Full-stack developer · Gorakhpur, India”; the primary contact action becomes “Email me”. Toolkit descriptions explain interfaces, servers/APIs, data storage, and build tools. Experience, Education and Practice are h3 subsections. Uppercase display words are normal-case DOM text transformed with CSS.

No response-time promise or “Open to roles” claim is published. These need the owner's confirmation. No credentials, URLs or achievements have been invented. The skill list preserves existing skills rather than adding the prompt's example technologies.

## Motion and semantics

The visible Pause animations switch uses the same reactive preference as system reduced motion and Framer Motion. It removes Lenis/pins, stops torch tracking and the rig, bypasses physics/typewriter, and disables CSS loops. Resume restores the shared engine. System reduced motion remains authoritative even when the manual switch is resumed. Word buttons retain descriptive keyboard labels while their decorative visual text is aria-hidden; arrow keys nudge bodies and extend the interaction window.

The existing inline SVG hand and five connected strings are preserved. Three font families remain: condensed display, serif, and system mono. Portrait priority, image sizing, real project links and the email-draft form are preserved.

Dialog focus and keyboard listeners now attach in a layout effect so Escape is ready when a dialog first becomes visible. The word scene holds its transition while a word has keyboard focus. Lenis owns GSAP lag smoothing while active, then restores the default on teardown, keeping wall-clock scroll timing consistent after slow frames.

## Follow-up after PR #9

The hero's opening timeline uses GSAP core independently of ScrollTrigger, so it starts on mobile without waiting for input. Coarse-pointer devices load the scroll plugin on their first interaction; nearby scene observers prepare effects as sections approach the viewport. Desktop project pin spacing initializes eagerly to keep anchor positions reliable. Shared text reveals prepare within 150px instead of measuring every offscreen fragment at startup.

The follow-up also gives dialog titles h2 semantics, hides decorative close symbols, names GitHub/live links, and enforces readable dialog copy and 44px controls. Screenshot descriptions were checked against the actual local assets, including the catalogue loading state and job-board landing page. Browser assertions wait for visible dialogs, completed scroll destinations and removed exit layers instead of assuming fixed transition durations.

The complete follow-up run exposed a chained-dialog focus race: contact could capture the outgoing physics layer rather than the original Hire me control. Contact now passes an explicit button ref to the shared dialog hook for reliable return focus; nested resume dialogs still use their own opener.

## Validation of the retained follow-up

- Production build and its TypeScript validation: passed. Standalone `typecheck`, `lint` and seven content checks: passed.
- Complete production-browser suite: **33/33 passed**, including the actual mask, connected SVG cords, Matter.js bodies, word keyboard nudging, nested dialogs, focus return, Escape, touch, global pause, runtime system preference changes and clean console/page exceptions.
- Responsive suite and final visual audit: every chapter fits at 1440px and 390px; mobile project cases stack. All twelve chapter/viewport combinations had zero horizontal overflow and no fully visible controls below 44px. Desktop/mobile hero and hand/string screenshots were visually reviewed.
- Isolated local-production Lighthouse mobile run (Chrome 153, simulated mobile throttling, 390×844): **performance 78 / accessibility 100**, FCP 1.2s, LCP 1.7s, TBT 860ms, speed index 3.8s and CLS 0.

The requested performance ≥90 gate is **not met**. Accessibility exceeds the ≥95 target and layout shift is zero in that run. Remaining startup JavaScript/main-thread cost needs further work; these results do not certify a production deployment score. Keep the follow-up in draft while that performance requirement remains unresolved.

No additional service configuration is required. A response-time promise and “Open to roles” copy remain unpublished until the owner supplies those facts.
