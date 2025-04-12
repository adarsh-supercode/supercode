import React from 'react'
import * as styles from "../css/value.module.css"
export default function ValueSection({ourValues}) {
    const{title,values}=ourValues||{};
  return (
    <div className={styles?.ValueSection}>
      <div className="container">
        <h2
          className="heading-5-med"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={styles?.valuePointsWrap}>
          {values?.map((e, index) => (
            <div key={index} className={styles?.valuePoints}>
              <p className="text-8-med">{e.number}</p>
              <p className={`${styles?.Points} text-4-reg`}>{e.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
