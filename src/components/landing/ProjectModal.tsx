"use client";
import useReducedMotion from "../../hooks/useMotionPreference";

import { motion, AnimatePresence } from "framer-motion";
import { useId } from "react";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";
import { ProjectItem } from "./SelectedWorks";
import ProjectMockupFrame from "./ProjectMockupFrame";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogId = useId();
  const reduced = useReducedMotion();
  const dialogRef = useAccessibleDialog(Boolean(project), onClose);

  return (
    <AnimatePresence>
      {project && (
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
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0B0C0E] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              data-dialog-close
              aria-label="Close project"
              onClick={onClose}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-text-primary/70 hover:text-text-primary transition-all text-sm font-mono z-20"
            >
              <span aria-hidden="true">✕</span>
            </button>

            {/* Top metadata */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">
                {project.category}
              </span>
              <span className="text-muted/40 text-xs">&bull;</span>
              <span className="text-[11px] font-mono text-muted">
                {project.metrics}
              </span>
            </div>

            <h2
              id={dialogId}
              className="text-3xl sm:text-4xl font-display italic text-text-primary mb-6"
            >
              {project.title}
            </h2>

            {/* Software Window Mockup */}
            <div className="mb-6">
              <ProjectMockupFrame
                image={project.image}
                title={project.title}
                urlHost={project.urlHost}
                badge={project.metrics}
                aspect="aspect-video"
              />
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-muted leading-relaxed mb-6 font-body">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary/80 mb-3">
                Key Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 rounded-full bg-text-primary text-bg font-medium text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                <span>Open project</span>
                <span>↗</span>
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-full border border-stroke bg-bg hover:bg-surface text-text-primary text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-colors"
                >
                  <span>Repository</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
