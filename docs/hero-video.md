# Scroll-start hero background

## Required manual assets

This PR contains code and documentation only. Download the supplied `hero-assets.zip` separately and extract it at the repository root. It contains:

```text
public/hero/animation.mp4
public/hero/video-poster.webp
```

Commit both files on this branch before deploying the final experience. Paths and filename case must match exactly. The MP4 is an optimized copy of the user-supplied animation: 1280 × 720, 24 fps, 8 seconds, 1,871,125 bytes, without audio. The WebP is its exact first frame (95,652 bytes). No media binaries are included in this PR.

Until those files are added, the existing `/hero/art.webp` is the poster fallback and the moving background will be unavailable. The artwork credit remains unchanged in the footer.

## Findings and changes

The previous hero used procedural effects around a flat image. Its desktop ScrollTrigger pinned the hero for an additional 120vh and faded the text before handing off to Subject. Subject also combined split/blur text reveals with image reveal and scrub transforms. These layers contributed to the awkward transition.

- The supplied animation now fills the hero using `object-fit: cover`, with responsive cropping and scrims. The existing name styling, text, links and page order are preserved.
- The first-frame poster is initially visible. There is no video source or autoplay in the initial markup; scrolling more than 8px within the visible hero attaches the source and starts muted, inline, looping playback. This starts normal playback, not frame-by-frame scroll scrubbing.
- One video instance sits inside the existing flashlight reveal. Scrolling lights the full artwork. No floating image/camera transform is added.
- Hidden tabs, offscreen hero, reduced motion, low-power and manual pause states stop playback. Returning to the top restores the poster and removes the source. Existing session motion override and pause controls remain available. A blocked-play fallback button supports browsers that reject muted playback.
- The long hero pin is removed. Subject uses native document flow and a short, non-hiding entrance translation. Direct anchor navigation stays readable. Fixed-header scroll margins apply to Home and Subject.
- `?debug=motion` reports motion gates, playback state, source attachment, ready state, video time and viewport. Event listeners, intersection observers and GSAP resources are cleaned up.

## Validation

Checks run with the separately supplied assets installed locally:

- Lint, TypeScript and production build passed.
- Content checks: 7/7; playback policy checks: 7/7.
- Built markup: one muted, inline video; no initial source, no autoplay, preload `none`.
- Lighthouse desktop (1440 × 960): performance 99, accessibility 100, CLS 0.
- Lighthouse mobile (390 × 844): performance 87, accessibility 100, CLS 0.002. The requested mobile performance target of 90 is not yet met.
- Initial rendered samples show poster state, current time zero, paused playback, no source, no horizontal overflow and no Subject split-letter layers. Desktop Subject starts after one viewport rather than an extra pin.

The new branch has not received a deployed interactive scroll/playback review. Actual playback/time advancement, touch scrolling and reduced-motion UI need final browser review after the manual assets are committed. No FPS or recording claim is made for this video implementation. Existing production inspection does not validate this unpublished change.
