'use client';
import { useSyncExternalStore } from 'react';
import useMotionPreference from './useMotionPreference';
import { isLowPowerDevice } from '../lib/motionQuality';

const subscribe = (notify: () => void) => {
  const connection = (navigator as Navigator & {connection?: EventTarget}).connection;
  connection?.addEventListener('change', notify);
  return () => connection?.removeEventListener('change', notify);
};
const server = () => false;

/** Normal devices need no post-hydration state update in every chapter component. */
export default function useChapterMotion() {
  const reduced = useMotionPreference();
  const limited = useSyncExternalStore(subscribe, isLowPowerDevice, server);
  return reduced || limited;
}
