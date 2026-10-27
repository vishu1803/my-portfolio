"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";
import ArchitectureCompendiumModal from "./ArchitectureCompendiumModal";
import { JOURNAL_DATA, type JournalArticle } from "./Journal";
import type { ProjectItem } from "./SelectedWorks";
import { CASE_STUDIES } from "../../data/caseStudies";
export { CASE_STUDIES } from "../../data/caseStudies";

interface Props {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectArticle?: (article: JournalArticle) => void;
}

export default function ProjectCaseStudies({ onSelectArticle }: Props) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [indexOpen, setIndexOpen] = useState(false);
  useEffect(() => {
    if (reduced || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.current?.querySelectorAll(".case-study-item").forEach((item) => {
        const image = item.querySelector(".case-image");
        const copy = item.querySelector(".case-copy");
        if (image)
          gsap.from(image, {
            clipPath: "inset(0 0 14% 0)",
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: image, start: "top 92%", once: true },
          });
        if (copy)
          gsap.from(copy, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: { trigger: copy, start: "top 92%", once: true },
          });
      });
    }, root);
    return () => context.revert();
  }, [reduced]);
  return (
    <section
      id="case-studies"
      ref={root}
      className="editorial-work"
      aria-labelledby="work-heading"
    >
      <div className="section-rule micro-label">
        <span>01 / Selected work</span>
        <span>Ideas → Interfaces → Systems</span>
      </div>
      <div className="work-heading">
        <h2 id="work-heading">
          BUILT TO
          <br />
          <em>do something.</em>
        </h2>
        <div>
          <p>
            A selection of projects, from collaborative tools to experiments in
            how we interact with software.
          </p>
          <motion.button
            type="button"
            onClick={() => setIndexOpen(true)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="editorial-link"
          >
            Project index{" "}
            <span className="micro-label">
              / {String(CASE_STUDIES.length).padStart(2, "0")}
            </span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
      <div className="case-sequence">
        {CASE_STUDIES.map((study, index) => {
          const article = JOURNAL_DATA.find((a) => a.id === study.id);
          return (
            <article
              key={study.id}
              className={`case-study-item case-layout-${index % 3}`}
              data-case-id={study.id}
            >
              <div className="case-meta micro-label">
                <span>
                  <b>{String(index + 1).padStart(2, "0")}</b> / {study.category}
                </span>
                <span>{study.tech.slice(0, 2).join(" + ")}</span>
              </div>
              <div className="case-body">
                <div className="case-image">
                  <FlashlightReveal
                    radius={210}
                    label="Illuminate the idea"
                    revealedContent={
                      <div className="project-inspection">
                        <span className="micro-label">
                          Under the surface /{" "}
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p>{study.focus}</p>
                        <span>{study.note}</span>
                        <span className="micro-label">
                          {study.tech.join(" / ")}
                        </span>
                      </div>
                    }
                  >
                    <div className="project-visual">
                      <Image
                        src={study.image}
                        alt={`${study.title} — project interface`}
                        fill
                        sizes={
                          index % 3 === 0
                            ? "(max-width: 1400px) 92vw, 1280px"
                            : "(max-width: 800px) 92vw, 60vw"
                        }
                        className="object-contain"
                      />
                      <span className="project-visual-caption micro-label">
                        Interface study / {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </FlashlightReveal>
                </div>
                <div className="case-copy">
                  <div className="case-title-block">
                    <span className="micro-label case-eyebrow">
                      {study.focus}
                    </span>
                    <h3>{study.title}</h3>
                  </div>
                  <div className="case-details">
                    <p>{study.problem}</p>
                    <p className="case-contribution">
                      <span className="micro-label">My contribution</span>
                      {study.highlights[0]}
                    </p>
                    <p className="case-tech micro-label">
                      {study.tech.join(" / ")}
                    </p>
                    <div className="case-links">
                      {article && (
                        <button
                          type="button"
                          onClick={() => onSelectArticle?.(article)}
                          className="editorial-link"
                        >
                          Read the story{" "}
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </button>
                      )}
                      <a
                        href={study.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link subtle-link"
                      >
                        Repository ↗
                      </a>
                      {study.liveDemo && (
                        <a
                          href={study.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="editorial-link subtle-link"
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <ArchitectureCompendiumModal
        isOpen={indexOpen}
        onClose={() => setIndexOpen(false)}
      />
    </section>
  );
}
