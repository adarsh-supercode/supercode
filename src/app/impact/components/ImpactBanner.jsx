import React from "react";

export default function ImpactBanner({ banner, styles }) {
  const { tag, title } = banner || {};
  return (
    <div className={styles.bannerContainer}>
      <p className={`text-3-sm ${styles.bannerTag}`}>{tag}</p>
      <div
        dangerouslySetInnerHTML={{ __html: title }}
        className={`${styles.BannerTitle} text-3-lg`}
      />
    </div>
  );
}
