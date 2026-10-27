"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPrelude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".prelude-title", {
        yPercent: 70,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 94%",
          end: "top 40%",
          scrub: 0.4,
        },
      });
      gsap.from(".prelude-rule", {
        scaleX: 0,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "top 35%",
          scrub: 0.35,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section ref={root} className="contact-prelude" aria-label="One last thing">
      <div className="prelude-rule" aria-hidden="true" />
      <div className="prelude-title-clip">
        <p className="prelude-title">
          ONE LAST THING<span>.</span>
        </p>
      </div>
      <p className="micro-label">
        The next chapter starts
        <br />
        with a conversation. <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
