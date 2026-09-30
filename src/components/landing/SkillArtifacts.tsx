"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SkillDomain = "all" | "ai" | "backend" | "core" | "graphics";

export interface SkillNode {
  id: string;
  code: string;
  name: string;
  domain: "ai" | "backend" | "core" | "graphics";
  domainLabel: string;
  spec: string;
  architectureTier: string;
  details: string;
  productionContext: string[];
}

// 01. Core Languages & Execution Runtimes (7 Skills)
const STREAM_ROW_1: SkillNode[] = [
  {
    id: "python",
    code: "01.01",
    name: "Python 3.11+",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "FastAPI, AST Parsers, PyTorch",
    architectureTier: "Core Runtime",
    details: "Asynchronous microservices, AST diff chunking, memory-optimized worker threads, and LLM orchestration.",
    productionContext: ["Ai-powered-code-review-assistant", "Vulnerability Audit Rules"],
  },
  {
    id: "typescript",
    code: "01.02",
    name: "TypeScript (Strict)",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "Discriminated Unions & Invariant ASTs",
    architectureTier: "Core Runtime",
    details: "Generic constraints, structural typing, strict compiler configs, and end-to-end type safety.",
    productionContext: ["Collaborative Task Manager", "Product Data Explorer"],
  },
  {
    id: "javascript-esnext",
    code: "01.03",
    name: "JavaScript (ESNext)",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "V8 Event Loop & Web Workers",
    architectureTier: "Core Runtime",
    details: "V8 microtask queues, non-blocking asynchronous event processing, and memory profiling.",
    productionContext: ["High-Frequency DOM Visualizers", "Client Inference Engines"],
  },
  {
    id: "cpp",
    code: "01.04",
    name: "C++ (Foundational)",
    domain: "core",
    domainLabel: "SYSTEMS",
    spec: "Algorithms, Pointers, Memory Hierarchy",
    architectureTier: "Core Runtime",
    details: "Data structures, memory layouts, cache-locality principles, and hardware-near system architectures.",
    productionContext: ["Electronics Systems Architecture", "Signal Analysis"],
  },
  {
    id: "nodejs",
    code: "01.05",
    name: "Node.js (LTS)",
    domain: "core",
    domainLabel: "RUNTIMES",
    spec: "Cluster Workers & Libuv Queues",
    architectureTier: "Core Runtime",
    details: "Libuv thread pool tuning, native stream pipelining, and zero-copy buffer manipulation.",
    productionContext: ["API Gateways", "Next.js SSR Engines"],
  },
  {
    id: "bash-posix",
    code: "01.06",
    name: "Linux Shell & POSIX",
    domain: "core",
    domainLabel: "DEVOPS",
    spec: "Process Pipelines & Automation",
    architectureTier: "Core Runtime",
    details: "Unix pipeline composition, automated shell scripts, environment orchestration, and container networking.",
    productionContext: ["CI/CD GitHub Actions", "Cloud Deployment Runtimes"],
  },
  {
    id: "git-internals",
    code: "01.07",
    name: "Git & VCS Internals",
    domain: "core",
    domainLabel: "DEVOPS",
    spec: "DAGs, Tree Hashes & Patch Diffs",
    architectureTier: "Core Runtime",
    details: "Directed acyclic graphs, tree object hashing, rebase hooks, and automated GitHub Webhook diff engines.",
    productionContext: ["AI Code Review Assistant", "Continuous Integration Pipelines"],
  },
];

