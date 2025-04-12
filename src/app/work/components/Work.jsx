"use client";
import { WorkPage } from "@/utilites/helper";
import React, { useEffect, useRef, useState } from "react";
import SuperHitsSection from "@/app/components/Sections/superhits/SuperhitsSection";
import ClientLogoSection from "./ClientLogoSection";
import ClientSection from "@/app/components/Sections/clients/ClientSection";
import BannerSection from "./BannerSection";
import { ParallaxProvider } from "react-scroll-parallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Work({ pageData }) {
  const { banner, ourWork, ourAmazingClients, ourClinets } = pageData || {};
  const { caseStudiesData } = ourWork || {};
  // console.log("work",pageData)
  //   const { superhits, clientData, clientLogo } = WorkPage || {};
  const [isLoadedMore, setIsLoadedMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadedMore(true);
  };
  const workmainpageref = useRef(null);
  const clientLogosec = useRef(null);
  useEffect(() => {
    const pageBody = document.body;

    if (workmainpageref.current && clientLogosec.current) {
      gsap.to(pageBody, {
        backgroundColor: "#FF70B8",
        scrollTrigger: {
          trigger: clientLogosec.current,
          start: "top top",
          toggleActions: "play none none reverse",
          immediateRender: true,
          overwrite: "auto",
          // markers: true,
        },
        duration: 0.5,
      });
    }
    return () => {
      pageBody.style.backgroundColor = "#F5F5F5";
    };
  }, []);
  return (
    <>
      <div ref={workmainpageref}>
        <BannerSection banner={banner} />
        <div className="pageSuperhitWrap">
          {caseStudiesData?.length > 0 && (
            <ParallaxProvider>
              <div className="workHitwrap">
                <SuperHitsSection
                  data={caseStudiesData}
                  onLoadMore={handleLoadMore}
                />
              </div>
            </ParallaxProvider>
          )}
        </div>
        <div ref={clientLogosec}>
          <ClientLogoSection clientLogo={ourClinets} />
        </div>
        {/* <ClientSection
          clients={ourAmazingClients}
          isLoadedMore={isLoadedMore}
        /> */}
      </div>
    </>
  );
}
