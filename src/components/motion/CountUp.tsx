"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useEffect, useRef } from "react";

import gsap from "gsap";
export default function CountUp({
  value,
  suffix = "",
  label,
  className = "",
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const counter = { value: 0 };
    let tween: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        tween = gsap.to(counter, {
          value,
          duration: 1.2,
          ease: "power3.out",
          onUpdate: () => {
            node.textContent = Math.round(counter.value).toString() + suffix;
          },
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      tween?.kill();
      node.textContent = String(value) + suffix;
    };
  }, [value, suffix, reduced]);
  return (
    <span className={`count-up ${className}`}>
      <span className="sr-only">
        {value}
        {suffix} {label}
      </span>
      <span ref={ref} aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}
