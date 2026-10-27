"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";

interface VideoReferenceHeroProps {
  onOpenResume?: () => void;
}

export default function VideoReferenceHero({ onOpenResume }: VideoReferenceHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".vr-kicker", { autoAlpha: 0, y: -14, duration: 0.6 })
        .from(".vr-outline", { autoAlpha: 0, y: 56, duration: 1.15 }, "-=0.25")
        .from(".vr-tape", { autoAlpha: 0, x: -50, rotation: -9, duration: 0.72 }, "-=0.8")
        .from(".vr-portrait", { autoAlpha: 0, clipPath: "inset(0 100% 0 0)", duration: 1.15 }, "-=0.65")
        .from(".vr-name", { autoAlpha: 0, yPercent: 105, duration: 1.05 }, "-=0.8")
        .from(".vr-description", { autoAlpha: 0, y: 24, duration: 0.75 }, "-=0.5")
        .from(".vr-scroll-cue", { autoAlpha: 0, y: 15, duration: 0.65 }, "-=0.5");

      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} id="home" className="vr-hero relative isolate flex min-h-[820px] flex-col overflow-hidden bg-[#111014] text-[#F5F2E9] sm:min-h-[min(930px,100svh)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 film-grain opacity-20 mix-blend-screen" />
      <div aria-hidden="true" className="absolute -right-[15%] top-[14%] h-[65%] w-[44%] bg-[#FFE500]/[0.035] blur-[110px]" />

      <div className="vr-kicker relative z-10 mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 pt-28 text-[10px] font-mono uppercase tracking-[0.16em] sm:px-10 sm:pt-32 lg:px-16">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#FFE500]" />
          <span>Portfolio / Four chapters</span>
          <span className="hidden text-white/40 sm:inline">— Autumn 2026</span>
        </div>
        <div className="flex items-center gap-3 text-white/60">
          <span>01 / The person</span>
          <span aria-hidden="true" className="h-px w-12 bg-white/40" />
          <span>Scroll to explore</span>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pb-8 pt-6 sm:px-10 lg:px-16">
        <div aria-hidden="true" className="vr-outline reference-outline pointer-events-none absolute left-[-1.5%] top-[8%] z-0 w-full select-none text-[32vw] leading-[0.75] sm:top-[4%] sm:text-[28vw] lg:text-[25vw]">
          NISHAD
        </div>

        <div className="vr-tape absolute left-[5%] top-[13%] z-20 -rotate-[7deg] bg-[#FFE500] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-[#111014] shadow-[5px_5px_0_#111014] sm:left-[10%] sm:top-[18%] sm:text-xs">
          Software engineering / Full stack
        </div>
        <span className="vr-record-circle absolute left-[37%] top-[29%] z-10 hidden rounded-full border-2 border-[#E94C50] px-3 py-1 font-display text-2xl italic text-[#F5F2E9] sm:block">
          01
        </span>

        <div ref={portraitRef} className="vr-portrait relative z-[2] mt-20 ml-auto w-[80%] max-w-[560px] sm:mt-24 sm:w-[54%] lg:absolute lg:right-[7%] lg:top-[8%] lg:mt-0 lg:w-[43%] xl:right-[8%]">
          <div aria-hidden="true" className="absolute -right-[7%] top-[5%] -z-10 h-[78%] w-[80%] rotate-[3deg] bg-[#FFE500]" />
          <div aria-hidden="true" className="absolute -right-[10%] top-[15%] -z-20 h-[43%] w-[67%] border border-[#FFE500]/60" />
          <FlashlightReveal
            radius={230}
            label="MOVE THE TORCH / INSPECT THE STORY"
            className="border-b border-white/20 bg-[#181719]"
            revealedContent={
              <div className="flex h-full flex-col justify-between bg-[#FFE500] p-6 text-[#121114] sm:p-10">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">Under the surface / 001</p>
                <div className="space-y-5">
                  <h2 className="reference-display text-5xl uppercase leading-[0.9] sm:text-7xl">The work behind the work.</h2>
                  <p className="max-w-sm font-body text-sm leading-relaxed sm:text-base">TypeScript, React, Next.js, Node.js, backend APIs and evidence-led software development.</p>
                  <p className="border-t border-black/30 pt-4 font-mono text-xs uppercase">B.Tech / Electronics Engineering • REC 2025</p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wide">Move the light / Use Inspect details on touch</p>
              </div>
            }
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#242123]">
              <Image
                src="/vishwanath-portrait.jpg"
                alt="Portrait of Vishwanath Nishad"
                fill
                priority
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 54vw, 43vw"
                className="object-cover object-top contrast-[1.04] saturate-[0.84]"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111014]/35 via-transparent to-transparent" />
              <span className="absolute bottom-5 right-5 border border-white/60 bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white">
                Portrait / VN
              </span>
            </div>
          </FlashlightReveal>
          <p className="mt-2 text-right font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
            A real photograph / no generated identity
          </p>
        </div>

        <div className="relative z-[5] -mt-16 w-full sm:-mt-32 lg:mt-auto lg:pt-40">
          <p className="mb-3 max-w-md font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 sm:mb-4 sm:text-xs">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#FFE500]" />
            Building things that hold up under the hood
          </p>
          <div className="overflow-hidden">
            <h1 className="vr-name reference-display max-w-full break-words text-[17vw] uppercase leading-[0.78] tracking-[-0.07em] text-[#F5F2E9] sm:text-[16vw] lg:text-[12.8vw]">
              Vishwanath
              <span className="sr-only"> Nishad — Software Engineer</span>
            </h1>
          </div>
          <div className="mt-6 flex max-w-[740px] flex-col gap-6 border-t border-white/40 pt-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="vr-description max-w-md font-display text-[clamp(1.15rem,2.2vw,1.8rem)] leading-[1.14]">
              Full-stack developer working across thoughtful interfaces, reliable backends and practical systems.
            </p>
            <div className="vr-scroll-cue flex shrink-0 items-center gap-3 text-[11px] font-mono uppercase tracking-[0.11em]">
              <motion.a href="#case-studies" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="inline-flex min-h-11 items-center gap-2 border-b border-[#FFE500] text-[#FFE500]">
                Explore work <ArrowDownRight size={16} aria-hidden="true" />
              </motion.a>
              <button type="button" onClick={onOpenResume} className="inline-flex min-h-11 items-center gap-1 border-b border-white/45 text-white hover:border-[#FFE500] hover:text-[#FFE500]">
                Resume <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="h-[7px] w-full bg-[#FFE500]" />
    </section>
  );
}
