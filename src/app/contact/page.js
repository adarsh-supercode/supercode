// import React from 'react'
// import { contactPage } from '@/utilites/helper';
// import ContactForm from './components/ContactForm';
// import ContactBannerSection from './components/ContactBannerSection';

// export default function Contact() {
//     const{banner,formdata}=contactPage||{};
//   return (
//     <div className="noiseMainWrap ">
//       <div style={{backgroundColor:"#F5F5F5"}}>
//         <ContactBannerSection banner={banner} />
//         <ContactForm formdata={formdata} />
//       </div>
//     </div>
//   );
// }
import React from 'react'
import ContactMainPage from './components/ContactMainPage'
import axios from 'axios';
import { generateSEO } from '@/utilites/helper';


export async function generateMetadata() {
  let data = await fetch(`${process.env.SERVER_PAGE_URL}2236?acf_format=standard`, {
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


export default async function page() {
  try {
       const response = await axios.get(
      `${process.env.SERVER_PAGE_URL}2236?acf_format=standard`
    );

    if (response.status == 200) {

      let pageData = response.data.acf;

      return (
    <div>
      <ContactMainPage pageData={pageData}/>
    </div>
   );
  } else {
    return <div>Page not found</div>;
  }
} catch (error) {
  console.log("error: ", error);
}
}

