"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, BookOpen, Layers, CheckCircle2, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import FlashlightReveal from "../interactive/FlashlightReveal";
import ArchitectureCompendiumModal from "./ArchitectureCompendiumModal";
import { JournalArticle, JOURNAL_DATA } from "./Journal";
import { ProjectItem } from "./SelectedWorks";

interface ProjectCaseStudiesProps {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectArticle?: (article: JournalArticle) => void;
}

export const CASE_STUDIES = [
  {
    id: "collaborative-task-manager",
    chapter: "CHAPTER 01 // DISTRIBUTED SYSTEMS",
    title: "Collaborative Task Manager",
    subtitle: "High-Performance RESTful APIs, JWT Auth & Fine-Grained Role-Based Access Control",
    category: "Full-Stack & Distributed State",
    metrics: "ACID Safe &bull; Sub-50ms State Sync",
    image: "/task-manager.png",
    github: "https://github.com/vishu1803",
    liveDemo: "https://collaborative-task-manager-fc26.vercel.app/",
    tech: ["TypeScript", "Next.js", "Express.js", "Prisma ORM", "PostgreSQL", "JWT RBAC"],
    problem:
      "Real-time team collaboration platforms risk database concurrency drift and race conditions when multiple editors modify overlapping workspace resources without serialized state controls.",
    solution:
      "Designed and implemented high-performance RESTful CRUD APIs using Node.js and Prisma ORM, optimizing complex PostgreSQL queries with interactive ACID transactions to guarantee zero-drift consistency. Constructed a full-stack platform with JWT-based authentication and granular Role-Based Access Control (RBAC).",
    resumeHighlights: [
      "Designed and implemented high-performance RESTful CRUD APIs using Node.js and Prisma ORM, optimizing complex PostgreSQL queries to support real-time updates.",
      "Built a secure, full-stack task management platform with JWT-based authentication and fine-grained Role-Based Access Control (RBAC) for collaboration.",
      "Provided a responsive interface with real-time updates and an optimized database structure.",
    ],
    architectureDossierId: "collaborative-task-acid",
  },
  {
    id: "ai-code-review-assistant",
    chapter: "CHAPTER 02 // AUTOMATED PR INTELLIGENCE",
    title: "AI-Powered Code Review Assistant",
    subtitle: "Parsing Git Unified Diffs into Python AST Syntax Trees to Eliminate Hallucinated Reviews in <1.2s",
    category: "AI & Compilers",
    metrics: "68% Token Drop &bull; < 1.2s Turnaround",
    image: "/ai-code-review.png",
    github: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    liveDemo: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    tech: ["Python", "Flask", "FastAPI", "PostgreSQL", "Redis", "OpenAI API", "AST Parsers"],
    problem:
      "Naive LLM prompts over raw Git diff patches frequently hallucinate syntax errors and consume excessive tokens due to contextual diff markers and irrelevant file chunks.",
    solution:
      "Engineered an intelligent automated code review system by integrating the OpenAI API to analyze GitHub Pull Requests, identifying style issues and suggesting bug fixes. Built a Flask backend with asynchronous FastAPI endpoints to handle real-time GitHub webhook integrations, running deterministic AST pre-checks before LLM invocation.",
    resumeHighlights: [
      "Developed an intelligent automated code review system by integrating OpenAI API to analyze GitHub Pull Requests, identifying style issues and suggesting bug fixes.",
      "Engineered a Flask backend with asynchronous FastAPI endpoints to handle real-time GitHub webhook integrations, ensuring high concurrency and application availability.",
      "Automated code evaluation across multiple repositories with line-level annotations.",
    ],
    architectureDossierId: "ast-pr-analyzer",
  },
  {
    id: "ai-context-tracker",
    chapter: "CHAPTER 03 // LLM TOOLING & EXTENSION",
    title: "AI Context Tracker",
    subtitle: "Real-Time 128k Token Telemetry, Burn Velocity & Context Drift Observer via WebAssembly",
    category: "Developer Tooling & Telemetry",
    metrics: "128k Token Monitor &bull; Zero Server Latency",
    image: "/ai-context-tracker.svg",
    github: "https://github.com/vishu1803/ai-context-tracker",
    liveDemo: "https://github.com/vishu1803/ai-context-tracker",
    tech: ["TypeScript", "Chrome Extension MV3", "Tiktoken WASM", "LLM Telemetry", "Next.js"],
    problem:
      "Developers and researchers interacting with large language models have no real-time visibility into active token burn rates, risking sudden attention degradation and context truncation.",
    solution:
      "Constructed a browser extension companion for ChatGPT and Claude that tracks active token consumption in real-time using in-browser WebAssembly BPE tokenization. Computes burn velocity and provides visual warnings before conversations approach context window limits.",
    resumeHighlights: [
      "In-browser WebAssembly BPE tokenizer executing sub-millisecond token counts with zero telemetry data transmission.",
      "Real-time burn rate gauges predicting turns remaining within 128k context limits.",
      "Instruction drift telemetry alerting users to system prompt dilution in long-turn sessions.",
    ],
    architectureDossierId: "ai-context-tracker",
  },
  {
    id: "ai-career-hub",
    chapter: "CHAPTER 04 // AI CAREER INTELLIGENCE",
    title: "AI Career Hub & Workspace Copilot",
    subtitle: "Job Fit Radar Engine: High-Dimensional Cosine Distance & Asynchronous Resume Parsing",
    category: "AI & Vector Embeddings",
    metrics: "75%+ Readiness Radar &bull; Sub-second Match",
    image: "/ai-career-hub.png",
    github: "https://github.com/vishu1803/ai-career-hub",
    liveDemo: "https://github.com/vishu1803/ai-career-hub",
    tech: ["Next.js App Router", "OpenAI / Gemini", "PostgreSQL", "Vector Distance", "Tailwind CSS"],
    problem:
      "Keyword matching on candidate resumes fails to capture semantic engineering competence, missing qualified engineers who use different vocabulary for identical skillsets.",
    solution:
      "Created a full-stack career copilot featuring a Job Fit Radar that projects candidate competency vectors across five core engineering subspaces, computing cosine alignment against live job descriptions with automated gap analysis.",
    resumeHighlights: [
      "High-dimensional vector embedding scoring across System Design, Frontend, Cloud Infra, and Algorithms.",
      "Asynchronous PDF ingestion pipeline generating structured relational skill graphs.",
      "Interactive SVG radar chart visualizing candidate readiness percentiles.",
    ],
    architectureDossierId: "ai-career-hub",
  },
  {
    id: "product-explorer",
    chapter: "CHAPTER 05 // HIGH-THROUGHPUT GRAPHICS",
    title: "Product Data Explorer & Analytics",
    subtitle: "Rendering 10,000 Records at 60 FPS via Offscreen Canvas Framebuffers & O(1) Spatial Hashing",
    category: "High-Throughput Frontend",
    metrics: "10,000+ Points &bull; Locked 60 FPS",
    image: "/product-explorer.png",
    github: "https://github.com/vishu1803",
    liveDemo: "https://product-explorer-frontend-qp3m.onrender.com/",
    tech: ["Next.js", "Redis Caching", "Canvas 2D API", "Spatial Hash Grid", "REST APIs"],
    problem:
      "Rendering thousands of SVG nodes in the browser DOM chokes layout recalculations, causing frame rates to drop below 10 FPS during parametric filtering.",
    solution:
      "Re-architected visualization onto dual-layer HTML5 Canvas buffers with a mathematical spatial hash grid, reducing hover lookups to O(1) time and locking the browser at 60 FPS.",
    resumeHighlights: [
      "Offscreen canvas rendering pipeline handling 10,000+ data nodes without DOM overhead.",
      "Spatial hash grid replacing O(n) array loops with microsecond coordinate lookups.",
      "Redis memory caching cluster accelerating multi-dimensional parametric filters.",
    ],
    architectureDossierId: "product-explorer-canvas",
  },
  {
    id: "3d-portfolio",
    chapter: "CHAPTER 06 // SPATIAL DIGITAL EXPERIENCE",
    title: "3D Spatial Studio & WebGL Experience",
    subtitle: "Collapsing 1,500 Celestial Particles into a Single GPU Draw Call with Custom GLSL Shaders",
    category: "WebGL & Spatial Shaders",
    metrics: "1 GPU Draw Call &bull; 60 FPS Mobile",
    image: "/portfolio.png",
    github: "https://github.com/vishu1803/3D-portfolio-website",
    liveDemo: "https://3-d-portfolio-website-one.vercel.app",
    tech: ["Three.js", "React Three Fiber", "Custom GLSL Shaders", "Framer Motion", "WebGL"],
    problem:
      "Individual Three.js mesh instances multiply GPU draw calls and trigger garbage collection stutters on mobile devices.",
    solution:
      "Consolidated celestial particles into a single InstancedMesh governed by custom GLSL vertex attenuation and soft circular fragment shaders, maintaining silky 60 FPS across all hardware.",
    resumeHighlights: [
      "InstancedMesh GPU batching reducing draw call overhead to a single command.",
      "Custom GLSL vertex shader computing particle size attenuation on GPU hardware.",
      "Dynamic DPR throttler adaptively scaling resolution to device capability.",
    ],
    architectureDossierId: "webgl-instanced-3d",
  },
];

