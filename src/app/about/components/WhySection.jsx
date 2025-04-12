"use client";
import React, { useEffect, useRef } from "react";
import * as styles from "../css/why.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhySection({ whySupercode }) {
  const sectionRef = useRef(null);
  const { title, whySd } = whySupercode || {};
  const featuredCard = whySd?.find((e) => e.featured);
  useEffect(() => {
    const cards = gsap.utils.toArray(".card");
  
    cards.forEach((card, index) => {
      const isLeft = index % 2 === 0;
    
      ScrollTrigger.create({
        id: `card-${index}`,
        trigger: card,
        start: "top center+=600",
        end: "bottom center+=600",
        toggleActions: "play none none reverse",
        animation: gsap.fromTo(
          card,
          {
            x: isLeft ? "100vw" : "-100vw",
            y: "500",
            opacity: 0,
            rotation: isLeft ? 20 : -20,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            delay: index * 0.1, 
          }
        ),
      });
    });
    return () => ScrollTrigger.getAll();
  }, []);
  
  
  
  return (
    <div ref={sectionRef}>
      <div className="container">
        <FeaturedCard heading={title} data={featuredCard} />
        <div className={styles?.secondCardsSection}>
          {whySd
            ?.filter((e) => !e.featured)
            .map((e, index) => (
              <LayoutCards data={e} key={index} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

const FeaturedCard = ({ data, heading }) => {
  const { title, content } = data || {};
  return (
    <div className={styles?.WhySectionContainer}>
      <h2 className={`${styles?.WhySectionHeading} heading-5-med`}>
        {heading}
      </h2>
      <div className={`card ${styles?.expertCardWrap}`}>
        <p className={`${styles?.CardTitle} heading-7`}>{title}</p>
        <div
          className={`${styles?.CardDesc} text-5`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

const LayoutCards = ({ data, index }) => {
  const { title, content, bgColor, layout } = data || {};
  const layoutValue = layout?.value;
  return (
    <div
      className={`card ${
        layoutValue === "col" ? styles.secondSecCard : styles.secondFirstCard
      }`}
      style={{ background: bgColor }}
    >
      <p className={`${styles?.firstCardTitle} heading-7`}>{title}</p>
      <div
        className={`${
          layoutValue === "col" ? styles.secondCardDesc : styles.firstCardDesc
        } text-5`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
