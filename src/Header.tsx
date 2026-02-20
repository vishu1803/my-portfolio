"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_SECTIONS = ["Home", "Features", "Projects", "Resume", "Contact"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position for header blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled
          ? "bg-gray-900/80 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent backdrop-blur-sm border-transparent"
        }`}
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          className="relative z-50 select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            VN
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1 text-sm font-medium">
            {NAV_SECTIONS.map((section) => (
              <li key={section}>
                <ScrollLink
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  className={`relative cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === section.toLowerCase()
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                    }`}
                >
                  {section}
                  {activeSection === section.toLowerCase() && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <motion.button
          className="md:hidden text-white text-2xl cursor-pointer z-[60] p-2 rounded-lg bg-white/5 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-gray-950/98 backdrop-blur-2xl z-[55] flex flex-col items-center justify-center md:hidden"
            >
              {NAV_SECTIONS.map((section, i) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <ScrollLink
                    to={section.toLowerCase()}
                    smooth={true}
                    duration={600}
                    offset={-70}
                    onClick={closeMobileMenu}
                    className={`text-3xl font-bold transition-colors duration-300 cursor-pointer block py-3 ${activeSection === section.toLowerCase()
                        ? "text-blue-400"
                        : "text-white/70 hover:text-white"
                      }`}
                  >
                    {section}
                  </ScrollLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
