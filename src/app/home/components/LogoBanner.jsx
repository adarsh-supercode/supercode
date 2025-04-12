import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import {  WebGLCubeRenderTarget, RGBFormat, LinearMipmapLinearFilter } from 'three';
import gsap from 'gsap';
import * as styles from "../css/bannersection.module.css";
import { useThree } from '@react-three/fiber';

// Function to create the canvas texture
function createSmoothColorBlendTexture(colorStops) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 512;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2);
  const gradient = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, maxRadius - 50);

  colorStops.forEach(stop => {
    gradient.addColorStop(stop.offset, stop.color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return new THREE.CanvasTexture(canvas);
}

// Model with animated gradient texture
function LogoModel({ texture, envMap }) {
  const { nodes, materials } = useGLTF('/assets/logo-in-sphere.glb');
  const { viewport } = useThree();
  const groupRef = useRef();

  // Assign texture and envMap to materials
  useEffect(() => {
    if (texture) {
      materials['Material.001'].map = texture;
      materials['Material.001'].needsUpdate = true;
    }
  
    if (envMap) {
      const mat = materials.Material_0;
      mat.envMap = envMap;
      mat.envMapIntensity = 1.5;
      mat.metalness = 1;
      mat.roughness = 0;
      mat.map = null;
      mat.color = new THREE.Color(0xffffff);
      mat.needsUpdate = true;
    }
  }, [texture, envMap]);


  // useEffect(() => {
  //   if (groupRef.current) {
  //     const isMobile = viewport.width < 0.5;
  //     console.log('isMobile: ', isMobile);
  //     const isTablet = viewport.width >= 1.6 && viewport.width < 2;
  //     console.log('isTablet: ', isTablet);
  //     const isDesktop = viewport.width >= 2;
  //     console.log('isDesktop: ', isDesktop);

  //     if (isMobile) {
  //       groupRef.current.scale.setScalar(1.5);
  //       groupRef.current.position.set(0, -0.3, 0);
  //     } else if (isTablet) {
  //       groupRef.current.scale.setScalar(5);
  //       groupRef.current.position.set(0, -0.2, 0);
  //     } else if (isDesktop) {
  //       groupRef.current.scale.setScalar(4);
  //       groupRef.current.position.set(0, 7, 0);
  //     }
  //   }
  // }, [viewport]);

  useEffect(() => {
    const handleResize = () => {
      if (!groupRef.current) return;
  
      const width = window.innerWidth;
  
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
  
      console.log('isMobile:', isMobile);
      console.log('isTablet:', isTablet);
      console.log('isDesktop:', isDesktop);
  
      if (isMobile) {
        groupRef.current.scale.setScalar(2.3);
        groupRef.current.position.set(0, 0.35, 0);
      } else if (isTablet) {
        groupRef.current.scale.setScalar(3.5);
        groupRef.current.position.set(0, 0, 0);
      } else if (isDesktop) {
        groupRef.current.scale.setScalar(5);
        groupRef.current.position.set(0, 0, 0);
      }
    };
  
    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group  ref={groupRef}  dispose={null}>
      {/* Inner logo mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_1.geometry}
        material={materials.Material_0}

      />
      {/* Outer sphere mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001_2.geometry}
        material={materials['Material.001']}

      />
    </group>
  );
}

function LogoSphere() {
  const [texture, setTexture] = useState(null);
  const [envMap, setEnvMap] = useState(null);
  const cubeRenderTarget = useRef(new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  }));
  const cubeCamera = useRef();

  // Animate colors
  useEffect(() => {
    const colors = [
      { color1: "#FFADD6", color2: "#FFFAEB", color3: "#00FF00", color4: "#0932EC" },
      { color1: "#FF0080", color2: "#FFE9AD", color3: "#D6FFD6", color4: "#627DF9" },
      { color1: "#FFEFC2", color2: "#FFC2E0", color3: "#00FF00", color4: "#FFD970" },
      { color1: "#FFD6EB", color2: "#FF0080", color3: "#133DF6", color4: "#EBEFFE" },
    ];

    const colorVars = { ...colors[0] };

    const updateTexture = () => {
      const colorStops = [
        { offset: 0, color: colorVars.color1 },
        { offset: 0.25, color: colorVars.color2 },
        { offset: 0.5, color: colorVars.color3 },
        { offset: 1, color: colorVars.color4 },
      ];
      const newTex = createSmoothColorBlendTexture(colorStops);
      newTex.needsUpdate = true;
      setTexture(newTex);
    };

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    colors.forEach(set => {
      tl.to(colorVars, {
        ...set,
        duration: 4,
        onUpdate: updateTexture
      });
    });

    updateTexture();
    return () => tl.kill();
  }, []);

  // Update cube camera every frame
  useFrame((state) => {
    if (cubeCamera.current) {
      cubeCamera.current.update(state.gl, state.scene);
      setEnvMap(cubeRenderTarget.current.texture);
    }
  });

  return (
    <>
      <cubeCamera
        ref={cubeCamera}
        args={[0.1, 10, cubeRenderTarget.current]}
        position={[0, 0, 0]}
      />
      <LogoModel texture={texture} envMap={envMap} 
      />
    </>
  );
}

// Main Scene Component
export default function LogoBanner( {banner}) {
    const { title, description } = banner || {};
  return (
    <>
    <section className={styles.bannerWrap}>
    <div  className={styles.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 2], fov: 30 }} className={styles.canvasWrap}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#FFF" intensity={1} />
        <LogoSphere />
        <OrbitControls enableZoom={false} autoRotate={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
    <div className="container">
            <div className={styles?.BannerSection}>
              <div className={styles?.BannerSectionWrap}>
                <div
                  className={`${styles?.MainHeading} heading-1 textClrBlack`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className={`${styles?.bannerDescription}`}>
                  <p className="text-5 textClrBlack">{description}</p>
                </div>
              </div>
            </div>
          </div> 
          </section>
    </>
  );
}

useGLTF.preload('/assets/logo-in-sphere.glb');
