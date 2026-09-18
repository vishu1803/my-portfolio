"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLayerGroup, FaServer, FaCode } from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";

interface Project {
  title: string;
  category: "all" | "fullstack" | "ai" | "3d";
  description: string;
  image: string;
  link: string;
  github?: string;
  tag: string;
  metrics: string;
  architecture: string[];
  accent: string;
  accentGlow: string;
}

const projects: Project[] = [
  {
    title: "AI-Powered Code Review System",
    category: "ai",
    description:
      "Automated code analysis engine analyzing GitHub pull requests, detecting syntax anomalies, AST patterns, and security vulnerabilities using FastAPI, AST parsers, and LLM reasoning.",
    image: "/ai-code-review.png",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    github: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    tag: "AI · Python · FastAPI",
    metrics: "<1.2s PR Analysis Latency",
    architecture: [
      "FastAPI asynchronous backend with Python 3.11",
      "GitHub Webhooks API integration with HMAC validation",
      "LLM inference pipeline with structured AST code diff parsing",
      "Automated Markdown PR review comment generator",
    ],
    accent: "from-[#4F8EF7] to-[#38BDF8]",
    accentGlow: "shadow-[#4F8EF7]/10",
  },
  {
    title: "Product Data Explorer & Analytics",
    category: "fullstack",
    description:
      "High-throughput analytics platform aggregating real-time e-commerce data, dynamic query indexing, interactive time-series charts, and multi-faceted parametric filtering.",
    image: "/product-explorer.png",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    github: "https://github.com/vishu1803",
    tag: "Next.js · REST API · Analytics",
    metrics: "10k+ Record Interactive Filter",
    architecture: [
      "Next.js App Router with React Server Components",
      "Custom debounce search indexing and filter memoization",
      "Interactive SVG & Canvas charting for high-density telemetry",
      "Stateless REST proxy with Redis cache-aside caching layer",
    ],
    accent: "from-[#7C5CFC] to-[#A78BFA]",
    accentGlow: "shadow-[#7C5CFC]/10",
  },
  {
    title: "Collaborative Task Manager",
    category: "fullstack",
    description:
      "Distributed team workflow platform featuring granular Role-Based Access Control (RBAC), multi-tenant workspaces, atomic state mutations, and relational PostgreSQL persistence.",
    image: "/task-manager.png",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    github: "https://github.com/vishu1803",
    tag: "Next.js · Prisma · PostgreSQL",
    metrics: "ACID Guaranteed Transactions",
    architecture: [
      "Prisma ORM with PostgreSQL transactional safety",
      "NextAuth JWT session handling with strict RBAC rules",
      "Optimistic UI updates for zero perceived network lag",
      "Server Actions with strict Zod payload validation",
    ],
    accent: "from-[#34D399] to-[#10B981]",
    accentGlow: "shadow-[#34D399]/10",
  },
  {
    title: "3D Portfolio Website",
    category: "3d",
    description:
      "Interactive 3D digital experience built with React Three Fiber and Three.js, incorporating custom GLSL shaders, camera lerping, and mathematical geometry physics.",
    image: "/portfolio.png",
    link: "https://3-d-portfolio-website-one.vercel.app",
    github: "https://github.com/vishu1803/3D-portfolio-website",
    tag: "React · Three.js · WebGL",
    metrics: "Locked 60 FPS WebGL",
    architecture: [
      "Three.js scene graph with hierarchical Euler matrix transforms",
      "Custom GLSL particle shaders and depth-buffer attenuation",
      "Framer Motion spring physics for 2D/3D interface cohesion",
      "Responsive viewport frustum and device DPR scaling",
    ],
    accent: "from-[#F97316] to-[#FB923C]",
    accentGlow: "shadow-[#F97316]/10",
  },
  {
    title: "Object Detection Web Application",
    category: "ai",
    description:
      "Client-side edge vision application executing real-time object classification and bounding box regression directly inside the browser using WebGL hardware acceleration.",
    image: "/object-detection.png",
    link: "https://object-detection-web-app-indol.vercel.app/",
    github: "https://github.com/vishu1803",
    tag: "ML · TensorFlow.js · Edge",
    metrics: "30+ FPS Client Inference",
    architecture: [
      "TensorFlow.js COCO-SSD pretrained neural architecture",
      "WebGL shader backend for browser GPU compute acceleration",
      "HTML5 Canvas high-frequency bounding box overlay rendering",
      "Zero server data transmission (100% private on-device)",
    ],
    accent: "from-[#38BDF8] to-[#0EA5E9]",
    accentGlow: "shadow-sky-500/10",
  },
  {
    title: "Audience Query Classification Engine",
    category: "ai",
    description:
      "Intelligent natural language classifier that triages, classifies, and routes customer inquiries across multiple queues based on confidence scoring and intent extraction.",
    image: "/audience-query-system.png",
    link: "https://audience-query-system.vercel.app/",
    github: "https://github.com/vishu1803",
    tag: "AI · React · Node.js",
    metrics: "96% Intent Categorization",
    architecture: [
      "Node.js classification middleware with rate-limiting",
      "Multi-label NLP classification with fallback routing logic",
      "Real-time ticket dispatch queue with status telemetry",
      "Responsive operator console with keyboard accessibility",
    ],
    accent: "from-[#E879A8] to-[#F472B6]",
    accentGlow: "shadow-[#E879A8]/10",
  },
];

