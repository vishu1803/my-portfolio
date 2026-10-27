"use client";

import { useEffect, useRef, useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";
import gsap from "gsap";
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Code2, Download, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CollaborateSectionProps {
  onOpenResume?: () => void;
}

export default function CollaborateSection({ onOpenResume }: CollaborateSectionProps) {
  const reduced = useReducedMotion();
  const contactId = useId();
  const pointerSetters = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<SVGGElement>(null);
  const stringsGroupRef = useRef<SVGGElement>(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copyError, setCopyError] = useState("");
  const dialogRef = useAccessibleDialog(isOverlayOpen, () => setIsOverlayOpen(false));
  const [formState, setFormState] = useState({ name: "", email: "", message: "", projectType: "Full-Stack Web Application" });

  const email = "vishwanatnishad@gmail.com";
  const phone = "+91 7905087928";
  const linkedinUrl = "https://linkedin.com/in/vishwanath-nishad";
  const githubUrl = "https://github.com/vishu1803";
  const leetcodeUrl = "https://leetcode.com/u/vishwanatnishad";
  const resumeUrl = "/assets/aistudio/software-vishu_1f0ccd66.pdf";

  useEffect(() => {
    if (!copiedEmail && !copiedPhone) return;
    const timer = window.setTimeout(() => { setCopiedEmail(false); setCopiedPhone(false); }, 2200);
    return () => window.clearTimeout(timer);
  }, [copiedEmail, copiedPhone]);

  // GSAP + ScrollTrigger Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (stringsGroupRef.current) {
        pointerSetters.current = {
          x: gsap.quickTo(stringsGroupRef.current, "x", { duration: 0.25, ease: "power2.out" }),
          y: gsap.quickTo(stringsGroupRef.current, "y", { duration: 0.25, ease: "power2.out" }),
        };
      }
      const paths = section.querySelectorAll<SVGPathElement>(".tension-string");
      
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".collab-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
      .from(".collab-headline", {
        opacity: 0,
        y: 35,
        duration: 1,
      }, "-=0.5")
      .to(paths, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: "power2.inOut",
      }, "-=0.6")
      .from(handRef.current, {
        opacity: 0,
        y: 30,
        x: -20,
        duration: 1.1,
        ease: "back.out(1.4)",
      }, "-=1.0")
      .from(buttonWrapperRef.current, {
        scale: 0.92,
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "elastic.out(1, 0.75)",
      }, "-=0.8");

      // One restrained pull after the entrance, rather than perpetual offscreen motion.
      tl.to(paths, { y: 3, duration: 1.2, repeat: 1, yoyo: true, ease: "sine.inOut", stagger: 0.1 }, "-=0.1")
        .to(handRef.current, { x: -2, y: 4, duration: 1.2, repeat: 1, yoyo: true, ease: "sine.inOut" }, "<");
    }, section);

    return () => { pointerSetters.current = null; ctx.revert(); };
  }, [reduced]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !containerRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerSetters.current?.x(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    pointerSetters.current?.y(((e.clientY - rect.top) / rect.height - 0.5) * 6);
  };
  const handlePointerLeave = () => { pointerSetters.current?.x(0); pointerSetters.current?.y(0); };
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopiedEmail(true); setCopyError(""); }
    catch { setCopyError("Copy unavailable. Select the email address or open its link."); }
  };
  const copyPhone = async () => {
    try { await navigator.clipboard.writeText(phone); setCopiedPhone(true); setCopyError(""); }
    catch { setCopyError("Copy unavailable. Select the phone number or open its link."); }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formState.projectType} from ${formState.name}`);
    const body = encodeURIComponent(`Hi Vishwanath,\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\nMessage:\n${formState.message}\n\nSent from your portfolio collaborate desk.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  // Fixed SVG geometry; GSAP owns decorative transforms, Framer owns the button.
  const px = 0;
  const py = 0;

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#EAE8E2] text-[#121316] py-24 sm:py-28 md:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Editorial paper grain & soft warm ambient lighting */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none film-grain" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFF5D0]/60 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#D8D4C8]/50 to-transparent blur-3xl pointer-events-none" />

      {/* Top Editorial Registration Marks & Coordinates */}
      <div className="max-w-[1200px] mx-auto flex items-center justify-between border-b border-[#121316]/15 pb-4 mb-10 text-[11px] font-mono tracking-widest uppercase text-[#121316]/75">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4B4B]" />
          <span>05 / INVITATION TO COLLABORATE</span>
          <span className="hidden sm:inline text-[#121316]/30">&bull;</span>
          <span className="hidden sm:inline">GORAKHPUR [26.76°N, 83.37°E]</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">SYSTEM ARCHITECTURE &bull; FULL-STACK</span>
          <span className="stamp-box px-2 py-0.5 border-[#121316]/30 text-[#121316]/80 text-[10px]">
            ACTIVE FOR WORK
          </span>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="max-w-[1100px] mx-auto relative flex flex-col items-center justify-center min-h-[430px] sm:min-h-[480px]"
      >

        {/* Large typographic treatment follows the film's editorial invitation. */}
        <div className="relative z-10 w-full max-w-[1000px] mx-auto mb-6 sm:mb-10">
          <p className="collab-eyebrow font-mono text-[11px] uppercase tracking-[0.18em] text-[#121316]/65 mb-3">
            05 / ONE GOOD CONVERSATION CAN START SOMETHING GREAT
          </p>
          <h2 id="contact-heading" className="collab-headline text-left text-[#101113] leading-[0.84]">
            <span className="reference-display block text-[clamp(3.5rem,8.7vw,8.6rem)] uppercase tracking-[-0.055em]">PULL ME INTO</span>
            <span className="font-display italic font-normal block text-[clamp(3.6rem,8.5vw,8.5rem)] tracking-[-0.06em] mt-1">
              your team.
            </span>
          </h2>
        </div>

        {/* Central Graphic Composition: Strings + Hand Pulling the Button */}
        <div className="relative w-full max-w-[650px] h-[270px] sm:h-[320px]">
          {/* SVG Canvas for Tension Strings and Hand Illustration */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 650 360"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for subtle shadows and line gradients */}
            <defs>
              <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Tension Strings: Connecting Hand Knuckles (around x:130, y:210) to Button Left Bottom (around x:260-310, y:95-115) */}
            <g ref={stringsGroupRef} className="transition-transform duration-200">
              {/* String 1 (Thumb tension) */}
              <path
                d={`M 148 185 C ${180 + px} ${165 + py}, ${215 + px * 0.5} ${125 + py * 0.5}, 265 102`}
                stroke="#0E0F12"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="tension-string"
              />
              {/* String 2 (Index finger tension) */}
              <path
                d={`M 154 172 C ${192 + px * 0.8} ${150 + py * 0.8}, ${230 + px * 0.6} ${120 + py * 0.6}, 285 106`}
                stroke="#0E0F12"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="tension-string"
              />
              {/* String 3 (Middle finger tension - primary anchor) */}
              <path
                d={`M 160 162 C ${202 + px} ${140 + py}, ${245 + px * 0.7} ${116 + py * 0.7}, 310 110`}
                stroke="#0E0F12"
                strokeWidth="2.0"
                strokeLinecap="round"
                className="tension-string"
              />
              {/* String 4 (Ring finger tension) */}
              <path
                d={`M 166 156 C ${215 + px * 1.2} ${138 + py * 1.1}, ${265 + px * 0.8} ${122 + py * 0.8}, 335 112`}
                stroke="#0E0F12"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="tension-string"
              />
              {/* String 5 (Pinky tension trail) */}
              <path
                d={`M 172 152 C ${225 + px * 1.1} ${142 + py * 1.1}, ${285 + px * 0.9} ${128 + py * 0.9}, 360 114`}
                stroke="#0E0F12"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                className="tension-string opacity-75"
              />
            </g>

            {/* Authentic Hand-Drawn Black-and-White Ink Illustration of Human Hand (No Emojis!) */}
            <g
              ref={handRef}
              filter="url(#handShadow)"
              className="transition-transform duration-300"
            >
              {/* Black jacket sleeve and light cuff echo the illustrated film reference. */}
              <path d="M -20 219 L 77 206 L 105 286 L -20 316 Z" fill="#101114" stroke="#121316" strokeWidth="2" />
              <path d="M 72 207 L 95 199 L 126 270 L 102 284 Z" fill="#F8F6F1" stroke="#121316" strokeWidth="2" />
              {/* Forearm & Wrist contour */}
              <path
                d="M 40 260 C 65 240, 85 220, 115 205 C 125 200, 135 195, 145 190"
                stroke="#121316"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 55 260 C 78 245, 98 230, 125 218 C 138 212, 150 205, 160 198"
                stroke="#121316"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Hand base fill */}
              <path
                d="M 115 205 C 130 195, 145 185, 155 170 C 165 155, 172 142, 178 135 C 182 130, 188 132, 185 140 C 180 152, 175 165, 170 178 C 168 185, 162 195, 152 208 C 138 220, 115 235, 95 245 Z"
                fill="#F7F6F2"
                stroke="#121316"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Fingers gripping and tensioning the cord loops */}
              {/* Thumb */}
              <path
                d="M 132 190 C 136 178, 144 172, 152 178 C 158 182, 156 192, 148 198 C 140 202, 134 198, 132 190 Z"
                fill="#FAF9F6"
                stroke="#121316"
                strokeWidth="2.4"
              />
              {/* Index finger gripping */}
              <path
                d="M 152 170 C 160 156, 170 148, 176 154 C 180 158, 176 168, 166 176 C 160 180, 154 178, 152 170 Z"
                fill="#FAF9F6"
                stroke="#121316"
                strokeWidth="2.4"
              />
              {/* Middle finger */}
              <path
                d="M 160 160 C 168 146, 178 140, 184 146 C 188 150, 184 160, 174 168 C 168 172, 162 168, 160 160 Z"
                fill="#FAF9F6"
                stroke="#121316"
                strokeWidth="2.4"
              />
              {/* Ring finger */}
              <path
                d="M 168 152 C 176 140, 186 136, 190 142 C 194 146, 190 154, 180 162 C 174 166, 170 160, 168 152 Z"
                fill="#FAF9F6"
                stroke="#121316"
                strokeWidth="2.4"
              />

              {/* Editorial Crosshatch shading on wrist & palm for vintage woodcut/newspaper documentary feel */}
              <path d="M 90 230 L 105 220" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 98 234 L 113 224" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 106 238 L 121 228" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 120 216 L 132 206" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 126 220 L 138 210" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 140 198 L 150 188" stroke="#121316" strokeWidth="1.2" strokeLinecap="round" />
              
              {/* Tension knot highlight */}
              <circle cx="160" cy="168" r="3.5" fill="#121316" />
            </g>
          </svg>


          {/* Hand-lettered fragments appear around the invitation in the reference. */}
          <span aria-hidden="true" className="pointer-events-none absolute left-[8%] top-[5%] -rotate-[8deg] font-mono text-xs font-black uppercase sm:text-base">SHIP</span>
          <span aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[8%] rotate-[10deg] font-mono text-[10px] font-black uppercase sm:text-xl">HELLO</span>
          <span aria-hidden="true" className="pointer-events-none absolute left-[48%] bottom-[14%] rotate-[-6deg] bg-[#FFE600] px-2 py-1 font-mono text-xs font-black uppercase sm:text-lg">TOGETHER</span>
          <span aria-hidden="true" className="pointer-events-none absolute right-[4%] bottom-[12%] rotate-[8deg] font-display text-2xl italic text-[#CA3544] sm:text-4xl">let's talk</span>

          {/* Glossy Jet-Black Pill Button */}
          <div
            ref={buttonWrapperRef}
            className="absolute left-[37%] sm:left-[46%] top-[22%] sm:top-[25%] z-20"
          >
            <motion.button
              type="button"
              onClick={() => { setFormSubmitted(false); setIsOverlayOpen(true); }}
              style={{ perspective: 1000, transformPerspective: 1000 }}
              whileHover={{ scale: 1.025, y: -3, rotateX: -4, rotateY: 5 }}
              whileTap={{ scale: 0.98, y: 0, rotateX: 0, rotateY: 0 }}
              className="group relative inline-flex items-center gap-2.5 sm:gap-4 px-5 sm:px-10 py-4 sm:py-6 rounded-full bg-gradient-to-b from-[#1C1E23] via-[#0E1013] to-[#050607] text-[#FAF8F5] shadow-[0_20px_50px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.25)] border border-[#A84453]/80 ring-[3px] ring-[#A84453]/20 cursor-pointer overflow-hidden transition-[color,background-color,border-color,box-shadow] duration-300"
              aria-label="Hire me — open contact details and start a project"
            >
              {/* Glossy Top Specular Highlight Edge */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Sheen light sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

              {/* Status Indicator */}
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFE600] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFE600]" />
              </span>

              {/* Button Typography */}
              <span className="font-mono text-lg sm:text-3xl whitespace-nowrap font-semibold reference-display tracking-[0.12em] uppercase text-white group-hover:text-[#FFE600] transition-colors duration-200">
                HIRE ME
              </span>

              {/* Arrow Badge */}
              <span className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white text-xs group-hover:bg-[#FFE600] group-hover:text-black group-hover:border-[#FFE600] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </motion.button>

            {/* Subtle drop shadow underneath button */}
            <div className="absolute -bottom-4 inset-x-6 h-6 bg-black/25 blur-lg rounded-full pointer-events-none" />
          </div>
        </div>


        {/* Concise editorial contact strip, without repeated metric cards. */}
        <div className="mt-10 sm:mt-14 w-full border-t border-black/20 pt-5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wide text-[#121316]/75">
          <span>Prefer it plain? &nbsp;
            <a href={"mailto:" + email} className="underline underline-offset-4 hover:text-[#C72C43]">{email}</a>
          </span>
          <div className="flex items-center gap-4">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Résumé (PDF)</a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>



      {/* FULL-SCREEN CONTACT DOSSIER OVERLAY */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOverlayOpen(false)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain"
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${contactId}-title`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl select-text rounded-3xl bg-[#0E1014] text-[#FAF8F5] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 my-auto overflow-hidden"
            >
              {/* Header Close Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FFE600]">
                    COLLABORATION DOSSIER // DIRECT INBOX
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOverlayOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all font-mono text-sm"
                  aria-label="Close dialog"
                  data-dialog-close
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Grid: Direct Channels on Left, Dispatch Message on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 5 Cols: Verified Identity & Direct Channels */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 id={`${contactId}-title`} className="text-3xl font-display italic text-white mb-2">
                      Vishwanath Nishad
                    </h3>
                    <p className="text-sm font-body text-white/70 leading-relaxed">
                      Software Engineer based in Gorakhpur, India. Ready to join engineering teams building reliable, scalable web applications and distributed backend architectures.
                    </p>
                  </div>

                  {/* Channel Cards */}
                  <div className="space-y-3">
                    {/* Email Card with Copy button */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-[#FFE600]/40 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#FFE600] shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono uppercase text-white/50">Direct Email</div>
                          <a href={`mailto:${email}`} className="text-xs sm:text-sm font-mono text-white hover:underline truncate block">
                            {email}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 flex items-center gap-1 shrink-0"
                        title="Copy Email to Clipboard"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#FFE600]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    {/* Phone Card */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-[#FFE600]/40 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#FFE600] shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono uppercase text-white/50">Direct Phone</div>
                          <a href={`tel:${phone}`} className="text-xs sm:text-sm font-mono text-white hover:underline truncate block">
                            {phone}
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={copyPhone}
                        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-mono text-white/80 flex items-center gap-1 shrink-0"
                        title="Copy Phone"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#FFE600]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copiedPhone ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    {/* Location Badge */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase text-white/50">Location</div>
                        <div className="text-xs sm:text-sm font-mono text-white">
                          Gorakhpur, Uttar Pradesh, India
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verified Links */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                    >
                      <FaLinkedin className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 text-white/50" />
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                    >
                      <FaGithub className="w-3.5 h-3.5 text-white" />
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3 text-white/50" />
                    </a>
                    <a
                      href={leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>LeetCode (300+)</span>
                      <ArrowUpRight className="w-3 h-3 text-white/50" />
                    </a>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-[#FFE600]/15 hover:bg-[#FFE600]/25 border border-[#FFE600]/30 text-xs font-mono text-[#FFE600] flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Resume (PDF)</span>
                    </a>
                  </div>
                </div>

                {/* Right 7 Cols: Direct Message Dispatcher Form */}
                <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-7">
                  <h4 className="text-base font-semibold text-white mb-1 flex items-center justify-between">
                    <span>Send a Dispatch</span>
                    <span className="text-xs font-mono text-muted">Prefilled Email Client</span>
                  </h4>
                  <p className="text-xs text-white/60 mb-5 leading-relaxed">
                    Prepare an email draft to <span className="text-[#FFE600] font-mono">{email}</span>.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${contactId}-name`} className="block text-xs font-mono uppercase text-white/60 mb-1.5">Your Name</label>
                        <input
                          id={`${contactId}-name`}
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Jane Doe / Engineering Lead"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                        />
                      </div>
                      <div>
                        <label htmlFor={`${contactId}-email`} className="block text-xs font-mono uppercase text-white/60 mb-1.5">Your Email</label>
                        <input
                          id={`${contactId}-email`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          spellCheck={false}
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${contactId}-project-type`} className="block text-xs font-mono uppercase text-white/60 mb-1.5">Inquiry Type</label>
                      <select
                          id={`${contactId}-project-type`}
                          name="project-type"
                        value={formState.projectType}
                        onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161C] border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                      >
                        <option value="Full-Time Software Engineer Role">Full-Time Software Engineer Role</option>
                        <option value="Backend / RESTful API Engineering">Backend / RESTful API Engineering</option>
                        <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                        <option value="AI / LLM System Architecture">AI / LLM System Architecture</option>
                        <option value="General Conversation / Technical Exchange">General Conversation / Technical Exchange</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${contactId}-message`} className="block text-xs font-mono uppercase text-white/60 mb-1.5">Message / Details</label>
                      <textarea
                          id={`${contactId}-message`}
                          name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about the role, your engineering stack, or problem you are solving..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFE600] transition-colors font-body resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#FFE600] hover:bg-[#FFE600]/90 text-black font-semibold text-sm font-mono tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FFE600]/20"
                    >
                      <span>Start a Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <p className="text-xs leading-relaxed text-white/70">Opens your email app. Review and send the draft there.</p>
                    <p role="status" className="text-xs leading-relaxed text-[#FFE600]">{formSubmitted ? "Your email draft is ready. Send it in your email app." : copyError || (copiedEmail ? "Email copied." : copiedPhone ? "Phone number copied." : "")}</p>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
