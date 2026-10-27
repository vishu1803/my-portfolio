"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { isLowPowerDevice } from "../../lib/motionQuality";
import { useRef, useEffect } from "react";
export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = cursor.current;
    const dot = node?.querySelector<HTMLElement>(".cursor-dot");
    const trail = node?.querySelector<HTMLElement>(".cursor-trail");
    if (
      !node ||
      !dot ||
      !trail ||
      reduced || isLowPowerDevice() ||
      !matchMedia("(pointer:fine)").matches
    )
      return;
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
      trail.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (visible && Math.abs(tx - x) + Math.abs(ty - y) > 0.2)
        frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      tx = event.clientX;
      ty = event.clientY;
      dot.style.transform = `translate3d(${tx}px,${ty}px,0) translate(-50%,-50%)`;
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
    <div ref={cursor} className="editorial-cursor" aria-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-trail">
        <span className="cursor-ring" />
        <span className="cursor-label">DRAG</span>
      </span>
    </div>
  );
}
