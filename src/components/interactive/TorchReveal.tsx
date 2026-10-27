"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import {
  CSSProperties,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

export default function TorchReveal({
  children,
  scope,
}: {
  children: ReactNode;
  scope: RefObject<HTMLElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [found, setFound] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current,
      target = scope.current;
    if (!node || !target || open) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)"),
      coarse = matchMedia("(pointer:coarse)");
    if (media.matches) return;
    let frame = 0,
      visible = false,
      inside = false,
      last = 0,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const start = performance.now();
    const device = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const drift = coarse.matches && !device.connection?.saveData;
    const paint = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (drift) {
        const rect = node.getBoundingClientRect();
        const t = (time - start) / 2400;
        tx = rect.width * (0.5 + 0.32 * Math.sin(t));
        ty = rect.height * (0.5 + 0.32 * Math.sin(t * 1.37));
      }
      if (time - last > 25) {
        x += (tx - x) * 0.12;
        y += (ty - y) * 0.12;
        node.style.setProperty("--torch-x", `${x}px`);
        node.style.setProperty("--torch-y", `${y}px`);
        last = time;
      }
      if (drift || (inside && Math.abs(tx - x) + Math.abs(ty - y) > 0.2))
        frame = requestAnimationFrame(paint);
    };
    const queue = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (!inside) {
        inside = true;
        x = tx;
        y = ty;
        node.dataset.active = "true";
        setFound(true);
      }
      queue();
    };
    const leave = () => {
      inside = false;
      if (!drift) node.dataset.active = "false";
    };
    const visibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else queue();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) {
          if (frame) cancelAnimationFrame(frame);
          frame = 0;
        } else if (drift) {
          inside = true;
          const rect = node.getBoundingClientRect();
          x = tx = rect.width * 0.5;
          y = ty = rect.height * 0.5;
          node.style.setProperty("--torch-x", `${x}px`);
          node.style.setProperty("--torch-y", `${y}px`);
          node.dataset.active = "true";
          queue();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      if (frame) cancelAnimationFrame(frame);
      delete node.dataset.active;
    };
  }, [scope, open, reduced]);
  return (
    <div
      ref={ref}
      className={`hero-torch ${open ? "torch-open" : ""}`}
      data-torch
      style={{ "--torch-x": "50%", "--torch-y": "50%" } as CSSProperties}
    >
      <div className="torch-subject">{children}</div>
      <div
        className={`torch-instruction micro-label ${found ? "is-found" : ""}`}
      >
        <i className="status-dot" />
        MOVE THE TORCH. FIND THE SUBJECT.
      </div>
      <button
        className="torch-inspect micro-label"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide details" : "Inspect details"}
      </button>
    </div>
  );
}
