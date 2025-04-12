"use client";
import React, { useState, useEffect, useRef } from "react";
import * as styles from "../css/servicecardsec.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import PrimaryButton from "@/app/components/button/PrimaryButton";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceCardSection({ cards }) {
  const { title, slides } = cards || {};
 console.log(cards)

  const prevSelectedRef = useRef(null);
  useEffect(() => {
    // Select the first element with the class 'cardWrap'
    const cardWrapElement = document.querySelectorAll(`.${styles.cardWrap}`)[0];

    // Check if the element exists
    if (cardWrapElement) {
      // Create a mouseover event
      const mouseOverEvent = new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
      });

      // Dispatch the mouseover event
      cardWrapElement.dispatchEvent(mouseOverEvent);
    } else {
      console.error('No element with class "cardWrap" found.');
    }
  }, []);
  const handleMouse = (e) => {
    let target = e.currentTarget;
    if (!target.classList.contains(`${styles.show}`)) {
      if (prevSelectedRef.current) {
        prevSelectedRef.current.classList.remove(`${styles.show}`);
      }

      target.classList.add(`${styles.show}`);
      prevSelectedRef.current = target;
    }
  };

  return (
    <div  className={styles?.ServiceCardSection}>
      <div className="container">
        <p className={`${styles?.serviceDesc} text-3-reg`}>{title}</p>
        <div className={styles?.ServiceCardWrap}>
          {slides?.map((e, index) => {
            const { redirect, description, backgroundColor, svg, title,mobileSvg} =
              e || {};
            return (
              <div key={index} className={styles?.slideCard}>
                <Link href={redirect?.url || "/"}>
                  <div
                    className={styles?.cardWrap}
                    onMouseOver={(e) => handleMouse(e)}
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div>
                      <h4
                        className={`${styles?.serviceCardHeading} heading-5-med caps`}
                      >
                        {title}
                      </h4>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: svg }}
                      className={styles?.contentSvg}
                      style={{ backgroundColor: backgroundColor }}
                    />
                    <div
                      dangerouslySetInnerHTML={{ __html: mobileSvg }}
                      className={styles?.contentmobSvg}
                    />
                    <div
                      className={`${styles?.cardDesc}  text-5`}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <PrimaryButton
                      label={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                        >
                          {" "}
                          <path
                            d="M8 0V15"
                            stroke="white"
                            stroke-width="2.3"
                          ></path>{" "}
                          <path
                            d="M16 7L-8.34465e-07 7"
                            stroke="white"
                            stroke-width="2.3"
                          ></path>{" "}
                        </svg>
                      }
                      className={styles?.plusBtn}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
