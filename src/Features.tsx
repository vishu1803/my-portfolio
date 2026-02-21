"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaBrain,
  FaPalette,
  FaServer,
  FaCloud,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";

const features = [
  {
    title: "Full Stack Development",
    icon: <FaCode />,
    description:
      "Building end-to-end web applications with MERN stack, handling everything from database design to pixel-perfect UIs.",
    gradient: "from-[#4F8EF7] to-[#38BDF8]",
    iconBg: "bg-[#4F8EF7]/10",
    iconColor: "text-[#4F8EF7]",
  },
  {
    title: "Mobile Development",
    icon: <FaMobileAlt />,
    description:
      "Crafting cross-platform mobile applications with React Native, with focus on performance and native feel.",
    gradient: "from-[#34D399] to-[#10B981]",
    iconBg: "bg-[#34D399]/10",
    iconColor: "text-[#34D399]",
  },
  {
    title: "Backend Engineering",
    icon: <FaServer />,
    description:
      "Designing scalable APIs, microservices, and database architectures with Node.js, NestJS, FastAPI, and PostgreSQL.",
    gradient: "from-[#F97316] to-[#FB923C]",
    iconBg: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
  {
    title: "AI & Automation",
    icon: <FaBrain />,
    description:
      "Integrating generative AI, building intelligent workflows, and automating processes with modern ML tools.",
    gradient: "from-[#FBBF24] to-[#F59E0B]",
    iconBg: "bg-[#FBBF24]/10",
    iconColor: "text-[#FBBF24]",
  },
  {
    title: "System Design",
    icon: <FaPalette />,
    description:
      "Architecting clean, maintainable codebases with SOLID principles, design patterns, and thoughtful abstractions.",
    gradient: "from-[#7C5CFC] to-[#A78BFA]",
    iconBg: "bg-[#7C5CFC]/10",
    iconColor: "text-[#7C5CFC]",
  },
  {
    title: "DevOps & Cloud",
    icon: <FaCloud />,
    description:
      "Deploying and managing applications with Docker, CI/CD pipelines, and cloud-native infrastructure.",
    gradient: "from-[#E879A8] to-[#F472B6]",
    iconBg: "bg-[#E879A8]/10",
    iconColor: "text-[#E879A8]",
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
      className="py-28 bg-[#060609] text-white relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 80% 10%, rgba(79, 142, 247, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 70% 60% at 20% 90%, rgba(124, 92, 252, 0.18) 0%, transparent 70%)
          `,
        }}
      />

      {/* Section divider - top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <motion.div
        className="text-center mb-20 relative z-10 max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#4F8EF7]/70 mb-4">
          What I Do
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Expertise & Services
        </h2>
        <p className="mt-4 text-[#6b6b80] text-[15px] leading-relaxed">
          Specializing in building production-grade software across the full stack,
          from system design to deployment.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 sm:px-6 md:px-20 relative z-10 max-w-7xl mx-auto"
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
  iconBg: string;
  iconColor: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <motion.div
      className="glass-card relative rounded-2xl p-6 sm:p-7 overflow-hidden group cursor-default"
      variants={cardVariants}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0, 1] },
      }}
    >
      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}>
        <span className={`text-lg ${feature.iconColor}`}>
          {feature.icon}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold mb-2.5 text-white/90 group-hover:text-white transition-colors duration-300">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[#6b6b80] text-[13px] leading-[1.7]">
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        className={`absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r ${feature.gradient}
          scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </motion.div>
  );
};
