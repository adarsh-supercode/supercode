import React from 'react'
import * as styles from "../css/awardwinners.module.css"
import Image from 'next/image';
export default function AwardWinnersSection({ourAwardWinners}) {
    const { title,blocks } = ourAwardWinners || {};
  return (
    <div className={styles?.AwardWinnersSection} data-cursor="white">
      <div className="container">
        <h2 className="heading-5-med">{title}</h2>
      </div>
      <div className={styles?.awardwinnersWrap}>
        {blocks?.map((e, index) => {
          return (
            <>
              <div className={styles?.awardContent} key={index} data-cursor="ArrowgreenTR">
                <div className={styles?.awardDetails}>
                  <p className={`${styles?.year} text-2`}>{e.year}</p>
                  <p className={`${styles?.awardname} text-2`}>{e.award_name}</p>
                  <p className={`${styles?.year} ${styles?.dkphideyear} text-2`}>{e.year}</p>

                </div>
                <p className={`${styles?.projectname} text-2`}>
                  {e.title}
                </p>
              </div>
              <div className={styles?.awardImage}>
                <Image
                  src={e.image.url}
                  width={736}
                  height={459}
                  alt={e.projectname}
                />
              </div>{" "}
            </>
          );
        })}
      </div>
    </div>
  );
}
