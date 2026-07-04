"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Box } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects() {
  const group = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 0.1,
        y: (event.clientY / window.innerHeight - 0.5) * 0.1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.x += 0.0003;
      group.current.rotation.y += 0.0005;
      group.current.position.x += (mouse.x - group.current.position.x) * 0.1;
      group.current.position.y += (mouse.y - group.current.position.y) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Main sphere */}
      <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
          emissive="#4f46e5"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Floating cubes */}
      <Box
        args={[0.8, 0.8, 0.8]}
        position={[3.5, 1.5, 0]}
        rotation={[0.5, 0.5, 0]}
      >
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.7}
          roughness={0.2}
          emissive="#0891b2"
          emissiveIntensity={0.15}
        />
      </Box>

      <Box
        args={[0.6, 0.6, 0.6]}
        position={[-3, -1.5, 0.5]}
        rotation={[0.3, 0.8, 0.2]}
      >
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.7}
          roughness={0.2}
          emissive="#9333ea"
          emissiveIntensity={0.15}
        />
      </Box>

      <Box
        args={[0.7, 0.7, 0.7]}
        position={[1.5, -2.5, -0.5]}
        rotation={[0.1, 0.3, 0.5]}
      >
        <meshStandardMaterial
          color="#ec4899"
          metalness={0.7}
          roughness={0.2}
          emissive="#be185d"
          emissiveIntensity={0.15}
        />
      </Box>

      {/* Additional spheres */}
      <Sphere args={[0.6, 32, 32]} position={[-3.5, 2.5, -1]}>
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.6}
          roughness={0.3}
          emissive="#1d4ed8"
          emissiveIntensity={0.15}
        />
      </Sphere>

      <Sphere args={[0.5, 32, 32]} position={[2.5, -2, -0.5]}>
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.6}
          roughness={0.3}
          emissive="#d97706"
          emissiveIntensity={0.15}
        />
      </Sphere>

      {/* Additional accent sphere */}
      <Sphere args={[0.4, 32, 32]} position={[-2, -1, 2]}>
        <meshStandardMaterial
          color="#10b981"
          metalness={0.6}
          roughness={0.3}
          emissive="#059669"
          emissiveIntensity={0.15}
        />
      </Sphere>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#a855f7" />
      <directionalLight position={[5, 10, 7]} intensity={0.8} color="#ffffff" />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <FloatingObjects />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background pointer-events-none" />
    </div>
  );
}
