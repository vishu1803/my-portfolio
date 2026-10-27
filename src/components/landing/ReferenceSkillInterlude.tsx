"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

const GROUPS = [
  { number: "01", title: "Languages", items: "TypeScript / JavaScript / Python" },
  { number: "02", title: "Interfaces", items: "React / Next.js / Tailwind CSS" },
  { number: "03", title: "Systems", items: "Node.js / REST APIs / Express / FastAPI" },
  { number: "04", title: "Data & tools", items: "PostgreSQL / Prisma / Git / Docker" },
];

export default function ReferenceSkillInterlude() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".interlude-line", {
        y: 42, opacity: 0, stagger: 0.12, duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true }
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="toolkit" aria-labelledby="toolkit-heading" className="relative overflow-hidden bg-[#FFE500] px-5 py-20 text-[#121114] sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-center justify-between border-b border-[#121114]/40 pb-4 font-mono text-[11px] uppercase tracking-[0.19em]">
          <span>Chapter 03 / What I work with</span>
          <span>Tools of the trade</span>
        </div>
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="interlude-line mb-4 font-mono text-xs uppercase tracking-[0.24em]">Engineering is in the details.</p>
            <h2 id="toolkit-heading" className="interlude-line reference-display text-[clamp(4.5rem,11vw,10rem)] uppercase leading-[0.8] tracking-[-0.06em]">
              THE<br />TOOLKIT<span className="text-[#EE4451]">.</span>
            </h2>
          </div>
          <p className="interlude-line self-end max-w-sm border-l-2 border-black pl-5 font-display text-2xl leading-tight lg:col-span-4">
            Technologies are a means to an end. The aim is to build software people can actually use.
          </p>
        </div>
        <div className="grid grid-cols-1 border-t-2 border-black md:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.number} className="interlude-line group flex min-h-[170px] flex-col justify-between gap-5 border-b-2 border-black p-5 transition-colors hover:bg-black hover:text-[#FFE500] sm:p-7">
              <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
                <span>{group.number} / {group.title}</span><span aria-hidden="true">↗</span>
              </div>
              <p className="reference-display text-[clamp(1.65rem,3.3vw,3.3rem)] uppercase leading-none tracking-[-0.035em]">{group.items}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-lg font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em]">
          A working toolkit, not a proficiency scoreboard. For the full story, see the projects and resume.
        </p>
      </div>
    </section>
  );
}
