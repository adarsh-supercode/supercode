"use client";
import { WhiteInflateLogo } from "@/app/components/AnimationLOgo/WhiteInflateLogo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
// import BannerSection from "./components/BannerSection";
import DemoBannerSection from "./components/DemoBannerSection";
import Visionary from "./components/Visionary";
import { Canvas, useFrame } from "@react-three/fiber";
import WhatWeDo from "./components/WhatWeDo";
import Results from "./components/Results";
import SuperHitsSection from "@/app/components/Sections/superhits/SuperhitsSection";
import ClientSection from "@/app/components/Sections/clients/ClientSection";
import * as styles from "./homepage.module.css";
import { PerspectiveCamera } from "@react-three/drei";


export default function HomeComponent({ data }) {
  const {
    banner,
    ourAmazingClients,
    growth,
    impact,
    results,
    whatToDo,
    visionary,
  } = data || {};
  const { caseStudiesData, title, link } = impact || {};
  const { frameSvg } = growth || {};
  const animationWrapRef = useRef(null);
  const resultsWrapLogoRef = useRef(null);
  const logoAnimationRef = useRef(null);
  const sectionMainRef = useRef(null);
  const secmainImageElementRef = useRef(null);
  const imageElementRef = useRef(null);
  const sectionBannerRef = useRef(null);
  const clientSectionRef = useRef(null);
  const videoRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(0);

  // Update `screenWidth` only on the client side
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Set initial screen width after component mounts
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const imageElement = imageElementRef.current;
    const sectionMainWrap = sectionMainRef.current;
    const sectionBanner = sectionBannerRef.current;
    const imagMainWrap = secmainImageElementRef.current;

    if (screenWidth === 0) return;
    // Dynamic values based on screen width
    const startOffset = screenWidth <= 1440 ? "top 25%" : "top 60%";
    const endOffset = screenWidth <= 1440 ? "top 1%" : "top 10%";
    const finalHeight = screenWidth <= 1440 ? "50%" : "70%";

    // Initial GSAP setups
    gsap.set(sectionMainWrap, { background: "black" });
    gsap.set(sectionBanner, { opacity: 1 });
    gsap.set(imageElement, { width: "300px", height: "300px" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageElement,
        start: "top-=300 center",
        end: "bottom center",
        scrub: true,
        // markers: true,
      },
    });

    // First part of animation
    tl.to(imageElement, {
      width: "100%",
      height: "auto",
      ease: "none",
    })
      .to(
        sectionBanner,
        {
          opacity: 0,
          duration: 0.3,
        },
        0
      )
      .to(
        sectionMainWrap,
        {
          background: "black",
          duration: 0.3,
        },
        0
      );

    if (window.innerWidth >= 768) {
      tl.to(imageElement, {
        scrollTrigger: {
          trigger: imagMainWrap,
          start: startOffset,
          end: endOffset,
          pin: true,
          pinSpacer: false,
          scrub: true,
          // markers: true,
        },
      });
    } else {
      tl.to(imageElement, {
        scrollTrigger: {
          trigger: imagMainWrap,
          start: startOffset,
          end: endOffset,
          scrub: true, // Enable smooth scrolling without pinning
          // markers: true,
        },
        height: finalHeight,
      });
    }

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScrollTrigger);
    window.addEventListener("resize", refreshScrollTrigger);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("load", refreshScrollTrigger);
      window.removeEventListener("resize", refreshScrollTrigger);
    };
  }, [screenWidth]);

  const handlePlayButtonClick = () => {
    const videoElement = videoRef.current;

    if (videoElement.paused) {
      // Play the video if it's paused
      videoElement.play();
      videoElement.setAttribute("data-cursor", "pauseButton");

      setTimeout(() => {
        videoElement.style.cursor = ""; // Reset to original or inherited style
      }, 0);
    } else {
      // Pause the video if it's playing
      videoElement.pause();
      videoElement.setAttribute("data-cursor", "playbutton");

      setTimeout(() => {
        videoElement.style.cursor = ""; // Reset to original or inherited style
      }, 0);
    }
  };
