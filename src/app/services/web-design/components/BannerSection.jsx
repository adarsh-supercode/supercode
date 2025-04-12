import React, { useEffect, useRef, useState } from "react";
import * as styles from "../css/banner.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WebDevBanner({ banner }) {
  const { title, heading, description, svg, tag } = banner || {};


  const svgRef = useRef(null);
  const bannerRef = useRef(null); // Reference for the banner section
  const svgWrapRef = useRef(null);

  const position = useRef({ x: 0, y: 0, dirX: 1, dirY: 1 });

  const speed = 2; // Original speed (no change)

  useEffect(() => {
    const svgElement = svgRef.current;
    const bannerElement = bannerRef.current;
    const svgElementWrap = svgWrapRef.current;

    
    ScrollTrigger.create({
      trigger: bannerElement,
      start: "top top", 
      end: "bottom bottom", 
      pin: svgElementWrap, 
      // markers:true
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const svgElement = svgRef.current;
    const svgWrapElement = svgWrapRef.current;
    
    const animate = () => {
      // Get the banner container's dimensions
      const bannerWidth = svgWrapElement.clientWidth;
      const bannerHeight = svgWrapElement.clientHeight;

      // Get the SVG's dimensions
      const svgWidth = svgElement.clientWidth;
      const svgHeight = svgElement.clientHeight;

      // Destructure position and direction values
      let { x, y, dirX, dirY } = position.current;

      // Bouncing logic for X and Y boundaries based on the banner dimensions
      if (y + svgHeight >= bannerHeight || y < 0) {
        dirY *= -1; // Reverse Y direction
      }
      if (x + svgWidth >= bannerWidth || x < 0) {
        dirX *= -1; // Reverse X direction
      }

      // Update position based on the current direction
      x += dirX * speed;
      y += dirY * speed;

      // Update position in the ref (no re-render)
      position.current = { x, y, dirX, dirY };

      // Update the position of the SVG on the screen
      svgElement.style.left = `${x}px`;
      svgElement.style.top = `${y}px`;

      // Call the next frame for continuous animation
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    window.requestAnimationFrame(animate);

    return () => {
      // Cleanup if the component is unmounted
      cancelAnimationFrame(animate);
    };
  }, [position]);

  return (
    <div ref={bannerRef} className={styles.bannerSection}>
      <div className={styles?.bannerSvgWrap} ref={svgWrapRef}>
        <div
          ref={svgRef}
          className={styles.bannerSvg}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <div
        style={{ position: "absolute", top: "0", width: "100%" }}
        className={styles?.bannerSectionWrap}
      >
        <div className={styles.bannerSectionTitle}>
          <p className={`${styles.bannerTitle} text-6-med `}>{tag}</p>
          <h1
            className={`${styles.bannerHeading} heading-3`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <div
          className={`${styles.bannerDescription} text-2`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
