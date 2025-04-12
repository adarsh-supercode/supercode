"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import * as styles from "./page.module.css";
import ErrorBoundary from "./ErrorBoundary";
import { ParallaxProvider } from "react-scroll-parallax";
import ReactLenis from "@studio-freight/react-lenis";
import Error from "./error";

export default function Main({ children }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorClass, setCursorClass] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Move cursor logic
    const moveCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false); // Ensure cursor reappears when moving
    };

    // Hide cursor when mouseout
    const hideCursor = () => setIsHidden(true);

    // Change cursor style when hovering over elements with data-cursor attribute
    const changeCursor = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setCursorClass(target.dataset.cursor);
      } else {
        setCursorClass(""); // Default state
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", changeCursor);
    window.addEventListener("mouseover", changeCursor);
    // window.addEventListener("mouseout", hideCursor);

    return () => {
      // Cleanup event listeners
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", changeCursor);
      window.removeEventListener("click", changeCursor);
      // window.removeEventListener("mouseout", hideCursor);
    };
  }, [isHidden]);

  return (
    <>
      <main className={styles.main}>
        
        <ErrorBoundary fallback={<Error />}>
          <ParallaxProvider>
            <ReactLenis root options={{ lerp: 0.08 }}>
              {children}
            </ReactLenis>
          </ParallaxProvider>
        </ErrorBoundary>
      </main>
   
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${cursorClass} ${isHidden ? "hidden" : ""}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>
    </>
  );
}
