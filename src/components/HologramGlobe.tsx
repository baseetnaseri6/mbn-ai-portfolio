"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Globe() {
  const globe = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globe.current) globe.current.rotation.y += 0.004;
    if (ring.current) ring.current.rotation.z += 0.006;
  });

  return (
    <>
      <Stars radius={80} depth={40} count={1400} factor={4} fade speed={1} />

      <mesh ref={globe}>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#0077ff"
          emissiveIntensity={1.8}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 16, 180]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.75} />
      </mesh>

      <mesh ref={ring} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[2.45, 0.01, 16, 180]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.75} />
      </mesh>

      <mesh position={[0, -2.15, 0]}>
        <cylinderGeometry args={[1.6, 2.2, 0.12, 96]} />
        <meshStandardMaterial
          color="#00111f"
          emissive="#00d9ff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      <pointLight position={[0, 0, 4]} intensity={40} color="#00d9ff" />
      <pointLight position={[3, 2, 2]} intensity={25} color="#8b5cf6" />
    </>
  );
}

export default function HologramGlobe() {
  return (
    <div className="relative h-[420px] w-full md:h-[560px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      <div className="pointer-events-none absolute bottom-10 left-1/2 h-12 w-72 -translate-x-1/2 rounded-full bg-cyan-400/40 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#020617_78%)]" />
    </div>
  );
}
