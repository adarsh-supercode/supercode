"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as styles from "./header.module.css";
import PrimaryButton from "../button/PrimaryButton";
import Dropdown from "../Dropdown";

export default function Header({ header }) {
  const { button, logo, navLinks } = header || {};
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      // Check if at the top of the page
      setAtTop(currentScrollY === 0);

      lastScrollY = currentScrollY;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.NavWrap} ${
        visible ? styles.visible : styles.hidden
      } ${atTop ? styles.atTop : styles.notAtTop}`}
    >
      <div className="container">
        <div className={styles.NavItems}>
          <Link href="/" dangerouslySetInnerHTML={{ __html: logo }}  className={styles?.navLogo}/>
          <div className={styles.NavWrapLinkBtn}>
            <div className={`${styles.NavWrapLink} text-5 textClrBlack`}>
              {navLinks?.map(({ navLink }, index) => {
                const { title, url, target } = navLink || {};
                return (
                  <div key={index} className={styles?.linkContainer}>
                    {url ? (
                      <Link
                        href={url}
                        className={styles?.link}
                        data-text={title}
                        target={target}
                      >
                        {title}
                      </Link>
                    ) : (
                      <div className="link">no link url</div>
                    )}
                  </div>
                );
              })}
              
            </div>
            <div className={styles?.NavbtnWrap}>
            <PrimaryButton
              href={button?.url}
              label={button?.title}
              icon={true}
              noBg={true}
              header={true}
              target={button?.target}
            />
            </div>
            <Dropdown navLinks={navLinks}/>
          </div>
        </div>
      </div>
    </div>
  );
}
