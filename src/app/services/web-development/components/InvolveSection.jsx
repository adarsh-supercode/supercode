import React from 'react'
import * as styles from "../css/involve.module.css"
export default function InvolveSection({whatItInvolves}) {
    const{title,heading,description,blocks,tag}=whatItInvolves||{};
  return (
    <div className={styles?.InvolveContainer}>
      <div className="container">
        <div className={styles?.involveSection}>
          <div className={styles?.involveSectionTitle}>
            <p className='text-6-med '>{tag}</p>
            <div className={styles?.involveSectionContent}>
              <p className={`${styles?.involveHeading} heading-5-med`}>{title}</p>
              <p className={`${styles?.involveDesc} text-5`}>{description}</p>
            </div>
          </div>
          <div className={styles?.developments}>
            {blocks?.map((e,index)=>{
                return (
                  <div key={index} className={styles?.devDetails}>
                    <p className={`${styles?.devContentTitle} text-3-reg` }>{e.title}</p>
                    <p className={`${styles?.devContentDesc} text-5`}>{e.description}</p>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
