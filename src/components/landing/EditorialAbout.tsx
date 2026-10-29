"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";

import { LineReveal } from "../motion/TextReveals";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import { EDITORIAL_MOTION as M } from "../../config/editorialMotion";
import CountUp from "../motion/CountUp";
import Certifications from "./Certifications";
import { LEETCODE_SOLVED } from "../../data/profile";
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
        const timeline=gsap.timeline({scrollTrigger:{trigger:row,start:'top 88%',once:true}});
        timeline.fromTo(row.querySelector('.evidence-rule'),{scaleX:0},{scaleX:1,duration:.9,ease:'power2.inOut'},0)
          .fromTo(row.querySelector(':scope > .micro-label'),{y:16},{y:0,duration:.65,ease:M.entrance.ease},.1)
          .fromTo(row.querySelector('.evidence-copy'),{y:28},{y:0,duration:M.entrance.duration,ease:M.entrance.ease},.16)
          .fromTo(row.querySelector('.evidence-value'),{x:24,clipPath:'inset(0% 100% 0% 0%)'},
            {x:0,clipPath:'inset(0% 0% 0% 0%)',duration:.9,ease:M.entrance.ease},.24);
      });
    }, root);
    return () => ctx.revert();
  });
  return (
    <section
      id="about"
      ref={root}
      className="evidence-scene"
      data-scene="#e9e2d0"
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
              {LEETCODE_SOLVED}+ LeetCode problems across dynamic programming,
              graphs, trees, arrays, and binary search.
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
              value={LEETCODE_SOLVED}
              suffix="+"
              label="LeetCode problems solved"
            />
            <span className="micro-label">Problems · continuing practice</span>
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
