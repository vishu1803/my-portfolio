'use client';
import { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import TorchReveal from './TorchReveal';
import { HERO_ART } from '../../data/heroArt';
import { heroVideoPlayback, shouldStartHeroVideo } from '../../lib/heroVideoPlayback';
import './HeroVideoBackground.css';

/** One decoder, with the exact first frame visible before scroll and while buffering. */
export default function HeroVideoBackground({scope, staticMode}: {scope:RefObject<HTMLElement>;staticMode:boolean}) {
  const root=useRef<HTMLDivElement>(null);
  const video=useRef<HTMLVideoElement>(null);
  const [started,setStarted]=useState(false);
  const [posterMissing,setPosterMissing]=useState(false);
  useEffect(()=>{
    const hero=scope.current,node=root.current,media=video.current;
    if(!hero||!node||!media)return;
    let visible=false,live=true;
    const ctx=gsap.context(()=>{},node);
    const showPoster=()=>{ctx.add(()=>gsap.set(media,{opacity:0}));};
    const sync=()=>{
      const active=heroVideoPlayback(started,staticMode,visible,document.hidden,scrollY)==='play';
      node.dataset.videoState=staticMode?'static':active?'loading':started?'paused':'poster';
      if(!active){media.pause();if(staticMode||scrollY<=8)showPoster();return;}
      if(!media.paused && media.readyState>=2){node.dataset.videoState='playing';return;}
      media.muted=true;
      const playing=media.play();
      playing?.catch(()=>{if(live&&visible&&!document.hidden&&!staticMode&&scrollY>8){node.dataset.videoState='blocked';showPoster();}});
    };
    const onPlaying=()=>{
      if(!live||!started||staticMode||!visible||document.hidden||scrollY<=8){media.pause();return;}
      node.dataset.videoState='playing';
      ctx.add(()=>gsap.to(media,{opacity:1,duration:.35,overwrite:true,ease:'power2.out'}));
    };
    const onScroll=()=>{
      const bounds=hero.getBoundingClientRect();
      if(!started&&shouldStartHeroVideo(scrollY,bounds.top,bounds.bottom,staticMode))setStarted(true);
      if(scrollY<=8){media.pause();showPoster();if(media.readyState)media.currentTime=0;setStarted(false);}
      else sync();
    };
    const onError=()=>{node.dataset.videoState='error';showPoster();};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.02,rootMargin:'-88px 0px 0px 0px'});observer.observe(hero);
    media.addEventListener('playing',onPlaying);media.addEventListener('error',onError);
    window.addEventListener('scroll',onScroll,{passive:true});document.addEventListener('visibilitychange',sync);
    sync();
    return()=>{live=false;observer.disconnect();media.pause();ctx.revert();media.removeEventListener('playing',onPlaying);media.removeEventListener('error',onError);window.removeEventListener('scroll',onScroll);document.removeEventListener('visibilitychange',sync);};
  },[scope,staticMode,started]);
  const poster=<div className="hero-video-poster"><Image src={posterMissing?HERO_ART.src:'/hero/video-poster.webp'} onError={()=>setPosterMissing(true)} alt={HERO_ART.alt} fill priority fetchPriority="high" sizes="100vw" /></div>;
  return <div ref={root} className="hero-video-background" data-hero-video>
    <TorchReveal scope={scope} revealOnScroll revealContent={<>{poster}<video ref={video} src={started?'/hero/animation.mp4':undefined} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} className="hero-background-video" /></>}>{poster}</TorchReveal>

  </div>;
}
