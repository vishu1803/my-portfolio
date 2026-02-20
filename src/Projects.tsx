"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./components/SectionWrapper";

const projects = [
  {
    title: "AI-Powered Code Review",
    description:
      "Automated code analysis system that reviews GitHub PRs, detects bugs and quality issues using FastAPI + OpenAI.",
    image: "/ai-code-review.png",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    tag: "AI · Python · FastAPI",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Product Data Explorer",
    description:
      "Full-featured analytics dashboard with real-time API integration, interactive charts, and data filtering.",
    image: "/product-explorer.png",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    tag: "Next.js · REST API",
    accent: "from-purple-500 to-violet-500",
  },
  {
    title: "Collaborative Task Manager",
    description:
      "Real-time team collaboration platform with role-based auth, built on Next.js, Prisma, and PostgreSQL.",
    image: "/task-manager.png",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    tag: "Full Stack · PostgreSQL",
    accent: "from-emerald-500 to-green-500",
  },
  {
    title: "3D Portfolio Website",
    description:
      "Interactive 3D portfolio experience built with React, Three.js, and custom shaders.",
    image: "/portfolio.png",
    link: "https://3-d-portfolio-website-one.vercel.app",
    tag: "React · Three.js",
    accent: "from-orange-500 to-amber-500",
  },
  {
    title: "Object Detection App",
    description:
      "Browser-based real-time object detection using TensorFlow.js with webcam integration.",
    image: "/object-detection.png",
    link: "https://object-detection-web-app-indol.vercel.app/",
    tag: "ML · TensorFlow.js",
    accent: "from-yellow-500 to-orange-500",
  },
  {
    title: "Audience Query System",
    description:
      "AI-powered customer query router that categorizes intent and manages multi-channel inquiries.",
    image: "/audience-query-system.png",
    link: "https://audience-query-system.vercel.app/",
    tag: "AI · React · Node",
    accent: "from-indigo-500 to-blue-500",
  },
];

const ease = [0.25, 0.1, 0, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export default function Projects() {
  return (
    <SectionWrapper
      id="projects"
      className="min-h-screen bg-[#0a0a0f] text-white py-28 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[200px]" />
      </div>

      <motion.div
        className="text-center mb-20 relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Featured Projects
        </h2>
        <p className="mt-4 text-gray-500 text-[15px] leading-relaxed">
          A collection of production applications showcasing full-stack development,
          AI integration, and system design.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
  accent: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white/[0.02] border border-white/[0.04] rounded-2xl overflow-hidden relative"
      variants={cardVariants}
      whileHover={{
        y: -4,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        transition: { duration: 0.3, ease: [0.25, 0.1, 0, 1] },
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />

        {/* Tag */}
        <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full
          bg-white/10 backdrop-blur-md text-white/80 border border-white/10">
          {project.tag}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-[15px] font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Arrow link */}
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
          <span>View Project</span>
          <motion.svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </motion.svg>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r ${project.accent}
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </motion.a>
  );
}
