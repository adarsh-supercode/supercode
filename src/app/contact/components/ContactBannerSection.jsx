"use client";
import React from 'react'
import * as styles from "../css/banner.module.css"
import Marquee from 'react-fast-marquee'
export default function ContactBannerSection({bannerMaqruee}) {
    const {title,svg} = bannerMaqruee || {};
    const repeatedContent = new Array(2).fill(null).map((_, index) => (
      <p key={index} className='heading-1-lt'>
        {title}{' '}
        <span
          className={styles?.MarqueeLogo}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </p>
     
  )); 
  return (
    <div className={styles?.BannerSection}>
      <Marquee speed={200}>
        <div className={styles?.MarqueeText}>{repeatedContent}</div>
      </Marquee>
      <div className="container"></div>
    </div>
  );
}
