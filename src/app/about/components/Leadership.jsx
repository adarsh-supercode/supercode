import React, { useState } from "react";
import * as styles from "../css/leader.module.css";
import Image from "next/image";
import PrimaryButton from "@/app/components/button/PrimaryButton";

export default function Leadership({ leadership }) {
  const { title, leaders, buttonIcon } = leadership || {};
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles?.LeadershipWrap}>
      <div className="container">
        <h2 className="heading-5-med">{title}</h2>
        <div className={styles?.leadersContainer}>
          {leaders?.map((e, index) => {
            const isActive = activeIndex === index;
            const leaderClass = isActive
              ? styles.active
              : activeIndex !== null
              ? styles.nonActive
              : "";
            return (
              <div
                key={index}
                className={`${styles?.leadersWrap} ${leaderClass}`}
                onClick={() => handleClick(index)}
              >
                <div className={styles?.leaderContainer}>
                  <div className={styles?.leadersText}>
                    <Image
                      src={e.profile}
                      width={157}
                      height={157}
                      alt={`${e.name} profile`}
                    />
                    <p className={`text-6-med tac ${styles.leaderName}`}>
                      {e.name}
                    </p>
                    <p className={`text-6 tac ${styles.destination}`}>
                      {e.designation}
                    </p>
                  </div>
                  <div className={styles?.leadersContent}>
                    <div
                      className={`text-6 tac ${styles.description}`}
                      dangerouslySetInnerHTML={{ __html: e.description }}
                    />
                  </div>
                </div>
                <div className={styles?.leaderBtnLink}>
                  <PrimaryButton blackBg={true} ButtonIcon={buttonIcon} className={styles?.leaderBtnexpand}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
