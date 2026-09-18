"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

export type OrbitMode = "kepler" | "drift" | "vortex";

export interface MeteoroidSkill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "ai" | "devops" | "architecture";
  level: number;
  tier: "Core Mastery" | "Advanced Architecture" | "Production Grade" | "Specialized";
  tag: string;
  description: string;
  appliedIn: string[];
  color: string;
  rockColor: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitInclination: number;
  size: number;
  initialAngle: number;
  yOffset: number;
}

// 18 Core Skills with authentic noble mineral palette matching the portfolio
export const METEOROID_SKILLS: MeteoroidSkill[] = [
  {
    id: "react",
    name: "React 19 / 18",
    category: "frontend",
    level: 96,
    tier: "Core Mastery",
    tag: "Hooks & Concurrent Fiber",
    description: "Component lifecycles, concurrent rendering, custom hooks, and state management pipelines.",
    appliedIn: ["3D Spatial Portfolio", "Task Collaboration Engine", "Product Data Matrix"],
    color: "#38bdf8",
    rockColor: "#1e293b",
    orbitRadius: 4.8,
    orbitSpeed: 0.32,
    orbitInclination: 0.15,
    size: 0.44,
    initialAngle: 0,
    yOffset: 0.2,
  },
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    level: 94,
    tier: "Core Mastery",
    tag: "RSC & Server Actions",
    description: "App Router, streaming SSR, Server Components, dynamic route handlers, and edge caching.",
    appliedIn: ["AI Code Review System", "Portfolio Platform"],
    color: "#7dd3fc",
    rockColor: "#1e293b",
    orbitRadius: 6.2,
    orbitSpeed: -0.26,
    orbitInclination: -0.22,
    size: 0.40,
    initialAngle: 0.8,
    yOffset: -0.4,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 92,
    tier: "Core Mastery",
    tag: "Strict Discriminated Unions",
    description: "Generic constraints, AST typing, invariant verification, and enterprise type safety across tiers.",
    appliedIn: ["Entire Codebase", "Typed API Contracts", "AST Diffing Engine"],
    color: "#93c5fd",
    rockColor: "#22252c",
    orbitRadius: 7.6,
    orbitSpeed: 0.22,
    orbitInclination: 0.3,
    size: 0.41,
    initialAngle: 1.6,
    yOffset: 0.5,
  },
  {
    id: "threejs",
    name: "Three.js & WebGL",
    category: "frontend",
    level: 88,
    tier: "Advanced Architecture",
    tag: "3D Shaders & Scene Graphs",
    description: "WebGL render loops, camera projection matrices, customized GLSL shaders, and React Three Fiber.",
    appliedIn: ["3D Asteroid Space Field", "Spatial Spotlight", "Interactive Polyhedron"],
    color: "#38bdf8",
    rockColor: "#20242b",
    orbitRadius: 5.4,
    orbitSpeed: -0.34,
    orbitInclination: 0.25,
    size: 0.46,
    initialAngle: 2.4,
    yOffset: -0.2,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "frontend",
    level: 96,
    tier: "Core Mastery",
    tag: "Modern Design Tokens",
    description: "Utility-first design engine, zero-runtime tokens, high-contrast typography, and fluid responsiveness.",
    appliedIn: ["All Client Views", "Responsive HUD Overlays", "Micro-Interactions"],
    color: "#5eead4",
    rockColor: "#212726",
    orbitRadius: 8.8,
    orbitSpeed: 0.18,
    orbitInclination: -0.15,
    size: 0.38,
    initialAngle: 3.1,
    yOffset: 0.6,
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "frontend",
    level: 90,
    tier: "Advanced Architecture",
    tag: "Spring Dynamics & Physics",
    description: "Declarative orchestration, layout animations, inertial exit transitions, and gestural mechanics.",
    appliedIn: ["Route Transitions", "Blueprint Modal", "Interactive Cards"],
    color: "#c084fc",
    rockColor: "#26232b",
    orbitRadius: 9.8,
    orbitSpeed: -0.19,
    orbitInclination: 0.35,
    size: 0.39,
    initialAngle: 3.9,
    yOffset: -0.5,
  },
  {
    id: "nodejs",
    name: "Node.js & Express",
    category: "backend",
    level: 93,
    tier: "Core Mastery",
    tag: "Event Loop & Stream I/O",
    description: "Asynchronous stream processing, event loop tuning, REST microservices, and token authentication.",
    appliedIn: ["Task Collaboration Backend", "Auth Gateways", "REST Services"],
    color: "#60a5fa",
    rockColor: "#22252c",
    orbitRadius: 5.0,
    orbitSpeed: 0.3,
    orbitInclination: -0.28,
    size: 0.43,
    initialAngle: 4.6,
    yOffset: 0.3,
  },
  {
    id: "fastapi",
    name: "FastAPI / Python",
    category: "backend",
    level: 88,
    tier: "Advanced Architecture",
    tag: "Async Concurrency",
    description: "Asynchronous Python workers, Pydantic type validation, and high-throughput LLM pipeline bridges.",
    appliedIn: ["AI Code Review System", "AST Query Daemon"],
    color: "#38bdf8",
    rockColor: "#20242b",
    orbitRadius: 6.8,
    orbitSpeed: -0.24,
    orbitInclination: 0.18,
    size: 0.41,
    initialAngle: 5.3,
    yOffset: -0.6,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    level: 90,
    tier: "Core Mastery",
    tag: "ACID Schemas & Indexing",
    description: "Relational database schema modeling, B-tree indexes, transaction safety, and query optimization.",
    appliedIn: ["User Identity Store", "Task Relational Schema", "Metrics Datastore"],
    color: "#818cf8",
    rockColor: "#24242c",
    orbitRadius: 8.2,
    orbitSpeed: 0.2,
    orbitInclination: -0.32,
    size: 0.45,
    initialAngle: 0.4,
    yOffset: 0.7,
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "backend",
    level: 92,
    tier: "Core Mastery",
    tag: "Type-Safe Relations",
    description: "Automated schema migrations, type generation, relations resolution, and multi-tenant pooling.",
    appliedIn: ["Full-Stack Microservices", "Relational Datastores"],
    color: "#a5b4fc",
    rockColor: "#24242b",
    orbitRadius: 9.2,
    orbitSpeed: -0.17,
    orbitInclination: 0.22,
    size: 0.39,
    initialAngle: 1.2,
    yOffset: -0.3,
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    level: 82,
    tier: "Production Grade",
    tag: "Cache-Aside & PubSub",
    description: "Sub-millisecond data caching, session persistence, distributed locks, rate-limiting, and Pub/Sub streams.",
    appliedIn: ["Real-time Task Synchronization", "API Rate Limiters"],
    color: "#f87171",
    rockColor: "#2c2223",
    orbitRadius: 4.4,
    orbitSpeed: 0.36,
    orbitInclination: 0.35,
    size: 0.38,
    initialAngle: 2.0,
    yOffset: 0.4,
  },
  {
    id: "graphql",
    name: "GraphQL & REST",
    category: "backend",
    level: 91,
    tier: "Core Mastery",
    tag: "Schema Contracts",
    description: "Declarative data fetching, schema stitching, error boundary sanitization, and OpenAPI 3.0 documentation.",
    appliedIn: ["Cross-Service Gateways", "Unified Query Layer"],
    color: "#cbd5e1",
    rockColor: "#26282e",
    orbitRadius: 7.2,
    orbitSpeed: -0.21,
    orbitInclination: -0.2,
    size: 0.40,
    initialAngle: 2.8,
    yOffset: -0.7,
  },
  {
    id: "gemini",
    name: "Gemini / AI Pipelines",
    category: "ai",
    level: 90,
    tier: "Advanced Architecture",
    tag: "LLM Agents & AST Logic",
    description: "Structured schema generation, prompt chaining, function calling, code diff review, and context window budgeting.",
    appliedIn: ["AI Code Review System", "Code Quality Auditor"],
    color: "#818cf8",
    rockColor: "#25242d",
    orbitRadius: 5.8,
    orbitSpeed: 0.28,
    orbitInclination: 0.28,
    size: 0.47,
    initialAngle: 3.5,
    yOffset: 0.8,
  },
  {
    id: "docker",
    name: "Docker & Containers",
    category: "devops",
    level: 86,
    tier: "Production Grade",
    tag: "Multi-Stage Builds",
    description: "Containerized environments, multi-stage image minimization, networking isolation, and compose workflows.",
    appliedIn: ["Production Cloud Deployments", "Containerized Dev Stacks"],
    color: "#38bdf8",
    rockColor: "#21242b",
    orbitRadius: 8.5,
    orbitSpeed: -0.19,
    orbitInclination: -0.25,
    size: 0.42,
    initialAngle: 4.2,
    yOffset: -0.4,
  },
  {
    id: "git",
    name: "Git & CI/CD",
    category: "devops",
    level: 94,
    tier: "Core Mastery",
    tag: "Trunk-Based Automation",
    description: "GitHub Actions CI/CD workflows, semantic versioning, branch protections, and automated deployment pipelines.",
    appliedIn: ["All Repositories", "Automated Quality Gates"],
    color: "#34d399",
    rockColor: "#212724",
    orbitRadius: 6.5,
    orbitSpeed: 0.25,
    orbitInclination: 0.15,
    size: 0.40,
    initialAngle: 4.9,
    yOffset: 0.5,
  },
  {
    id: "linux",
    name: "Linux & Shell",
    category: "devops",
    level: 87,
    tier: "Production Grade",
    tag: "POSIX Architecture",
    description: "System administration, process monitoring, cron daemons, network diagnostics, and production server hardening.",
    appliedIn: ["Cloud Server Instances", "Automation Scripts"],
    color: "#94a3b8",
    rockColor: "#24262b",
    orbitRadius: 9.6,
    orbitSpeed: -0.16,
    orbitInclination: 0.3,
    size: 0.39,
    initialAngle: 5.7,
    yOffset: -0.8,
  },
  {
    id: "systemdesign",
    name: "System Design",
    category: "architecture",
    level: 88,
    tier: "Advanced Architecture",
    tag: "Scalability & DDD",
    description: "Domain-Driven Design (DDD), separation of concerns, horizontal scaling, cache-aside, and resilience patterns.",
    appliedIn: ["Enterprise Microservices", "High-Throughput Systems"],
    color: "#38bdf8",
    rockColor: "#1e293b",
    orbitRadius: 7.9,
    orbitSpeed: 0.22,
    orbitInclination: -0.18,
    size: 0.46,
    initialAngle: 0.2,
    yOffset: 0.3,
  },
  {
    id: "security",
    name: "Auth & API Security",
    category: "architecture",
    level: 92,
    tier: "Core Mastery",
    tag: "RBAC & JWT Defense",
    description: "Role-based access control, cryptographic token verification, OWASP top 10 sanitization, and rate limiting.",
    appliedIn: ["Identity Services", "Secure API Gateways"],
    color: "#818cf8",
    rockColor: "#1e293b",
    orbitRadius: 10.2,
    orbitSpeed: -0.15,
    orbitInclination: 0.2,
    size: 0.41,
    initialAngle: 1.8,
    yOffset: -0.2,
  },
];

