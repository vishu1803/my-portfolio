"use client";
import { RefObject, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "./useMotionPreference";

type Point = { x: number; y: number } | null;
const listeners = new Set<(point: Point) => void>();
let frame = 0;
let point: Point = null;
function flush() {
  frame = 0;
  listeners.forEach((listener) => listener(point));
}
function move(event: PointerEvent) {
  if (event.pointerType !== "mouse") return;
  point = { x: event.clientX, y: event.clientY };
  if (!frame) frame = requestAnimationFrame(flush);
}
function reset() {
  point = null;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  flush();
}
function subscribe(listener: (point: Point) => void) {
  if (!listeners.size) {
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("blur", reset);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("blur", reset);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      point = null;
    }
  };
}

/** One shared, frame-coalesced pointer feed; only visible magnets subscribe. */
export default function useMagnetic(
  ref: RefObject<HTMLElement>,
  strength = 0.3,
  radius = 80,
) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 }),
    sy = useSpring(y, { stiffness: 120, damping: 14 });
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !matchMedia("(pointer:fine)").matches) {
      x.jump(0);
      y.jump(0);
      sx.jump(0);
      sy.jump(0);
      return;
    }
    let unsubscribe: (() => void) | undefined;
    const update = (point: Point) => {
      if (!point) {
        x.set(0);
        y.set(0);
        return;
      }
      const rect = node.getBoundingClientRect();
      const dx = point.x - (rect.left + rect.width / 2 - sx.get());
      const dy = point.y - (rect.top + rect.height / 2 - sy.get());
      const distance = Math.hypot(
        Math.max(0, Math.abs(dx) - rect.width / 2),
        Math.max(0, Math.abs(dy) - rect.height / 2),
      );
      const weight = Math.max(0, 1 - distance / radius);
      x.set(Math.max(-28, Math.min(28, dx * strength * weight)));
      y.set(Math.max(-22, Math.min(22, dy * strength * weight)));
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        unsubscribe ??= subscribe(update);
      } else {
        unsubscribe?.();
        unsubscribe = undefined;
        update(null);
      }
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      unsubscribe?.();
      x.jump(0);
      y.jump(0);
    };
  }, [ref, reduced, strength, radius, x, y, sx, sy]);
  return { x: sx, y: sy };
}
