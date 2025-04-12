'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as styles from "../css/whatwedo.module.css";
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = React.memo(function WhatWeDo({ whatwedo }) {
    const { title, cards
    } = whatwedo || {};
    const colors = ["#70FF70", "#FFBE0B"];
    const cardwrapRef = useRef(null);
    const cardRef = useRef(null);
    const firstCardIconRef = useRef(null);

    useEffect(() => {
        if (!gsap || !ScrollTrigger || !whatwedo || !cards) return;
    
        const cardWrapElement = cardwrapRef.current;
        const secondCard = cardRef.current;
        const firstCardIcon = firstCardIconRef.current;
    
        if (cardWrapElement && secondCard && firstCardIcon) {
            gsap.set(secondCard, { y: "0px", duration: 0.2 });
            gsap.set(firstCardIcon, { opacity: 1 });
    
            setTimeout(() => {
              const masterTimeline = gsap.timeline({
                scrollTrigger: {
                  trigger: cardWrapElement,
                  start: "top center-=240",
                  end: "top center-=300",
                  scrub: 0.5,
                  // markers: true,
                },
              });

              masterTimeline
                .to(secondCard, { y: "-180px", duration: 2.5 }, 0)
                .to(firstCardIcon, { opacity: 0, duration: 1 }, 1);
            }, 1000); // Delay of 1 second
        
            return () => {
                ScrollTrigger.clearMatchMedia();
                gsap.killTweensOf([secondCard, firstCardIcon]);
            };
        }
    }, []);

    return (
        <div className={styles?.whatwedoContainer}>
            <div className={`${styles?.whatwedoHeading}`} data-cursor="arrowWhite">
                <div className="container">
                    <h2 className="text-4-med">{title}</h2>
                </div>
            </div>
            <div className={styles?.ServiceCardWrap} ref={cardwrapRef} >
                {cards?.map((e, index) => {
                  const {title,backgroundColor,description,svg} = e ||{}
                    return (
                      <Link key={index} href={title.toLowerCase().includes('design') ? "/services/web-design" : "/services/web-development"}>
                        <div
                          className={styles?.ServiceCard}
                          key={index}
                          style={{
                            backgroundColor: backgroundColor,
                            transition: "ease 0.2s",
                          }}
                          ref={index === 1 ? cardRef : null}

                          data-cursor="arrow-upright"
                        >
                          <div
                            className={`${styles?.ServiceCardText} container`}
                          >
                            <div
                              className={`${styles?.ServiceCardTextContent}`}
                            >
                              <p className={`${styles?.ServiceCardTextTitle} heading-3 textClrBlack`}>
                                {title}
                              </p>
                              <div
                                className={`${styles?.ServiceCarddesc} text-5 textClrBlack`} dangerouslySetInnerHTML={{__html:description}}
                              />
                            </div>
                            <div
                              className={styles?.ServiceCardIcon}
                              dangerouslySetInnerHTML={{ __html: svg }}
                              ref={index === 0 ? firstCardIconRef : null}
                            />
                          </div>
                        </div>
                      </Link>
                    );
                })}
            </div>
        </div>
    );
});

export default WhatWeDo;
