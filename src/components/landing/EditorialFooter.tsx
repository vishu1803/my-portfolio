"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Code2, Mail, Phone, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface EditorialFooterProps {
  onOpenResume?: () => void;
}

export default function EditorialFooter({ onOpenResume }: EditorialFooterProps) {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in IST (Gorakhpur, India)
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLocalTime(`${formatted} IST (UTC+5:30)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  const email = "vishwanatnishad@gmail.com";
  const phone = "+91 7905087928";
  const resumeUrl = "/assets/aistudio/software-vishu_1f0ccd66.pdf";

  return (
    <footer className="relative w-full bg-[#060709] text-[#FAF8F5] pt-16 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/10 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none film-grain opacity-[0.03]" />

      <div className="max-w-[1280px] mx-auto space-y-12">
        {/* Top Colophon Line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]" />
              <span className="text-xs font-mono tracking-widest text-[#FFE600] uppercase">
                COLOPHON // PERSONAL PORTFOLIO
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display italic text-white">
              Vishwanath Nishad
            </h3>
            <p className="text-xs font-mono text-muted mt-1">
              Full-Stack Software Engineer &bull; Gorakhpur, India [26.7606° N, 83.3732° E]
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenResume) onOpenResume();
                else window.open(resumeUrl, "_blank");
              }}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Resume Dossier (PDF)</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-all flex items-center gap-1.5 hover:border-[#FFE600]/40"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Navigation & Network Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <div className="text-muted uppercase tracking-wider text-[11px] mb-3">
              Direct Contact
            </div>
            <div className="space-y-2">
              <div>
                <a href={`mailto:${email}`} className="text-white hover:text-[#FFE600] transition-colors truncate block">
                  {email}
                </a>
              </div>
              <div>
                <a href={`tel:${phone}`} className="text-white hover:text-[#FFE600] transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider text-[11px] mb-3">
              Profile Links
            </div>
            <div className="space-y-2">
              <div>
                <a
                  href="https://github.com/vishu1803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>GitHub (@vishu1803)</span>
                </a>
              </div>
              <div>
                <a
                  href="https://linkedin.com/in/vishwanath-nishad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <FaLinkedin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div>
                <a
                  href="https://leetcode.com/u/vishwanatnishad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FFE600] transition-colors flex items-center gap-1"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>LeetCode (300+ Solved)</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider text-[11px] mb-3">
              Station Telemetry
            </div>
            <div className="space-y-1.5 text-white/70">
              <div>Station: Gorakhpur, IN</div>
              <div suppressHydrationWarning>Local Time: {localTime || "Loading..."}</div>
              <div className="flex items-center gap-1.5 text-[#FFE600]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse" />
                <span>Available for Full-Time Roles</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-muted uppercase tracking-wider text-[11px] mb-3">
              Architecture &amp; Stack
            </div>
            <div className="space-y-1.5 text-white/70">
              <div>Next.js 16 (Turbopack)</div>
              <div>GSAP + ScrollTrigger</div>
              <div>Framer Motion Interaction</div>
              <div>Tailwind CSS + SVG Mask Torch</div>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Integrity */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-muted">
          <div suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Vishwanath Nishad. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="stamp-box px-2 py-0.5 border-white/20 text-white/70">
              ORIGINAL EDITORIAL SPEC
            </span>
            <span>RESUME &amp; PROJECT SOURCES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
