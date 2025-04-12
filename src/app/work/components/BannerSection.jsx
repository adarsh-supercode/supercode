import React from "react";
import * as styles from "../css/bannersection.module.css";
import PrimaryButton from "@/app/components/button/PrimaryButton";
const BannerSection = ({ banner }) => {
  const { tag, title, button } = banner || {};

  return (
    <div className={styles?.BannerSection}>
      <div className="container">
        <div className={styles?.workBannerHeading}>
          <p className={`${styles?.workTitle} text-6-med`}>{tag}</p>
          <h1
            className={` heading-3`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        {/* <PrimaryButton
                href={button.slug}
                label={button.label}
                icon={button.icon}
                /> */}
      </div>
    </div>
  );
};
export default BannerSection;
