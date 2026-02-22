"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NUM_PARTICLES = 350;
const RADIUS = 4.2;
const COLORS = [
    "#4F8EF7", // blue
    "#7C5CFC", // purple
    "#E879A8", // pink
    "#38BDF8", // cyan
    "#FBBF24", // gold
    "#818CF8", // indigo
];

function GlobeParticles() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    const baseColors = useMemo(() => COLORS.map((c) => new THREE.Color(c)), []);

    // Pre-calculate per-particle base data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < NUM_PARTICLES; i++) {
            // Fibonacci sphere distribution for even spread
            const phi = Math.acos(-1 + (2 * i) / NUM_PARTICLES);
            const theta = Math.sqrt(NUM_PARTICLES * Math.PI) * phi;

            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.sin(theta) * Math.sin(phi);
            const z = Math.cos(phi);

            // Random rotation
            const rot = new THREE.Euler(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            // Random scale (sizes of confetti) - size kept as requested
            const scale = 0.5 + Math.random() * 0.5;

            // Animation properties for color and size pulsing
            const phase = Math.random() * Math.PI * 2;
            const speed = 0.8 + Math.random() * 2.0; // Increased base speed
            const colorA = Math.floor(Math.random() * COLORS.length);
            let colorB = Math.floor(Math.random() * COLORS.length);
            if (colorA === colorB) colorB = (colorB + 1) % COLORS.length;

            temp.push({
                x, y, z,
                baseX: x, baseY: y, baseZ: z,
                rot, scale, phase, speed, colorA, colorB
            });
        }
        return temp;
    }, []);

    // Initialize instances (colors and base transforms)
    useMemo(() => {
        if (!meshRef.current) return;
        const dummy = new THREE.Object3D();
        // const color = new THREE.Color(); // No longer needed here, handled in useFrame

        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = particles[i];
            dummy.position.set(p.x * RADIUS, p.y * RADIUS, p.z * RADIUS);
            dummy.rotation.copy(p.rot);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
            // Initial color will be set in useFrame, but we need to set a default for the first render
            if (meshRef.current.instanceColor) {
                meshRef.current.setColorAt(i, baseColors[p.colorA]);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [particles, baseColors]);
    useFrame((state) => {
        if (!meshRef.current || !groupRef.current) return;

        const time = state.clock.elapsedTime;
        const dummy = new THREE.Object3D();
        const color = new THREE.Color();

        // 1. Organic completely watery/jelly deformation
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = particles[i];

            // --- Dynamic Size & Color Pulsing ---
            const sizePulse = 0.4 + Math.sin(time * p.speed * 3.0 + p.phase) * 0.6;
            const colorMix = (Math.sin(time * p.speed * 1.5 + p.phase) + 1) / 2;
            color.lerpColors(baseColors[p.colorA], baseColors[p.colorB], colorMix);

            color.offsetHSL(0, 0.4, 0.15);
            meshRef.current.setColorAt(i, color);

            // --- Subtle buzzing drift ---
            const driftX = Math.sin(time * 1.5 + p.phase) * 0.05;
            const driftY = Math.cos(time * 1.8 + p.phase) * 0.05;
            const driftZ = Math.sin(time * 1.3 + p.phase) * 0.05;

            // --- Stable Water Wave Motion ---
            const freq = 1.2;
            const waveSpeed = 1.6;

            const wavePrimaryPhase = Math.sin(p.baseX * freq + time * waveSpeed) * Math.cos(p.baseY * freq + time * waveSpeed) * Math.sin(p.baseZ * freq + time * waveSpeed);
            const wavePrimaryAmp = 0.5;
            const wavePrimary = wavePrimaryPhase * wavePrimaryAmp;

            const waveSecondaryAmp = 0.2;
            const waveSecondarySpeed = 1.2;
            const waveSecondary = Math.sin(time * waveSecondarySpeed) * waveSecondaryAmp;

            // Calculate highly deformed jelly radius
            const currentRadius = RADIUS + wavePrimary + waveSecondary;

            let targetX = p.baseX * currentRadius + driftX;
            let targetY = p.baseY * currentRadius + driftY;
            let targetZ = p.baseZ * currentRadius + driftZ;

            dummy.position.set(targetX, targetY, targetZ);

            // Stable gentle self-rotation drifting
            dummy.rotation.set(
                p.rot.x + time * 0.8 * p.speed,
                p.rot.y + time * 1.2 * p.speed,
                p.rot.z + time * 0.5 * p.speed
            );

            dummy.scale.setScalar(p.scale * Math.max(0.1, sizePulse));
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

        // 2. Global globe rotation (continuous gentle spinning)
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.rotation.x = time * 0.05;

        // 3. Stable Translational floating
        const floatAmp = 0.25;
        const floatSpeedY = 0.8;
        const floatSpeedX = 0.6;

        const floatY = Math.sin(time * floatSpeedY) * floatAmp;
        const floatX = Math.cos(time * floatSpeedX) * floatAmp;

        // 4. Global Mouse Interaction (Globe strictly follows cursor from behind)
        const targetGlobeX = (mouse.x * viewport.width) * 0.35;
        const targetGlobeY = (mouse.y * viewport.height) * 0.35;

        groupRef.current.position.x += (targetGlobeX - groupRef.current.position.x) * 0.03 + floatX * 0.05;
        groupRef.current.position.y += (targetGlobeY - groupRef.current.position.y) * 0.03 + floatY * 0.05;

        // Slight Parallax tilt
        const tiltX = mouse.y * 0.4;
        const tiltY = mouse.x * 0.4;
        groupRef.current.rotation.x += (tiltX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (tiltY - groupRef.current.rotation.y) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, NUM_PARTICLES]}
                frustumCulled={false}
            >
                {/* Confetti/rounded rectangle shape: drastically smaller (1-2mm effect) */}
                <capsuleGeometry args={[0.015, 0.05, 4, 8]} />
                <meshBasicMaterial
                    transparent
                    opacity={0.9}
                    toneMapped={false}
                />
            </instancedMesh>
        </group>
    );
}

export default function HeroGlobe() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
            <Canvas
                camera={{ position: [0, 0, 11], fov: 45 }}
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
            >
                <GlobeParticles />
            </Canvas>
        </div>
    );
}
