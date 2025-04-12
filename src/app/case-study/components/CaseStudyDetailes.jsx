"use client";
import React, { useEffect, useRef } from "react";
import * as styles from "./caseStudyDetailes.module.css";
import { Autoplay, Navigation } from "swiper/modules";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";


gsap.registerPlugin(ScrollTrigger);
export default function CaseStudyDetailes({ data }) {
  const swiperInitRef = useRef(null);
  const caseStudyMainRef = useRef();
    const element = caseStudyMainRef.current;
    const bodyElement = document.body;
    const timelineRef = useRef(null);
    const { title, acf } = data || {};
   
    const perLink = "case-study";
   
     
    useEffect(() => {
      bodyElement.style.backgroundColor = acf?.color_from;
  
       const timeline=gsap.timeline({
         scrollTrigger: {
           trigger: element,
           start: "top+=400 top",
           end: "top+=3400 top",
           toggleActions: "play none none reverse",
           onUpdate: ({ progress }) => {
             const backgroundColor =
               progress < 0.08
                 ? acf?.color_from
                 : progress > 0.999
                 ? acf?.color_to
                 : "#F5F5F5";
             gsap.timeline().to(bodyElement, { backgroundColor: backgroundColor });
           },
         },
       });
       timelineRef.current = timeline;
       const DefaultColor =() =>{
        bodyElement.style.backgroundColor = "#F5F5F5";
       }
  
      return () => {
        DefaultColor()
        if (timelineRef.current) {
          timelineRef.current.kill(); 
        }
        bodyElement.style.backgroundColor = "#F5F5F5";

      };
    }, []);
  

  useEffect(() => {
    if (data?.content) {
      setTimeout(() => {
        if (swiperInitRef.current) return;
        const swiper = new Swiper(".swiper-container", {
          effect: "fade",
          slidesPerView: 1.4,
          centeredSlides: true,
          spaceBetween: 8,
          loop: true,
         
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false,
          // },
          // navigation: {
          //   nextEl: ".swiper-button-next",
          //   prevEl: ".swiper-button-prev",
          // },
        });
        swiperInitRef.current = swiper;
        document.querySelector('.swiper-container').classList.add('custom-swiper-class');
        window.scrollTo(0, 0); 
      }, 300);
    }
  }, [data?.content]);

  if (!data) return <div>Post not available</div>;
  return (
      <div className={styles?.CaseStudySection} ref={caseStudyMainRef}>
        
        <div className={styles?.CaseStudyContentWrap}>
          <div className="container">
          
          <p className={styles?.casestudyClientname}>{acf.client_name}</p>
          <h1 className="heading-3-light">{title.rendered}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
            className={styles?.caseStudyContent}
          />
        </div>
        <div className="container">
          <div className={styles?.relatedCaseStudyWrap}>
            <p className="heading-5-med">{acf.title}</p>
            <div className={styles?.relatedCaseStudy}>
              {acf.related_posts_data &&
                acf.related_posts_data?.map((e, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/${perLink}/${e.post_title?.replaceAll(" ", "-")}`}
                    >
                      <div className={styles?.relatedPostContent}>
                      <img
                        src={e?.thumbnail_image || "/assets/postImg.png"}
                        alt={e.post_title}
                        className={styles?.relatedPostImg}
                      />

                        <p>{e.post_title}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
       </div>
  );
}
