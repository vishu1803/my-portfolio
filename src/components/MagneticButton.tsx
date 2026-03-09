"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
  children: any;
  className?: string;
  intensity?: number;
  radius?: number;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className = "",
  intensity = 0.35, // how strong the magnet pulls
  radius = 120,      // how far around the button the magnet works
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<any>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: any) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      x.set(dx * intensity);
      y.set(dy * intensity);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      type={!href ? type : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        boxShadow: "0 0 0 rgba(0,0,0,0)", // required for animation layout
      }}
      whileHover={{
        boxShadow: "0px 0px 25px rgba(59,130,246,0.5)", // blue glow
      }}
      whileTap={{ scale: 0.95 }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </MotionComponent>
  );
}
