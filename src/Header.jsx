import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

// ============ 3D LOGO MESH (Allowed inside Canvas only) ============
function VNLogoMesh() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.scene.rotation.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <Text
      fontSize={2}
      color="white"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.05}
      outlineColor="#3b82f6"
    >
      VN
    </Text>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = window.innerWidth < 768; // disable 3D on mobile

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-gray-900/70 shadow-lg z-50 border-b border-white/10">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">

        {/* ===================== LOGO ===================== */}
        {!isMobile ? (
          // Desktop 3D Logo
          <div className="relative z-50 w-16 h-16 md:w-20 md:h-20 overflow-hidden">
            <Canvas
              camera={{ position: [0, 0, 5] }}
              dpr={[1, 2]}
              className="!absolute top-0 left-0 w-full h-full"
            >
              <ambientLight intensity={1.5} />
              <directionalLight position={[2, 2, 5]} intensity={2} />
              <OrbitControls enableZoom={false} enableRotate={true} />
              <VNLogoMesh />
            </Canvas>
          </div>
        ) : (
          // Mobile static logo
          <div className="text-white text-3xl font-extrabold tracking-wide">
            VN
          </div>
        )}

        {/* ===================== DESKTOP NAV ===================== */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-white text-lg font-semibold">
            {["Home", "Features", "Projects", "Resume", "Contact"].map((section) => (
              <li key={section}>
                <ScrollLink
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="cursor-pointer hover:text-blue-400 transition"
                >
                  {section}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ===================== MOBILE MENU ICON ===================== */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer z-[60] p-2 bg-gray-900/50 rounded-md backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* ===================== MOBILE SIDEBAR ===================== */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-xl z-[55] flex flex-col items-center justify-center space-y-8 md:hidden"
            >
              {["Home", "Features", "Projects", "Resume", "Contact"].map((section) => (
                <ScrollLink
                  key={section}
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-blue-400 transition cursor-pointer"
                >
                  {section}
                </ScrollLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
