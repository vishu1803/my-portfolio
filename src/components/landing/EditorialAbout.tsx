"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Briefcase, 
  GraduationCap, 
  Terminal, 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Download
} from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";

interface EditorialAboutProps {
  onOpenResume?: () => void;
}

export default function EditorialAbout({ onOpenResume }: EditorialAboutProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".about-card", {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const resumePdfPath = "/assets/aistudio/software-vishu_1f0ccd66.pdf";
  const leetcodeUrl = "https://leetcode.com/u/vishwanatnishad";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#08090B] text-[#FAF8F5] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none film-grain opacity-[0.035]" />
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#FFE600]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#4E85BF]/8 blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-[1280px] mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#FFE600] mb-3">
          <span className="w-8 h-px bg-[#FFE600]" />
          <span>PERSONNEL RECORD // DOSSIER</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display italic tracking-tight text-white leading-tight">
              Engineering Disciplines &amp;{" "}
              <span className="vox-highlight not-italic font-body tracking-normal text-3xl sm:text-4xl md:text-5xl px-3 py-0.5">
                Background
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenResume) onOpenResume();
                else window.open(resumePdfPath, "_blank");
              }}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-mono text-white flex items-center gap-2 transition-all hover:border-[#FFE600]/50"
            >
              <Download className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Download Resume Dossier (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto space-y-16">
        {/* ROW 1: Experience & Algorithmic Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1 (7 cols): Verified Professional Experience */}
          <div className="about-card lg:col-span-7 rounded-3xl bg-[#0E1015]/80 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFE600]/10 border border-[#FFE600]/25 flex items-center justify-center text-[#FFE600]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Professional Experience</h3>
                  <p className="text-xs font-mono text-muted">Experience from resume</p>
                </div>
              </div>
              <span className="stamp-box px-2.5 py-0.5 border-[#FFE600]/40 text-[#FFE600] text-[10px] font-bold">
                JUN 2024 &ndash; SEP 2024
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-xl sm:text-2xl font-display italic text-white">
                  Full Stack Developer Intern
                </h4>
                <span className="text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/20">
                  FTV Saloon &bull; Remote
                </span>
              </div>

              <p className="text-xs sm:text-sm font-body text-white/70 leading-relaxed">
                Worked on backend APIs, authentication and frontend performance within a remote Agile team, as described in the resume.
              </p>

              {/* Specific verified bullet points from resume */}
              <div className="space-y-3 pt-2">
                {[
                  "Designed and implemented robust RESTful APIs for core salon operations, ensuring reliable data consistency across services.",
                  "Developed a secure authentication system featuring role-based access control (RBAC) and specialized admin dashboards.",
                  "Optimized critical backend database queries and frontend asset loading, resulting in a 40% reduction in page load time.",
                  "Collaborated remotely within an Agile development framework, utilizing Git workflows for team version control.",
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-[13px] font-mono text-white/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 (5 cols): Algorithmic Discipline & LeetCode */}
          <div className="about-card lg:col-span-5 rounded-3xl bg-[#0E1015]/80 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF4B4B]/10 border border-[#FF4B4B]/25 flex items-center justify-center text-[#FF4B4B]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Algorithmic Practice</h3>
                    <p className="text-xs font-mono text-muted">Competitive Problem Solving</p>
                  </div>
                </div>
                <span className="stamp-box px-2.5 py-0.5 border-[#FF4B4B]/40 text-[#FF4B4B] text-[10px] font-bold">
                  ACTIVE DAILY
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-display italic text-[#FFE600]">
                    300+ Problems
                  </div>
                  <div className="text-xs font-mono uppercase text-white/60 mt-1">
                    Solved across Data Structures &amp; Algorithms
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono text-white/80 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFE600]">&bull;</span>
                    <span>Practice topics: Dynamic Programming, Graph Traversals, Trees, Arrays &amp; Binary Search.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFE600]">&bull;</span>
                    <span>Daily competitive programming to maintain sharp analytical rigor and interview readiness.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FFE600]">&bull;</span>
                    <span>Algorithmic practice alongside application development.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all hover:border-[#FFE600]/40"
              >
                <Code2 className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>Verify LeetCode Profile (@vishwanatnishad)</span>
                <ExternalLink className="w-3 h-3 text-muted" />
              </a>
            </div>
          </div>
        </div>

        {/* ROW 2: Organized Technical Skills Matrix */}
        <div className="about-card rounded-3xl bg-[#0E1015]/80 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
          <div className="border-b border-white/10 pb-4 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-display italic text-white">
                Technical Taxonomy &amp; Core Competencies
              </h3>
              <p className="text-xs font-mono text-muted mt-1">
                Languages, frameworks and tools named in the supplied resume
              </p>
            </div>
            <span className="text-xs font-mono text-[#FFE600]">
              SOURCE: SUPPLIED RESUME
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Group 1: Backend & APIs */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFE600]">
                <Server className="w-4 h-4" />
                <span>Backend &amp; APIs</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-white/90">
                {["FastAPI", "Fastify", "Flask", "Node.js & Express.js"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2: Databases & Storage */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#38BDF8]">
                <Database className="w-4 h-4" />
                <span>Databases &amp; ORMs</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-white/90">
                {["PostgreSQL", "Prisma ORM", "Drizzle ORM", "Redis"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 3: Languages & Runtimes */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4B4B]">
                <Terminal className="w-4 h-4" />
                <span>Languages</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-white/90">
                {["Python", "JavaScript", "TypeScript (Project Stack)", "C (Coursework)"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B4B]/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group 4: Cloud, DevOps & Web */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#89AACC]">
                <Cpu className="w-4 h-4" />
                <span>DevOps &amp; Web</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-white/90">
                {["Next.js", "React", "Tailwind CSS", "GitHub Actions", "Docker Compose"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-b-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Academic Credential Plate */}
        <div className="about-card rounded-3xl bg-[#0E1015]/80 border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/25 flex items-center justify-center text-[#FFE600] shrink-0 mt-1">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#FFE600]">
                EDUCATION RECORD // 2021 &ndash; 2025
              </div>
              <h4 className="text-xl sm:text-2xl font-display italic text-white mt-1">
                Bachelor of Technology in Electronics Engineering
              </h4>
              <p className="text-xs sm:text-sm font-mono text-white/80 mt-1">
                Rajkiya Engineering College &bull; Education record: 2021 – July 2025
              </p>
              <p className="text-xs font-mono text-muted mt-2 max-w-2xl leading-relaxed">
                Relevant Systems Coursework: Data Structures &amp; Algorithms, C, Python, System Modeling, Digital Logic, Operating Systems, Database Management Systems (DBMS), Computer Networks.
              </p>
            </div>
          </div>

          <div className="shrink-0 self-end md:self-center">
            <span className="stamp-box px-3 py-1.5 border-white/20 text-white/90 text-xs font-mono">
              REC // EN-2025
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