// 02. AI, LLM Transformers, Neural Inferencing & Compilers (7 Skills)
const STREAM_ROW_2: SkillNode[] = [
  {
    id: "transformers",
    code: "02.01",
    name: "LLM Transformers",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Multi-Head Self-Attention (Q, K, V)",
    architectureTier: "AI & Inference",
    details: "Scaled dot-product attention, sinusoidal positional embeddings, temperature scaling, and sampling.",
    productionContext: ["Transformer Laboratory", "AI PR Review Assistant"],
  },
  {
    id: "ast-treesitter",
    code: "02.02",
    name: "AST & Tree-Sitter",
    domain: "ai",
    domainLabel: "COMPILERS",
    spec: "Static Semantic Extraction",
    architectureTier: "AI & Inference",
    details: "Analyzing code diffs at abstract syntax level to catch CWE vulnerabilities deterministically.",
    productionContext: ["Automated PR Security Filter (68% Token Savings)"],
  },
  {
    id: "gemini-openai",
    code: "02.03",
    name: "OpenAI & Gemini API",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Function Calling & Structured Outputs",
    architectureTier: "AI & Inference",
    details: "Resilient tool-use schemas, JSON-mode structured extraction, prompt caching, and streaming.",
    productionContext: ["Automated Code Review Agent", "AI Job Search Dashboard"],
  },
  {
    id: "tensorflow-edge",
    code: "02.04",
    name: "TensorFlow.js",
    domain: "ai",
    domainLabel: "EDGE ML",
    spec: "Quantized WebGL Model Inference",
    architectureTier: "AI & Inference",
    details: "Executing client-side deep neural networks directly on user GPUs using WebGL fragment shaders.",
    productionContext: ["Object Detection Web App (Realtime MobileNet)"],
  },
  {
    id: "vector-rag",
    code: "02.05",
    name: "RAG & Vector Embeddings",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Cosine Distance & Semantic Chunking",
    architectureTier: "AI & Inference",
    details: "Vector database indexing, cosine similarity scoring, hierarchical document chunking, and citations.",
    productionContext: ["Semantic Document Retrieval", "Audience Classification"],
  },
  {
    id: "huggingface",
    code: "02.06",
    name: "HuggingFace Pipelines",
    domain: "ai",
    domainLabel: "NLP",
    spec: "Tokenization & Quantized Checkpoints",
    architectureTier: "AI & Inference",
    details: "BPE and WordPiece tokenizers, model weight pruning, and local ONNX runtime acceleration.",
    productionContext: ["Audience Intent Classifier", "Sentiment Analytics Pipeline"],
  },
  {
    id: "prompt-engineering",
    code: "02.07",
    name: "Few-Shot Architecture",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Chain-of-Thought & Determinism Tuning",
    architectureTier: "AI & Inference",
    details: "System prompt contracts, chain-of-thought verification stages, and zero-shot hallucination guards.",
    productionContext: ["Code Review Diff Synthesizer", "Autonomous Pull Request Reviewer"],
  },
];

// 03. Distributed Backend, High-Throughput Databases & Cloud (7 Skills)
const STREAM_ROW_3: SkillNode[] = [
  {
    id: "fastapi",
    code: "03.01",
    name: "FastAPI",
    domain: "backend",
    domainLabel: "BACKEND",
    spec: "Async Event Loops & Pydantic V2",
    architectureTier: "Distributed Architecture",
    details: "High-concurrency async HTTP servers, OpenAPI schemas, and background worker queues.",
    productionContext: ["Code Review API (FastAPI 0.110+)"],
  },
  {
    id: "nextjs-app-router",
    code: "03.02",
    name: "Next.js 16 (App Router)",
    domain: "backend",
    domainLabel: "FRAMEWORKS",
    spec: "RSC, Streaming SSR & Server Actions",
    architectureTier: "Distributed Architecture",
    details: "Server Components execution boundaries, partial pre-rendering, parallel route slots, and edge middlewares.",
    productionContext: ["Product Data Explorer", "Collaborative Task Manager", "Portfolio Platform"],
  },
  {
    id: "postgresql",
    code: "03.03",
    name: "PostgreSQL & SQL",
    domain: "backend",
    domainLabel: "DATABASES",
    spec: "B-Tree Indices & Row-Level Locks",
    architectureTier: "Distributed Architecture",
    details: "Relational database modeling, transactional ACID guarantees, compound index tuning, and connection pooling.",
    productionContext: ["Collaborative Task Manager", "F Salon Academy LLP (28% Latency Cut)"],
  },
  {
    id: "prisma",
    code: "03.04",
    name: "Prisma ORM",
    domain: "backend",
    domainLabel: "DATABASES",
    spec: "Interactive Transactions & Type Safe",
    architectureTier: "Distributed Architecture",
    details: "Database migrations, relation queries, declarative data modeling, and atomic rollback transactions.",
    productionContext: ["Collaborative Task Manager (Prisma + PostgreSQL)"],
  },
  {
    id: "redis",
    code: "03.05",
    name: "Redis",
    domain: "backend",
    domainLabel: "CACHE & QUEUES",
    spec: "Key Expiration & Pub/Sub Channels",
    architectureTier: "Distributed Architecture",
    details: "In-memory caching architectures, cache-aside patterns, atomic increment counters, and pub/sub messaging.",
    productionContext: ["Product Data Explorer High-Throughput Matrix"],
  },
  {
    id: "docker",
    code: "03.06",
    name: "Docker & Containerization",
    domain: "backend",
    domainLabel: "DEVOPS",
    spec: "Multi-Stage Dockerfiles & Alpine Roots",
    architectureTier: "Distributed Architecture",
    details: "Container layer caching, reproducible environments, and multi-stage compilation for minimal footprints.",
    productionContext: ["Production Cloud Deployments", "Render & Vercel Containers"],
  },
  {
    id: "websockets",
    code: "03.07",
    name: "WebSockets",
    domain: "backend",
    domainLabel: "REALTIME",
    spec: "Full-Duplex TCP Socket Channels",
    architectureTier: "Distributed Architecture",
    details: "Low-latency bidirectional socket protocols, client heartbeats, and real-time state synchronization.",
    productionContext: ["Collaborative Workspace Engines", "Live Telemetry Feeds"],
  },
];

