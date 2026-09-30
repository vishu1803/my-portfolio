"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExplorationItem } from "./Explorations";

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-surface shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-text-primary transition-all text-sm font-mono z-10"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">
                {item.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
                {item.title}
              </h3>
            </div>

            {/* Media */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-5 bg-black">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
            </div>

            <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stroke">
              <div className="flex items-center gap-3 flex-wrap">
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-text-primary text-bg text-xs font-mono tracking-wider uppercase font-semibold flex items-center gap-1.5 hover:bg-white transition-colors"
                  >
                    <span>Launch Live Artifact</span>
                    <span>↗</span>
                  </a>
                )}

                {item.githubRepo && (
                  <a
                    href={item.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-text-primary tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inspect GitHub Source</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stroke bg-bg hover:bg-surface text-xs font-mono text-muted hover:text-text-primary transition-colors"
              >
                Close Artifact
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
