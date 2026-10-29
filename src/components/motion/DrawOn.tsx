'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { isLowPowerDevice } from '../../lib/motionQuality';
import useChapterMotion from '../../hooks/useChapterMotion';

export default function DrawOn({className = ''}: {className?: string}) {
  const root = useRef<HTMLSpanElement>(null);
  const reduced = useChapterMotion();
  useEffect(() => {
    const node = root.current;
    if (!node || reduced || isLowPowerDevice()) return;
    const context = gsap.context(() => {}, node);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      context.add(() => gsap.fromTo(node, {scaleX:0}, {scaleX:1, duration:.8, ease:'power2.out'}));
    }, {threshold:.1});
    observer.observe(node);
    return () => {observer.disconnect(); context.revert();};
  }, [reduced]);
  return <span ref={root} className={`draw-on ${className}`} aria-hidden="true" />;
}
