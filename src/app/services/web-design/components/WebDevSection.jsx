import React from 'react'
import * as styles from "../css/webdev.module.css"
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
export default function WebDevSection({whatElseWeDo}) {
    let {title,marqee}=whatElseWeDo||{}
    marqee = Array.from({length:5}).map((e) => marqee[0]);
  return (
    <div className={styles?.WebdevSec} data-cursor="white">
      <div className="container">
        <p className={`${styles?.MarqueeLInkHeading} text-6-med`}>{title}</p>
      </div>
      <div className={styles?.MarqueeLInkSection} data-cursor="ArrowgreenTR">
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
