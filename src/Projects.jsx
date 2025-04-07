import { motion } from "framer-motion";

const projects = [
    {
      title: "3D Portfolio Website",
      image: `${import.meta.env.BASE_URL}portfolio.png`,
      description: "A visually stunning 3D portfolio website built with React, Three.js, and Tailwind CSS, showcasing skills and projects interactively.",
      link: "https://3-d-portfolio-website-one.vercel.app"
    },
    {
      title: "Weather App",
      image: `${import.meta.env.BASE_URL}weather.png`,
      description: "A real-time weather app that fetches live weather updates, forecasts, and detailed climate data using OpenWeather API."
    },
    {
      title: "Music Player App",
      image: `${import.meta.env.BASE_URL}music.png`,
      description: "A feature-rich music player app with playlists, audio visualization, and smooth UI/UX for an immersive listening experience."
    },
    {
      title: "AI Job Search Dashboard",
      image: `${import.meta.env.BASE_URL}job.png`,
      description: "A smart AI-powered job search dashboard that helps users find jobs efficiently with AI recommendations and resume analysis.",
      link: "https://ai-job-search-board.vercel.app"
    },
    {
      title: "Chat App",
      image: `${import.meta.env.BASE_URL}chatapp.png`,
      description: "A real-time chat application with user authentication, private & group messaging, and WebSocket-based live conversations."
    },
    {
      title: "Salon Booking System",
      image: `${import.meta.env.BASE_URL}salon.jpg`,
      description: "An online salon booking system for scheduling appointments, managing customer profiles, and processing online payments."
    }
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
