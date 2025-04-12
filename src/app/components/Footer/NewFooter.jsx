"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as styles from "./footer.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import InsightsHome from "../insight/InsightSection";
import PrimaryButton from "../button/PrimaryButton";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";
import { BlueINflateLogo } from "../AnimationLOgo/BlueInflateLogo";
import { Canvas, useThree } from "@react-three/fiber";
import { BlackInflateLogo } from "../AnimationLOgo/BlackInflateLogo";
import { FooterLogoBlue } from "../AnimationLOgo/FooterBlueLogo";
gsap.registerPlugin(ScrollTrigger);

export default function NewFooter({ data }) {


  const pathname = usePathname();

  const [footerData, setFooterData] = useState({
    Pagetype: "",
    fovValue: 11,
    cameraPosition: [0, 0, 0], // [-3.5, 4.8, 1.2],
    rotationPosition: [1.62, 0.05, -1.05], //1.62, 0.05, -1.05
    ambientLightintensity: 1.5,
    directionalLightintensity: 1,
    autoRotateSpeed: 0.8,
    // scale: [0.1, 0.1, 0.1],
    allpageScale: [0.1, 0.1, 0.1],
    // logoPosition: [0, 0, 0],
    canvasClassName: "",
    footerBgColor: "",
    blackText: "",
    pageData: "",
    insightScoop: "",
    FooterLogo: false,
  });
  const {
    fovValue,
    cameraPosition,
    rotationPosition,
    ambientLightintensity,
    directionalLightintensity,
    logoPosition,
    autoRotateSpeed,
    scale,
    allpageScale,
    Pagetype,
    blackText,
    FooterLogo,
    pageData,
    footerBgColor,
    insightScoop,
    canvasClassName,
  } = footerData || {};
  //  //console.log(rotationPosition)
  // const [canvasLogoView, setcanvasLogoView] = useState(0);
  const { contact, copyRights, logo, menu, social_media_link } = pageData || {};
  // //console.log(pageData,"footer")
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const orbitControlsRef = useRef(null);
  const copyrightRef = useRef(null);

  const currentYear = new Date().getFullYear();

  let scrollTimeout;

  const updateFooterData = (key, value) => {
    setFooterData((prev) => ({ ...prev, [key]: value }));
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 475) {
      updateFooterData("scale", [0.025, 0.025, 0.025]);
      updateFooterData("allpageScale", [0.06, 0.06, 0.06]);
    } else if (width <= 768) {
      updateFooterData("scale", [0.035, 0.035, 0.035]);
      updateFooterData("allpageScale", [0.07, 0.07, 0.07]);
      updateFooterData("logoPosition", [0, -0.001, 0]);
    } else if (width <= 900) {
      updateFooterData("scale", [0.035, 0.035, 0.035]);
      updateFooterData("allpageScale", [0.07, 0.07, 0.07]);
      updateFooterData("logoPosition", [0, -0.001, 0]);
    } else if (width <= 1024) {
      updateFooterData("scale", [0.04, 0.04, 0.04]);
      updateFooterData("allpageScale", [0.07, 0.07, 0.07]);
      updateFooterData("logoPosition", [0, -0.001, 0]);
    } else if (width <= 1200) {
      updateFooterData("scale", [0.045, 0.045, 0.045]);
      updateFooterData("allpageScale", [0.12, 0.12, 0.12]);
      updateFooterData("logoPosition", [0, -0.0033, 0]);
    } else if (width <= 1400) {
      // updateFooterData("scale", [0.06, 0.06, 0.06]);
      updateFooterData("scale", [0.058, 0.058, 0.058]);
      updateFooterData("allpageScale", [0.16, 0.16, 0.16]);
      updateFooterData("logoPosition", [0, -0.0039, 0]);
    } else if (width <= 1600) {
      // updateFooterData("scale", [0.1, 0.1, 0.1]);
      updateFooterData("scale", [0.065, 0.065, 0.065]);
      updateFooterData("allpageScale", [0.2, 0.2, 0.2]);
      updateFooterData("logoPosition", [0, -0.0039, 0]);
    } else {
      updateFooterData("scale", [0.084, 0.084, 0.084]);
      updateFooterData("allpageScale", [0.24, 0.24, 0.24]);
      updateFooterData("logoPosition", [0, -0.0039, 0]);
    }
  };
  //console.log("scale", scale);
  useEffect(() => {
    if (data) {
      updateFooterData("insightScoop", data?.insights.acf.insight_scoop);
      updateFooterData("pageData", data?.footerData);
    }
  }, [data]);

  useEffect(() => {
    if (Pagetype !== "home" && Pagetype) {
      updateFooterData("insightScoop", "");
    } else {
      updateFooterData("insightScoop", data?.insights.acf.insight_scoop);
    }
  }, [Pagetype]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    updateFooterData(
      "Pagetype",
      pathname === "/"
        ? "home"
        : pathname === "/about"
        ? "about"
        : pathname === "/careers"
        ? "careers"
        : pathname === "/services"
        ? "service"
        : pathname === "/work"
        ? "work"
        : pathname === "/contact"
        ? "contact"
        : pathname === "/privacy"
        ? "privacy"
        : pathname === "/terms"
        ? "terms"
        : pathname === "/impact"
        ? "impact"
        : pathname.includes("web-development")
        ? "web-development"
        : pathname.includes("web-design")
        ? "web-design"
        : pathname.includes("/resources")
        ? "resources"
        : pathname.includes("/case-study")
        ? "case-study"
        : ""
    );
  }, [pathname, pageData]);

  useEffect(() => {
    if (Pagetype !== "home") {
      updateFooterData("ambientLightintensity", 6);
      updateFooterData("directionalLightintensity", 5);
      updateFooterData("canvasClassName", styles.footerCanvas);
      updateFooterData("fovValue", 0.12999999999999999);
      updateFooterData("cameraPosition", [-3.5, 0.5999999999999996, 1.2]);
    } else {
      updateFooterData("fovValue", 10);
      updateFooterData("cameraPosition", [0, 0, 0]);
      updateFooterData("ambientLightintensity", 6);
      updateFooterData("directionalLightintensity", 1);
      updateFooterData("canvasClassName", "");
    }

    updateFooterData(
      "blackText",
      Pagetype != "home" && Pagetype != "careers" && Pagetype != "web-design"
        ? styles.blackText
        : styles.whiteText
    );

    updateFooterData(
      "FooterLogo",
      Pagetype === "about" ||
        Pagetype === "work" ||
        Pagetype === "service" ||
        Pagetype == "web-development" ||
        Pagetype == "resources" ||
        Pagetype == "case-study" ||
        Pagetype == "impact" ||
        Pagetype == "privacy" ||
        Pagetype == "terms"
        ? true
        : false
    );
  }, [Pagetype, pageData]);

  useEffect(() => {
    const handleFooterBgColor = () => {
      switch (Pagetype) {
        case "home":
          updateFooterData("footerBgColor", "#072AC5");
          break;
        case "about":
          updateFooterData("footerBgColor", "#70FF70");
          break;
        case "work":
          updateFooterData("footerBgColor", "#FF70B8");
          break;
        case "careers":
          updateFooterData("footerBgColor", "#000");
          break;
        case "service":
          updateFooterData("footerBgColor", "#747474");
          break;
        case "web-development":
          updateFooterData("footerBgColor", "#F5F5F5");
          break;
        case "web-design":
          updateFooterData("footerBgColor", "#000");
          break;
        case "case-study":
          updateFooterData("footerBgColor", "#747474");
          break;
        default:
          updateFooterData("footerBgColor", "#F5F5F5");
          break;
      }
    };

    handleFooterBgColor();
  }, [Pagetype, pageData]);

  useEffect(() => {
    if (pageData) {
      // Initial setup
      handleResize();
    }
  }, [pageData]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let setTimeoutId;
    // Control auto-rotate on scroll
    const handleScrollStart = () => {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.autoRotate = false;
      }
      clearTimeout(scrollTimeout);
    };

    const handleScrollEnd = () => {
      if (orbitControlsRef.current) {
        scrollTimeout = setTimeout(() => {
          orbitControlsRef.current.autoRotate = true;
        }, 200);
      }
    };
    if (Pagetype === "home" && insightScoop) {
      clearTimeout(setTimeoutId);
      setTimeoutId = setTimeout(() => {
        // Register ScrollTrigger and initialize GSAP animations
        gsap.registerPlugin(ScrollTrigger);
        let footerHeight = footerRef.current.offsetTop;

        let bottomVale = 150;
        bottomVale = footerHeight.y < 7820 ? bottomVale - 163 : bottomVale;    
        gsap.to(canvasRef.current, {
          scrollTrigger: {
            id: "logo",
            trigger: footerRef.current,
            start: "top center+=300",
            end: `bottom-=${bottomVale} bottom-=100`,
            scrub: 3,
            // markers: true,
            onUpdate: (self) => {
              const newFov = gsap.utils.mapRange(0, 1, 0.7, 0.30, self.progress);
              const newYPosition = gsap.utils.mapRange(0, 1, -4.8,-6, self.progress);
              const newXrotation = gsap.utils.mapRange(0, 1, 0, 3.1, self.progress);
        
              updateFooterData("fovValue", newFov);
              updateFooterData("cameraPosition", [0, 0, 0]);
              updateFooterData("rotationPosition", [newXrotation, -0.55, 0]);
              // console.table({
              //   progress: self.progress.toFixed(2),
              //   fovValue: newFov.toFixed(2),
              //   yPosition: newYPosition.toFixed(2),
              //   xRotation: newXrotation.toFixed(2),
              // });
            },
            
          },
          
        });
                
      
        ScrollTrigger.refresh();
      }, 1000);
      window.addEventListener("scroll", handleScrollStart, { passive: true });
      window.addEventListener("scroll", handleScrollEnd, { passive: true });
    } else {
      window.removeEventListener("scroll", handleScrollStart);
      window.removeEventListener("scroll", handleScrollEnd);
      gsap.killTweensOf(footerRef.current);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    }
    return () => {
      clearTimeout(setTimeoutId);
      window.removeEventListener("scroll", handleScrollStart);
      window.removeEventListener("scroll", handleScrollEnd);
      gsap.killTweensOf(footerRef.current);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footerRef.current) {
          trigger.kill();
        }
      });
      ScrollTrigger.refresh();
    };
  }, [Pagetype, pathname, insightScoop, pageData]);

  useEffect(() => {
    // //console.log("Component mounted or returned");

    // Get the element to observe
    const footerElement = document.querySelector("." + styles.footerContainer);
    if (footerElement) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (canvasRef.current) {
            //console.log("Footer visible:", entry.isIntersecting);
            // Add or remove a class based on intersection
            if (entry.isIntersecting) {
              canvasRef.current.classList.add(styles.visible); // Add class to make it visible
            } else {
              canvasRef.current.classList.remove(styles.visible); // Remove class to hide it
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px 100px 0px",
        }
      );

      // Start observing the footer element
      observer.observe(footerElement);

      // Cleanup function
      return () => {
        //console.log("Component unmounted or observer disconnected");
        if (canvasRef.current) {
          canvasRef.current.classList.remove(styles.visible); // Ensure it's hidden on unmount
        }
        observer.disconnect(); // Disconnect observer
      };
    }
  }, []);

  // Ensure CSS fallback for initial opacity

  useEffect(() => {
    const element = document.querySelector("main");
    if (!element) return;

    const scrollTime = gsap.timeline({
      scrollTrigger: {
        id: "body-scroll",
        trigger: element,
        start: "top bottom",
        end: "bottom-=100 bottom",
        // markers:true,
        toggleActions: "play none none reverse",
        onUpdate: ({ progress }) => {
          // //console.log(progress,'progress');

          if (progress > 0.9) {
            // //console.log(Pagetype,'Pagetype')
            gsap.set(footerRef.current, {
              backgroundColor: Pagetype == "web-design" ? "black" : "",
            });
          } else {
            // gsap.set(footerRef.current, { backgroundColor: "#F5F5F5" });
          }

          // //console.log(progress,'progress')
        },
      },
    });
    return () => scrollTime.kill();
  }, [Pagetype]);

  // const RenderLogo = Pagetype == "home" ? BlackInflateLogo : FooterLogoBlue;
  const RenderLogo = Pagetype == "home" ? FooterLogoBlue : FooterLogoBlue;
  // const RenderLogo =FooterLogoBlue;
  // const RenderLogo = Pagetype == "home" ? FooterLogoBlue : BlackInflateLogo;


  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const handleChange = (type, axis, value) => {
    if (type === 'position') {
      setPosition((prev) =>
        prev.map((pos, i) => (i === axis ? value : pos))
      );
    } else if (type === 'rotation') {
      setRotation((prev) =>
        prev.map((rot, i) => (i === axis ? value : rot))
      );
    }
  };

  const axes = ["X", "Y", "Z"];

  return (
    <div
      id="footer-home"
      ref={footerRef}
      className={`${styles?.footerContainer} ${
        Pagetype === "web-design" ? "posRelative" : ""
      } ${Pagetype === "careers" ? "careersFooter" : ""}`}
      data-cursor={
        Pagetype === "web-design" || Pagetype === "careers"
          ? "white"
          : "default"
      }
    >
      <div className={`${styles?.footerContentContainer}`}>
        {insightScoop && (
          <InsightsHome insightScoop={insightScoop} styles={styles} />
        )}
        <div
          className={`${styles?.footerWrapper}  ${
            Pagetype === "contact" ? styles.FooterWrapperContact : ""
          }`}
        >
          <div className="container">
            <div
              className={`${styles?.footerContent} ${
                Pagetype === "contact" ? styles.contactPageClass : ""
              }`}
            >
              <div className={styles?.footerLogoText}>
                <Link href="/">
                  {logo && (
                    <div
                      className={FooterLogo ? styles?.blackLogo : ""}
                      dangerouslySetInnerHTML={{
                        __html: logo,
                      }}
                    />
                  )}
                </Link>
                <div className={styles?.footerPageLinks}>
                  {menu?.map(({ subMenu }, index) => (
                    <ul className={styles?.footerLinks} key={index}>
                      {subMenu?.map(({ link }, index) => (
                        <li key={index} className={`text-5 ${blackText}`}>
                          <Link
                            href={link?.url || "/"}
                            data-text={link.title}
                            target={link.target}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div>
                  <ul
                    className={`${styles?.footerLinks} ${styles?.mobileHide}`}
                  >
                    {social_media_link?.map((e, index) => {
                      return (
                        <li key={index} className={`text-5 ${blackText}`}>
                          <Link
                            href={e.media_link.url}
                            target={e.media_link.target}
                            data-text={e.media_link.title}
                          >
                            {e.media_link.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {contact && (
                <div className={styles?.tellusContent}>
                  <p className={`heading-4 ${blackText}`}>{contact?.title}</p>
                  <PrimaryButton
                    label={contact?.button?.title}
                    href={contact?.button?.url}
                    target={contact.button.target}
                    icon={true}
                    Pagetype={Pagetype}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <ul
            className={`${styles?.footerMediaLinks} ${styles?.footerLinks}  ${
              Pagetype === "contact" ? styles.contactPageClass : ""
            }`}
          >
            {social_media_link?.map((e, index) => {
              return (
                <li key={index} className={`text-5 ${blackText}`}>
                  <Link
                    href={e.media_link.url}
                    target={e.media_link.target}
                    data-text={e.media_link.title}
                  >
                    {e.media_link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles?.copyrightSection} ref={copyrightRef}>
          <div className="container">
            <div className={styles?.copyrightContent}>
              <p className="text-8-med "> © {currentYear} Supercode®Design</p>
              <ul
                className={`${styles?.footerLinks} ${styles?.termsPageLinks}`}
              >
                {copyRights?.links?.map(({ link }, index) => (
                  <li key={index} className="text-8-med ">
                    <Link
                      href={link.url || "/"}
                      target={link.target}
                      data-text={link.title}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={canvasClassName}
          style={{ position: "relative", zIndex: "1" }}
        >
          <Canvas
            key={Pagetype}
            camera={{ position: cameraPosition }}
            className={`${
              Pagetype === "home"
                ? styles.homefooterLogo
                : styles.staticFooterLogo
            }`}
            ref={canvasRef}
          >
            <CameraController
              cameraPosition={[0, 1, 3.9]} //{cameraPosition}
              fovValue={fovValue}
            />
            <ambientLight intensity={ambientLightintensity} />
            <directionalLight intensity={directionalLightintensity} />
            <OrbitControls autoRotate autoRotateSpeed={autoRotateSpeed} />
            {/* <axesHelper args={[3]}/> */}
            {/* */}
            <RenderLogo
              rotation={Pagetype == "home" ? rotationPosition : [0, 0, 0]}
              // rotation={[4,4,]}
              position={Pagetype == "home" ? cameraPosition : [0, 0, 0]}
              scale={Pagetype == "home" ? scale : allpageScale} //[0.24, 0.24, 0.24]
            />
          </Canvas>
          <div style={{display:"none", position: "relative", zIndex: "9999999999", backgroundColor: "white", bottom: "0", padding: "20px", width:"40%", }}>
      {/* Position Controls */}
      <h3>Position</h3>
      {axes.map((axis, index) => (
        <div key={`position-${axis}`} style={{ marginBottom: "10px" }}>
          <label>{axis}:</label>
          {/* Range Input */}
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={position[index]}
            onChange={(e) =>
              handleChange('position', index, parseFloat(e.target.value))
            }
          />
          {/* Manual Number Input */}
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={position[index]}
            onChange={(e) =>
              handleChange('position', index, parseFloat(e.target.value))
            }
            style={{
              width: "60px",
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* Display Value */}
          <span style={{ marginLeft: "10px" }}>{position[index].toFixed(1)}</span>
        </div>
      ))}

      {/* Rotation Controls */}
      <h3>Rotation</h3>
      {axes.map((axis, index) => (
        <div key={`rotation-${axis}`} style={{ marginBottom: "10px" }}>
          <label>{axis}:</label>
          {/* Range Input */}
          <input
            type="range"
            min="-Math.PI"
            max="Math.PI"
            step="0.01"
            value={rotation[index]}
            onChange={(e) =>
              handleChange('rotation', index, parseFloat(e.target.value))
            }
          />
          {/* Manual Number Input */}
          <input
            type="number"
            min="-3.14"
            max="3.14"
            step="0.01"
            value={rotation[index]}
            onChange={(e) =>
              handleChange('rotation', index, parseFloat(e.target.value))
            }
            style={{
              width: "60px",
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {/* Display Value */}
          <span style={{ marginLeft: "10px" }}>{rotation[index].toFixed(2)}</span>
        </div>
      ))}
    </div>
        </div>
      </div>
    </div>
  );
}

function CameraController({ cameraPosition, fovValue }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(
      cameraPosition[0],
      cameraPosition[1],
      cameraPosition[2]
    );
    camera.fov = fovValue;
    camera.updateProjectionMatrix();
  }, [cameraPosition, camera, fovValue]);

  return null;
}

	