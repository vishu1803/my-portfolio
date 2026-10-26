"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";

import Navbar from "./components/landing/Navbar";
import EditorialHero from "./components/landing/EditorialHero";
import ProjectCaseStudies from "./components/landing/ProjectCaseStudies";
import EditorialAbout from "./components/landing/EditorialAbout";
import CollaborateSection from "./components/landing/CollaborateSection";
import EditorialFooter from "./components/landing/EditorialFooter";

import ProjectModal from "./components/landing/ProjectModal";
import ArticleModal from "./components/landing/ArticleModal";
import ResumeModal from "./components/landing/ResumeModal";
import { ProjectItem } from "./components/landing/SelectedWorks";
import { JournalArticle } from "./components/landing/Journal";

export default function App() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#08090B] text-[#FAF8F5] selection:bg-[#FFE600]/30 selection:text-white">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="w-full">
          {/* Floating Pill Navbar */}
          <Navbar onOpenResume={() => setResumeOpen(true)} />

          <main id="main-content" tabIndex={-1}>
            {/* Section 1: Cinematic VOX-Inspired Editorial Hero with Real Portrait & Flashlight Inspector */}
            <EditorialHero
              onContactClick={() => {
                const el = document.getElementById("contact");
                if (el) {
                  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  el.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
                }
              }}
              onWorkClick={() => {
                const el = document.getElementById("case-studies");
                if (el) {
                  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  el.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
                }
              }}
              onOpenResume={() => setResumeOpen(true)}
            />

            {/* Section 2: Investigative Documentary Project Case Studies */}
            <ProjectCaseStudies
              onSelectProject={(p) => setSelectedProject(p)}
              onSelectArticle={(a) => setSelectedArticle(a)}
            />

            {/* Section 3: Personnel Dossier & Verified Resume Experience & Skills */}
            <EditorialAbout onOpenResume={() => setResumeOpen(true)} />

            {/* Section 4: Signature "Let's Collaborate" Standalone Ivory Section with Hand & Strings */}
            <CollaborateSection onOpenResume={() => setResumeOpen(true)} />
          </main>

          {/* Section 5: Editorial Colophon & Station Telemetry Footer */}
          <EditorialFooter onOpenResume={() => setResumeOpen(true)} />

          {/* Interactive Modals */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />

          <ResumeModal
            isOpen={resumeOpen}
            onClose={() => setResumeOpen(false)}
          />
        </div>
      </div>
    </MotionConfig>
  );
}
