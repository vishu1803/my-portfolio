"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CERTIFICATIONS } from "../../data/certifications";
export default function Certifications() {
  const [issuer, setIssuer] = useState("All");
  if (!CERTIFICATIONS.length) return null;
  const filters = [
    "All",
    ...new Set(CERTIFICATIONS.map((item) => item.issuer)),
  ];
  return (
    <div className="certification-block">
      <h3>Certifications</h3>
      <div role="group" aria-label="Filter certifications">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            aria-pressed={issuer === filter}
            onClick={() => setIssuer(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <motion.div layout className="certification-grid">
        <AnimatePresence>
          {CERTIFICATIONS.filter(
            (item) => issuer === "All" || item.issuer === issuer,
          ).map((item, index) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.03 }}
            >
              <span className="micro-label">
                {item.issuer} {item.date}
              </span>
              <h4>{item.title}</h4>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Credential ↗
                </a>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
