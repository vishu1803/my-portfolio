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
  architectureTier: "Core Runtime" | "Distributed Architecture" | "AI & Inference" | "GPU & Graphics";
  details: string;
  productionContext: string[];
}

const STREAM_ROW_1: SkillNode[] = [
  {
    id: "python",
    code: "01.01",
    name: "Python 3.11+",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "FastAPI, AST Parsers, PyTorch",
    architectureTier: "Core Runtime",
    details: "Asynchronous microservices, unified AST diff chunking, memory-optimized worker threads, and LLM orchestration pipelines.",
    productionContext: ["Ai-powered-code-review-assistant", "Deterministic Vulnerability Audit Rules"],
  },
  {
    id: "typescript",
    code: "01.02",
    name: "TypeScript (Strict)",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "Discriminated Unions & Invariant ASTs",
    architectureTier: "Core Runtime",
    details: "Generic constraints, structural typing, strict compiler configurations, and complete type safety across distributed boundaries.",
    productionContext: ["Collaborative Task Manager", "Product Data Explorer", "Portfolio Platform"],
  },
  {
    id: "glsl",
    code: "01.03",
    name: "GLSL / Shaders",
    domain: "graphics",
    domainLabel: "GPU MATH",
    spec: "Custom Vertex Attenuation & Noise",
    architectureTier: "GPU & Graphics",
    details: "Bespoke GPU shader mathematics, circular point attenuation, procedural simplex noise, and instanced mesh buffer attributes.",
    productionContext: ["3D Spatial Portfolio", "Cosmic Shaders", "Visual Playground"],
  },
  {
    id: "sql",
    code: "01.04",
    name: "PostgreSQL & SQL",
    domain: "backend",
    domainLabel: "DATABASES",
    spec: "B-Tree Indices & Row-Level Locks",
    architectureTier: "Distributed Architecture",
    details: "Relational database modeling, transactional ACID guarantees, compound index tuning, and connection pooling latency reduction.",
    productionContext: ["Collaborative Task Manager", "F Salon Academy LLP (28% Latency Cut)"],
  },
  {
    id: "cpp",
    code: "01.05",
    name: "C++ (Foundational)",
    domain: "core",
    domainLabel: "SYSTEMS",
    spec: "Algorithms, Pointers, Memory Hierarchy",
    architectureTier: "Core Runtime",
    details: "Data structures, memory layouts, cache-locality principles, and hardware-near system architectures.",
    productionContext: ["B.Tech Electronics Systems Architecture", "Signal Analysis"],
  },
  {
    id: "javascript",
    code: "01.06",
    name: "JavaScript (V8/ESNext)",
    domain: "core",
    domainLabel: "LANGUAGES",
    spec: "Event Loop, Concurrency & Microtasks",
    architectureTier: "Core Runtime",
    details: "Browser execution engines, asynchronous microtask queues, garbage collection tuning, and high-throughput DOM pipelines.",
    productionContext: ["Production Web Applications", "Interactive Visual Engines"],
  },
  {
    id: "bash-linux",
    code: "01.07",
    name: "Linux Shell & POSIX",
    domain: "core",
    domainLabel: "DEVOPS",
    spec: "Process Pipelines & Automation",
    architectureTier: "Core Runtime",
    details: "Unix pipeline composition, automated shell scripts, environment orchestration, and container networking.",
    productionContext: ["CI/CD GitHub Actions", "Cloud Deployment Runtimes"],
  },
];

