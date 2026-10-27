"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 }),
    sy = useSpring(y, { stiffness: 120, damping: 14 });
  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
