/** Motion tuning for chapters after the hero. Typography and palette live elsewhere. */
export const EDITORIAL_MOTION = {
  entrance: { duration: .85, stagger: .09, ease: 'power3.out' },
  rail: { media: '(min-width: 768px)', scrub: .55 },
  image: { duration: 1.05, inset: 'inset(0% 0% 100% 0%)' },
  prelude: { travel: 32, sheetTravel: 64 },
} as const;
