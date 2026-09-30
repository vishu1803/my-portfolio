"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { JournalArticle } from "./Journal";

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-surface shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-sm font-mono"
            >
              ✕
            </button>

            {/* Top metadata */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">
                {article.category}
              </span>
              <span className="text-muted/40 text-xs">&bull;</span>
              <span className="text-[11px] font-mono text-muted">
                {article.readTime}
              </span>
              <span className="text-muted/40 text-xs">&bull;</span>
              <span className="text-[11px] font-mono text-muted">
                {article.date}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-display italic text-text-primary mb-3">
              {article.title}
            </h3>

            <p className="text-sm text-[#89AACC] font-mono mb-6 leading-relaxed">
              {article.subtitle}
            </p>

            {/* Thumbnail banner */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed mb-6">
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Architecture Highlights */}
            {article.architecturePoints && article.architecturePoints.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-black/50 border border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary/90 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                  <span>Systems Architecture Breakdown</span>
                </h4>
                <div className="space-y-2">
                  {article.architecturePoints.map((pt, i) => (
                    <div
                      key={i}
                      className="text-xs font-mono text-text-primary/80 flex items-start gap-2.5"
                    >
                      <span className="text-[#89AACC]">0{i + 1}.</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet if present */}
            {article.codeSnippet && (
              <div className="mb-8 rounded-2xl bg-black/80 border border-white/10 p-4 overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono text-muted">
                  <span>Production Code Excerpt</span>
                  <span className="text-[#89AACC]">Validated Hunk</span>
                </div>
                <pre className="text-xs font-mono text-text-primary/90 overflow-x-auto p-1 leading-relaxed selection:bg-[#4E85BF]/40">
                  <code>{article.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Footer with links */}
            <div className="pt-4 border-t border-stroke flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={article.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-text-primary text-bg text-xs font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5 hover:bg-white transition-colors"
                >
                  <span>Inspect GitHub Repo</span>
                  <span>↗</span>
                </a>

                {article.liveDemo && (
                  <a
                    href={article.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-text-primary tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <span>Live Deployment</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-muted hover:text-text-primary transition-colors"
              >
                Close Article
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
