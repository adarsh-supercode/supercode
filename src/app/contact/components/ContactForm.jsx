"use client";
import React, { useEffect, useState } from "react";
import * as styles from "../css/form.module.css";
import PrimaryButton from "@/app/components/button/PrimaryButton";
import axios from "axios";
const initialState = {
  name: "",
  companyname: "",
  userEmail: "",
  phoneno: "",
  message: "",
  newsletter: "sendNewsletter",
};
export default function ContactForm({ content }) {
  const { buttonLabel, officeDetails, officeAddress, quickNote } = content || {};
  const [inputValues, setInputValues] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    let setTimeoutId;
    if (error || success) {
      setTimeoutId = setTimeout(() => {
        setError(false);
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(setTimeoutId);
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/send-mail", {
        inputValues,
      })
      .then((response) => {
        if (response.status == 200) {
          setInputValues(initialState);
          setSuccess("From Submitted sucussfully");
        }
      })
      .catch((error) => {
        setError("Failed to submit Form");
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    let setTimeoutId;
    if (error || success) {
      setTimeoutId = setTimeout(() => {
        setError(false);
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(setTimeoutId);
  }, [error, success]);
  return (
    <div className={styles?.ContactFormSec}>
      <div className="container">
        <div className={styles?.FormWrap}>
          <div>
            <p
              className={`${styles?.emailText} text-5`}
              dangerouslySetInnerHTML={{ __html: quickNote }}
            />
            <div className={styles?.OfficeAddress}>
              <p className="text-6-med">{officeDetails?.title}</p>
              <p
                className={`${styles?.address} text-5`}
                dangerouslySetInnerHTML={{ __html: officeAddress }}
              />
            </div>
            <div className={styles?.Mapbtn}>
              <PrimaryButton
                label={buttonLabel.title}
                href={buttonLabel.url}
                noBg={true}
              />
            </div>
          </div>
          <div className={styles?.formSection}>
            <form onSubmit={handleSubmit}>
              <div className={styles?.ContactFormItems}>
                <input
                  type="text"
                  name="name"
                  value={inputValues?.name}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your full name*"
                  required
                  className={styles?.singleinsightInput}
                />
                <input
                  type="text"
                  name="companyname"
                  value={inputValues?.companyname}
                  onChange={(e) => handleChange(e)}
                  placeholder="Company name*"
                  required
                />
                <input
                  type="email"
                  name="userEmail"
                  value={inputValues?.userEmail}
                  onChange={(e) => handleChange(e)}
                  placeholder="Your Company email*"
                  required
                />
                <input
                  type="tel"
                  name="phoneno"
                  value={inputValues?.phoneno}
                  onChange={(e) => handleChange(e)}
                  placeholder="Your phone number*"
                  required
                />
                <textarea
                  name="message"
                  value={inputValues?.message}
                  onChange={(e) => handleChange(e)}
                  placeholder="Brief us on your project. Scope of work, timeline, budget etc."
                  className={`${styles?.ContactFormTextarea} text-5`}
                  required
                />
              </div>

              <div className={styles?.ActionContainer}>
                <div className={styles?.ContactFormRadios}>
                  <label className={`${styles?.FormRadioslabel} text-5 `}>
                    <input
                      type="radio"
                      name="newsletter"
                      value="sendNewsletter"
                      checked={inputValues.newsletter === "sendNewsletter"}
                      onChange={(e) => handleChange(e)}
                    />
                   {" Send me newsletter"}
                  </label>
                  <label className={`${styles?.FormRadioslabel} text-5 `}>
                    <input
                      type="radio"
                      name="newsletter"
                      value="notARobot"
                      checked={inputValues.newsletter === "notARobot"}
                      onChange={(e) => handleChange(e)}
                    />
                  {"  I'm not a robot"}
                  </label>
                </div>
                <PrimaryButton
                  type={"submit"}
                  label={"Send message"}
                  buttontextblk={true}
                  noBg={true}
                />
                <div className={styles?.SubmitMessage}>
                  {success ? (
                    <p className={styles?.successMessage}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="10"
                        viewBox="0 0 13 10"
                        fill="none"
                      >
                        <path d="M1 4.5L5 8.5L12.5 1" stroke="#7DDF64" />
                      </svg>
                      <span>{"Form Submitted Successfully"}</span>
                    </p>
                  ) : (
                    error && (
                      <>
                        {" "}
                        <p className={styles?.errorMessage}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M10.0007 8.93278L18.72 0.224425C18.7903 0.152728 18.8737 0.0960399 18.9655 0.0576408C19.0572 0.0192418 19.1555 -0.000106541 19.2546 0.000717368C19.3537 0.00154128 19.4517 0.0225205 19.5428 0.0624402C19.6339 0.10236 19.7165 0.160428 19.7856 0.233284C19.8547 0.306139 19.9091 0.392336 19.9455 0.486887C19.9819 0.581437 19.9997 0.682465 19.9979 0.784121C19.996 0.885776 19.9745 0.986043 19.9346 1.07912C19.8947 1.17219 19.8373 1.25623 19.7655 1.32636L10.5237 10.5557C10.3838 10.6954 10.1963 10.7735 10.0011 10.7736C9.80586 10.7736 9.61833 10.6955 9.47838 10.5559L0.23287 1.33045C0.161093 1.26034 0.10358 1.17633 0.0636577 1.08327C0.0237355 0.990214 0.00219829 0.889957 0.000291673 0.788302C-0.00161494 0.686647 0.0161467 0.585612 0.0525498 0.491046C0.0889528 0.396481 0.143273 0.310261 0.212369 0.237376C0.281465 0.164491 0.363964 0.106389 0.455091 0.0664314C0.546218 0.0264735 0.644164 0.00545335 0.743261 0.004588C0.842358 0.00372265 0.940639 0.0230299 1.03242 0.0613905C1.12419 0.0997512 1.20764 0.156404 1.27794 0.228072L10.0007 8.93278Z"
                              fill="#DF6464"
                            />
                            <path
                              d="M9.99991 11.0693L1.27887 19.7758C1.20859 19.8475 1.12515 19.9042 1.03338 19.9426C0.941612 19.981 0.843335 20.0003 0.744238 19.9994C0.645141 19.9986 0.54719 19.9776 0.456055 19.9377C0.364921 19.8977 0.282411 19.8396 0.213301 19.7668C0.14419 19.6939 0.089852 19.6077 0.0534301 19.5131C0.0170082 19.4186 -0.000774051 19.3175 0.00111237 19.2159C0.00299879 19.1142 0.0245165 19.014 0.0644201 18.9209C0.104324 18.8278 0.161821 18.7438 0.233585 18.6737L9.47726 9.44632C9.61718 9.30666 9.80469 9.22852 9.99991 9.22852C10.1951 9.22852 10.3826 9.30666 10.5225 9.44632L19.7662 18.6737C19.838 18.7438 19.8955 18.8278 19.9354 18.9209C19.9753 19.014 19.9968 19.1142 19.9987 19.2159C20.0006 19.3175 19.9828 19.4186 19.9464 19.5131C19.91 19.6077 19.8556 19.6939 19.7865 19.7668C19.7174 19.8396 19.6349 19.8977 19.5438 19.9377C19.4526 19.9776 19.3547 19.9986 19.2556 19.9994C19.1565 20.0003 19.0582 19.981 18.9664 19.9426C18.8747 19.9042 18.7912 19.8475 18.7209 19.7758L9.99991 11.0693Z"
                              fill="#DF6464"
                            />
                          </svg>
                          <span>{"Form Submission failed"}</span>
                        </p>{" "}
                      </>
                    )
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
