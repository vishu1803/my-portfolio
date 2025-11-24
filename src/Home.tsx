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
      className="
        min-h-screen flex flex-col md:flex-row items-center justify-center
        px-6 md:px-20 pt-28 text-white
        bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden
      "
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* LEFT CONTENT */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left z-10"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to my World!</h1>

        <h2 className="text-4xl md:text-6xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          Vishwanath Nishad
        </h2>

        {/* Role Animation */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={roleIndex}
            className="text-3xl md:text-4xl font-semibold mt-3 text-blue-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            {roles[roleIndex]}
          </motion.h3>
        </AnimatePresence>

        <motion.p
          className="mt-6 text-gray-300 max-w-lg text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A passionate Full Stack Developer focusing on MERN and React Native,
          delivering modern, fast, and scalable applications. Skilled in UI/UX
          and Generative AI, I create impactful digital experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MagneticButton
            className="
              px-8 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-blue-500 to-purple-600 text-white
              shadow-lg hover:shadow-blue-500/50 transition-all
            "
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
            className="
              px-8 py-3 rounded-xl font-semibold
              bg-gray-800 border border-gray-700 text-white
              hover:bg-gray-700 transition-all
            "
          >
            Download Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* RIGHT CONTENT — Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          className="relative w-64 h-64 md:w-80 md:h-80"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30"></div>

          <Image
            src={profileImage}
            alt="Vishwanath Nishad"
            fill
            className="
              rounded-full object-cover 
              border-4 border-blue-400 shadow-2xl shadow-blue-500/40
            "
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
