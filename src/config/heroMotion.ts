/** Hero-only tuning. Durations are seconds; parallax distances are CSS pixels. */
export const HERO_MOTION = {
  camera: { from: 1, to: 1.10, x: '-1.5%', y: '1%', duration: 24 },
  breathing: { scale: 1.012, lift: -6, duration: 4 },
  shadow: { frequency: .009, scale: 22, fps: 30, drift: 16, opacity: .55 },
  rays: { opacity: .24, rotation: 6, duration: 18 },
  eye: { min: .4, max: 1, scaleMin: .9, scaleMax: 1.15, duration: 1.1, flareDelay: 6.5, flareDuration: .35 },
  mist: { durations: [28, 42, 65], opacities: [.38, .25, .45], blur: [24, 32, 36] },
  particles: { count: 96, mobileCount: 40, minSize: 1, maxSize: 4, largeSize: 7, dpr: 1.5 },
  pointer: { background: 8, mist: 14, figure: 18, particles: 26, tilt: 4, lerp: .08, light: .5 },
  pulse: { interval: 12, streakDuration: .4, splitDuration: .12, punch: 1.03 },
  entrance: { eyes: .3, art: .8, atmosphere: 1.4, particles: 1.8, text: 2.2 },
  scroll: { pinVh: 120, zoom: 1.35, scrub: .7 },
} as const;

export function heroMotionMode(reduced: boolean, paused: boolean, lowPower: boolean, override: boolean) {
  return (paused || reduced || lowPower) && !override ? 'static' : 'running';
}
