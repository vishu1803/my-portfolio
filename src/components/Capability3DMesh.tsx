"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface MeshProps {
  activeColor: string;
  activeId: number;
}

function WireframePolyhedron({ activeColor, activeId }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25;
      meshRef.current.rotation.y = time * 0.35;
      const pulse = 1 + Math.sin(time * 2.5) * 0.06;
      meshRef.current.scale.setScalar(pulse);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3;
      innerRef.current.rotation.z = time * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.4;
      ringRef.current.rotation.x = Math.PI / 4;
    }
  });

  return (
    <group>
      {/* Central Solid Polyhedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0d0e17"
          roughness={0.2}
          metalness={0.9}
          emissive={activeColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial
          color={activeColor}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Equatorial Orbiting Halo */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.75, 0.015, 16, 64]} />
          <meshBasicMaterial color={activeColor} transparent opacity={0.5} />
        </mesh>
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, 0]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function Capability3DMesh({
  activeColor = "#38bdf8",
  activeId = 0,
}: MeshProps) {
  return (
    <div className="w-full h-44 sm:h-52 relative select-none">
      <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 3]} intensity={1.2} />
        <pointLight position={[0, 0, 0]} color={activeColor} intensity={2} distance={5} />
        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
          <WireframePolyhedron activeColor={activeColor} activeId={activeId} />
        </Float>
      </Canvas>
    </div>
  );
}
