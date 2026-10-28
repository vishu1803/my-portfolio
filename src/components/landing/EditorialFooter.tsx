"use client";

import { ArrowUpRight } from "lucide-react";
import { HERO_ART } from "../../data/heroArt";

export default function EditorialFooter({
  onOpenResume,
}: {
  onOpenResume?: () => void;
}) {
  return (
    <footer className="editorial-colophon">
      <div className="colophon-top">
        <div>
          <h2>Vishwanath Nishad</h2>
          <p className="micro-label">Software engineer · Gorakhpur, India</p>
        </div>
        <a href="#home" className="micro-label">
          Back to the beginning <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
      <div className="colophon-bottom micro-label">
        <span>© {new Date().getFullYear()} Vishwanath Nishad</span>
        <span>Built with curiosity. Kept intentional.</span>
        <button
          type="button"
          onClick={onOpenResume}
          className="hover:text-white"
        >
          Résumé (PDF) <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="artwork-credit micro-label">
        <a href={HERO_ART.creditUrl} target="_blank" rel="noopener noreferrer">{HERO_ART.credit}</a>
      </p>
    </footer>
  );
}
