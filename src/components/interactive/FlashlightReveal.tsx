"use client";

import {
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

interface FlashlightRevealProps {
  children: ReactNode;
  revealedContent: ReactNode;
  radius?: number;
  className?: string;
  revealedClassName?: string;
  label?: string;
  disabled?: boolean;
}

export default function FlashlightReveal({
  children,
  revealedContent,
  radius = 220,
  className = "",
  revealedClassName = "",
  label = "TORCHLIGHT INSPECTOR",
  disabled = false,
}: FlashlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled || expanded) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const limited =
      Boolean(device.connection?.saveData) ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 4) ||
      (device.hardwareConcurrency !== undefined &&
        device.hardwareConcurrency <= 4);
    let visible = true;
    let active = false;
    let frame: number | null = null;
    let current = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let initialized = false;

    const stop = () => {
      active = false;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      setTracking(false);
    };

    const paint = () => {
      frame = null;
      if (!active || !visible || document.hidden || reduced.matches) return;
      current.x += (target.x - current.x) * 0.24;
      current.y += (target.y - current.y) * 0.24;
      el.style.setProperty("--torch-x", `${current.x}px`);
      el.style.setProperty("--torch-y", `${current.y}px`);
      // Stop once settled. A new pointer event schedules the next frame.
      if (
        Math.abs(target.x - current.x) + Math.abs(target.y - current.y) >
        0.35
      ) {
        frame = requestAnimationFrame(paint);
      }
    };

    const move = (event: PointerEvent) => {
      if (!visible || document.hidden || reduced.matches) return;
      if (
        event.target instanceof Element &&
        event.target.closest("button,a,input,select,textarea")
      )
        return;
      // Touch retains native page scrolling; the explicit button is the tap alternative.
      if (event.pointerType !== "mouse" && event.buttons === 0) return;
      const rect = el.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!initialized) {
        current = { ...target };
        initialized = true;
      }
      if (!active) {
        active = true;
        setTracking(true);
      }
      if (coarse.matches || limited) {
        // Direct, event-driven updates avoid a smoothing loop on simpler devices.
        current = { ...target };
        el.style.setProperty("--torch-x", `${target.x}px`);
        el.style.setProperty("--torch-y", `${target.y}px`);
      } else if (frame === null) {
        frame = requestAnimationFrame(paint);
      }
    };

    const endTouch = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") stop();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });
    observer.observe(el);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerdown", move, { passive: true });
    el.addEventListener("pointerleave", stop);
    el.addEventListener("pointerup", endTouch);
    el.addEventListener("pointercancel", stop);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", stop);

    return () => {
      stop();
      observer.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", stop);
      el.removeEventListener("pointerup", endTouch);
      el.removeEventListener("pointercancel", stop);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", stop);
    };
  }, [disabled, expanded]);

  const style = {
    "--torch-x": "50%",
    "--torch-y": "50%",
    "--torch-radius": `${radius}px`,
  } as CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group ${className}`}
      style={style}
      data-flashlight
      data-tracking={tracking}
      data-expanded={expanded}
    >
      <div className="relative flashlight-surface">
        <div className="relative flashlight-image-surface">
          {/* Essential image/text is always present, without an opaque reduced-motion overlay. */}
          <div className="relative z-10 w-full h-full">{children}</div>
          {!disabled && !expanded && tracking && (
            <>
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-20 pointer-events-none flashlight-reveal-mask ${revealedClassName}`}
              >
                {revealedContent}
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 z-30 pointer-events-none flashlight-torch-glow mix-blend-screen"
              />
            </>
          )}
        </div>
        {!disabled && (
          <div className="flashlight-toolbar relative z-30 flex flex-wrap items-center justify-between gap-2 border-t border-white/15 bg-[#101216] px-3 py-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
              {label}
            </span>
            <button
              type="button"
              aria-expanded={expanded}
              aria-pressed={expanded}
              aria-controls={panelId}
              onClick={() => {
                setTracking(false);
                setExpanded((value) => !value);
              }}
              className="shrink-0 rounded-full border border-white/30 px-3 py-2 text-xs font-mono text-white hover:bg-white hover:text-black transition-colors touch-manipulation"
            >
              {expanded ? "Hide details" : "Inspect details"}
            </button>
          </div>
        )}
      </div>
      {!disabled && (
        <div
          id={panelId}
          hidden={!expanded}
          role="region"
          aria-label="Inspection details"
          className={`flashlight-static-panel relative bg-[#08090B] text-white ${revealedClassName}`}
        >
          {expanded && (
            <div className="flashlight-static-details">{revealedContent}</div>
          )}
        </div>
      )}
    </div>
  );
}
