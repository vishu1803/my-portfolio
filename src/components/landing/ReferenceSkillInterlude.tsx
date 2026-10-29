"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef } from "react";
import { LineReveal, BlurIn } from "../motion/TextReveals";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import { EDITORIAL_MOTION as M } from "../../config/editorialMotion";

const GROUPS = [
  {
    title: "Languages & interfaces", description:"Languages and tools for browser interfaces.",
    lines: [
      "TypeScript · JavaScript · Python",
      "React · Next.js · Tailwind CSS",
    ],
  },
  {
    title: "Behind the interface", description:"Backend: servers and APIs.",
    lines: ["Node.js · Express · FastAPI", "Fastify · Flask · REST APIs"],
  },
  {
    title: "Data & persistence", description:"Databases and tools for storing and querying data.",
    lines: ["PostgreSQL · Redis", "Prisma ORM · Drizzle ORM"],
  },
  { title: "Build & ship", description:"Tools for version control, automation and containers.", lines: ["Git · GitHub Actions", "Docker Compose"] },
];
export default function ReferenceSkillInterlude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const ctx = gsap.context(() => {
      root.current?.querySelectorAll('.toolkit-row').forEach(row=>{
        const timeline=gsap.timeline({scrollTrigger:{trigger:row,start:'top 88%',once:true}});
        timeline.fromTo(row.querySelector('.toolkit-row-rule'),{scaleX:0},{scaleX:1,duration:.65,ease:'power2.out'},0)
          .fromTo(row.querySelectorAll('.toolkit-category,.toolkit-description'),{y:14},{y:0,duration:.65,stagger:.07,ease:M.entrance.ease},0)
          .fromTo(row.querySelectorAll('.toolkit-words'),{y:30,clipPath:'inset(0% 0% 100% 0%)'},
            {y:0,clipPath:'inset(0% 0% 0% 0%)',duration:M.entrance.duration,stagger:.12,ease:M.entrance.ease},.1);
      });
      gsap.from(".toolkit-yellow-rise", {
        scaleY: 0,
        transformOrigin: "bottom",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom 95%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });
    }, root);
    return () => ctx.revert();
  });
  return (
    <section
      id="toolkit"
      ref={root}
      className="editorial-toolkit paper-section"
      data-scene="#0b0b0c"
      data-ink="light"
      aria-labelledby="toolkit-heading"
    >
      <div className="section-rule micro-label">
        <span>03 / The toolkit</span>
        <span>A means to make things happen</span>
      </div>
      <div className="toolkit-layout">
        <div className="toolkit-title">
          <span className="micro-label">Always learning. Always building.</span>
          <h2 id="toolkit-heading">
            <LineReveal>
              The right
              <br />
              <span className="yellow-underline">Tools.</span>
              <em>A considered approach.</em>
            </LineReveal>
          </h2>
          <p>
            <BlurIn>
              From what you see to what makes it work. A practical toolkit for
              building across the stack.
            </BlurIn>
          </p>
        </div>
        <div className="toolkit-rows">
          {GROUPS.map((group, index) => (
            <div
              className="toolkit-row"
              key={group.title}
              style={{ "--skill-depth": index } as React.CSSProperties}
            >
              <span className="toolkit-row-rule" aria-hidden="true" />
              <div className="toolkit-category micro-label">
                <span>0{index + 1}</span>
                <span>{group.title}</span>
              </div>
              <p className="toolkit-description">{group.description}</p>
              {group.lines.map((line, lineIndex) => (
                <ul key={line} className="toolkit-words">
                  {line.split(" · ").map((word, wordIndex) => (
                    <li
                      className={`skill-word ${index === 0 && lineIndex === 0 && wordIndex === 0 ? "lead-skill" : ""}`}
                      key={word}
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
          <p className="toolkit-footnote micro-label">
            Tools from my resume and project work.
            <br />
            No proficiency bars. The work tells the story.
          </p>
        </div>
      </div>
      <div className="toolkit-yellow-rise" aria-hidden="true" />
    </section>
  );
}
