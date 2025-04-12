"use client"
import React from 'react'
import { contactPage } from '@/utilites/helper';
import ContactForm from './ContactForm';
import ContactBannerSection from './ContactBannerSection';

export default function ContactMainPage({pageData}) {

    const{bannerMaqruee,content}=pageData||{};
    
  return (
    <div className="noiseMainWrap ">
      <div style={{backgroundColor:"#F5F5F5"}}>
        <ContactBannerSection bannerMaqruee={bannerMaqruee} />
        <ContactForm content={content}/>
      </div>
    </div>
  );
}
