"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { inSphere } from "maath/random";

function Stars() {
  const ref = useRef<any>(null);
  const [sphere] = useState<Float32Array>(
    () => inSphere(new Float32Array(3000), { radius: 1.5 }) as Float32Array
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 2] }} dpr={[1, 1.3]}>
        <Stars />
      </Canvas>
    </div>
  );
}
