"use client";
import React from "react";
import Image from "next/image";
import * as styles from "../component.module.css";
import SecondaryButton from "../button/SecondaryButton";
import Link from "next/link";
const InsightCard = React.memo(({ data, className }) => {
  if (!data) return <></>;

  const perLink = "resources/insight";
  return (
    <>
      {data?.map((e, index) => {
        return (
          <Link  href={`/${perLink}/${e.post_title?.replaceAll(" ", "-")}`} key={index} className={`${styles?.InsightCard}`}>
            <div className={`${styles?.InsightCard} ${className}`} >
              <Image src={e.featured_image_url} width={411} height={378} />
              <div className={styles?.InsightCardtextContent}>
                <div className={styles?.insightTagWrap}>
                  {e.taxonomies.category?.map((e, index) => {
                    return (
                      <SecondaryButton
                        key={index}
                        label={e.name}
                        className={styles.SecondaryButton}
                      />
                    );
                  })}
                </div>
                <p className="text-2">{e.post_title}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
});

InsightCard.displayName = "InsightCard"
export default InsightCard;
