import RolesAccordion from '@/app/components/Accordion/RolesAccordion';
import React from 'react'
import * as styles from "../css/roles.module.css"
export default function RolesSection({roles}) {
    const{ title,resumeLink,jobs}=roles||{};
    console.log(roles,"faq")
  return (
    <div className={styles?.roleSection} id='roleSection' data-cursor="white">
      <div className="container">
        <h2 className='heading-5-med clr-wh'>{title}</h2>
        <div className={styles?.accordonItem}>
        <RolesAccordion data={jobs} />
        </div>
        <p className={`${styles?.dropResumeLink} text-5 clr-wh`} dangerouslySetInnerHTML={{__html:resumeLink}}/>
      </div>
    </div>
  );
}
