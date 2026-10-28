"use client";

import { RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import TorchReveal from "./TorchReveal";
import { HERO_ART } from "../../data/heroArt";
import { coverFrame } from "../../lib/artGeometry";
import { isLowPowerDevice } from "../../lib/motionQuality";
import useMotionPreference from "../../hooks/useMotionPreference";
import useScrollScene from "../../hooks/useScrollScene";
import { useIntroReady } from "../motion/Preloader";
import "./AnimeHero.css";

/** Pure image markup: TorchReveal may duplicate this, never the animation engine. */
function Artwork() {
  return <div className="hero-photo anime-art">
    <div className="anime-intro">
      <div className="anime-scroll">
        <div className="anime-parallax">
          <div className="anime-breath">
            <div className="anime-ken-burns">
              <div className="anime-cover-plane">
                <Image src={HERO_ART.src} alt={HERO_ART.alt} fill priority
                  fetchPriority="high" sizes="(max-width: 700px) 65vw, 36vw"
                  className="anime-image" />
                <span className="anime-grade" aria-hidden="true" />
                <span className="anime-glitch anime-glitch-red" aria-hidden="true" />
                <span className="anime-glitch anime-glitch-blue" aria-hidden="true" />
                <span className="anime-rim" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span className="anime-art-scrim" aria-hidden="true" />
    <span className="portrait-cross" aria-hidden="true">+</span>
    <span className="anime-index micro-label" aria-hidden="true">N° 01</span>
  </div>;
}

/** Method C: one flat supplied image, shared GSAP model, one lazy canvas/rAF. */
export default function AnimeHero({ scope }: { scope: RefObject<HTMLElement> }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const entranceSeen = useRef(false);
  const reduced = useMotionPreference();
  const introReady = useIntroReady();

  // Cover geometry only changes on resize, never on pointer events.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const measure = () => {
      const pos = getComputedStyle(node).getPropertyValue("--art-pos").trim().split(/\s+/);
      const x = Number.parseFloat(pos[0]) / 100;
      const y = Number.parseFloat(pos[1]) / 100;
      const frame = coverFrame(node.clientWidth, node.clientHeight, HERO_ART.width, HERO_ART.height,
        Number.isFinite(x) ? x : .5, Number.isFinite(y) ? y : .5);
      for (const [key, value] of Object.entries(frame))
        node.style.setProperty(`--cover-${key}`, `${value}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = root.current, surface = canvas.current, hero = scope.current;
    if (!node || !surface || !hero) return;
    if (reduced || !introReady) {
      node.dataset.artMotion = reduced ? "static" : "waiting";
      if (reduced) entranceSeen.current = true;
      return;
    }
    const coarse = matchMedia("(pointer: coarse)").matches;
    const limited = coarse || matchMedia("(max-width: 767px)").matches || isLowPowerDevice();
    node.dataset.artQuality = limited ? "limited" : "full";
    let frame = 0, visible = false, lastPaint = 0, previousTime = 0, clock = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0, dirty = true;
    let pointerX = 0, pointerY = 0, hasPointer = false;
    let rect = node.getBoundingClientRect();
    let width = 0, height = 0, context: CanvasRenderingContext2D | null = null;
    const count = limited ? 22 : 54;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: (i * .61803398875) % 1, y: (i * .38196601125) % 1,
      radius: .55 + (i % 5) * .23, speed: .02 + (i % 7) * .005,
      phase: i * 1.73, light: i % 6 === 0,
    }));
    const timelines: gsap.core.Animation[] = [];
    const ctx = gsap.context(() => {
      // Root custom properties drive BOTH torch copies; transforms have separate wrappers.
      if (!entranceSeen.current) {
        gsap.set(node, { "--art-reveal": "100%", "--art-intro-scale": 1.15,
          "--art-blur": "14px", "--mist-alpha": 0, "--eye-alpha": 0, "--ember-alpha": 0 });
        const entrance = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => { entranceSeen.current = true; } })
          .to(node, { "--art-reveal": "0%", "--art-intro-scale": 1, "--art-blur": "0px", duration: 1.6 }, 0)
          .to(node, { "--mist-alpha": 1, duration: 1.1 }, .4)
          .to(node, { "--eye-alpha": 1, duration: .6, ease: "back.out(1.6)" }, 1)
          .to(node, { "--ember-alpha": 1, duration: .8 }, 1.2);
        timelines.push(entrance);
      }
      timelines.push(
        gsap.to(node, { "--art-breath": 1.012, "--art-lift": "-4px", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.to(node, { "--art-zoom": 1.1, "--art-drift-x": "8px", "--art-drift-y": "-5px", duration: 28, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.fromTo(node, { "--mist-a": "-9%" }, { "--mist-a": "9%", duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.fromTo(node, { "--mist-b": "8%" }, { "--mist-b": "-8%", duration: 45, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.fromTo(node, { "--mist-c": "-7%" }, { "--mist-c": "7%", duration: 70, repeat: -1, yoyo: true, ease: "sine.inOut" }),
        gsap.fromTo(node, { "--eye-pulse": .5 }, { "--eye-pulse": 1, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" }));
      const rim = gsap.timeline({ repeat: -1, repeatDelay: 7.1, delay: 3 });
      rim.set(node, { "--rim-shift": "-130%", "--rim-alpha": 0 })
        .to(node, { "--rim-alpha": .12, duration: .15 })
        .to(node, { "--rim-shift": "130%", duration: .75, ease: "power2.inOut" }, 0)
        .to(node, { "--rim-alpha": 0, duration: .15 }, .75);
      timelines.push(rim);
      if (!limited) {
        const flare = gsap.timeline({ repeat: -1, repeatDelay: 7.6, delay: 6.5 });
        flare.to(node, { "--eye-flare": 1.25, duration: .2 })
          .to(node, { "--eye-flare": 1, duration: .4 });
        const glitch = gsap.timeline({ repeat: -1, repeatDelay: 11.8, delay: 11 });
        glitch.to(node, { "--glitch-alpha": .16, duration: .04 })
          .to(node, { "--glitch-alpha": 0, duration: .08 });
        timelines.push(flare, glitch);
      }
    }, node);
    const measure = () => { dirty = true; };
    const updateSize = () => {
      rect = node.getBoundingClientRect();
      const nextWidth = node.clientWidth, nextHeight = node.clientHeight;
      if (nextWidth !== width || nextHeight !== height || !context) {
        width = nextWidth; height = nextHeight;
        const dpr = Math.min(devicePixelRatio || 1, 2);
        surface.width = Math.max(1, Math.round(width * dpr));
        surface.height = Math.max(1, Math.round(height * dpr));
        context = surface.getContext("2d", { alpha: true });
        context?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      dirty = false;
    };
    const paint = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (time - lastPaint >= 1000 / (limited ? 24 : 40)) {
        const elapsed = previousTime ? Math.min((time - previousTime) / 1000, .08) : 0;
        previousTime = time; clock += elapsed;
        if (dirty) updateSize();
        if (limited) {
          targetX = Math.sin(clock * .18) * 6; targetY = Math.cos(clock * .13) * 4;
        } else if (hasPointer) {
          targetX = Math.max(-1, Math.min(1, (pointerX - rect.left) / Math.max(rect.width, 1) * 2 - 1)) * 10;
          targetY = Math.max(-1, Math.min(1, (pointerY - rect.top) / Math.max(rect.height, 1) * 2 - 1)) * 10;
        }
        x += (targetX - x) * .08; y += (targetY - y) * .08;
        node.style.setProperty("--art-x", `${x}px`); node.style.setProperty("--art-y", `${y}px`);
        node.style.setProperty("--art-rx", `${limited ? 0 : -y * .3}deg`);
        node.style.setProperty("--art-ry", `${limited ? 0 : x * .3}deg`);
        if (context && width && height) {
          context.clearRect(0, 0, width, height);
          particles.forEach(p => {
            p.y -= p.speed * elapsed;
            if (p.y < -.03) p.y = 1.03;
            const px = (p.x + Math.sin(clock * .5 + p.phase) * .018) * width;
            context!.globalAlpha = p.light ? .5 : .32;
            context!.fillStyle = p.light ? "#e9e2d0" : "#ff3b47";
            context!.beginPath(); context!.arc(px, p.y * height, p.radius, 0, Math.PI * 2); context!.fill();
          });
          context.globalAlpha = 1;
        }
        lastPaint = time;
      }
      frame = requestAnimationFrame(paint);
    };
    const activity = () => {
      const active = visible && !document.hidden;
      node.dataset.artMotion = active ? "running" : "paused";
      timelines.forEach(t => active ? t.resume() : t.pause());
      if (active && !frame) { previousTime = 0; frame = requestAnimationFrame(paint); }
      if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
    };
    // Pause immediately until intersection is known, including the entrance timeline.
    activity();
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; activity(); }, { threshold: .04 });
    observer.observe(node);
    const resize = new ResizeObserver(measure); resize.observe(node);
    const move = (event: PointerEvent) => {
      if (limited || event.pointerType !== "mouse") return;
      pointerX = event.clientX; pointerY = event.clientY; hasPointer = true;
    };
    const leave = () => { hasPointer = false; targetX = targetY = 0; };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", measure, { passive: true });
    document.addEventListener("visibilitychange", activity);
    return () => {
      observer.disconnect(); resize.disconnect();
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", measure); document.removeEventListener("visibilitychange", activity);
      if (frame) cancelAnimationFrame(frame);
      ctx.revert();
      context?.clearRect(0, 0, width, height);
      ["--art-x", "--art-y", "--art-rx", "--art-ry"].forEach(key => node.style.removeProperty(key));
      delete node.dataset.artQuality;
    };
  }, [scope, reduced, introReady]);

  useScrollScene(root, !reduced && introReady, () => {
    gsap.to(root.current, { "--art-scroll-y": "-48px", "--art-glow-fade": .25, ease: "none",
      scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: .6 } });
  });

  return <motion.div ref={root} className="anime-hero" data-anime-hero
    initial={false} animate="rest" whileHover={reduced ? undefined : "hover"}>
    <TorchReveal scope={scope}><Artwork /></TorchReveal>
    <motion.div className="anime-hover-light anime-edge-mask" aria-hidden="true"
      variants={{ rest: { opacity: .03 }, hover: { opacity: .12 } }} transition={{ duration: .3 }} />
    <div className="anime-mist-overlay anime-edge-mask" aria-hidden="true">
      <span className="anime-mist anime-mist-a" /><span className="anime-mist anime-mist-b" /><span className="anime-mist anime-mist-c" />
    </div>
    <div className="anime-eye-beacon anime-edge-mask" aria-hidden="true">
      <div className="anime-scroll"><div className="anime-parallax"><div className="anime-breath"><div className="anime-ken-burns">
        <div className="anime-cover-plane"><span className="anime-eyes" /></div>
      </div></div></div></div>
    </div>
    <canvas ref={canvas} className="anime-embers anime-edge-mask" aria-hidden="true" />
  </motion.div>;
}
