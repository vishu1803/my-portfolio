"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "./components/landing/LoadingScreen";
import Navbar from "./components/landing/Navbar";
import EditorialHero from "./components/landing/EditorialHero";
import ProjectCaseStudies from "./components/landing/ProjectCaseStudies";
import EditorialAbout from "./components/landing/EditorialAbout";
import Explorations from "./components/landing/Explorations";
import CollaborateSection from "./components/landing/CollaborateSection";
import EditorialFooter from "./components/landing/EditorialFooter";

import ProjectModal from "./components/landing/ProjectModal";
import ArticleModal from "./components/landing/ArticleModal";
import ResumeModal from "./components/landing/ResumeModal";
import { ProjectItem } from "./components/landing/SelectedWorks";
import { JournalArticle } from "./components/landing/Journal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#FAF8F5] selection:bg-[#FFE600]/30 selection:text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Page Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full"
      >
        {/* Floating Pill Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main>
          {/* Section 1: Cinematic VOX-Inspired Editorial Hero with Real Portrait & Flashlight Inspector */}
          <EditorialHero
            onContactClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onWorkClick={() => {
              const el = document.getElementById("case-studies");
              if (el) el.scrollIntoView({ behavior: "smooth" });
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

          {/* Section 4: Visual Explorations (Transformer Lab & Continuous Spectrum) */}
          <Explorations />

          {/* Section 5: Signature "Let's Collaborate" Ivory Section with Hand & Strings */}
          <CollaborateSection onOpenResume={() => setResumeOpen(true)} />
        </main>

        {/* Section 6: Editorial Colophon & Station Telemetry Footer */}
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
      </motion.div>
    </div>
  );
}
