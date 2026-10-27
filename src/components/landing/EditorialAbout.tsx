"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function EditorialAbout({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.current
        ?.querySelectorAll(".about-reveal")
        .forEach((el) =>
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        );
    }, root);
    return () => context.revert();
  }, [reduced]);
  return (
    <section
      id="about"
      ref={root}
      className="editorial-about"
      aria-labelledby="about-heading"
    >
      <div className="section-rule micro-label">
        <span>02 / Behind the work</span>
        <span>Gorakhpur, India</span>
      </div>
      <div className="about-introduction about-reveal">
        <p className="micro-label">
          <i className="status-dot" />A little context
        </p>
        <div>
          <h2 id="about-heading">
            MORE THAN
            <br />
            THE <em>interface.</em>
          </h2>
          <p>
            I’m Vishwanath, a full-stack developer connecting responsive
            interfaces with the systems behind them. My work spans authenticated
            APIs, relational data, and interactive web applications.
          </p>
          <p>
            I like understanding how the pieces fit together — then turning that
            understanding into something useful.
          </p>
        </div>
      </div>
      <div className="about-records">
        <article className="about-record about-reveal">
          <span className="micro-label record-kind">01 / Experience</span>
          <div>
            <span className="micro-label record-date">
              June — September 2024 · Remote
            </span>
            <h3>Full Stack Developer Intern</h3>
            <p className="record-organisation">FTV Saloon</p>
            <p>
              Built REST APIs for salon operations, role-based authentication,
              and admin dashboards. Worked on database queries and frontend
              asset loading within a remote Agile team.
            </p>
          </div>
          <span className="record-symbol" aria-hidden="true">
            ↗
          </span>
        </article>
        <article className="about-record about-reveal">
          <span className="micro-label record-kind">02 / Education</span>
          <div>
            <span className="micro-label record-date">2021 — July 2025</span>
            <h3>Electronics Engineering</h3>
            <p className="record-organisation">
              B.Tech · Rajkiya Engineering College
            </p>
            <p>
              A foundation in systems, digital logic, and computer science: data
              structures, operating systems, databases, and computer networks.
            </p>
          </div>
          <span className="record-symbol" aria-hidden="true">
            ↗
          </span>
        </article>
        <article className="about-record about-reveal">
          <span className="micro-label record-kind">03 / Practice</span>
          <div>
            <span className="micro-label record-date">
              Data structures &amp; algorithms
            </span>
            <h3>Thinking through the problem.</h3>
            <p>
              300+ LeetCode problems across dynamic programming, graphs, trees,
              arrays, and binary search, as recorded in my resume.
            </p>
            <a
              href="https://leetcode.com/u/vishwanatnishad"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              Explore my LeetCode <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <span className="practice-number" aria-hidden="true">
            300<span>+</span>
          </span>
        </article>
      </div>
      <motion.button
        type="button"
        onClick={onOpenResume}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="about-resume editorial-link"
      >
        The full story, on one résumé{" "}
        <ArrowUpRight size={18} aria-hidden="true" />
      </motion.button>
    </section>
  );
}
