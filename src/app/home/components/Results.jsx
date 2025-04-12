"use client";
import React from "react";
import "swiper/css";
import * as styles from "../css/results.module.css";
import PrimaryButton from "@/app/components/button/PrimaryButton";
import SliderMarquee from "@/app/components/slider/SliderMarquee";
import Resultstyles from "../css/results.module.css";

export default function Results({ data }) {
  const { resultsCardsList, title, link } = data || {};
  if (resultsCardsList?.length <= 0) return <></>;
  return (
    <>
      <div className={`${styles?.resultsWrap}`}>
        <div className="container">
          <div className={`${styles?.resultsMainHeading}`}>
            <h2 className="heading-5-med textClrBlack">{title}</h2>
          </div>
        </div>
        <div className={styles?.impactSliderWrap}>
          {[2, 1].map((e, index) => {
            const reverseArray =
              index % 2 == 0
                ? [...resultsCardsList].reverse()
                : resultsCardsList;
            return (
              <div
                key={index}
                className={styles?.resultSliderWrap}
                data-cursor="arrowRL"
              >
                <SliderMarquee
                  slides={reverseArray}
                  styles={Resultstyles}
                  speed={e}
                />
              </div>
            );
          })}
        </div>
        {link?.url && (
          <div className={styles?.impactButtonWrap}>
            <PrimaryButton
              className={styles.PrimaryButton}
              href={link?.url}
              label={link?.title}
              target={link?.target}
              // icon={button.icon}
              // buttontextblk={true}
              noBg={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
