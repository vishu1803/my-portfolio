'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { getManualPause } from './useMotionPreference';
import { isLowPowerDevice } from '../lib/motionQuality';
import { heroMotionMode } from '../config/heroMotion';
const subscribe = (notify: () => void) => {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', notify);
  window.addEventListener('portfolio:motion', notify);
  return () => { media.removeEventListener('change', notify); window.removeEventListener('portfolio:motion', notify); };
};
const reducedSnapshot = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const server = () => false;
export default function useHeroMotion() {
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, server);
  const paused = useSyncExternalStore(subscribe, getManualPause, server);
  const [lowPower, setLowPower] = useState(false);
  const [ready, setReady] = useState(false);
  const [override, setOverride] = useState(false);
  useEffect(() => { setLowPower(isLowPowerDevice()); setReady(true); }, []);
  useEffect(() => {
    const reset = () => setOverride(false);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    media.addEventListener('change', reset);
    window.addEventListener('portfolio:motion', reset);
    return () => { media.removeEventListener('change', reset); window.removeEventListener('portfolio:motion', reset); };
  }, []);
  return { reduced, paused, lowPower, ready, override, setOverride,
    staticMode: !ready || heroMotionMode(reduced, paused, lowPower, override) === 'static' };
}
