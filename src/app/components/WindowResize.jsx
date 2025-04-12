"use client";
import { useState, useEffect } from "react";

export const useWindowResize = (value) => {
  const [windowWidth, setWindowWidth] = useState(value || 1400);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (typeof window != "undefined") {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};
