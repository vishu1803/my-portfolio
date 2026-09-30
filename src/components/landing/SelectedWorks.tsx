"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  span: string; // e.g. "md:col-span-7" or "md:col-span-5"
  link: string;
  github?: string;
  description: string;
  metrics: string;
  tech: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ai-code-review",
    title: "AI Code Review Engine",
    category: "Automated PR Intelligence",
    tag: "AI · Python · FastAPI",
    image: "/ai-code-review.png",
    span: "md:col-span-7",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    github: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    description:
      "Automated code analysis engine analyzing GitHub pull requests, detecting syntax anomalies, AST patterns, and security vulnerabilities using FastAPI and LLM reasoning.",
    metrics: "<1.2s PR Analysis Latency",
    tech: ["FastAPI", "Python 3.11", "GitHub Webhooks", "AST Parsers", "LLMs"],
  },
  {
    id: "product-explorer",
    title: "Product Data Explorer",
    category: "High-Throughput Analytics",
    tag: "Next.js · REST API · Analytics",
    image: "/product-explorer.png",
    span: "md:col-span-5",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    github: "https://github.com/vishu1803",
    description:
      "High-throughput analytics platform aggregating real-time e-commerce data, dynamic query indexing, interactive time-series charts, and multi-faceted parametric filtering.",
    metrics: "10k+ Record Filter",
    tech: ["Next.js", "Redis Caching", "Canvas Charts", "REST APIs"],
  },
  {
    id: "task-manager",
    title: "Collaborative Task Manager",
    category: "Enterprise Distributed Workflow",
    tag: "Next.js · Prisma · PostgreSQL",
    image: "/task-manager.png",
    span: "md:col-span-5",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    github: "https://github.com/vishu1803",
    description:
      "Distributed team workflow platform featuring granular Role-Based Access Control (RBAC), multi-tenant workspaces, atomic state mutations, and relational PostgreSQL persistence.",
    metrics: "ACID Guaranteed Transactions",
    tech: ["Next.js", "Prisma ORM", "PostgreSQL", "NextAuth RBAC"],
  },
  {
    id: "3d-portfolio",
    title: "3D Portfolio & WebGL Lab",
    category: "Spatial Digital Experience",
    tag: "React · Three.js · WebGL",
    image: "/portfolio.png",
    span: "md:col-span-7",
    link: "https://3-d-portfolio-website-one.vercel.app",
    github: "https://github.com/vishu1803/3D-portfolio-website",
    description:
      "Interactive 3D digital experience built with React Three Fiber and Three.js, incorporating custom GLSL shaders, camera lerping, and mathematical geometry physics.",
    metrics: "Locked 60 FPS WebGL",
    tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Framer Motion"],
  },
];

interface SelectedWorksProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  return (
    <section id="work" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow: w-8 h-px bg-stroke + "Selected Work" */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Selected Work
              </span>
            </div>

            {/* Heading: Featured projects (projects in font-display italic) */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-body">
              Featured{" "}
              <span className="font-display italic text-text-primary">
                projects
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3 text-sm md:text-base text-muted max-w-lg leading-relaxed">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" button (hidden on mobile, inline-flex on md+) */}
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
              <span className="text-text-primary">View all work</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid: 12-col grid alternating 7/5/5/7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectProject(project)}
              className={`${project.span} relative group bg-surface border border-stroke rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[460px] cursor-pointer flex flex-col justify-end p-6 md:p-8 select-none transition-all duration-500 hover:border-white/20`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 2}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Halftone Overlay */}
              <div
                className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Subtle permanent dark gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-85 z-10 pointer-events-none" />

              {/* Hover Backdrop Overlay: bg-bg/70 opacity-0 -> 1 + backdrop-blur-lg */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-500 z-20 pointer-events-none" />

              {/* Default Card Information (Visible when not hovered) */}
              <div className="relative z-20 flex flex-col justify-between h-full pointer-events-none">
                {/* Top tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-bg/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-muted tracking-wider">
                    {project.tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-stroke/60 text-[10px] font-mono text-text-primary/70">
                    {project.metrics}
                  </span>
                </div>

                {/* Bottom title & description */}
                <div className="mt-auto pt-6">
                  <span className="text-xs text-muted uppercase tracking-[0.2em] font-mono block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Hover Label: Pill with animated gradient border, white bg, "View — Title" */}
              <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-95 group-hover:scale-100">
                <div className="relative rounded-full p-[2px] shadow-2xl">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  {/* White background pill */}
                  <div className="relative bg-white text-bg px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="text-xs font-mono tracking-wider uppercase font-semibold text-black">
                      View —
                    </span>
                    <span className="font-display italic text-base text-black font-medium">
                      {project.title}
                    </span>
                    <span className="text-black font-mono text-sm ml-1">↗</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
