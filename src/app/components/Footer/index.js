import React from "react";
import NewFooter from "./NewFooter";

export default async function FooterMain() {
  try {
    let pageData;
    let links = [`${process.env.SERVER_PAGE_URL}1494?acf_format=standard`,
       `${process.env.SERVER_OPTIONAL_URL}fields/footer?acf_format=standard`,]
    let data = links.map(e => fetch(e).then((res) => res.json())) // fetching data and converting to json 
    let res = await Promise.all(data);
      const [ insights,footerData] = res;
      if (insights && insights?.acf  && footerData) {
         pageData = {insights,footerData};
      }
      
    if (pageData) {
    return  <NewFooter data={pageData}/>;
     
    } else {
      return <div>No Data Found</div>;
    }
  } catch (error) {
    console.log(error, "error");
  }
}
