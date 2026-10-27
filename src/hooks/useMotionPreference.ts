"use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
