"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef, useState } from "react";

import { LineReveal } from "../motion/TextReveals";
import gsap from "gsap";
import useScrollScene from "../../hooks/useScrollScene";
import { CASE_STUDIES } from "../../data/caseStudies";
import { JOURNAL_DATA, type JournalArticle } from "./Journal";
import type { ProjectItem } from "./SelectedWorks";
import dynamic from "next/dynamic";
const ArchitectureCompendiumModal = dynamic(
  () => import("./ArchitectureCompendiumModal"),
  { ssr: false },
);
import CaseFileVisual from "./CaseFileVisual";
import Magnetic from "../motion/Magnetic";
export { CASE_STUDIES } from "../../data/caseStudies";
type Props = {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectArticle?: (article: JournalArticle) => void;
};
export default function ProjectCaseStudies({ onSelectArticle }: Props) {
  const root = useRef<HTMLElement>(null),
    track = useRef<HTMLDivElement>(null),
    viewport = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollPlugin =
    useRef<typeof import("gsap/ScrollTrigger").ScrollTrigger>();
  const [indexOpen, setIndexOpen] = useState(false);
  const [indexLoaded, setIndexLoaded] = useState(false);
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    scrollPlugin.current = ScrollTrigger;
    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      const el = root.current!,
        rail = track.current!,
        frame = viewport.current!;
      let settle: gsap.core.Tween | undefined;
      const distance = () => Math.max(0, rail.scrollWidth - frame.clientWidth);
      const ctx = gsap.context(() => {
        const cards = [...el.querySelectorAll<HTMLElement>(".case-study-item")];
        const progress = el.querySelector(".case-track-progress span");
        const title = el.querySelector(".work-heading h2");
        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            id: "case-files-track",
            trigger: el,
            start: "top 84px",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              el.dataset.pinStart = String(self.start);
              el.dataset.pinEnd = String(self.end);
            },
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleX: self.progress });
              const active = Math.round(self.progress * (cards.length - 1));
              cards.forEach(
                (card, i) => (card.dataset.active = String(i === active)),
              );
              const velocity = Math.max(
                -4,
                Math.min(4, self.getVelocity() / 650),
              );
              if (title) {
                gsap.set(title, {
                  skewX: velocity,
                  filter: `blur(${Math.min(1.2, Math.abs(velocity) * 0.2)}px)`,
                });
                settle?.kill();
                settle = gsap.to(title, {
                  skewX: 0,
                  filter: "blur(0px)",
                  duration: 0.25,
                  overwrite: true,
                });
              }
            },
          },
        });
      }, el);
      return () => {
        settle?.kill();
        ctx.revert();
        delete el.dataset.pinStart;
        delete el.dataset.pinEnd;
      };
    });
    return () => {
      media.revert();
      scrollPlugin.current = undefined;
    };
  });

  return (
    <>
      <section
        id="case-studies"
        ref={root}
        className="editorial-work case-files-scene"
        data-scene="#101014"
        data-ink="light"
        aria-labelledby="work-heading"
      >
        <div className="section-rule micro-label">
          <span>02 / Case files</span>
          <span>Six projects · one continuing practice</span>
        </div>
        <div className="work-heading">
          <h2 id="work-heading">
            <LineReveal>
              Six systems.<em>Ideas, made tangible.</em>
            </LineReveal>
          </h2>
          <button
            type="button"
            className="editorial-link"
            onClick={() => {
              setIndexLoaded(true);
              setIndexOpen(true);
            }}
          >
            Project index / 06 <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div ref={viewport} className="case-track-viewport">
          <div ref={track} className="case-sequence case-files-track">
            {CASE_STUDIES.map((study, index) => {
              const article = JOURNAL_DATA.find((item) => item.id === study.id);
              return (
                <article
                  key={study.id}
                  className="case-study-item case-file"
                  data-case-id={study.id}
                  data-active={index === 0}
                  onFocusCapture={() => {
                    const trigger =
                      scrollPlugin.current?.getById("case-files-track");
                    if (trigger) {
                      const top =
                        trigger.start +
                        (index / (CASE_STUDIES.length - 1)) *
                          (trigger.end - trigger.start);
                      const event = new CustomEvent("portfolio:scroll", {
                        detail: { top },
                        cancelable: true,
                      });
                      if (window.dispatchEvent(event))
                        window.scrollTo({ top, behavior: "instant" });
                    }
                  }}
                >
                  <div className="case-file-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="case-meta micro-label">
                    <span>{study.category}</span>
                    <span>{study.tech.slice(0, 2).join(" + ")}</span>
                  </div>
                  <div className="case-file-layout">
                    <CaseFileVisual
                      image={study.image}
                      title={study.title}
                      alt={study.imageAlt}
                      index={index}
                    />
                    <div className="case-copy">
                      <p className="case-summary">{study.summary}</p>
                      <h3>{study.title}</h3>
                      <p className="case-tech micro-label">{study.tech.join(" / ")}</p>
                      <p className="case-poetic">{study.focus}</p>
                      <p className="case-contribution">
                        <span className="micro-label">My contribution</span>
                        {study.highlights[0]}
                      </p>

                      <div className="case-links">
                        <Magnetic>
                          <button
                            type="button"
                            className="case-file-cta"
                            aria-label={`View case file: ${study.title}`}
                            onClick={() =>
                              article && onSelectArticle?.(article)
                            }
                          >
                            View case file <span aria-hidden="true">→</span>
                          </button>
                        </Magnetic>
                        <a
                          href={study.github}
                          aria-label={`Repository: ${study.title}, source code on GitHub (opens in a new tab)`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="editorial-link subtle-link"
                        >
                          Repository <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span></a>
                        {study.liveDemo && (
                          <a
                            href={study.liveDemo}
                            aria-label={`${study.title}, live application (opens in a new tab)`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link subtle-link"
                          >
                            Live <span aria-hidden="true">↗</span>
                          <span className="sr-only"> (opens in a new tab)</span></a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="case-track-progress" aria-hidden="true">
          <span />
        </div>
        <p className="case-track-hint micro-label">
          Scroll to turn the case files <span aria-hidden="true">→</span>
        </p>
      </section>
      {indexLoaded && (
        <ArchitectureCompendiumModal
          isOpen={indexOpen}
          onClose={() => setIndexOpen(false)}
        />
      )}
    </>
  );
}