export default function ProjectCaseStudies({
  onSelectProject,
  onSelectArticle,
}: ProjectCaseStudiesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [compendiumOpen, setCompendiumOpen] = useState(false);
  const [targetArticleId, setTargetArticleId] = useState<string | null>(null);

  // GSAP ScrollTrigger Section Reveals
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".case-study-item");

      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 45,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const openArchitecture = (articleId: string) => {
    const article = JOURNAL_DATA.find((a) => a.id === articleId);
    if (article && onSelectArticle) {
      onSelectArticle(article);
    } else {
      setTargetArticleId(articleId);
      setCompendiumOpen(true);
    }
  };

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="relative w-full bg-[#08090B] text-[#FAF8F5] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none film-grain opacity-[0.035]" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] rounded-full bg-[#FFE600]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-[#4E85BF]/8 blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-[1280px] mx-auto mb-16 sm:mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#FFE600] mb-3">
              <span className="w-8 h-px bg-[#FFE600]" />
              <span>INVESTIGATIVE DOSSIER // CASE STUDIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display italic tracking-tight text-white leading-tight">
              Production Systems &amp;{" "}
              <span className="vox-highlight not-italic font-body tracking-normal text-3xl sm:text-4xl md:text-5xl px-3 py-0.5">
                Case Studies
              </span>
            </h2>
          </div>

          {/* Simple Button: View All Project Architectures in Scrollable Window */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                setTargetArticleId(null);
                setCompendiumOpen(true);
              }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#FFE600]/60 text-xs sm:text-sm font-mono text-white transition-all duration-300 shadow-lg cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFE600] group-hover:scale-125 transition-transform" />
              <span className="font-semibold tracking-wider uppercase">Open Architecture Compendium</span>
              <span className="text-[#FFE600] text-xs font-mono">
                ({CASE_STUDIES.length} Cases)
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-[#FFE600] transition-colors" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-muted max-w-2xl font-body leading-relaxed">
          Detailed engineering breakdowns of shipped repositories: problem statements, architectural tradeoffs, real latency metrics, and verified production code.
        </p>
      </div>

      {/* Case Studies Sequence */}
      <div className="max-w-[1280px] mx-auto space-y-24 sm:space-y-36">
        {CASE_STUDIES.map((study, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article
              key={study.id}
              className="case-study-item relative rounded-3xl border border-white/10 bg-[#0E1015]/80 backdrop-blur-xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20"
            >
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

              {/* Top Case Meta HUD */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-[#FFE600] font-bold tracking-widest">{study.chapter}</span>
                  <span className="text-white/20">&bull;</span>
                  <span className="text-muted uppercase tracking-wider">{study.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="stamp-box px-2.5 py-0.5 border-[#FFE600]/40 text-[#FFE600] text-[10px] font-bold">
                    {study.metrics}
                  </span>
                </div>
              </div>

              {/* Main Content Layout: Two-Column Documentary Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Visual Side (6 cols) */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <FlashlightReveal
                    radius={220}
                    label="TORCHLIGHT // INSPECT SCHEMATICS"
                    className="rounded-2xl border border-white/15 bg-black overflow-hidden shadow-xl"
                    revealedContent={
                      /* Secret Revealed Layer: Technical Wireframe & Telemetry Overlay */
                      <div className="w-full h-full bg-[#050608] p-6 flex flex-col justify-between text-xs font-mono text-[#FFE600]">
                        <div className="flex items-center justify-between border-b border-[#FFE600]/30 pb-2">
                          <span className="font-bold uppercase tracking-wider">SYSTEM TOPOLOGY</span>
                          <span>X-RAY REVEAL</span>
                        </div>
                        <div className="my-auto space-y-3 py-3">
                          <div className="p-3 rounded-lg bg-black/80 border border-[#FFE600]/30">
                            <span className="text-[10px] text-white/50 block">ARCHITECTURE SPECS</span>
                            <span className="text-white text-xs">{study.subtitle}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-black/80 border border-[#FFE600]/30">
                            <span className="text-[10px] text-white/50 block">STACK COMPONENTS</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {study.tech.map((t, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#FFE600]/10 text-[#FFE600]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-[#FFE600]/30 pt-2 flex items-center justify-between text-[10px] text-white/60">
                          <span>VERIFIED PRODUCTION CODE</span>
                          <span className="text-[#FFE600]">INSPECTION ACTIVE</span>
                        </div>
                      </div>
                    }
                  >
                    <div className="relative aspect-[16/10] w-full bg-black/90 group cursor-pointer">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Floating bottom label */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                        <span className="truncate">{study.title}</span>
                        <span className="text-[#FFE600] shrink-0 font-semibold">{study.metrics}</span>
                      </div>
                    </div>
                  </FlashlightReveal>
                </div>

                {/* Narrative Side (6 cols) */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-display italic text-white tracking-tight leading-tight">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#FFE600] mt-2 leading-relaxed">
                      {study.subtitle}
                    </p>
                  </div>

                  {/* Problem & Solution Brief */}
                  <div className="space-y-4 text-xs sm:text-sm font-body text-white/70 leading-relaxed">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono uppercase text-[#FF4B4B] tracking-wider mb-1 font-semibold">
                        [ THE PROBLEM ]
                      </div>
                      <p>{study.problem}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] font-mono uppercase text-[#38BDF8] tracking-wider mb-1 font-semibold">
                        [ THE SOLUTION &amp; CONTRIBUTION ]
                      </div>
                      <p>{study.solution}</p>
                    </div>
                  </div>

                  {/* Verified Resume Highlights */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-muted tracking-widest flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#FFE600]" />
                      <span>Verified Achievements &amp; Contributions</span>
                    </div>
                    {study.resumeHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-mono text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {study.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => openArchitecture(study.architectureDossierId)}
                      className="px-5 py-2.5 rounded-full bg-[#FFE600] hover:bg-[#FFE600]/90 text-black font-semibold text-xs font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-[#FFE600]/20"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Full Architecture Dossier</span>
                    </button>

                    {study.github && (
                      <a
                        href={study.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                      >
                        <FaGithub className="w-3.5 h-3.5 text-white" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3 text-muted" />
                      </a>
                    )}

                    {study.liveDemo && study.liveDemo !== study.github && (
                      <a
                        href={study.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3 h-3 text-muted" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* The Master Scrollable Architecture Compendium Modal */}
      <ArchitectureCompendiumModal
        isOpen={compendiumOpen}
        onClose={() => setCompendiumOpen(false)}
        initialArticleId={targetArticleId}
      />
    </section>
  );
}
