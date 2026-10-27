"use client";
import useMagnetic from "../../hooks/useMagnetic";
import useMotionPreference from "../../hooks/useMotionPreference";
import { isLowPowerDevice } from "../../lib/motionQuality";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function ActiveMagnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const style = useMagnetic(ref);
  return <motion.span ref={ref} style={{ ...style, display: "inline-flex" }}>
    <motion.span className="magnetic-content"
      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: .35 }}>{children}</motion.span>
  </motion.span>;
}

/** Allocate springs only for nearby controls on devices that can use a pointer. */
export default function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced || isLowPowerDevice() || !matchMedia("(pointer:fine)").matches || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "150px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);
  return <span ref={ref} className={`magnetic ${className}`}>
    {near && !reduced ? <ActiveMagnet>{children}</ActiveMagnet> : <span className="magnetic-content">{children}</span>}
  </span>;
}
