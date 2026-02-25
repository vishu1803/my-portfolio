"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLORS = [
    "#4F8EF7", // blue
    "#7C5CFC", // purple
    "#E879A8", // pink
    "#38BDF8", // cyan
    "#FBBF24", // gold
    "#818CF8", // indigo
];

// Mobile-aware config
interface GlobeConfig {
    numParticles: number;
    radius: number;
    capsuleRadial: number;
    capsuleLength: number;
    capSegments: number;
    radialSegments: number;
    wanderScale: number;
    isMobile: boolean;
}

function getGlobeConfig(width: number): GlobeConfig {
    const isMobile = width < 768;
    return {
        numParticles: isMobile ? 150 : 350,
        radius: isMobile ? 3.4 : 4.2,
        capsuleRadial: isMobile ? 0.018 : 0.015,
        capsuleLength: isMobile ? 0.06 : 0.05,
        capSegments: isMobile ? 2 : 4,
        radialSegments: isMobile ? 4 : 8,
        wanderScale: isMobile ? 0.6 : 1.0,
        isMobile,
    };
}

function GlobeParticles({ config }: { config: GlobeConfig }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();
    const frameCount = useRef(0);

    const { numParticles, radius, isMobile, wanderScale } = config;

    const baseColors = useMemo(() => COLORS.map((c) => new THREE.Color(c)), []);

    // Motion state for smooth crawling movement
    const motionState = useRef({
        prevMouseX: 0,
        prevMouseY: 0,
        mouseActivity: 0,
        wanderSeedX: Math.random() * 1000,
        wanderSeedY: Math.random() * 1000,
    });

    // Pre-calculate per-particle base data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < numParticles; i++) {
            const phi = Math.acos(-1 + (2 * i) / numParticles);
            const theta = Math.sqrt(numParticles * Math.PI) * phi;

            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.sin(theta) * Math.sin(phi);
            const z = Math.cos(phi);

            const rot = new THREE.Euler(
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            );

            const scale = 0.5 + Math.random() * 0.5;
            const phase = Math.random() * Math.PI * 2;
            const speed = 0.8 + Math.random() * 2.0;
            const colorA = Math.floor(Math.random() * COLORS.length);
            let colorB = Math.floor(Math.random() * COLORS.length);
            if (colorA === colorB) colorB = (colorB + 1) % COLORS.length;

            temp.push({
                x, y, z,
                baseX: x, baseY: y, baseZ: z,
                rot, scale, phase, speed, colorA, colorB,
            });
        }
        return temp;
    }, [numParticles]);

    // Initialize instances
    useMemo(() => {
        if (!meshRef.current) return;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < numParticles; i++) {
            const p = particles[i];
            dummy.position.set(p.x * radius, p.y * radius, p.z * radius);
            dummy.rotation.copy(p.rot);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
            if (meshRef.current.instanceColor) {
                meshRef.current.setColorAt(i, baseColors[p.colorA]);
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    }, [particles, baseColors, numParticles, radius]);

    useFrame((state) => {
        if (!meshRef.current || !groupRef.current) return;

        const time = state.clock.elapsedTime;
        const dummy = new THREE.Object3D();
        const color = new THREE.Color();
        const ms = motionState.current;
        frameCount.current++;

        // On mobile, update colors every 2nd frame to save GPU
        const shouldUpdateColors = !isMobile || frameCount.current % 2 === 0;

        // 1. Organic watery/jelly deformation
        for (let i = 0; i < numParticles; i++) {
            const p = particles[i];

            const sizePulse = 0.4 + Math.sin(time * p.speed * 3.0 + p.phase) * 0.6;

            if (shouldUpdateColors) {
                const colorMix = (Math.sin(time * p.speed * 1.5 + p.phase) + 1) / 2;
                color.lerpColors(baseColors[p.colorA], baseColors[p.colorB], colorMix);
                color.offsetHSL(0, 0.4, 0.15);
                meshRef.current.setColorAt(i, color);
            }

            const driftX = Math.sin(time * 1.5 + p.phase) * 0.05;
            const driftY = Math.cos(time * 1.8 + p.phase) * 0.05;
            const driftZ = Math.sin(time * 1.3 + p.phase) * 0.05;

            const freq = 1.2;
            const waveSpeed = 1.6;

            const wavePrimaryPhase = Math.sin(p.baseX * freq + time * waveSpeed) * Math.cos(p.baseY * freq + time * waveSpeed) * Math.sin(p.baseZ * freq + time * waveSpeed);
            const wavePrimary = wavePrimaryPhase * 0.5;

            const waveSecondary = Math.sin(time * 1.2) * 0.2;
            const currentRadius = radius + wavePrimary + waveSecondary;

            dummy.position.set(
                p.baseX * currentRadius + driftX,
                p.baseY * currentRadius + driftY,
                p.baseZ * currentRadius + driftZ
            );

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
        if (shouldUpdateColors && meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true;
        }

        // 2. Global globe rotation
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.rotation.x = time * 0.05;

        // ===== 3. CRAWLING MOVEMENT SYSTEM =====

        const curMouseX = mouse.x * viewport.width;
        const curMouseY = mouse.y * viewport.height;
        const mouseDeltaX = curMouseX - ms.prevMouseX;
        const mouseDeltaY = curMouseY - ms.prevMouseY;
        const mouseSpeed = Math.sqrt(mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY);

        if (mouseSpeed > 0.01) {
            ms.mouseActivity = Math.min(1, ms.mouseActivity + 0.08);
        } else {
            ms.mouseActivity = Math.max(0, ms.mouseActivity - 0.012);
        }

        ms.prevMouseX = curMouseX;
        ms.prevMouseY = curMouseY;

        const cursorTargetX = curMouseX * 0.35;
        const cursorTargetY = curMouseY * 0.35;

        // Idle random wander — scaled down on mobile
        const ws = wanderScale;
        const wanderX =
            Math.sin(time * 0.15 + ms.wanderSeedX) * 1.8 * ws +
            Math.sin(time * 0.37 + ms.wanderSeedX * 2.1) * 0.9 * ws +
            Math.cos(time * 0.23 + ms.wanderSeedX * 0.7) * 0.6 * ws;
        const wanderY =
            Math.cos(time * 0.13 + ms.wanderSeedY) * 1.4 * ws +
            Math.sin(time * 0.31 + ms.wanderSeedY * 1.8) * 0.7 * ws +
            Math.cos(time * 0.19 + ms.wanderSeedY * 0.5) * 0.5 * ws;

        const activity = ms.mouseActivity;
        const targetX = cursorTargetX * activity + wanderX * (1 - activity);
        const targetY = cursorTargetY * activity + wanderY * (1 - activity);

        // Slow crawling lerp
        const crawlSpeed = 0.025;
        groupRef.current.position.x += (targetX - groupRef.current.position.x) * crawlSpeed;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * crawlSpeed;

        // Gentle floating oscillation
        groupRef.current.position.x += Math.cos(time * 0.6) * 0.003;
        groupRef.current.position.y += Math.sin(time * 0.8) * 0.003;

        // Slight parallax tilt
        const tiltStrength = 0.12;
        const targetTiltX = groupRef.current.position.y * tiltStrength;
        const targetTiltY = groupRef.current.position.x * tiltStrength;
        groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.y += (targetTiltY - groupRef.current.rotation.y) * 0.05;
    });

    return (
        <group ref={groupRef}>
            <instancedMesh
                ref={meshRef}
                args={[undefined, undefined, numParticles]}
                frustumCulled={false}
            >
                <capsuleGeometry args={[config.capsuleRadial, config.capsuleLength, config.capSegments, config.radialSegments]} />
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
    const [config, setConfig] = useState<GlobeConfig | null>(null);

    useEffect(() => {
        setConfig(getGlobeConfig(window.innerWidth));
    }, []);

    // Don't render until we know the screen size (avoids hydration mismatch)
    if (!config) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
            <Canvas
                camera={{ position: [0, 0, config.isMobile ? 13 : 11], fov: 45 }}
                dpr={[1, config.isMobile ? 1.5 : 2]}
                gl={{ alpha: true, antialias: !config.isMobile }}
            >
                <GlobeParticles config={config} />
            </Canvas>
        </div>
    );
}
