"use client";
import React, { useEffect, useState } from "react";
import * as styles from "./superhitsection.module.css";
import SuperHitCard from "@/app/components/cards/SuperHitCard";
import PrimaryButton from "@/app/components/button/PrimaryButton";
import { usePathname } from "next/navigation";

const SuperHitsSection = ({ data, onLoadMore,link }) => {
  let {  hitprojects,button} = data || {};
  // const{ link } = link ||{};

    hitprojects = Array.isArray(data) ? data : [];

  const pathname = usePathname();
  const initialItemsToShow = pathname === "/work" ? 10 : 6;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const [showReadMore, setShowReadMore] = useState(false);
//  console.log(link,"works")

  useEffect(() => {
    if (pathname === "/work") {
      if (hitprojects && hitprojects.length > 10) {
        setShowReadMore(true);
      }
    } else if (pathname === "/") {
      setShowReadMore(false);
    }
  }, [pathname, hitprojects]);

  useEffect(() => {
    if (itemsToShow >= hitprojects.length) {
      setShowReadMore(false);
    }
  }, [itemsToShow, hitprojects.length]);

  const handleReadMore = () => {
    if (pathname === "/work") {
      setItemsToShow((prev) => prev + 10);
      onLoadMore(); // Notify the parent component to trigger ScrollTrigger refresh
    }
  };

  return (
    <div className="container">
      {/* <div className={styles?.SuperHitMainHeading}>
        {heading && <h2 className="heading-3 textClrBlack">{heading}</h2>}
      </div> */}

      <div className={styles.ProjectsWrap}>
        <SuperHitCard data={hitprojects?.slice(0, itemsToShow)} />
      </div>

      <div className="tac" style={{position:"relative",zIndex:"2"}}>
        {pathname === "/" ? (
          <PrimaryButton
            label={link?.title || "See More Works"}
            href={link?.url || "/work"}
            noBg={true}
          />
        ) : (
          showReadMore && (
            <PrimaryButton
              label={button?.label || "Load More"}
              onClick={handleReadMore}
              noBg={true}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SuperHitsSection;
