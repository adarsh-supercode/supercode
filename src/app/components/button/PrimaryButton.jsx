import React from "react";
import * as styles from "../component.module.css";

export default function PrimaryButton({
  label,
  type,
  Pagetype,
  className = "",
  icon,
  ButtonIcon,
  buttonwhite = false,
  greenBg = false,
  blackBg = false,
  noBg = false,
  whiteBorder = false,
  header,
  buttontextblk = false,
  ...rest
}) {
  let BgColor =
    Pagetype == "web-design" || Pagetype == "home" || Pagetype == "careers"
      ? styles.bgwhite
      : styles.blackBg;
  let textColor =
    Pagetype == "about"
      ? styles?.textClrAbout
      : Pagetype == "work"
      ? styles?.textClrWork
      : Pagetype == "service"
      ? styles?.textClrService
      : Pagetype == "web-development"
      ? styles?.textClrwebDev
      : Pagetype == "web-design"
      ? styles?.textClrwebDes
      : Pagetype == "home"
      ? styles?.textClrHome
      : Pagetype == "careers"
      ? styles?.textClrcareer
      : "";
  const buttonClassName = `${
    header ? styles.headerButton : ""
  }${textColor} ${BgColor} ${
    styles.PrimaryButton
  } button-text1 ${className} ${
    buttonwhite ? styles.buttonwhite : ""
  } ${greenBg ? styles.greenBg : ""} ${blackBg ? styles.blackBg : ""} ${
    buttontextblk ? styles.buttontextblk : ""
  } ${noBg ? styles.noBg : ""} ${whiteBorder ? styles.whiteBorder : ""}`;

  const dataCursor = noBg||textColor === styles?.textClrcareer  ? "white" : "default";

  if (type == "submit") {
    return (
      <button type={type} className={buttonClassName} {...rest} data-cursor={dataCursor}>
        {label}
      </button>
    );
  }
  if (rest?.href) {
    return (
      <a className={buttonClassName} {...rest} data-cursor={dataCursor}>
        {icon && (
          <div className={styles?.primarybtnSvg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="17"
              viewBox="0 0 37 17"
              fill="none"
            >
              <path
                d="M31.9375 16.0054L35.7591 9.4383C36.0589 8.91789 36.0589 8.28184 35.7591 7.76142L31.9375 1.19434"
                stroke="white"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M0.5 8.95605L35.5 8.95606"
                stroke="white"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              ></path>
            </svg>
          </div>
        )}
        {ButtonIcon && (
          <div
            dangerouslySetInnerHTML={{ __html: ButtonIcon }}
            className={styles?.primarybtnSvg}
          />
        )}
        <span>{label}</span>
      </a>
    );
  } else {
    return (
      <div className={buttonClassName} {...rest} data-cursor={dataCursor}>
        {icon && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="17"
              viewBox="0 0 37 17"
              fill="none"
            >
              <path
                d="M31.9375 16.0054L35.7591 9.4383C36.0589 8.91789 36.0589 8.28184 35.7591 7.76142L31.9375 1.19434"
                stroke="#072AC5"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M0.5 8.95605L35.5 8.95606"
                stroke="#072AC5"
                strokeWidth="1.2"
                strokeMiterlimit="10"
              ></path>
            </svg>
          </div>
        )}
        {ButtonIcon && <div dangerouslySetInnerHTML={{ __html: ButtonIcon }} />}
        {label && <span>{label}</span>}
      </div>
    );
  }
}