const STREAM_ROW_2: SkillNode[] = [
  {
    id: "llm-transformers",
    code: "02.01",
    name: "LLM Transformers",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Multi-Head Self-Attention (Q, K, V)",
    architectureTier: "AI & Inference",
    details: "Mathematical mastery of scaled dot-product attention, sinusoidal positional embeddings, temperature scaling, and nucleus sampling.",
    productionContext: ["Transformer Laboratory", "AI PR Review Architecture"],
  },
  {
    id: "fastapi",
    code: "02.02",
    name: "FastAPI",
    domain: "ai",
    domainLabel: "BACKEND",
    spec: "Async Event Loops & Pydantic V2",
    architectureTier: "Distributed Architecture",
    details: "High-concurrency async HTTP servers, automatic OpenAPI documentation, schema validation, and asynchronous background worker queues.",
    productionContext: ["Ai-powered-code-review-assistant (FastAPI 0.110+)"],
  },
  {
    id: "ast-treesitter",
    code: "02.03",
    name: "AST & Tree-Sitter",
    domain: "ai",
    domainLabel: "COMPILERS",
    spec: "Static Semantic Extraction",
    architectureTier: "AI & Inference",
    details: "Analyzing code diffs at abstract syntax level to catch CWE vulnerabilities deterministically before prompt token consumption.",
    productionContext: ["Automated PR Security Filter (68% Token Savings)"],
  },
  {
    id: "gemini-openai",
    code: "02.04",
    name: "OpenAI & Gemini API",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Function Calling & Structured Outputs",
    architectureTier: "AI & Inference",
    details: "Designing resilient tool-use schemas, JSON-mode structured extraction, prompt caching, and low-latency streaming completions.",
    productionContext: ["Automated Code Review Agent", "AI Job Search Dashboard"],
  },
  {
    id: "tensorflow-edge",
    code: "02.05",
    name: "TensorFlow.js",
    domain: "ai",
    domainLabel: "EDGE ML",
    spec: "Quantized WebGL Model Inference",
    architectureTier: "AI & Inference",
    details: "Executing client-side deep neural networks directly on user GPUs using WebGL fragment shaders for zero-server inference.",
    productionContext: ["Object Detection Web App (Realtime MobileNet)"],
  },
  {
    id: "vector-rag",
    code: "02.06",
    name: "RAG & Vector Embeddings",
    domain: "ai",
    domainLabel: "AI & MODELS",
    spec: "Cosine Distance & Semantic Chunking",
    architectureTier: "AI & Inference",
    details: "Vector database indexing, cosine similarity scoring, hierarchical document chunking, and deterministic citation grounding.",
    productionContext: ["Semantic Document Retrieval", "Audience Classification"],
  },
  {
    id: "pytorch",
    code: "02.07",
    name: "PyTorch",
    domain: "ai",
    domainLabel: "DEEP LEARNING",
    spec: "Tensors & Autograd",
    architectureTier: "AI & Inference",
    details: "Tensor matrix operations, computational graphs, batch data loaders, and model evaluation routines.",
    productionContext: ["Academic ML Research", "Classifier Models"],
  },
];

const STREAM_ROW_3: SkillNode[] = [
  {
    id: "nextjs-16",
    code: "03.01",
    name: "Next.js 16 (App Router)",
    domain: "backend",
    domainLabel: "FRAMEWORKS",
    spec: "RSC, Streaming SSR & Server Actions",
    architectureTier: "Distributed Architecture",
    details: "Server Components execution boundaries, partial pre-rendering, parallel route slots, streaming HTML suspense, and edge middlewares.",
    productionContext: ["Product Data Explorer", "Collaborative Task Manager", "Portfolio Platform"],
  },
  {
    id: "react-19",
    code: "03.02",
    name: "React 19 / 18",
    domain: "backend",
    domainLabel: "FRAMEWORKS",
    spec: "Concurrent Fiber & Optimistic Hooks",
    architectureTier: "Core Runtime",
    details: "Fiber reconciliation, layout isolation, action transitions, useOptimistic state queues, and zero-flicker client rendering.",
    productionContext: ["Enterprise SaaS UIs", "3D Interactive Viewports"],
  },
  {
    id: "prisma-orm",
    code: "03.03",
    name: "Prisma ORM",
    domain: "backend",
    domainLabel: "DATABASES",
    spec: "Interactive Transactions & Schema Safe",
    architectureTier: "Distributed Architecture",
    details: "Database migrations, relation queries, declarative data modeling, and atomic multi-table rollback transactions.",
    productionContext: ["Collaborative Task Manager (Prisma + PostgreSQL)"],
  },
  {
    id: "redis",
    code: "03.04",
    name: "Redis",
    domain: "backend",
    domainLabel: "CACHE & QUEUES",
    spec: "Key Expiration & Pub/Sub Channels",
    architectureTier: "Distributed Architecture",
    details: "In-memory caching architectures, cache-aside patterns, atomic increment counters, and microsecond pub/sub messaging.",
    productionContext: ["Product Data Explorer High-Throughput Matrix"],
  },
  {
    id: "nodejs-express",
    code: "03.05",
    name: "Node.js & Express",
    domain: "backend",
    domainLabel: "BACKEND",
    spec: "Cluster Workers & Custom Middleware",
    architectureTier: "Distributed Architecture",
    details: "RESTful API routes, JWT bearer authentication gates, streaming response pipelines, and defensive request rate limiting.",
    productionContext: ["F Salon Academy Intern Systems", "Backend Micro-Endpoints"],
  },
  {
    id: "websockets",
    code: "03.06",
    name: "WebSockets",
    domain: "backend",
    domainLabel: "REALTIME",
    spec: "Full-Duplex TCP Socket Channels",
    architectureTier: "Distributed Architecture",
    details: "Low-latency bidirectional socket protocols, client heartbeat detection, message framing, and state synchronization.",
    productionContext: ["Collaborative Workspace Engines", "Live Telemetry Feeds"],
  },
  {
    id: "docker-infra",
    code: "03.07",
    name: "Docker & Containerization",
    domain: "backend",
    domainLabel: "DEVOPS",
    spec: "Multi-Stage Dockerfiles & Alpine Roots",
    architectureTier: "Distributed Architecture",
    details: "Container layer caching, reproducible environments, multi-stage compilation to keep image footprints minimal.",
    productionContext: ["Production Cloud Deployments", "Render & Vercel Containers"],
  },
];

