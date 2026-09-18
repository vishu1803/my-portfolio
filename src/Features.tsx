"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaBrain,
  FaPalette,
  FaServer,
  FaCloud,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";
import Capability3DMesh from "./components/Capability3DMesh";

interface Feature {
  id: number;
  title: string;
  category: "core" | "backend" | "cloud" | "ai";
  icon: JSX.Element;
  description: string;
  tags: string[];
  metric: string;
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    id: 0,
    title: "Full Stack Architecture",
    category: "core",
    icon: <FaCode />,
    description:
      "Engineering cohesive end-to-end applications with Next.js, React, and TypeScript, bridging high-speed frontend UX with resilient data tiers.",
    tags: ["Next.js 15", "TypeScript", "React", "State Machines"],
    metric: "Sub-100ms Hydration",
    color: "#38bdf8",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: 1,
    title: "Distributed Backend & APIs",
    category: "backend",
    icon: <FaServer />,
    description:
      "Architecting fault-tolerant REST and GraphQL services, event-driven pipelines, and relational database schemas with high concurrency.",
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Prisma"],
    metric: "High Concurrency / ACID",
    color: "#4f8ef7",
    gradient: "from-[#4f8ef7] to-[#38bdf8]",
  },
  {
    id: 2,
    title: "AI Integration & Agents",
    category: "ai",
    icon: <FaBrain />,
    description:
      "Deploying generative AI solutions, autonomous agent workflows, prompt chaining, and semantic vector retrieval (RAG).",
    tags: ["Gemini API", "Vector Embeddings", "RAG", "Agent Workflows"],
    metric: "Context-Aware Automation",
    color: "#7c5cfc",
    gradient: "from-[#7c5cfc] to-[#a78bfa]",
  },
  {
    id: 3,
    title: "System Design & Patterns",
    category: "core",
    icon: <FaPalette />,
    description:
      "Crafting modular, clean codebases aligned with SOLID principles, domain-driven boundaries, and scalable design abstractions.",
    tags: ["SOLID", "DDD", "Clean Architecture", "Design Patterns"],
    metric: "Modular Maintainability",
    color: "#38bdf8",
    gradient: "from-[#38bdf8] to-[#2dd4bf]",
  },
  {
    id: 4,
    title: "DevOps & Cloud Orchestration",
    category: "cloud",
    icon: <FaCloud />,
    description:
      "Containerizing workloads with Docker, architecting CI/CD pipelines, and deploying robust serverless and containerized cloud services.",
    tags: ["Docker", "CI/CD", "Cloud Run", "AWS", "Nginx"],
    metric: "Automated Deployments",
    color: "#e879a8",
    gradient: "from-[#e879a8] to-[#f472b6]",
  },
  {
    id: 5,
    title: "Cross-Platform Mobile",
    category: "core",
    icon: <FaMobileAlt />,
    description:
      "Building seamless native mobile experiences with React Native, emphasizing smooth 60fps frame rates and offline-first storage.",
    tags: ["React Native", "Expo", "Native Modules", "Offline Cache"],
    metric: "Native Feel & 60 FPS",
    color: "#34d399",
    gradient: "from-[#34d399] to-[#10b981]",
  },
];

const ease = [0.25, 0.1, 0, 1] as const;

function InteractiveFeatureCard({
  feature,
  isActive,
  onHover,
}: {
  feature: Feature;
  isActive: boolean;
  onHover: () => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.25, 0.1, 0, 1)",
      }}
      className={`relative rounded-2xl p-6 sm:p-7 overflow-hidden border transition-all duration-300 ${
        isActive
          ? "border-sky-400/50 bg-slate-950/80 shadow-2xl shadow-sky-500/10"
          : "border-white/[0.08] bg-slate-950/40 hover:border-sky-400/30 hover:bg-slate-950/60"
      }`}
    >
      {/* Dynamic Specular Glare Reflection */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-20"
          style={{
            background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.5), transparent 80%)`,
          }}
        />
      )}

      {/* Top Header: Icon + Metric Tag */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${feature.color}18`,
            color: feature.color,
            border: `1px solid ${feature.color}35`,
          }}
        >
          {feature.icon}
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#8b8b9e]">
          {feature.metric}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[16px] font-bold mb-2.5 text-white tracking-wide">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[#8b8b9e] text-[13px] leading-[1.7] mb-5">
        {feature.description}
      </p>

      {/* Technology Badges */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] text-[#8b8b9e] border border-white/[0.05]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Accent line */}
      <div
        className={`absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r ${feature.gradient} transition-transform duration-500 origin-left ${
          isHovered || isActive ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </motion.div>
  );
}

export default function Features() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeFeatureId, setActiveFeatureId] = useState<number>(0);

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  const activeFeature = features.find((f) => f.id === activeFeatureId) || features[0];

  return (
    <SectionWrapper
      id="features"
      className="py-28 bg-transparent text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Deep space celestial ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 80% 10%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 20% 90%, rgba(14, 165, 233, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* Section Header */}
      <motion.div
        className="text-center mb-12 relative z-10 max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Architectural Mastery
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Capabilities & Systems
        </h2>
        <p className="mt-4 text-[#8b8b9e] text-[15px] leading-relaxed">
          Production-grade engineering engineered from first principles. Scalable
          backends, high-fidelity user interfaces, and robust systems architecture.
        </p>
      </motion.div>

      {/* Interactive 3D Capability Mesh Visualizer */}
      <div className="max-w-xl mx-auto mb-10 relative z-10 px-4">
        <div className="rounded-3xl border border-white/[0.08] bg-slate-950/60 backdrop-blur-xl p-4 text-center overflow-hidden">
          <div className="flex items-center justify-between px-3 text-[11px] font-mono text-[#8b8b9e] border-b border-white/[0.06] pb-2 mb-2">
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeFeature.color }}
              />
              <span className="text-white font-medium uppercase">
                {activeFeature.title}
              </span>
            </span>
            <span className="text-sky-300">TACTILE 3D SYSTEM</span>
          </div>

          <Capability3DMesh
            activeColor={activeFeature.color}
            activeId={activeFeature.id}
          />
          <p className="text-[11px] text-[#8b8b9e] font-mono mt-1">
            Hover over any capability card to inspect its geometric frequency
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-14 relative z-10 px-4">
        {[
          { id: "all", label: "All Disciplines" },
          { id: "core", label: "Core Architecture" },
          { id: "backend", label: "Distributed Backend" },
          { id: "ai", label: "AI & Intelligence" },
          { id: "cloud", label: "Cloud & DevOps" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 ${
              activeCategory === tab.id
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-lg shadow-sky-500/10 font-semibold"
                : "text-[#8b8b9e] hover:text-white bg-white/[0.02] border border-white/[0.06]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Interactive 3D Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 sm:px-6 md:px-20 relative z-10 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredFeatures.map((feature) => (
            <InteractiveFeatureCard
              key={feature.id}
              feature={feature}
              isActive={activeFeatureId === feature.id}
              onHover={() => setActiveFeatureId(feature.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
