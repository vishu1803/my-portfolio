"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaDownload,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";

const education = [
  {
    year: "2021 - 2025",
    degree: "Bachelor of Technology — Electronics Engineering",
    institution: "Rajkiya Engineering College",
    grade: "First Class with Distinction",
    focus: "Core Systems Architecture, Embedded Logic, Digital Signal Processing, Distributed Compute",
  },
  {
    year: "2018 - 2020",
    degree: "Senior Secondary (Class XII)",
    institution: "Renaissance Academy | Gorakhpur (U.P)",
    grade: "Physics, Mathematics, Computer Science",
    focus: "Foundational Algorithms & Discrete Mathematics",
  },
  {
    year: "2016 - 2018",
    degree: "Secondary School (Class X)",
    institution: "Zenith Convent School",
    grade: "High Academic Standing",
    focus: "Science & Mathematics Foundations",
  },
];

const experience = [
  {
    year: "Jul 2024 - Sep 2024",
    role: "Full-Stack Web Developer Intern",
    company: "F Salon Academy LLP",
    badge: "Production Deployment",
    highlights: [
      "Engineered resilient full-stack web applications and micro-endpoints with Express and React.",
      "Optimized PostgreSQL queries and indices, cutting API response latency by 28%.",
      "Integrated secure authentication, role-based dashboards, and automated lead capture pipelines.",
    ],
  },
  {
    year: "2023 - 2024",
    role: "Freelance Solutions Architect & Developer",
    company: "Independent Client Engagements",
    badge: "Client Systems Delivery",
    highlights: [
      "Designed and deployed custom web systems, SaaS prototypes, and responsive digital storefronts.",
      "Spearheaded database schema design, third-party REST API integrations, and cloud deployments on Vercel and Render.",
      "Maintained 100% on-time milestone delivery with strict code quality and test coverage.",
    ],
  },
];

const certifications = [
  {
    title: "Full-Stack Software Architecture",
    issuer: "Industry Verified Project Credentials",
    year: "2024",
    detail: "Demonstrated production deployment of full-stack microservices with database indexing and RBAC security.",
  },
  {
    title: "AI Integration & Generative Workflows",
    issuer: "Technical Project Artifacts",
    year: "2024",
    detail: "Engineered automated code auditing and AST query pipelines with LLM agent backends.",
  },
];

const TABS = [
  { id: "experience", label: "Experience", icon: <FaBriefcase /> },
  { id: "education", label: "Education", icon: <FaGraduationCap /> },
  { id: "credentials", label: "Credentials", icon: <FaAward /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

const ease = [0.25, 0.1, 0, 1] as const;

export default function Resume() {
  const [activeTab, setActiveTab] = useState<TabId>("experience");

  return (
    <SectionWrapper
      id="resume"
      className="min-h-screen bg-transparent text-white py-28 px-5 sm:px-6 md:px-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Deep space celestial ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 80% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 20% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-12 max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Career & Competencies
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Curriculum Vitae
        </h2>
        <p className="mt-4 text-[#8b8b9e] text-[15px] leading-relaxed">
          Comprehensive documentation of professional engagements, core technical
          mastery, and academic foundations.
        </p>

        {/* Quick Action: Download / Dispatch CV */}
        <div className="mt-6 flex justify-center">
          <a
            href="mailto:vishwanatnishad@gmail.com?subject=Requesting%20Formal%20Resume%20-%20Vishwanath%20Nishad&body=Hello%20Vishwanath%2C%20I%20would%20like%20to%20review%20your%20full%20formal%20PDF%20resume%20for%20an%20engineering%20opportunity."
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-sky-400/40 text-xs font-mono text-white transition-all shadow-md"
          >
            <FaDownload className="text-sky-300" />
            <span>Request Official PDF Dossier</span>
          </a>
        </div>
      </motion.div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-2 mb-14 relative z-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider flex items-center gap-2 transition-all duration-300 ${
              activeTab === tab.id
                ? "text-sky-300 font-semibold bg-sky-500/20 border border-sky-400/40 shadow-lg shadow-sky-500/10"
                : "text-[#8b8b9e] hover:text-white bg-white/[0.02] border border-white/[0.06]"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="space-y-6"
            >
              {experience.map((item, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl p-6 sm:p-8 bg-slate-950/70 border border-white/[0.08] hover:border-sky-400/40 backdrop-blur-xl shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <span className="inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/25 mb-2">
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {item.role}
                      </h3>
                      <p className="text-sky-400 text-sm font-mono mt-0.5">
                        {item.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#8b8b9e] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.08]">
                      {item.year}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                    {item.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-[#8b8b9e] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="space-y-6"
            >
              {education.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 sm:p-7 bg-slate-950/70 border border-white/[0.08] hover:border-sky-400/40 backdrop-blur-xl shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {item.degree}
                      </h3>
                      <p className="text-sky-400 text-sm font-mono mt-1">
                        {item.institution}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#8b8b9e] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.08]">
                      {item.year}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-[#8b8b9e] space-y-1">
                    <p className="text-white/80">
                      <span className="text-sky-300">Distinction:</span> {item.grade}
                    </p>
                    <p>
                      <span className="text-[#8b8b9e]">Focus Areas:</span> {item.focus}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* CREDENTIALS TAB */}
          {activeTab === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="space-y-6"
            >
              {certifications.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 sm:p-7 bg-slate-950/70 border border-white/[0.08] hover:border-sky-400/40 backdrop-blur-xl shadow-xl transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-400/30 flex items-center justify-center shrink-0 text-lg">
                    <FaCheckCircle />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <span className="text-xs font-mono text-[#8b8b9e]">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-sky-400 mb-2">
                      {item.issuer}
                    </p>
                    <p className="text-sm text-[#8b8b9e] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
