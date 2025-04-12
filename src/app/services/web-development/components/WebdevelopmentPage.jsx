"use client"
import React from 'react'
import { WebDevelopmentPage } from '@/utilites/helper';
import * as styles from "../mainpage.module.css";
import WebDevBanner from './WebDevBanner';
import InvolveSection from './InvolveSection';
import OurClients from './OurClients';
import TechStackSection from './TechStackSection';
import FaqAccordion from '@/app/components/Accordion/FaqAccordion';
import Webdesign from './Webdesign';
export default function WebDevelopment({pageData}) {
    const { banner,whatItInvolves,ourClients,ourTechStack,faq,whatElseWeDo } = pageData || {};
  return (
    <div className="noiseMainWrap">
      <div className={styles?.mainPagewebDev}>
        <WebDevBanner banner={banner} />
        <InvolveSection whatItInvolves={whatItInvolves} />
        <OurClients OurClients={ourClients} />
        <TechStackSection ourTechStack={ourTechStack} />
        <FaqAccordion data ={faq} />
        <Webdesign whatElseWeDo={whatElseWeDo} />
      </div>
    </div>
  );
}
