import React from 'react';
import 'swiper/css';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import * as styles from "../component.module.css"; // Adjust the path as needed
import { RenderImpactCards, RenderMarqueeImpactCards } from '@/app/impact/components/ImpactCards';

const SliderMarquee = ({ slides,styles, speed }) => {
  if (!slides || slides.length === 0) return null; // Return nothing if slides are empty
  return (
        <RenderMarqueeImpactCards  cards={slides} styles={styles} speed={speed}/>
  );
};

export default SliderMarquee;
