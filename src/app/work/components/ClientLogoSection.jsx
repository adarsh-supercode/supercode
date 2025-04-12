import React, { useState } from "react";
import * as styles from "../css/clientlogo.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ClientLogoSection({ clientLogo }) {
  const { title, clinetsData } = clientLogo || {};
  const [hoveredClient, setHoveredClient] = useState(null); // Track hovered client index
  const [imagePosition, setImagePosition] = useState(null); // Track image position

  const perLink = "case-study";

  // Handle mouse movement to update image position
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const offsetY = 130; // Adjust for slight offset from the cursor
    setImagePosition({ x: clientX, y: clientY - offsetY });
  };

  // Set hovered client index when mouse enters the element
  const handleMouseEnter = (clientIndex) => {
    setHoveredClient(clientIndex);
    console.log("entered")
  };

  // Reset hovered client and image position when mouse leaves the element
  const handleMouseLeave = () => {
    setHoveredClient(null);
    setImagePosition(null);
    console.log("left")
  };

  return (
    <div className="container">
      <h2 className={`${styles?.clientLogoHeading} heading-7`}>{title}</h2>
      <div className={styles?.ClientLogosWrap} 
      >
        <div
          className={`${styles?.ClientLogoSection}`}
        
        >
          {clinetsData?.map((e, index) => (
            <div
              key={index}
              style={{ position: "relative" }}
              // Track mouse movement
            >
              <Link
                href={`/${perLink}/${e.client_post?.post_title?.replaceAll(
                  " ",
                  "-"
                )}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              >
                <div dangerouslySetInnerHTML={{ __html: e.logoSvg }}  style={{pointerEvents:"none"}}/>
              </Link>

              {/* Render hover image only when hoveredClient matches and position is set */}
              {imagePosition && hoveredClient === index && (
                <div
                  id={`hoverImage${index}`}
                  className={styles.hoveredImageWrap}
                  style={{
                    opacity: 1,
                    zIndex: 9999,
                    position: "fixed",
                    pointerEvents: "none",
                    left: `${imagePosition.x}px`,
                    top: `${imagePosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.3s ease, transform 0.1s ease",
                  }}
                >
                  <Image
                    src={e?.client_post?.featured_img || e.postimage.url}
                    alt="Hovered Image"
                    className={styles.hoveredImage}
                    width={302}
                    height={200}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
