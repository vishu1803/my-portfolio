import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaMobileAlt, FaSearch, FaBrain, FaPalette, FaServer } from "react-icons/fa";

const features = [
  {
    title: "Web Development",
    icon: <FaCode className="text-4xl text-blue-500" />,
    description: "Creative Full Stack Web Developer crafting sleek, user-centric applications. Expertise in MERN stack, blending modern design and robust back-end solutions.",
  },
  {
    title: "App Development",
    icon: <FaMobileAlt className="text-4xl text-green-500" />,
    description: "Innovative Full Stack Developer specializing in React Native for dynamic app development and robust back-end solutions across platforms.",
  },
  {
    title: "SEO Optimization",
    icon: <FaSearch className="text-4xl text-purple-500" />,
    description: "Versatile Full Stack Developer skilled in web and mobile app development with React Native, delivering SEO-optimized applications for dynamic user experiences.",
  },
  {
    title: "Generative AI",
    icon: <FaBrain className="text-4xl text-yellow-500" />,
    description: "Leveraging Generative AI to create intelligent systems that automate processes, generate content, and enhance user experiences with smart, efficient solutions.",
  },
  {
    title: "UX Design",
    icon: <FaPalette className="text-4xl text-pink-500" />,
    description: "Passionate about UX Design, crafting intuitive, user-centered interfaces that blend functionality with aesthetics for responsive, engaging experiences.",
  },
  {
    title: "Hosting Websites",
    icon: <FaServer className="text-4xl text-red-500" />,
    description: "Expert in hosting websites, ensuring seamless deployment, security, and high-performance hosting solutions for high-traffic websites.",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="features" className="py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">What I Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`relative bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden text-center transition-all duration-300 ${
              hoveredIndex === index ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/50" : ""
            }`}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <motion.p
              className={`mt-2 text-gray-400 transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
