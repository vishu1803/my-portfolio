"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./components/MagneticButton";
import profileImage from "./assets/profile.jpg";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "Software Developer",
];

// Role-specific descriptions
const descriptions: Record<string, string> = {
  "Full Stack Developer":
    "Building end-to-end web applications with MERN stack — from database architecture and REST APIs to responsive, pixel-perfect frontends that scale.",
  "Backend Engineer":
    "Designing robust server-side systems, microservices, and scalable APIs with Node.js, NestJS, FastAPI, PostgreSQL, and MongoDB.",
  "Software Developer":
    "Crafting clean, maintainable software with modern engineering practices — SOLID principles, CI/CD pipelines, Docker, and test-driven development.",
};

const FULL_NAME = "Vishwanath Nishad";
const ease = [0.25, 0.1, 0, 1] as const;

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Typewriter effect for name
  useEffect(() => {
    let i = 0;
    setDisplayedName("");
    setIsTypingDone(false);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayedName(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 70);
      return () => clearInterval(interval);
    }, 800); // delay before typing starts

    return () => clearTimeout(timer);
  }, []);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[roleIndex];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center
        px-5 sm:px-6 md:px-20 pt-24 pb-16 md:pt-28 md:pb-0 text-white
        bg-[#0a0a0f] relative overflow-hidden"
    >
      {/* Animated background gradients — subtle parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-0 left-[10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-600/[0.04] rounded-full blur-[150px] md:blur-[200px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-600/[0.04] rounded-full blur-[150px] md:blur-[200px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/[0.03] rounded-full blur-[150px] md:blur-[200px]" />
      </motion.div>

      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left z-10"
        style={{ opacity: textOpacity }}
      >
        {/* Greeting chip */}
        <motion.div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5 md:mb-6"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-medium text-gray-400 tracking-wide">
            Available for opportunities
          </span>
        </motion.div>

        {/* Typewriter Name */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          {"Hi, I'm".split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-2 sm:mr-3 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.08 }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {displayedName}
          </span>
          {/* Blinking cursor */}
          <motion.span
            className={`inline-block w-[3px] h-[0.85em] bg-gradient-to-b from-blue-400 to-purple-400 ml-1 align-baseline rounded-full ${isTypingDone ? "animate-pulse" : ""
              }`}
            animate={isTypingDone ? { opacity: [1, 0] } : { opacity: 1 }}
            transition={
              isTypingDone
                ? { duration: 1, repeat: Infinity, repeatType: "reverse" }
                : {}
            }
          />
        </motion.h1>

        {/* Role Animation */}
        <div className="h-8 sm:h-10 md:h-12 mt-4 md:mt-5 flex items-center justify-center md:justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-base sm:text-lg md:text-xl font-medium text-gray-400"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease }}
            >
              {currentRole}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dynamic description based on current role */}
        <div className="h-[72px] sm:h-[60px] md:h-[56px] mt-5 md:mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              className="text-gray-500 max-w-lg text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
            >
              {descriptions[currentRole]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <motion.div
          className="mt-7 md:mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
        >
          <MagneticButton
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-semibold
              bg-white text-gray-900
              shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-[1.03] transition-all duration-300"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-semibold
              bg-white/[0.05] border border-white/[0.1] text-white
              hover:bg-white/[0.1] hover:scale-[1.03] transition-all duration-300"
          >
            Resume ↓
          </MagneticButton>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="mt-8 md:mt-10 flex gap-6 sm:gap-8 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
        >
          {[
            { value: "6+", label: "Projects" },
            { value: "2+", label: "Years Exp" },
            { value: "10+", label: "Tech Stack" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT — Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.4 }}
      >
        <motion.div
          className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Multi-layer glow */}
          <div className="absolute -inset-6 md:-inset-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl" />

          <Image
            src={profileImage}
            alt="Vishwanath Nishad"
            fill
            priority
            className="rounded-full object-cover border border-white/10"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — hide on mobile */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-600">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
