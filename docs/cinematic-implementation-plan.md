# Cinematic editorial redesign — 27 October 2026

## Audit

- Existing Next.js 16 / React 19 app, one route, Tailwind, GSAP and Framer Motion already installed. No framework replacement or new animation dependency needed.
- Active entry: `src/app/page.tsx` → `src/App.tsx`. Existing project index, project notes, resume viewer and contact form/dialogs must remain available.
- Source of identity and experience: rendered `public/assets/aistudio/software-vishu_1f0ccd66.pdf`. Actual portrait: `public/vishwanath-portrait.jpg`. Six project records: `src/data/caseStudies.ts`.
- Video inspected at nine time points: near-black narrow-type portrait opening, ivory editorial interludes, large mixed serif/condensed headlines, typographic skill rows, black-sleeved ink hand, tension strings and glossy contact button.
- Current problems: Impact not bundled (wide sans-serif fallback), external font requests, exposed skip link, crowded navigation pill, repeated rounded background/skills cards, yellow full-section fill instead of ivory, detached contact string/button geometry.

## Implementation

1. Bundle licensed local Anton, Instrument Serif and Inter fonts; establish shared typography, rules, spacing and accessible navigation.
2. Recompose the opening with the existing portrait, scoped GSAP intro/parallax and real masked photo/annotation reveal.
3. Keep six real projects and existing notes/index/resume interactions; apply varied editorial image/copy layouts.
4. Replace background cards with a concise experience/education record and ivory grouped skill rows.
5. Rebuild the original inline hand illustration and responsive strings/button geometry. Retain the accessible contact overlay and email draft form; add Framer shared-layout transition.
6. Validate desktop, tablet, narrow mobile, touch, keyboard dialogs, reduced motion, all content checks, lint/typecheck and production build. Publish changes to a review branch/PR; leave the live deployment unchanged.

## Tool constraint

External Superdesign authentication and 12ui reference upload were rejected by automatic approval review. No alternative authentication or upload path is used; source implementation and local visual validation continue from the supplied reference.
