"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

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
  label = "TORCHLIGHT INSPECTOR // HOVER TO REVEAL",
  disabled = false,
}: FlashlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0, active: false });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (disabled || isReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    // Set initial center coordinates
    const rect = el.getBoundingClientRect();
    currentPos.current = { x: rect.width * 0.65, y: rect.height * 0.45 };
    targetPos.current = { x: rect.width * 0.65, y: rect.height * 0.45, active: false };

    el.style.setProperty("--torch-x", `${currentPos.current.x}px`);
    el.style.setProperty("--torch-y", `${currentPos.current.y}px`);
    el.style.setProperty("--torch-radius", `${radius}px`);

    let idleAngle = 0;

    const tick = () => {
      if (!el) return;

      if (!targetPos.current.active) {
        // Subtle ambient idle breathing/drift when cursor is not inside
        idleAngle += 0.015;
        const cx = el.clientWidth * 0.55 + Math.cos(idleAngle) * (el.clientWidth * 0.2);
        const cy = el.clientHeight * 0.45 + Math.sin(idleAngle * 0.8) * (el.clientHeight * 0.15);
        targetPos.current.x = cx;
        targetPos.current.y = cy;
      }

      // Smooth lerp for buttery organic torchlight motion
      const ease = targetPos.current.active ? 0.18 : 0.04;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      el.style.setProperty("--torch-x", `${currentPos.current.x}px`);
      el.style.setProperty("--torch-y", `${currentPos.current.y}px`);

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    const handlePointerMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      targetPos.current.x = e.clientX - b.left;
      targetPos.current.y = e.clientY - b.top;
      targetPos.current.active = true;
    };

    const handlePointerLeave = () => {
      targetPos.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const b = el.getBoundingClientRect();
        targetPos.current.x = touch.clientX - b.left;
        targetPos.current.y = touch.clientY - b.top;
        targetPos.current.active = true;
        setIsTouchActive(true);
      }
    };

    const handleTouchEnd = () => {
      targetPos.current.active = false;
      setIsTouchActive(false);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [disabled, isReducedMotion, radius]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden group select-none ${className}`}
      style={{
        // default fallback coordinates
        ["--torch-x" as any]: "50%",
        ["--torch-y" as any]: "50%",
        ["--torch-radius" as any]: `${radius}px`,
      }}
    >
      {/* Layer 1: Base Essential Content (Always visible & accessible) */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Layer 2: Hidden Architectural Layer Revealed ONLY by the Torchlight Beam */}
      {!disabled && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
            isReducedMotion ? "opacity-35" : "flashlight-reveal-mask opacity-100"
          } ${revealedClassName}`}
        >
          {revealedContent}
        </div>
      )}

      {/* Layer 3: Realistic Incandescent Beam Light Cone & Falloff Flare */}
      {!disabled && !isReducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-30 pointer-events-none flashlight-torch-glow mix-blend-screen opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      {/* Interactive HUD Annotation tag */}
      {label && !disabled && (
        <div className="absolute bottom-3 right-3 z-30 pointer-events-none hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 border border-white/10 backdrop-blur-md text-[10px] font-mono text-muted tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
