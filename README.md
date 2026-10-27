# Vishwanath Nishad — Editorial Portfolio

A cinematic portfolio built in the existing Next.js / React application: a torch-lit portrait opening, editorial subject scene, source-linked project sequence and an interactive hand-and-strings invitation.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run typecheck
npm run lint
npm run test:content
npm run build
npm start
```

The lint command runs ESLint through Node on Windows and Unix and fails on errors, warnings or launch failures. Production uses the standard Next.js server, including local image optimization. The portfolio does not call a runtime AI service or send contact-form messages to a backend.

## Experience

- GSAP / ScrollTrigger own opening typography, portrait parallax, desktop pinned case files, ledger rules and illustrated string drawing. Framer Motion owns button feedback, magnetic springs, navigation and dialog transitions. Lenis synchronizes scrolling with ScrollTrigger.
- The reusable torch reveals the actual portrait and yellow backing through a feathered CSS mask. Desktop tracking stops when settled, offscreen or hidden; touch gets slow automatic drift. A keyboard/tap inspection button exposes the complete portrait. Reduced motion shows static end states.
- Five chapter anchors, an active underline, reading progress and a skip link support navigation. A session-aware desktop curtain sequences the hero; repeat visits skip it. Dialogs use labelled semantics, initial focus, Tab containment, background isolation, Escape and focus restoration. Project dialogs and contact render outside transformed or pinned sections.
- The ivory invitation reuses the original inline SVG hand, five individually drawn strings, draggable pill and pause control. Clicking **HIRE ME** releases six lazy-loaded Matter.js words, then opens violet terminal contact. Touch uses a light CSS alternative; reduced motion opens contact directly.
- Contact retains the real links, clipboard feedback, resume viewer and **Start a Project** email-draft form. Sending happens in the visitor's email app; the site does not claim that a message was delivered.

## Content

The supplied resume supports personal/experience information. `src/data/caseStudies.ts` is the shared source for case studies, project notes and the reusable project deck. Public repository links support the additional project descriptions; package names do not establish personal proficiency. Unsupported latency, frame-rate, savings and readiness benchmarks are omitted.

See [content sources](docs/portfolio-content.md), the [redesign plan](docs/cinematic-implementation-plan.md), [initial verification](docs/cinematic-verification.md), [motion correction](docs/motion-reference-correction.md), and the latest [brief follow-up](docs/motion-brief-followup.md), [scene audit](docs/scene-motion-audit.md) / [validation](docs/scene-motion-verification.md). The original portrait and supplied resume remain local assets. No new contact credentials or service configuration is required. Certifications are intentionally empty until verified records are supplied in `src/data/certifications.ts`.

## Structure

```text
src/App.tsx                         Active page composition and reduced-motion configuration
src/data/caseStudies.ts              Source-linked project content
src/hooks/useAccessibleDialog.ts     Shared dialog lifecycle and keyboard behavior
src/hooks/useMotionPreference.ts     Reactive reduced-motion preference
src/hooks/useScrollScene.ts          Shared lazy ScrollTrigger boundary and scene cleanup
src/hooks/useMagnetic.ts             Visible-button proximity springs with one pointer feed
src/components/motion/               Intro, scroll colours, cursor, shared reveals, count-up and typing
src/components/interactive/          Reusable torch and lazy-loaded physics burst
src/components/landing/              Hero, subject, cases, toolkit, evidence, contact and dialogs
src/app/globals.css                  Typography, masks, responsive/accessibility foundations
```

## Browser verification

```sh
npx playwright install chromium
npm run build
npm run test:browser
```

The 37-check browser suite starts its own local production server and covers every scene at 1440px and 390px, the real torch mask, pinned project navigation, image tilt, resume viewer, contact focus/Escape/Tab behavior, five connected SVG strings, pill drag suppression, actual physics bodies, clipboard, emulated touch, repeat-visit intro, Space activation, keyboard word nudging, global pause and live reduced-motion changes. It sends no email. To use an existing browser binary, set `BROWSER_EXECUTABLE_PATH`.

Fonts use `next/font/local` from `public/fonts/` with their OFL licenses; no Google Fonts request is made. GSAP, Framer Motion and Matter.js were existing dependencies; Lenis supplies the coordinated scrolling. Playwright is a development-only verification dependency.

GitHub: [vishu1803](https://github.com/vishu1803) · [LinkedIn](https://linkedin.com/in/vishwanath-nishad)

Readability, contrast pairs and copy changes for review: [readability audit](docs/readability-and-copy.md). The visible Pause animations control uses static end states without overriding system reduced motion.

Animation specification v2: [audit and implementation](docs/animation-spec-v2.md).
