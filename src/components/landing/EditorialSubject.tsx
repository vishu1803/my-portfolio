"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";
import { LineReveal, BlurIn, MarkerSweep } from "../motion/TextReveals";
import Image from "next/image";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";

export default function EditorialSubject() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const ctx = gsap.context(() => {
      gsap.from(".subject-letter", {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
        stagger: 0.025,
        duration: 0.65,
        scrollTrigger: {
          trigger: ".subject-title",
          start: "top 82%",
          once: true,
        },
      });
      gsap.from(".subject-word", {
        opacity: 0,
        y: 15,
        stagger: 0.09,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".subject-heading",
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
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
      data-scene="#eae8e2"
      data-ink="dark"
      aria-labelledby="subject-heading"
    >
      <div className="section-rule micro-label">
        <span>01 / The subject</span>
        <span>Vishwanath Nishad · Gorakhpur</span>
      </div>
      <p className="subject-title">
        <span className="sr-only">The subject.</span>
        <span aria-hidden="true">
          {"The subject.".split("").map((letter, index) => (
            <span className="subject-letter" key={index}>
              {letter === " " ? " " : letter}
            </span>
          ))}
        </span>
      </p>
      <h2 id="subject-heading" className="subject-heading">
        <LineReveal>Thoughtful interfaces.</LineReveal>
        <em>
          <span className="sr-only">Reliable systems underneath.</span>
          <span aria-hidden="true">
            {"Reliable systems underneath.".split(" ").map((word) => (
              <span className="subject-word" key={word}>
                {word}{" "}
              </span>
            ))}
          </span>
        </em>
      </h2>
      <div className="subject-columns">
        <figure className="subject-portrait">
          <Image
            src="/vishwanath-portrait.jpg"
            alt="Vishwanath Nishad — portrait in yellow duotone"
            fill
            sizes="(max-width: 767px) 90vw, 40vw"
          />
          <figcaption className="micro-label">
            The person behind the work / 01
          </figcaption>
        </figure>
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
