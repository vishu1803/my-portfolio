"use client";
import useReducedMotion from "../../hooks/useMotionPreference";

import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";
import Image from "next/image";
import { JournalArticle } from "./Journal";

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const dialogId = useId();
  const reduced = useReducedMotion();
  const dialogRef = useAccessibleDialog(Boolean(article), onClose);

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogId}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={reduced ? false : { scale: 0.97, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.97, opacity: 0, y: 12 }}
            transition={{
              duration: reduced ? 0 : 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-surface shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              data-dialog-close
              aria-label="Close article"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-sm font-mono"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Top metadata */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF3B47]">
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

            <h2
              id={dialogId}
              className="text-2xl sm:text-4xl font-display italic text-text-primary mb-3"
            >
              {article.title}
            </h2>

            <p className="text-sm text-[#FF3B47] font-mono mb-6 leading-relaxed">
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
            {article.architecturePoints &&
              article.architecturePoints.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl bg-black/50 border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary/90 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B47]" />
                    <span>Project highlights</span>
                  </h4>
                  <div className="space-y-2">
                    {article.architecturePoints.map((pt, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono text-text-primary/80 flex items-start gap-2.5"
                      >
                        <span className="text-[#FF3B47]">0{i + 1}.</span>
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
                  <span>Illustrative code pattern</span>
                  <span className="text-[#FF3B47]">
                    Explanation, not a repository extract
                  </span>
                </div>
                <pre className="text-xs font-mono text-text-primary/90 overflow-x-auto p-1 leading-relaxed selection:bg-[#4E85BF]/40">
                  <code>{article.codeSnippet}</code>
                </pre>
              </div>
            )}

            {article.sourceUrl && (
              <p className="mb-6 text-xs text-muted">
                Source:{" "}
                <a
                  className="underline underline-offset-4 hover:text-white"
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.sourceLabel} ↗
                </a>
              </p>
            )}
            {/* Footer with links */}
            <div className="pt-4 border-t border-stroke flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={article.githubRepo}
                  aria-label={`GitHub: ${article.title}, source code (opens in a new tab)`}
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
                    aria-label={`Live site: ${article.title} (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-text-primary tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <span>Live demo</span>
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
