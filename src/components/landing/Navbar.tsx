"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const SECTIONS = [
  { id: "subject", label: "Subject" },
  { id: "case-studies", label: "Cases" },
  { id: "toolkit", label: "Toolkit" },
  { id: "about", label: "Record" },
];
export default function Navbar({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setScrolled(scrollY > 30);
      let current = "home";
      for (const id of [...SECTIONS.map((item) => item.id), "contact"]) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 190) current = id;
      }
      setActive(current);
      if (progress.current)
        progress.current.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const size = new ResizeObserver(() => {
      if(header.current) document.documentElement.style.setProperty('--header-offset', `${header.current.getBoundingClientRect().height + 8}px`);
      queue();
    });
    if(header.current) size.observe(header.current);
    const observer = new IntersectionObserver(queue, {
      rootMargin: "-85px 0px -65% 0px",
      threshold: 0,
    });
    [...SECTIONS.map((item) => item.id), "home", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    read();
    return () => {
      observer.disconnect(); size.disconnect();
      document.documentElement.style.removeProperty('--header-offset');
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header ref={header} className={`editorial-header ${scrolled ? "is-scrolled" : ""}`}>
      <motion.nav
        aria-label="Primary navigation"
        className="editorial-nav"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <a
          href="#home"
          aria-label="v n Vishwanath Nishad — Home"
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
        </a>
        <div className="nav-chapters">
          {SECTIONS.map((section, index) => (
            <motion.a
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0 },
              }}
              key={section.id}
              href={`#${section.id}`}
              aria-current={
                active === section.id
                  ? "location"
                  : undefined
              }
            >
              <sup>0{index + 1}</sup>
              {section.label}
              {active === section.id && (
                <motion.span
                  layoutId="chapter-nav-underline"
                  className="nav-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <button type="button" onClick={onOpenResume} className="nav-resume">
            Résumé <span aria-hidden="true">↗</span>
          </button>
        </div>
        <a
          href="#contact"
          className="nav-contact"
          aria-current={active === "contact" ? "location" : undefined}
        >
          Hire me <span aria-hidden="true">↗</span>
          {active === "contact" && (
            <motion.span
              layoutId="chapter-nav-underline"
              className="nav-underline"
            />
          )}
        </a>
      </motion.nav>
      <span className="nav-reading-progress" aria-hidden="true">
        <span ref={progress} />
      </span>
    </header>
  );
}
