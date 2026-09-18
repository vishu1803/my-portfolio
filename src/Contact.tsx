"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaCopy,
  FaCheck,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
  FaExternalLinkAlt,
} from "react-icons/fa";
import SectionWrapper from "./components/SectionWrapper";

const ease = [0.25, 0.1, 0, 1] as const;

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [draftSubject, setDraftSubject] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [draftName, setDraftName] = useState("");
  const [draftCopied, setDraftCopied] = useState(false);

  const email = "vishwanatnishad@gmail.com";
  const phone = "+91 7905087928";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(
      draftSubject.trim() || `Inquiry from ${draftName || "Potential Partner"}`
    );
    const body = encodeURIComponent(
      `Hello Vishwanath,\n\n${draftMessage || "I came across your portfolio and would love to discuss an opportunity."}\n\nBest regards,\n${draftName || "A Collaborator"}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const text = `To: ${email}\nSubject: ${draftSubject || "Inquiry"}\n\n${draftMessage}\n\nFrom: ${draftName}`;
    navigator.clipboard.writeText(text);
    setDraftCopied(true);
    setTimeout(() => setDraftCopied(false), 2500);
  };

  return (
    <SectionWrapper
      id="contact"
      className="min-h-screen bg-transparent text-white py-28 px-5 sm:px-6 md:px-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Deep space celestial ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(14, 165, 233, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      <motion.div
        className="text-center mb-16 relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          Direct Executive Connect
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Initiate a Dialogue
        </h2>
        <p className="mt-4 text-[#8b8b9e] text-[15px] leading-relaxed max-w-lg mx-auto">
          Direct, friction-free communication. Reach out directly for senior
          engineering roles, architectural consulting, or technological collaborations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto relative z-10">
        {/* Left Column: Celestial Identity & Quick Access Card (5 cols) */}
        <motion.div
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          {/* Main Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-slate-950/70 backdrop-blur-xl p-7 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/15 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold bg-gradient-to-br from-sky-400 to-blue-700 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
                VN
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Vishwanath Nishad
                </h3>
                <p className="text-[13px] text-sky-300 font-mono">
                  Full Stack & Backend Engineer
                </p>
              </div>
            </div>

            <p className="text-[#8b8b9e] text-[14px] leading-relaxed mb-6">
              Specialized in production distributed systems, robust APIs, and
              deliberate user interfaces. Ready to contribute to high-velocity
              teams and ambitious projects.
            </p>

            {/* Availability Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-[12px] font-medium text-emerald-300">
                  Open for Opportunities
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8b8b9e]">IST (UTC+5:30)</span>
            </div>

            {/* Quick Contact Buttons */}
            <div className="space-y-3">
              {/* Email One-Click Copy / Open */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#4f8ef7]/40 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden mr-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/15 flex items-center justify-center text-[#4f8ef7] text-sm shrink-0">
                    <FaEnvelope />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] text-[#8b8b9e] font-mono uppercase">Email</p>
                    <p className="text-[13px] font-medium text-white truncate">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-all"
                    title="Copy Email"
                  >
                    {copiedEmail ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  </button>
                  <a
                    href={`mailto:${email}`}
                    className="p-2 rounded-lg bg-[#4f8ef7]/20 hover:bg-[#4f8ef7]/30 text-xs text-[#4f8ef7] transition-all"
                    title="Open Mail Client"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              {/* Phone Quick Dial */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#38bdf8]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/15 flex items-center justify-center text-[#38bdf8] text-sm shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8b8b9e] font-mono uppercase">Phone</p>
                    <p className="text-[13px] font-medium text-white">{phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-all"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  </button>
                  <a
                    href={`tel:${phone}`}
                    className="p-2 rounded-lg bg-[#38bdf8]/20 hover:bg-[#38bdf8]/30 text-xs text-[#38bdf8] transition-all"
                    title="Call Phone"
                  >
                    <FaPhoneAlt />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <a
                href="https://github.com/vishu1803"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center gap-2 text-[13px] text-white transition-all"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center gap-2 text-[13px] text-white transition-all"
              >
                <FaLinkedin className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Instant Dispatch Composer (7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <div className="rounded-3xl border border-white/[0.08] bg-slate-950/70 backdrop-blur-xl p-7 md:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Direct Dispatch Hub
                </h3>
                <p className="text-[12px] text-[#8b8b9e] mt-0.5">
                  Compose your inquiry below for immediate dispatch via your preferred client.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] text-[11px] font-mono text-sky-300 border border-white/[0.08]">
                100% Delivery
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8b8b9e] mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    placeholder="e.g. Acme Labs"
                    className="w-full p-3.5 rounded-xl bg-black/40 text-white text-[14px] border border-white/[0.08] focus:border-sky-400/60 focus:bg-black/60 focus:outline-none transition-all placeholder-[#4a4a5e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#8b8b9e] mb-1.5">
                    Topic / Scope
                  </label>
                  <input
                    type="text"
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    placeholder="e.g. Senior Backend Role"
                    className="w-full p-3.5 rounded-xl bg-black/40 text-white text-[14px] border border-white/[0.08] focus:border-sky-400/60 focus:bg-black/60 focus:outline-none transition-all placeholder-[#4a4a5e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#8b8b9e] mb-1.5">
                  Project Brief or Inquiry Message
                </label>
                <textarea
                  rows={5}
                  value={draftMessage}
                  onChange={(e) => setDraftMessage(e.target.value)}
                  placeholder="Share details regarding the role, tech stack, timeframe, or collaboration objectives..."
                  className="w-full p-3.5 rounded-xl bg-black/40 text-white text-[14px] border border-white/[0.08] focus:border-sky-400/60 focus:bg-black/60 focus:outline-none transition-all placeholder-[#4a4a5e] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Primary Action: Direct Mail Client Trigger */}
                <a
                  href={generateMailto()}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-semibold text-[14px] flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.01] transition-all duration-300"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Launch in Mail Client</span>
                </a>

                {/* Secondary Action: Copy Formatted Draft */}
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="py-3.5 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all"
                >
                  {draftCopied ? (
                    <>
                      <FaCheck className="text-emerald-400" />
                      <span className="text-emerald-300">Draft Copied</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-xs" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {(copiedEmail || copiedPhone || draftCopied) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 text-[12px] flex items-center gap-2"
                  >
                    <FaCheck />
                    <span>
                      {copiedEmail
                        ? "Email address copied to clipboard."
                        : copiedPhone
                        ? "Phone number copied to clipboard."
                        : "Draft message copied! Ready to paste into any messaging platform."}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
