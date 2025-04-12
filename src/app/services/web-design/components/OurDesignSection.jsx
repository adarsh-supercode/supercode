"use client"
import React from 'react'
import * as styles from "../css/ourdesign.module.css"
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper ,SwiperSlide } from 'swiper/react';
export default function OurDesignSection({takePeek}) {
    const{title,slides}=takePeek||{};
  return (
    <div className={styles?.OurDesignSection} data-cursor="white">
      <div className={`${styles?.OurDesignSectionTitle} container`}>
        <h2 className="heading-5-med ">{title}</h2>
      </div>
      <div className={styles.SwiperContainer}  data-cursor="ArrowgreenRL">
        <Swiper
          spaceBetween={24}
          slidesPerView={2.2}
          loop={true}
          centeredSlides={true}
        //   modules={[Autoplay]}
        //   autoplay={{
        //     // disableOnInteraction:true,
        //     pauseOnMouseEnter:true,
        //     delay:500,
        //   }}
        >
          {[...slides,...slides,...slides]?.map((e, index) => {
          return <SwiperSlide key={index} >
            <div className={styles.ImageContainer} >
               <img  src={e.slide.url}  />
            </div>
          </SwiperSlide>
            })}
        </Swiper>
      </div>
    </div>
  );
}
