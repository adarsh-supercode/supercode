import React from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const SplideSlider = ({ renderItems, speed, options = {}, items = [] }) => {
  const defaultOptions = {
    type: "loop",
    drag: "free",
    focus: "center",
    arrows: false,
    perPage: 3,
    autoScroll: {
      speed: speed || 1,
      pauseOnHover: false,
    },
    ...options,
  };

  return (
    <Splide options={defaultOptions} extensions={{ AutoScroll }}>
      {items.map((item, index) => (
        <SplideSlide key={index}>{renderItems(item)}</SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideSlider;
