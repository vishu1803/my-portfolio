"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import Lenis from "lenis";
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  useScrollScene(undefined, !reduced, (ScrollTrigger) => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      prevent: (node) =>
        !!node.closest(
          '[role="dialog"],[data-lenis-prevent],input,textarea,select',
        ),
    });
    document.documentElement.dataset.scrollEngine = "lenis";
    const tick = (time: number) => {
      if (!document.hidden) lenis.raf(time * 1000);
    };
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    gsap.ticker.add(tick);
    const syncLock = () => {
      if (document.body.style.overflow === "hidden" || document.hidden)
        lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    document.addEventListener("visibilitychange", syncLock);
    const anchor = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!link) return;
      const id = link.getAttribute("href")!;
      if (id === "#") return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      event.preventDefault();
      const top = target.dataset.pinStart
        ? Number(target.dataset.pinStart)
        : id === "#home"
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - 88;
      lenis.scrollTo(top, {
        duration: 1.05,
        onComplete: () => {
          history.replaceState(null, "", id);
          if (id === "#main-content") target.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", anchor);
    const direct = (event: Event) => {
      event.preventDefault();
      const { top, immediate = true } = (
        event as CustomEvent<{ top: number; immediate?: boolean }>
      ).detail;
      lenis.scrollTo(top, { immediate, duration: 1.05 });
    };
    window.addEventListener("portfolio:scroll", direct);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncLock);
      document.removeEventListener("click", anchor);
      window.removeEventListener("portfolio:scroll", direct);
      gsap.ticker.remove(tick);
      lenis.off("scroll", update);
      lenis.destroy();
      delete document.documentElement.dataset.scrollEngine;
    };
  });
  return null;
}
