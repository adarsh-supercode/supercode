"use server";
import React from 'react'
import About from './components/About'
import axios from "axios";
import { generateSEO } from '@/utilites/helper';


export async function generateMetadata() {
  let data = await fetch(`${process.env.SERVER_PAGE_URL}1588?acf_format=standard`, {
    next: { revalidate: 200 },
  });
  let pageData = await data.json();
  let seoData = pageData?.yoast_head_json || null;
  return generateSEO({
    seo: seoData,
    defaultSEO: {
      title: "About",
      description:
        "Supercode design website",},
    // mySEO: {
    //   // verification: {
    //   //   google: "pFosOmh9sSrW01r3Ah_E33P8U82t07Zc-dmngdVexj4",
    //   // },
    // },
  });
}



export default async function page() {
  try {
    const response = await axios.get(
      `${process.env.SERVER_PAGE_URL}1588?acf_format=standard`
    );
    if (response.status == 200) {
      let pageData = response.data.acf;
      return (
        
            <About pageData={pageData} />
        
      );
    } else {
      return <div>Page not found</div>;
    }
  } catch (error) {
    console.log("error: ", error);
  }
}
