import { useState } from "react";
import { motion } from "framer-motion";

const education = [
  { year: "2021 - Present", degree: "B.Tech in Electronics Engineering", institution: "Rajkiya Engineering College" },
  { year: "2018 - 2020", degree: "Higher Secondary", institution: "Renaissance Academy | Gorakhpur (U.P)" },
  { year: "2016 - 2018", degree: "High School Education", institution: "Zenith Convent School" },
];

const experience = [
  { year: "2024 - Present", role: "Web Developer Intern", company: "F Salon Academy LLP" },
  { year: "2023 - 2024", role: "Freelance Web Developer", company: "Self-Employed" },
];

const skills = [
  { name: "React.js", percentage: 90 },
  { name: "Node.js", percentage: 85 },
  { name: "MongoDB", percentage: 80 },
  { name: "Tailwind CSS", percentage: 95 },
  { name: "React Native", percentage: 75 },
  { name: "Generative AI", percentage: 70 },
];

export default function Resume() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <section id="resume" className="min-h-screen bg-gray-900 text-white py-16 px-6 md:px-20">
      <h2 className="text-5xl font-bold text-center mb-12">Resume</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-8">
        {["education", "skills", "experience"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-lg font-semibold rounded-md transition ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {tab === "education" ? "Education" : tab === "skills" ? "Professional Skills" : "Experience"}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {/* Education Section */}
        {activeTab === "education" && (
          <div>
            {education.map((item, index) => (
              <motion.div
                key={index}
                className="group bg-gray-800 p-6 rounded-lg shadow-md mb-6 relative transition duration-300 hover:shadow-blue-500/50 hover:scale-105"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold">{item.degree}</h3>
                <p className="text-blue-400">{item.institution}</p>
                <p className="text-gray-400">{item.year}</p>

                {/* Glowing Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.7)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Professional Skills Section */}
        {activeTab === "skills" && (
  <div>
    {skills.map((skill, index) => (
      <motion.div key={index} className="mb-6"
        whileHover={{ boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.9)" }}>
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{skill.name}</h4>
          <span className="text-gray-400 text-sm">{skill.percentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mt-2 relative overflow-hidden">
          <motion.div
            className="bg-blue-500 h-4 rounded-full relative"
            style={{ width: `${skill.percentage}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${skill.percentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </motion.div>
    ))}
  </div>
)}



        {/* Experience Section */}
        {activeTab === "experience" && (
          <div>
            {experience.map((item, index) => (
              <motion.div
                key={index}
                className="group bg-gray-800 p-6 rounded-lg shadow-md mb-6 relative transition duration-300 hover:shadow-blue-500/50 hover:scale-105"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="text-blue-400">{item.company}</p>
                <p className="text-gray-400">{item.year}</p>

                {/* Glowing Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.7)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
