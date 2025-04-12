"use client";
import MasonryComponent from "@/app/components/Masonry/Masonry";
import SplideSlider from "@/app/components/slider/SpliderSlider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

const layoutMap = {
  testimonial: TestimonialCard,
  "award-1": AwardCard1,
  "award-2": AwardCard2,
  statistic: StaticsCard,
};

const generateColor = (rgba) => {
  if (!rgba) return "black"; // Default fallback color
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "black"; // Invalid format fallback

  const red = parseInt(match[1], 10);
  return red > 200 ? "black" : "white";
};

export default function ImpactCards({ cards = [], styles }) {
  return (
    <div className={styles.masonryContainer}>
      <MasonryComponent gutter={24} breakpointCols={3}>
        {cards.map((e, index) => {
          const RenderCard = layoutMap[e?.layoutType?.value] || Fragment;
          return <RenderCard key={index} data={e} styles={styles} />;
        })}
      </MasonryComponent>
    </div>
  );
}

export const RenderMarqueeImpactCards = ({ cards, styles, speed }) => {
  return (
    <SplideSlider
      options={{
        arrows: false,
        pagination: false,
        breakpoints: {
          1024: {
            perPage: 2,
          },
          768: {
            perPage: 1, 
          },
        },
      }}
      speed={speed}
      items={cards}
      renderItems={(item) => {
        const RenderCard = layoutMap[item?.layoutType?.value] || Fragment;
        return <RenderCard data={item} styles={styles} noButton />;
      }}
    />
  );
};

const generatePreLink = (post) => {
  let postData = Array.isArray(post) ? post[0] : post;
  const postSlug = postData?.post_title?.replaceAll(" ", "-");
  return postData?.post_type === "case-study"
    ? `/${postData?.post_type}/${postSlug}`
    : `/resources/${postData?.post_type}/${postSlug}`;
};

function TestimonialCard({ data = {}, styles, noButton }) {
  const { description, author = {}, background_color, redireact = {} } = data;
  const { redireact: post } = redireact || {};
  const { name, designation } = author;
  const preLink = generatePreLink(post[0]);
  const color = generateColor(background_color);
  const cardContainerRef = useRef(null);

  // useEffect(() => {
  //   if (description) {
  //     const wordCount = description.split(/\s+/).filter(Boolean).length;
  //     if (wordCount <= 30) {
  //       cardContainerRef.current.classList.add(styles.lessWidth);
  //     } else {
  //       cardContainerRef.current.classList.remove(styles.lessWidth);
  //     }
  //   }
  // }, [description]);

  const wordCount = description?.split(/\s+/).filter(Boolean).length || 0;
  const cardWidth = wordCount <= 30 ? styles.lessWidth: ""; 

  return (
    <div
      ref={cardContainerRef}
      className={`${styles?.cardContainer} ${styles.testimonialCard} ${cardWidth}`}
      style={{ backgroundColor: background_color, color}}
    >
      <p className={styles?.description}>{description}</p>
      <div className={styles.authorContainer}>
        <h3 className={`text-5`}>{name}</h3>
        <p className={`text-8-med`}>{designation}</p>
      </div>
      {!noButton && (
        <Link className={`${styles.cardButton} text-5`} href={preLink}>
          {redireact.label}
        </Link>
      )}
    </div>
  );
}

function StaticsCard({ data = {}, styles, noButton }) {
  const { title, description, background_color, redireact = {} } = data;
  const preLink = generatePreLink(redireact?.redireact);
  const color = generateColor(background_color);

  return (
    <div
      className={`${styles?.cardContainer} ${styles.staticsCard}`}
      style={{ backgroundColor: background_color, color }}
    >
      <div className={styles.content}>
        <h3 className={`text-1-lg ${styles.title}`}>{title}</h3>
        <p className={`text-5 ${styles.description}`}>{description}</p>
      </div>

      {!noButton && (
        <Link
          className={`${styles.cardButton} text-5`}
          href={preLink}
          style={{ width: "fit-content" }}
        >
          {redireact.label}
        </Link>
      )}
    </div>
  );
}

function AwardCard1({ data = {}, styles, noButton }) {
  const { subTitle, title, redireact = {}, background_color, image } = data;
  const preLink = generatePreLink(redireact?.redireact);
  const color = generateColor(background_color);

  return (
    <div
      className={`${styles?.cardContainer} ${styles.awardCard1}`}
      style={{ backgroundColor: background_color, color }}
    >
      <div className={styles?.content}>
        <Image
          className={styles.image}
          src={image?.url || "/fallback-image.jpg"}
          alt={image?.alt || "Award Image"}
          height={image?.height || 100}
          width={image?.width || 100}
        />
        <div className={styles.details}>
          <h1 className={`text-4-lg  ${styles.awardTitle}`}>{title}</h1>
          <h3 className={`text-4-lg wg-200 ${styles.subTitle}`}>{subTitle}</h3>
        </div>
      </div>
      {!noButton && (
        <Link
          className={`${styles.cardButton} text-5`}
          href={preLink}
          style={{ width: "fit-content" }}
        >
          {redireact.label}
        </Link>
      )}
    </div>
  );
}

function AwardCard2({ data = {}, styles, noButton }) {
  const { title, redireact = {}, background_color, image } = data;
  const preLink = generatePreLink(redireact?.redireact);
  const color = generateColor(background_color);

  return (
    <div
      className={`${styles?.cardContainer} ${styles.awardCard2}`}
      style={{ backgroundColor: background_color, color }}
    >
      <h2 className={`${styles.title} lnht-36 text-4-med wg-200`}>{title}</h2>
      <div className={styles.content}>
        <Image
          className={styles.image}
          src={image?.url || "/fallback-image.jpg"}
          alt={image?.alt || "Award Image"}
          height={image?.height || 100}
          width={image?.width || 100}
        />
        {!noButton && (
          <Link
            className={`${styles.cardButton} text-5`}
            href={preLink}
            style={{ width: "fit-content" }}
          >
            {redireact.label}
          </Link>
        )}
      </div>
    </div>
  );
}
