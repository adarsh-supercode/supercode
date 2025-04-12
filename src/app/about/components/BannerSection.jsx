import React from 'react'
import * as styles from "../css/banner.module.css"
import Image from 'next/image';
export default function BannerSection({banner}) {
    const{tag,title,bannerImage,bannerDescription}=banner||{}
  return (
    <div>
      <div className={styles?.BannerSectionContainer}>
        <div className="container">
          <div className={styles?.BannerSectionWrap}>
            <p className="text-6-med">{tag}</p>
            <h1
              className={`${styles?.BannerSectionHeading} heading-3`}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
        <div className={styles?.BannerSectionImg}>
          <img src={bannerImage} style={{ width: "100%", display: "block" }} />
        </div>
      </div>
      <div className="container">
        <div className={styles?.BannerdescWrap}>
          <div
            className={`${styles?.BannerSectiondesc} text-4-reg`}
            dangerouslySetInnerHTML={{ __html: 
              bannerDescription
               }}
          />
        </div>
      </div>
    </div>
  );
}
