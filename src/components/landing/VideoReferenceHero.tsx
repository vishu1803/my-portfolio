"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";

export default function VideoReferenceHero({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (
      !root.current ||
      reduced ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-meta", { y: 12, autoAlpha: 0, duration: 0.6 })
        .from(".hero-outline", { y: 40, autoAlpha: 0, duration: 1 }, "-=0.3")
        .from(
          ".hero-portrait",
          { clipPath: "inset(0 0 100% 0)", duration: 1.1 },
          "-=0.7",
        )
        .from(".hero-note", { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.65")
        .from(
          ".hero-name-line",
          { yPercent: 110, duration: 1, stagger: 0.1 },
          "-=0.65",
        )
        .from(".hero-bottom", { y: 18, autoAlpha: 0, duration: 0.7 }, "-=0.6");
      if (matchMedia("(min-width: 900px) and (pointer: fine)").matches) {
        gsap.to(portrait.current, {
          y: 36,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    }, root);
    return () => context.revert();
  }, [reduced]);

  return (
    <section
      id="home"
      ref={root}
      className="editorial-hero"
      aria-labelledby="hero-title"
    >
      <div className="film-grain hero-grain" aria-hidden="true" />
      <div className="hero-meta micro-label">
        <span>
          <i className="status-dot" />
          Independent portfolio / 2026
        </span>
        <span className="hero-edition">01 — An introduction</span>
      </div>
      <div className="hero-composition">
        <div className="hero-outline" aria-hidden="true">
          NISHAD
        </div>
        <div className="hero-note">
          <span className="micro-label hero-note-label">
            The person behind the pixels
          </span>
          <p>
            Curious by nature.
            <br />
            <em>Engineer by practice.</em>
          </p>
          <span className="hero-red-mark" aria-hidden="true">
            ↳
          </span>
          <p className="hero-location micro-label">
            Gorakhpur, India
            <br />
            Full stack / Software engineer
          </p>
        </div>
        <div ref={portrait} className="hero-portrait">
          <div className="portrait-yellow" aria-hidden="true">
            <span>N° 01</span>
          </div>
          <FlashlightReveal
            radius={180}
            label="Move to illuminate"
            className="portrait-inspector"
            revealedContent={
              <div className="hero-photo-reveal">
                <Image
                  src="/vishwanath-portrait.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 700px) 65vw, 36vw"
                  className="portrait-color"
                />
                <div className="portrait-reveal-note">
                  <span className="micro-label">A closer look</span>
                  <strong>Vishwanath Nishad</strong>
                  <span>Interfaces. APIs. Everything in between.</span>
                </div>
              </div>
            }
          >
            <div className="hero-photo">
              <Image
                src="/vishwanath-portrait.jpg"
                alt="Vishwanath Nishad, software engineer"
                fill
                priority
                sizes="(max-width: 700px) 65vw, 36vw"
                className="portrait-mono"
              />
              <span className="portrait-cross" aria-hidden="true">
                +
              </span>
            </div>
          </FlashlightReveal>
        </div>
        <div className="hero-identity">
          <p className="micro-label hero-byline">
            <span className="red-slash" aria-hidden="true" /> Software engineer
            &amp; full-stack developer
          </p>
          <h1 id="hero-title" className="hero-name">
            <span className="hero-name-line">
              VISHWANATH<span className="sr-only"> Nishad</span>
              <span className="hero-name-period" aria-hidden="true">
                .
              </span>
            </span>
          </h1>
        </div>
      </div>
      <div className="hero-bottom">
        <p>
          Thoughtful interfaces.
          <br />
          <em>Reliable systems underneath.</em>
        </p>
        <div className="hero-actions">
          <motion.a
            href="#case-studies"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="editorial-link"
          >
            Explore the work <ArrowDownRight size={19} aria-hidden="true" />
          </motion.a>
          <button
            type="button"
            onClick={onOpenResume}
            className="editorial-link subtle-link"
          >
            Résumé <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
        <span className="hero-scroll micro-label">
          Scroll to unfold
          <br />
          <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
