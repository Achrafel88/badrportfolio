'use client';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial, useTexture, Decal } from '@react-three/drei';
import * as THREE from 'three';

export const NeuralCore = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Load the profile image texture
  const texture = useTexture('/me.png');

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time / 2;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#ec4899" />
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.8 : 1.6}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={hovered ? "#a5b4fc" : "#6366f1"}
            speed={2}
            distort={0.2}
            radius={1}
            emissive="#4f46e5"
            emissiveIntensity={hovered ? 0.8 : 0.4}
            roughness={0.1}
            metalness={0.9}
          />
          {/* Apply the profile image on the sphere */}
          <Decal
            position={[0, 0, 1]}
            rotation={[0, 0, 0]}
            scale={[1.5, 1.5, 1.5]}
            map={texture}
          />
        </mesh>
      </Float>

      <ParticleRing />
    </>
  );
};

const ParticleRing = () => {
  const particlesCount = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  useFrame((state) => {
    pointsRef.current.rotation.y += 0.002;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};
