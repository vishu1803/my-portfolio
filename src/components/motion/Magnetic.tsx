"use client";
import useMagnetic from "../../hooks/useMagnetic";
import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

export default function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const style = useMagnetic(ref);
  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={style}>
      <motion.span
        className="magnetic-content"
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.35 }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
