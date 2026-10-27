"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";

import gsap from "gsap";
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
              end: "+=65%",
              pin: true,
              pinSpacing: false,
              scrub: 0.6,
            },
          })
          .fromTo(
            ".prelude-title",
            { scale: 0.92, opacity: 0.6 },
            { scale: 1.07, opacity: 1, ease: "none" },
            0,
          )
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
      aria-label="One last thing"
    >
      <div className="prelude-rule" aria-hidden="true" />
      <div className="prelude-title-clip">
        <p className="prelude-title">
          ONE LAST THING<span>.</span>
        </p>
      </div>
      <div className="prelude-lines">
        <p className="prelude-line">The next chapter starts</p>
        <p className="prelude-line">with a conversation.</p>
      </div>
    </section>
  );
}
