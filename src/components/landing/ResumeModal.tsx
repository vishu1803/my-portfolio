"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-surface shadow-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-sm font-mono"
            >
              ✕
            </button>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC] block mb-2">
              Curriculum Vitae
            </span>

            <h3 className="text-3xl font-display italic text-text-primary mb-3">
              Vishwanath Nishad
            </h3>

            <p className="text-sm text-muted mb-6 leading-relaxed">
              Full Stack & Backend Software Engineer specializing in scalable APIs, distributed workflows, and modern web applications.
            </p>

            <div className="space-y-3 mb-8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-bg/60 border border-stroke hover:border-white/20 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-[#89AACC] transition-colors">
                    Primary Engineering Resume (PDF)
                  </h4>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    Latest revision &bull; Full Stack & Systems
                  </p>
                </div>
                <span className="text-xs font-mono text-text-primary px-3 py-1.5 rounded-full bg-stroke/50 group-hover:bg-text-primary group-hover:text-bg transition-colors">
                  Download ↓
                </span>
              </a>

              <a
                href="/resume2.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-bg/60 border border-stroke hover:border-white/20 transition-all group"
              >
                <div>
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-[#89AACC] transition-colors">
                    Alternate Technical Curriculum (PDF)
                  </h4>
                  <p className="text-xs text-muted font-mono mt-0.5">
                    Detailed Project & Stack Breakdowns
                  </p>
                </div>
                <span className="text-xs font-mono text-text-primary px-3 py-1.5 rounded-full bg-stroke/50 group-hover:bg-text-primary group-hover:text-bg transition-colors">
                  View ↗
                </span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stroke">
              <span className="text-xs font-mono text-muted">
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
