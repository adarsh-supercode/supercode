"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import * as styles from "../component.module.css";
import SecondaryButton from "../button/SecondaryButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function SuperHitCard({ data }) {
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const btnRefs = useRef([]);
  const triggers = useRef([]);


  const [animationOffsets, setAnimationOffsets] = useState({
    odd: { startY: 80, endY: -100 },
    even: { startY: 180, endY: -100 },
  });

  useEffect(() => {
    const updateOffsets = () => {
      if (window.innerWidth <= 768) {
        setAnimationOffsets({
          odd: { startY: 0, endY: 0 },
          even: { startY: 0, endY: 0 },
        });
      } else {
        setAnimationOffsets({
          odd: { startY: 80, endY: -100 },
          even: { startY: 180, endY: -100 },
        });
      }
    };

    updateOffsets();
    window.addEventListener("resize", updateOffsets);

    return () => {
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  // Set up animations
  useEffect(() => {
    if (!Array.isArray(data)) return;

    triggers.current.forEach((trigger) => trigger.kill());
    triggers.current = [];

    gsap.utils.toArray(cardRefs.current).forEach((card, index) => {
      const isOdd = (index + 1) % 2 !== 0;
      const { startY, endY } = isOdd
        ? animationOffsets.odd
        : animationOffsets.even;

      triggers.current.push(
        gsap.fromTo(
          imageRefs.current[index],
          { y: startY },
          {
            y: endY,
            ease: "linear",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center top+=300",
              scrub: 1,
            },
          }
        ).scrollTrigger
      );

      triggers.current.push(
        gsap.fromTo(
          textRefs.current[index],
          { y: startY },
          {
            y: endY,
            ease: "linear",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center top+=300",
              scrub: 1,
            },
          }
        ).scrollTrigger
      );

      triggers.current.push(
        gsap.fromTo(
          btnRefs.current[index],
          { y: startY },
          {
            y: endY,
            ease: "linear",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center top+=300",
              scrub: 1,
            },
          }
        ).scrollTrigger
      );
    });

    return () => {
      triggers.current.forEach((trigger) => trigger.kill());
      triggers.current = [];
    };
  }, [data, animationOffsets]);

  // Render error message if data is invalid, else render cards
  return (
    <>
      {!Array.isArray(data) ? (
        <p>No data available or invalid data format.</p>
      ) : (
        data.map((e, index) => {
          const { post_type, taxonomies, post_title, acf } = e || {};
          const { category, post_tag, company } = taxonomies || {};
          const { thumbnail_image } = acf || {};
          let slug = post_title?.replaceAll(" ", "-");
          const perLink = post_type
            ? post_type === "case-study"
              ? `/${post_type}/${slug}`
              : `/resources/${post_type}/${slug}`
            : "/resources/";
          let Tags = [...(category ?? []), ...(post_tag ?? [])];
          let clientName = company?.length > 0 ? company[0] : "";
          return (
            <div
              className={styles?.SuperHitCard}
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-cursor="arrow-upright"
            >
              <Link href={perLink}>
                <div className={`${styles?.SuperHitcontentWrap}`}>
                  <div
                    className={`${styles?.SuperHitTextContent}`}
                    ref={(el) => {
                      textRefs.current[index] = el;
                    }}
                  >
                    <p className={`${styles?.SuperHitTitle} text-3-reg`}>
                      {e.post_title}
                    </p>
                  </div>
                  <div
                    className={styles?.SuperHitProject}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                  >
                    <Image
                      src={thumbnail_image?.url || e?.image}
                      width={519}
                      height={519}
                      alt={e.post_title}
                      className={styles?.superhitImage}
                    />
                    <p className={`${styles?.SuperHitclientName} text-5`}>
                      {clientName.name || "clientName"}
                    </p>
                  </div>
                  <div
                    className={styles?.SuperHitbtnWrap}
                    ref={(el) => {
                      btnRefs.current[index] = el;
                    }}
                  >
                    {Tags.map((e, index) => {
                      return (
                        <SecondaryButton
                          key={index}
                          className={styles.SecondaryButton}
                          label={e.name || "Tag"}
                        />
                      );
                    })}
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </>
  );
}
