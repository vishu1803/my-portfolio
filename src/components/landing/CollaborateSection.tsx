"use client";

import { useEffect, useRef, useState, useId } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import PullingHand from "./PullingHand";
import useAccessibleDialog from "../../hooks/useAccessibleDialog";
import useCollaborationRig from "../../hooks/useCollaborationRig";
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  Phone,
  MapPin,
  Code2,
  Download,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface CollaborateSectionProps {
  onOpenResume?: () => void;
}

export default function CollaborateSection({
  onOpenResume,
}: CollaborateSectionProps) {
  const reduced = useReducedMotion();
  const contactId = useId();
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
  const dialogRef = useAccessibleDialog(isOverlayOpen, () =>
    setIsOverlayOpen(false),
  );
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "Full-Stack Web Application",
  });

  const email = "vishwanatnishad@gmail.com";
  const phone = "+91 7905087928";
  const linkedinUrl = "https://linkedin.com/in/vishwanath-nishad";
  const githubUrl = "https://github.com/vishu1803";
  const leetcodeUrl = "https://leetcode.com/u/vishwanatnishad";
  const resumeUrl = "/assets/aistudio/software-vishu_1f0ccd66.pdf";

  useEffect(() => {
    if (!copiedEmail && !copiedPhone) return;
    const timer = window.setTimeout(() => {
      setCopiedEmail(false);
      setCopiedPhone(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [copiedEmail, copiedPhone]);

  const [buttonHovered, setButtonHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const draggedAt = useRef(-Infinity);
  const dragX = useMotionValue(0);
  const rig = useCollaborationRig({
    stage: containerRef,
    hand: handRef,
    strings: stringsGroupRef,
    button: buttonWrapperRef,
    section: sectionRef,
    reduced,
  });
  useMotionValueEvent(dragX, "change", (value) => rig.current?.drag(value));
  useEffect(() => {
    rig.current?.pause(isOverlayOpen || motionPaused);
  }, [isOverlayOpen, motionPaused, reduced, rig]);
  useEffect(() => {
    rig.current?.hover(buttonHovered || dragging);
  }, [buttonHovered, dragging, rig]);
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !containerRef.current)
      return;
    const rect = containerRef.current.getBoundingClientRect();
    rig.current?.aim(
      (event.clientX - rect.left) / rect.width - 0.5,
      (event.clientY - rect.top) / rect.height - 0.5,
    );
  };
  const handlePointerLeave = () => rig.current?.aim(0, 0);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setCopyError("");
    } catch {
      setCopyError(
        "Copy unavailable. Select the email address or open its link.",
      );
    }
  };
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setCopyError("");
    } catch {
      setCopyError(
        "Copy unavailable. Select the phone number or open its link.",
      );
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project Inquiry: ${formState.projectType} from ${formState.name}`,
    );
    const body = encodeURIComponent(
      `Hi Vishwanath,\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\nMessage:\n${formState.message}\n\nSent from your portfolio collaborate desk.`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  // Fixed SVG geometry; GSAP owns decorative transforms, Framer owns the button.

  return (
    <LayoutGroup id={contactId}>
      <section
        id="contact"
        ref={sectionRef}
        aria-labelledby="contact-heading"
        className="editorial-collaborate paper-section"
      >
        <div className="section-rule micro-label">
          <span>04 / An open invitation</span>
          <span>Let’s make something matter</span>
        </div>
        <div className="collab-intro">
          <div>
            <p className="collab-eyebrow micro-label">
              Good work starts with a conversation.
            </p>
            <h2 id="contact-heading" className="collab-headline">
              PULL ME INTO<em>your next chapter.</em>
            </h2>
          </div>
          <p className="collab-side-note">
            A role. An idea. A problem
            <br />
            worth figuring out together.
          </p>
        </div>
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="collab-stage"
        >
          <svg
            viewBox="0 0 1000 410"
            className="collab-illustration"
            aria-hidden="true"
            fill="none"
          >
            <g ref={stringsGroupRef}>
              <path
                className="tension-string"
                d="M442 99C496 87 533 111 599 108"
              />
              <path
                className="tension-string"
                d="M466 139C506 125 546 134 604 129"
              />
              <path
                className="tension-string"
                d="M472 190C525 179 553 161 607 151"
              />
              <path
                className="tension-string"
                d="M439 249C506 223 554 185 615 172"
              />
              <path
                className="tension-string"
                d="M350 241C455 256 538 207 635 187"
              />
            </g>
            <PullingHand ref={handRef} />
          </svg>
          <span
            id={`${contactId}-hint`}
            className="collab-stage-caption micro-label"
          >
            Drag for a little tension.
            <br />
            Click for a conversation.
          </span>
          <div ref={buttonWrapperRef} className="collab-button-wrapper">
            <div className="collab-callouts" aria-hidden="true">
              {["BUILD", "HELLO", "TOGETHER", "LET’S TALK"].map(
                (word, index) => (
                  <motion.span
                    key={word}
                    className={`collab-word collab-word-${index}`}
                    initial={false}
                    animate={
                      buttonHovered || dragging
                        ? {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotate: [-12, 12, -7, 9][index],
                          }
                        : { opacity: 0, y: 12, scale: 0.8, rotate: 0 }
                    }
                    transition={{
                      duration: reduced ? 0 : 0.3,
                      delay: buttonHovered || dragging ? index * 0.035 : 0,
                    }}
                  >
                    {word}
                  </motion.span>
                ),
              )}
            </div>
            <motion.button
              type="button"
              layoutId="contact-surface"
              onClick={() => {
                if (performance.now() - draggedAt.current < 250) return;
                setButtonHovered(false);
                setFormSubmitted(false);
                setIsOverlayOpen(true);
              }}
              onHoverStart={() => setButtonHovered(true)}
              onHoverEnd={() => setButtonHovered(false)}
              onFocus={() => setButtonHovered(true)}
              onBlur={() => setButtonHovered(false)}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: -24, right: 24 }}
              dragElastic={0.12}
              dragSnapToOrigin
              onDragStart={() => {
                draggedAt.current = Infinity;
                setDragging(true);
              }}
              onDragEnd={() => {
                draggedAt.current = performance.now();
                setDragging(false);
              }}
              whileHover={
                reduced ? undefined : { rotateX: -3, rotateY: 2, scale: 1.02 }
              }
              whileTap={{ scale: 0.97 }}
              style={{
                transformPerspective: 900,
                x: dragX,
                touchAction: "pan-y",
              }}
              aria-describedby={`${contactId}-hint`}
              className="collaborate-pill"
              aria-label="Let’s collaborate — open contact details"
              aria-haspopup="dialog"
              aria-expanded={isOverlayOpen}
            >
              <span className="pill-sheen" aria-hidden="true" />
              <span className="pill-dot" aria-hidden="true" />
              <span>LET’S COLLABORATE</span>
              <ArrowUpRight size={23} aria-hidden="true" />
            </motion.button>
          </div>
          <button
            type="button"
            className="collab-motion-toggle micro-label"
            aria-pressed={motionPaused}
            onClick={() => setMotionPaused((value) => !value)}
          >
            {motionPaused ? "Resume tug" : "Pause tug"}
          </button>
          <span className="collab-hand-note micro-label" aria-hidden="true">
            Made for working together ↗
          </span>
        </div>
        <div className="collab-contact-strip">
          <a href={"mailto:" + email}>
            {email}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <div className="micro-label">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <button type="button" onClick={onOpenResume}>
              Résumé ↗
            </button>
          </div>
        </div>
        {/* FULL-SCREEN CONTACT DOSSIER OVERLAY */}
        <AnimatePresence>
          {isOverlayOpen && (
            <motion.div
              layoutRoot
              initial={{ opacity: reduced ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
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
                initial={
                  reduced ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 12 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }
                }
                transition={{
                  layout: {
                    type: "spring",
                    duration: reduced ? 0 : 0.65,
                    bounce: 0.12,
                  },
                  opacity: { duration: reduced ? 0 : 0.2 },
                }}
                onClick={(e) => e.stopPropagation()}
                layoutId="contact-surface"
                className="contact-overlay-panel relative w-full max-w-4xl select-text rounded-3xl bg-[#0E1014] text-[#FAF8F5] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 my-auto overflow-hidden"
              >
                {/* Header Close Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#FFE600]">
                      LET’S MAKE SOMETHING TOGETHER
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOverlayOpen(false)}
                    className="w-11 h-11 shrink-0 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all font-mono text-sm"
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
                      <h3
                        id={`${contactId}-title`}
                        className="text-3xl font-display italic text-white mb-2"
                      >
                        Vishwanath Nishad
                      </h3>
                      <p className="text-sm font-body text-white/70 leading-relaxed">
                        Software engineer based in Gorakhpur, India. Working
                        across web interfaces, backend APIs, and practical
                        full-stack applications.
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
                            <div className="text-[10px] font-mono uppercase text-white/50">
                              Direct Email
                            </div>
                            <a
                              href={`mailto:${email}`}
                              className="text-xs font-mono leading-relaxed text-white hover:underline [overflow-wrap:anywhere] block"
                            >
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
                          {copiedEmail ? (
                            <Check className="w-3.5 h-3.5 text-[#FFE600]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="hidden sm:inline">
                            {copiedEmail ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>

                      {/* Phone Card */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-[#FFE600]/40 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#FFE600] shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase text-white/50">
                              Direct Phone
                            </div>
                            <a
                              href={`tel:${phone}`}
                              className="text-xs font-mono leading-relaxed text-white hover:underline [overflow-wrap:anywhere] block"
                            >
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
                          {copiedPhone ? (
                            <Check className="w-3.5 h-3.5 text-[#FFE600]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span className="hidden sm:inline">
                            {copiedPhone ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>

                      {/* Location Badge */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase text-white/50">
                            Location
                          </div>
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
                      <span>Start a conversation</span>
                      <span className="text-xs font-mono text-muted">
                        Email draft
                      </span>
                    </h4>
                    <p className="text-xs text-white/60 mb-5 leading-relaxed">
                      Prepare an email draft to{" "}
                      <span className="text-[#FFE600] font-mono">{email}</span>.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor={`${contactId}-name`}
                            className="block text-xs font-mono uppercase text-white/60 mb-1.5"
                          >
                            Your Name
                          </label>
                          <input
                            id={`${contactId}-name`}
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                name: e.target.value,
                              })
                            }
                            placeholder="Jane Doe / Engineering Lead"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`${contactId}-email`}
                            className="block text-xs font-mono uppercase text-white/60 mb-1.5"
                          >
                            Your Email
                          </label>
                          <input
                            id={`${contactId}-email`}
                            name="email"
                            type="email"
                            autoComplete="email"
                            spellCheck={false}
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                email: e.target.value,
                              })
                            }
                            placeholder="jane@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`${contactId}-project-type`}
                          className="block text-xs font-mono uppercase text-white/60 mb-1.5"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id={`${contactId}-project-type`}
                          name="project-type"
                          value={formState.projectType}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              projectType: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#14161C] border border-white/10 text-sm text-white focus:outline-none focus:border-[#FFE600] transition-colors font-body"
                        >
                          <option value="Full-Time Software Engineer Role">
                            Full-Time Software Engineer Role
                          </option>
                          <option value="Backend / RESTful API Engineering">
                            Backend / RESTful API Engineering
                          </option>
                          <option value="Full-Stack Web Application">
                            Full-Stack Web Application
                          </option>
                          <option value="AI / LLM System Architecture">
                            AI / LLM System Architecture
                          </option>
                          <option value="General Conversation / Technical Exchange">
                            General Conversation / Technical Exchange
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`${contactId}-message`}
                          className="block text-xs font-mono uppercase text-white/60 mb-1.5"
                        >
                          Message / Details
                        </label>
                        <textarea
                          id={`${contactId}-message`}
                          name="message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              message: e.target.value,
                            })
                          }
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
                      <p className="text-xs leading-relaxed text-white/70">
                        Opens your email app. Review and send the draft there.
                      </p>
                      <p
                        role="status"
                        className="text-xs leading-relaxed text-[#FFE600]"
                      >
                        {formSubmitted
                          ? "Your email draft is ready. Send it in your email app."
                          : copyError ||
                            (copiedEmail
                              ? "Email copied."
                              : copiedPhone
                                ? "Phone number copied."
                                : "")}
                      </p>
                    </form>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
