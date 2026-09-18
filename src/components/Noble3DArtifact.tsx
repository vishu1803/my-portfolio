"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type ArtifactMode = "astrolabe" | "monolith" | "vortex";

interface SceneProps {
  mode: ArtifactMode;
  isHovered: boolean;
}

// 1. Concentric Gyroscopic Astrolabe Rings
function AstrolabeRings({ isHovered }: { isHovered: boolean }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const speedMultiplier = isHovered ? 2.2 : 1.0;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.35 * speedMultiplier;
      outerRingRef.current.rotation.x += delta * 0.15 * speedMultiplier;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y -= delta * 0.45 * speedMultiplier;
      midRingRef.current.rotation.z += delta * 0.2 * speedMultiplier;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.55 * speedMultiplier;
      innerRingRef.current.rotation.y += delta * 0.3 * speedMultiplier;
    }
  });

  return (
    <group>
      {/* Outer Gyroscopic Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.5, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.95}
            roughness={0.15}
            emissive="#38bdf8"
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>
        {/* Orbital Marker Nodes */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={`outer-node-${i}`}
            position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0]}
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        ))}
      </group>

      {/* Middle Gyroscopic Ring */}
      <group ref={midRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.0, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#7c5cfc"
            metalness={0.85}
            roughness={0.25}
            emissive="#7c5cfc"
            emissiveIntensity={isHovered ? 0.7 : 0.3}
          />
        </mesh>
        {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map(
          (angle, i) => (
            <mesh
              key={`mid-node-${i}`}
              position={[Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0]}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#e879a8" />
            </mesh>
          )
        )}
      </group>

      {/* Inner Gyroscopic Ring */}
      <group ref={innerRingRef} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            metalness={0.9}
            roughness={0.2}
            emissive="#38bdf8"
            emissiveIntensity={isHovered ? 0.8 : 0.35}
          />
        </mesh>
      </group>
    </group>
  );
}

// 2. Noble Polyhedral Core
function PolyhedralCore({
  mode,
  isHovered,
}: {
  mode: ArtifactMode;
  isHovered: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const glowSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speed = isHovered ? 1.8 : 0.8;

    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.25 * speed;
      coreRef.current.rotation.y = time * 0.35 * speed;
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.setScalar(pulse);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.2 * speed;
      wireframeRef.current.rotation.y = -time * 0.3 * speed;
      const pulseWire = 1 + Math.sin(time * 2 + Math.PI) * 0.04;
      wireframeRef.current.scale.setScalar(pulseWire * 1.18);
    }

    if (glowSphereRef.current) {
      const breath = 0.5 + Math.sin(time * 3) * 0.15;
      glowSphereRef.current.scale.setScalar(breath);
    }
  });

  return (
    <group>
      {/* Inner Radiant Singularity */}
      <mesh ref={glowSphereRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color={mode === "astrolabe" ? "#38bdf8" : mode === "monolith" ? "#60a5fa" : "#818cf8"}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Main Faceted Crystal */}
      <mesh ref={coreRef}>
        {mode === "monolith" ? (
          <octahedronGeometry args={[0.9, 0]} />
        ) : (
          <icosahedronGeometry args={[0.85, 0]} />
        )}
        <meshPhysicalMaterial
          color="#0f172a"
          emissive={mode === "astrolabe" ? "#0284c7" : "#4338ca"}
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          wireframe={false}
          flatShading
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={wireframeRef}>
        {mode === "monolith" ? (
          <octahedronGeometry args={[0.9, 0]} />
        ) : (
          <dodecahedronGeometry args={[0.88, 0]} />
        )}
        <meshBasicMaterial
          color={isHovered ? "#38bdf8" : "#94a3b8"}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

// 3. Orbiting Data Constellations
function ConstellationSatellites({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const satellites = useMemo(
    () => [
      { radius: 2.8, speed: 0.4, yOffset: 0.4, color: "#38bdf8", label: "FullStack" },
      { radius: 3.1, speed: -0.32, yOffset: -0.3, color: "#60a5fa", label: "Systems" },
      { radius: 2.4, speed: 0.55, yOffset: 0.6, color: "#34d399", label: "AI/ML" },
      { radius: 3.4, speed: -0.25, yOffset: -0.5, color: "#818cf8", label: "Cloud" },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const mult = isHovered ? 1.6 : 1.0;

    groupRef.current.children.forEach((child, i) => {
      const sat = satellites[i];
      if (!sat) return;
      const angle = time * sat.speed * mult;
      child.position.x = Math.cos(angle) * sat.radius;
      child.position.z = Math.sin(angle) * sat.radius;
      child.position.y = Math.sin(angle * 2) * sat.yOffset;
    });
  });

  return (
    <group ref={groupRef}>
      {satellites.map((sat, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={sat.color}
              emissive={sat.color}
              emissiveIntensity={1.2}
            />
          </mesh>
          <pointLight color={sat.color} intensity={0.4} distance={2} />
        </group>
      ))}
    </group>
  );
}

// 4. Harmonic Particle Vortex
function ParticleVortex({ mode }: { mode: ArtifactMode }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = mode === "vortex" ? 700 : 350;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#60a5fa"),
      new THREE.Color("#e2e8f0"),
      new THREE.Color("#818cf8"),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.6 + Math.random() * 2.2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.12;
    pointsRef.current.rotation.x += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Root Interactive Scene
function Scene({ mode, isHovered }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#7c5cfc" />
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#38bdf8" distance={6} />

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {mode === "astrolabe" && <AstrolabeRings isHovered={isHovered} />}
        <PolyhedralCore mode={mode} isHovered={isHovered} />
        <ConstellationSatellites isHovered={isHovered} />
        <ParticleVortex mode={mode} />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.8}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Noble3DArtifact() {
  const [mode, setMode] = useState<ArtifactMode>("astrolabe");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-[420px] aspect-square mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Deep Space Glow Aura Backdrop */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/10 via-blue-600/15 to-indigo-600/15 blur-2xl pointer-events-none transition-all duration-700 opacity-80" />

      {/* Elegant Glass Display Housing */}
      <div className="relative w-full h-full rounded-3xl border border-white/[0.08] bg-slate-950/60 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top HUD Status Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] text-[11px] font-mono tracking-wider text-[#8b8b9e] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white/90 font-semibold">QUANTUM CORE</span>
          </div>
          <span className="text-white/40 text-[10px]">DRAG TO ROTATE 360°</span>
        </div>

        {/* 3D Canvas Area */}
        <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            <Scene mode={mode} isHovered={isHovered} />
          </Canvas>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="px-3.5 py-3 border-t border-white/[0.06] bg-black/50 flex items-center justify-between gap-1">
          <button
            type="button"
            onClick={() => setMode("astrolabe")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all duration-300 ${
              mode === "astrolabe"
                ? "bg-sky-500/20 border border-sky-400/50 text-sky-300 shadow-lg shadow-sky-500/10 font-semibold"
                : "text-[#8b8b9e] hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            Astrolabe
          </button>
          <button
            type="button"
            onClick={() => setMode("monolith")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all duration-300 ${
              mode === "monolith"
                ? "bg-blue-500/20 border border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/10 font-semibold"
                : "text-[#8b8b9e] hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            Prism
          </button>
          <button
            type="button"
            onClick={() => setMode("vortex")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all duration-300 ${
              mode === "vortex"
                ? "bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 shadow-lg shadow-indigo-500/10 font-semibold"
                : "text-[#8b8b9e] hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            Vortex
          </button>
        </div>
      </div>
    </div>
  );
}
