"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";
import { LineReveal, BlurIn, MarkerSweep } from "../motion/TextReveals";
import Image from "next/image";
import GhostResolve from "../motion/GhostResolve";
import ClipReveal from "../motion/ClipReveal";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";

export default function EditorialSubject() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".subject-portrait img",
        { scale: 1.15, yPercent: 5 },
        {
          scale: 1,
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".subject-portrait",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.from(".subject-spec-row", {
        opacity: 0,
        y: 18,
        stagger: 0.12,
        duration: 0.65,
        scrollTrigger: {
          trigger: ".subject-specs",
          start: "top 88%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  });
  return (
    <section
      id="subject"
      ref={root}
      className="subject-scene paper-section"
      data-scene="#e9e2d0"
      data-ink="dark"
      aria-labelledby="subject-heading"
    >
      <div className="section-rule micro-label">
        <span>01 / The subject</span>
        <span>Vishwanath Nishad · Gorakhpur</span>
      </div>
      <p className="subject-title"><GhostResolve text="The subject." /></p>
      <h2 id="subject-heading" className="subject-heading">
        <LineReveal>Thoughtful interfaces.</LineReveal>
        <em><GhostResolve text="Reliable systems underneath." /></em>
      </h2>
      <div className="subject-columns">
        <ClipReveal className="subject-portrait-mask"><figure className="subject-portrait">
          <Image
            src="/vishwanath-portrait.jpg"
            alt="Vishwanath Nishad — portrait in yellow duotone"
            fill
            sizes="(max-width: 767px) 90vw, 40vw"
          />
          <figcaption className="micro-label">
            The person behind the work / 01
          </figcaption>
        </figure></ClipReveal>
        <div>
          <div className="subject-bio">
            <p>
              <BlurIn>
                I’m Vishwanath, a{" "}
                <MarkerSweep>full-stack developer</MarkerSweep> connecting
                responsive interfaces with the systems behind them.
              </BlurIn>
            </p>
            <p>
              <BlurIn>
                My work spans <MarkerSweep>authenticated APIs</MarkerSweep>,
                relational data, and interactive web applications.
              </BlurIn>
            </p>
            <p>
              <BlurIn>
                I like understanding how the pieces fit together — then turning that
                understanding into something useful.
              </BlurIn>
            </p>
          </div>
          <dl className="subject-specs">
            {[
              ["Degree", "B.Tech · Electronics Engineering"],
              ["College", "Rajkiya Engineering College"],
              ["Location", "Gorakhpur, India"],
              ["Focus", "Interfaces, backend APIs and full-stack applications"],
            ].map(([label, value]) => (
              <div className="subject-spec-row" key={label}>
                <dt className="micro-label">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
