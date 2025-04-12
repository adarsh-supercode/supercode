"use client";
import { YcubeLogo } from '@/app/components/AnimationLOgo/CubeLogo';
import { Canvas } from '@react-three/fiber';
import React from 'react';

export default function CareersAnimationSec() {
  return (
      <Canvas style={{ width: "300px", height: "500px" ,background:'blue'}} camera={{fov:75}}>
        <ambientLight intensity={10} />
        <pointLight position={[10, 10, 10]} intensity={10} />
        <YcubeLogo />
      </Canvas>
  );
}
