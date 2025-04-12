"use client";
import React, { useRef, useState } from "react";
import * as styles from "../css/bannersection.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { BannerBlueInflateLogo } from "@/app/components/AnimationLOgo/BannerBlueLogo";
import { OrbitControls } from "@react-three/drei";

const RotatingLogo = React.forwardRef(
  ({ colors, setColors, isInteracting, pointerPosition }, ref) => {
    const previousPointerPosition = useRef({ x: 0, y: 0 });

    useFrame(() => {
      if (ref.current) {
        // Adjust rotation based on interaction
        if (isInteracting) {
          const { x, y } = pointerPosition;
          const deltaX = x - previousPointerPosition.current.x;
          const deltaY = y - previousPointerPosition.current.y;

          // Rotate around the object's local axes based on pointer movement
          ref.current.rotation.x += deltaY * 0.005; // Rotate around X-axis
          ref.current.rotation.y += deltaX * 0.005; // Rotate around Y-axis

          // Update previous pointer position
          previousPointerPosition.current = { x, y };
        } else {
          ref.current.rotation.z += 0.004; // Default rotation around Z-axis
        }

        // Update colors dynamically based on rotation
        const hue = ((ref.current.rotation.z * 180) / Math.PI) % 360;
        const updatedColorPair = [
          `hsl(${hue}, 100%, 40%)`, // Main color
          `hsl(${(hue + 10) % 360}, 100%, 40%)`, // Shadow color
        ];

        setColors([
          updatedColorPair[0], updatedColorPair[1],
          updatedColorPair[0], updatedColorPair[1],
          updatedColorPair[0], updatedColorPair[1],
        ]);
      }
    });

    return (
      <BannerBlueInflateLogo
        ref={ref}
        position={[0.75, 0.5, 0]}
        scale={[3.5, 3.5, 4]}
        color={colors}
      />
    );
  }
);

RotatingLogo.displayName = "RotatingLogo";

const DemoBannerSection = ({ banner }) => {
  const { title, svg, description } = banner || {};
  const logoRef = useRef();
  const [colors, setColors] = useState([
    "#072AC8", "#FF3399",
    "#FF3399", "#007A00",
    "#33FF33", "#072AC8",
  ]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    setIsInteracting(true);
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2; // Center X
    const y = event.clientY - rect.top - rect.height / 2; // Center Y
    setPointerPosition({ x, y });
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
  };
  

  return (
    <>
      <Canvas
        className={`${styles?.animationLogo}`}
        camera={{ position: [1, 1, 1] }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ height: "1000px" }}
      >
        <ambientLight intensity="1.5" />
        <directionalLight intensity="1" />
        <RotatingLogo
          ref={logoRef}
          colors={colors}
          setColors={setColors}
          isInteracting={isInteracting}
          pointerPosition={pointerPosition}
        />
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>

      <div className={styles?.BannerSection}>
        <div className="container">
          <div className={styles?.BannerSectionWrap}>
            <div
              className={`${styles?.MainHeading} heading-1 textClrBlack`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <div className={`${styles?.bannerDescription}`}>
              <p className="text-2 textClrBlack">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoBannerSection;

