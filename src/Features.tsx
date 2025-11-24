"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaSearch,
  FaBrain,
  FaPalette,
  FaServer,
} from "react-icons/fa";

const features = [
  {
    title: "Web Development",
    icon: <FaCode className="text-5xl text-blue-500" />,
    description:
      "Crafting sleek, responsive, and performance-driven websites using MERN stack & modern UI frameworks.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "App Development",
    icon: <FaMobileAlt className="text-5xl text-green-500" />,
    description:
      "Building cross-platform mobile applications with React Native, ensuring speed and smooth UX.",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "SEO Optimization",
    icon: <FaSearch className="text-5xl text-purple-500" />,
    description:
      "Improving visibility with SEO-optimized coding practices and high-performance design.",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Generative AI",
    icon: <FaBrain className="text-5xl text-yellow-500" />,
    description:
      "Integrating AI-powered solutions to automate workflows, enhance UX, and deliver smart systems.",
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "UX Design",
    icon: <FaPalette className="text-5xl text-pink-500" />,
    description:
      "Designing intuitive, user-centered interfaces with stunning visuals and smooth user flows.",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Hosting & Deployment",
    icon: <FaServer className="text-5xl text-red-500" />,
    description:
      "Deploying secure, scalable applications with high-availability hosting and CI/CD pipelines.",
    color: "from-red-500 to-orange-500",
  },
];

export default function Features() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px]"></div>

      {/* Title */}
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What I Do
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 relative z-10">
        {features.map((feature, index) => (
          <FeatureCard
            feature={feature}
            index={index}
            key={index}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        ))}
      </div>
    </section>
  );
}

interface Feature {
  title: string;
  icon: JSX.Element;
  description: string;
  color: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  hoverIndex: number | null;
  setHoverIndex: (index: number | null) => void;
}

const FeatureCard = ({ feature, index, hoverIndex, setHoverIndex }: FeatureCardProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-700/40 overflow-hidden group"
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: -5,
        scale: 1.03,
      }}
    >
      {/* Glow Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-all duration-300`}
      ></div>

      {/* Icon */}
      <motion.div
        className="flex justify-center mb-4"
        animate={hoverIndex === index ? { rotate: 360 } : {}}
        transition={{ duration: 0.6 }}
      >
        {feature.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-3 text-white">
        {feature.title}
      </h3>

      {/* Description */}
      <motion.p
        className="text-gray-300 text-sm leading-relaxed"
        animate={
          hoverIndex === index
            ? { opacity: 1, y: 0 }
            : { opacity: 0.3, y: 5 }
        }
        transition={{ duration: 0.3 }}
      >
        {feature.description}
      </motion.p>

      {/* Bottom Glow Line */}
      <div className="absolute left-0 bottom-0 w-full h-1 
          bg-gradient-to-r from-transparent via-blue-400 to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
    </motion.div>
  );
};
