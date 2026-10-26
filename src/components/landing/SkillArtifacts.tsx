"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const RESUME = "/assets/aistudio/software-vishu_1f0ccd66.pdf";
const GROUPS = [
  { id: "web", label: "Languages & web", note: "The interface and its languages" },
  { id: "backend", label: "APIs & data", note: "Services, persistence and storage" },
  { id: "delivery", label: "Delivery & foundations", note: "Build practices and coursework" },
] as const;
type Group = (typeof GROUPS)[number]["id"];
type Tool = {
  id: string;
  name: string;
  group: Group;
  source: "Resume entry" | "Summary / project" | "Coursework";
  context: string;
  references: string[];
};

const TOOLS: Tool[] = [
  { id: "python", name: "Python", group: "web", source: "Resume entry", context: "Listed among my technical languages and in the AI-Powered Code Review Assistant stack.", references: ["Technical Skills — Languages", "Technical Projects — AI-Powered Code Review Assistant"] },
  { id: "javascript", name: "JavaScript", group: "web", source: "Resume entry", context: "A language listed in my technical skills for web application development.", references: ["Technical Skills — Languages"] },
  { id: "typescript", name: "TypeScript", group: "web", source: "Summary / project", context: "Named in my full-stack summary and the Collaborative Task Manager project stack.", references: ["Professional Summary", "Technical Projects — Collaborative Task Manager"] },
  { id: "react", name: "React", group: "web", source: "Summary / project", context: "Named in my summary as part of the stack connecting responsive interfaces with backend APIs.", references: ["Professional Summary"] },
  { id: "next", name: "Next.js", group: "web", source: "Summary / project", context: "Named in my summary and the Collaborative Task Manager stack.", references: ["Professional Summary", "Technical Projects — Collaborative Task Manager"] },
  { id: "node", name: "Node.js", group: "web", source: "Summary / project", context: "Used for RESTful CRUD APIs in the Collaborative Task Manager description.", references: ["Professional Summary", "Technical Projects — Collaborative Task Manager"] },
  { id: "tailwind", name: "Tailwind CSS", group: "web", source: "Resume entry", context: "Listed under Frontend & Web in my technical skills.", references: ["Technical Skills — Frontend & Web"] },
  { id: "fastapi", name: "FastAPI", group: "backend", source: "Resume entry", context: "Listed in Backend & APIs. The code-review project describes asynchronous FastAPI endpoints for GitHub webhooks.", references: ["Technical Skills — Backend & APIs", "Technical Projects — AI-Powered Code Review Assistant"] },
  { id: "fastify", name: "Fastify", group: "backend", source: "Resume entry", context: "Included in the backend and API toolkit recorded in my resume.", references: ["Technical Skills — Backend & APIs"] },
  { id: "flask", name: "Flask", group: "backend", source: "Resume entry", context: "Listed in Backend & APIs and named as the backend of the code-review assistant.", references: ["Technical Skills — Backend & APIs", "Technical Projects — AI-Powered Code Review Assistant"] },
  { id: "express", name: "Express.js", group: "backend", source: "Summary / project", context: "Included in the Collaborative Task Manager stack alongside TypeScript, Next.js, Prisma and PostgreSQL.", references: ["Technical Projects — Collaborative Task Manager"] },
  { id: "postgres", name: "PostgreSQL", group: "backend", source: "Resume entry", context: "Listed in Databases & ORMs and both core project stacks. The task-manager description includes query optimization.", references: ["Technical Skills — Databases & ORMs", "Technical Projects — Collaborative Task Manager", "Technical Projects — AI-Powered Code Review Assistant"] },
  { id: "prisma", name: "Prisma ORM", group: "backend", source: "Resume entry", context: "Named in the database toolkit and the task-manager RESTful CRUD API implementation.", references: ["Technical Skills — Databases & ORMs", "Technical Projects — Collaborative Task Manager"] },
  { id: "drizzle", name: "Drizzle ORM", group: "backend", source: "Resume entry", context: "Included in the Databases & ORMs section of my resume.", references: ["Technical Skills — Databases & ORMs"] },
  { id: "redis", name: "Redis", group: "backend", source: "Resume entry", context: "Listed in the database toolkit and the AI-Powered Code Review Assistant stack.", references: ["Technical Skills — Databases & ORMs", "Technical Projects — AI-Powered Code Review Assistant"] },
  { id: "actions", name: "GitHub Actions", group: "delivery", source: "Resume entry", context: "Recorded under Cloud, DevOps & Systems in my technical skills.", references: ["Technical Skills — Cloud, DevOps & Systems"] },
  { id: "compose", name: "Docker Compose", group: "delivery", source: "Resume entry", context: "Recorded alongside GitHub Actions in the Cloud, DevOps & Systems toolkit.", references: ["Technical Skills — Cloud, DevOps & Systems"] },
  { id: "c", name: "C", group: "delivery", source: "Coursework", context: "Part of my Electronics Engineering coursework at Rajkiya Engineering College.", references: ["Education — Relevant Coursework"] },
];

