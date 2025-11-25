"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

const skillCategories: Record<string, Skill[]> = {
  frontend: [
    { name: "React.js", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "JavaScript", icon: "/icons/js.svg" },
    { name: "TypeScript", icon: "/icons/ts.svg" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
  ],
  backend: [
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
  tools: [
    { name: "Git & GitHub", icon: "/icons/git.svg" },
    { name: "Docker", icon: "/icons/docker.svg" },
    { name: "Postman", icon: "/icons/postman.svg" },
    { name: "VS Code", icon: "/icons/vscode.svg" },
    { name: "Generative AI", icon: "/icons/ai.svg" },
  ],
};

// ---------------------- COMPONENT ----------------------
export default function Resume() {
  const [activeTab, setActiveTab] = useState<
    "education" | "skills" | "experience"
  >("education");

  return (
    <section
      id="resume"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6 md:px-20"
    >
      <h2 className="text-5xl font-bold text-center mb-12">Resume</h2>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10">
        {(["education", "skills", "experience"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all 
            ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab === "education"
              ? "Education"
              : tab === "skills"
              ? "Skills"
              : "Experience"}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto">
        {/* EDUCATION */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {education.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700"
              >
                <h3 className="text-xl font-semibold">{item.degree}</h3>
                <p className="text-blue-400">{item.institution}</p>
                <p className="text-gray-400 mt-1">{item.year}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-12">
            {/* FRONTEND */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                Frontend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skillCategories.frontend.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col items-center gap-3 hover:bg-gray-700/60 transition"
                  >
                    <img src={skill.icon} className="w-10 h-10" />
                    <p className="text-sm">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BACKEND */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">
                Backend
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skillCategories.backend.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col items-center gap-3 hover:bg-gray-700/60 transition"
                  >
                    <img src={skill.icon} className="w-10 h-10" />
                    <p className="text-sm">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* TOOLS */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-400">
                Tools & Others
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {skillCategories.tools.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex flex-col items-center gap-3 hover:bg-gray-700/60 transition"
                  >
                    <img src={skill.icon} className="w-10 h-10" />
                    <p className="text-sm">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700"
              >
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="text-purple-400">{item.company}</p>
                <p className="text-gray-400 mt-1">{item.year}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
