"use client";
import React, { useEffect, useRef } from "react";
import ServiceCardSection from "./components/ServiceCardSection";
import BannerSection from "./components/BannerSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Services({ pageData }) {
  const { banner, cards } = pageData || {};
  const sectionRef = useRef(null);
  const MainsectionRef = useRef(null);

  useEffect(() => {
    const footerHome = document.getElementById('footer-home');
    const pageBody=document.body;
    const sectionRefCurrent = sectionRef.current;
    const mainSectionRefCurrent = MainsectionRef.current;
  
    if (sectionRefCurrent && mainSectionRefCurrent) {
      const backgroundColor = "#979797";
  
      // Create a GSAP timeline for scroll-triggered animations
      gsap.to(pageBody,{
        backgroundColor:backgroundColor,
        scrollTrigger: {
          trigger: sectionRefCurrent,
          start: "top top",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
          scrub: true, // Synchronize animations with scroll progress
          // markers: true, // Enable markers for debugging
        },
      })
    }
  }, []); 
  return (
    <div className="noiseMainWrap">
      <div ref={MainsectionRef} >
        <BannerSection banner={banner} />
        <div ref={sectionRef}>
          <ServiceCardSection cards={cards} />
        </div>
      </div>
    </div>
  );
}
