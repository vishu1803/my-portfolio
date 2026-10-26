# Vishwanath Nishad — Editorial Portfolio

A cinematic portfolio built in the existing Next.js / React application: an original portrait opening, source-linked project stories, an interactive inspection light, a teaching laboratory and a hand-and-strings collaboration section.

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

- GSAP / ScrollTrigger own the opening typography, portrait mask/parallax, project entrances and illustrated string drawing. Framer Motion owns button feedback and dialog/shared-layout transitions.
- The flashlight reveals an actual second content layer. A keyboard/tap inspection button exposes the same notes in a static accessible panel. Tracking is event-driven and stops when settled, offscreen or hidden; reduced-motion visitors retain the essential imagery.
- Navigation uses section anchors, with a compact 320px layout and a skip link. Dialogs use labelled semantics, initial focus, Tab containment, background isolation, Escape and focus restoration.
- The ivory collaboration section uses an original inline SVG hand and five individually drawn strings. Its button opens a contact dialog and a **Start a Project** email-draft action. Sending happens in the visitor's email app; the site does not claim that a message was delivered.
- The optional Transformer Laboratory is a labelled local teaching simulation, not a model API or real tokenizer. It loads on demand.

## Content

The supplied resume supports personal/experience information. `src/data/caseStudies.ts` is the shared source for case studies, project notes and the reusable project deck. Public repository links support the additional project descriptions; package names do not establish personal proficiency. Unsupported latency, frame-rate, savings and readiness benchmarks are omitted.

See [content sources](docs/portfolio-content.md) and [implementation verification](docs/implementation-verification.md). The original portrait and supplied resume remain local assets. No new contact credentials or service configuration is required.

## Structure

```text
src/App.tsx                         Active page composition and reduced-motion configuration
src/data/caseStudies.ts              Source-linked project content
src/hooks/useAccessibleDialog.ts     Shared dialog lifecycle and keyboard behavior
src/components/interactive/          Reusable flashlight
src/components/landing/              Hero, stories, about, lab launcher, contact and dialogs
src/components/playground/           Local teaching simulation
src/app/globals.css                  Typography, masks, responsive/accessibility foundations
```

GitHub: [vishu1803](https://github.com/vishu1803) · [LinkedIn](https://linkedin.com/in/vishwanath-nishad)
