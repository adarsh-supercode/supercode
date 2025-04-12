import React from 'react'
import * as styles from "../css/banner.module.css"
import PrimaryButton from '@/app/components/button/PrimaryButton';
export default function BannerSection({banner}) {
    const{tag,title,heading,description,aboutOffice,checkRolesLabel}=banner||{}
  return (
    <div className={styles?.careersBanner}>
      <div className="container">
        <div className={styles?.BannerContent}>
          <p className="text-6-med">{tag}</p>
          <h1
            className={`${styles?.BannerSection} heading-3`}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className={styles?.descriptionWrap}>
            <p className={`${styles?.BannerSectionDesc} text-4-reg`}>
              {description}
            </p>
            <div className={styles?.aboutSection}>
              <p className={`${styles?.BannerSectionAbout} text-5`}>
                {aboutOffice}
              </p>
              <PrimaryButton
              label={checkRolesLabel?.title}
              href={checkRolesLabel?.url}
              noBg={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
