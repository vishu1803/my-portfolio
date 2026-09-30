"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LoadingScreen from "./components/landing/LoadingScreen";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import SelectedWorks, { ProjectItem } from "./components/landing/SelectedWorks";
import Journal, { JournalArticle } from "./components/landing/Journal";
import Explorations, { ExplorationItem } from "./components/landing/Explorations";
import Stats from "./components/landing/Stats";
import Footer from "./components/landing/Footer";

import ProjectModal from "./components/landing/ProjectModal";
import ArticleModal from "./components/landing/ArticleModal";
import LightboxModal from "./components/landing/LightboxModal";
import ResumeModal from "./components/landing/ResumeModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [selectedExploration, setSelectedExploration] = useState<ExplorationItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-[#4E85BF]/30 selection:text-white">
      {/* Section 1: Loading Screen */}
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
        {/* Navbar */}
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main>
          {/* Section 2: Hero */}
          <Hero
            onContactClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onWorkClick={() => {
              const el = document.getElementById("work");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* Section 3: Selected Works */}
          <SelectedWorks onSelectProject={(p) => setSelectedProject(p)} />

          {/* Section 4: Journal */}
          <Journal onSelectArticle={(a) => setSelectedArticle(a)} />

          {/* Section 5: Explorations (Parallax Gallery) */}
          <Explorations onSelectItem={(item) => setSelectedExploration(item)} />

          {/* Section 6: Stats */}
          <Stats />
        </main>

        {/* Section 7: Contact / Footer */}
        <Footer onOpenResume={() => setResumeOpen(true)} />

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />

        <LightboxModal
          item={selectedExploration}
          onClose={() => setSelectedExploration(null)}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </motion.div>
    </div>
  );
}
