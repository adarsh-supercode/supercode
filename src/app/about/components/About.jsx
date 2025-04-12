"use client";
import React, { useEffect, useRef } from "react";
import BannerSection from "../components/BannerSection";
import { AboutPage } from "@/utilites/helper";
import Leadership from "../components/Leadership";
import WhySection from "../components/WhySection";
import WeBelieveSection from "../components/WeBelieveSection";
import ValueSection from "../components/ValueSection";
import JoinSection from "../components/JoinSection";
import styles from "../page.module.css";
import gsap from "gsap";
export default function About({ pageData }) {
  const { banner, leadership, whySupercode, weBelieve, ourValues, joinUs } =
    pageData || {};

  const mainpageref = useRef(null);
  const webelieveref = useRef(null);
  useEffect(() => {
    const pageBody = document.body;

    if (mainpageref.current && webelieveref.current) {
      gsap.to(pageBody, {
        backgroundColor: "#70FF70",
        scrollTrigger: {
          trigger: webelieveref.current,
          start: "top top",
          toggleActions: "play none none reverse",
          immediateRender: true,
          overwrite: "auto",
        },
        duration: 0.5,
      });
    }
    return () => {
      pageBody.style.backgroundColor = "#F5F5F5";
    };
  }, []);

  return (
    <div className={styles?.mainPageSection} ref={mainpageref}>
      <div className="noiseMainWrap">
        <div className={styles?.mainPageSectionContainer}>
          <BannerSection banner={banner} />
          <Leadership leadership={leadership} />
          <WhySection whySupercode={whySupercode} />
          <div ref={webelieveref}>
            <WeBelieveSection weBelieve={weBelieve} />
          </div>

          <ValueSection ourValues={ourValues} />
          <JoinSection joinUs={joinUs} />
        </div>
      </div>
    </div>
  );
}
