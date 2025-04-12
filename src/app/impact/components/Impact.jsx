"use client";
import styles from "../components/Impact.module.css";
import ImpactBanner from "./ImpactBanner";
import ImpactCards from "./ImpactCards";

export default function Impact({ pageData }) {
  const { banner, cards } = pageData || {};
  return (
    <div className={styles?.ImpactBannerWrap}>
      <div className={`${styles.conatiner} container`}>
        <ImpactBanner banner={banner} styles={styles} />
        <ImpactCards cards={cards} styles={styles} />
      </div>
    </div>
  );
}
