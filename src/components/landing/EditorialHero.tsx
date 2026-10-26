"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Download, Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";

interface EditorialHeroProps {
  onContactClick?: () => void;
  onWorkClick?: () => void;
  onOpenResume?: () => void;
}

export default function EditorialHero({
  onContactClick,
  onWorkClick,
  onOpenResume,
}: EditorialHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);

  // GSAP Sequenced Editorial Entrance
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-meta-bar", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2,
      })
      .from(".hero-label", {
        opacity: 0,
        x: -25,
        duration: 0.6,
      }, "-=0.4")
      .from(".hero-title-first", {
        opacity: 0,
        y: 50,
        skewY: 3,
        duration: 1.1,
      }, "-=0.3")
      .from(".hero-title-last", {
        opacity: 0,
        y: 60,
        skewY: -3,
        duration: 1.1,
      }, "-=0.8")
      .from(".hero-highlight-bar", {
        opacity: 0,
        scaleX: 0.85,
        transformOrigin: "left center",
        duration: 0.7,
      }, "-=0.6")
      .from(".hero-summary", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, "-=0.4")
      .from(".hero-tag-pill", {
        opacity: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.5,
      }, "-=0.5")
      .from(".hero-ctas", {
        opacity: 0,
        y: 20,
        duration: 0.7,
      }, "-=0.3")
      .from(portraitFrameRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power2.out",
      }, "-=1.0");

      // Subtle parallax on portrait during scroll
      if (portraitFrameRef.current) {
        gsap.to(portraitFrameRef.current, {
          y: 60,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#08090B] text-[#FAF8F5] pt-28 sm:pt-32 pb-20 px-6 sm:px-10 lg:px-16 overflow-hidden flex flex-col justify-between"
    >
      {/* Background Film Grain Texture & Controlled Vignette */}
      <div className="absolute inset-0 pointer-events-none film-grain opacity-[0.04]" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#FFE600]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#4E85BF]/10 blur-[140px] pointer-events-none" />

      {/* Top Editorial Dispatch Bar */}
      <div className="hero-meta-bar max-w-[1280px] w-full mx-auto flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8 sm:mb-12 text-[11px] font-mono tracking-wider text-muted uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse" />
          <span className="text-white font-semibold">DOSSIER // VN-2026</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-muted hidden sm:inline">GORAKHPUR, INDIA [26.76°N, 83.37°E]</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-muted">B.TECH ELECTRONICS ENG &bull; REC &apos;25</span>
          <span className="stamp-box px-2.5 py-0.5 border-[#FFE600]/40 text-[#FFE600] text-[10px] font-bold">
            300+ LEETCODE DSA
          </span>
        </div>
      </div>

      {/* Main Grid: Asymmetrical Editorial Composition */}
      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left Column (7 cols): Expressive Typography & Investigative Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="hero-label inline-flex items-center gap-2.5 text-xs font-mono tracking-[0.25em] text-[#FFE600] uppercase">
            <span className="w-6 h-px bg-[#FFE600]" />
            <span>SOFTWARE ENGINEER &bull; SYSTEMS ARCHITECT</span>
          </div>

          {/* Massive Editorial Headline */}
          <div className="space-y-1">
            <h1 className="hero-title-first text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-display italic tracking-tight text-white leading-[0.92]">
              Vishwanath
            </h1>
            <div className="hero-title-last text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] font-display italic tracking-tight leading-[0.92] flex items-center gap-4">
              <span className="text-outline hover:text-white transition-colors duration-500">
                Nishad
              </span>
              <span className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest text-[#FFE600] border border-[#FFE600]/30 px-3 py-1 rounded-full not-italic">
                VERIFIED PROFILE
              </span>
            </div>
          </div>

          {/* Yellow Tape Highlighter Role Statement */}
          <div className="hero-highlight-bar pt-2">
            <span className="vox-highlight text-sm sm:text-base md:text-lg font-mono tracking-tight uppercase">
              Full-Stack Developer &bull; Backend APIs &bull; Scalable Systems
            </span>
          </div>

          {/* Resume-backed summary */}
          <p className="hero-summary text-sm sm:text-base md:text-lg text-muted/90 font-body leading-relaxed max-w-2xl">
            Adept at engineering end-to-end web applications, bridging responsive client interfaces with scalable backend APIs using <span className="text-white font-medium">TypeScript</span>, <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Next.js</span>, and <span className="text-white font-medium">Node.js</span>. Backed by daily algorithmic problem-solving and clean system architecture.
          </p>

          {/* Verified Technical Badges Strip */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: "FastAPI", type: "tech" },
              { label: "Prisma ORM", type: "tech" },
              { label: "PostgreSQL", type: "tech" },
              { label: "Redis Caching", type: "tech" },
              { label: "Next.js App Router", type: "tech" },
              { label: "Docker Compose", type: "tech" },
              { label: "Python 3.11", type: "lang" },
              { label: "TypeScript", type: "lang" },
            ].map((skill, idx) => (
              <span
                key={idx}
                className="hero-tag-pill px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-white/80 hover:border-[#FFE600]/50 hover:text-white transition-colors"
              >
                {skill.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-ctas pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo("case-studies")}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-white text-[#0B0C0E] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              <span>Investigate Case Studies</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onOpenResume) onOpenResume();
                else window.open("/assets/aistudio/software-vishu_1f0ccd66.pdf", "_blank");
              }}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer hover:border-white/30"
            >
              <Download className="w-4 h-4 text-[#FFE600]" />
              <span>Resume Dossier (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="px-5 py-3.5 rounded-full text-xs sm:text-sm font-mono text-muted hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Direct Dispatch</span>
              <span className="text-[#FFE600]">↗</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Art-Directed Real Portrait with Interactive Flashlight Inspector */}
        <div ref={portraitFrameRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
            {/* Film Registration Crop Marks */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/30 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-white/30 pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-white/30 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/30 pointer-events-none" />

            {/* Flashlight Reveal Container on Portrait */}
            <FlashlightReveal
              radius={240}
              label="TORCHLIGHT // HOVER TO INSPECT SYSTEM SCHEMATICS"
              className="rounded-3xl border border-white/15 bg-[#121419] shadow-2xl overflow-hidden"
              revealedContent={
                /* The Hidden Architectural Layer revealed by the Torchlight beam */
                <div className="relative w-full h-full bg-[#07090C] p-6 flex flex-col justify-between text-xs font-mono text-[#FFE600] select-none">
                  {/* Grid Circuit Pattern */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(to right, #FFE600 1px, transparent 1px), linear-gradient(to bottom, #FFE600 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Secret Blueprint Metadata */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[#FFE600]/30 pb-3">
                    <span className="bg-[#FFE600] text-black px-2 py-0.5 font-bold tracking-widest uppercase text-[10px]">
                      SYSTEM TELEMETRY
                    </span>
                    <span className="text-white/80 text-[10px]">VN-CORE: v2.6.4</span>
                  </div>

                  <div className="relative z-10 space-y-4 my-auto py-4">
                    <div className="p-3 rounded-xl bg-black/70 border border-[#FFE600]/40 backdrop-blur-md">
                      <div className="text-[10px] text-white/60 uppercase">Algorithmic Foundation</div>
                      <div className="text-sm font-bold text-white flex items-center justify-between mt-1">
                        <span>300+ LeetCode Solved</span>
                        <span className="text-[#FFE600]">DP &bull; Trees &bull; Graphs</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/70 border border-[#FFE600]/40 backdrop-blur-md">
                      <div className="text-[10px] text-white/60 uppercase">Production Webhook Latency</div>
                      <div className="text-sm font-bold text-white flex items-center justify-between mt-1">
                        <span>AST Diff Parser</span>
                        <span className="text-[#FFE600]">&lt; 1.2s Turnaround</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/70 border border-[#FFE600]/40 backdrop-blur-md">
                      <div className="text-[10px] text-white/60 uppercase">Academic Credential</div>
                      <div className="text-sm font-bold text-white flex items-center justify-between mt-1">
                        <span>B.Tech Electronics</span>
                        <span className="text-[#FFE600]">REC &apos;25</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-[#FFE600]/30 pt-3 flex items-center justify-between text-[10px] text-white/60">
                    <span>STATUS: OPERATIONAL</span>
                    <span className="text-[#FFE600]">X-RAY CONFIRMED</span>
                  </div>
                </div>
              }
            >
              {/* Base Portrait Image: Carefully cropped & art-directed */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/80">
                <Image
                  src="/vishwanath-portrait.jpg"
                  alt="Vishwanath Nishad — Software Engineer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-top filter grayscale contrast-110 brightness-95 hover:grayscale-0 hover:contrast-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle vintage film duotone overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-black/20 pointer-events-none" />

                {/* Archival Stamp on the portrait */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <div className="stamp-box px-2.5 py-1 bg-black/70 border-[#FFE600]/60 text-[#FFE600] text-[9px] font-mono backdrop-blur-sm">
                    ARCHIVE // 2026
                  </div>
                </div>

                {/* Bottom Plate Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="text-white font-medium">Vishwanath Nishad</div>
                    <div className="text-muted text-[10px]">Full-Stack Developer &bull; Gorakhpur</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FFE600]/15 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </FlashlightReveal>

            {/* Corner Technical Spec Labels */}
            <div className="flex items-center justify-between mt-3 px-2 text-[10px] font-mono text-muted tracking-widest uppercase">
              <span>PLATE NO. 01</span>
              <span>NATURAL LIGHT &bull; TORCH READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Data Ticker */}
      <div className="max-w-[1280px] w-full mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]" />
            <span className="text-white/80">300+ LeetCode Algorithms Solved</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span className="text-white/80">Full Stack Intern @ FTV Saloon</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B4B]" />
            <span className="text-white/80">Collaborative Task Manager &amp; AST Code Review</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTo("case-studies")}
          className="text-[#FFE600] hover:underline flex items-center gap-1.5 cursor-pointer ml-auto"
        >
          <span>Scroll to Dossier</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
