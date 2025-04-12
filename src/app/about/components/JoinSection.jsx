"use client"
import React from 'react'
import * as styles from "../css/join.module.css"
import PrimaryButton from '@/app/components/button/PrimaryButton'
export default function JoinSection({joinUs}) {
    const{title,content,careerButton,careerBtnText}=joinUs||{}
  return (
    <div className={styles?.JoinSection}>
      <div className="container">
        <div className={styles?.joinContent}>
          <div className={styles?.joinTexts}>
            <h3 className='text-6-med'>{title}</h3>
            <p className={`${styles?.JoinSectionDesc} text-5`}>{content}</p>
          </div>
          <PrimaryButton label={careerBtnText} href={careerButton} noBg={true} />
        </div>
      </div>
    </div>
  );
}
