"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-transparent text-white pt-20 pb-12 relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Upper Telemetry Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-white/[0.06]">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-md shadow-sky-500/20 border border-sky-400/30">
              VN
            </div>
            <div>
              <p className="text-sm font-bold text-white font-mono tracking-wider">
                VISHWANATH NISHAD
              </p>
              <p className="text-[10px] font-mono text-[#8b8b9e] tracking-[0.2em] uppercase mt-0.5">
                Full-Stack Solutions Architect
              </p>
            </div>
          </div>

          {/* Real-time Horology Telemetry */}
          <div className="flex flex-col justify-center items-start md:items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80">LUCKNOW, IN:</span>
              <span className="text-sky-300 font-bold">{timeString || "12:00:00"} IST</span>
            </div>
            <span className="text-[9px] font-mono text-[#8b8b9e] mt-1.5">
              LAT 26.8467° N · LONG 80.9462° E
            </span>
          </div>

          {/* Direct Social Nodes */}
          <div className="flex items-center md:justify-end gap-2.5">
            <a
              href="https://github.com/vishu1803"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-400/40 text-[#8b8b9e] hover:text-white transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="text-base" />
            </a>

            <a
              href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-400/40 text-[#8b8b9e] hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-base" />
            </a>

            <a
              href="mailto:vishwanatnishad@gmail.com"
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-sky-400/40 text-[#8b8b9e] hover:text-white transition-all duration-300"
              aria-label="Email"
            >
              <FaEnvelope className="text-base" />
            </a>
          </div>
        </div>

        {/* Lower Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <nav className="flex flex-wrap gap-1.5 justify-center">
            {["home", "features", "skills", "projects", "resume", "contact"].map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => scrollToSection(section)}
                className="px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#8b8b9e] hover:text-sky-300 rounded-full hover:bg-white/[0.03] transition-all duration-300"
              >
                {section}
              </button>
            ))}
          </nav>

          <div className="text-center md:text-right text-[#8b8b9e] text-xs font-mono">
            <span>© {new Date().getFullYear()} Vishwanath Nishad. Designed with Deep Space Systems Architecture.</span>
          </div>
        </div>
      </div>

      {/* Back to Top 3D Floating Action Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3.5 rounded-2xl z-50
          bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white
          shadow-xl shadow-sky-500/25 border border-white/20
          transition-all duration-500 ${
            showScroll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to Top"
      >
        <FaArrowUp className="text-sm" />
      </motion.button>
    </footer>
  );
}
