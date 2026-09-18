"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Realistic Deep Space Starfield & Cosmic Dust Traveling Corridor ───
function DeepSpaceCorridor() {
  const pointsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const dustRef = useRef<THREE.Points>(null);

  // Flight trajectory & smooth scroll tracking
  const scrollData = useRef({
    currentProgress: 0,
    targetProgress: 0,
    velocity: 0,
    lastScrollY: 0,
    targetCameraZ: 10,
    cameraZ: 10,
    cameraX: 0,
    cameraY: 0,
  });

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
          const currentY = window.scrollY;
          const progress = Math.min(Math.max(currentY / maxScroll, 0), 1);
          
          const delta = Math.abs(currentY - scrollData.current.lastScrollY);
          scrollData.current.velocity = Math.min(delta / 30, 2.5);
          scrollData.current.lastScrollY = currentY;
          scrollData.current.targetProgress = progress;

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 1. Vast Deep Space Stars (2,400 Stars with realistic stellar color temperatures)
  const starCount = 2400;
  const [starPositions, starColors, starSizes] = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const sz = new Float32Array(starCount);

    // Stellar spectral classes (O, B, A, F, G)
    const stellarColors = [
      new THREE.Color("#ffffff"), // Pure Starlight White
      new THREE.Color("#f1f5f9"), // Crisp Titanium
      new THREE.Color("#93c5fd"), // Starlight Azure Blue
      new THREE.Color("#38bdf8"), // Electric Cyan Star
      new THREE.Color("#e0f2fe"), // Icy Blue-White
      new THREE.Color("#818cf8"), // Deep Space Indigo Star
    ];

    for (let i = 0; i < starCount; i++) {
      // Cylindrical deep space tunnel spanning along Z from +20 down to -120
      const radius = 2.5 + Math.pow(Math.random(), 0.6) * 32;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.15) * -140 + 20;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      const chosenColor = stellarColors[Math.floor(Math.random() * stellarColors.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      // Realistic varied stellar brightness / magnitude
      sz[i] = Math.random() * 0.024 + 0.012;
    }

    return [pos, col, sz];
  }, [starCount]);

  // 2. Cosmic Nebula Clouds (Soft luminous particulate clouds along the journey)
  const nebulaCount = 650;
  const [nebulaPositions, nebulaColors] = useMemo(() => {
    const pos = new Float32Array(nebulaCount * 3);
    const col = new Float32Array(nebulaCount * 3);

    const cosmicDustHues = [
      new THREE.Color("#0369a1"), // Deep Cosmic Cyan
      new THREE.Color("#1e3a8a"), // Deep Midnight Blue
      new THREE.Color("#312e81"), // Deep Abyss Indigo
      new THREE.Color("#0f766e"), // Deep Space Teal
    ];

    for (let i = 0; i < nebulaCount; i++) {
      // Clustered along specific waypoints along the Z flight path
      const clusterZ = -i * 0.18;
      const spread = 7 + Math.random() * 12;
      const angle = Math.random() * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * spread + (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = Math.sin(angle) * spread + (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = clusterZ - 10;

      const c = cosmicDustHues[Math.floor(Math.random() * cosmicDustHues.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [nebulaCount]);

  // 3. Foreground Warp Drift Dust (Particles near the camera that glide past as you scroll)
  const driftCount = 380;
  const [driftPositions, driftColors] = useMemo(() => {
    const pos = new Float32Array(driftCount * 3);
    const col = new Float32Array(driftCount * 3);

    const driftHues = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#e2e8f0"),
      new THREE.Color("#60a5fa"),
    ];

    for (let i = 0; i < driftCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const c = driftHues[Math.floor(Math.random() * driftHues.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [driftCount]);

  // Animation Loop: Gliding through space based on section scrolling
  useFrame((state, delta) => {
    // 1. Smooth scroll interpolation
    const sd = scrollData.current;
    sd.currentProgress += (sd.targetProgress - sd.currentProgress) * 0.055;
    sd.velocity *= 0.92; // decay scroll velocity

    // Mouse parallax
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

    const time = state.clock.getElapsedTime();

    // 2. Camera Space Flight Calculations:
    // As progress goes 0 -> 1, we travel from Z = 8 down to Z = -85 through cosmic space!
    // We also gently rotate/sway the travel angle so each section visits a distinct spatial sector:
    // Sector 1: Home (Entry Orbit, straight ahead)
    // Sector 2: Features (Banking left into Orion Corridor)
    // Sector 3: Skills (Leveling at Asteroid Field)
    // Sector 4: Projects (Banking right into Deep Galaxy Expanse)
    // Sector 5: Resume (Entering Chronos Stream)
    // Sector 6: Contact (Terminal Starlight Horizon)
    const targetZ = 8 - sd.currentProgress * 75;
    const targetX = Math.sin(sd.currentProgress * Math.PI * 2.2) * 3.5 + mouse.current.x * 0.8;
    const targetY = -Math.cos(sd.currentProgress * Math.PI * 1.8) * 2.2 + mouse.current.y * 0.6;

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;

    // Subtle ship banking / pitch based on trajectory & mouse
    state.camera.rotation.z = -Math.sin(sd.currentProgress * Math.PI * 2) * 0.08 + mouse.current.x * 0.03;
    state.camera.rotation.x = -mouse.current.y * 0.05 + (sd.velocity * 0.015);
    state.camera.rotation.y = -mouse.current.x * 0.05;

    // 3. Dynamic ambient rotation & forward drifting for the stars
    if (pointsRef.current) {
      pointsRef.current.rotation.z = time * 0.012;
      // Stars twinkle slightly by pulsing z scale
      pointsRef.current.position.z = Math.sin(time * 0.4) * 0.2;
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = -time * 0.008;
    }

    // 4. Foreground dust warp effect when moving fast
    if (dustRef.current) {
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      const speed = 0.06 + sd.velocity * 0.25;

      for (let i = 0; i < driftCount; i++) {
        // Move particles towards the camera (positive Z)
        positions[i * 3 + 2] += speed;
        // If particle moves past the camera, loop back deep into space
        if (positions[i * 3 + 2] > state.camera.position.z + 5) {
          positions[i * 3 + 2] = state.camera.position.z - 30;
          positions[i * 3] = (Math.random() - 0.5) * 14;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        }
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Distant Deep Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Cosmic Nebula Clouds */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dynamic Foreground Drift Particles (Hyper-warp sensation when scrolling) */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[driftPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[driftColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{
        background: "radial-gradient(circle at 50% 50%, #030712 0%, #000000 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65, near: 0.1, far: 300 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <DeepSpaceCorridor />
      </Canvas>
    </div>
  );
}
