"use client";

import { motion } from "framer-motion";

// PROJECTS DATA
const projects = [
  {
    title: "AI-Powered Code Review Assistant",
    description:
      "Analyzes GitHub PRs to detect bugs, code quality issues, and suggests smart improvements using FastAPI + OpenAI.",
    image: "/ai-code-review.png",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    accent: "from-blue-500 to-cyan-500",
    tag: "AI / Python",
  },
  {
    title: "Product Data Explorer",
    description:
      "Analytics dashboard with API integration, charts, and data exploration features built in Next.js.",
    image: "/product-explorer.png",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    accent: "from-purple-500 to-violet-500",
    tag: "Next.js",
  },
  {
    title: "Collaborative Task Manager",
    description:
      "Real-time team collaboration app built with Next.js, Prisma, and PostgreSQL.",
    image: "/task-manager.png",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    accent: "from-emerald-500 to-green-500",
    tag: "Full Stack",
  },
  {
    title: "3D Portfolio Website",
    description:
      "A beautiful 3D interactive portfolio built using React + Three.js.",
    image: "/portfolio.png",
    link: "https://3-d-portfolio-website-one.vercel.app",
    accent: "from-orange-500 to-amber-500",
    tag: "Three.js",
  },
  {
    title: "Object Detection Web App",
    description:
      "Real-time object detection using TensorFlow.js in the browser.",
    image: "/object-detection.png",
    link: "https://object-detection-web-app-indol.vercel.app/",
    accent: "from-yellow-500 to-orange-500",
    tag: "ML / TensorFlow",
  },
  {
    title: "Audience Query System",
    description:
      "An AI-powered audience query management platform that centralizes customer inquiries, categorizes intent, and routes them intelligently.",
    image: "/audience-query-system.png",
    link: "https://audience-query-system.vercel.app/",
    accent: "from-indigo-500 to-blue-500",
    tag: "AI / React",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-24 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[200px]" />

      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium tracking-widest uppercase text-blue-400/80 mb-3">
          Portfolio
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">Featured Projects</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </motion.div>
    </section>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  accent: string;
  tag: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden relative"
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Image with hover zoom */}
      <div className="relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tag badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full
            bg-gradient-to-r ${project.accent} text-white shadow-lg`}
        >
          {project.tag}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl
            bg-gradient-to-r ${project.accent} text-white
            shadow-lg hover:shadow-xl transition-all duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          View Project
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.a>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${project.accent}
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </motion.div>
  );
}
