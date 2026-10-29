"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./SubjectFlow.css";
import { EDITORIAL_MOTION as M } from "../../config/editorialMotion";

export default function EditorialSubject() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = root.current;
    if (!node || reduced) return;
    const context = gsap.context(() => {}, node);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        context.add(() => {
          const portrait=entry.target.matches('.subject-portrait-mask');
          gsap.fromTo(entry.target, portrait?{clipPath:M.image.inset,y:24}:{y:24},
            {clipPath:'inset(0% 0% 0% 0%)',y:0,duration:portrait?M.image.duration:M.entrance.duration,ease:M.entrance.ease});
        });
      });
    }, { threshold: .08 });
    node.querySelectorAll('[data-subject-reveal]').forEach(el => {
      // Direct navigation must never hide or rebuild text already in view.
      if (el.getBoundingClientRect().top >= innerHeight) observer.observe(el);
    });
    return () => { observer.disconnect(); context.revert(); };
  }, [reduced]);
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
      <p className="subject-title" data-subject-reveal>The subject.</p>
      <h2 id="subject-heading" className="subject-heading" data-subject-reveal>
        Thoughtful interfaces.
        <em>Reliable systems underneath.</em>
      </h2>
      <div className="subject-columns">
        <div className="subject-portrait-mask" data-subject-reveal><figure className="subject-portrait">
          <Image
            src="/vishwanath-portrait.jpg"
            alt="Vishwanath Nishad — portrait in yellow duotone"
            fill
            sizes="(max-width: 767px) 90vw, 40vw"
          />
          <figcaption className="micro-label">
            The person behind the work / 01
          </figcaption>
        </figure></div>
        <div>
          <div className="subject-bio" data-subject-reveal>
            <p>

                I’m Vishwanath, a{" "}
                <span className="subject-emphasis">full-stack developer</span> connecting
                responsive interfaces with the systems behind them.

            </p>
            <p>

                My work spans <span className="subject-emphasis">authenticated APIs</span>,
                relational data, and interactive web applications.

            </p>
            <p>

                I like understanding how the pieces fit together — then turning that
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
              <div className="subject-spec-row" data-subject-reveal key={label}>
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
