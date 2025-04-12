"use client"
import React from 'react'
import { WebDesignPage } from '@/utilites/helper';
import WebDesBanner from './BannerSection';
import InvolveSection from './InvolveSection';
import OurDesignSection from './OurDesignSection';
import AwardWinnersSection from './AwardWinnersSection';
import FaqAccordion from '@/app/components/Accordion/FaqAccordion';
import WebDevSection from './WebDevSection';
export default function WebdesignPage({pageData}) {
    const{banner,whatItInvolves,takePeek,ourAwardWinners,faq,whatElseWeDo}=pageData||{};
    
  return (
    <div>
      <WebDesBanner banner={banner} />
      <InvolveSection whatItInvolves={whatItInvolves} />
      <OurDesignSection takePeek={takePeek} />
      <AwardWinnersSection ourAwardWinners={ourAwardWinners} />
      {faq && (
        <FaqAccordion 
          data={faq}
          accordionbgBlk={true}
          textWhite={true}
        />
      )}
      <WebDevSection whatElseWeDo={whatElseWeDo} />
    </div>
  );
}
