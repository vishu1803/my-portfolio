"use client";
import { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useReducedMotion from "../../hooks/useMotionPreference";
import { isLowPowerDevice } from "../../lib/motionQuality";

type Props = {
  children?: ReactNode;
  layers?: ReactNode;
  scope: RefObject<HTMLElement>;
  radius?: number;
  softness?: number;
  ambient?: number;
  disabled?: boolean;
  lowPower?: boolean;
};

/** A dim accessible base plus a masked, presentational copy of the actual content. */
export default function TorchReveal({
  children, layers, scope, radius = 120, softness = 80, ambient = 0.1,
  disabled = false, lowPower = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const light = useRef<(animate?: boolean) => void>(() => {});
  const latched = useRef(false);
  const [lit, setLit] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current, target = scope.current;
    if (!node || !target) return;
    const context = gsap.context(() => {}, node);
    const coarse = matchMedia("(pointer:coarse)").matches;
    const simple = reduced || disabled || lowPower || isLowPowerDevice() ||
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.dataset.quality = simple ? "static" : "full";
    target.dataset.motionQuality = node.dataset.quality;
    let frame = 0, visible = false, inside = false, last = 0;
    let x = 0, y = 0, tx = 0, ty = 0, pointerX = 0, pointerY = 0;
    let moved = false, needsMeasure = true, interactionTime = 0, lastMove = 0;
    let visibleTime = 0, previousTime = 0, dragUntil = 0;
    let rect = node.getBoundingClientRect();
    const covered = new Set<number>();
    const finish = (animate = true) => {
      if (latched.current) {
        node.dataset.revealComplete = "true";
        return;
      }
      latched.current = true;
      setLit(true);
      target.dataset.lit = "true";
      node.dataset.lit = "true";
      node.dataset.active = "true";
      node.dataset.found = "true";
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      context.add(() => {
        if (animate && !simple) {
          gsap.to(node, {
            "--torch-radius": `${Math.max(rect.width, rect.height) * 2.5}px`,
            duration: 1.2, ease: "power2.inOut",
            onComplete: () => { node.dataset.revealComplete = "true"; },
          });
        } else node.dataset.revealComplete = "true";
      });
      node.dispatchEvent(new CustomEvent("portfolio:torch-lit", {
        bubbles: true, detail: { animate: animate && !simple },
      }));
    };
    light.current = finish;
    if (simple || latched.current) {
      finish(false);
      return () => { context.revert(); light.current = () => {}; };
    }
    const measure = () => { needsMeasure = true; };
    const paint = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || latched.current) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 100) : 0;
      previousTime = time;
      visibleTime += elapsed;
      if (time - last >= (coarse ? 50 : 25)) {
        if (needsMeasure) { rect = node.getBoundingClientRect(); needsMeasure = false; }
        if (coarse && time > dragUntil) {
          const t = visibleTime / 1000;
          tx = rect.width * (.5 + Math.sin(t * .6) * .3);
          ty = rect.height * (.5 + Math.cos(t * .45) * .25);
        } else if (inside) {
          tx = pointerX - rect.left;
          ty = pointerY - rect.top;
        }
        x += (tx - x) * .12;
        y += (ty - y) * .12;
        node.style.setProperty("--torch-x", `${x}px`);
        node.style.setProperty("--torch-y", `${y}px`);
        if (moved && !coarse) {
          for (let row = 0; row < 10; row++) for (let col = 0; col < 8; col++) {
            if (Math.hypot(rect.width * (col + .5) / 8 - x, rect.height * (row + .5) / 10 - y) <= radius)
              covered.add(row * 8 + col);
          }
          if (covered.size >= 48 || interactionTime >= 4000) { finish(); return; }
        }
        last = time;
      }
      if (coarse && visibleTime >= 3000) { finish(); return; }
      if (coarse || inside) frame = requestAnimationFrame(paint);
    };
    const queue = () => {
      if (!frame && visible && !document.hidden && !latched.current)
        frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (latched.current) return;
      const now = performance.now();
      if (lastMove) interactionTime += Math.min(now - lastMove, 150);
      lastMove = now;
      pointerX = event.clientX; pointerY = event.clientY;
      moved = true; inside = true; dragUntil = now + 1300;
      node.dataset.active = "true";
      node.dataset.found = "true";
      queue();
    };
    const leave = () => {
      inside = false;
      if (!coarse && !latched.current) node.dataset.active = "false";
    };
    const tap = (event: PointerEvent) => { if (event.pointerType !== "mouse") finish(); };
    const visibility = () => {
      previousTime = 0;
      if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
      else queue();
    };
    const sizeObserver = new ResizeObserver(measure);
    sizeObserver.observe(node);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting; previousTime = 0;
      if (!visible) { if (frame) cancelAnimationFrame(frame); frame = 0; }
      else {
        rect = node.getBoundingClientRect();
        if (!inside) { x = tx = rect.width / 2; y = ty = rect.height / 2; }
        if (coarse) node.dataset.active = "true";
        queue();
      }
    }, { threshold: .08 });
    observer.observe(node);
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", leave);
    node.addEventListener("pointerup", tap, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect(); sizeObserver.disconnect();
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      node.removeEventListener("pointerup", tap);
      window.removeEventListener("scroll", measure);
      document.removeEventListener("visibilitychange", visibility);
      if (frame) cancelAnimationFrame(frame);
      context.revert(); light.current = () => {};
    };
  }, [scope, reduced, disabled, lowPower, radius]);
  const content = layers ?? children;
  return (
    <div ref={ref} className="hero-torch" data-torch style={{
      "--torch-x": "50%", "--torch-y": "50%", "--torch-radius": `${radius}px`,
      "--torch-softness": `${softness}px`, "--torch-ambient": ambient,
    } as CSSProperties}>
      <div className="torch-dim">{content}</div>
      <div className="torch-subject" aria-hidden="true">{content}</div>
      <div className="torch-ambient" aria-hidden="true" />
      <div className="torch-instruction micro-label"><i className="status-dot" />Move the torch. Find the subject.</div>
      <button className="torch-inspect micro-label" type="button" aria-disabled={lit}
        aria-label={lit ? "Portrait revealed" : "Reveal portrait details"}
        onClick={() => light.current()}>
        {lit ? "Portrait revealed" : "Reveal portrait details"}
      </button>
    </div>
  );
}
