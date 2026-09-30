"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HlsVideo from "./HlsVideo";

const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface FooterProps {
  onOpenResume?: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const email = "vishwanatnishad@gmail.com";
  const phone = "+91 7905087928";

  // GSAP Marquee: BUILDING THE FUTURE • repeated, xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const marqueeText = Array(10).fill("BUILDING THE FUTURE • ").join("");

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden select-none"
    >
      {/* Background HLS Video, flipped vertically */}
      <HlsVideo src={HLS_URL} flipVertical />

      {/* Heavier overlay: bg-black/60 */}
      <div className="absolute inset-0 bg-black/65 pointer-events-none" />

      {/* Top subtle fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center">
        {/* GSAP Marquee Banner */}
        <div className="w-full overflow-hidden mb-12 md:mb-16 py-3 border-y border-white/10 backdrop-blur-sm">
          <div
            ref={marqueeRef}
            className="whitespace-nowrap flex text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-text-primary/70"
          >
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </div>
        </div>

        {/* CTA Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono block mb-4">
            Get in touch
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display italic text-text-primary tracking-tight mb-4">
            Let&apos;s create something memorable.
          </h2>

          <p className="text-sm md:text-base text-muted max-w-md mx-auto leading-relaxed">
            Open for software engineering opportunities, technical advisory, and ambitious product collaborations.
          </p>
        </div>

        {/* Primary Email Button with gradient hover border ring */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 flex-wrap justify-center">
          <a
            href={`mailto:${email}`}
            className="group relative rounded-full p-[2px] transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            {/* Animated accent gradient ring on hover */}
            <span
              className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift"
              aria-hidden="true"
            />
            <span className="relative flex items-center gap-2.5 rounded-full bg-surface px-8 py-4 text-sm md:text-base text-text-primary font-medium backdrop-blur-md">
              <span>{email}</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </span>
          </a>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="rounded-full px-6 py-4 border border-stroke bg-surface/80 hover:bg-surface text-xs md:text-sm font-mono text-muted hover:text-text-primary transition-all duration-300 hover:border-white/20"
          >
            {copied ? "✓ Copied to clipboard" : "Copy Email"}
          </button>

          {/* Resume button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenResume) onOpenResume();
              else window.open("/resume.pdf", "_blank");
            }}
            className="rounded-full px-6 py-4 border border-stroke bg-surface/80 hover:bg-surface text-xs md:text-sm font-mono text-muted hover:text-text-primary transition-all duration-300 hover:border-white/20"
          >
            View CV / Resume
          </button>
        </div>

        {/* Footer Bar */}
        <div className="w-full pt-8 border-t border-stroke/60 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/vishu1803"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-text-primary transition-colors font-mono uppercase tracking-wider"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-text-primary transition-colors font-mono uppercase tracking-wider"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-text-primary transition-colors font-mono uppercase tracking-wider"
            >
              Twitter
            </a>
            <a
              href={`tel:${phone}`}
              className="text-xs text-muted hover:text-text-primary transition-colors font-mono uppercase tracking-wider"
            >
              Phone
            </a>
          </div>

          {/* Status Badge: Green pulsing dot + "Available for projects" */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface/80 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-text-primary">
              Available for projects
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60 font-mono">
            &copy; 2026 Vishwanath Nishad.
          </p>
        </div>
      </div>
    </footer>
  );
}
