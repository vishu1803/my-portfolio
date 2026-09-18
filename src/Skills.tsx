"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";
import MeteoroidSkillsCanvas, {
  METEOROID_SKILLS,
  MeteoroidSkill,
  OrbitMode,
} from "./components/MeteoroidSkillsCanvas";

const CATEGORIES = [
  { id: "all", label: "All Skills", count: METEOROID_SKILLS.length, color: "#38bdf8" },
  { id: "frontend", label: "Frontend", count: 6, color: "#38bdf8" },
  { id: "backend", label: "Backend", count: 6, color: "#60a5fa" },
  { id: "ai", label: "AI & ML", count: 1, color: "#818cf8" },
  { id: "devops", label: "DevOps & Cloud", count: 3, color: "#34d399" },
  { id: "architecture", label: "Architecture", count: 2, color: "#a5b4fc" },
] as const;

export default function Skills() {
  const [orbitMode, setOrbitMode] = useState<OrbitMode>("kepler");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<MeteoroidSkill | null>(METEOROID_SKILLS[0]);
  const [isCardOpen, setIsCardOpen] = useState(true);

  const filteredSkills = METEOROID_SKILLS.filter((s) => {
    return filterCategory === "all" || s.category === filterCategory;
  });

  const handleSelectSkill = (skill: MeteoroidSkill) => {
    setSelectedSkill(skill);
    setIsCardOpen(true);
  };

  const handlePrevSkill = () => {
    if (!selectedSkill) return;
    const currentIndex = filteredSkills.findIndex((s) => s.id === selectedSkill.id);
    const prevIndex = (currentIndex - 1 + filteredSkills.length) % filteredSkills.length;
    setSelectedSkill(filteredSkills[prevIndex]);
  };

  const handleNextSkill = () => {
    if (!selectedSkill) return;
    const currentIndex = filteredSkills.findIndex((s) => s.id === selectedSkill.id);
    const nextIndex = (currentIndex + 1) % filteredSkills.length;
    setSelectedSkill(filteredSkills[nextIndex]);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionWrapper
      id="skills"
      className="min-h-screen bg-transparent text-white py-24 px-5 sm:px-6 md:px-20 relative overflow-hidden"
    >
      {/* Subtle top hairline accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sky-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <FaCode className="text-xs" />
            <span>TECHNICAL EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Core Skills &{" "}
            <span className="text-sky-400">
              Technologies
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Interactive 3D simulation of production technologies and architectural proficiencies.
            Drag to rotate 360°, scroll to zoom, and select any asteroid to inspect technical details.
          </p>
        </motion.div>

        {/* Global Toolbar: Category Filters & Motion Mode */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/[0.08] backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const isActive = filterCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-white/[0.12] text-white border border-white/20 shadow-md"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                  style={{
                    color: isActive ? cat.color : undefined,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span>{cat.label}</span>
                  <span className="text-[10px] opacity-60">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Motion Mode Selector */}
          <div className="flex items-center gap-1.5 justify-end">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-white/[0.08] backdrop-blur-md">
              <span className="text-[10px] font-mono text-zinc-400 px-2 uppercase tracking-wider hidden sm:inline">
                Motion:
              </span>
              <button
                type="button"
                onClick={() => setOrbitMode("kepler")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  orbitMode === "kepler"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Orbital
              </button>
              <button
                type="button"
                onClick={() => setOrbitMode("drift")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  orbitMode === "drift"
                    ? "bg-[#60a5fa]/20 text-[#93c5fd] border border-[#60a5fa]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Floating
              </button>
              <button
                type="button"
                onClick={() => setOrbitMode("vortex")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  orbitMode === "vortex"
                    ? "bg-[#818cf8]/20 text-[#a5b4fc] border border-[#818cf8]/40"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Spiral
              </button>
            </div>
          </div>
        </div>

        {/* MAIN 3D SPACE VIEWPORT WITH DYNAMIC INSPECTION CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-slate-950/80 border border-white/[0.1] shadow-2xl h-[600px] sm:h-[660px] flex flex-col"
        >
          {/* Viewport Top Bar HUD */}
          <div className="px-5 py-3 border-b border-white/[0.08] bg-slate-950/90 backdrop-blur-md flex items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-xs font-mono text-zinc-200 tracking-wider">
                DEEP SPACE SIMULATION
              </span>
              <span className="hidden sm:inline text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                {filteredSkills.length} Technologies
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
              <span className="hidden md:inline">
                Drag to rotate · Scroll to zoom · Click asteroid to inspect
              </span>
            </div>
          </div>

          {/* Three.js 3D WebGL Canvas */}
          <div className="flex-1 w-full h-full relative bg-transparent">
            <MeteoroidSkillsCanvas
              mode={orbitMode}
              filterCategory={filterCategory}
              selectedSkill={selectedSkill}
              onSelectSkill={handleSelectSkill}
            />

            {/* DYNAMIC CARD OVERLAY (Appears when an asteroid is selected) */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 pointer-events-auto">
              <AnimatePresence mode="wait">
                {selectedSkill && isCardOpen ? (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="p-5 rounded-2xl bg-slate-950/95 border border-white/[0.12] backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                    style={{
                      boxShadow: `0 16px 40px -10px rgba(0,0,0,0.8), 0 0 1px 1px ${selectedSkill.color}30`,
                    }}
                  >
                    {/* Top ambient color hairline */}
                    <div
                      className="absolute top-0 left-0 w-full h-[2px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${selectedSkill.color}, transparent)`,
                      }}
                    />

                    {/* Card Header: Category & Controls */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: selectedSkill.color }}
                        />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                          {selectedSkill.category} · {selectedSkill.tier}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Quick Prev / Next Navigator */}
                        <button
                          type="button"
                          onClick={handlePrevSkill}
                          title="Previous skill"
                          className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <FaChevronLeft className="text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextSkill}
                          title="Next skill"
                          className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <FaChevronRight className="text-xs" />
                        </button>
                        {/* Close button to view full canvas */}
                        <button
                          type="button"
                          onClick={() => setIsCardOpen(false)}
                          title="Close card"
                          className="p-1 ml-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Skill Name & Proficiency */}
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {selectedSkill.name}
                      </h3>
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-sky-300">
                          {selectedSkill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Specialty Tag */}
                    <p className="text-xs font-mono text-zinc-300 mb-2.5">
                      {selectedSkill.tag}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {selectedSkill.description}
                    </p>

                    {/* Proficiency Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: selectedSkill.color,
                          boxShadow: `0 0 8px ${selectedSkill.color}60`,
                        }}
                      />
                    </div>

                    {/* Applied Projects & Action Link */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-zinc-400">APPLIED IN:</span>
                        {selectedSkill.appliedIn.map((proj, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-200 border border-white/[0.06]"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={scrollToProjects}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-300 hover:text-white transition-colors"
                      >
                        <span>View Projects</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Minimized trigger when card is closed */
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setIsCardOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-white/[0.12] text-xs font-mono text-zinc-200 hover:text-white backdrop-blur-xl shadow-xl flex items-center gap-2 transition-all"
                  >
                    <FaInfoCircle className="text-sky-300" />
                    <span>
                      {selectedSkill ? `Inspecting: ${selectedSkill.name}` : "Click any asteroid to inspect"}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
