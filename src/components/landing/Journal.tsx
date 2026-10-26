"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ArchitectureCompendiumModal from "./ArchitectureCompendiumModal";
import { CASE_STUDIES, CONTENT_REVIEW_DATE } from "../../data/caseStudies";

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  githubRepo: string;
  liveDemo?: string;
  excerpt: string;
  codeSnippet?: string;
  architecturePoints: string[];
  content: string[];
  sourceUrl?: string;
  sourceLabel?: string;
}

export const JOURNAL_DATA: JournalArticle[] = CASE_STUDIES.map(study => ({
  id: study.id, title: study.title, subtitle: study.focus, category: study.category,
  readTime: "Project notes", date: `Source review: ${CONTENT_REVIEW_DATE}`,
  image: study.image, githubRepo: study.github, liveDemo: study.liveDemo || undefined,
  excerpt: study.problem, architecturePoints: study.highlights,
  content: [study.problem, study.solution, study.note],
  sourceUrl: study.sourceUrl, sourceLabel: study.sourceLabel,
}));

interface JournalProps {
  onSelectArticle: (article: JournalArticle) => void;
}

export default function Journal({ onSelectArticle }: JournalProps) {
  const [isCompendiumOpen, setIsCompendiumOpen] = useState(false);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Centered Header pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
              Systems & Architecture
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-body">
            Architectural{" "}
            <span className="font-display italic text-text-primary">
              writings
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            Real engineering benchmarks, code diffs, and architectural insights from shipped GitHub repositories.
          </p>

          {/* Simple Button: Open Full Project Architecture Compendium */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsCompendiumOpen(true)}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface/90 hover:bg-surface border border-white/15 hover:border-[#89AACC]/50 text-xs sm:text-sm font-mono text-text-primary transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(137,170,204,0.15)] cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#89AACC] group-hover:scale-125 transition-transform" />
              <span className="font-medium text-white">View Full Systems Architecture Compendium</span>
              <span className="text-[#89AACC] text-xs font-mono">
                ({JOURNAL_DATA.length} Projects)
              </span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted group-hover:text-white">
                ↗
              </span>
            </button>
          </div>
        </motion.div>

        {/* Real technical articles */}
        <div className="space-y-4 md:space-y-5">
          {JOURNAL_DATA.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectArticle(article)}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 md:p-5 bg-surface/40 hover:bg-surface border border-stroke rounded-[28px] sm:rounded-full transition-all duration-300 cursor-pointer hover:border-white/20 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 rounded-[28px] sm:rounded-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Left side: Thumbnail + Title + Subtitle */}
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/40">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-mono text-muted tracking-wider uppercase">
                      {article.category}
                    </span>
                    <span className="text-muted/40 text-xs hidden sm:inline">&bull;</span>
                    <span className="text-[11px] font-mono text-[#89AACC] hidden sm:inline">
                      {article.readTime}
                    </span>
                    <span className="text-muted/40 text-xs hidden md:inline">&bull;</span>
                    <span className="text-[11px] font-mono text-muted/70 hidden md:inline truncate max-w-xs">
                      {article.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-[#89AACC] transition-colors truncate">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Right side: Date + Action arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-16 sm:pl-0">
                <span className="text-xs font-mono text-muted">
                  {article.date}
                </span>

                <div className="w-8 h-8 rounded-full border border-stroke bg-bg/80 flex items-center justify-center text-text-primary text-xs group-hover:border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Architecture Compendium Scrollable Modal */}
      <ArchitectureCompendiumModal
        isOpen={isCompendiumOpen}
        onClose={() => setIsCompendiumOpen(false)}
      />
    </section>
  );
}
