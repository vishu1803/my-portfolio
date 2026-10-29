'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { isLowPowerDevice } from '../../lib/motionQuality';
import useChapterMotion from '../../hooks/useChapterMotion';

/** Stable SSR markup: readiness never replaces the text tree or restarts a reveal. */
export default function GhostResolve({text}: {text: string}) {
  const root = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const reduced = useChapterMotion();
  useEffect(() => {
    const node = root.current;
    if (!node || reduced || isLowPowerDevice() || played.current) return;
    const context = gsap.context(() => {}, node);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      played.current = true;
      node.dataset.ghostState = 'running';
      context.add(() => {
        gsap.timeline({onComplete: () => {node.dataset.ghostState = 'complete';}})
          .fromTo('.ghost-letter', {filter:'blur(14px)', opacity:0, y:8},
            {filter:'blur(0px)', opacity:1, y:0, duration:1.1, stagger:.03, ease:'power3.out'}, 0)
          .fromTo('.ghost-double', {x:6, y:2, opacity:.6},
            {x:0, y:0, opacity:0, duration:1.1, stagger:.03, ease:'power3.out'}, 0);
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.05});
    observer.observe(node);
    return () => {observer.disconnect(); context.revert(); delete node.dataset.ghostState;};
  }, [reduced, text]);
  return <span ref={root} className="ghost-resolve" data-ghost-resolve>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(' ').map((word,index) => <span key={index}>
      {index > 0 && ' '}<span className="ghost-word">{[...word].map((letter,i) =>
        <span className="ghost-letter" key={i}>{letter}<span className="ghost-double" aria-hidden="true">{letter}</span></span>)}</span>
    </span>)}</span>
  </span>;
}
