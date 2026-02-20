"use client";

import { useRef } from "react";
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
    icon: <FaCode />,
    description:
      "Crafting sleek, responsive, and performance-driven websites using MERN stack & modern UI frameworks.",
    color: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-400",
  },
  {
    title: "App Development",
    icon: <FaMobileAlt />,
    description:
      "Building cross-platform mobile applications with React Native, ensuring speed and smooth UX.",
    color: "from-green-500 to-emerald-400",
    iconColor: "text-emerald-400",
  },
  {
    title: "SEO Optimization",
    icon: <FaSearch />,
    description:
      "Improving visibility with SEO-optimized coding practices and high-performance design.",
    color: "from-purple-500 to-pink-500",
    iconColor: "text-purple-400",
  },
  {
    title: "Generative AI",
    icon: <FaBrain />,
    description:
      "Integrating AI-powered solutions to automate workflows, enhance UX, and deliver smart systems.",
    color: "from-amber-500 to-orange-400",
    iconColor: "text-amber-400",
  },
  {
    title: "UX Design",
    icon: <FaPalette />,
    description:
      "Designing intuitive, user-centered interfaces with stunning visuals and smooth user flows.",
    color: "from-pink-500 to-rose-500",
    iconColor: "text-pink-400",
  },
  {
    title: "Hosting & Deployment",
    icon: <FaServer />,
    description:
      "Deploying secure, scalable applications with high-availability hosting and CI/CD pipelines.",
    color: "from-red-500 to-orange-500",
    iconColor: "text-red-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[160px]" />

      {/* Title */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-medium tracking-widest uppercase text-blue-400/80 mb-3">
          Services
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold">What I Do</h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature, index) => (
          <FeatureCard feature={feature} key={index} />
        ))}
      </motion.div>
    </section>
  );
}

interface Feature {
  title: string;
  icon: JSX.Element;
  description: string;
  color: string;
  iconColor: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <motion.div
      className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06]
        overflow-hidden group cursor-default"
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      style={{ perspective: 1000 }}
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.08] transition-all duration-500`}
      />

      {/* Gradient border on hover */}
      <div
        className={`absolute inset-0 rounded-2xl border border-transparent 
          group-hover:border-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-30 transition-all duration-500`}
      />

      {/* Icon */}
      <motion.div
        className={`text-4xl mb-5 ${feature.iconColor}`}
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {feature.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className={`absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r ${feature.color}
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </motion.div>
  );
};
