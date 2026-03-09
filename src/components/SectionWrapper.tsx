"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

    return (
        <motion.section
            ref={ref}
            id={id}
            className={className}
            style={{ opacity, y }}
        >
            {children}
        </motion.section>
    );
}
