"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./components/SectionWrapper";

// ---------------------- DATA ----------------------
const education = [
  {
    year: "2021 - Present",
    degree: "B.Tech in Electronics Engineering",
    institution: "Rajkiya Engineering College",
  },
  {
    year: "2018 - 2020",
    degree: "Higher Secondary",
    institution: "Renaissance Academy | Gorakhpur (U.P)",
  },
  {
    year: "2016 - 2018",
    degree: "High School",
    institution: "Zenith Convent School",
  },
];

const experience = [
  {
    year: "2024 - Present",
    role: "Web Developer Intern",
    company: "F Salon Academy LLP",
    description: "Building and maintaining full-stack web applications, implementing RESTful APIs, and optimizing database performance.",
  },
  {
    year: "2023 - 2024",
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    description: "Delivering end-to-end web solutions for clients, from requirements gathering to deployment and maintenance.",
  },
];

interface Skill {
  name: string;
  icon: string;
}

const skillCategories: { label: string; skills: Skill[] }[] = [
  {
    label: "Languages & Frameworks",
    skills: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "JavaScript", icon: "/icons/js.svg" },
      { name: "TypeScript", icon: "/icons/ts.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Python", icon: "/icons/python.svg" },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { name: "NestJS", icon: "/icons/nestjs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "FastAPI", icon: "/icons/fastapi.svg" },
      { name: "PostgreSQL", icon: "/icons/postgres.svg" },
      { name: "MongoDB", icon: "/icons/mongo.svg" },
      { name: "Prisma", icon: "/icons/prisma.svg" },
      { name: "Supabase", icon: "/icons/supabase.svg" },
    ],
  },
  {
    label: "Tools & Infrastructure",
    skills: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "Generative AI", icon: "/icons/ai.svg" },
    ],
  },
];

const TABS = ["experience", "skills", "education"] as const;
type Tab = (typeof TABS)[number];

const ease = [0.25, 0.1, 0, 1] as const;

const contentVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease } },
  exit: { opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.25, ease } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

// ---------------------- COMPONENT ----------------------
export default function Resume() {
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  return (
    <SectionWrapper
      id="resume"
      className="min-h-screen bg-[#0a0a0f] text-white py-28 px-6 md:px-20"
    >
      <motion.div
        className="text-center mb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
          Background
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Resume
        </h2>
      </motion.div>

      {/* TABS */}
      <div className="flex justify-center gap-1 mb-14">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-2 rounded-full text-[13px] font-medium tracking-wide capitalize transition-colors duration-300 ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="resumeTab"
                className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* EXPERIENCE */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              className="space-y-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease }}
                  className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.04]
                    hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-blue-400/70 text-[13px] mt-1">{item.company}</p>
                      <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.04] whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* SKILLS */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              className="space-y-10"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {skillCategories.map((category) => (
                <div key={category.label}>
                  <h3 className="text-[13px] font-semibold mb-4 text-gray-400 tracking-wide">
                    {category.label}
                  </h3>
                  <motion.div
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl
                          flex flex-col items-center gap-2.5
                          hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300
                          group cursor-default"
                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                        />
                        <p className="text-[11px] font-medium text-gray-500 group-hover:text-gray-300 transition-colors text-center">
                          {skill.name}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}

          {/* EDUCATION */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              className="space-y-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease }}
                  className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.04]
                    hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-blue-400/70 text-[13px] mt-1">{item.institution}</p>
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.04] whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
