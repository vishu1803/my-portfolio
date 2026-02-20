"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import MagneticButton from "./components/MagneticButton";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-950 text-white pt-12 pb-8 relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-600/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-purple-600/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 relative z-10">
        {/* Brand */}
        <motion.h2
          className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          VN
        </motion.h2>

        {/* Navigation */}
        <nav className="flex space-x-1 text-sm font-medium mt-6 md:mt-0">
          {["home", "features", "projects", "resume", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 capitalize"
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-2 mt-6 md:mt-0">
          <MagneticButton
            href="https://github.com/vishu1803"
            className="text-xl p-2.5 rounded-lg text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
            className="text-xl p-2.5 rounded-lg text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </MagneticButton>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-600 text-xs mt-8 relative z-10">
        © {new Date().getFullYear()} Vishwanath Nishad. All rights reserved.
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-xl z-50
          bg-gradient-to-r from-blue-500 to-purple-600 text-white
          shadow-lg shadow-blue-500/20 transition-all duration-500 ${showScroll
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to Top"
      >
        <FaArrowUp className="text-sm" />
      </motion.button>
    </footer>
  );
}
