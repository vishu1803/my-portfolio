"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useId } from "react";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const dialogRef = useAccessibleDialog(isOpen, onClose);
  const titleId = useId();
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={reducedMotion ? false : { scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl my-auto rounded-3xl border border-white/10 bg-surface shadow-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              data-dialog-close
              aria-label="Close resume dialog"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-sm font-mono"
            >
              ✕
            </button>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC] block mb-2">
              Curriculum Vitae
            </span>

            <h3 id={titleId} className="text-3xl font-display italic text-text-primary mb-3">
              Vishwanath Nishad
            </h3>

            <p className="text-sm text-muted mb-6 leading-relaxed">
              Full Stack & Backend Software Engineer specializing in scalable APIs, distributed workflows, and modern web applications.
            </p>

            <div className="space-y-3 mb-8">
              <a
                href="/assets/aistudio/software-vishu_1f0ccd66.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-[#FFE600]/40 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-medium text-white group-hover:text-[#FFE600] transition-colors">
                    Software Engineer Resume (PDF)
                  </h4>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    Resume &bull; Full-Stack, Backend &amp; Algorithms
                  </p>
                </div>
                <span className="text-xs font-mono text-black px-3.5 py-1.5 rounded-full bg-[#FFE600] group-hover:bg-white transition-colors font-semibold">
                  Download ↓
                </span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    Direct Browser Mirror (/resume.pdf)
                  </h4>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    Fast In-Tab Preview &bull; Clean Architecture
                  </p>
                </div>
                <span className="text-xs font-mono text-white px-3 py-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  Open ↗
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stroke">
              <span className="text-xs font-mono text-muted break-all">
                Direct: vishwanatnishad@gmail.com
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-text-primary transition-colors"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
