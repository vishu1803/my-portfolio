"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";

import Header from "./Header";
import Home from "./Home";
import Features from "./Features";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";
import Footer from "./Footer";

const ParticleBackground = lazy(() =>
  import("./components/ParticleBackground")
);

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Detect screen size safely (React 19 compatible)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fade-in once on first load
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={pageLoaded ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <Suspense fallback={null}>
        {!isMobile && <ParticleBackground />}
      </Suspense>

      <Header />
      <Home />
      <Features />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </motion.div>
  );
}
