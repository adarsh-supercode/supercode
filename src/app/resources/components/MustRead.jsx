import React from "react";
import * as styles from "../css/insightmain.module.css";
import SecondaryButton from "@/app/components/button/SecondaryButton";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
export default function MustRead({ mustRead }) {
  const { title, resources } = mustRead || {};

  return (
    <div className={styles?.mustReadSectionWrap}>
      <div className="container">
        <div className={styles?.mustReadSection}>
          <p className={`${styles?.mustReadTitle} heading-5-med`}>{title}</p>
          <Swiper
            spaceBetween={48}
            breakpoints={{
              320:{
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2.8,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1440: {
                slidesPerView: 3.6,
              },
            }}
            speed={1000}
            modules={[Autoplay]}
            data-cursor="arrowRL"
          >
            {resources?.map((e, index) => {
              let url =
                e.post_type !== "case-study"
                  ? `/resources/${e.post_type}/`
                  : `/${e.post_type}/`;
              return (
                <SwiperSlide key={index} className={styles?.featuredPosts}>
                  <Link href={`${url}${e.post_title.replaceAll(" ", "-")}`}>
                    <img
                      src={e.featured_image_url}
                      style={{
                        maxWidth: "350px",
                        width: "100%",
                        height: "240px",
                      }}
                    />
                    <p className={`${styles?.featuredPostsTitle} text-5`}>
                      {" "}
                      {e.post_title}
                    </p>
                    <div className={styles?.categorybuttonWrap}>
                      {e.taxonomies.category?.map((e, index) => {
                        return <SecondaryButton label={e.name} key={index} />;
                      })}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
