"use client";

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import * as styles from "../css/believe.module.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WeBelieveSection({ weBelieve }) {
  const { title, primaryImage, secondaryImage, content } = weBelieve || {};
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Animate images
    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, y: 200 }, // Start state
      {
        opacity: 1,
        y: 0, // End state
        duration: 2,
        ease: "power3.out",
        stagger: 0.2, // Stagger animations for images
        scrollTrigger: {
          trigger: section,
          toggleActions: "play none none reverse",
          start: "top center", 
          // markers:true,
        },
      }
    );

    // Animate text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 200 }, // Start state
      {
        opacity: 1,
        y: 0, // End state
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          toggleActions: "play none none reverse",
          start: "top center", // When section enters viewport
        },
      }
    );
  }, []);

  return (
    <div className={styles?.WeBelieveSection} ref={sectionRef}>
      <div className="container">
        <h2 className='heading-5-med' dangerouslySetInnerHTML={{ __html: title }} />
        <div className={styles?.believeContentWrap}>
          <Image
            src={primaryImage}
            width={323}
            height={253}
            style={{ borderRadius: "14px" }}
            ref={(el) => (imagesRef.current[0] = el)}
          />
          <Image
            src={secondaryImage}
            width={351}
            height={474}
            style={{ borderRadius: "14px" }}
            ref={(el) => (imagesRef.current[1] = el)}
          />
          <div
            className='text-1 '
            dangerouslySetInnerHTML={{ __html: content }}
            ref={textRef}
          />
        </div>
      </div>
    </div>
  );
}
