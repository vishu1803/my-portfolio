"use client";
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
type Plugin = typeof import("gsap/ScrollTrigger").ScrollTrigger;
let pending: Promise<Plugin> | undefined;
export function loadScrollTrigger() {
  return (pending ??= import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  }));
}

/** Shared lazy plugin boundary, scoped context, and cancellation before import resolves. */
export default function useScrollScene<T extends Element>(
  scope: RefObject<T> | undefined,
  enabled: boolean,
  setup: (plugin: Plugin) => void | (() => void),
) {
  const latest = useRef(setup);
  latest.current = setup;
  useEffect(() => {
    if (!enabled || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let live = true;
    let dispose: (() => void) | undefined;
    loadScrollTrigger().then((plugin) => {
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
    return () => {
      live = false;
      dispose?.();
    };
  }, [scope, enabled]);
}
