"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaSearch,
  FaBrain,
  FaPalette,
  FaServer,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";

const features = [
  {
    title: "Full Stack Development",
    icon: <FaCode />,
    description:
      "Building end-to-end web applications with MERN stack, handling everything from database design to pixel-perfect UIs.",
    gradient: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-400",
  },
  {
    title: "Mobile Development",
    icon: <FaMobileAlt />,
    description:
      "Crafting cross-platform mobile applications with React Native, with focus on performance and native feel.",
    gradient: "from-emerald-500 to-green-400",
    iconColor: "text-emerald-400",
  },
  {
    title: "Backend Engineering",
    icon: <FaServer />,
    description:
      "Designing scalable APIs, microservices, and database architectures with Node.js, NestJS, FastAPI, and PostgreSQL.",
    gradient: "from-orange-500 to-red-400",
    iconColor: "text-orange-400",
  },
  {
    title: "AI & Automation",
    icon: <FaBrain />,
    description:
      "Integrating generative AI, building intelligent workflows, and automating processes with modern ML tools.",
    gradient: "from-amber-500 to-yellow-400",
    iconColor: "text-amber-400",
  },
  {
    title: "System Design",
    icon: <FaPalette />,
    description:
      "Architecting clean, maintainable codebases with SOLID principles, design patterns, and thoughtful abstractions.",
    gradient: "from-purple-500 to-pink-400",
    iconColor: "text-purple-400",
  },
  {
    title: "DevOps & Cloud",
    icon: <FaSearch />,
    description:
      "Deploying and managing applications with Docker, CI/CD pipelines, and cloud-native infrastructure.",
    gradient: "from-cyan-500 to-blue-400",
    iconColor: "text-cyan-400",
  },
];

const ease = [0.25, 0.1, 0, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function Features() {
  return (
    <SectionWrapper
      id="features"
      className="py-28 bg-[#0a0a0f] text-white relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/[0.03] rounded-full blur-[200px]" />
      </div>

      {/* Section header */}
      <motion.div
        className="text-center mb-20 relative z-10 max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-400/70 mb-4">
          What I Do
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Expertise & Services
        </h2>
        <p className="mt-4 text-gray-500 text-[15px] leading-relaxed">
          Specializing in building production-grade software across the full stack,
          from system design to deployment.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-6 md:px-20 relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((feature, index) => (
          <FeatureCard feature={feature} key={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

interface Feature {
  title: string;
  icon: JSX.Element;
  description: string;
  gradient: string;
  iconColor: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <motion.div
      className="relative bg-white/[0.02] rounded-2xl p-7 border border-white/[0.04]
        overflow-hidden group cursor-default"
      variants={cardVariants}
      whileHover={{
        y: -4,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        transition: { duration: 0.3, ease: [0.25, 0.1, 0, 1] },
      }}
    >
      {/* Icon */}
      <motion.div
        className={`text-2xl mb-5 ${feature.iconColor} opacity-80`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {feature.icon}
      </motion.div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold mb-2.5 text-white/90">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-[13px] leading-relaxed">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className={`absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r ${feature.gradient}
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </motion.div>
  );
};
