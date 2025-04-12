import React from "react";
import InsightCard from "../cards/InsightCard";
import PrimaryButton from "../button/PrimaryButton";
import * as styles from "../../home/css/insightscoop.module.css"
const InsightsScoop = React.memo(({ insightScoop }) => {
  const { title, insightData, link } = insightScoop || {};
  if (!insightScoop) return <></>;
  return (
    <div style={{ zIndex: 2, position: "relative" }}>
      <div className="container">
        <div className={styles?.InsightHeader}>
          <h2 className="text-4-med">{title}</h2>
        </div>
        <div className={`${styles?.InsightCardWrap} insightcardBox`}>
          <InsightCard data={insightData} className={styles?.InsightCardConImgWrap} />
        </div>
        <div className={styles?.insightBtn}>
          <PrimaryButton
            label={link.title}
            href={link.url}
            whiteBorder={true}
          />
        </div>
      </div>
    </div>
  );
});

InsightsScoop.displayName = "InsightsScoop";
export default InsightsScoop;