// 04. 3D Graphics, WebGL Shaders & Animation Physics (7 Skills)
const STREAM_ROW_4: SkillNode[] = [
  {
    id: "threejs",
    code: "04.01",
    name: "Three.js",
    domain: "graphics",
    domainLabel: "3D & WEBGL",
    spec: "Scene Graphs & Instanced Geometry",
    architectureTier: "GPU & Graphics",
    details: "Consolidating thousands of interactive celestial nodes into single draw-call instanced meshes.",
    productionContext: ["3D Spatial Portfolio Website", "Cosmic Shaders Lab"],
  },
  {
    id: "react-three-fiber",
    code: "04.02",
    name: "React Three Fiber / Drei",
    domain: "graphics",
    domainLabel: "3D & WEBGL",
    spec: "Declarative WebGL Canvas Ecosystem",
    architectureTier: "GPU & Graphics",
    details: "Lifecycle-aware 3D render loops, perspective camera controllers, and dynamic DPR throttling.",
    productionContext: ["3D Asteroid Space Simulation", "Interactive Polyhedron Canvas"],
  },
  {
    id: "glsl",
    code: "04.03",
    name: "GLSL / Shaders",
    domain: "graphics",
    domainLabel: "GPU MATH",
    spec: "Custom Vertex Attenuation & Noise",
    architectureTier: "GPU & Graphics",
    details: "GPU shader mathematics, circular point attenuation, procedural simplex noise, and instanced buffers.",
    productionContext: ["3D Spatial Portfolio", "Cosmic Shaders"],
  },
  {
    id: "gsap",
    code: "04.04",
    name: "GSAP & ScrollTrigger",
    domain: "graphics",
    domainLabel: "ANIMATION",
    spec: "Hardware-Accelerated Timeline Physics",
    architectureTier: "GPU & Graphics",
    details: "Precision transform matrices, scrubbed scroll triggers, velocity-aware tweens, and non-blocking layouts.",
    productionContext: ["Landing Page Hero Typography Reveal", "Infinite Stream Marquees"],
  },
  {
    id: "framer-motion",
    code: "04.05",
    name: "Framer Motion",
    domain: "graphics",
    domainLabel: "ANIMATION",
    spec: "Spring Physics & Shared Layout IDs",
    architectureTier: "GPU & Graphics",
    details: "Spring-physics mass/damping curves, AnimatePresence orchestration, and layout morphing.",
    productionContext: ["App Router Transitions", "Tab Blur Crossfades", "Interactive Modals"],
  },
  {
    id: "canvas-2d",
    code: "04.06",
    name: "HTML5 Canvas 2D",
    domain: "graphics",
    domainLabel: "RENDERERS",
    spec: "High-Frequency 60FPS Rasterization",
    architectureTier: "GPU & Graphics",
    details: "Direct pixel buffer manipulation, particle physics integration, and zero-DOM-overhead chart rendering.",
    productionContext: ["Realtime Telemetry Charts", "Object Detection Bounding Box Overlay"],
  },
  {
    id: "tailwind-modern",
    code: "04.07",
    name: "Modern Tailwind CSS",
    domain: "graphics",
    domainLabel: "UI DESIGN",
    spec: "Design Token Architecture & Variables",
    architectureTier: "GPU & Graphics",
    details: "Design system tokens, custom CSS variable contracts, and responsive layout primitives.",
    productionContext: ["Design Systems", "Dark Mode UI Theming"],
  },
];

