"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

const GROUPS = [
  {
    number: "01",
    title: "Languages & interfaces",
    lines: [
      "TypeScript · JavaScript · Python",
      "React · Next.js · Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Behind the interface",
    lines: ["Node.js · Express · FastAPI", "Fastify · Flask · REST APIs"],
  },
  {
    number: "03",
    title: "Data & persistence",
    lines: ["PostgreSQL · Redis", "Prisma ORM · Drizzle ORM"],
  },
  {
    number: "04",
    title: "Build & ship",
    lines: ["Git · GitHub Actions", "Docker Compose"],
  },
];

export default function ReferenceSkillInterlude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.current
        ?.querySelectorAll(".toolkit-row, .toolkit-title")
        .forEach((row) => {
          gsap.from(row, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          });
        });
    }, root);
    return () => context.revert();
  }, [reduced]);
  return (
    <section
      id="toolkit"
      ref={root}
      aria-labelledby="toolkit-heading"
      className="editorial-toolkit paper-section"
    >
      <div className="section-rule micro-label">
        <span>03 / The toolkit</span>
        <span>A means to make things happen</span>
      </div>
      <div className="toolkit-layout">
        <div className="toolkit-title">
          <span className="micro-label">Always learning. Always building.</span>
          <h2 id="toolkit-heading">
            THE RIGHT
            <br />
            <span className="yellow-underline">TOOLS.</span>
            <em>A considered approach.</em>
          </h2>
          <p>
            From what you see to what makes it work. A practical toolkit for
            building across the stack.
          </p>
          <span className="toolkit-asterisk" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="toolkit-rows">
          {GROUPS.map((group) => (
            <div className="toolkit-row" key={group.number}>
              <div className="toolkit-category micro-label">
                <span>{group.number}</span>
                <span>{group.title}</span>
              </div>
              <p>
                {group.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
          ))}
          <p className="toolkit-footnote micro-label">
            Tools from my resume and project work.
            <br />
            No proficiency bars. The work tells the story.
          </p>
        </div>
      </div>
    </section>
  );
}