// Procedural realistic asteroid generator creating craggy, cratered, oblong rock geometries
function createRealAsteroidGeometry(radius: number, seedStr: string): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, 2);
  const pos = geo.attributes.position;

  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) & 0xffffffff;
  }
  const pseudoRandom = (n: number) => {
    const x = Math.sin(seed + n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  // Oblong/ellipsoidal proportions characteristic of real asteroids
  const stretchX = 0.86 + pseudoRandom(1) * 0.32;
  const stretchY = 0.82 + pseudoRandom(2) * 0.32;
  const stretchZ = 0.88 + pseudoRandom(3) * 0.28;

  // Impact craters with distinct crater centers
  const craters = [
    new THREE.Vector3(pseudoRandom(4) - 0.5, pseudoRandom(5) - 0.5, pseudoRandom(6) - 0.5).normalize(),
    new THREE.Vector3(pseudoRandom(7) - 0.5, pseudoRandom(8) - 0.5, pseudoRandom(9) - 0.5).normalize(),
  ];
  const craterSizes = [0.42 + pseudoRandom(10) * 0.25, 0.35 + pseudoRandom(11) * 0.20];

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const dir = v.clone().normalize();

    // Multi-scale surface noise: large tectonic ridges, boulder fractures, and fine regolith pitting
    const n1 = Math.sin(dir.x * 3.2 + seed * 0.04) * Math.cos(dir.y * 3.2) * Math.sin(dir.z * 3.2);
    const n2 = Math.sin(dir.x * 6.5) * Math.sin(dir.y * 6.5 + dir.z * 4.5) * 0.5;
    const n3 = Math.sin(dir.x * 12.0 + dir.y * 12.0) * 0.25;

    let displacement = 1.0 + (n1 * 0.18 + n2 * 0.09 + n3 * 0.04);

    // Realistic crater bowls with raised rim ridges
    for (let c = 0; c < craters.length; c++) {
      const dist = dir.distanceTo(craters[c]);
      const cr = craterSizes[c];
      if (dist < cr) {
        const factor = dist / cr;
        const rim = Math.sin(factor * Math.PI) * 0.08;
        const depression = -Math.cos(factor * Math.PI * 0.5) * 0.22;
        displacement += depression + rim;
      }
    }

    v.set(
      dir.x * radius * displacement * stretchX,
      dir.y * radius * displacement * stretchY,
      dir.z * radius * displacement * stretchZ
    );
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

// Single Real Asteroid Node Component
function AsteroidNode({
  skill,
  mode,
  isHovered,
  isSelected,
  filterCategory,
  onHover,
  onLeave,
  onSelect,
}: {
  skill: MeteoroidSkill;
  mode: OrbitMode;
  isHovered: boolean;
  isSelected: boolean;
  filterCategory: string;
  onHover: (id: string) => void;
  onLeave: () => void;
  onSelect: (skill: MeteoroidSkill) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const orbitAngleRef = useRef<number>(skill.initialAngle);

  // Generate unique realistic craggy asteroid geometry for this skill
  const asteroidGeometry = useMemo(() => {
    return createRealAsteroidGeometry(skill.size, skill.id);
  }, [skill.size, skill.id]);

  // Unique tumbling inertia axis for real space motion
  const tumbleSpeed = useMemo(() => {
    let s = 0;
    for (let i = 0; i < skill.id.length; i++) s += skill.id.charCodeAt(i);
    return {
      x: ((s % 7) - 3) * 0.08,
      y: ((s % 5) - 2) * 0.12,
      z: ((s % 9) - 4) * 0.07,
    };
  }, [skill.id]);

  const isFiltered = filterCategory === "all" || skill.category === filterCategory;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Advance orbital physics based on mode
    if (mode === "kepler") {
      orbitAngleRef.current += delta * skill.orbitSpeed * 0.45;
      const angle = orbitAngleRef.current;
      const r = skill.orbitRadius;
      const inc = skill.orbitInclination;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = Math.sin(angle) * (r * inc) + skill.yOffset;

      groupRef.current.position.set(x, y, z);
    } else if (mode === "drift") {
      orbitAngleRef.current += delta * skill.orbitSpeed * 0.2;
      const angle = orbitAngleRef.current;
      const r = skill.orbitRadius;

      const x = Math.cos(angle) * r + Math.sin(state.clock.elapsedTime * 0.2 + skill.initialAngle) * 0.4;
      const z = Math.sin(angle) * r + Math.cos(state.clock.elapsedTime * 0.18 + skill.initialAngle) * 0.4;
      const y = Math.sin(state.clock.elapsedTime * 0.3 + skill.initialAngle) * 0.8 + skill.yOffset;

      groupRef.current.position.set(x, y, z);
    } else if (mode === "vortex") {
      orbitAngleRef.current += delta * 0.3;
      const angle = orbitAngleRef.current + skill.initialAngle;
      const heightPhase = Math.sin(state.clock.elapsedTime * 0.25 + skill.initialAngle);
      const dynamicRadius = 4 + (heightPhase + 1) * 3;

      const x = Math.cos(angle) * dynamicRadius;
      const z = Math.sin(angle) * dynamicRadius;
      const y = heightPhase * 4 + skill.yOffset;

      groupRef.current.position.set(x, y, z);
    }

    // Realistic slow axial tumble in space
    if (meshRef.current) {
      const speedMultiplier = isHovered || isSelected ? 2.0 : 1.0;
      meshRef.current.rotation.x += delta * tumbleSpeed.x * speedMultiplier;
      meshRef.current.rotation.y += delta * tumbleSpeed.y * speedMultiplier;
      meshRef.current.rotation.z += delta * tumbleSpeed.z * speedMultiplier;
    }
  });

  const effectiveScale = (isSelected ? 1.28 : isHovered ? 1.15 : 1.0) * (isFiltered ? 1.0 : 0.5);

  return (
    <group ref={groupRef}>
      {/* Authentic Craggy Asteroid Mesh */}
      <mesh
        ref={meshRef}
        geometry={asteroidGeometry}
        scale={effectiveScale}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onHover(skill.id);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          onLeave();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
      >
        <meshStandardMaterial
          color={isFiltered ? skill.rockColor : "#15161b"}
          roughness={0.88}
          metalness={0.25}
          flatShading={true}
          emissive={isSelected || isHovered ? skill.color : isFiltered ? skill.color : "#000000"}
          emissiveIntensity={isSelected ? 0.35 : isHovered ? 0.22 : 0.03}
        />
      </mesh>

      {/* Subtle Precision Targeting Orbit Ring when Selected */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[skill.size * 1.5, 0.008, 16, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Aerospace Flight-Telemetry 3D Badge */}
      <Html
        position={[0, skill.size * effectiveScale + 0.35, 0]}
        center
        distanceFactor={13}
        className="select-none pointer-events-auto"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skill);
          }}
          className={`px-3 py-1 rounded-full font-mono text-xs whitespace-nowrap transition-all duration-200 border backdrop-blur-md flex items-center gap-2 shadow-2xl cursor-pointer ${
            isSelected
              ? "bg-slate-950/95 text-white scale-105 border-sky-400 ring-1 ring-sky-400/40"
              : isHovered
              ? "bg-slate-950/90 text-white scale-102 border-white/40"
              : isFiltered
              ? "bg-slate-950/80 text-zinc-300 border-white/10 hover:border-white/30"
              : "bg-slate-950/50 text-zinc-600 border-white/5 opacity-40 hover:opacity-80"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-semibold tracking-wide text-zinc-100">{skill.name}</span>
          <span className="text-[11px] text-sky-300 font-mono">{skill.level}%</span>
        </button>
      </Html>
    </group>
  );
}

// Noble Gravitational Origin (Deep Space Center Coordinate)
function GravitationalOrigin() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Obsidian Gravitational Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#08090d"
          metalness={0.9}
          roughness={0.15}
          emissive="#38bdf8"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Sleek Celestial Equatorial Accretion Ring */}
      <group ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.01, 16, 120]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.008, 16, 120]} />
          <meshBasicMaterial color="#94a3b8" transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// Deep Space Realistic Starfield (1,800 distant pinprick stars)
function DeepSpaceStarfield() {
  const { positions, colors } = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Natural stellar color variations (cold white, pale blue-white, warm gold-white)
    const starPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#e2e8f0"),
      new THREE.Color("#bfdbfe"),
      new THREE.Color("#fef3c7"),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 12 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = starPalette[Math.floor(Math.random() * starPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

interface MeteoroidSkillsCanvasProps {
  mode: OrbitMode;
  filterCategory: string;
  selectedSkill: MeteoroidSkill | null;
  onSelectSkill: (skill: MeteoroidSkill) => void;
}

export default function MeteoroidSkillsCanvas({
  mode,
  filterCategory,
  selectedSkill,
  onSelectSkill,
}: MeteoroidSkillsCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none bg-black">
      <Canvas
        camera={{ position: [0, 3, 14], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
        onCreated={({ gl, scene }) => {
          // True pitch space black background
          gl.setClearColor(new THREE.Color("#000000"), 1.0);
          scene.background = new THREE.Color("#000000");
        }}
      >
        {/* Realistic Deep Space Lighting (Stark Distant Sun + Subtle Starlight Fill) */}
        <ambientLight intensity={0.22} color="#0c0d12" />
        <directionalLight position={[18, 12, 12]} intensity={3.8} color="#fffef7" />
        <directionalLight position={[-16, -10, -10]} intensity={0.4} color="#64748b" />
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#38bdf8" distance={16} />

        {/* Central Origin */}
        <GravitationalOrigin />

        {/* Realistic Deep Space Starfield */}
        <DeepSpaceStarfield />

        {/* Realistic Asteroids */}
        {METEOROID_SKILLS.map((skill) => (
          <AsteroidNode
            key={skill.id}
            skill={skill}
            mode={mode}
            isHovered={hoveredId === skill.id}
            isSelected={selectedSkill?.id === skill.id}
            filterCategory={filterCategory}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onSelect={onSelectSkill}
          />
        ))}

        {/* 360° Drag / Orbit Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={7}
          maxDistance={22}
          autoRotate={true}
          autoRotateSpeed={0.35}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
