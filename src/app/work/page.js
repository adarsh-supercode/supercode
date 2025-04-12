"use server";
import { generateSEO } from "@/utilites/helper";
import Work from "./components/Work";
import * as styles from "./workpage.module.css";


export async function generateMetadata() {
  let data = await fetch(`${process.env.SERVER_PAGE_URL}1356?acf_format=standard`, {
    next: { revalidate: 200 },
  });
  let pageData = await data.json();
  let seoData = pageData?.yoast_head_json || null;
  return generateSEO({
    seo: seoData,
    defaultSEO: {
      title: "work",
      description:
        "Supercode design website",},
    // mySEO: {
    //   verification: {
    //     google: "pFosOmh9sSrW01r3Ah_E33P8U82t07Zc-dmngdVexj4",
    //   },
    // },
  });
}

export default async function page() {
  try {
    const response = await fetch(
      `${process.env.SERVER_PAGE_URL}1356?acf_format=standard`,
      {
        next: { revalidate: 60 },
      }
    ).then((res) => res.json());
    if (response) {
      let pageData = response.acf;
      return (
        <>
          <div className={styles?.workpageWrap}>
            <Work pageData={pageData} />
          </div>
        </>
      );
    } else {
      return <div>Page not found</div>;
    }
  } catch (error) {
    console.log("error: ", error);
  }
}
