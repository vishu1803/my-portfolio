'use client';
import { RefObject, useEffect, useState } from 'react';
import type useHeroMotion from '../../hooks/useHeroMotion';
type State = ReturnType<typeof useHeroMotion>;
/** Developer opt-in, including preview/production URLs. Never mounted without ?debug=motion. */
export default function MotionDebug({ scope, state }: { scope: RefObject<HTMLElement>; state: State }) {
  const [enabled, setEnabled] = useState(false);
  const [reading, setReading] = useState('Waiting for first sample…');
  useEffect(() => { setEnabled(new URLSearchParams(location.search).get('debug') === 'motion'); }, []);
  useEffect(() => {
    if (!enabled) return;
    const read = () => {
      const hero = scope.current, art = hero?.querySelector<HTMLElement>('[data-anime-hero]');
      const layers = ['mist', 'embers', 'eyes', 'parallax', 'grain', 'shadow', 'rays'];
      setReading([
        `rAF: ${art?.dataset.rafRunning === 'true' ? 'yes' : 'no'}`,
        `FPS: ${art?.dataset.fps ?? '0'} (hero loop)`,
        `SVG updates/s: ${art?.dataset.filterFps ?? '0'}`,
        `State: ${art?.dataset.artMotion ?? 'initializing'}`,
        `Effects budget: ${art?.dataset.effectsBudget ?? 'static'}`,
        `Viewport: ${innerWidth} × ${innerHeight}`,
        ...layers.map(layer => { const el = hero?.querySelector(`[data-layer="${layer}"]`); return `${layer}: ${el ? `mounted${el.getClientRects().length ? '' : ' (hidden)'}` : 'not mounted'}`; }),
      ].join('\n'));
    };
    read(); const timer = window.setInterval(read, 1000);
    return () => clearInterval(timer);
  }, [enabled, scope]);
  if (!enabled) return null;
  return <aside className="hero-motion-debug" aria-label="Hero motion diagnostics">
    <strong>MOTION / DEVELOPER VIEW</strong>
    <pre>{`Reduced motion: ${state.reduced ? 'on' : 'off'}\nPaused: ${state.paused ? 'on' : 'off'}\nLow power: ${state.lowPower ? 'on' : 'off'}\nSession override: ${state.override ? 'on' : 'off'}\n${reading}`}</pre>
  </aside>;
}
