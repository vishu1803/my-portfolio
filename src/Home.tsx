"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./components/MagneticButton";
import HeroGlobe from "./components/HeroGlobe";
import Noble3DArtifact from "./components/Noble3DArtifact";
import profileImage from "./assets/profile.jpg";
import Image from "next/image";
import { FaCube, FaUser } from "react-icons/fa";

// ─── Toggle: set to false to disable background globe animation ───
const enableHeroGlobe = true;

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
  const [heroVisualMode, setHeroVisualMode] = useState<"3d" | "portrait">("3d");

  const { scrollYProgress } = useScroll();
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
        px-5 sm:px-6 md:px-20 pt-28 pb-16 md:pt-32 md:pb-12 text-white
        bg-transparent relative overflow-hidden"
    >
      {/* 3D Floating Particle Globe in Background */}
      {enableHeroGlobe && <HeroGlobe />}

      {/* Deep space celestial ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 80% 60% at 85% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left z-10"
        style={{ opacity: textOpacity }}
      >
        {/* Status Chip */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/25 mb-6"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-medium text-sky-300 tracking-wider uppercase">
            Available for Senior Roles & Contracts
          </span>
        </motion.div>

        {/* Typewriter Name */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-[3.4rem] lg:text-6xl font-extrabold leading-[1.12] tracking-tight"
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
          <span className="bg-gradient-to-r from-[#ffffff] via-[#e2e8f0] to-[#38bdf8] bg-clip-text text-transparent">
            {displayedName}
          </span>
          <motion.span
            className={`inline-block w-[3px] h-[0.8em] bg-gradient-to-b from-sky-400 to-blue-500 ml-1 align-baseline rounded-full`}
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
              className="text-base sm:text-lg md:text-xl font-medium text-[#8b8b9e] font-mono"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease }}
            >
              {currentRole}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dynamic description container */}
        <div className="relative mt-4 md:mt-5 min-h-[56px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              className="text-[#8b8b9e] max-w-lg text-[13px] sm:text-[14px] md:text-[15px] leading-[1.7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              {descriptions[currentRole]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-3.5 justify-center md:justify-start"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
        >
          <MagneticButton
            className="px-8 py-3.5 rounded-xl text-[13px] sm:text-sm font-semibold
              bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white
              shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.02] transition-all duration-300"
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Direct Connect →
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            className="px-7 py-3.5 rounded-xl text-[13px] sm:text-sm font-semibold
              bg-white/[0.04] border border-white/[0.12] text-white
              hover:bg-white/[0.08] hover:border-sky-400/40 hover:scale-[1.02] transition-all duration-300"
          >
            Curriculum Vitae ↓
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-12 flex gap-8 sm:gap-12 justify-center md:justify-start pt-6 border-t border-white/[0.06]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
        >
          {[
            { value: "6+", label: "Architected Systems" },
            { value: "2+", label: "Years Experience" },
            { value: "15+", label: "Modern Technologies" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#8b8b9e] mt-1 uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT: Interactive 3D Showcase & Portrait Switcher */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center justify-center mt-12 md:mt-0 z-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.4 }}
      >
        {/* Toggle Switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/[0.08] backdrop-blur-md mb-4 shadow-xl">
          <button
            type="button"
            onClick={() => setHeroVisualMode("3d")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              heroVisualMode === "3d"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm"
                : "text-[#8b8b9e] hover:text-white"
            }`}
          >
            <FaCube className="text-xs" />
            <span>3D Spatial Core</span>
          </button>
          <button
            type="button"
            onClick={() => setHeroVisualMode("portrait")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 ${
              heroVisualMode === "portrait"
                ? "bg-blue-500/20 text-blue-300 border border-blue-400/40 shadow-sm"
                : "text-[#8b8b9e] hover:text-white"
            }`}
          >
            <FaUser className="text-xs" />
            <span>Portrait</span>
          </button>
        </div>

        {/* Visual Stage */}
        <div className="w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {heroVisualMode === "3d" ? (
              <motion.div
                key="3d-artifact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <Noble3DArtifact />
              </motion.div>
            ) : (
              <motion.div
                key="portrait-photo"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px]"
              >
                <div className="absolute -inset-8 bg-gradient-to-tr from-sky-500/20 via-blue-600/20 to-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative w-full h-full rounded-3xl p-[2px] bg-gradient-to-br from-sky-400/60 via-blue-500/40 to-indigo-500/60 shadow-2xl overflow-hidden">
                  <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-black">
                    <Image
                      src={profileImage}
                      alt="Vishwanath Nishad"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] text-center">
                      <p className="text-xs font-mono text-sky-300 font-semibold">
                        VISHWANATH NISHAD
                      </p>
                      <p className="text-[11px] text-[#8b8b9e]">
                        Software & Backend Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[9px] font-mono font-medium tracking-[0.25em] uppercase text-[#8b8b9e]">
          EXPLORE
        </span>
        <motion.div
          className="w-[1px] h-7 bg-gradient-to-b from-sky-400 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

