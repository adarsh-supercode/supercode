"use client";
import React from "react";
import * as styles from "../css/banner.module.css";
export default function BannerSection({ banner }) {
  const { tag, title } = banner || {};
  return (
    <div className="container">
      <div className={styles?.bannerTextWrap}>
        <p className="text-6-med">{tag}</p>
        <div
          className={`${styles?.bannerHeading} heading-3 `}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </div>
  );
}
