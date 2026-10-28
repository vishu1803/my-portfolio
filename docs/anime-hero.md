# Anime hero — Method C

## Audit and method, before implementation

The existing portrait is in `VideoReferenceHero.tsx`, inside `.hero-portrait-intro` and `TorchReveal`. Its desktop box is `min(32.5vw, 430px)` with a 4/4.7 aspect ratio; mobile uses the existing second grid column. The old image uses cover / 50% 35%; the portrait sits above the outlined surname while the solid identity has its existing overlap. The flashlight duplicates the accessible dim base and a masked, aria-hidden copy and permanently lights them after discovery. These mechanics and the surrounding layout/content stay.

The owner supplied `1383735.jpg`, a 2048 × 1151 flat image with no depth map or separate layers. Method C is appropriate: animate this exact image through CSS/GSAP, with gradients and one canvas for mist/light/embers. No character is redrawn, no WebGL or new dependency is needed. An optimized WebP lives at `public/hero/art.webp`; the uploaded file is not modified.

Eye centres measured from this upload are approximately (967, 300) and (1070, 307). The midpoint is **49.75% / 26.35%** of the source image. This differs from the earlier Figma reference. Default `--art-pos` is `50% 50%`; cover geometry is calculated from the image dimensions so the glow remains aligned when the landscape image is cropped into the portrait box.

Only the hero portrait slot and the explicitly requested footer credit change. The real portrait remains in About. Existing hero headings, copy, navigation, links, torch controls, other chapters and contact steps remain.

## Implementation and tuning

`AnimeHero.tsx` is the drop-in replacement inside the existing portrait wrapper. `TorchReveal` itself is unchanged. Its two pure image layers inherit one shared GSAP model; a single outer eye beacon and a single lazy particle canvas avoid duplicating animation engines. GSAP owns entrance, breathing, Ken Burns, three mist drifts, eye pulse/rare flare, rim sweep, rare 120ms chromatic offset and scroll glow. Framer owns only the separate hover-light opacity. Pointer updates use one throttled rAF with CSS variables, never React state.

The supplied image is converted to a **225,192-byte WebP**, preserving its 2048 × 1151 dimensions. `next/image` uses priority, responsive sizes and an explicit reserved aspect ratio. Soft edge masks, colour blending, grain already present in the hero and a left/bottom scrim integrate it with the existing ink/red theme. There are no temporary Figma asset URLs in runtime code and no Figma screenshot is used as the artwork.

Tune these on `.anime-hero` in `AnimeHero.css`:

```css
--eye-x: 49.75%;
--eye-y: 26.35%;
--art-pos: 50% 50%;
--grade: .85;
```

Eye percentages refer to the **source image**, not the cropped viewport. The image and eye beacon use the same cover-plane calculation and shared transforms. `--art-pos` changes the crop on resize/reload. The stylesheet comments document ink-red, monochrome-red and original grading presets.

Reduced motion/manual pause show the composed end state without canvas, loops, glitch or parallax; resuming does not replay a completed entrance. Low-power/mobile uses 22 rather than 54 embers, 24 rather than 40 paint updates/sec, no tilt/glitch/flare, and a slow drift. Hidden tabs and offscreen art pause GSAP timelines and cancel the frame loop. All observers, listeners, tweens and frames are cleaned up on unmount. No WebGL/depth-map fallback is needed because Method C uses neither.

## Validation and remaining review

Lint, standalone typecheck, production build, 7/7 content checks and 6/6 geometry/asset tests passed. Geometry checks cover 430/300/165/140px portrait slots, keep both eyes in view without stretching the image, check crop positioning and validate the actual WebP dimensions. Source comparison verifies unchanged hero text/links outside the portrait wrapper; other section components/project data are untouched. Existing browser assertions were updated for the new art and 35% dim base.

Text colours retain bone/ink **15.23:1** and ash/ink **8.02:1**; the footer uses ash on ink. The art scrim and soft lower mask protect the overlapping display name. A rendered composite-contrast review is still required; token calculations are not a measurement of every image-backed pixel.

Fresh 1440/390px recordings, runtime pointer/touch/reduced-motion/tab-hidden checks, browser console and Lighthouse scores are not claimed for this patch. They remain deployment review items; prior previews required Vercel login. No additional layer or depth asset is required.

Owner-supplied attribution is added as a small linked footer line. Please confirm that you have the right to use the supplied third-party artwork on a public, hiring-facing portfolio; attribution alone does not establish permission.
