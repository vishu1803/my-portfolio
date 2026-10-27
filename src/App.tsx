"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MotionConfig } from "framer-motion";

import Preloader from "./components/motion/Preloader";
import MotionSystem from "./components/motion/MotionSystem";
import EditorialSubject from "./components/landing/EditorialSubject";
import Navbar from "./components/landing/Navbar";
import VideoReferenceHero from "./components/landing/VideoReferenceHero";
import ProjectCaseStudies from "./components/landing/ProjectCaseStudies";
import EditorialAbout from "./components/landing/EditorialAbout";
import ReferenceSkillInterlude from "./components/landing/ReferenceSkillInterlude";
import ContactPrelude from "./components/landing/ContactPrelude";
import CollaborateSection from "./components/landing/CollaborateSection";
import EditorialFooter from "./components/landing/EditorialFooter";

const ProjectModal = dynamic(
  () => import("./components/landing/ProjectModal"),
  { ssr: false },
);
const ArticleModal = dynamic(
  () => import("./components/landing/ArticleModal"),
  { ssr: false },
);
const ResumeModal = dynamic(() => import("./components/landing/ResumeModal"), {
  ssr: false,
});
import type { ProjectItem } from "./components/landing/SelectedWorks";
import type { JournalArticle } from "./components/landing/Journal";

export default function App() {
  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(
    null,
  );
  const [resumeOpen, setResumeOpen] = useState(false);
  const [loadedDialogs, setLoadedDialogs] = useState({
    resume: false,
    project: false,
    article: false,
  });
  const openResume = () => {
    setLoadedDialogs((previous) => ({ ...previous, resume: true }));
    setResumeOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Preloader>
        <div className="relative min-h-screen bg-[#101014] text-[#FAF8F5] selection:bg-[#FFE600]/30 selection:text-white">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div className="w-full">
            <MotionSystem />
            {/* Editorial chapter navigation */}
            <Navbar onOpenResume={openResume} />

            <main id="main-content" tabIndex={-1}>
              {/* Section 1: Cinematic VOX-Inspired Editorial Hero with Real Portrait & Flashlight Inspector */}
              <VideoReferenceHero onOpenResume={openResume} />

              <EditorialSubject />
              {/* Section 2: Investigative Documentary Project Case Studies */}
              <ProjectCaseStudies
                onSelectProject={(p) => {
                  setLoadedDialogs((previous) => ({
                    ...previous,
                    project: true,
                  }));
                  setSelectedProject(p);
                }}
                onSelectArticle={(a) => {
                  setLoadedDialogs((previous) => ({
                    ...previous,
                    article: true,
                  }));
                  setSelectedArticle(a);
                }}
              />

              <ReferenceSkillInterlude />
              <EditorialAbout onOpenResume={openResume} />
              <ContactPrelude />
              <CollaborateSection onOpenResume={openResume} />
            </main>

            {/* Section 5: Editorial Colophon & Station Telemetry Footer */}
            <EditorialFooter onOpenResume={openResume} />

            {/* Interactive Modals */}
            {loadedDialogs.project && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}

            {loadedDialogs.article && (
              <ArticleModal
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
              />
            )}

            {loadedDialogs.resume && (
              <ResumeModal
                isOpen={resumeOpen}
                onClose={() => setResumeOpen(false)}
              />
            )}
          </div>
        </div>
      </Preloader>
    </MotionConfig>
  );
}
