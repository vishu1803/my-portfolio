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
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
        bg-[#060609] relative overflow-hidden"
    >
      {/* Background glow — CSS gradients (not clipped by overflow) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(79, 142, 247, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 85% 80%, rgba(124, 92, 252, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232, 121, 168, 0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left z-10"
        style={{ opacity: textOpacity }}
      >
        {/* Status chip */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-gray-400 tracking-wide">
            Available for opportunities
          </span>
        </motion.div>

        {/* Typewriter Name */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-[3.5rem] lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
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
          <span className="gradient-text">
            {displayedName}
          </span>
          <motion.span
            className={`inline-block w-[3px] h-[0.8em] bg-gradient-to-b from-[#4F8EF7] to-[#7C5CFC] ml-1 align-baseline rounded-full`}
            animate={isTypingDone ? { opacity: [1, 0] } : { opacity: 1 }}
            transition={isTypingDone ? { duration: 1, repeat: Infinity, repeatType: "reverse" } : {}}
          />
        </motion.h1>

        {/* Role Animation */}
        <div className="h-8 sm:h-10 md:h-12 mt-4 md:mt-5 flex items-center justify-center md:justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-base sm:text-lg md:text-xl font-medium text-[#8b8b9e]"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease }}
            >
              {currentRole}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dynamic description */}
        <div className="min-h-[60px] mt-5 md:mt-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              className="text-[#6b6b80] max-w-lg mx-auto md:mx-0 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7]"
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
            className="px-7 py-3 rounded-full text-[13px] sm:text-sm font-semibold
              bg-gradient-to-r from-[#4F8EF7] to-[#7C5CFC] text-white
              shadow-lg shadow-[#4F8EF7]/20 hover:shadow-[#4F8EF7]/40 hover:scale-[1.03] transition-all duration-300"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get in Touch
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            className="px-7 py-3 rounded-full text-[13px] sm:text-sm font-semibold
              bg-white/[0.04] border border-white/[0.08] text-white
              hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-[1.03] transition-all duration-300"
          >
            Resume ↓
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-10 flex gap-8 sm:gap-10 justify-center md:justify-start"
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
              <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-[11px] text-[#4a4a5e] mt-1 uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.4 }}
      >
        <motion.div
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-8 md:-inset-12 bg-gradient-to-r from-[#4F8EF7]/10 via-[#7C5CFC]/10 to-[#E879A8]/10 rounded-full blur-3xl" />
          <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-[#4F8EF7]/5 to-[#7C5CFC]/5 rounded-full blur-2xl" />

          <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-[#4F8EF7]/30 via-[#7C5CFC]/30 to-[#E879A8]/30">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={profileImage}
                alt="Vishwanath Nishad"
                fill
                priority
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4a4a5e]">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-[#4a4a5e] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
