"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------- DATA ----------------------
interface Education {
  year: string;
  degree: string;
  institution: string;
}

const education: Education[] = [
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

interface Experience {
  year: string;
  role: string;
  company: string;
}

const experience: Experience[] = [
  {
    year: "2024 - Present",
    role: "Web Developer Intern",
    company: "F Salon Academy LLP",
  },
  {
    year: "2023 - 2024",
    role: "Freelance Web Developer",
    company: "Self-Employed",
  },
];

interface Skill {
  name: string;
  icon: string;
}

const skillCategories: { label: string; color: string; skills: Skill[] }[] = [
  {
    label: "Frontend",
    color: "text-blue-400",
    skills: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "JavaScript", icon: "/icons/js.svg" },
      { name: "TypeScript", icon: "/icons/ts.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
    ],
  },
  {
    label: "Backend",
    color: "text-purple-400",
    skills: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "NestJS", icon: "/icons/nestjs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "FastAPI", icon: "/icons/fastapi.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "PostgreSQL", icon: "/icons/postgres.svg" },
      { name: "MongoDB", icon: "/icons/mongo.svg" },
      { name: "Prisma ORM", icon: "/icons/prisma.svg" },
      { name: "Supabase", icon: "/icons/supabase.svg" },
    ],
  },
  {
    label: "Tools & Others",
    color: "text-emerald-400",
    skills: [
      { name: "Git & GitHub", icon: "/icons/git.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Generative AI", icon: "/icons/ai.svg" },
    ],
  },
];

const TABS = ["education", "skills", "experience"] as const;
type Tab = (typeof TABS)[number];

const tabLabels: Record<Tab, string> = {
  education: "Education",
  skills: "Skills",
  experience: "Experience",
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// ---------------------- COMPONENT ----------------------
export default function Resume() {
  const [activeTab, setActiveTab] = useState<Tab>("education");

  return (
    <section
      id="resume"
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-24 px-6 md:px-20"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium tracking-widest uppercase text-blue-400/80 mb-3">
          Background
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Resume</h2>
      </motion.div>

      {/* TABS */}
      <div className="flex justify-center gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
              }`}
          >
            {tabLabels[tab]}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "education" && (
            <motion.div
              key="education"
              className="space-y-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/[0.06]
                    hover:border-blue-500/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-blue-400/80 text-sm mt-1">{item.institution}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              className="space-y-10"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {skillCategories.map((category) => (
                <div key={category.label}>
                  <h3 className={`text-lg font-bold mb-4 ${category.color}`}>
                    {category.label}
                  </h3>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        variants={staggerItem}
                        className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-xl
                          flex flex-col items-center gap-3
                          hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300
                          group cursor-default"
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-9 h-9 group-hover:scale-110 transition-transform duration-300"
                        />
                        <p className="text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                          {skill.name}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience"
              className="space-y-4"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] backdrop-blur-sm p-6 rounded-2xl border border-white/[0.06]
                    hover:border-purple-500/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-purple-400/80 text-sm mt-1">{item.company}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
