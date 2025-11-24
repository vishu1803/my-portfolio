"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorTrail() {
  const [performanceMode, setPerformanceMode] = useState(false);

  // Motion values must be declared unconditionally (React hooks rule)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });

  // Listen for global performance-mode toggle
  useEffect(() => {
    const handler = (e: any) => setPerformanceMode(e.detail.enabled);
    window.addEventListener("performance-mode", handler);
    return () => window.removeEventListener("performance-mode", handler);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      x.set(window.innerWidth / 2);
      y.set(window.innerHeight / 2);
    }
  }, [x, y]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  // Early return after all hooks
  if (performanceMode) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-blue-400/40 backdrop-blur-sm rounded-full pointer-events-none z-[9999] mix-blend-lighten shadow-xl"
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  );
}