const STREAM_ROW_4: SkillNode[] = [
  {
    id: "threejs-3d",
    code: "04.01",
    name: "Three.js",
    domain: "graphics",
    domainLabel: "3D & WEBGL",
    spec: "Scene Graphs & Instanced Geometry",
    architectureTier: "GPU & Graphics",
    details: "Consolidating thousands of interactive celestial nodes into single draw-call instanced meshes with spherical coordinate transforms.",
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
    details: "Lifecycle-aware 3D render loops, perspective camera controllers, dynamic DPR throttling for mobile devices.",
    productionContext: ["3D Asteroid Space Simulation", "Interactive Polyhedron Canvas"],
  },
  {
    id: "gsap-timelines",
    code: "04.03",
    name: "GSAP & ScrollTrigger",
    domain: "graphics",
    domainLabel: "ANIMATION",
    spec: "Hardware-Accelerated Timeline Physics",
    architectureTier: "GPU & Graphics",
    details: "Precision transform matrices, scrubbed scroll triggers, velocity-aware tweens, and non-blocking layout recalculations.",
    productionContext: ["Landing Page Hero Typography Reveal", "Infinite Stream Marquees"],
  },
  {
    id: "framer-motion",
    code: "04.04",
    name: "Framer Motion",
    domain: "graphics",
    domainLabel: "ANIMATION",
    spec: "Spring Physics & Shared Layout IDs",
    architectureTier: "GPU & Graphics",
    details: "Spring-physics mass/damping curves, AnimatePresence orchestration, and layout morphing.",
    productionContext: ["App Router Transitions", "Tab Blur Crossfades", "Interactive Modals"],
  },
  {
    id: "offscreen-canvas",
    code: "04.05",
    name: "Offscreen Canvas 2D",
    domain: "graphics",
    domainLabel: "RENDERERS",
    spec: "Spatial Hashing & 60 FPS Bitmaps",
    architectureTier: "GPU & Graphics",
    details: "Replacing DOM/SVG bottlenecks with direct pixel buffers and spatial collision indexing to render 10,000 nodes at locked 60 FPS.",
    productionContext: ["Product Data Explorer", "Harmonic Audio Oscilloscope"],
  },
  {
    id: "tailwind-tokens",
    code: "04.06",
    name: "Tailwind CSS Token System",
    domain: "graphics",
    domainLabel: "DESIGN SYSTEM",
    spec: "Semantic HSL Variables & Strict Palettes",
    architectureTier: "Core Runtime",
    details: "Engineering dark luxury design systems, bespoke micro-interactions, responsive clamp fluid scales, and zero-pill discipline.",
    productionContext: ["Portfolio Design System", "All Client Applications"],
  },
  {
    id: "ci-cd-git",
    code: "04.07",
    name: "Git & Automated CI/CD",
    domain: "backend",
    domainLabel: "DEVOPS",
    spec: "Trunk Development & PR Gateways",
    architectureTier: "Distributed Architecture",
    details: "GitHub Actions automated test runners, linting gates, semantic versioning, and zero-downtime deployment webhooks.",
    productionContext: ["All GitHub Repositories", "Automated Lint & Test Pipelines"],
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

  // Render an ultra-clean, architectural streamline row
  const renderArchitecturalStream = (
    skills: SkillNode[],
    baseClass: string,
    slowClass: string
  ) => {
    // Loop 3 times for a seamless infinite ribbon
    const loop = [...skills, ...skills, ...skills];
    const animClass = getAnimationClass(baseClass, slowClass);

    return (
      <div className="relative w-full overflow-hidden py-1.5">
        <div className={`flex items-center gap-3.5 w-max ${animClass} pause-hover`}>
          {loop.map((node, idx) => {
            const isHighlighted = filterMatches(node.domain);
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={`${node.id}-${idx}`}
                onClick={() => setSelectedNode(node)}
                className={`group relative flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-[#0c0d10]/85 border transition-all duration-300 cursor-pointer shrink-0 select-none shadow-lg backdrop-blur-md ${
                  isSelected
                    ? "border-[#89AACC] bg-[#12151c] shadow-[0_0_25px_rgba(137,170,204,0.25)] translate-y-[-2px]"
                    : isHighlighted
                    ? "border-white/[0.08] hover:border-white/30 hover:bg-[#12141a] hover:translate-y-[-2px]"
                    : "opacity-35 border-transparent bg-black/40"
                }`}
              >
                {/* Code Index (e.g. 01.02) */}
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
    <section className="relative w-full overflow-hidden py-20 md:py-28 border-t border-stroke/50">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      {/* Header Section */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
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
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-md text-xs font-mono">
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

      {/* MULTIPLE ELEGANT STREAMLINES FLOATING IN OPPOSITE DIRECTIONS */}
      <div className="relative w-full space-y-3.5 overflow-hidden my-4">
        {/* Soft edge blur / fade gradients for seamless infinite loop */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {/* Stream 1: Languages & Core Runtimes (Flowing Leftwards slowly) */}
        {renderArchitecturalStream(
          STREAM_ROW_1,
          "animate-streamline-left",
          "animate-streamline-left-slow"
        )}

        {/* Stream 2: AI, Transformers & Compilers (Flowing in OPPOSITE direction: Rightwards) */}
        {renderArchitecturalStream(
          STREAM_ROW_2,
          "animate-streamline-right",
          "animate-streamline-right-slow"
        )}

        {/* Stream 3: Distributed Backend & Databases (Flowing in OPPOSITE direction: Leftwards) */}
        {renderArchitecturalStream(
          STREAM_ROW_3,
          "animate-streamline-left",
          "animate-streamline-left-slow"
        )}

        {/* Stream 4: 3D Graphics, WebGL & Animation (Flowing in OPPOSITE direction: Rightwards) */}
        {renderArchitecturalStream(
          STREAM_ROW_4,
          "animate-streamline-right",
          "animate-streamline-right-slow"
        )}
      </div>

      {/* EMBEDDED ARCHITECTURAL INSPECTOR DOSSIER */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-10">
        <AnimatePresence mode="wait">
          {selectedNode && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0b0c0f]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
            >
              {/* Top ambient color hairline */}
              <div className="absolute top-0 left-0 w-full h-[1px] accent-gradient opacity-60" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left meta (5 cols) */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#89AACC] tracking-widest uppercase">
                      INDEX {selectedNode.code} &bull; {selectedNode.domainLabel}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight">
                    {selectedNode.name}
                  </h4>

                  <p className="text-xs font-mono text-muted/90 pt-1">
                    {selectedNode.spec}
                  </p>

                  <div className="pt-2">
                    <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-text-primary">
                      {selectedNode.architectureTier}
                    </span>
                  </div>
                </div>

                {/* Right details & production footprint (7 cols) */}
                <div className="lg:col-span-7 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-1">
                      Architectural Competency:
                    </span>
                    <p className="text-sm text-text-primary/90 font-body leading-relaxed">
                      {selectedNode.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#89AACC] block mb-2">
                      Verified Production Implementations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedNode.productionContext.map((ctx, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-text-primary/80"
                        >
                          {ctx}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
