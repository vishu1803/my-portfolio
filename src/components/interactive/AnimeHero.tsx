'use client';
import { RefObject, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import TorchReveal from './TorchReveal';
import { HERO_ART } from '../../data/heroArt';
import { HERO_MOTION as M } from '../../config/heroMotion';
import { coverFrame } from '../../lib/artGeometry';
import './AnimeHero.css';

function Artwork() {
  return <div className="hero-photo anime-art"><div className="anime-intro"><div className="anime-scroll"><div className="anime-cover-plane">
    <Image src={HERO_ART.src} alt={HERO_ART.alt} fill priority fetchPriority="high" sizes="100vw" className="anime-image" />
    <span className="anime-grade" aria-hidden="true" />
  </div></div></div></div>;
}

/** A steady source image. Light and ash move around a source-space occlusion silhouette. */
export default function AnimeHero({ scope, staticMode, ready, limited }: {
  scope: RefObject<HTMLElement>; staticMode: boolean; ready: boolean; limited: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const entranceSeen = useRef(false);
  useEffect(() => {
    const node = root.current, hero = scope.current, surface = canvas.current;
    if (!node || !hero || !surface) return;
    const simple = limited || matchMedia('(pointer:coarse), (max-width:767px)').matches;
    let width = 0, height = 0, dirty = true, frame = 0, visible = false;
    let last = 0, lastPaint = 0, clock = 0, sample = 0, frames = 0, paints = 0;
    let pointerX = 0, pointerY = 0, tx = 0, ty = 0;
    let geometry = coverFrame(1,1,HERO_ART.width,HERO_ART.height);
    let rect = node.getBoundingClientRect();
    let context: CanvasRenderingContext2D | null = null;
    const model = { reveal: 0, alpha: 1, eye: .7, flare: 0 };
    const intros = Array.from(node.querySelectorAll<HTMLElement>('.anime-intro'));
    const eyes = node.querySelector<HTMLElement>('.anime-eyes');
    const measure = () => { dirty = true; };
    const resize = () => {
      width = node.clientWidth; height = node.clientHeight; rect = node.getBoundingClientRect();
      geometry = coverFrame(width,height,HERO_ART.width,HERO_ART.height,.5,.5);
      Object.entries(geometry).forEach(([key,value]) => node.style.setProperty(`--cover-${key}`,`${value}px`));
      node.style.setProperty('--face-x',`${geometry.left+geometry.width*.4975}px`);
      node.style.setProperty('--face-y',`${geometry.top+geometry.height*.2635}px`);
      // Bound raster work independently of CSS viewport and device pixel ratio.
      const scale = Math.min(1, M.emission.rasterWidth / Math.max(width,1));
      surface.width = Math.max(1,Math.round(width*scale)); surface.height = Math.max(1,Math.round(height*scale));
      context = surface.getContext('2d'); context?.setTransform(scale,0,0,scale,0,0);
      dirty = false;
    };
    resize();
    const observerSize = new ResizeObserver(measure); observerSize.observe(node);
    node.dataset.effectsBudget = simple ? 'touch-emission' : 'emission';
    const timelines: gsap.core.Animation[] = [];
    const ctx = gsap.context(() => {
      if (staticMode || !ready) return;
      if (!entranceSeen.current) {
        model.reveal = 100; model.alpha = 0;
        timelines.push(gsap.timeline({onComplete:()=>{entranceSeen.current=true;}})
          .to(model,{reveal:0,duration:1.1,ease:'power3.out'},.35)
          .to(model,{alpha:1,duration:.7},.3));
      }
      timelines.push(gsap.fromTo(model,{eye:.4},{eye:1,duration:1.1,yoyo:true,repeat:-1,ease:'sine.inOut'}));
      if (!limited) timelines.push(gsap.timeline({repeat:-1,repeatDelay:M.eye.flareDelay,delay:2})
        .to(model,{flare:1,duration:.3,ease:'power2.out'})
        .to(model,{flare:0,duration:1.1,ease:'sine.inOut'}));
    },node);
    const silhouette = (c: CanvasRenderingContext2D) => {
      // An occlusion boundary, not a new character illustration. Source coordinates 0..1.
      c.beginPath();
      c.moveTo(.32,1); c.lineTo(.31,.63); c.bezierCurveTo(.32,.48,.39,.45,.435,.41);
      c.bezierCurveTo(.435,.33,.413,.25,.425,.17); c.bezierCurveTo(.445,.035,.55,.04,.568,.16);
      c.bezierCurveTo(.585,.27,.555,.34,.555,.405); c.bezierCurveTo(.615,.44,.66,.51,.68,.63);
      c.lineTo(.68,1); c.closePath();
    };
    const draw = () => {
      const c = context;
      if (!c || !width || !height) return;
      c.clearRect(0,0,width,height);
      const dolly = parseFloat(hero.style.getPropertyValue('--dolly-scale')) || 1;
      const faceX=geometry.left+geometry.width*.4975, faceY=geometry.top+geometry.height*.2635;
      c.save(); c.translate(faceX,faceY); c.scale(dolly,dolly); c.translate(-faceX,-faceY);
      c.translate(geometry.left,geometry.top); c.scale(geometry.width,geometry.height);
      c.globalCompositeOperation='lighter';
      // Emission originates at the shoulders and climbs outward along the artwork's energy.
      for (let side=0;side<2;side++) {
        const origin=side ? .59 : .40, sign=side ? 1 : -1;
        for(let i=0;i<5;i++) {
          const phase=clock*(.32+i*.035)+i*1.7;
          const reach=.14+i*.018;
          const x=origin+sign*(.015+Math.sin(phase)*.01)+pointerX*.006;
          const y=.55+i*.018+pointerY*.006;
          c.beginPath(); c.moveTo(x,y);
          c.bezierCurveTo(x+sign*reach*.8,y-.12,x-sign*.055,y-.26,x+sign*(.06+Math.sin(phase*.7)*.03),.12+i*.04);
          c.lineWidth=(i===0?.0025:.0011)*(1+model.flare*.5);
          c.strokeStyle=side?`rgba(95,178,255,${(.28+model.flare*.22)*model.alpha})`:`rgba(255,${100+i*20},${55+i*10},${(.35+model.flare*.25)*model.alpha})`;
          c.stroke();
        }
        const x=origin+sign*.045, y=.49;
        const glow=c.createRadialGradient(x,y,0,x,y,.18+model.flare*.06);
        glow.addColorStop(0,side?`rgba(130,205,255,${.20+model.flare*.28})`:`rgba(255,149,84,${.22+model.flare*.28})`);
        glow.addColorStop(.4,side?'rgba(25,91,210,.08)':'rgba(184,15,26,.12)'); glow.addColorStop(1,'transparent');
        c.fillStyle=glow; c.fillRect(x-.25,y-.25,.5,.5);
        // A restrained light fan grows from behind each shoulder, never across the face.
        for(let i=0;i<3;i++) {
          const angle=-Math.PI/2+sign*(.4+i*.24+Math.sin(clock*.23)*.08);
          c.beginPath(); c.moveTo(origin,.47); c.lineTo(origin+Math.cos(angle)*.33,.47+Math.sin(angle)*.33);
          c.lineWidth=.005+i*.001; c.strokeStyle=`rgba(255,190,145,${(.025+model.flare*.07)*model.alpha})`; c.stroke();
        }
      }
      for(let i=0;i<(simple?36:72);i++) {
        const side=i%2?1:-1, life=(clock*(.04+(i%5)*.007)+i*.618033)%1;
        const x=.5+side*(.09+life*.17+Math.sin(clock*.7+i)*.02), y=.8-life*.68;
        c.fillStyle=i%7===0?'#e9e2d0':side<0?'#ff744a':'#83bfff';
        c.globalAlpha=Math.sin(life*Math.PI)*.65*model.alpha;
        c.beginPath(); c.ellipse(x,y,(1+i%3)/geometry.width,(1+i%3)/geometry.height,0,0,Math.PI*2); c.fill();
      }
      c.globalAlpha=1;
      c.globalCompositeOperation='destination-out'; silhouette(c); c.fill();
      c.restore(); c.globalCompositeOperation='source-over';
    };
    const paint = (time: number) => {
      frame=0; if(!visible || document.hidden || staticMode || !ready) return;
      const delta=last?Math.min((time-last)/1000,.1):0; last=time; clock+=delta; frames++;
      if(dirty)resize();
      pointerX+=(tx-pointerX)*.08; pointerY+=(ty-pointerY)*.08;
      intros.forEach(el=>{el.style.clipPath=model.reveal===0?'none':`inset(${model.reveal}% 0 0)`;});
      if(eyes) {eyes.style.opacity=String(model.eye); eyes.style.transform=`translate(-50%,-50%) scale(${.9+model.eye*.2+model.flare*.12})`;}
      if(time-lastPaint>=1000/M.emission.fps) {draw(); lastPaint=time;paints++;}
      if(!sample)sample=time;
      if(time-sample>=1000) {node.dataset.fps=String(Math.round(frames*1000/(time-sample)));node.dataset.filterFps='0';node.dataset.emissionFps=String(Math.round(paints*1000/(time-sample)));sample=time;frames=paints=0;}
      frame=requestAnimationFrame(paint);
    };
    const activity=()=>{
      const active=visible&&!document.hidden&&!staticMode&&ready;
      node.dataset.artMotion=staticMode?'static':active?'running':'offscreen';node.dataset.rafRunning=String(active);hero.dataset.heroInView=String(visible);
      timelines.forEach(t=>active?t.resume():t.pause());
      if(active&&!frame) {last=0;frame=requestAnimationFrame(paint);}
      if(!active) {cancelAnimationFrame(frame);frame=0;node.dataset.fps='0';}
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;activity();},{threshold:.01});observer.observe(hero);
    const move=(e:PointerEvent)=>{tx=(e.clientX-rect.left)/Math.max(width,1)*2-1;ty=(e.clientY-rect.top)/Math.max(height,1)*2-1;};
    const leave=()=>{tx=ty=0;};
    hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',leave);
    window.addEventListener('scroll',measure,{passive:true});document.addEventListener('visibilitychange',activity);activity();
    return()=>{observer.disconnect();observerSize.disconnect();cancelAnimationFrame(frame);ctx.revert();hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);window.removeEventListener('scroll',measure);document.removeEventListener('visibilitychange',activity);intros.forEach(el=>el.style.removeProperty('clip-path'));eyes?.removeAttribute('style');context?.clearRect(0,0,width,height);node.dataset.rafRunning='false';};
  },[scope,staticMode,ready,limited]);
  return <div ref={root} className="anime-hero emission-hero" data-anime-hero data-art-motion={staticMode?'static':'waiting'}>
    <TorchReveal scope={scope}><Artwork /></TorchReveal>
    <canvas ref={canvas} className="anime-emission" data-layer="embers" aria-hidden="true" />
    <div className="anime-eye-beacon" aria-hidden="true"><div className="anime-scroll"><div className="anime-cover-plane"><span className="anime-eyes" data-layer="eyes" /></div></div></div>
  </div>;
}
