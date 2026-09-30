"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import TransformerLab from "../playground/TransformerLab";

export interface ExplorationItem {
  id: string;
  title: string;
  tag: string;
  image: string;
  rotation: number;
  description: string;
  demoUrl?: string;
  githubRepo?: string;
}

export const EXPLORATION_ITEMS: ExplorationItem[] = [
  {
    id: "ast-engine",
    title: "AI Code Review & AST LLM Engine",
    tag: "FastAPI · Python · AST Heuristics",
    image: "/ai-code-review.png",
    rotation: 2,
    description:
      "Automated code analysis engine analyzing GitHub pull requests, detecting syntax anomalies, AST patterns, and security vulnerabilities using FastAPI, AST parsers, and LLM reasoning.",
    demoUrl: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    githubRepo: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
  },
  {
    id: "obj-detection",
    title: "Edge Vision & Object Detector",
    tag: "ML · TensorFlow.js · WebGL",
    image: "/object-detection.png",
    rotation: -2.5,
    description:
      "Client-side edge vision application running real-time object classification and bounding box regression directly inside the browser using WebGL hardware acceleration.",
    demoUrl: "https://object-detection-web-app-indol.vercel.app/",
    githubRepo: "https://github.com/vishu1803",
  },
  {
    id: "deep-space",
    title: "Cosmic 3D Particles & Mesh Shaders",
    tag: "Three.js · GLSL Shaders · WebGL",
    image: "/greeting-image.jpeg",
    rotation: 1.5,
    description:
      "Interactive 3D particle simulation and GLSL shader test exploring geometry morphs, galaxy spirals, and mouse perspective warping.",
    demoUrl: "https://3-d-portfolio-website-one.vercel.app",
    githubRepo: "https://github.com/vishu1803/3D-portfolio-website",
  },
  {
    id: "product-matrix",
    title: "High-Throughput Telemetry Grid",
    tag: "Next.js · Canvas 2D · Analytics",
    image: "/product-explorer.png",
    rotation: -2,
    description:
      "High-throughput analytics platform aggregating real-time data, dynamic query indexing, interactive time-series charts, and multi-faceted parametric filtering.",
    demoUrl: "https://product-explorer-frontend-qp3m.onrender.com/",
    githubRepo: "https://github.com/vishu1803",
  },
  {
    id: "task-workflow",
    title: "Distributed Task State Machine",
    tag: "Prisma · PostgreSQL · NextAuth",
    image: "/task-manager.png",
    rotation: 2.8,
    description:
      "Distributed team workflow platform featuring granular Role-Based Access Control (RBAC), multi-tenant workspaces, atomic state mutations, and relational PostgreSQL persistence.",
    demoUrl: "https://collaborative-task-manager-fc26.vercel.app/",
    githubRepo: "https://github.com/vishu1803",
  },
  {
    id: "audio-synth",
    title: "WebAudio Harmonic Oscilloscope",
    tag: "WebAudio API · Frequency FFT",
    image: "/music.png",
    rotation: -1.8,
    description:
      "Real-time synthetic oscillator with interactive harmonic controls, canvas waveform oscilloscope, and frequency spectrum analysis.",
    demoUrl: "https://github.com/vishu1803",
    githubRepo: "https://github.com/vishu1803",
  },
];

interface ExplorationsProps {
  onSelectItem: (item: ExplorationItem) => void;
}

export default function Explorations({ onSelectItem }: ExplorationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for 2 columns
  const col1Y = useTransform(scrollYProgress, [0, 1], ["60px", "-180px"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["180px", "-280px"]);

  const col1Items = EXPLORATION_ITEMS.filter((_, idx) => idx % 2 === 0);
  const col2Items = EXPLORATION_ITEMS.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative bg-bg overflow-hidden py-24 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-30" />

      {/* Section Header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Visual Playground
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-body">
              Transformer{" "}
              <span className="font-display italic text-text-primary">
                laboratory
              </span>
            </h2>

            <p className="mt-3 text-sm md:text-base text-muted max-w-xl leading-relaxed">
              An interactive visual laboratory exploring how Large Language Model Transformers work: subword tokenization, multi-head self-attention heatmaps, and autoregressive probability sampling.
            </p>
          </div>

          {/* GitHub Lab Button */}
          <div className="hidden md:inline-flex shrink-0">
            <a
              href="https://github.com/vishu1803"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full text-xs font-mono uppercase tracking-wider px-5 py-2.5 transition-all duration-300 hover:scale-105 border border-stroke bg-surface hover:border-transparent flex items-center gap-2"
            >
              <span
                className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                aria-hidden="true"
              />
              <span className="text-text-primary">GitHub Profile & Repos</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* DEDICATED LLM TRANSFORMER EXPERIMENTATION LABORATORY */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-24 relative z-30">
        <TransformerLab />
      </div>

      {/* Layer 2: Parallax Columns (Cards for Vishwanath's Projects) */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 mt-12">
        <div className="text-center mb-16">
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono block mb-2">
            Gallery Artifacts
          </span>
          <h3 className="text-2xl sm:text-4xl font-display italic text-text-primary">
            Curated Visual Experiments
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-2">
            Click any artifact to open its blueprint or launch its live deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 md:gap-32">
          {/* Column 1 */}
          <motion.div style={{ y: col1Y }} className="space-y-16 md:space-y-28">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="group relative aspect-square max-w-[340px] mx-auto rounded-3xl overflow-hidden border border-stroke bg-surface hover:border-white/40 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-[0_0_40px_rgba(137,170,204,0.25)] hover:scale-105"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Halftone & gradient overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Details badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-bg/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider truncate">
                      {item.tag}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-text-primary truncate">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-[#89AACC] shrink-0">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: col2Y }} className="space-y-16 md:space-y-28 sm:pt-24">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="group relative aspect-square max-w-[340px] mx-auto rounded-3xl overflow-hidden border border-stroke bg-surface hover:border-white/40 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-[0_0_40px_rgba(137,170,204,0.25)] hover:scale-105"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Halftone & gradient overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Details badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-bg/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider truncate">
                      {item.tag}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-text-primary truncate">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-[#89AACC] shrink-0">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
