import React, { forwardRef, useRef } from "react";
import * as THREE from 'three';
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Clock } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export const BannerBlueInflateLogo = forwardRef(
  ({ colors, roughness = 0.2, metalness = 0.2, ...props }, ref) => {
    const { nodes } = useGLTF("/assets/Blue-Inflate-Logo.gltf");

    // Create a cube render target for environment mapping
    const cubeRenderTarget = useRef(
      new THREE.WebGLCubeRenderTarget(256, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      })
    );

    const cubeCamera = useRef();
    const clock = useRef(new Clock());
    const { scene, gl } = useThree(); // Get scene and renderer

    // Log cube texture for debugging
    useFrame(() => {
      if (cubeCamera.current) {
        cubeCamera.current.update(gl, scene); // Update the cube camera to capture reflections
      }

      const elapsedTime = clock.current.getElapsedTime();
      if (ref?.current) {
        ref.current.rotation.z = elapsedTime * 0.2; // Rotate the logo to give a dynamic effect
      }
    });

    // Apply environment map texture to the material
    const material = new MeshStandardMaterial({
      roughness: roughness,
      metalness: metalness,
      map: cubeRenderTarget.current.texture,
    });

    return (
      <group ref={ref} {...props} dispose={null}>
        {/* Position the cube camera near the object you want reflected */}
        <cubeCamera
          ref={cubeCamera}
          args={[0.1, 1000, cubeRenderTarget.current]}
          position={[1, 1, 1]}
        />
        {nodes &&
          Object.keys(nodes).map((key) => (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={nodes[key].geometry}
              material={material}
            />
          ))}
      </group>
    );
  }
);

// Set display name for the component
BannerBlueInflateLogo.displayName = "BannerBlueInflateLogo";

// Preload the GLTF model
useGLTF.preload("/assets/Blue-Inflate-Logo.gltf");
// useGLTF.preload("/assets/homepageBannerLogo.gltf");
