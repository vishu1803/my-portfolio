"use client";
import useReducedMotion from "../../hooks/useChapterMotion";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./SubjectFlow.css";
import useScrollScene from "../../hooks/useScrollScene";
import GhostResolve from "../motion/GhostResolve";
import ClipReveal from "../motion/ClipReveal";
import { LineReveal, MarkerSweep } from "../motion/TextReveals";
import DrawOn from "../motion/DrawOn";

export default function EditorialSubject() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, ScrollTrigger => {
    const node=root.current!;
    const rows=node.querySelectorAll('.subject-spec-row');
    const context=gsap.context(()=>{},node);
    ScrollTrigger.create({trigger:'.subject-specs',start:'top 90%',once:true,onEnter:()=>context.add(()=>{
      gsap.fromTo(rows,{y:16,opacity:0},{y:0,opacity:1,duration:.6,stagger:.08,ease:'power3.out'});
    })});
    const media=gsap.matchMedia();
    media.add('(min-width: 900px) and (pointer: fine)',()=>{
      gsap.fromTo('.subject-portrait-drift',{y:0},{y:-60,ease:'none',scrollTrigger:{trigger:'.subject-portrait-mask',start:'top bottom',end:'bottom top',scrub:.6}});
    });
    return ()=>{media.revert();context.revert();};
  });
  return (
    <section
      id="subject"
      ref={root}
      className="subject-scene paper-section"
      data-scene="#e9e2d0"
      data-ink="dark"
      aria-labelledby="subject-heading"
    >
      <div className="section-rule micro-label">
        <span>01 / The subject</span>
        <span>Vishwanath Nishad · Gorakhpur</span>
      </div>
      <p className="subject-title"><GhostResolve text="The subject." /></p>
      <h2 id="subject-heading" className="subject-heading" data-subject-reveal>
        <LineReveal>Connecting interfaces to the systems behind them.</LineReveal>
        <em><LineReveal>Authenticated APIs, relational data, interactive apps.</LineReveal></em>
      </h2>
      <div className="subject-columns">
        <ClipReveal className="subject-portrait-mask"><figure className="subject-portrait">
          <div className="subject-portrait-drift">
          <Image
            src="/vishwanath-portrait.jpg"
            alt="Portrait of Vishwanath Nishad"
            fill
            sizes="(max-width: 767px) 90vw, 40vw"
          />
          </div>
          <figcaption className="micro-label">
            The person behind the work / 01
          </figcaption>
        </figure></ClipReveal>
        <div>
          <div className="subject-bio" data-subject-reveal>
            <p>

                I’m Vishwanath, a{" "}
                <MarkerSweep>full-stack developer</MarkerSweep> connecting
                responsive interfaces with the systems behind them.

            </p>
            <p>

                My work spans <MarkerSweep delay={.12}>authenticated APIs</MarkerSweep>,{" "}
                <MarkerSweep delay={.24}>relational data</MarkerSweep>, and <MarkerSweep delay={.36}>interactive web applications</MarkerSweep>.

            </p>
            <p>

                I like understanding how the pieces fit together — then turning that
                understanding into something useful.

            </p>
          </div>
          <dl className="subject-specs">
            {[
              ["Degree", "B.Tech · Electronics Engineering"],
              ["College", "Rajkiya Engineering College"],
              ["Location", "Gorakhpur, India"],
              ["Focus", "Interfaces, backend APIs and full-stack applications"],
            ].map(([label, value]) => (
              <div className="subject-spec-row" data-subject-reveal key={label}>
                <DrawOn className="subject-spec-rule" />
                <dt className="micro-label">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
