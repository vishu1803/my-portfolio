"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { JournalArticle, JOURNAL_DATA } from "./Journal";

interface ArchitectureCompendiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArticleId?: string | null;
}

export default function ArchitectureCompendiumModal({
  isOpen,
  onClose,
  initialArticleId,
}: ArchitectureCompendiumModalProps) {
  const [activeTab, setActiveTab] = useState<string>(
    initialArticleId || JOURNAL_DATA[0]?.id || "ai-career-hub"
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Sync initial article if provided
  useEffect(() => {
    if (initialArticleId) {
      setActiveTab(initialArticleId);
      const targetEl = document.getElementById(`compendium-${initialArticleId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [initialArticleId, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleScrollToProject = (id: string) => {
    setActiveTab(id);
    const targetEl = document.getElementById(`compendium-${id}`);
    if (targetEl && scrollContainerRef.current) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-[#0B0C0E] shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* Top Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0e1014]/90 backdrop-blur-md z-20 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#89AACC] animate-pulse" />
                <div>
                  <h3 className="text-base sm:text-xl font-medium text-text-primary tracking-tight flex items-center gap-2">
                    <span>Full Systems Architecture Compendium</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted hidden sm:inline-block">
                      GitHub Top Projects
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-muted mt-0.5">
                    Engineering benchmarks, data pipelines, trade-offs, and source code
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-xs sm:text-sm font-mono"
                title="Close Compendium (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Quick-Jump Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#08090b] border-b border-white/5 overflow-x-auto scrollbar-none z-10 shrink-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted shrink-0 mr-1 hidden sm:inline">
                Jump to:
              </span>
              {JOURNAL_DATA.map((article) => {
                const isActive = activeTab === article.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => handleScrollToProject(article.id)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 border ${
                      isActive
                        ? "bg-[#89AACC]/20 border-[#89AACC]/50 text-white font-medium"
                        : "bg-white/[0.02] border-white/5 text-muted hover:text-text-primary hover:border-white/20"
                    }`}
                  >
                    {article.category}
                  </button>
                );
              })}
            </div>

            {/* Scrollable Window with Complete Architectural Writings */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-16 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            >
              {JOURNAL_DATA.map((article, index) => (
                <article
                  key={article.id}
                  id={`compendium-${article.id}`}
                  className="pt-4 pb-12 border-b border-white/10 last:border-b-0 space-y-8"
                >
                  {/* Article Index & Category */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#89AACC] px-2.5 py-1 rounded-lg bg-[#89AACC]/10 border border-[#89AACC]/20">
                        PROJECT 0{index + 1}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-muted">
                        {article.category}
                      </span>
                      <span className="text-muted/40 text-xs">&bull;</span>
                      <span className="text-xs font-mono text-muted">
                        {article.readTime}
                      </span>
                    </div>

                    {/* External GitHub & Live Demo Links */}
                    <div className="flex items-center gap-2">
                      {article.githubRepo && (
                        <a
                          href={article.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-text-primary transition-all flex items-center gap-1.5"
                        >
                          <span>GitHub</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      )}
                      {article.liveDemo && (
                        <a
                          href={article.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-[#89AACC]/20 hover:bg-[#89AACC]/30 border border-[#89AACC]/30 text-xs font-mono text-white transition-all flex items-center gap-1.5"
                        >
                          <span>Live Site</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display italic text-text-primary mb-3">
                      {article.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#89AACC] font-mono leading-relaxed">
                      {article.subtitle}
                    </p>
                  </div>

                  {/* Visual Architecture Mockup Frame */}
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl group">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1000px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 halftone-overlay opacity-25 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating architectural badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                      <span className="truncate">{article.githubRepo.replace("https://", "")}</span>
                      <span className="text-[#89AACC] shrink-0 font-semibold">{article.date}</span>
                    </div>
                  </div>

                  {/* Systems Architecture Highlights */}
                  {article.architecturePoints && article.architecturePoints.length > 0 && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                        <span>Core Architectural Pillars & Decisions</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {article.architecturePoints.map((pt, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-text-primary/90 flex items-start gap-2.5 leading-relaxed"
                          >
                            <span className="text-[#89AACC] font-bold">0{i + 1}.</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* In-depth Engineering Analysis Content */}
                  <div className="space-y-4 text-sm sm:text-base text-muted/90 leading-relaxed">
                    {article.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Production Code Snippet */}
                  {article.codeSnippet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-[#12141a] border-t border-x border-white/10 text-xs font-mono text-muted">
                        <span className="text-[#89AACC]">{"// Production Implementation Extract"}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(article.id, article.codeSnippet || "")}
                          className="hover:text-text-primary transition-colors flex items-center gap-1"
                        >
                          <span>{copiedSnippetId === article.id ? "✓ Copied" : "Copy Code"}</span>
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 rounded-b-xl bg-[#07080a] border border-white/10 overflow-x-auto text-xs sm:text-[13px] font-mono text-text-primary/90 leading-relaxed scrollbar-thin scrollbar-thumb-white/10">
                        <code>{article.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Bottom Footer Action Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0e1014]/90 backdrop-blur-md shrink-0">
              <span className="text-xs font-mono text-muted">
                Showing all {JOURNAL_DATA.length} GitHub repository architectural dossiers
              </span>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-text-primary transition-all font-medium"
              >
                Close Compendium
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
