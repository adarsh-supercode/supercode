import React from 'react';
import * as styles from "../css/techstack.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TechStackSection({ ourTechStack }) {
  const { title, blocks } = ourTechStack || {};

  return (
    <div className={styles?.techStackSection}>
      <div className="container">
        <p className="text-6-med uppercase">{title}</p>

        {/* Swiper Implementation */}
        <Swiper
          spaceBetween={20} // Adjust spacing between slides
          // slidesPerView={3.2} // Adjust number of visible slides
          breakpoints={{
            480: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1440: {
              slidesPerView: 3.2,
            },
          }}
          className={styles?.skillsWrap}
          data-cursor="arrowRL"
        >
          {blocks?.map((block, index) => (
            <SwiperSlide key={index} className={styles?.skillsContent}>
              <p className={`${styles?.skillsTitle} text-3-reg `}>{block.title}</p>
              <ul className={styles?.skillPoints}>
                {block?.lists?.map((listItem, idx) => (
                  <li key={idx} className="text-2">
                    {listItem.list}
                  </li>
                ))}
              </ul>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
