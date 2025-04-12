"use server";
import Resources from "../resources/components/Resources";

export default async function page() {
  try {
    const response = await fetch(`${process.env.SERVER_POST_URL}case-study`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());
    let pageRes = await fetch(`${process.env.SERVER_PAGE_URL}1415`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());
    let pageData = {};
    if (response) {
      pageData = pageRes.acf;
      let data = { pageData, posts: response };
      return <Resources data={data} />;
    } else {
      <div>No Case Study Available</div>;
    }
  } catch (error) {
    console.log(error, "error");
    return <div>Something went Wrong! refresh...</div>;
  }
}
