"use client";
import { useSyncExternalStore } from "react";
let manuallyPaused = false;
export function setMotionPaused(value: boolean) {
  manuallyPaused=value;
  document.documentElement.dataset.motionPaused=String(value);
  window.dispatchEvent(new Event("portfolio:motion"));
}
export const getManualPause = () => manuallyPaused;
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  window.addEventListener("portfolio:motion",notify);
  return () => {media.removeEventListener("change", notify);window.removeEventListener("portfolio:motion",notify);};
};
const snapshot = () => manuallyPaused || window.matchMedia(query).matches;
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
