"use client";

import { motion } from "framer-motion";
import ProjectMockupFrame from "./ProjectMockupFrame";

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  urlHost: string;
  span: string;
  link: string;
  github?: string;
  description: string;
  metrics: string;
  tech: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ai-code-review",
    index: "01",
    title: "AI-Powered Code Review Assistant",
    category: "Automated PR Intelligence",
    tag: "AI · Python · FastAPI",
    image: "/ai-code-review.png",
    urlHost: "github.com/vishu1803/ai-code-review-assistant",
    span: "md:col-span-7",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    github: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    description:
      "Automated code analysis engine analyzing GitHub pull requests, detecting syntax anomalies, AST patterns, and security vulnerabilities using FastAPI and LLM reasoning.",
    metrics: "<1.2s PR Latency",
    tech: ["FastAPI", "Python 3.11", "GitHub Webhooks", "AST Parsers", "LLMs"],
  },
  {
    id: "product-explorer",
    index: "02",
    title: "Product Data Explorer & Analytics",
    category: "High-Throughput Analytics",
    tag: "Next.js · Redis · Analytics",
    image: "/product-explorer.png",
    urlHost: "product-explorer-frontend.onrender.com",
    span: "md:col-span-5",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    github: "https://github.com/vishu1803",
    description:
      "High-throughput analytics platform aggregating real-time data, dynamic query indexing, interactive time-series charts, and multi-faceted parametric filtering.",
    metrics: "10k+ Record Filter",
    tech: ["Next.js", "Redis Caching", "Canvas Charts", "REST APIs"],
  },
  {
    id: "task-manager",
    index: "03",
    title: "Collaborative Task Workflow Manager",
    category: "Distributed Workflow",
    tag: "Next.js · Prisma · PostgreSQL",
    image: "/task-manager.png",
    urlHost: "collaborative-task-manager.vercel.app",
    span: "md:col-span-5",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    github: "https://github.com/vishu1803",
    description:
      "Distributed team workflow platform featuring granular Role-Based Access Control (RBAC), multi-tenant workspaces, atomic state mutations, and relational PostgreSQL persistence.",
    metrics: "ACID Guaranteed",
    tech: ["Next.js", "Prisma ORM", "PostgreSQL", "NextAuth RBAC"],
  },
  {
    id: "3d-portfolio",
    index: "04",
    title: "3D Spatial Portfolio & WebGL Studio",
    category: "Spatial Digital Experience",
    tag: "React · Three.js · GLSL",
    image: "/portfolio.png",
    urlHost: "3-d-portfolio-website-one.vercel.app",
    span: "md:col-span-7",
    link: "https://3-d-portfolio-website-one.vercel.app",
    github: "https://github.com/vishu1803/3D-portfolio-website",
    description:
      "Interactive 3D digital experience built with React Three Fiber and Three.js, incorporating custom GLSL shaders, camera lerping, and mathematical geometry physics.",
    metrics: "Locked 60 FPS WebGL",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Framer Motion"],
  },
  {
    id: "object-detection",
    index: "05",
    title: "Edge Vision & Object Detector",
    category: "Edge ML & Computer Vision",
    tag: "TensorFlow.js · WebGL · Canvas",
    image: "/object-detection.png",
    urlHost: "object-detection-web-app.vercel.app",
    span: "md:col-span-7",
    link: "https://object-detection-web-app-indol.vercel.app/",
    github: "https://github.com/vishu1803",
    description:
      "Client-side edge vision application running real-time object classification and bounding box regression directly inside the browser using WebGL hardware acceleration.",
    metrics: "30+ FPS Edge Inference",
    tech: ["TensorFlow.js", "COCO-SSD", "WebGL Shaders", "HTML5 Canvas"],
  },
  {
    id: "audience-query",
    index: "06",
    title: "Audience Intent Classification Engine",
    category: "NLP & Semantic Pipeline",
    tag: "Python · Embeddings · FastAPI",
    image: "/audience-query-system.png",
    urlHost: "github.com/vishu1803/audience-query-system",
    span: "md:col-span-5",
    link: "https://github.com/vishu1803",
    github: "https://github.com/vishu1803",
    description:
      "Natural language processing pipeline clustering intent patterns, semantic token embeddings, and audience query routing with sub-second latency.",
    metrics: "94% Model Accuracy",
    tech: ["Python", "FastAPI", "Vector Embeddings", "Transformers"],
  },
];

interface SelectedWorksProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  return (
    <section id="work" className="bg-bg py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-20" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-18 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Selected Work
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-body">
              Featured{" "}
              <span className="font-display italic text-text-primary">
                projects
              </span>
            </h2>

            <p className="mt-3 text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Full-stack applications, automated AI engines, and 3D WebGL experiences built from architecture to deployment.
            </p>
          </div>

          {/* GitHub button */}
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
              <span className="text-text-primary">View GitHub Repositories</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid Layout with High-Fidelity Mockup Windows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectProject(project)}
              className={`${project.span} group relative bg-[#0b0c10]/90 border border-white/[0.08] hover:border-white/25 rounded-3xl p-6 sm:p-7 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-500 shadow-xl hover:shadow-[0_16px_50px_rgba(137,170,204,0.15)] hover:translate-y-[-4px] backdrop-blur-xl`}
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-muted/60 font-semibold">
                    {project.index}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[11px] font-mono text-[#89AACC] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-text-primary/70">
                  {project.metrics}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight group-hover:text-white transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted font-body leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* High-Fidelity Obsidian Browser Software Mockup */}
              <div className="relative my-2">
                <ProjectMockupFrame
                  image={project.image}
                  title={project.title}
                  urlHost={project.urlHost}
                  badge={project.metrics}
                  aspect={project.span.includes("col-span-7") ? "aspect-[16/9]" : "aspect-[16/10]"}
                />
              </div>

              {/* Bottom Technology Stack & Launch Link */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tech.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-muted group-hover:text-text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] font-mono text-muted/60">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Inspect Action */}
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#89AACC] group-hover:text-white transition-colors">
                  <span>Blueprint</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
