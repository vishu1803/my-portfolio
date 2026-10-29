"use client";
import useReducedMotion from "../../hooks/useChapterMotion";
import { useRef } from "react";

import gsap from "gsap";
import { EDITORIAL_MOTION as M } from "../../config/editorialMotion";
import useScrollScene from "../../hooks/useScrollScene";
export default function ContactPrelude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useScrollScene(root, !reduced, (ScrollTrigger) => {
    const ctx=gsap.context(()=>{
      const entrance=gsap.timeline({scrollTrigger:{trigger:root.current,start:'top 78%',once:true}});
      entrance.fromTo('.prelude-front',{yPercent:105},{yPercent:0,duration:.95,ease:'power4.out'},0)
        .fromTo('.prelude-line > span',{yPercent:110},{yPercent:0,duration:M.entrance.duration,stagger:.11,ease:M.entrance.ease},.18)
        .fromTo('.prelude-name',{y:16},{y:0,duration:.65},.4)
        .fromTo('.prelude-rule',{scaleX:0},{scaleX:1,duration:.9,transformOrigin:'left'},0);
      const media=gsap.matchMedia();
      media.add(M.rail.media,()=>{
        gsap.to('.prelude-title-clip',{y:-M.prelude.travel,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom top',scrub:.6}});
        gsap.to('.prelude-extrusion > span',{x:i=>i+1,y:i=>i+1,opacity:.65,stagger:.02,duration:.6,
          scrollTrigger:{trigger:root.current,start:'top 35%',once:true}});
      });
      return ()=>media.revert();
    },root);
    return ()=>ctx.revert();
  });

  return (
    <section
      ref={root}
      className="contact-prelude"
      data-scene="#0b0b0c"
      data-ink="light"
      aria-labelledby="prelude-heading"
    >
      <div className="prelude-rule" aria-hidden="true" />
      <div className="prelude-title-clip">
        <h2 id="prelude-heading" className="prelude-title">
          <span className="prelude-extrusion" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <span key={i} aria-hidden="true">One last thing.</span>)}</span>
          <span className="prelude-front">One last thing<span>.</span></span>
        </h2>
      </div>
      <div className="prelude-lines">
        <p className="prelude-line"><span>The next chapter starts</span></p>
        <p className="prelude-line"><span>with a conversation.</span></p>
      </div>
      <p className="prelude-name micro-label">Vishwanath Nishad</p>
    </section>
  );
}
