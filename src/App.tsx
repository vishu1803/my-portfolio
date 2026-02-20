"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import Header from "./Header";
import Home from "./Home";
import Features from "./Features";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";
import Footer from "./Footer";

const ParticleBackground = lazy(
  () => import("./components/ParticleBackground")
);

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Suspense fallback={null}>
        <ParticleBackground />
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
