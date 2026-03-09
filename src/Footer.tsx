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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060609] text-white pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.span
            className="text-2xl font-black tracking-tight gradient-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            VN
          </motion.span>

          {/* Navigation */}
          <nav className="flex gap-1">
            {["home", "features", "projects", "resume", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="px-3 py-1.5 text-[12px] font-medium text-[#4a4a5e] hover:text-[#8b8b9e] rounded-full hover:bg-white/[0.03] transition-all duration-300 capitalize"
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-base p-2.5 rounded-xl glass-card text-[#4a4a5e] hover:text-white"
              aria-label="GitHub"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-base p-2.5 rounded-xl glass-card text-[#4a4a5e] hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </MagneticButton>
          </div>
        </div>

        <div className="text-center text-[#2a2a3a] text-[11px] mt-10 tracking-wide">
          © {new Date().getFullYear()} Vishwanath Nishad
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-xl z-50
          bg-gradient-to-r from-[#4F8EF7] to-[#7C5CFC] text-white
          shadow-lg shadow-[#4F8EF7]/20
          transition-all duration-500 ${showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to Top"
      >
        <FaArrowUp className="text-xs" />
      </motion.button>
    </footer>
  );
}