export default function SkillArtifacts() {
  const [activeDomain, setActiveDomain] = useState<SkillDomain>("all");
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(STREAM_ROW_1[0]);
  const [speedMode, setSpeedMode] = useState<"normal" | "slow" | "paused">("normal");

  const filterMatches = (domain: string) => {
    return activeDomain === "all" || activeDomain === domain;
  };

  const getAnimationClass = (baseClass: string, slowClass: string) => {
    if (speedMode === "paused") return "[animation-play-state:paused]";
    if (speedMode === "slow") return slowClass;
    return baseClass;
  };

  // Architectural streamline ribbon
  const renderArchitecturalStream = (
    skills: SkillNode[],
    baseClass: string,
    slowClass: string
  ) => {
    const loop = [...skills, ...skills];
    const animClass = getAnimationClass(baseClass, slowClass);

    return (
      <div className="relative w-full overflow-hidden py-1">
        <div className={`flex items-center gap-3 w-max ${animClass} pause-hover`}>
          {loop.map((node, idx) => {
            const isHighlighted = filterMatches(node.domain);
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={`${node.id}-${idx}`}
                onClick={() => setSelectedNode(node)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0c0d12]/90 border transition-all duration-300 cursor-pointer shrink-0 select-none shadow-md backdrop-blur-md ${
                  isSelected
                    ? "border-[#89AACC] bg-[#12151f] shadow-[0_0_20px_rgba(137,170,204,0.25)] translate-y-[-2px]"
                    : isHighlighted
                    ? "border-white/[0.08] hover:border-white/30 hover:bg-[#12141c] hover:translate-y-[-2px]"
                    : "opacity-30 border-transparent bg-black/40"
                }`}
              >
                {/* Code Index */}
                <span className="font-mono text-[10px] text-muted/60 tracking-wider">
                  {node.code}
                </span>

                {/* Vertical hairline divider */}
                <span className="w-px h-3.5 bg-white/10" />

                {/* Technology Name */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm font-medium text-text-primary group-hover:text-[#89AACC] transition-colors whitespace-nowrap">
                      {node.name}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#89AACC]/80 px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/5 hidden sm:inline">
                      {node.domainLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-muted/70 truncate max-w-[200px] hidden md:inline">
                    {node.spec}
                  </span>
                </div>

                {/* Subtle Inspection Indicator */}
                <div className="w-5 h-5 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-[10px] text-muted group-hover:text-text-primary group-hover:border-white/30 transition-all ml-1">
                  ↗
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-24 border-t border-stroke/40">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      {/* Main Container - Horizontally constrained and perfectly aligned with the page */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-stroke" />
                <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                  Technical Spectrum
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-body">
                Systems &{" "}
                <span className="font-display italic text-text-primary">
                  technical mastery
                </span>
              </h3>

              <p className="mt-3 text-sm md:text-base text-muted max-w-xl leading-relaxed">
                Continuous streamlines of core engineering competencies, asynchronous backends, compiler tools, and GPU graphics drifting in dynamic synchronization.
              </p>
            </div>

            {/* Stream Drift Controls HUD */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-md text-xs font-mono self-start md:self-auto">
              <span className="text-muted text-[11px] px-2 uppercase tracking-wider hidden sm:inline">
                Drift Speed:
              </span>
              <button
                type="button"
                onClick={() => setSpeedMode("normal")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  speedMode === "normal"
                    ? "bg-text-primary text-bg font-semibold shadow-sm"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                Glide (Slow)
              </button>
              <button
                type="button"
                onClick={() => setSpeedMode("slow")}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  speedMode === "slow"
                    ? "bg-text-primary text-bg font-semibold shadow-sm"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                Ambient (Ultra-Slow)
              </button>
              <button
                type="button"
                onClick={() => setSpeedMode(speedMode === "paused" ? "normal" : "paused")}
                className={`px-2.5 py-1.5 rounded-xl transition-all ${
                  speedMode === "paused"
                    ? "bg-[#4E85BF] text-white font-semibold"
                    : "text-muted hover:text-text-primary"
                }`}
                title="Toggle pause"
              >
                {speedMode === "paused" ? "▶ Resume" : "❚❚ Pause"}
              </button>
            </div>
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mt-8 border-b border-stroke/40 scrollbar-none">
            {[
              { id: "all", label: "ALL DOMAINS", count: 28 },
              { id: "ai", label: "AI & COMPILERS", count: 7 },
              { id: "backend", label: "DISTRIBUTED BACKEND", count: 7 },
              { id: "core", label: "LANGUAGES & RUNTIMES", count: 7 },
              { id: "graphics", label: "3D & SPATIAL SYSTEMS", count: 7 },
            ].map((tab) => {
              const isActive = activeDomain === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDomain(tab.id as SkillDomain)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-surface border-white/20 text-[#89AACC] font-semibold"
                      : "text-muted border-transparent hover:text-text-primary hover:bg-white/[0.02]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] opacity-60 font-mono">({tab.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STREAMLINES - UNBOXED & HORIZONTALLY ALIGNED WITH PAGE MARGINS */}
        <div className="relative w-full overflow-hidden space-y-3.5 my-4">
          {/* Seamless Edge Gradient Fades blending into page background */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          {/* Stream 1: Core Languages & Execution Runtimes (Flowing Leftwards) */}
          {renderArchitecturalStream(
            STREAM_ROW_1,
            "animate-streamline-left",
            "animate-streamline-left-slow"
          )}

          {/* Stream 2: AI, LLM Transformers & Compilers (Flowing in OPPOSITE direction: Rightwards) */}
          {renderArchitecturalStream(
            STREAM_ROW_2,
            "animate-streamline-right",
            "animate-streamline-right-slow"
          )}

          {/* Stream 3: Distributed Backend & Cloud (Flowing in OPPOSITE direction: Leftwards) */}
          {renderArchitecturalStream(
            STREAM_ROW_3,
            "animate-streamline-left",
            "animate-streamline-left-slow"
          )}

          {/* Stream 4: 3D Graphics & WebGL Shaders (Flowing in OPPOSITE direction: Rightwards) */}
          {renderArchitecturalStream(
            STREAM_ROW_4,
            "animate-streamline-right",
            "animate-streamline-right-slow"
          )}
        </div>

        {/* EMBEDDED ARCHITECTURAL INSPECTOR DOSSIER */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="p-6 md:p-8 rounded-3xl bg-[#0B0C0E]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
              >
                {/* Ambient background highlight */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#89AACC]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative z-10">
                  {/* Left Column: Identification */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#89AACC] tracking-widest uppercase">
                        INDEX {selectedNode.code} &bull; {selectedNode.domainLabel}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight">
                      {selectedNode.name}
                    </h4>

                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-muted">
                      {selectedNode.architectureTier}
                    </span>
                  </div>

                  {/* Middle Column: Architecture Description */}
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-muted">
                      Architecture & Implementation
                    </span>
                    <p className="text-xs sm:text-sm text-text-primary/90 font-body leading-relaxed">
                      {selectedNode.details}
                    </p>
                  </div>

                  {/* Right Column: Production Deployments */}
                  <div className="md:col-span-4 space-y-2 md:border-l md:border-white/10 md:pl-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#89AACC]">
                      Shipped in Production
                    </span>
                    <ul className="space-y-1.5">
                      {selectedNode.productionContext.map((ctx, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs font-mono text-muted"
                        >
                          <span className="text-[#89AACC]">&rsaquo;</span>
                          <span className="text-text-primary/80">{ctx}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
