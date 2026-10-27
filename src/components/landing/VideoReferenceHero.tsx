"use client";
import useReducedMotion from "../../hooks/useMotionPreference";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useIntroReady } from "../motion/Preloader";
import Magnetic from "../motion/Magnetic";
import TorchReveal from "../interactive/TorchReveal";

export default function VideoReferenceHero({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const introReady = useIntroReady();

  useEffect(() => {
    if(reduced || !introReady) return;
    const context = gsap.context(() => {
      gsap
        .timeline({ delay: 0.08, defaults: { ease: "power3.out" } })
        .from(".hero-outline", { y: 36, opacity: 0, duration: 0.7 }, 0)
        .from(".hero-name-line", { yPercent: 110, duration: 0.85 }, 0.15)
        .from(".hero-note", { y: 18, opacity: 0, duration: 0.65 }, 0.35)
        .from(".hero-bottom", { y: 24, opacity: 0, duration: 0.7 }, 0.55)
        .from(".hero-meta", { opacity: 0, duration: 0.5 }, 1.1);
      root.current
        ?.querySelectorAll<SVGPathElement>(".hero-ink-path")
        .forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.1,
              delay: 1.1,
              ease: "power2.inOut",
            },
          );
        });
    }, root);
    return () => context.revert();
  }, [reduced,introReady]);
  useScrollScene(root, !reduced && introReady, () => {
    const context=gsap.context(()=>{
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

    },root);
    return ()=>context.revert();
  });

  return (
    <section
      id="home"
      ref={root}
      className="editorial-hero"
      data-scene="#101014"
      data-ink="light"
      aria-labelledby="hero-title"
    >
      <div className="film-grain hero-grain" aria-hidden="true" />
      <div className="hero-meta micro-label">
        <span>
          <i className="status-dot" />A portfolio in five chapters / 2026
        </span>
        <span className="hero-edition">Opening — Find the subject</span>
      </div>
      <div className="hero-composition">
        <div className="hero-outline" aria-hidden="true">
          Nishad
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
          <div className="hero-drawn-note">
            <span className="hero-language micro-label">
              TypeScript / Full stack
            </span>
            <span className="hero-practice">
              300<span><span aria-hidden="true">+</span></span>
              <small>LeetCode problems · résumé</small>
            </span>
            <svg viewBox="0 0 300 95" aria-hidden="true">
              <path
                className="hero-ink-path"
                d="M27 51C8 49 5 84 37 85C86 93 106 58 75 47C45 35 14 47 18 66"
              />
              <path
                className="hero-ink-path"
                d="M124 74C150 86 185 64 192 20M176 32L192 17L199 40"
              />
            </svg>
          </div>
          <p className="hero-location micro-label">
            Full-stack developer · Gorakhpur, India
          </p>
        </div>
        <div ref={portrait} className="hero-portrait">
          <TorchReveal scope={root}>
            <div className="portrait-yellow" aria-hidden="true">
              <span>N° 01</span>
            </div>
            <div className="hero-photo">
              <Image
                src="/vishwanath-portrait.jpg"
                alt="Vishwanath Nishad, software engineer"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 700px) 65vw, 36vw"
                className="portrait-color"
              />
              <span className="portrait-cross" aria-hidden="true">
                +
              </span>
            </div>
          </TorchReveal>
        </div>
        <div className="hero-identity">
          <p className="micro-label hero-byline">
            <span className="red-slash" aria-hidden="true" /> Software engineer
            &amp; full-stack developer
          </p>
          <h1 id="hero-title" className="hero-name">
            <span className="hero-name-line">
              Vishwanath<span className="sr-only"> Nishad</span>
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
          <Magnetic>
            <motion.a
              href="#case-studies"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="editorial-link"
            >
              Explore the work <ArrowDownRight size={19} aria-hidden="true" />
            </motion.a>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={onOpenResume}
              className="editorial-link subtle-link"
            >
              Résumé <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </Magnetic>
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
