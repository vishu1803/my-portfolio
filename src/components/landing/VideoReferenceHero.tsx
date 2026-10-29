'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDownRight, ArrowUpRight, Play } from 'lucide-react';
import { useIntroReady } from '../motion/Preloader';
import { loadScrollTrigger } from '../../hooks/useScrollScene';
import useHeroMotion from '../../hooks/useHeroMotion';
import { HERO_MOTION as M } from '../../config/heroMotion';
import AnimeHero from '../interactive/AnimeHero';
import MotionDebug from '../hero/MotionDebug';
import { LEETCODE_SOLVED } from '../../data/profile';
import './HeroAlive.css';

export default function VideoReferenceHero({ onOpenResume }: { onOpenResume?: () => void }) {
  const root = useRef<HTMLElement>(null);
  const entranceSeen = useRef(false);
  const state = useHeroMotion();
  const introReady = useIntroReady();
  useEffect(() => {
    const node = root.current;
    if (!node || !introReady || !state.ready) return;
    if (state.staticMode) { entranceSeen.current = true; return; }
    const context = gsap.context(() => {
      if (entranceSeen.current) return;
      // One coordinated LineReveal; no independent observer or competing art-parent tween.
      const content = node.querySelectorAll('[data-hero-line]');
      gsap.timeline({ onComplete: () => { entranceSeen.current = true; } })
        .from(content, { yPercent: 105, opacity: 0, duration: .65, stagger: .07, ease: 'power4.out' }, M.entrance.text);
    }, node);
    return () => context.revert();
  }, [introReady, state.ready, state.staticMode]);
  useEffect(() => {
    if (!root.current || state.staticMode || !introReady) return;
    let live = true;
    let context: gsap.Context | undefined;
    let media: gsap.MatchMedia | undefined;
    loadScrollTrigger().then(() => {
      if (!live || !root.current) return;
      context = gsap.context(() => {
        media = gsap.matchMedia();
        media.add('(min-width: 900px) and (min-height: 650px) and (pointer: fine)', () => {
          // Native reduced motion remains unpinned even after the hero-only override.
          if (state.reduced || state.lowPower) return;
          const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${innerHeight * M.scroll.pinVh / 100}`, pin: true, scrub: M.scroll.scrub, invalidateOnRefresh: true } });
          timeline.to(root.current, { '--dolly-scale': M.scroll.zoom, '--dolly-glow': 1, '--dolly-progress': 1, duration: 1, ease: 'none' }, 0)
            .to('.hero-story', { xPercent: -16, opacity: 0, duration: .55, ease: 'none' }, .28)
            .to('.hero-ink-wipe', { scaleX: 1, duration: .22, ease: 'none' }, .78)
            .to('.hero-ink-wipe', { opacity: 0, duration: .06, ease: 'none' }, .96);
          const revealFocusedLink = () => {
            const trigger = timeline.scrollTrigger;
            if (trigger && trigger.progress > .2) { trigger.scroll(trigger.start); trigger.update(); }
          };
          const story = root.current?.querySelector('.hero-story');
          story?.addEventListener('focusin', revealFocusedLink);
          return () => story?.removeEventListener('focusin', revealFocusedLink);
        });
      }, root);
    });
    return () => { live = false; media?.revert(); context?.revert(); };
  }, [introReady, state.staticMode, state.reduced, state.lowPower]);

  return <section id="home" ref={root} className="editorial-hero alive-hero" data-scene="#0b0b0c" data-ink="light" data-hero-static={state.staticMode} aria-labelledby="hero-title">
    <div className="hero-art-stage"><AnimeHero scope={root} staticMode={state.staticMode} ready={introReady && state.ready} limited={state.lowPower || state.reduced} /></div>
    <div className="hero-calm-scrim" aria-hidden="true" />
    <div className="film-grain hero-grain" data-layer="grain" aria-hidden="true" />
    <div className="hero-topline micro-label"><span><i className="status-dot" />A portfolio in five chapters / 2026</span><span>N° 01</span></div>
    <div className="hero-story">
      <p className="hero-kicker micro-label">The person behind the pixels</p>
      <h1 id="hero-title" className="hero-name"><span className="hero-line-clip"><span data-hero-line>Vishwanath</span></span><span className="hero-line-clip"><span className="hero-surname" data-hero-line>Nishad<span className="hero-name-period" aria-hidden="true">.</span></span></span></h1>
      <div className="hero-line-clip"><p className="hero-tagline" data-hero-line>Thoughtful interfaces.<br /><em>Reliable systems underneath.</em></p></div>
      <div className="hero-line-clip"><div className="hero-actions" data-hero-line>
        <motion.a href="#case-studies" whileHover={state.staticMode ? undefined : { y: -3 }} whileTap={state.staticMode ? undefined : { scale: .97 }} className="editorial-link">Explore the work <ArrowDownRight size={19} aria-hidden="true" /></motion.a>
        <motion.button type="button" onClick={onOpenResume} className="editorial-link subtle-link" whileHover={state.staticMode ? undefined : { y: -3 }} whileTap={state.staticMode ? undefined : { scale: .97 }}>Résumé <ArrowUpRight size={16} aria-hidden="true" /></motion.button>
      </div></div>
      <p className="hero-facts micro-label">Full-stack developer · Gorakhpur, India · {LEETCODE_SOLVED}+ LeetCode problems</p>
    </div>
    <div className="hero-footer-strip micro-label">
      <span>Opening — Find the subject<br /><span>Software engineer &amp; full-stack developer</span></span>
      <span>Curious by nature. <em>Engineer by practice.</em><br /><span>TypeScript / Full stack · LeetCode problems · practice</span></span>
      <span className="hero-scroll-cue">Scroll to unfold <ArrowDownRight size={16} aria-hidden="true" /></span>
    </div>
    {state.ready && (state.staticMode || state.override) && <div className="hero-motion-notice"><span>{state.override ? 'Hero motion enabled for this session.' : 'Motion is paused. Turn animations on'}</span><button type="button" onClick={() => state.setOverride(!state.override)}><Play size={14} aria-hidden="true" />{state.override ? 'Pause hero motion' : 'Enable hero for this session'}</button></div>}
    <div className="hero-ink-wipe" aria-hidden="true" />
    <MotionDebug scope={root} state={state} />
  </section>;
}