////
  useEffect(() => {
    if (!animationWrapRef.current || !resultsWrapLogoRef.current) return;
    const animationWrap = resultsWrapLogoRef.current;
    const animationLogoWrap = animationWrapRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: animationWrap,
        start: "top top",
        end: () => `+=${animationLogoWrap.offsetHeight}`,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [resultsWrapLogoRef.current, animationWrapRef.current]);

  useEffect(() => {
    let clientSection = logoAnimationRef.current;
    let footerHome = document.getElementById("footer-home");
    const handleScroll = () => {
      if (footerHome) {
        let { top } = footerHome.getBoundingClientRect();
        // console.log({top})
        if (top < 900) {
          clientSection.style.opacity = 0;
        } else {
          clientSection.style.opacity = 1;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const AutoRotateLogo = () => {
    const logoRef = useRef();
    const rotationSpeedX = 0.002;
    const initialScale = 6.5;
    let scrollTimeout;

    useFrame(() => {
      if (logoRef.current) {
        logoRef.current.rotation.x += rotationSpeedX;
      }
    });

    useEffect(() => {
      let lastScrollPos = 0;

      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const scrollDelta = currentScrollPos - lastScrollPos;
        const yRotationSpeed =
          scrollDelta > 0 ? 0.06 : scrollDelta < 0 ? -0.06 : 0;

        gsap.to(logoRef.current.rotation, {
          y: `+=${yRotationSpeed}`,
          duration: 0.1,
          overwrite: "auto",
        });

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
          gsap.to(logoRef.current.rotation, {
            y: `+=0`,
            duration: 0.1,
          });
        }, 200);
        lastScrollPos = currentScrollPos;
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }, []);

    return (
      <mesh
        ref={logoRef}
        scale={[initialScale, initialScale, initialScale]}
        position={[0, 0, 0]}
      >
        <WhiteInflateLogo />
      </mesh>
    );
  };

  return (
    
    <div style={{ overflow: "hidden" }}>
      <div
        className={`${styles.sectionMainWrap}`}
        ref={sectionMainRef}
        data-cursor="white"
      >
        <div className={`${styles.sectionBanner}`} ref={sectionBannerRef}>
          {/* <BannerSection banner={banner} /> */}
          <LogoBanner banner={banner}/>
          {/* <DemoBannerSection banner={banner} /> */}
        </div>
        <Visionary visionary={visionary} />
        <div className="container">
          <div
            ref={secmainImageElementRef}
            className={styles?.secmainImageElement}
          >
            <div className={`${styles.sectionMainimage}`}>
              <div ref={imageElementRef} className={styles.frameSvg}>
                <video
                  ref={videoRef}
                  className={styles.video}
                  loop
                  muted
                  playsInline
                  // src="/assets/homepageVideo.mp4"
                  poster="/assets/video-thumbnail.jpg"
                  allowFullScreen
                  onClick={handlePlayButtonClick}
                  // onMouseEnter={handleMouseEnter}
                  // data-cursor="playbutton"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles?.AnimationLogoWrap} ref={animationWrapRef}>
        <div>
          <div className={styles.overlay} />
          <div ref={logoAnimationRef} className="logoAnimationRef">
            <div
              className={`${styles?.resultsWrapLogo}`}
              ref={resultsWrapLogoRef}
            >
              <Canvas
                key={Date.now()}
                style={{ width: "100%", height: "1000px" }}
              >
                <ambientLight intensity={0.2} />
                <pointLight position={[1, 1, 1]} intensity={10} />
                <pointLight position={[-1, -1, -1]} intensity={10} />
                <directionalLight position={[-1, 0, 3]} intensity={5} />
                <AutoRotateLogo />
                <PerspectiveCamera
                  makeDefault
                  position={[0, 0, 2]}
                  fov={38}
                  near={0.1}
                  far={500}
                />
              </Canvas>
            </div>
          </div>
          <div className={styles?.AnimationLogoWrapcontent}>
            <WhatWeDo whatwedo={whatToDo} />
            <Results data={results} />

            <div className={styles.superHitsWrap}>
              <div className={styles?.SuperHitMainHeading}>
                {title && <h2 className="heading-3 textClrBlack">{title}</h2>}
              </div>
              <SuperHitsSection data={caseStudiesData} link={link} />
            </div>
          </div>
          <div ref={clientSectionRef}>
            <ClientSection clients={ourAmazingClients} />
          </div>
        </div>
      </div>
    </div>
  );
}