export default function SkillArtifacts() {
  const [group, setGroup] = useState<Group>("web");
  const [selectedId, setSelectedId] = useState<string | null>("python");
  const panelId = useId();
  const reducedMotion = useReducedMotion();
  const visibleTools = TOOLS.filter((tool) => tool.group === group);
  const currentGroup = GROUPS.find((item) => item.id === group)!;

  return (
    <section id="skills" aria-labelledby={`${panelId}-heading`} className="relative border-y border-white/10 bg-[#08090B] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/15 pb-8">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#FFE600]">Working index / 03</p>
            <h3 id={`${panelId}-heading`} className="font-display text-4xl italic leading-tight text-[#FAF8F5] sm:text-6xl">Engineering toolkit.</h3>
          </div>
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-b border-[#FFE600]/60 pb-2 font-mono text-xs text-[#FFE600] transition-colors hover:text-white">
            Read the source resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter toolkit by discipline">
          {GROUPS.map((item) => (
            <button key={item.id} type="button" aria-pressed={group === item.id}
              onClick={() => { setGroup(item.id); setSelectedId(TOOLS.find((tool) => tool.group === item.id)?.id || null); }}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-left font-mono text-xs transition-colors ${group === item.id ? "border-[#FFE600] bg-[#FFE600] text-[#08090B]" : "border-white/20 text-white/80 hover:border-white/60 hover:text-white"}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
              <span>{currentGroup.note}</span><span>{String(visibleTools.length).padStart(2, "0")} entries</span>
            </div>
            <ul className="border-t border-white/20">
              {visibleTools.map((tool, index) => {
                const selected = selectedId === tool.id;
                return (
                  <li key={tool.id} className="border-b border-white/15">
                    <button type="button" aria-expanded={selected} aria-controls={`${panelId}-${tool.id}`}
                      onClick={() => setSelectedId(selected ? null : tool.id)}
                      className={`group flex min-h-16 w-full items-center gap-4 py-4 text-left transition-colors ${selected ? "text-[#FFE600]" : "text-[#FAF8F5] hover:text-[#FFE600]"}`}>
                      <span className="w-6 shrink-0 font-mono text-[10px] text-white/50">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1 break-words text-lg font-medium sm:text-xl">{tool.name}</span>
                      <span className="shrink-0 font-mono text-xl" aria-hidden="true">{selected ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.div id={`${panelId}-${tool.id}`} key={tool.id}
                          initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.18 }}
                          className="mb-5 ml-0 border-l-2 border-[#FFE600]/60 bg-white/[0.025] p-4 sm:ml-10 sm:p-5">
                          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#89AACC]">{tool.source}</p>
                          <p className="text-sm leading-relaxed text-white/85">{tool.context}</p>
                          <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-widest text-white/60">Where it appears</p>
                          <ul className="space-y-2 text-xs leading-relaxed text-white/75">
                            {tool.references.map((reference) => <li key={reference} className="flex gap-2"><span aria-hidden="true" className="text-[#FFE600]">↳</span><span>{reference}</span></li>)}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="relative min-w-0 self-start border border-white/15 p-6 sm:p-9">
            <div className="absolute -left-px -top-px h-7 w-7 border-l-2 border-t-2 border-[#FFE600]" aria-hidden="true" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Reading the index</p>
            <p className="mb-8 mt-5 font-display text-4xl italic leading-[1.1] text-[#FAF8F5] sm:text-5xl">Tools, with<br /><span className="text-[#FFE600]">their context.</span></p>
            <p className="text-sm leading-relaxed text-white/75">Each entry points back to the supplied resume. Open a tool to see whether it appears in the skills list, a project description, or coursework.</p>
            <dl className="mt-8 space-y-5 border-t border-white/15 pt-6 text-xs leading-relaxed">
              <div><dt className="mb-1 font-mono uppercase tracking-wider text-[#FFE600]">Resume entry</dt><dd className="text-white/70">Listed in the technical skills section.</dd></div>
              <div><dt className="mb-1 font-mono uppercase tracking-wider text-[#89AACC]">Summary / project</dt><dd className="text-white/70">Named in the professional summary or a project stack.</dd></div>
              <div><dt className="mb-1 font-mono uppercase tracking-wider text-white/90">Coursework</dt><dd className="text-white/70">Studied as part of the degree curriculum.</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}