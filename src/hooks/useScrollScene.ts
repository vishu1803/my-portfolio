"use client";
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
type Plugin = typeof import("gsap/ScrollTrigger").ScrollTrigger;
let pending: Promise<Plugin> | undefined;
let input: Promise<void> | undefined;
function whenNeeded() {
  if (!matchMedia("(pointer:coarse)").matches || scrollY > 0) return Promise.resolve();
  return (input ??= new Promise<void>((resolve) => {
    const events = ["pointerdown", "keydown", "wheel", "scroll", "portfolio:scroll"];
    const start = () => {
      events.forEach((name) => window.removeEventListener(name, start));
      resolve();
    };
    events.forEach((name) => window.addEventListener(name, start, { passive: true, once: true }));
  }));
}
export function loadScrollTrigger() {
  return (pending ??= whenNeeded().then(()=>import("gsap/ScrollTrigger")).then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  }));
}

/** Shared lazy plugin boundary, scoped context, and cancellation before import resolves. */
export default function useScrollScene<T extends Element>(
  scope: RefObject<T> | undefined,
  enabled: boolean,
  setup: (plugin: Plugin) => void | (() => void),
  eager = false,
) {
  const latest = useRef(setup);
  latest.current = setup;
  useEffect(() => {
    if (!enabled || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let live = true;
    let dispose: (() => void) | undefined;
    const initialize = () => loadScrollTrigger().then((plugin) => {
      if (!live) return;
      let cleanup: void | (() => void);
      const context = gsap.context(() => {
        cleanup = latest.current(plugin);
      }, scope?.current ?? undefined);
      dispose = () => {
        cleanup?.();
        context.revert();
      };
    });
    let observer: IntersectionObserver | undefined;
    if (scope?.current && !eager) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          initialize();
        },
        { rootMargin: "250px 0px" },
      );
      observer.observe(scope.current);
    } else initialize();
    return () => {
      observer?.disconnect();
      live = false;
      dispose?.();
    };
  }, [scope, enabled, eager]);
}
