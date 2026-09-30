"use client";

import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    value: "4+",
    label: "Years Experience",
    sublabel: "Distributed Architecture & Full Stack",
  },
  {
    value: "25+",
    label: "Projects Shipped",
    sublabel: "From Architectural Spec to Launch",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    sublabel: "High-Velocity Engineering Standards",
  },
];

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-b border-stroke/60 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke/60">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`flex flex-col items-center text-center ${
                idx > 0 ? "pt-8 md:pt-0 md:pl-8" : ""
              }`}
            >
              {/* Stat Value */}
              <span className="text-6xl sm:text-7xl md:text-8xl font-display text-text-primary tabular-nums tracking-tight leading-none mb-3">
                {stat.value}
              </span>

              {/* Label */}
              <h3 className="text-base sm:text-lg font-medium text-text-primary mb-1">
                {stat.label}
              </h3>

              {/* Sublabel */}
              <p className="text-xs text-muted uppercase tracking-[0.18em] font-mono max-w-[220px]">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
