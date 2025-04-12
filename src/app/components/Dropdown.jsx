import React, { useState } from "react";
import Link from "next/link";
import * as styles from "./component.module.css";
import PrimaryButton from "./button/PrimaryButton";

const Dropdown = ({ navLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {isOpen ? (
          // Cross Icon SVG with transition
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <path d="M21.1362 1.30706L1.46922 22.3274" stroke="black" />
            <path d="M0.992852 1.78957L22.0132 21.4566" stroke="black" />
          </svg>
        ) : (
          // Original Menu Icon SVG with transition
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="42"
            viewBox="0 0 47 42"
            fill="none"
            className={styles.iconTransition}
          >
            <path
              d="M24.8592 18H22.1408C21.8615 18 21.6033 18.1423 21.4636 18.374L20.1047 20.626C19.9651 20.8571 19.9651 21.1423 20.1047 21.374L21.4636 23.626C21.6033 23.8571 21.8615 24 22.1408 24H24.8592C25.1385 24 25.3967 23.8577 25.5364 23.626L26.8953 21.374C27.0349 21.1429 27.0349 20.8577 26.8953 20.626L25.5364 18.374C25.3967 18.1429 25.1385 18 24.8592 18Z"
              fill="black"
            />
            <path
              d="M35.8592 18H33.1408C32.8615 18 32.6033 18.1423 32.4636 18.374L31.1047 20.626C30.9651 20.8571 30.9651 21.1423 31.1047 21.374L32.4636 23.626C32.6033 23.8571 32.8615 24 33.1408 24H35.8592C36.1385 24 36.3967 23.8577 36.5364 23.626L37.8953 21.374C38.0349 21.1429 38.0349 20.8577 37.8953 20.626L36.5364 18.374C36.3967 18.1429 36.1385 18 35.8592 18Z"
              fill="black"
            />
            <path
              d="M13.8592 18H11.1408C10.8615 18 10.6033 18.1423 10.4636 18.374L9.10474 20.626C8.96509 20.8571 8.96509 21.1423 9.10474 21.374L10.4636 23.626C10.6033 23.8571 10.8615 24 11.1408 24H13.8592C14.1385 24 14.3967 23.8577 14.5364 23.626L15.8953 21.374C16.0349 21.1429 16.0349 20.8577 15.8953 20.626L14.5364 18.374C14.3967 18.1429 14.1385 18 13.8592 18Z"
              fill="black"
            />
          </svg>
        )}
      </button>
      {/* {isOpen && ( */}
      <div
        className={`${styles.dropdownContent}  ${
          isOpen ? styles.showContent : ""
        }`}
      >
        <div className={styles?.dropdownLogo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="57"
            viewBox="0 0 64 57"
            fill="none"
          >
            <path
              d="M0.505448 26.3574L15.6358 1.1007C15.7351 0.933602 16 1.00307 16 1.19458V55.1627C16 55.3542 15.7351 55.4237 15.6358 55.2566L0.505448 29.998C-0.168483 28.8714 -0.168483 27.4839 0.505448 26.3574Z"
              fill="black"
            />
            <path
              d="M46.284 56.3574H17.1878C16.9967 56.3554 16.9274 56.0925 17.0941 55.9939L63.7173 28.2056C63.884 28.107 64.0694 28.2984 63.9739 28.4705L49.4286 54.4838C48.7806 55.6439 47.5819 56.3574 46.284 56.3574Z"
              fill="black"
            />
            <path
              d="M49.4281 1.87176L63.9739 27.8868C64.0694 28.0589 63.884 28.2504 63.7173 28.1517L17.0941 0.361593C16.9274 0.262978 16.9967 3.92019e-06 17.1878 3.92019e-06H46.2851C47.5831 -0.00192971 48.7819 0.71158 49.4299 1.87176H49.4281Z"
              fill="black"
            />
          </svg>
        </div>
        <ul>
          {navLinks.map(({ navLink }, index) => {
            const { title, url, target } = navLink || {};
            return (
              <li key={index} className="heading-6-md">
                <Link href={url} target={target} onClick={toggleDropdown}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles?.dropdownCtaBtn}>
          <PrimaryButton noBg={true} label={"Talk to us"} icon={true} href={"/contact"} onClick={toggleDropdown}/>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Dropdown;
