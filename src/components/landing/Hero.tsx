"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HlsVideo from "./HlsVideo";

const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

interface HeroProps {
  onContactClick?: () => void;
  onWorkClick?: () => void;
}

export default function Hero({ onContactClick, onWorkClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle role word every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-6 select-none"
    >
      {/* Background HLS Video */}
      <HlsVideo src={HLS_URL} />

      {/* Dark overlay: bg-black/20 */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none z-10" />

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-24 pb-16">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-mono">
          COLLECTION &apos;26
        </p>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Vishwanath Nishad
        </h1>

        {/* Role line: "A {role} lives in India." */}
        <p className="blur-in text-base md:text-xl text-muted mb-4 font-body">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block text-xl md:text-2xl px-1"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          engineer shaping modern digital systems.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex items-center gap-4 flex-wrap justify-center">
          {/* "See Works" button */}
          <button
            type="button"
            onClick={() => {
              if (onWorkClick) onWorkClick();
              else handleScrollTo("work");
            }}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 bg-text-primary text-bg hover:bg-bg hover:text-text-primary"
          >
            <span
              className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
              aria-hidden="true"
            />
            <span className="relative z-10">See Works</span>
          </button>

          {/* "Reach out..." button */}
          <button
            type="button"
            onClick={() => {
              if (onContactClick) onContactClick();
              else handleScrollTo("contact");
            }}
            className="group relative rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 border-2 border-stroke bg-bg text-text-primary hover:border-transparent"
          >
            <span
              className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
              aria-hidden="true"
            />
            <span className="relative z-10">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator at bottom-center */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="w-full h-full bg-[#89AACC] animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
