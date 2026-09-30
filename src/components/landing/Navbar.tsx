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
      const sections = ["home", "work", "journal", "explorations", "contact"];
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
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-2 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/40 border-white/15 bg-surface/95" : ""
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
          {/* Gradient ring reversing direction on hover */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? "accent-gradient-reverse" : "accent-gradient"
            }`}
          />
          {/* Inner circle with VN */}
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight">
              VN
            </span>
          </div>
        </button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 3. Nav links */}
        <div className="flex items-center space-x-0.5 sm:space-x-1">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              activeSection === "home"
                ? "text-text-primary bg-stroke/50 font-medium"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("work")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              activeSection === "work"
                ? "text-text-primary bg-stroke/50 font-medium"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            Work
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenResume) {
                onOpenResume();
              } else {
                window.open("/resume.pdf", "_blank");
              }
            }}
            className="text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors duration-200"
          >
            Resume
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("journal")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 hidden md:inline-block ${
              activeSection === "journal"
                ? "text-text-primary bg-stroke/50 font-medium"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            Journal
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("explorations")}
            className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 hidden lg:inline-block ${
              activeSection === "explorations"
                ? "text-text-primary bg-stroke/50 font-medium"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            Lab
          </button>
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1" />

        {/* 5. "Say hi" button */}
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="group relative rounded-full p-[2px] transition-transform duration-300 hover:scale-105"
        >
          {/* Accent gradient ring on hover */}
          <span
            className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          {/* Inner content */}
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-text-primary font-medium backdrop-blur-md border border-white/5">
            <span>Say hi</span>
            <span className="text-[11px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </button>
      </nav>
    </header>
  );
}
