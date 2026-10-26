"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, BookOpen } from "lucide-react";
import FlashlightReveal from "../interactive/FlashlightReveal";
import ArchitectureCompendiumModal from "./ArchitectureCompendiumModal";
import { JOURNAL_DATA, type JournalArticle } from "./Journal";
import type { ProjectItem } from "./SelectedWorks";
import { CASE_STUDIES } from "../../data/caseStudies";
export { CASE_STUDIES } from "../../data/caseStudies";

interface Props {
  onSelectProject?: (project: ProjectItem) => void;
  onSelectArticle?: (article: JournalArticle) => void;
}

export default function ProjectCaseStudies({ onSelectArticle }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [compendiumOpen, setCompendiumOpen] = useState(false);
  useEffect(() => {
    if (!sectionRef.current || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll(".case-study-item").forEach(item => {
        gsap.from(item, { opacity: 0, y: 28, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true } });
        const image = item.querySelector(".case-image");
        if (image) gsap.from(image, { clipPath: "inset(8% 0 8% 0)", duration: 1,
          scrollTrigger: { trigger: image, start: "top 90%", once: true } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);
  return (
    <section id="case-studies" ref={sectionRef} className="relative bg-[#08090B] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 border-b border-white/20 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#FFE600]">Field notes / Selected work</p>
            <h2 className="font-display text-5xl italic leading-tight sm:text-7xl">Ideas, made <span className="text-outline">tangible.</span></h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">From collaborative tools to creative experiments. The problem, the approach, and the source behind each project.</p>
          </div>
          <motion.button type="button" whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.98 }} onClick={() => setCompendiumOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full border border-white/30 px-5 py-3 font-mono text-xs hover:bg-white hover:text-black">
            <BookOpen aria-hidden="true" size={16} /> Project index <span className="text-muted">({CASE_STUDIES.length})</span>
          </motion.button>
        </div>
        <div className="space-y-14 sm:space-y-24">
          {CASE_STUDIES.map((study, index) => {
            const feature = index % 3 === 0;
            const article = JOURNAL_DATA.find(a => a.id === study.id);
            return (
              <article key={study.id} className="case-study-item relative border-b border-white/15 py-10 sm:py-14" data-case-id={study.id}>
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                  <span className="text-[#FFE600]">{study.chapter}</span><span>{study.category}</span>
                </div>
                <div className={`grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 ${feature ? "" : ""}`}>
                  <div className={`case-image min-w-0 ${feature ? "lg:col-span-12" : `lg:col-span-6 ${index % 2 ? "lg:order-1" : "lg:order-2"}`}`}>
                    <FlashlightReveal radius={220} label="Explore the image / Inspect the notes" className="border border-white/20 bg-black"
                      revealedContent={<div className="flex h-full flex-col justify-center gap-4 bg-[#08090B] p-5 font-mono text-sm sm:p-8"><span className="text-xs uppercase tracking-widest text-[#FFE600]">Behind the project</span><p className="text-xl text-white">{study.focus}</p><p className="leading-relaxed text-white/80">{study.note}</p><p className="text-xs text-[#FFE600]">{study.tech.join(" / ")}</p></div>}>
                      <div className={`relative w-full ${feature ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                        <Image src={study.image} alt={`${study.title} — project interface`} fill sizes={feature ? "(max-width: 1280px) 100vw, 1280px" : "(max-width: 1024px) 100vw, 640px"} className="object-cover" />
                        <div className="pointer-events-none absolute inset-0 border border-inset border-white/5" />
                      </div>
                    </FlashlightReveal>
                  </div>
                  <div className={`min-w-0 space-y-6 ${feature ? "lg:col-span-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:space-y-0" : `lg:col-span-6 ${index % 2 ? "lg:order-2" : "lg:order-1"}`}`}>
                    <div className="space-y-4">
                      <h3 className="font-display text-4xl italic leading-tight sm:text-5xl">{study.title}</h3>
                      <p className="font-mono text-sm text-[#FFE600]">{study.focus}</p>
                      <p className="text-sm leading-relaxed text-muted"><span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#FF8787]">The question</span>{study.problem}</p>
                    </div>
                    <div className="space-y-5">
                      <p className="text-sm leading-relaxed text-muted"><span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#8EC8F0]">The approach</span>{study.solution}</p>
                      <p className="font-mono text-xs leading-relaxed text-white/85">{study.tech.join(" · ")}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                        <button type="button" onClick={() => article && onSelectArticle?.(article)} className="inline-flex items-center gap-1.5 border-b border-[#FFE600] pb-1 text-[#FFE600] hover:text-white">Read project notes <ArrowUpRight aria-hidden="true" size={15} /></button>
                        <a href={study.github} target="_blank" rel="noopener noreferrer" className="border-b border-white/30 pb-1 hover:text-[#FFE600]">Repository ↗</a>
                        {study.liveDemo && <a href={study.liveDemo} target="_blank" rel="noopener noreferrer" className="border-b border-white/30 pb-1 hover:text-[#FFE600]">Live demo ↗</a>}
                      </div>
                      <a href={study.sourceUrl} target="_blank" rel="noopener noreferrer" className="block text-xs text-muted underline decoration-white/30 underline-offset-4 hover:text-white">Source: {study.sourceLabel} ↗</a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <ArchitectureCompendiumModal isOpen={compendiumOpen} onClose={() => setCompendiumOpen(false)} />
    </section>
  );
}
