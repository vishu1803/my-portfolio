"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RigControls = {
  aim: (x: number, y: number) => void;
  hover: (value: boolean) => void;
  drag: (pixels: number) => void;
  pause: (value: boolean) => void;
};
type RigOptions = {
  stage: RefObject<HTMLDivElement>;
  hand: RefObject<SVGGElement>;
  strings: RefObject<SVGGElement>;
  button: RefObject<HTMLDivElement>;
  section: RefObject<HTMLElement>;
  reduced: boolean | null;
};
const ANCHORS = [
  [442, 99],
  [466, 139],
  [472, 190],
  [439, 249],
  [350, 241],
];

/** One motion model keeps the illustrated fingertips, cords and moving pill attached. */
export default function useCollaborationRig({
  stage,
  hand,
  strings,
  button,
  section,
  reduced,
}: RigOptions) {
  const controls = useRef<RigControls | null>(null);
  useEffect(() => {
    const surface = stage.current,
      palm = hand.current,
      cords = strings.current,
      pill = button.current;
    if (!surface || !palm || !cords || !pill || !section.current) return;
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      surface.dataset.motion = "reduced";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const paths = [...cords.querySelectorAll<SVGPathElement>("path")];
    const originals = paths.map((path) => path.getAttribute("d") || "");
    const svg = cords.ownerSVGElement!;
    const state = { cycle: 0, intro: 1, aimX: 0, aimY: 0, hover: 0, drag: 0 };
    let frame = 0,
      visible = false,
      paused = false,
      entered = false;
    let geometry = { scale: 1, x: 580, y: 94, height: 90 };
    const device = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const limited =
      !!device.connection?.saveData ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 2);
    let idle: gsap.core.Tween;
    let hovered = false;

    const paint = () => {
      frame = 0;
      const pull = (1 - Math.cos(state.cycle)) * 0.5;
      const handX =
        -state.intro * 65 - pull * (13 + state.hover * 8) + state.aimX * 3;
      const handY = pull * 4 + state.aimY * 2;
      const angle = (-pull * (2.4 + state.hover) * Math.PI) / 180;
      const dx = state.intro * 85 - pull * 16 + state.aimX * 8;
      const dy = Math.sin(state.cycle) * 2 + state.aimY * 4;
      palm.setAttribute(
        "transform",
        `translate(${handX} ${handY}) rotate(${(angle * 180) / Math.PI} 220 240)`,
      );
      pill.style.transform = `translate3d(${dx * geometry.scale}px, ${dy * geometry.scale}px, 0)`;
      paths.forEach((path, index) => {
        const [ax, ay] = ANCHORS[index];
        const x =
          220 +
          (ax - 220) * Math.cos(angle) -
          (ay - 240) * Math.sin(angle) +
          handX;
        const y =
          240 +
          (ax - 220) * Math.sin(angle) +
          (ay - 240) * Math.cos(angle) +
          handY;
        const endX = geometry.x + dx + state.drag / geometry.scale + 7;
        const endY = geometry.y + dy + geometry.height * (0.18 + index * 0.15);
        const span = endX - x;
        const slack =
          (1 - pull) * (10 + index * 2) +
          Math.sin(state.cycle + index * 0.65) * 3;
        path.setAttribute(
          "d",
          `M${x.toFixed(2)} ${y.toFixed(2)} C${(x + span * 0.36).toFixed(2)} ${(y + slack).toFixed(2)} ${(endX - span * 0.28).toFixed(2)} ${(endY + slack * 0.5).toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`,
        );
      });
    };
    const queuePaint = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      const scale = svg.clientWidth / 1000;
      if (!scale) return;
      geometry = {
        scale,
        x: pill.offsetLeft / scale,
        y:
          (pill.offsetTop -
            (svg.getBoundingClientRect().top -
              surface.getBoundingClientRect().top)) /
          scale,
        height: pill.offsetHeight / scale,
      };
      queuePaint();
    };
    const updateActivity = () => {
      const active = visible && !paused && !document.hidden;
      surface.dataset.motion = active
        ? limited
          ? "interactive"
          : "running"
        : "paused";
      if (active && !limited && entered && !hovered) idle?.resume();
      else idle?.pause();
      if (!active && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const ctx = gsap.context(() => {
      const aimX = gsap.quickTo(state, "aimX", {
        duration: 0.45,
        ease: "power3.out",
        onUpdate: queuePaint,
      });
      const aimY = gsap.quickTo(state, "aimY", {
        duration: 0.45,
        ease: "power3.out",
        onUpdate: queuePaint,
      });
      const hover = gsap.quickTo(state, "hover", {
        duration: 0.35,
        onUpdate: queuePaint,
      });
      controls.current = {
        aim: (x, y) => {
          aimX(x);
          aimY(y);
        },
        hover: (value) => {
          hovered = value;
          hover(value ? 1 : 0);
          updateActivity();
        },
        drag: (pixels) => {
          state.drag = pixels;
          queuePaint();
        },
        pause: (value) => {
          paused = value;
          updateActivity();
        },
      };
      idle = gsap.to(state, {
        cycle: Math.PI * 2,
        duration: 4.8,
        repeat: -1,
        ease: "none",
        paused: true,
        onUpdate: queuePaint,
      });
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: surface, start: "top 92%", once: true },
        onComplete: () => {
          entered = true;
          updateActivity();
        },
      });
      entrance
        .from(".collab-eyebrow", { y: 12, opacity: 0, duration: 0.45 }, 0)
        .from(".collab-headline", { y: 24, opacity: 0, duration: 0.6 }, 0)
        .from(surface, { opacity: 0, duration: 0.35 }, 0.1)
        .to(
          state,
          {
            intro: 0,
            duration: 1.05,
            ease: "back.out(1.6)",
            onUpdate: queuePaint,
          },
          0.15,
        )
        .to(paths, { strokeDashoffset: 0, duration: 0.65, stagger: 0.05 }, 0.2)
        .set(paths, { strokeDasharray: "none", strokeDashoffset: 0 }, 1.2);
    }, section);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updateActivity();
      },
      { threshold: 0.08 },
    );
    observer.observe(surface);
    const sizeObserver = new ResizeObserver(measure);
    sizeObserver.observe(surface);
    sizeObserver.observe(pill);
    document.addEventListener("visibilitychange", updateActivity);
    measure();
    return () => {
      controls.current = null;
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", updateActivity);
      if (frame) cancelAnimationFrame(frame);
      ctx.revert();
      palm.removeAttribute("transform");
      pill.style.removeProperty("transform");
      paths.forEach((path, index) => path.setAttribute("d", originals[index]));
      delete surface.dataset.motion;
    };
  }, [stage, hand, strings, button, section, reduced]);
  return controls;
}
