import React from 'react'
import* as styles from "../css/design.module.css"
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
export default function Webdesign({whatElseWeDo}) {
  let {title,marqee}=whatElseWeDo||{}
  marqee = Array.from({length:5}).map((e) => marqee[0]);
  return (
    <div className={styles?.WebdesignSec}>
      <div className="container">
        <p className={`${styles?.MarqueeLInkHeading} text-6-med`}>{title}</p>
      </div>
      <div className={styles?.MarqueeLInkSection} data-cursor="arrow-upright">
        <Marquee speed={200}>
        {marqee?.map((marquee, index) => {
            return (
              <Link href={marquee.title.url} key={index}>
                <div className={styles?.marqueeLinkWrap}>
                  <p className={`${styles?.marqueeLink} heading-1`}>
                    {marquee.title.title}{" "}
                    <span dangerouslySetInnerHTML={{ __html: marquee.svg}} />
                  </p>
                </div>
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
