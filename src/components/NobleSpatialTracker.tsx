"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function NobleSpatialTracker() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const auraSpringConfig = { damping: 45, stiffness: 180, mass: 1 };
  const auraX = useSpring(-200, auraSpringConfig);
  const auraY = useSpring(-200, auraSpringConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveHandler = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']") ||
          target.closest("[data-magnetic]"))
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const leaveHandler = () => setIsVisible(false);

    window.addEventListener("mousemove", moveHandler, { passive: true });
    window.addEventListener("mouseleave", leaveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseleave", leaveHandler);
    };
  }, [cursorX, cursorY, auraX, auraY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {/* Deep Space Ambient Spotlight that illuminates surfaces */}
      <motion.div
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-35"
        style={{
          x: auraX,
          y: auraY,
          width: isPointer ? 440 : 380,
          height: isPointer ? 440 : 380,
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(14, 165, 233, 0.04) 45%, transparent 70%)`,
        }}
      />

      {/* Subtle Micro-Cursor Halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 border transition-colors duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          width: isPointer ? 36 : 18,
          height: isPointer ? 36 : 18,
          borderColor: isPointer ? "rgba(56, 189, 248, 0.8)" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: isPointer ? "rgba(56, 189, 248, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
