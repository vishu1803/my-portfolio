import { motion } from "framer-motion";

const projects = [
  {
    id: "ai-code-review",
    title: "AI-Powered Code Review Assistant",
    image: `${import.meta.env.BASE_URL}ai-code-review.png`,
    description:
      "An intelligent assistant that analyzes GitHub pull requests to detect style issues, potential bugs, and suggest improvements using OpenAI API and FastAPI.",
    link: "https://github.com/vishu1803/Ai-powered-code-review-assistant/",
    tags: [
      { name: "fastapi", color: "green-text-gradient" },
      { name: "openai", color: "blue-text-gradient" },
      { name: "python", color: "pink-text-gradient" },
    ],
  },
  {
    id: "product-explorer",
    title: "Product Data Explorer",
    image: `${import.meta.env.BASE_URL}product-explorer.png`,
    description:
      "An analytics dashboard for exploring and visualizing large product datasets with REST APIs and interactive charts built using Next.js and NestJS.",
    link: "https://product-explorer-frontend-qp3m.onrender.com/",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "nestjs", color: "green-text-gradient" },
      { name: "restapi", color: "pink-text-gradient" },
    ],
  },
  {
    id: "task-manager",
    title: "Collaborative Task Manager",
    image: `${import.meta.env.BASE_URL}task-manager.png`,
    description:
      "A full-stack task management platform supporting team collaboration, task prioritization, and real-time updates using Next.js, Prisma, and PostgreSQL.",
    link: "https://collaborative-task-manager-fc26.vercel.app/",
    tags: [
      { name: "nextjs", color: "blue-text-gradient" },
      { name: "prisma", color: "green-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
    ],
  },
  {
    id: "3d-portfolio",
    title: "3D Portfolio Website",
    image: `${import.meta.env.BASE_URL}portfolio.png`,
    description:
      "A visually stunning 3D portfolio website built with React, Three.js, and Tailwind CSS, showcasing skills and projects interactively.",
    link: "https://3-d-portfolio-website-one.vercel.app",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "threejs", color: "green-text-gradient" },
      { name: "tailwindcss", color: "pink-text-gradient" },
    ],
  },
  {
    id: "object-detection",
    title: "Object Detection Web App",
    image: `${import.meta.env.BASE_URL}object-detection.png`,
    description:
      "A real-time object detection web app that identifies objects in images and videos using AI-powered machine learning models.",
    link: "https://object-detection-web-app-indol.vercel.app/",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tensorflowjs", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
  },
  {
    id: "ai-job-search",
    title: "AI Job Search Dashboard",
    image: `${import.meta.env.BASE_URL}job.png`,
    description:
      "A smart AI-powered job search dashboard that helps users find jobs efficiently with AI recommendations and resume analysis.",
    link: "https://ai-job-search-board.vercel.app",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "python", color: "green-text-gradient" },
      { name: "restapi", color: "pink-text-gradient" },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-gray-900 text-white py-16 px-6 md:px-20">
      <h2 className="text-5xl font-bold text-center mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-5 shadow-lg overflow-hidden relative hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0px 0px 15px rgba(0, 183, 255, 0.8))" }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-2xl font-semibold mb-2 text-blue-400">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>

            <motion.a
              href={project.link || "#"}
              target={project.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              View Project
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
