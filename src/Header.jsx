import { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { motion } from "framer-motion";

function VNLogo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="w-20 h-20">
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 5]} intensity={2} />
      <OrbitControls enableZoom={false} enableRotate={true} />
      <motion.group whileHover={{ scale: 1.2 }}>
        <Text fontSize={2} color="white" position={[0, 0, 0]} anchorX="center" anchorY="middle">
          VN
        </Text>
      </motion.group>
    </Canvas>
  );
}

export default function Header() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50 font-bold">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="w-20 h-20">
          <VNLogo3D />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 text-white text-lg font-semibold drop-shadow-md">
            {["Home", "Features", "Projects", "Resume", "Contact"].map((section) => (
              <li key={section}>
                <ScrollLink
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust for fixed header
                  className="cursor-pointer hover:text-blue-400 transition-colors duration-300 drop-shadow-md"
                >
                  {section}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
