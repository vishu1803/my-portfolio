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
    <footer className="bg-[#0a0a0f] text-white pt-16 pb-8 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.span
            className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                className="px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:text-gray-300 rounded-full hover:bg-white/[0.03] transition-all duration-300 capitalize"
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-2">
            <MagneticButton
              href="https://github.com/vishu1803"
              className="text-base p-2.5 rounded-xl text-gray-600 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              className="text-base p-2.5 rounded-xl text-gray-600 hover:text-white bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </MagneticButton>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-700 text-[11px] mt-10">
          © {new Date().getFullYear()} Vishwanath Nishad
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-2.5 rounded-xl z-50
          bg-white/[0.05] border border-white/[0.08] text-gray-400
          hover:text-white hover:bg-white/[0.1] backdrop-blur-sm
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
