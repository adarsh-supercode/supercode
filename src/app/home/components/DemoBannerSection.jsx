import React, { useRef, useEffect, useState } from "react";
import * as styles from "../css/bannersection.module.css";
import { Canvas } from "@react-three/fiber";
// import { BannerBlueInflateLogo } from "@/app/components/AnimationLOgo/BannerBlueLogo";
import { Center, OrbitControls, Sphere } from "@react-three/drei";
import { DoubleSide } from "three";
import * as THREE from "three";
import gsap from "gsap"; // Import GSAP
import { PerspectiveCamera } from "@react-three/drei";
import {
  HomepageLogo,
  HomepageLogoBanner,
} from "@/app/components/AnimationLOgo/HomepageBannerLogo";

// Function to create the initial color blend texture
function createSmoothColorBlendTexture(colorStops) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 512;
  canvas.height = 512;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.sqrt(centerX ** 2 + centerY ** 2);

  // Create a radial gradient
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    50,
    centerX,
    centerY,
    maxRadius - 50
  );
  colorStops.forEach((stop, index) => {
    gradient.addColorStop(stop.offset, stop.color);
  });

  // Apply the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Return the texture created from the canvas
  return new THREE.CanvasTexture(canvas);
}

// RotatingLogo Component
const RotatingLogo = React.forwardRef(({}, ref) => {
  const [texture, setTexture] = useState(null);


  useEffect(() => {
    // Define the colors as an array with five color sets and five colors in each set
    const colors = [
      {
        color1: "#FFADD6",
        color2: "#FFFAEB",
        color3: "#00FF00",
        color4: "#0932EC",
      },
      {
        color1: "#FF0080",
        color2: "#FFE9AD",
        color3: "#D6FFD6",
        color4: "#627DF9",
      },
      {
        color1: "#FFEFC2",
        color2: "#FFC2E0",
        color3: "#00FF00",
        color4: "#FFD970",
      },
      {
        color1: "#FFD6EB",
        color2: "#FF0080",
        color3: "#133DF6",
        color4: "#EBEFFE",
      },
    ];

    // Initial color values
    const colorVars = {
      color1: colors[0].color1,
      color2: colors[0].color2,
      color3: colors[0].color3,
      color4: colors[0].color4,
      // color5: colors[0].color5,
    };

    // Function to update texture
    const updateTexture = () => {
      const { color1, color2, color3, color4, color5 } = colorVars;
      const colorStops = [
        { offset: 0, color: color1 },
        { offset: 0.25, color: color2 },
        { offset: 0.5, color: color3 },
        { offset: 1, color: color4 },
        // { offset: 1, color: color5 },
      ];
      setTexture(createSmoothColorBlendTexture(colorStops));
    };

    // GSAP animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    colors.forEach((set) => {
      tl.to(colorVars, {
        color1: set.color1,
        color2: set.color2,
        color3: set.color3,
        color4: set.color4,
        duration: 4, 
        onUpdate: updateTexture,
      });
    });

    return () => tl.kill(); 
  }, []);
 

  return (
    
    <Sphere args={[4, 128, 128]} scale={[4, 4, 4]} position={[0, 0, 0]}>
      {/* <axesHelper args={[3]}/> */}
      {texture && (
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent={true}
          side={DoubleSide}
        />
      )}
      <group>
        {/* <BannerBlueInflateLogo ref={ref} scale={[1.8, 1.8, 1.8]} texture={texture} /> */}
        <Center>
        <HomepageLogo ref={ref} scale={[1.8, 1.8, 1.8]} texture={texture} />
        </Center>
      </group>
    </Sphere>
  );
});

RotatingLogo.displayName = "RotatingLogo";

// DemoBannerSection Component
const DemoBannerSection = ({ banner }) => {
  const { title, description } = banner || {};
  const logoRef = useRef();

  return (
    <>
      <div
        className={styles?.animationLogo}
        style={{
          height: "1000px",
          width: "100%",
        }}
      >
        <Canvas 
          camera={{ position: [1, 0, 1] }}
          className={styles?.animationLogoCanvas}
          data-cursor="grabbtn"
        >
        <PerspectiveCamera
          makeDefault
          position={[0, 0,2]}
          fov={60}
          near={1.1}
          far={500}
        />
          <group>
            <Center>
             <RotatingLogo ref={logoRef}  />
          </Center>
          </group>
          <ambientLight intensity={1.5} />
          <directionalLight intensity={1} />
          {/* <axesHelper args={[3]} /> */}
          <OrbitControls
            enableZoom={false}
            enableRotate={true}
            autoRotate
            enablePan={false}
            maxPolarAngle={Math.PI - 0.9}
            minPolarAngle={0.6}
          />
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
    </>
  );
};

export default DemoBannerSection;
