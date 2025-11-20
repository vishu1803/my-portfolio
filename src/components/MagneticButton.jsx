import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  intensity = 0.35, // how strong the magnet pulls
  radius = 120,      // how far around the button the magnet works
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
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

  return (
    <motion.button
      ref={ref}
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
    </motion.button>
  );
}
