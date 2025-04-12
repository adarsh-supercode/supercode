import React, { forwardRef, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, Clock } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export const HomepageLogo = forwardRef(
  ({ roughness = 0.05, metalness = 0.9, ...props }, ref) => {
    const { nodes } = useGLTF("/assets/homepageBannerLogo.glb");

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
    const { scene, gl } = useThree();

    // State for scaling based on screen size
    const [scale, setScale] = useState([0.06, 0.06, 0.06]);
    const [position, setPosition] = useState([0,0,0]);
    // const [position, setPosition] = useState([0.01, 0.05, 0.01]);

    // Update the scale based on window size
    const updateScale = () => {
      const width = window.innerWidth;

      if (width <= 475) {
        setScale([0.04, 0.04, 0.04]); // Scale for mobile devices
        setPosition([-0.015, 0.098, 0])
      } else if(width <= 768) {
        setScale([0.05, 0.05, 0.05]); // Scale for mobile devices
        setPosition([-0.008, 0.08, 0.01])
      }
       else if (width <= 1440) {
        setScale([0.07, 0.07, 0.07]); // Scale for tablets
        setPosition([0, 0.025,0])
      }  else if (width <= 1600) {
        setScale([0.07, 0.07, 0.07]); // Scale for tablets
        setPosition([-0.008, 0.02, 0.0])
      }else {
        setScale([0.09, 0.09, 0.09]); // Scale for desktops
        setPosition([-0.008, -0.03, 0.04])
      }
    };

    useEffect(() => {
      // Set initial scale
      updateScale();

      // Add resize event listener
      window.addEventListener("resize", updateScale);
      return () => {
        // Clean up the event listener
        window.removeEventListener("resize", updateScale);
      };
    }, []);

    // Update the cube camera for dynamic reflections
    useFrame(() => {
      if (cubeCamera.current) {
        cubeCamera.current.update(gl, scene);
      }

      const elapsedTime = clock.current.getElapsedTime();
      if (ref?.current) {
        // Keep X rotation fixed (do not change)
        ref.current.rotation.x = 0; // Set to the initial value (or any constant)

        // Rotate the logo only on Y and Z axes
        // ref.current.rotation.y = elapsedTime * 0.2; // Rotate along Y axis
      }
    });

    // Create a material with environment map
    const material = new MeshStandardMaterial({
      roughness: roughness,
      metalness: metalness,
      envMap: cubeRenderTarget.current.texture,
    });

    return (
      <group
        ref={ref}
        {...props}
        dispose={null}
        scale={scale} // Use the dynamic scale
        // position={[-0.008, 0.05, 0.01]}
        position={position}
        rotation={[4, 1, .09]} // Set initial X rotation to prevent movement along X axis
      >
        {/* Cube camera for capturing reflections */}
        <cubeCamera
          ref={cubeCamera}
          args={[0.1, 1000, cubeRenderTarget.current]}
        />
        {/* Create a parent group for rotation   */}
        <group rotation={[1.53, -0.6, -0.08]}>
         
          <group
            position={[0.166, 0, -1.567]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 1, 1]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Box002.geometry}
              material={material}
              scale={0.001}
            />
          </group>
          <group
            position={[1.219, 0, 0.225]}
            rotation={[-Math.PI / 2, 0, -2.094]}
            scale={[1, 1, 1]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Box003.geometry}
              material={material}
              scale={0.001}
            />
          </group>
          <group
            position={[-0.865, 0, 0.233]}
            rotation={[-Math.PI / 2, 0, 2.096]}
            scale={[1, 1, 1]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Box003_1.geometry}
              material={material}
              scale={0.001}
            />
          </group>
        </group>
      </group>
    );
  }
);

// Add displayName to the component to avoid the warning
HomepageLogo.displayName = "HomepageLogo";

// Preload the GLTF model
useGLTF.preload("/assets/homepageBannerLogo.glb");