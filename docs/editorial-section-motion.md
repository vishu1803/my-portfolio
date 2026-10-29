# Editorial motion: reference audit and implementation

Scope: the chapters after the hero. Hero video/scroll-start policy, flashlight, fonts, palette, SEO, source data, other copy/links and footer artwork credit are preserved. This PR adds code and documentation only, with no media or dependencies.

## Browser audit before changes

Audited production at `https://my-portfolio-kappa-beige-71.vercel.app/` on 29 October 2026. These findings describe the deployed main branch, not this unpublished implementation.

| Reference scene | Actual browser finding | Implementation |
| --- | --- | --- |
| Navigation | Numbered links navigate; active underline follows them. Pause is already a bottom-right 44px pill. | Keep controls; retain measured header offsets and remove false Subject-current state in the hero. |
| Hero | One video and one `N° 01` found. Poster and existing torch are present. | Preserve the existing hero rather than replace scroll-start playback with autoplay or add another pin. |
| Subject | Heading, bio and portrait have opacity 1, filter none and clip-path none after anchor navigation. Ghost-copy count is zero. The heading repeats the hero tagline. | Restore missing effects and replace only the repeated statement with the factual wording below. |
| Case files | Horizontal track moves. The primary action initially moved the rail and required retry; then project notes opened with real repository/live links. Escape returned focus. The action itself has no href. | Keyboard-only rail alignment; stable controls; real repository href with progressive enhancement to the existing notes dialog. Modifier-click/native navigation retains the repository target. |
| Toolkit | Four real skill groups render in lists; the title and descriptions are readable. | Alternating entrances, slight entry skew/rotation, restrained readable hover dim and existing rising accent band. |
| Record | Experience, education and 600+ practice ledger render with dates and rules. | Retain factual figures and scoped ledger/count entrances; no new certifications. |
| Interlude | A real heading and eight copies exist. The parent of the copies already has aria-hidden=true. The section still sits in a desktop pin spacer. | Remove that extra pin; use a 1–8px animated extrusion and rising contact sheet. Each decorative copy is explicitly hidden. |
| Hire me | Inline SVG hand, five cord paths and glossy pill exist. | Preserve their rig, drawing, sway, drag, hover and Pause tug. Keep optional word burst off by default. |
| Contact | Direct pill click opens contact. Close receives focus; Shift+Tab wraps to the final submit button; Tab wraps to Close. Escape returns focus to the pill and releases body scrolling. Lenis is running. | Preserve verified behavior; use the requested .65s curve for the layout morph, explicit 80ms action stagger and a copy-label flip. |

The console messages observed were browser-extension metadata errors, not application errors. They are not reported as portfolio failures.

## Subject diagnosis and repair

A currently stuck hidden Subject was **not reproduced**. Its missing reference motion is explained by the deployed component: GhostResolve/MarkerSweep/portrait parallax were removed, leaving ordinary visible text and short translations. This is different from proving a failed or duplicated ScrollTrigger.

The previous reusable GhostResolve also replaced the text DOM when its readiness state changed. The replacement uses stable server-rendered letter markup and one accessible text copy. It begins only when visible, leaves content readable when static and cleans up its observer/timeline. Shared reveals no longer pre-hide content in a separate preparation observer. Magnetic controls and project frames likewise retain their actual link/image DOM while optional Framer controllers mount separately; pointer effects allocate no springs on touch devices.

Subject now uses:

- A ghost-to-crisp `The subject.` title: 14px blur, 6px ghost offset, 30ms letter stagger and 1.1s reveal.
- Separately revealed statement and italic line, using existing font families.
- Existing portrait and red duotone, masked scale 1.15→1, torn edge, and desktop-only -60px image parallax on a different element from the scale animation.
- Four 0.8s marker underlines with 120ms offsets; original bio text retained.
- Four spec rows, 80ms stagger and individual drawing rules.

Exact replacement statement, derived from the existing bio and requested in the supplied notes:

> Connecting interfaces to the systems behind them.
>
> Authenticated APIs, relational data, interactive apps.

No other visible prose is rewritten. The inaccurate yellow-duotone portrait alt is corrected to `Portrait of Vishwanath Nishad`.

## Scroll lifecycle and diagnostics

Open `/?debug=scroll` to enable ScrollTrigger markers and a corner panel containing viewport, total/active trigger counts, pin-spacer count, duplicate explicit IDs and active trigger ranges/progress. A refresh prints the trigger table to the console. The normal page has no debug panel.

Initialization is guarded once per effect; scoped contexts, matchMedia, observers, timers and listeners are reverted. Fonts, image load and pageshow events request a debounced refresh. Native reduced motion, manual pause, data saver and low-power hints select composed static chapter states. Existing hero gates remain unchanged.

