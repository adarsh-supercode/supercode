"use server";
import Resources from "../components/Resources";

export default async function page() {
  let resourcesArray = ["insight/", "/case-study", "news/"];
  let resourcesData = resourcesArray.map((e) => {
    return fetch(`${process.env.SERVER_POST_URL}` + e, {
      next: { revalidate: 60 },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      });
  });

  try {
    let res = await Promise.all(resourcesData);
    res = res.flat(1);
    let response = await fetch(`${process.env.SERVER_PAGE_URL}1415`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());
    let pageData = {};
    if (response) {
      pageData = response.acf;
    }
    if (res.length > 0) {
      res = res.sort((a, b) => new Date(b.date) - new Date(a.date));
      let data = { pageData, posts: res };
      return <Resources data={data} />;
    } else {
      return <div>Posts not found</div>;
    }
  } catch (error) {
    console.error("Error in fetching data:", error);
    return <div>Error fetching posts</div>;
  }
}
