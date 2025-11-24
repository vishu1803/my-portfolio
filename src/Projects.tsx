"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

// 3D Floating Shape Component
function FloatingShape({ color = "#3b82f6" }: { color?: string }) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} floatIntensity={1.2} rotationIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

// PROJECTS DATA
const projects = [
  {
    title: "AI-Powered Code Review Assistant",
    description:
      "Analyzes GitHub PRs to detect bugs, code quality issues, and suggests smart improvements using FastAPI + OpenAI.",
    image: "/ai-code-review.png",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    color: "#3b82f6",
  },
  {
    title: "Product Data Explorer",
    description:
      "Analytics dashboard with API integration, charts, and data exploration features built in Next.js.",
    image: "/product-explorer.png",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    color: "#a855f7",
  },
  {
    title: "Collaborative Task Manager",
    description:
      "Real-time team collaboration app built with Next.js, Prisma, and PostgreSQL.",
    image: "/task-manager.png",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    color: "#22c55e",
  },
  {
    title: "3D Portfolio Website",
    description:
      "A beautiful 3D interactive portfolio built using React + Three.js.",
    image: "/portfolio.png",
    link: "https://3-d-portfolio-website-one.vercel.app",
    color: "#f97316",
  },
  {
    title: "Object Detection Web App",
    description:
      "Real-time object detection using TensorFlow.js in the browser.",
    image: "/object-detection.png",
    link: "https://object-detection-web-app-indol.vercel.app/",
    color: "#eab308",
  },
  {
    title: "AI Job Search Dashboard",
    description:
      "AI-based recommendation engine to find personalized job listings.",
    image: "/job.png",
    link: "https://ai-job-search-board.vercel.app",
    color: "#6366f1",
  },
];

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  // Safe mobile detection (React 19 safe)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-6 md:px-20 relative overflow-hidden"
    >
      {/* BACKGROUND FLOATING SHAPES */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <FloatingShape color="#3b82f6" />
        </Canvas>
      </div>

      <motion.h2
        className="text-5xl md:text-6xl font-bold text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Featured Projects
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} isMobile={isMobile} key={index} />
        ))}
      </div>
    </section>
  );
}

// Project Card Component
interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
}

function ProjectCard({ project, index, isMobile }: ProjectCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="group bg-gray-900/40 backdrop-blur-xl border border-gray-700/40 rounded-xl overflow-hidden shadow-xl relative"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
    >
      {/* 3D Shape on Desktop Only */}
      {!isMobile && (
        <div className="absolute top-4 right-4 w-20 h-20 opacity-80">
          <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 1.5]}>
            <FloatingShape color={project.color} />
          </Canvas>
        </div>
      )}

      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-t-xl group-hover:opacity-80 transition duration-300"
      />

      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition">
          {project.title}
        </h3>

        <p className="text-gray-300 mb-4 leading-relaxed">
          {project.description}
        </p>

        <motion.a
          href={project.link}
          target="_blank"
          className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all"
          whileHover={{ scale: 1.07 }}
        >
          View Project →
        </motion.a>
      </div>
    </motion.div>
  );
}
