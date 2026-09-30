"use client";

import Image from "next/image";

interface ProjectMockupFrameProps {
  image: string;
  title: string;
  urlHost: string;
  badge?: string;
  badgeColor?: string;
  aspect?: string;
  className?: string;
}

export default function ProjectMockupFrame({
  image,
  title,
  urlHost,
  badge = "ACTIVE",
  badgeColor = "text-[#34D399]",
  aspect = "aspect-[16/10]",
  className = "",
}: ProjectMockupFrameProps) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0A0B0E] shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-[#89AACC]/40 group-hover:shadow-[0_16px_40px_rgba(137,170,204,0.18)] ${className}`}
    >
      {/* Top Window Chrome Bar */}
      <div className="px-3.5 py-2.5 bg-[#101217] border-b border-white/[0.08] flex items-center justify-between gap-3 select-none">
        {/* Window action dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/40" />
        </div>

        {/* URL Pill */}
        <div className="flex-1 max-w-[280px] sm:max-w-[340px] mx-auto px-3 py-1 rounded-md bg-black/50 border border-white/[0.06] flex items-center justify-center gap-1.5 text-[10px] font-mono text-muted/80 truncate">
          <span className="text-[9px] text-[#34D399]">🔒</span>
          <span className="truncate">{urlHost}</span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className={`hidden sm:inline ${badgeColor} uppercase tracking-wider font-semibold text-[9px]`}>
            {badge}
          </span>
        </div>
      </div>

      {/* Screen Viewport with Project Screenshot */}
      <div className={`relative w-full ${aspect} bg-[#060709] overflow-hidden`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority
          referrerPolicy="no-referrer"
        />

        {/* Subtle glass reflection / gloss gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none opacity-50 group-hover:opacity-75 transition-opacity" />

        {/* Delicate inner shadow frame for realistic display depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none" />
      </div>
    </div>
  );
}