const ease = [0.25, 0.1, 0, 1] as const;

function ProjectCard({
  project,
  onInspect,
}: {
  project: Project;
  onInspect: (p: Project) => void;
}) {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.25, 0.1, 0, 1)",
      }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-950/70 backdrop-blur-xl hover:border-sky-400/40 shadow-xl hover:shadow-2xl transition-colors duration-300 flex flex-col justify-between"
    >
      {/* Dynamic 3D Glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-25"
          style={{
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45), transparent 80%)`,
          }}
        />
      )}

      <div>
        {/* Image Preview Container */}
        <div className="relative overflow-hidden aspect-video bg-black/50">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14] via-[#0c0c14]/30 to-transparent opacity-80 pointer-events-none" />

          {/* Celestial Tag */}
          <span className="absolute top-3 left-3 text-[10px] font-mono font-medium px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 border border-sky-400/30">
            {project.tag}
          </span>

          {/* Metric Pill */}
          <span className="absolute bottom-3 right-3 text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/80 border border-white/[0.08]">
            {project.metrics}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-[16px] font-bold mb-2 text-white group-hover:text-sky-300 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-[#8b8b9e] text-[13px] leading-[1.7] line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/[0.06] flex items-center justify-between">
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="text-[12px] font-mono font-medium text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <FaLayerGroup className="text-[11px]" />
          <span>Blueprint</span>
        </button>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-mono font-medium text-[#8b8b9e] hover:text-sky-400 flex items-center gap-1.5 transition-colors"
        >
          <span>Live Demo</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper
      id="projects"
      className="min-h-screen bg-transparent text-white py-28 px-5 sm:px-6 md:px-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Deep space celestial ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 10% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 90% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      <motion.div
        className="text-center mb-14 relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Production Work
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Featured Projects
        </h2>
        <p className="mt-4 text-[#8b8b9e] text-[15px] leading-relaxed">
          Production software engineering across distributed backends, AI
          reasoning pipelines, and interactive 3D WebGL interfaces.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-12 relative z-10">
        {[
          { id: "all", label: "All Works" },
          { id: "fullstack", label: "Full Stack Systems" },
          { id: "ai", label: "AI & Reasoning" },
          { id: "3d", label: "3D & WebGL" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
              filter === tab.id
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-lg shadow-sky-500/10 font-semibold"
                : "text-[#8b8b9e] hover:text-white bg-white/[0.02] border border-white/[0.06]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onInspect={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Architectural Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl border border-white/[0.1] bg-slate-950/95 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-all"
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-sky-300 mb-2">
                <FaLayerGroup />
                <span>Architectural Blueprint</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedProject.title}
              </h3>

              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/30 text-xs font-mono">
                  {selectedProject.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] text-[#8b8b9e] border border-white/[0.08] text-xs font-mono">
                  {selectedProject.metrics}
                </span>
              </div>

              <p className="text-[#8b8b9e] text-[14px] leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Architectural Breakdown */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-white/90 mb-3 flex items-center gap-2">
                  <FaServer className="text-sky-400" />
                  <span>Systems Architecture</span>
                </h4>
                <div className="space-y-2">
                  {selectedProject.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[13px] text-white/80 font-mono flex items-start gap-2.5"
                    >
                      <span className="text-sky-400 font-bold">0{idx + 1}</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-all"
                >
                  <span>Launch Live Deployment</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <FaGithub />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
