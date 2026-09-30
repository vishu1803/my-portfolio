"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TransformerLab from "../playground/TransformerLab";
import SkillArtifacts from "./SkillArtifacts";

export default function Explorations() {
  const [isLabOpen, setIsLabOpen] = useState(false);
  const labContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenLab = () => {
    setIsLabOpen(true);
    setTimeout(() => {
      labContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section
      id="explorations"
      className="relative bg-bg overflow-hidden py-24 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" />

      {/* Centered Section Header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-12 sm:mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
              Visual Playground
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-body">
            Transformer{" "}
            <span className="font-display italic text-text-primary">
              laboratory
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
            An interactive visual laboratory exploring how Large Language Model Transformers work: subword tokenization, multi-head self-attention heatmaps, and autoregressive probability sampling.
          </p>
        </div>
      </div>

      {/* VISUAL PLAYGROUND INTERACTIVE STAGE */}
      <div
        ref={labContainerRef}
        className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-20 relative z-30"
      >
        <AnimatePresence mode="wait">
          {!isLabOpen ? (
            /* EXCITING VISUAL TEASER & LAUNCH CONSOLE */
            <motion.div
              key="teaser-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              onClick={handleOpenLab}
              className="group relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0B0C0E]/90 hover:border-white/30 backdrop-blur-xl shadow-2xl p-6 sm:p-10 md:p-12 cursor-pointer transition-all duration-500 hover:shadow-[0_0_50px_rgba(137,170,204,0.25)]"
            >
              {/* Animated ambient gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10141f] via-transparent to-[#0e1724]/40 opacity-80" />
              <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#4E85BF]/15 blur-3xl group-hover:bg-[#4E85BF]/25 transition-all duration-700 pointer-events-none" />

              {/* Halftone texture overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />

              {/* Teaser Header HUD */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89AACC] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#89AACC]" />
                  </span>
                  <span className="font-mono text-xs text-text-primary tracking-widest uppercase">
                    LLM Transformer Neural Architecture
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#89AACC] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10">
                  <span>Self-Attention Matrix</span>
                  <span>&bull;</span>
                  <span>Autoregressive Sampling</span>
                </div>
              </div>

              {/* Center Exciting Visual: Live Attention Vector Flow */}
              <div className="relative z-10 my-6 sm:my-8">
                <div className="max-w-3xl">
                  <div className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#89AACC] mb-3">
                    [ Interactive Workbench Available ]
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-text-primary leading-[1.15] mb-4">
                    Inspect Attention Heads, Scaled Dot-Products & Generation Probabilities
                  </h3>
                  <p className="text-sm md:text-base text-muted font-body leading-relaxed max-w-2xl">
                    Dive under the hood of modern Large Language Models. Calculate queries and keys, visualize token coreference resolution, and simulate nucleus next-token sampling in real time.
                  </p>
                </div>

                {/* Simulated Interactive Matrix Flow Grid */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 group-hover:border-white/20 transition-all">
                    <span className="text-[10px] text-muted block mb-1">01. TOKENIZATION</span>
                    <span className="text-sm font-semibold text-text-primary">50,257 BPE</span>
                    <span className="text-[10px] text-[#89AACC] block mt-0.5">Subword Token IDs</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 group-hover:border-white/20 transition-all">
                    <span className="text-[10px] text-muted block mb-1">02. MULTI-HEAD</span>
                    <span className="text-sm font-semibold text-text-primary">12 Parallel Heads</span>
                    <span className="text-[10px] text-[#89AACC] block mt-0.5">Softmax(QKᵀ / √dₖ)</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 group-hover:border-white/20 transition-all">
                    <span className="text-[10px] text-muted block mb-1">03. EMBEDDINGS</span>
                    <span className="text-sm font-semibold text-text-primary">d_model = 768</span>
                    <span className="text-[10px] text-[#89AACC] block mt-0.5">Sinusoidal PE Matrix</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 group-hover:border-white/20 transition-all">
                    <span className="text-[10px] text-muted block mb-1">04. SAMPLING</span>
                    <span className="text-sm font-semibold text-text-primary">Dynamic Top-P / Top-K</span>
                    <span className="text-[10px] text-[#89AACC] block mt-0.5">Temperature Logits</span>
                  </div>
                </div>
              </div>

              {/* Exciting Launch CTA Button */}
              <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted">
                    Click anywhere or launch below to start live experimentation:
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg font-mono text-xs font-bold uppercase tracking-wider shadow-xl group-hover:bg-white transition-all transform group-hover:scale-105">
                  <span className="w-2 h-2 rounded-full bg-[#4E85BF] animate-ping" />
                  <span>Launch Interactive Laboratory</span>
                  <span className="text-sm">↗</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* FULL OPENED TRANSFORMER LABORATORY WITH COLLAPSE BAR */
            <motion.div
              key="opened-lab"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Studio Active Bar with Collapse Controls */}
              <div className="p-3.5 px-6 rounded-2xl bg-[#0c0d10] border border-white/15 flex items-center justify-between backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-text-primary font-semibold tracking-wider">
                    INTERACTIVE STUDIO ACTIVE &bull; TRANSFORMER WORKBENCH
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLabOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-muted hover:text-text-primary transition-all flex items-center gap-1.5"
                >
                  <span>✕</span>
                  <span>Minimize Laboratory</span>
                </button>
              </div>

              {/* The Core Live Transformer Laboratory */}
              <TransformerLab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SKILL ARTIFACTS: MULTIPLE STREAMLINES FLOATING IN OPPOSITE DIRECTIONS */}
      <SkillArtifacts />
    </section>
  );
}
