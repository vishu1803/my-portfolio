'use client';
import { CSSProperties, ReactNode, RefObject, useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TorchReveal from './TorchReveal';
import { HERO_ART } from '../../data/heroArt';
import { HERO_MOTION as M } from '../../config/heroMotion';
import { coverFrame } from '../../lib/artGeometry';
import './AnimeHero.css';

function Camera({ children, role = 'art' }: { children: ReactNode; role?: string }) {
  return <div className="anime-scroll"><div className="anime-camera" data-layer="parallax" data-camera-role={role}><div className="anime-cover-plane">{children}</div></div></div>;
}
/** Torch duplicates only this pure image markup; all effects have one external owner. */
function Artwork({ onLoad }: { onLoad: (source: string) => void }) {
  return <div className="hero-photo anime-art"><div className="anime-intro"><Camera>
    <Image src={HERO_ART.src} alt={HERO_ART.alt} fill priority fetchPriority="high" sizes="100vw" className="anime-image" onLoad={event => onLoad(event.currentTarget.currentSrc)} />
    <span className="anime-grade" aria-hidden="true" />
  </Camera></div></div>;
}

export default function AnimeHero({ scope, staticMode, ready, limited }: {
  scope: RefObject<HTMLElement>; staticMode: boolean; ready: boolean; limited: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const offset = useRef<SVGFEOffsetElement>(null);
  const entranceSeen = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [effectSrc, setEffectSrc] = useState<string>();
  const imageLoaded = useCallback((source: string) => setEffectSrc(source), []);
  const id = useId().replace(/:/g, '');
  const rippleId = `shadow-ripple-${id}`, invertId = `shadow-invert-${id}`, maskId = `shadow-mask-${id}`;
  useEffect(() => {
    // Two frames defer canvas and SVG allocation until after the initial paint.
    let second = 0;
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setMounted(true)); });
    const media = matchMedia('(max-width: 767px), (pointer: coarse)');
    const update = () => setMobile(media.matches);
    update(); media.addEventListener('change', update);
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); media.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const measure = () => {
      const pos = getComputedStyle(node).getPropertyValue('--art-pos').trim().split(/\s+/);
      const x = parseFloat(pos[0]) / 100, y = parseFloat(pos[1]) / 100;
      const geometry = coverFrame(node.clientWidth, node.clientHeight, HERO_ART.width, HERO_ART.height,
        Number.isFinite(x) ? x : .5, Number.isFinite(y) ? y : .5);
      Object.entries(geometry).forEach(([key, value]) => node.style.setProperty(`--cover-${key}`, `${value}px`));
      node.style.setProperty('--face-x', `${geometry.left + geometry.width * .4975}px`);
      node.style.setProperty('--face-y', `${geometry.top + geometry.height * .2635}px`);
      node.style.setProperty('--shadow-scale', String(geometry.width / 512));
    };
    measure(); const observer = new ResizeObserver(measure); observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = root.current, hero = scope.current, surface = canvas.current;
    if (!node || !hero) return;
    if (staticMode || !ready || !mounted || !surface || !effectSrc) {
      node.dataset.rafRunning = 'false'; node.dataset.fps = '0'; node.dataset.filterFps = '0';
      if (staticMode && ready) entranceSeen.current = true;
      return;
    }
    const simple = limited || mobile;
    let frame = 0, visible = false, previous = 0, clock = 0, uptime = 0, dirty = true;
    let x = 0, y = 0, px = 0, py = 0, pointing = false;
    let width = 0, height = 0, context: CanvasRenderingContext2D | null = null;
    let bounds = node.getBoundingClientRect(), lastFilter = 0, lastCanvas = 0;
    let sampleStart = 0, frameCount = 0, filterCount = 0, slowSamples = 0, budgetReduced = false;
    node.dataset.effectsBudget = simple ? 'touch' : 'full';
    const particles = Array.from({ length: simple ? M.particles.mobileCount : M.particles.count }, (_, i) => ({
      x: (i * .61803398875) % 1, y: (i * .38196601125) % 1,
      radius: i % 19 === 0 ? M.particles.largeSize : M.particles.minSize + (i % 7) / 6 * (M.particles.maxSize - M.particles.minSize),
      speed: .025 + (i % 8) * .009, phase: i * 1.73, light: i % 5 === 0,
    }));
    // Animate a plain model: inherited CSS custom properties on every frame caused
    // repeated style invalidation across both torch trees. Flush only visual properties.
    const model: Record<string, number | string> = {
      '--art-reveal':'0%', '--art-intro-scale':1, '--art-blur':'0px', '--mist-alpha':1,
      '--eye-alpha':1, '--ember-alpha':1, '--art-zoom':1, '--art-drift-x':'0%', '--art-drift-y':'0%',
      '--art-breath':1, '--art-lift':'0px', '--mist-0':'-12%', '--mist-1':'12%', '--mist-2':'-12%',
      '--ray-angle':'-6deg', '--eye-pulse':.7, '--eye-scale':1, '--flare-alpha':0,
      '--flare-scale':1, '--punch':1, '--glitch-alpha':0, '--streak-alpha':0, '--streak-x':'-120%',
    };
    const find = (selector: string) => Array.from(node.querySelectorAll<HTMLElement>(selector));
    const targets = {
      intro:find('.anime-intro'), camera:find('.anime-camera'),
      mist:find('.anime-mist'),
      atmosphere:find('.anime-mist-overlay'), rays:find('.anime-rays'), eyes:find('.anime-eyes'),
      beacon:find('.anime-eye-beacon'), ring:find('.anime-eye-ring'), shadow:find('.anime-shadow-wrap'),
      light:find('.anime-pointer-light'), glitch:find('.anime-glitch'), streak:find('.anime-streak'),
    };
    const originals = new Map(Object.values(targets).flat().map(el => [el, el.getAttribute('style')]));
    const cache = new WeakMap<HTMLElement, Map<string,string>>();
    const write = (elements: HTMLElement[], property: string, value: string) => elements.forEach(el => {
      let last = cache.get(el); if (!last) { last = new Map(); cache.set(el,last); }
      if (last.get(property) !== value) { el.style.setProperty(property, value); last.set(property,value); }
    });
    const render = () => {
      write(targets.intro,'clip-path',`inset(${model['--art-reveal']} 0 0)`);
      write(targets.intro,'transform',`scale(${model['--art-intro-scale']})`);
      write(targets.intro,'filter',model['--art-blur'] === '0px' ? 'none' : `blur(${model['--art-blur']})`);
      const transform = `translate3d(${x*M.pointer.figure}px,${y*M.pointer.figure + parseFloat(String(model['--art-lift']))}px,0) translate(${model['--art-drift-x']},${model['--art-drift-y']}) scale(${Number(model['--art-zoom'])*Number(model['--art-breath'])*Number(model['--punch'])})${simple || budgetReduced || !pointing ? '' : ` perspective(1400px) rotateX(${-y*M.pointer.tilt}deg) rotateY(${x*M.pointer.tilt}deg)`}`;
      const cameras = targets.camera.filter(el => !(budgetReduced && el.dataset.cameraRole === 'shadow') && !(Number(model['--glitch-alpha']) === 0 && el.dataset.cameraRole === 'glitch'));
      write(cameras,'transform',transform);
      targets.mist.forEach((el,i) => el.style.transform=`translate(calc(${model[`--mist-${i}`]} + ${x*M.pointer.mist}px),${[5,-7,2][i]}%)`);
      write(targets.atmosphere,'opacity',String(model['--mist-alpha']));
      write(targets.rays,'opacity',String(Number(model['--mist-alpha'])*M.rays.opacity*(.7+Number(model['--eye-pulse'])*.3)));
      write(targets.rays,'transform',`translate(${x*M.pointer.background}px,${y*M.pointer.background}px) rotate(${model['--ray-angle']})`);
      write(targets.eyes,'opacity',String(model['--eye-pulse']));
      write(targets.eyes,'transform',`translate(-50%,-50%) scale(${model['--eye-scale']})`);
      write(targets.beacon,'opacity',String(model['--eye-alpha']));
      write(targets.ring,'opacity',String(model['--flare-alpha']));
      write(targets.ring,'transform',`translate(-50%,-50%) scale(${model['--flare-scale']})`);
      write(targets.shadow,'opacity',String(M.shadow.opacity*Number(model['--mist-alpha'])));
      write(targets.light,'opacity',String(M.pointer.light*Number(model['--mist-alpha'])));
      write(targets.light,'transform',`translate(${x*45}%,${y*35}%)`);
      write(targets.glitch,'opacity',String(model['--glitch-alpha']));
      write(targets.streak,'opacity',String(model['--streak-alpha']));
      write(targets.streak,'transform',`translateX(${model['--streak-x']})`);
      surface.style.opacity=String(model['--ember-alpha']);
      surface.style.transform=`translate(${x*M.pointer.particles}px,${y*M.pointer.particles}px)`;
    };
    const timelines: gsap.core.Animation[] = [];
    const mistLoops: gsap.core.Animation[] = [];
    const ctx = gsap.context(() => {
      if (!entranceSeen.current) {
        gsap.set(model, { '--art-reveal': '100%', '--art-intro-scale': 1.2, '--art-blur': '16px', '--mist-alpha': 0, '--eye-alpha': 0, '--ember-alpha': 0 });
        timelines.push(gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { entranceSeen.current = true; } })
          .to(model, { '--eye-alpha': 1, duration: .35 }, M.entrance.eyes)
          .to(model, { '--art-reveal': '0%', '--art-intro-scale': 1, '--art-blur': '0px', duration: 1.1 }, M.entrance.art)
          .to(model, { '--mist-alpha': 1, duration: .6 }, M.entrance.atmosphere)
          .to(model, { '--ember-alpha': 1, duration: .2 }, M.entrance.particles));
      }
      const loop = (from: gsap.TweenVars, to: gsap.TweenVars) => timelines.push(gsap.fromTo(model, from, { ease: 'sine.inOut', ...to, repeat: -1, yoyo: true }));
      loop({ '--art-zoom': M.camera.from, '--art-drift-x': '0%', '--art-drift-y': '0%' }, { '--art-zoom': M.camera.to, '--art-drift-x': M.camera.x, '--art-drift-y': M.camera.y, duration: M.camera.duration, ease: 'none' });
      loop({ '--art-breath': 1, '--art-lift': '0px' }, { '--art-breath': M.breathing.scale, '--art-lift': `${M.breathing.lift}px`, duration: M.breathing.duration });
      M.mist.durations.forEach((duration, i) => {
        loop({ [`--mist-${i}`]: `${i % 2 ? 12 : -12}%` }, { [`--mist-${i}`]: `${i % 2 ? -12 : 12}%`, duration });
        mistLoops.push(timelines[timelines.length - 1]);
      });
      loop({ '--ray-angle': `${-M.rays.rotation}deg` }, { '--ray-angle': `${M.rays.rotation}deg`, duration: M.rays.duration });
      loop({ '--eye-pulse': M.eye.min, '--eye-scale': M.eye.scaleMin }, { '--eye-pulse': M.eye.max, '--eye-scale': M.eye.scaleMax, duration: M.eye.duration });
      if (!simple) {
        const flare = gsap.timeline({ repeat: -1, repeatDelay: M.eye.flareDelay, delay: M.eye.flareDelay });
        flare.fromTo(model, { '--flare-alpha': 0, '--flare-scale': .35 }, { '--flare-alpha': .8, duration: .08 })
          .to(model, { '--flare-alpha': 0, '--flare-scale': 2.6, duration: M.eye.flareDuration - .08 });
        const pulse = gsap.timeline({ repeat: -1, repeatDelay: M.pulse.interval - M.pulse.streakDuration, delay: M.pulse.interval });
        pulse.set(model, { '--streak-x': '-120%', '--punch': M.pulse.punch, '--glitch-alpha': .24 })
          .to(model, { '--glitch-alpha': 0, duration: M.pulse.splitDuration }, 0)
          .fromTo(model, { '--streak-alpha': .35 }, { '--streak-alpha': 0, '--streak-x': '120%', '--punch': 1, duration: M.pulse.streakDuration, ease: 'power2.out' }, 0);
        timelines.push(flare, pulse);
      }
    }, node);
    const measure = () => { dirty = true; };
    const size = () => {
      bounds = node.getBoundingClientRect();
      if (!context || width !== node.clientWidth || height !== node.clientHeight) {
        width = node.clientWidth; height = node.clientHeight;
        const dpr = Math.min(devicePixelRatio || 1, M.particles.dpr);
        surface.width = Math.max(1, Math.round(width * dpr)); surface.height = Math.max(1, Math.round(height * dpr));
        context = surface.getContext('2d', { alpha: true }); context?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      dirty = false;
    };
    const paint = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const wallElapsed = previous ? (time - previous) / 1000 : 0;
      const elapsed = Math.min(wallElapsed, .05);
      uptime += wallElapsed;
      previous = time; clock += elapsed; frameCount++;
      const dolly = parseFloat(hero.style.getPropertyValue('--dolly-progress')) || 0;
      mistLoops.forEach(t => t.timeScale(1 + dolly * 1.8));
      if (dirty) size();
      const tx = simple || !pointing ? Math.sin(clock * .3) * .45 : Math.max(-1, Math.min(1, (px - bounds.left) / Math.max(bounds.width, 1) * 2 - 1));
      const ty = simple || !pointing ? Math.cos(clock * .23) * .3 : Math.max(-1, Math.min(1, (py - bounds.top) / Math.max(bounds.height, 1) * 2 - 1));
      x += (tx - x) * M.pointer.lerp; y += (ty - y) * M.pointer.lerp;
      render();
      // Only the noise offset mutates, at <=30 updates/s; frequency and seed are stable.
      if (!simple && !budgetReduced && offset.current && time - lastFilter >= 1000 / M.shadow.fps) {
        offset.current.setAttribute('dx', String(Math.sin(clock * .18) * M.shadow.drift / 4));
        offset.current.setAttribute('dy', String(Math.cos(clock * .13) * M.shadow.drift / 4));
        lastFilter = time; filterCount++;
      }
      if (context && width && height && time - lastCanvas >= (simple ? 1000 / 30 : 0)) {
        const dt = lastCanvas ? Math.min((time - lastCanvas) / 1000, .08) : 0;
        lastCanvas = time; context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'lighter';
        for (const p of particles) {
          p.y -= p.speed * dt; if (p.y < -.05) p.y = 1.05;
          context.globalAlpha = p.radius > 4 ? .12 : p.light ? .65 : .5;
          context.fillStyle = p.light ? '#e9e2d0' : '#ff3b47';
          context.shadowBlur = p.radius > 4 ? 8 : 0; context.shadowColor = '#b80f1a';
          context.beginPath(); context.arc((p.x + Math.sin(clock * .6 + p.phase) * .025) * width, p.y * height, p.radius, 0, Math.PI * 2); context.fill();
        }
        context.globalAlpha = 1; context.shadowBlur = 0;
      }
      if (!sampleStart) sampleStart = time;
      if (time - sampleStart >= 1000) {
        const fps = Math.round(frameCount * 1000 / (time - sampleStart));
        node.dataset.fps = String(fps);
        if (uptime > 1.5 && fps < 45) slowSamples++; else slowSamples = 0;
        if (slowSamples >= 2 && !budgetReduced) {
          budgetReduced = true; node.dataset.effectsBudget = 'reduced';
        }
        node.dataset.filterFps = String(Math.round(filterCount * 1000 / (time - sampleStart)));
        sampleStart = time; frameCount = filterCount = 0;
      }
      frame = requestAnimationFrame(paint);
    };
    const activity = () => {
      const active = visible && !document.hidden;
      hero.dataset.heroInView = String(visible);
      node.dataset.artMotion = active ? 'running' : 'offscreen'; node.dataset.rafRunning = String(active);
      timelines.forEach(t => active ? t.resume() : t.pause());
      if (active && !frame) { previous = lastCanvas = sampleStart = frameCount = filterCount = 0; frame = requestAnimationFrame(paint); }
      if (!active) { cancelAnimationFrame(frame); frame = 0; node.dataset.fps = '0'; node.dataset.filterFps = '0'; }
    };
    activity();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; activity(); }, { threshold: .01 }); observer.observe(hero);
    const resize = new ResizeObserver(measure); resize.observe(node);
    const move = (e: PointerEvent) => { if (e.pointerType === 'mouse') { px = e.clientX; py = e.clientY; pointing = true; } };
    const leave = () => { pointing = false; };
    hero.addEventListener('pointermove', move, { passive: true }); hero.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', measure, { passive: true }); document.addEventListener('visibilitychange', activity);
    return () => {
      observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); ctx.revert();
      originals.forEach((style,el) => style === null ? el.removeAttribute('style') : el.setAttribute('style',style));
      hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', measure); document.removeEventListener('visibilitychange', activity);
      context?.clearRect(0, 0, width, height);
      node.dataset.rafRunning = 'false'; node.dataset.fps = '0'; node.dataset.filterFps = '0';
      delete node.dataset.effectsBudget;
      node.style.removeProperty('--pointer-x'); node.style.removeProperty('--pointer-y');
    };
  }, [scope, staticMode, ready, mounted, mobile, limited, effectSrc]);

  const vars = { '--ray-opacity': M.rays.opacity, '--shadow-opacity': M.shadow.opacity,
    '--parallax-figure': `${M.pointer.figure}px`, '--parallax-bg': `${M.pointer.background}px`, '--parallax-mist': `${M.pointer.mist}px`, '--parallax-particles': `${M.pointer.particles}px`, '--tilt': `${M.pointer.tilt}deg`, '--light-strength': M.pointer.light } as CSSProperties;
  return <motion.div ref={root} className="anime-hero" data-anime-hero data-art-motion={staticMode ? 'static' : 'waiting'} data-art-quality={limited || mobile ? 'limited' : 'full'} style={vars}
    initial={false} animate="rest" whileHover={staticMode ? undefined : 'hover'}>
    <TorchReveal scope={scope}><Artwork onLoad={imageLoaded} /></TorchReveal>
    <div className="anime-atmosphere" aria-hidden="true">
      <div className="anime-rays" data-layer="rays" />
      <div className="anime-aura" />
      {mounted && effectSrc && !staticMode && !mobile && !limited && <div className="anime-shadow-wrap"><div className="anime-intro"><Camera role="shadow">
        <div className="anime-shadow-raster"><svg className="anime-shadow" data-layer="shadow" viewBox="0 0 512 287.75">
          <defs>
            <filter id={invertId}><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncR type="table" tableValues="1 0" /><feFuncG type="table" tableValues="1 0" /><feFuncB type="table" tableValues="1 0" /></feComponentTransfer></filter>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="287.75" style={{ maskType: 'luminance' }}>
              <image href={effectSrc} width="512" height="287.75" filter={`url(#${invertId})`} />
              <ellipse cx="255" cy="85" rx="40" ry="65" fill="black" />
            </mask>
            <filter id={rippleId} x="15%" y="0%" width="65%" height="90%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency={M.shadow.frequency * 4} numOctaves="2" seed="3" result="noise" />
              <feOffset ref={offset} in="noise" dx="0" dy="0" result="drift" />
              <feDisplacementMap in="SourceGraphic" in2="drift" scale={M.shadow.scale / 4} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <g mask={`url(#${maskId})`}><image href={effectSrc} width="512" height="287.75" filter={`url(#${rippleId})`} /></g>
        </svg></div>
      </Camera></div></div>}
      <div className="anime-mist-overlay" data-layer="mist">{M.mist.opacities.map((opacity, i) => <span key={i} className={`anime-mist anime-mist-${i}`} style={{ opacity, filter: mobile ? 'none' : `blur(${M.mist.blur[i]}px)` }} />)}</div>
      <div className="anime-eye-beacon"><Camera role="eyes"><span className="anime-eyes" data-layer="eyes" /><span className="anime-eye-ring" /></Camera></div>
      <div className="anime-pointer-light" />
      {mounted && !staticMode && <canvas ref={canvas} className="anime-embers" data-layer="embers" />}
      <div className="anime-glitch"><Camera role="glitch"><span className="anime-split-red" style={{ backgroundImage: effectSrc ? `url("${effectSrc}")` : undefined }} /><span className="anime-split-blue" style={{ backgroundImage: effectSrc ? `url("${effectSrc}")` : undefined }} /></Camera></div>
      <div className="anime-streak" />
    </div>
    <motion.div className="anime-hover-light anime-edge-mask" aria-hidden="true" variants={{ rest: { opacity: .02 }, hover: { opacity: .09 } }} transition={{ duration: .3 }} />
  </motion.div>;
}
