"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./components/MagneticButton";
import profileImage from "./assets/profile.jpg";
import Image from "next/image";

const roles = ["Full Stack Developer", "UI Designer", "Professional Coder"];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center
        px-6 md:px-20 pt-28 text-white
        bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left z-10"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-sm md:text-base font-medium tracking-widest uppercase text-blue-400/80 mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Welcome to my World
        </motion.p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Vishwanath Nishad
          </span>
        </h1>

        {/* Role Animation */}
        <div className="h-12 md:h-14 mt-4 flex items-center justify-center md:justify-start">
          <AnimatePresence mode="wait">
            <motion.h3
              key={roleIndex}
              className="text-2xl md:text-3xl font-semibold text-blue-400"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
            >
              {roles[roleIndex]}
              <motion.span
                className="inline-block w-0.5 h-6 md:h-7 bg-blue-400 ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.h3>
          </AnimatePresence>
        </div>

        <motion.p
          className="mt-6 text-gray-400 max-w-lg text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          A passionate Full Stack Developer focusing on MERN and React Native,
          delivering modern, fast, and scalable applications. Skilled in UI/UX
          and Generative AI, I create impactful digital experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <MagneticButton
            className="px-8 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-blue-500 to-purple-600 text-white
              shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Hire Me
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            className="px-8 py-3 rounded-xl font-semibold
              bg-white/5 border border-white/10 text-white backdrop-blur-sm
              hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
          >
            Download Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT — Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Glow ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse" />

          <Image
            src={profileImage}
            alt="Vishwanath Nishad"
            fill
            priority
            className="rounded-full object-cover
              border-2 border-white/20 shadow-2xl shadow-blue-500/20
              ring-2 ring-blue-400/30 ring-offset-2 ring-offset-gray-950"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
