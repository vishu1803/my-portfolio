# Gothic ink restyle — constrained scope

Base: merged PR #13 (`3d79b6c`), retaining the owner's 600+ LeetCode update.

This is a font, colour and motion pass. The existing layout grids, section sequence, components, content data, portrait, projects, URLs, SEO, navigation, contact form and modal steps remain. The existing intro is not replaced or extended. No rules page, additional copy, stamps/status claims, margin-note text, new form field, sound toggle or additional overlay step is introduced.

## Fonts and colour

Four self-hosted open-source font families use `next/font/local` with swap: Grenze Gotisch 700 for large normal-case display type; EB Garamond regular, italic and semibold for body/UI and secondary headings; JetBrains Mono for metadata; Homemade Apple only for the existing name in the interlude. Smaller controls/subheadings use serif or mono rather than blackletter. Latin WOFF2 assets total 161,180 bytes; handwriting is not preloaded. Licences accompany the files. No imitation title font or character artwork is used.

The layout receives ink/bone backgrounds, sparse blood-red accents, red portrait duotone, red-black pill/extrusion, ruled-paper background colour layers and red underline styling. The existing favicon geometry is recoloured to match. Existing yellow class names are retained as implementation identifiers, with red paint.

Computed WCAG contrast for solid text/background tokens (sRGB relative luminance):

| Foreground | Background | Ratio |
|---|---|---:|
| Bone `#E9E2D0` | Ink `#0B0B0C` | 15.23:1 |
| Bone | Raised ink `#141416` | 14.24:1 |
| Ash `#A5A5AA` | Ink | 8.02:1 |
| Ash | Raised ink | 7.50:1 |
| Bright red `#FF3B47` | Ink | 5.59:1 |
| Bright red | Raised ink | 5.23:1 |
| Bone | Blood `#B80F1A` | 5.21:1 |
| Deep red `#8F0A12` | Bone | 7.32:1 |
| Paper secondary `#51483E` | Bone | 6.93:1 |

These token calculations are not a substitute for a rendered accessibility audit of every composite/gradient state. Blood on ink is reserved for decorative paint/large display marks; small red text on ink uses bright red. Chapter surfaces stay at their final colours rather than interpolating through low-contrast backgrounds. Three boundary clip-path rules animate independently of the text.

## Motion and ownership

- GSAP adds a restrained page-turn entrance to the existing project layout inside the pinned track. It uses `containerAnimation`, desktop media scoping and the existing context cleanup. Low-power and reduced-motion paths skip the new effect. Framer's visual tilt remains on a different descendant element.
- Existing hero text receives a red ink underline on lights-on. The existing torch ambient layer breathes gently over 4.6 seconds; no fast flicker or new pointer loop is added.
- Existing skill words receive a small paint-only drip/underline hover on fine pointers. Reduced motion, low-power mode and manual pause disable it.
- Existing hand, strings, magnetic controls, contact layout transition, keyboard focus, Escape, resume and physics interactions retain their mechanics. No new animation dependency or UI step is added.

## Verification

`lint`, standalone `typecheck`, production `build`, 7/7 content checks and `git diff --check` pass. Updated existing browser assertions for the new font variables and palette; that browser suite was not rerun.

A before/after built-HTML comparison confirmed identical visible text and ordering: **7 sections, 17 headings, 54 paragraphs, 21 links and 17 controls**. A TypeScript JSX audit also checked unchanged tag structure, text, link/control attributes and expressions in changed components, including lazy modals not present in the initial HTML. Only colour/style attributes were excluded. The six projects and their source data are unchanged.

Rendered desktop/mobile recordings, new Lighthouse scores and live pointer/keyboard regression results are not claimed for this patch. The cloud browser rejects local-file review; preview deployments previously required Vercel authentication. Deployment review remains required. A design CLI preflight was rejected by automatic approval review for attempted external telemetry with an unknown payload; no bypass or retry was used, and the constrained edits were implemented directly.
