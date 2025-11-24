"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import MagneticButton from "./components/MagneticButton";
import { useEffect, useState } from "react";

export default function Footer() {
  const [performanceMode, setPerformanceMode] = useState(false);

  // Listen for performance mode toggle (used globally)
  useEffect(() => {
    const handlePerfChange = (e: any) => setPerformanceMode(e.detail);
    window.addEventListener("performance-mode", handlePerfChange);
    return () => window.removeEventListener("performance-mode", handlePerfChange);
  }, []);

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800 relative overflow-hidden">
      {/* Background glow */}
      {!performanceMode && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 relative z-10">

        {/* Brand */}
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          VN
        </h2>

        {/* Navigation */}
        <nav className="flex space-x-6 text-lg font-semibold mt-6 md:mt-0">
          {["home", "features", "projects", "resume", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="hover:text-blue-400 transition-colors capitalize"
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <MagneticButton
            href="https://github.com/vishu1803"
            className="text-3xl text-blue-400 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
            className="text-3xl text-blue-400 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </MagneticButton>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8 relative z-10">
        © {new Date().getFullYear()} Vishwanath Nishad. All rights reserved.
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 ${showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Back to Top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}
