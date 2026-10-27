"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";

import gsap from "gsap";
import GhostResolve from "../motion/GhostResolve";
import useScrollScene from "../../hooks/useScrollScene";
export default function ContactPrelude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const media = gsap.matchMedia();
    media.add("(min-width:768px)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: {
              id: "last-thing-pin",
              trigger: root.current,
              start: "top 84px",
              end: "+=100%",
              pin: true,
              pinSpacing: false,
              scrub: 0.6,
            },
          })
          .fromTo(
            ".prelude-title",
            { scale: 1, opacity: 0.6 },
            { scale: 1.12, opacity: 1, ease: "none" },
            0,
          )
          .to(".prelude-extrusion > span", { x: i => i + 1, y: i => i + 1, opacity: 1, stagger: .02, ease: "none" }, 0)
          .from(".prelude-line", { opacity: 0, y: 25, stagger: 0.15 }, 0.15);
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  });
  return (
    <section
      ref={root}
      className="contact-prelude"
      data-scene="#101014"
      data-ink="light"
      aria-labelledby="prelude-heading"
    >
      <div className="prelude-rule" aria-hidden="true" />
      <div className="prelude-title-clip">
        <h2 id="prelude-heading" className="prelude-title">
          <span className="prelude-extrusion" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i}>One last thing.</span>)}</span>
          <span className="prelude-front">One last thing<span>.</span></span>
        </h2>
      </div>
      <div className="prelude-lines">
        <p className="prelude-line"><GhostResolve text="The next chapter starts" /></p>
        <p className="prelude-line"><GhostResolve text="with a conversation." /></p>
      </div>
      <p className="prelude-name micro-label">Vishwanath Nishad</p>
    </section>
  );
}
