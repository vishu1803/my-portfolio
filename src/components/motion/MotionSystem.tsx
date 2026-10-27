"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionSystem() {
  const reduced = useReducedMotion();
  const cursor = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoading(false),
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
    );
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
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
      lenis.scrollTo((event as CustomEvent<{ top: number }>).detail.top, {
        immediate: true,
      });
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
  }, [reduced]);
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const scenes = [...document.querySelectorAll<HTMLElement>("[data-scene]")];
    const ctx = gsap.context(() => {
      scenes.forEach((scene, index) => {
        const colour = scene.dataset.scene!;
        const previous = scenes[index - 1]?.dataset.scene || colour;
        gsap.fromTo(
          scene,
          { backgroundColor: previous },
          {
            backgroundColor: colour,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: scene,
              start: "top 98%",
              end: "top 28%",
              scrub: 0.35,
            },
          },
        );
        ScrollTrigger.create({
          trigger: scene,
          start: "top 110px",
          end: "bottom 110px",
          onToggle: (self) => {
            if (self.isActive) {
              document.documentElement.dataset.chapterTheme =
                scene.dataset.ink || "light";
              document.documentElement.style.setProperty(
                "--chapter-bg",
                colour,
              );
            }
          },
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    let live = true;
    document.fonts.ready.then(() => {
      if (live) refresh();
    });
    return () => {
      live = false;
      window.removeEventListener("load", refresh);
      ctx.revert();
      delete document.documentElement.dataset.chapterTheme;
    };
  }, [reduced]);
  useEffect(() => {
    const node = cursor.current;
    if (!node || reduced || !matchMedia("(pointer:fine)").matches) return;
    let frame = 0,
      visible = false,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const paint = () => {
      frame = 0;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      node.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (visible && Math.abs(tx - x) + Math.abs(ty - y) > 0.2)
        frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      tx = event.clientX;
      ty = event.clientY;
      if (!visible) {
        x = tx;
        y = ty;
        visible = true;
        node.style.opacity = "1";
      }
      const target = event.target as Element;
      node.dataset.kind = target.closest(
        '[data-cursor="drag"],.collaborate-pill,.physics-word',
      )
        ? "drag"
        : target.closest("#home")
          ? "torch"
          : target.closest("a,button")
            ? "link"
            : "default";
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      visible = false;
      node.style.opacity = "0";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const reset = new MutationObserver(() => {
      node.style.opacity = "0";
      visible = false;
    });
    reset.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", hide);
    return () => {
      reset.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", hide);
      if (frame) cancelAnimationFrame(frame);
      node.style.opacity = "0";
    };
  }, [reduced]);
  return (
    <>
      <div
        className={`monogram-preloader ${loading ? "" : "is-finished"}`}
        aria-hidden="true"
      >
        <span>
          v<span>*</span>n
        </span>
        <small>OPENING THE FIELD NOTES / 2026</small>
      </div>
      <div ref={cursor} className="editorial-cursor" aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring" />
        <span className="cursor-label">DRAG</span>
      </div>
    </>
  );
}
