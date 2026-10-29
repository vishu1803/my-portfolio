"use client";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { isLowPowerDevice } from "../../lib/motionQuality";
import useMotionPreference from "../../hooks/useChapterMotion";

export default function ClipReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || isLowPowerDevice()) return;
    const context = gsap.context(() => {}, node);
    let done = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done) return;
      done = true; observer.disconnect();
      context.add(() => {
        gsap.fromTo(node, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.out" });
        gsap.fromTo(node.firstElementChild, { scale: 1.15 }, { scale: 1, duration: 1.2, ease: "expo.out" });
      });
    }, { threshold: .15 });
    observer.observe(node);
    return () => { observer.disconnect(); context.revert(); };
  }, [reduced]);
  return <div ref={ref} className={`clip-reveal ${className}`} data-clip-reveal><div className="clip-reveal-inner">{children}</div></div>;
}
