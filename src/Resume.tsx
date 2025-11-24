// src/Resume.jsx
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
  percentage: number;
}

const skills: Skill[] = [
  { name: "React.js", percentage: 90 },
  { name: "Node.js", percentage: 85 },
  { name: "MongoDB", percentage: 80 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "React Native", percentage: 75 },
  { name: "Generative AI", percentage: 70 },
];

// ---------------------- COMPONENT ----------------------
export default function Resume() {
  const [activeTab, setActiveTab] = useState<"education" | "skills" | "experience">("education");

  return (
    <section
      id="resume"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-6 md:px-20"
    >
      <h2 className="text-5xl font-bold text-center mb-12">Resume</h2>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-10">
        {["education", "skills", "experience"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all 
              ${activeTab === tab
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
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <h4 className="text-lg font-semibold">{skill.name}</h4>
                  <span className="text-gray-300">{skill.percentage}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1 }}
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </motion.div>
            ))}
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
