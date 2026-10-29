"use client";
import useChapterMotion from "../../hooks/useChapterMotion";
import { RefObject, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

function TiltController({frame,surface}: {frame:RefObject<HTMLDivElement>;surface:RefObject<HTMLDivElement>}) {
  const x=useMotionValue(0), y=useMotionValue(0);
  const rx=useSpring(x,{stiffness:120,damping:14}), ry=useSpring(y,{stiffness:120,damping:14});
  const paint=()=>{
    if(frame.current)frame.current.style.transform=`perspective(1000px) rotateX(${rx.get()}deg) rotateY(${ry.get()}deg)`;
  };
  useMotionValueEvent(rx,'change',paint);
  useMotionValueEvent(ry,'change',paint);
  useEffect(()=>{
    const node=frame.current, stage=surface.current;
    if(!node||!stage)return;
    const move=(event:PointerEvent)=>{
      if(event.pointerType!=='mouse')return;
      const rect=stage.getBoundingClientRect();
      stage.style.setProperty('--glow-x',`${event.clientX-rect.left}px`);
      stage.style.setProperty('--glow-y',`${event.clientY-rect.top}px`);
      x.set((.5-(event.clientY-rect.top)/rect.height)*10);
      y.set(((event.clientX-rect.left)/rect.width-.5)*10);
    };
    const leave=()=>{x.set(0);y.set(0);stage.style.setProperty('--glow-x','50%');stage.style.setProperty('--glow-y','50%');};
    node.addEventListener('pointermove',move,{passive:true});
    node.addEventListener('pointerleave',leave);
    return ()=>{
      node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave);
      node.style.removeProperty('transform');stage.style.setProperty('--glow-x','50%');stage.style.setProperty('--glow-y','50%');
    };
  },[frame,surface,x,y]);
  return null;
}

export default function CaseFileVisual({image,alt,index}: {image:string;title:string;alt:string;index:number}) {
  const surface=useRef<HTMLDivElement>(null), frame=useRef<HTMLDivElement>(null);
  const reduced=useChapterMotion();
  const [near,setNear]=useState(false);
  const [fine,setFine]=useState(false);
  useEffect(()=>{
    const pointer=matchMedia('(pointer:fine)');
    const update=()=>setFine(pointer.matches);
    update();pointer.addEventListener('change',update);
    return ()=>pointer.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    const node=surface.current;
    if(!node||reduced||!fine)return;
    const observer=new IntersectionObserver(([entry])=>setNear(entry.isIntersecting),{rootMargin:'150px'});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[reduced,fine]);
  return <div ref={surface} className="case-file-visual">
    <div className="case-radial-glow" aria-hidden="true" />
    <div ref={frame} className="case-tilt-frame">
      <div className="case-window-bar micro-label">
        <span /><span /><span />
        <p>FIELD NOTE / {String(index+1).padStart(2,'0')}</p>
      </div>
      <div className="case-file-image"><div className="clip-reveal-inner">
        <Image src={image} alt={alt} fill sizes="(max-width: 767px) 90vw, 50vw" />
      </div></div>
      <span className="case-depth-tag micro-label">REPOSITORY / INTERFACE</span>
      <span className="case-depth-rule" aria-hidden="true" />
    </div>
    {near&&fine&&!reduced&&<TiltController frame={frame} surface={surface} />}
  </div>;
}