The desktop case rail is limited to fine-pointer windows at least 1024×820 so its content fits. Smaller/shorter/touch/static layouts use native vertical case files. Jumps use measured card offsets, not equal index fractions. The existing drawing edge handles section boundaries; background colours are not interpolated through unreadable intermediate text/background combinations.

Pause tug intent is buffered while the rig loads and replayed after static-mode teardown, so a reconstruction cannot silently restart a user-paused tug. Three regression checks cover these lifecycle cases.

Explicit ID duplicates should be absent. Counts may legitimately change when a new lazy scene initializes, a once-only trigger completes, a breakpoint changes or motion is toggled. Compare the same visited scenes and viewport when checking rerender stability; this is not yet a measured runtime pass on the protected preview.

## Contrast of the retained palette

Calculated WCAG relative-luminance ratios for flat surfaces:

| Foreground | Background | Ratio |
| --- | --- | --- |
| #E9E2D0 | #0B0B0C | 15.23:1 |
| #0B0B0C | #E9E2D0 | 15.23:1 |
| #51483E | #E9E2D0 | 6.93:1 |
| #A5A5AA | #0B0B0C | 8.02:1 |
| #FF3B47 | #0B0B0C | 5.59:1 |
| #8F0A12 | #E9E2D0 | 7.32:1 |
| Bone at 72% opacity | #0B0B0C | 8.08:1 |

These pairs do not establish every pixel's contrast over the unchanged hero/video. Check that composition visually as part of final review.

## Validation and limits

- Lint, TypeScript and the final production build pass.
- Content, case rail and existing hero playback checks: 19/19 passed.
- Rig intent lifecycle checks: 3/3 passed.
- New emitted-HTML checks: 6/6 passed. They cover stable hidden ghost copies, factual nonduplicate statement, six real hrefs, portrait/markers/specs, one accessible interlude heading, no normal debug panel, and the preserved single hero video/chapter number.
- Git comparison confirms hero, flashlight, global type/palette, SEO layout, source data and public assets remain unchanged.
- Local Lighthouse, final source, with simulated throttling and `?debug=motion`: normal desktop 98 performance / 100 accessibility; normal mobile 83 / 100; reduced-motion desktop 99 / 100; reduced-motion mobile 85 / 100. Best practices and the console-error audit pass for all four. Desktop CLS 0; mobile CLS 0.002.
- Normal desktop LCP 0.9s, TBT 0ms; normal mobile LCP 4.0s, TBT 210ms. Mobile remains below the performance target of 90. The unchanged hero poster is flagged for image delivery; further performance work is still needed.
- Reduced samples show video state static, no video source, title opacity 1, nonzero portrait dimensions, all four specs, six real hrefs and no horizontal overflow. These are initial-state samples, not full interaction tests.
- All four headless profiles use the vertical case fallback. They do not validate fine-pointer pinning, scrolling, runtime trigger stability or animation FPS. Results are in `docs/editorial-motion-results.json`.

The managed local preview launcher appends unsupported Vite arguments to Next.js. Its failure was not worked around by changing application scripts. Vercel branch preview previously redirected to sign-in. No authentication protection was weakened. Interactive checks of the updated branch, runtime trigger stability, 1440px/390px recordings, touch dragging and full reduced-motion UI review remain pending accessible preview. This PR stays a draft; production is not changed by pushing this branch.

## Latest control and rail adjustment

The case rail now runs at widths of 768px and above, without a tall-window or fine-pointer requirement. Taller case content remains in normal flow until its bottom reaches the viewport, then pins for the horizontal sequence; short screens do not clip the project actions. Below 768px, cases remain vertically stacked. Reduced-motion, manual-pause and low-power static fallbacks remain available.

The hero portrait-reveal button, hero-only override buttons, blocked-play button, separate Pause tug / Play with words controls and six case-jump buttons are removed. The single global Pause animations / Resume animations toggle controls the video and chapter/hand loops. Pointer/touch torch reveal and automatic lights-on after scrolling remain. Browser-blocked video playback retains the poster.

Earlier performance measurements in this document describe the preceding revision. This adjustment is validated separately; interactive protected-preview review remains pending.

Control-cleanup validation: lint, typecheck, production build and 29 checks pass. Lighthouse initial samples at 1440×960 confirm rail layout; 390×844 confirms vertical case layout with no horizontal overflow. Both report CLS 0 and accessibility 100; performance is 98 desktop / 84 mobile. The mobile performance target remains unmet. These layout samples do not replace a manual touch/scroll interaction review.
