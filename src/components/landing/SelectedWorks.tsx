"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectMockupFrame from "./ProjectMockupFrame";
import { CASE_STUDIES } from "../../data/caseStudies";

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  urlHost: string;
  span: string;
  link: string;
  github?: string;
  description: string;
  metrics: string;
  tech: string[];
}

export const PROJECTS_DATA: ProjectItem[] = CASE_STUDIES.map((study, index) => ({
  id: study.id, index: String(index + 1).padStart(2, "0"), title: study.title,
  category: study.category, tag: study.category, image: study.image,
  urlHost: study.liveDemo ? new URL(study.liveDemo).hostname : "github.com",
  span: "col-span-1", link: study.liveDemo || study.github, github: study.github,
  description: study.solution, metrics: study.focus, tech: study.tech,
}));

interface SelectedWorksProps { onSelectProject: (project: ProjectItem) => void; }

const DECK_OFFSETS = [
  { rot: 0, x: 0, y: 0 },
  { rot: 2.2, x: 8, y: 10 },
  { rot: -2.0, x: -8, y: 20 },
  { rot: 3.5, x: 12, y: 30 },
  { rot: -3.2, x: -12, y: 40 },
  { rot: 1.8, x: 6, y: 50 },
  { rot: -1.6, x: -6, y: 60 },
  { rot: 0.8, x: 2, y: 70 },
];

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const total = PROJECTS_DATA.length;

  // Cycle the deck so that the active card is always at the top of the stack
  const orderedProjects = [
    ...PROJECTS_DATA.slice(activeCardIndex),
    ...PROJECTS_DATA.slice(0, activeCardIndex),
  ];

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev + 1) % total);
  };

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Centered Section Header - Clean & Uniform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
              Selected Work
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-body">
            Featured{" "}
            <span className="font-display italic text-text-primary">
              projects
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            Full-stack systems, automated AI engines, and developer tooling.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN DISPLAY: DECK OF CARDS (STACKED) OR EXPANDED GRID                    */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* VISUAL DECK OF CARDS - STACKED ONE ON TOP OF ANOTHER */
            <div
              key="deck-view"
              className="relative w-full max-w-[940px] mx-auto h-[530px] sm:h-[550px] md:h-[570px] select-none"
            >
              {/* Stacked Cards */}
              {orderedProjects.map((project, idx) => {
                const offset = DECK_OFFSETS[idx % DECK_OFFSETS.length];
                const zIndex = total - idx;
                const isTop = idx === 0;

                return (
                  <motion.div
                    key={project.id}
                    style={{
                      zIndex,
                      transform: `rotate(${offset.rot}deg) translateY(${offset.y}px) translateX(${offset.x}px)`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute inset-x-0 top-0 transition-all duration-300"
                  >
                    <div
                      onClick={() => onSelectProject(project)}
                      className={`relative w-full rounded-3xl bg-[#0B0C10] border transition-all duration-300 ${
                        isTop
                          ? "border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] cursor-pointer"
                          : "border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.8)] opacity-95 pointer-events-none"
                      } p-5 sm:p-7 md:p-8 backdrop-blur-xl`}
                    >
                      {/* Top Specular Edge Glow */}
                      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                      {/* Card Meta Bar */}
                      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#89AACC] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10">
                            {project.index} / 0{total}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">
                            {project.category}
                          </span>
                        </div>

                        {/* Top card arrow button: jumps to the next card in the deck */}
                        {isTop && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400 hidden sm:inline">
                              ● {project.metrics}
                            </span>
                            <button
                              type="button"
                              onClick={handlePrevCard}
                              title="Previous Card"
                              className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-xs text-muted hover:text-white flex items-center justify-center transition-all cursor-pointer"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              onClick={handleNextCard}
                              title="Next Card"
                              className="px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-xs font-mono text-[#89AACC] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span>Next</span>
                              <span>→</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-7">
                          <ProjectMockupFrame
                            image={project.image}
                            title={project.title}
                            urlHost={project.urlHost}
                            badge={project.metrics}
                            aspect="aspect-[16/9]"
                          />
                        </div>

                        <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-display italic text-text-primary tracking-tight mb-2">
                              {project.title}
                            </h3>
                            <p className="text-xs text-muted font-body leading-relaxed line-clamp-3 mb-3">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.slice(0, 3).map((t, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-muted"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Jump to next card arrow button */}
                          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs font-mono text-muted">
                              Card {project.index} of 0{total}
                            </span>
                            <button
                              type="button"
                              onClick={handleNextCard}
                              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-xs font-mono text-[#89AACC] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer group"
                            >
                              <span>Jump to Next Card</span>
                              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* EXPANDED PROPERLY ON SINGLE PAGE */
            <motion.div
              key="expanded-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {PROJECTS_DATA.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.04,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onClick={() => onSelectProject(project)}
                  className="group relative bg-[#0B0C10] border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_12px_36px_rgba(137,170,204,0.15)] hover:-translate-y-1 backdrop-blur-xl"
                >
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-2.5 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-muted/70 font-semibold">
                        {project.index}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-mono text-[#89AACC] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-emerald-400">
                      {project.metrics}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-4">
                    <h3 className="text-xl font-display italic text-text-primary tracking-tight group-hover:text-white transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted font-body leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Software Mockup Window */}
                  <div className="relative my-2">
                    <ProjectMockupFrame
                      image={project.image}
                      title={project.title}
                      urlHost={project.urlHost}
                      badge={project.metrics}
                      aspect="aspect-[16/10]"
                    />
                  </div>

                  {/* Tech stack & Blueprint link */}
                  <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.tech.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-black/40 border border-white/5 text-[10px] font-mono text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#89AACC] group-hover:text-white transition-colors">
                      <span>Blueprint</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* ONE SIMPLE BUTTON TO EXPAND / COLLAPSE AT THE BOTTOM                      */}
        {/* ========================================================================= */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (isExpanded) {
                const workEl = document.getElementById("work");
                if (workEl) workEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-7 py-3 rounded-full bg-text-primary hover:bg-white text-bg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 flex items-center gap-2 group cursor-pointer"
          >
            <span>{isExpanded ? "Collapse to Deck of Cards" : `Expand All Projects (${total})`}</span>
            <span className="transition-transform duration-200 group-hover:translate-y-0.5">
              {isExpanded ? "↑" : "↓"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
