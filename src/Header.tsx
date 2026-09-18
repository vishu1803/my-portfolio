"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link as _ScrollLink } from "react-scroll";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const ScrollLink = _ScrollLink as unknown as React.ComponentType<any>;

const NAV_SECTIONS = ["Home", "Features", "Skills", "Projects", "Resume", "Contact"];

const smoothSpring = { type: "spring" as const, stiffness: 400, damping: 40 };

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.toLowerCase());
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-[65] border-b"
        style={{
          backgroundColor: useTransform(headerBg, (v) => `rgba(0, 0, 0, ${v * 0.92})`),
          backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          borderColor: useTransform(headerBg, (v) => `rgba(255, 255, 255, ${v * 0.08})`),
        }}
      >
        <div className="flex justify-between items-center px-5 sm:px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            className="relative z-[70] select-none cursor-pointer flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={smoothSpring}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-md shadow-sky-500/20 border border-sky-400/30">
              VN
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-wider text-white font-mono block leading-none">
                VISHWANATH
              </span>
              <span className="text-[9px] font-mono text-[#8b8b9e] tracking-[0.2em] uppercase block mt-1">
                ENGINEER & ARCHITECT
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              {NAV_SECTIONS.map((section) => (
                <li key={section}>
                  <ScrollLink
                    to={section.toLowerCase()}
                    smooth={true}
                    duration={800}
                    offset={-70}
                    className={`relative cursor-pointer px-4 py-2 text-[12px] font-mono tracking-wider uppercase rounded-full transition-colors duration-300 ${
                      activeSection === section.toLowerCase()
                        ? "text-sky-300 font-semibold"
                        : "text-[#8b8b9e] hover:text-white"
                    }`}
                  >
                    {section}
                    {activeSection === section.toLowerCase() && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-sky-500/15 border border-sky-400/30 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </ScrollLink>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-sky-400/40 transition-all flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Connect</span>
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <motion.button
            className="md:hidden text-white text-xl cursor-pointer z-[70] p-2.5 rounded-full bg-white/[0.05]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.85 }}
            transition={smoothSpring}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaTimes />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaBars />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu — OUTSIDE header to avoid clipping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] as const }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center md:hidden"
          >
            {NAV_SECTIONS.map((section, i) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.25, 0.1, 0, 1] as const,
                }}
              >
                <ScrollLink
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  onClick={closeMobileMenu}
                  className={`text-2xl font-bold font-mono tracking-wider cursor-pointer block py-4 transition-colors duration-300 ${activeSection === section.toLowerCase()
                    ? "text-sky-300"
                    : "text-white/50 active:text-white"
                    }`}
                >
                  {section}
                </ScrollLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
