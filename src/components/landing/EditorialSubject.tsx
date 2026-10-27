"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EditorialSubject() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
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
      gsap.fromTo(
        ".marker-sweep",
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          stagger: 0.2,
          duration: 0.9,
          scrollTrigger: {
            trigger: ".subject-bio",
            start: "top 78%",
            once: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, [reduced]);
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
        THOUGHTFUL INTERFACES.
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
              I’m Vishwanath, a{" "}
              <span className="marker-sweep">full-stack developer</span>{" "}
              connecting responsive interfaces with the systems behind them.
            </p>
            <p>
              My work spans{" "}
              <span className="marker-sweep">authenticated APIs</span>,
              relational data, and interactive web applications. I like
              understanding how the pieces fit together — then turning that
              understanding into something useful.
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
