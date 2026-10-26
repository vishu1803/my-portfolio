"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Optional short title card; the active page opens directly on its hero timeline. */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduced ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduced]);
  return <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#08090B]" aria-label="Portfolio opening"><p className="font-display text-5xl italic">Vishwanath Nishad</p></motion.div>;
}
