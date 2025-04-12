"use client";
import { CareerPage } from "@/utilites/helper";
import React, { useEffect, useRef } from "react";
import * as styles from "../page.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BannerSection from "./BannerSection";
import LookforSection from "./LookforSection";
import RolesSection from "./RolesSection";
import LoadModel from "./LoadModel";

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage({ pageData }) {
  const { banner, whatWeLookFor, whyJoinSupercode, roles } = pageData || {};
  const mainPageRef = useRef(null);
  const lookforRef = useRef(null);

  useEffect(() => {
    const pageBody = document.body; 
    pageBody.style.backgroundColor = "#FF70B8";

    if (mainPageRef.current && lookforRef.current) {
      gsap.to(pageBody, {
        backgroundColor: "black", 
        scrollTrigger: {
          trigger: lookforRef.current, 
          start: "top top+=60%",       
          toggleActions: "play none none reverse", 
          // markers:true
        },
        duration: 0.5,
      });
    }
    return () => {
      pageBody.style.backgroundColor = "transparent";
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="noiseMainWrap">
      <div ref={mainPageRef} className={styles.mainPagebg}>
        <BannerSection banner={banner} />
        <div ref={lookforRef}>
          <LookforSection whatWeLookFor={whatWeLookFor} />
        </div>
        <div className={styles.Animationebg} data-cursor="white">
          <LoadModel whyJoinSupercode={whyJoinSupercode} />
        </div>
        <RolesSection roles={roles} />
      </div>
    </div>
  );
}
