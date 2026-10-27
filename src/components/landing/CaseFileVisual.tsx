"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function CaseFileVisual({
  image,
  title,
  alt,
  index,
}: {
  image: string;
  title: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 120, damping: 14 }),
    ry = useSpring(y, { stiffness: 120, damping: 14 });
  useEffect(() => {
    if (reduced) {
      x.jump(0);
      y.jump(0);
      rx.jump(0);
      ry.jump(0);
    }
  }, [reduced, x, y, rx, ry]);
  return (
    <div
      ref={ref}
      className="case-file-visual"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const rect = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty(
          "--glow-x",
          `${event.clientX - rect.left}px`,
        );
        ref.current!.style.setProperty(
          "--glow-y",
          `${event.clientY - rect.top}px`,
        );
        x.set((0.5 - (event.clientY - rect.top) / rect.height) * 12);
        y.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
        ref.current?.style.setProperty("--glow-x", "50%");
        ref.current?.style.setProperty("--glow-y", "50%");
      }}
    >
      <div className="case-radial-glow" aria-hidden="true" />
      <motion.div
        className="case-tilt-frame"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      >
        <div className="case-window-bar micro-label">
          <span />
          <span />
          <span />
          <p>FIELD NOTE / {String(index + 1).padStart(2, "0")}</p>
        </div>
        <div className="case-file-image">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 767px) 90vw, 65vw"
          />
        </div>
        <span className="case-depth-tag micro-label">
          REPOSITORY / INTERFACE
        </span>
        <span className="case-depth-rule" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
