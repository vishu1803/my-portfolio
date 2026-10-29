"use client";
import useMagnetic from "../../hooks/useMagnetic";
import useChapterMotion from "../../hooks/useChapterMotion";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useMotionValueEvent } from "framer-motion";

/** Mounting a controller never replaces the link/button or either of its wrappers. */
function MagnetController({surface}: {surface: RefObject<HTMLSpanElement>}) {
  const style = useMagnetic(surface);
  const paint = () => {
    if (surface.current) surface.current.style.transform = `translate3d(${style.x.get()}px,${style.y.get()}px,0)`;
  };
  useMotionValueEvent(style.x,'change',paint);
  useMotionValueEvent(style.y,'change',paint);
  useEffect(() => {
    const node=surface.current;
    return () => {node?.style.removeProperty('transform');};
  }, [surface]);
  return null;
}

/** Springs and pointer subscriptions are allocated only near fine-pointer controls. */
export default function Magnetic({children, className = ""}: {children: ReactNode; className?: string}) {
  const root = useRef<HTMLSpanElement>(null);
  const surface = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);
  const reduced = useChapterMotion();
  useEffect(() => {
    if (reduced || !root.current || !matchMedia('(pointer:fine)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {setNear(true); observer.disconnect();}
    }, {rootMargin:'150px 0px'});
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [reduced]);
  return <span ref={root} className={`magnetic ${className}`}>
    <span ref={surface} className="magnetic-content">{children}</span>
    {near&&!reduced&&<MagnetController surface={surface} />}
  </span>;
}
