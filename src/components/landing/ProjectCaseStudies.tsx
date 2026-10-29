"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef, useState } from "react";

import { LineReveal } from "../motion/TextReveals";
import gsap from "gsap";
import { motion } from "framer-motion";
import { EDITORIAL_MOTION as M } from "../../config/editorialMotion";
import { activeCase, caseRailStops } from "../../lib/caseRail";
import "./EditorialMotion.css";
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
import { isLowPowerDevice } from "../../lib/motionQuality";
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
    const el = root.current!, rail = track.current!, frame = viewport.current!;
    const cards = [...el.querySelectorAll<HTMLElement>('.case-study-item')];
    const controls = [...el.querySelectorAll<HTMLButtonElement>('[data-case-step]')];
    const progress = el.querySelector('.case-track-progress span');
    const media = gsap.matchMedia();
    const setActive = (index: number) => {
      cards.forEach((card, i) => { card.dataset.active = String(i === index); });
      controls.forEach((button, i) => {
        if (i === index) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
      });
    };
    const updateStops = () => caseRailStops(cards.map(card => card.offsetLeft - cards[0].offsetLeft), Math.max(0, rail.scrollWidth - frame.clientWidth));
    media.add({ rail: M.rail.media, fallback: 'all' }, context => {
      if (!context.conditions?.rail || isLowPowerDevice()) {
        cards.forEach(card => {
          const entrance = gsap.timeline({scrollTrigger:{trigger:card,start:'top 88%',once:true}});
          entrance.fromTo(card.querySelector('.case-file-visual'), {clipPath:M.image.inset,y:22}, {clipPath:'inset(0% 0% 0% 0%)',y:0,duration:M.image.duration,ease:M.entrance.ease},0)
            .fromTo(card.querySelector('.case-copy'),{y:22},{y:0,duration:M.entrance.duration,ease:M.entrance.ease},.12);
        });
        return;
      }
      el.dataset.caseLayout = 'rail';
      const distance = () => Math.max(0, rail.scrollWidth - frame.clientWidth);
      let stops = updateStops();
      const sequence = gsap.to(rail, {
        x: () => -distance(), ease:'none',
        scrollTrigger: {
          id:'case-files-track',trigger:el,start:'top 88px',end:()=>`+=${distance()}`,
          pin:true,pinSpacing:true,scrub:M.rail.scrub,anticipatePin:1,invalidateOnRefresh:true,
          onRefresh:self=>{stops=updateStops();el.dataset.pinStart=String(self.start);el.dataset.pinEnd=String(self.end);},
          onUpdate:self=>{
            if(progress) gsap.set(progress,{scaleX:self.progress});
            setActive(activeCase(stops,self.progress*distance()));
          },
        },
      });
      cards.forEach((card,index)=>{
        const visual=card.querySelector('.case-file-visual');
        const copy=card.querySelector('.case-copy');
        const trigger=index===0
          ? {trigger:el,start:'top 88%',once:true}
          : {trigger:card,containerAnimation:sequence,start:'left 96%',end:'left 22%',scrub:.4};
        gsap.fromTo(visual,{clipPath:index===0?M.image.inset:'inset(0% 0% 0% 18%)',x:index===0?0:36},
          {clipPath:'inset(0% 0% 0% 0%)',x:0,duration:M.image.duration,ease:index===0?M.entrance.ease:'none',scrollTrigger:trigger});
        gsap.fromTo(copy,{y:index===0?20:36},{y:0,duration:M.entrance.duration,ease:index===0?M.entrance.ease:'none',scrollTrigger:trigger});
      });
      return ()=>{delete el.dataset.caseLayout;delete el.dataset.pinStart;delete el.dataset.pinEnd;};
    });
    return ()=>{
      media.revert();
      scrollPlugin.current=undefined;
      setActive(0);
    };
  }, true);

  const goToCase = (index: number) => {
    const trigger=scrollPlugin.current?.getById('case-files-track');
    const rail=track.current, frame=viewport.current;
    if(!trigger||!rail||!frame)return;
    const cards=[...rail.querySelectorAll<HTMLElement>('.case-study-item')];
    const distance=Math.max(0,rail.scrollWidth-frame.clientWidth);
    const offset=caseRailStops(cards.map(card=>card.offsetLeft-cards[0].offsetLeft),distance)[index]??0;
    const top=trigger.start+(distance?offset/distance:0)*(trigger.end-trigger.start);
    if(Math.abs(scrollY-top)<2)return;
    const event=new CustomEvent('portfolio:scroll',{detail:{top},cancelable:true});
    if(window.dispatchEvent(event))window.scrollTo({top,behavior:'instant'});
    scrollPlugin.current?.update();
    trigger.getTween()?.progress(1);
  };

  return (
    <>
      <section
        id="case-studies"
        ref={root}
        className="editorial-work case-files-scene"
        data-scene="#0b0b0c"
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
                  onFocusCapture={event => {
                    if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) goToCase(index);
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
        <nav className="case-chapter-controls micro-label" aria-label="Case files">
          {CASE_STUDIES.map((study,index)=><motion.button
            key={study.id} type="button" data-case-step
            aria-label={`Go to case file: ${study.title}`}
            aria-current={index===0?'step':undefined}
            onClick={()=>goToCase(index)}
            whileHover={reduced?undefined:{y:-2}} whileTap={reduced?undefined:{scale:.96}}
          >{String(index+1).padStart(2,'0')}</motion.button>)}
        </nav>
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
