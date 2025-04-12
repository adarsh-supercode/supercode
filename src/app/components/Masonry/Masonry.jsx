import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useWindowResize } from "../WindowResize";

export default function MasonryComponent({
  breakpointCols = 3,
  mobileBreakpointCols = 1,
  tabletsBreakpointCols = 2,
  gutter = 10,
  children,
}) {
  const breakpoint = useWindowResize();
  useEffect(() => {
    let setTimeoutId;
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => {
      const masonryGrid = document.querySelector(".my-masonry-grid");
      const masonryColumns = document.querySelectorAll(
        ".my-masonry-grid_column"
      );
      const masonryChildren = document.querySelectorAll(
        ".my-masonry-grid_column > *"
      );

      if (masonryGrid) {
        masonryGrid.style.marginLeft = `-${gutter}px`;
        masonryGrid.style.display = `-webkit-box`;
        masonryGrid.style.marginLeft = `-ms-flexbox`;
        masonryGrid.style.marginLeft = `flex`;
        masonryGrid.style.width = `auto`;
      }

      masonryColumns.forEach((column) => {
        column.style.paddingLeft = `${gutter}px`;
        column.style.backgroundClip = `padding-box`;
      });
      masonryChildren.forEach((child) => {
        child.style.marginBottom = `${gutter}px`;
      });
    }, 100);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [gutter, breakpoint]);

  return (
    <Masonry
      breakpointCols={
        breakpoint <= 800
          ? mobileBreakpointCols
          : breakpoint > 800 && breakpoint < 1200
          ? tabletsBreakpointCols
          : breakpointCols
      }
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  );
}
