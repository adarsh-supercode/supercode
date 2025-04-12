"use client";
import React, { useState, useRef, useEffect } from 'react';
import * as styles from "../css/look.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';


export default function LookforSection({ whatWeLookFor }) {
    const { slides, title, content } = whatWeLookFor || {};
    const [progress, setProgress] = useState(0);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    // update the progress bar
    const updateProgress = (swiper) => {
        const totalSlides = content?.length || 1;
        const currentIndex = swiper.realIndex;
        const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
        setProgress(progressPercentage);
    };

    // Initialize progress 
    useEffect(() => {
        if (swiperRef.current) {
            updateProgress(swiperRef.current);
        }
    }, [content]);

    return (
        <div className={styles?.LookforSection}>
            <div className={styles?.ImageSwiper}>
                <Swiper
                    spaceBetween={8}
                    // slidesPerView={2.6}
                    breakpoints={{
                        480: {
                          slidesPerView: 1.2,
                        },
                        768: {
                          slidesPerView: 1.5,
                        },
                        1024: {
                          slidesPerView: 3.2,
                        },
                        1440: {
                          slidesPerView: 2.6,
                        },
                      }}
                    loop={true}
                    speed={1000}
                    modules={[Autoplay]}
                    className={styles.careerSwiper}
                    data-cursor="arrowRL"
                >
                    {slides?.map((e, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={e.slide.url}
                                alt={e.slide.alt}
                                style={{ width: "100%" }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container" data-cursor="white">
                <div className={styles?.lookforPointSection}>
                    <div className={styles?.lookforPointitle}>
                        <h3 className="text-6-med clr-wh">{title}</h3>
                    </div>
                    <div className={styles?.lookforPoints}>
                        <div className={styles.swiperContainer}>
                         
                            <Swiper
                                spaceBetween={8}
                                // slidesPerView={1}
                                breakpoints={{
                                    480: {
                                      slidesPerView: 1,
                                    },
                                    768: {
                                      slidesPerView: 1,
                                    },
                                    1024: {
                                      slidesPerView: 1,
                                    },
                                    1440: {
                                      slidesPerView: 1,
                                    },
                                  }}
                                speed={1000}
                                onSlideChange={(swiper) => updateProgress(swiper)}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }}
                                modules={[Navigation]}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                className={styles.customSwiper}
                            >
                                {content?.map((slide, index) => (
                                    <SwiperSlide key={index} className={styles.slideWrap}>
                                        <div className={styles?.pointSlidertext}>
                                            <h4 className="heading-7">{slide.title}</h4>
                                            <p className={`${styles?.pointDesc} text-2`}>
                                                {slide.description}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Progress Bar */}
                            <div className={styles.progressBarWrapper}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            {/* Custom Navigation Arrows */}
                            <div className={styles.navigationArrows}>
                                <button ref={prevRef} className={styles.prevButton}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="34"
                                        viewBox="0 0 32 34"
                                        fill="none"
                                    >
                                        <path
                                            d="M12.1943 0.999798L1.6218 15.0914C0.792577 16.2081 0.792577 17.5729 1.6218 18.6896L12.1943 32.7812"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                        />
                                        <path
                                            d="M31.9912 17.3765L2.20091 17.3765"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                        />
                                    </svg>
                                </button>
                                <button ref={nextRef} className={styles.nextButton}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="34"
                                        viewBox="0 0 32 34"
                                        fill="none"
                                    >
                                        <path
                                            d="M19.7959 0.999798L30.3684 15.0914C31.1977 16.2081 31.1977 17.5729 30.3684 18.6896L19.7959 32.7812"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                        />
                                        <path
                                            d="M-0.000976562 17.377L29.7893 17.3769"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}