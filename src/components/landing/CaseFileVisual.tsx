"use client";
import useReducedMotion from "../../hooks/useMotionPreference";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { isLowPowerDevice } from "../../lib/motionQuality";
import { motion, useMotionValue, useSpring } from "framer-motion";
function TiltFrame({ children, surface, enabled }: { children: React.ReactNode; surface: React.RefObject<HTMLDivElement>; enabled:boolean }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 120, damping: 14 }), ry = useSpring(y, { stiffness: 120, damping: 14 });
  useEffect(()=>{if(!enabled){x.jump(0);y.jump(0);rx.jump(0);ry.jump(0);}},[enabled,x,y,rx,ry]);
  return <motion.div className="case-tilt-frame" style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
    onPointerMove={event => {
      if (!enabled || event.pointerType !== "mouse" || !surface.current) return;
      const rect = surface.current.getBoundingClientRect();
      surface.current.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      surface.current.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
      x.set((.5 - (event.clientY - rect.top) / rect.height) * 10);
      y.set(((event.clientX - rect.left) / rect.width - .5) * 10);
    }} onPointerLeave={() => { x.set(0); y.set(0); surface.current?.style.setProperty("--glow-x", "50%"); surface.current?.style.setProperty("--glow-y", "50%"); }}>
    {children}
  </motion.div>;
}

export default function CaseFileVisual({
  image,
  title,
  alt,
  index,
}: {
  image: string;
  title: string;
  alt: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const fine=matchMedia('(pointer:fine)');
    const update=()=>setInteractive(!reduced&&!isLowPowerDevice()&&fine.matches);
    update();fine.addEventListener('change',update);
    return ()=>fine.removeEventListener('change',update);
  }, [reduced]);
  const content = <>
        <div className="case-window-bar micro-label">
          <span />
          <span />
          <span />
          <p>FIELD NOTE / {String(index + 1).padStart(2, "0")}</p>
        </div>
        <div className="case-file-image"><div className="clip-reveal-inner">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 767px) 90vw, 65vw"
          />
        </div></div>
        <span className="case-depth-tag micro-label">
          REPOSITORY / INTERFACE
        </span>
        <span className="case-depth-rule" aria-hidden="true" />
  </>;
  return <div ref={ref} className="case-file-visual">
    <div className="case-radial-glow" aria-hidden="true" />
    <TiltFrame surface={ref} enabled={interactive}>{content}</TiltFrame>
  </div>;
}
