"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";

import { LineReveal } from "../motion/TextReveals";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import CountUp from "../motion/CountUp";
import Certifications from "./Certifications";
export default function EditorialAbout({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const ctx = gsap.context(() => {
      root.current?.querySelectorAll(".evidence-row").forEach((row) => {
        gsap.from(row.querySelector(".evidence-rule"), {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.9,
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
        gsap.from(row.querySelectorAll(".evidence-copy,.evidence-value"), {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: { trigger: row, start: "top 84%", once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  });
  return (
    <section
      id="about"
      ref={root}
      className="evidence-scene"
      data-scene="#eae8e2"
      data-ink="dark"
      aria-labelledby="about-heading"
    >
      <div className="section-rule micro-label">
        <span>04 / The record</span>
        <span>Experience · education · practice</span>
      </div>
      <h2 id="about-heading">
        <LineReveal>
          The record,<em>so far.</em>
        </LineReveal>
      </h2>
      <div className="evidence-ledger">
        <article className="evidence-row">
          <span className="evidence-rule" aria-hidden="true" />
          <div className="micro-label">01 / Experience</div>
          <div className="evidence-copy">
            <h3>Experience <span className="sr-only">at </span><span className="evidence-entity">FTV Saloon</span></h3>
            <em>Full Stack Developer Intern · Remote</em>
            <p>
              Built REST APIs for salon operations, role-based authentication,
              and admin dashboards. Worked on database queries and frontend
              asset loading within a remote Agile team.
            </p>
          </div>
          <div className="evidence-value">
            <strong>2024</strong>
            <span className="micro-label">June — September</span>
          </div>
        </article>
        <article className="evidence-row">
          <span className="evidence-rule" aria-hidden="true" />
          <div className="micro-label">02 / Education</div>
          <div className="evidence-copy">
            <h3>Education <span className="sr-only">at </span><span className="evidence-entity">Rajkiya Engineering College</span></h3>
            <em>B.Tech · Electronics Engineering</em>
            <p>
              A foundation in systems, digital logic, and computer science: data
              structures, operating systems, databases, and computer networks.
            </p>
          </div>
          <div className="evidence-value">
            <strong>2021–25</strong>
            <span className="micro-label">Education record · July 2025</span>
          </div>
        </article>
        <article className="evidence-row">
          <span className="evidence-rule" aria-hidden="true" />
          <div className="micro-label">03 / Practice</div>
          <div className="evidence-copy">
            <h3>Practice <span className="evidence-entity">Thinking through the problem.</span></h3>
            <em>Data structures &amp; algorithms</em>
            <p>
              300+ LeetCode problems across dynamic programming, graphs, trees,
              arrays, and binary search, as recorded in my resume.
            </p>
            <a
              href="https://leetcode.com/u/vishwanatnishad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore my LeetCode ↗
            <span className="sr-only"> (opens in a new tab)</span></a>
          </div>
          <div className="evidence-value">
            <CountUp
              value={300}
              suffix="+"
              label="LeetCode problems recorded in my resume"
            />
            <span className="micro-label">Problems · résumé claim</span>
          </div>
        </article>
      </div>
      <Certifications />
      <button type="button" onClick={onOpenResume} className="evidence-resume">
        The full story, on one résumé ↗
      </button>
    </section>
  );
}
