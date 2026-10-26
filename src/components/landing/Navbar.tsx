"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface NavbarProps {
  onOpenResume?: () => void;
}

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "case-studies", label: "Cases" },
  { id: "about", label: "Dossier" },
];

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const position = window.scrollY + 180;
      for (const id of [...SECTIONS.map((section) => section.id), "contact"]) {
        const section = document.getElementById(id);
        if (section && position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:pt-6 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className={`pointer-events-auto flex max-w-full items-center gap-0.5 rounded-full border border-white/15 bg-[#0B0C0E]/95 p-1.5 sm:gap-1 sm:p-2 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${scrolled ? "shadow-lg shadow-black/60 border-white/25" : ""}`}
      >
        <motion.a
          href="#home"
          aria-label="Home — Vishwanath Nishad"
          aria-current={activeSection === "home" ? "location" : undefined}
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFE600]/70 text-white font-display italic text-sm hover:border-white focus-visible:outline-offset-2"
        >
          VN
        </motion.a>

        <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true" />

        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={activeSection === section.id ? "location" : undefined}
            className={`${section.id === "home" ? "hidden sm:inline-flex" : "inline-flex"} min-h-11 items-center justify-center whitespace-nowrap rounded-full px-2 sm:px-3 text-[11px] sm:text-sm font-mono transition-colors hover:bg-white/10 hover:text-white ${activeSection === section.id ? "bg-white/10 text-[#FFE600]" : "text-white/75"}`}
          >
            {section.label}
          </a>
        ))}

        <button
          type="button"
          onClick={() => {
            if (onOpenResume) onOpenResume();
            else window.open("/assets/aistudio/software-vishu_1f0ccd66.pdf", "_blank", "noopener,noreferrer");
          }}
          className="hidden min-h-11 items-center rounded-full px-3 font-mono text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
        >
          Resume
        </button>

        <span className="mx-0.5 hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true" />
        <motion.a
          href="#contact"
          aria-current={activeSection === "contact" ? "location" : undefined}
          whileHover={reduceMotion ? undefined : { y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 sm:px-3.5 font-mono text-[11px] sm:text-sm text-white transition-colors hover:border-[#FFE600] hover:bg-[#FFE600] hover:text-black"
        >
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Collaborate</span>
          <span className="hidden sm:inline" aria-hidden="true">↗</span>
        </motion.a>
      </nav>
    </header>
  );
}
