'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PerspectiveCamera } from '@react-three/drei';

export const CanvasContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
