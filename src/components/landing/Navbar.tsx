"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Section tracking
      const sections = ["home", "case-studies", "about", "lab", "contact"];
      const currentScroll = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[#0B0C0E]/90 px-2 py-2 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/60 border-white/20 bg-[#0B0C0E]/95" : ""
        }`}
      >
        {/* 1. Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="group relative w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 flex items-center justify-center shrink-0"
          title="Vishwanath Nishad"
          aria-label="Home"
        >
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? "bg-[#FFE600]" : "bg-gradient-to-r from-[#FFE600] to-[#38BDF8]"
            }`}
          />
          <div className="relative w-full h-full rounded-full bg-[#08090B] flex items-center justify-center">
            <span className="font-display italic text-[13px] text-white tracking-tight">
              VN
            </span>
          </div>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />

        {/* 3. Nav links */}
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-colors duration-200 font-mono ${
              activeSection === "home"
                ? "text-[#FFE600] bg-white/10 font-medium"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("case-studies")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-colors duration-200 font-mono ${
              activeSection === "case-studies"
                ? "text-[#FFE600] bg-white/10 font-medium"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            Cases
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-colors duration-200 font-mono ${
              activeSection === "about"
                ? "text-[#FFE600] bg-white/10 font-medium"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            Dossier
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("lab")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 transition-colors duration-200 font-mono ${
              activeSection === "lab"
                ? "text-[#FFE600] bg-white/10 font-medium"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            Lab
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenResume) {
                onOpenResume();
              } else {
                window.open("/assets/aistudio/software-vishu_1f0ccd66.pdf", "_blank");
              }
            }}
            className="text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-muted hover:text-white hover:bg-white/5 transition-colors duration-200 font-mono hidden sm:inline-block"
          >
            Resume
          </button>
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* 5. "Collaborate" button */}
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="group relative rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
        >
          <span
            className="absolute inset-[-1.5px] rounded-full bg-[#FFE600] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <span className="relative flex items-center gap-1.5 rounded-full bg-[#0E1015] px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white font-mono font-medium backdrop-blur-md border border-white/10 group-hover:bg-[#FFE600] group-hover:text-black transition-colors">
            <span>Collaborate</span>
            <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
}
