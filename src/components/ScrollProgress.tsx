"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top dual-filament progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 origin-left shadow-[0_0_8px_rgba(56,189,248,0.6)]"
          style={{ scaleX }}
        />
      </div>

      {/* Subtle Right-side Spatial Coordinates pill */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-[#8b8b9e] pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span className="text-white/80 font-medium">SPACE.VECTOR</span>
        <span className="text-sky-400 font-bold">{percent}%</span>
      </div>
    </>
  );
}
