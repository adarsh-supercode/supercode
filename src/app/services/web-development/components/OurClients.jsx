import React from "react";
import * as styles from "../css/clients.module.css";
import SliderMarquee from "@/app/components/slider/SliderMarquee";
import PrimaryButton from "@/app/components/button/PrimaryButton";
import Resultstyles from "../../../home/css/results.module.css";
export default function OurClients({ OurClients }) {
  const { title, clientsCardsList, link } = OurClients || {};
  if (clientsCardsList?.length <= 0) return <></>;
  return (
    <div className={styles?.OurClientSection}>
      <div className="container">
        <h2 className={`${styles?.ourclientHeading} heading-5-med`}>{title}</h2>
      </div>
      <div className={styles?.clientsSliderSec}>
        {[2, 1].map((e, index) => {
          const reverseArray =
          index % 2 == 0 ? [...clientsCardsList].reverse() : clientsCardsList;
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
      <div className={styles?.clientsSliderbtn}>
        <PrimaryButton
          className={styles.PrimaryButton}
          href={link?.url}
          label={link?.title}
          buttontextblk={true}
          noBg={true}
        />
      </div>
    </div>
  );
}
