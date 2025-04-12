"use server";
import React from "react";
import * as styles from "./privacy.module.css";
import { generateSEO } from "@/utilites/helper";


export async function generateMetadata() {
  let data = await fetch(`${process.env.SERVER_PAGE_URL}2010?acf_format=standard`, {
    next: { revalidate: 200 },
  });
  let pageData = await data.json();
  let seoData = pageData?.yoast_head_json || null;
  return generateSEO({
    seo: seoData,
    defaultSEO: {
      title: "contact",
      description:
        "Supercode design website",},
    // mySEO: {
    //   verification: {
    //     google: "pFosOmh9sSrW01r3Ah_E33P8U82t07Zc-dmngdVexj4",
    //   },
    // },
  });
}

export default async function Page() {
  try {
    const response = await fetch(
      `${process.env.SERVER_PAGE_URL}2010?acf_format=standard`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await response.json();

    if (data && data.title && data.title.rendered) {
      return (
        <div className={styles?.ContentMainwrap}>
          <div className={styles?.PrivacyWrap}>
            <div className="container">
              <h1 className="heading-3-light ">{data.title.rendered}</h1>
              <div className={styles?.privacyContentWrap}>
                <div
                  dangerouslySetInnerHTML={{ __html: data.content.rendered }}
                  className={styles?.privacyContent}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No Data Found</div>;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Something went wrong</div>;
  }
}
