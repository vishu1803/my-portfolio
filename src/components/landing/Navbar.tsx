"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "case-studies", label: "Work", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "toolkit", label: "Toolkit", number: "03" },
];

export default function Navbar({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > 30);
      const ids = ["home", ...SECTIONS.map((s) => s.id), "contact"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return (
    <header
      ref={header}
      className={`editorial-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <nav aria-label="Primary navigation" className="editorial-nav">
        <motion.a
          href="#home"
          aria-label="Home — Vishwanath Nishad"
          whileTap={{ scale: 0.96 }}
          className="wordmark"
        >
          v
          <span className="wordmark-star" aria-hidden="true">
            *
          </span>
          n
          <span className="wordmark-caption">
            Vishwanath
            <br />
            Nishad
          </span>
        </motion.a>
        <div className="nav-chapters">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "location" : undefined}
            >
              <sup>{s.number}</sup>
              {s.label}
            </a>
          ))}
          <button type="button" onClick={onOpenResume} className="nav-resume">
            Résumé ↗
          </button>
        </div>
        <motion.a
          href="#contact"
          aria-current={active === "contact" ? "location" : undefined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="nav-contact"
        >
          Let’s talk <span aria-hidden="true">↗</span>
        </motion.a>
      </nav>
    </header>
  );
}
