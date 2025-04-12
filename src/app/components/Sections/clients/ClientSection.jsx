// ClientSection.jsx
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as styles from "./clientsection.module.css";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const ClientSection = ({ clients, isLoadedMore }) => {
  const { title, Clients } = clients || {};
  const { data: clientLinks } = Clients || {};
  const [hoveredClient, setHoveredClient] = useState(null);
  const [transformID, setTransformID] = useState(null);
  const [imagePosition, setImagePosition] = useState(null);
  const clientSectionRef = useRef(null);
  const pathname = usePathname();
  const showImage = (transformID) => {
    if (transformID) {
      gsap.to(`#${transformID}`, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  };

  const hideImage = (transformID) => {
    if (transformID) {
      gsap.to(`#${transformID}`, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  useEffect(() => {
    if (hoveredClient) {
      showImage(transformID);
    } else {
      hideImage(transformID);
    }
  }, [hoveredClient, transformID]);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const offsetY = 100;
    setImagePosition({ x: clientX, y: clientY - offsetY });
  };

  useEffect(() => {
    const pageBody = document.getElementsByTagName('body');
    // const body
    
    const setTimeoutId = setTimeout(() => {

      const sectionRef = clientSectionRef.current;
      if (pageBody) {
        const backgroundColor = pathname === "/" ? "#072AC5" : "#FF70B8";
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef,
            start: "top top",
            end: "top -70",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        });
        tl.to(['body',sectionRef], {
          backgroundColor: backgroundColor,
          duration: 0.8,
        })
      }
    }, 200);
  
    // Refresh ScrollTrigger when more content is loaded
    if (isLoadedMore) {
      ScrollTrigger.refresh();
    }
  
    return () => {
      clearTimeout(setTimeoutId);
      ScrollTrigger.killAll();
    };
  }, [pathname, isLoadedMore]);

  return (
    <div className={`${styles.clientSection}  ${
          pathname === "/" ? styles.bgtransparent : ""
        }`} ref={clientSectionRef}>
      <div className={styles.overlay} />
      <div
        className={`${styles.clientContainer} ${
          pathname === "/work" ? styles.bgtransparent : ""
        }`}
      >
        <div className="container">
          <h2 className="text-4-med textClrBlack">{title}</h2>
          <div className={styles.clientContentWrap}>
            <div className={`${styles.clientwrap} text-1 textClrBlack`}>
              {clientLinks && clientLinks.length > 0 ? (
                clientLinks.map((client, index) => {
                  const { title, link, image,case_study_link } = client || {};
                  return (
                    <div
                      key={index}
                      className={styles.clientItem}
                      onMouseEnter={() => {
                        setHoveredClient(title);
                        setTransformID(`hoverImage${index}`);
                        handleMouseMove({ clientX: 0, clientY: 0 });
                      }}
                      onMouseLeave={() => {
                        setHoveredClient(null);
                        setImagePosition(null);
                      }}
                      onMouseMove={handleMouseMove}
                    >
                      <Link
                        // href={client.slug || "/"}
                        href={case_study_link?.url || "/"}
                        className="text-1 textClrBlack"
                      >
                        {title}
                      </Link>
                      {index < clientLinks.length - 1 && " / "}

                      {imagePosition && (
                        <div
                          id={`hoverImage${index}`}
                          className={styles.hoveredImageWrap}
                          style={{
                            opacity: hoveredClient === title ? 1 : 0,
                            zIndex: hoveredClient === title ? 9999 : -9999,
                            position: "fixed",
                            pointerEvents: "none",
                            left: `${imagePosition.x}px`,
                            top: `${imagePosition.y}px`,
                            transform: "translate(-50%, -50%)",
                            transition: "opacity 0s ease",
                          }}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className={styles.hoveredImage}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No clients available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;