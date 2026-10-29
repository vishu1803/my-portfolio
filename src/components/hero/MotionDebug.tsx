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
      const hero = scope.current;
      const node = hero?.querySelector<HTMLElement>('[data-hero-video]');
      const media = hero?.querySelector<HTMLVideoElement>('video');
      setReading([
        `Video state: ${node?.dataset.videoState ?? 'poster'}`,
        `Time: ${media?.currentTime.toFixed(2) ?? '0.00'}s`,
        `Paused: ${media?.paused ?? true}`,
        `Source attached: ${media?.getAttribute('src') ? 'yes' : 'no'}`,
        `Ready state: ${media?.readyState ?? 0}`,
        `Viewport: ${innerWidth} × ${innerHeight}`,
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
