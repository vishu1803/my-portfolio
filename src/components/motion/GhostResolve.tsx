"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isLowPowerDevice } from "../../lib/motionQuality";
import useScrollScene from "../../hooks/useScrollScene";
import useMotionPreference from "../../hooks/useMotionPreference";

/** Offset copies resolve into crisp serif type; only one copy is announced. */
export default function GhostResolve({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useMotionPreference();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (reduced || isLowPowerDevice() || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "250px 0px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);
  useScrollScene(ref, ready && !reduced, () => {
    const root = ref.current!;
    gsap.timeline({ scrollTrigger: { trigger: root, start: "top 88%", once: true } })
      .fromTo(root.querySelectorAll(".ghost-letter"),
        { filter: "blur(14px)", opacity: 0, y: 8 },
        { filter: "blur(0px)", opacity: 1, y: 0, duration: 1.1, stagger: .03, ease: "power3.out" }, 0)
      .fromTo(root.querySelectorAll(".ghost-double"),
        { x: 6, y: 2, opacity: .6 },
        { x: 0, y: 0, opacity: 0, duration: 1.1, stagger: .03, ease: "power3.out" }, 0);
  });
  return <span ref={ref} className="ghost-resolve" data-ghost-resolve>
    {ready ? <><span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(" ").map((word, index) => <span key={index}>
      {index > 0 && " "}<span className="ghost-word">{[...word].map((letter, i) =>
        <span className="ghost-letter" key={i}>{letter}<span className="ghost-double">{letter}</span></span>)}</span>
    </span>)}</span></> : text}
  </span>;
}
