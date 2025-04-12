"use server";
import axios from "axios";
import Resources from "./components/Resources";
import { generateSEO } from "@/utilites/helper";

export async function generateMetadata() {
  let data = await fetch(`${process.env.SERVER_PAGE_URL}1415?acf_format=standard`, {
    next: { revalidate: 200 },
  });
  let pageData = await data.json();
  let seoData = pageData?.yoast_head_json || null;
  return generateSEO({
    seo: seoData,
    defaultSEO: {
      title: "resources",
      description:
        "Supercode design website",},
    // mySEO: {
    //   verification: {
    //     google: "pFosOmh9sSrW01r3Ah_E33P8U82t07Zc-dmngdVexj4",
    //   },
    // },
  });
}


// Fetch all posts with pagination
 const fetchAllPosts = async (resourceUrl) => {
  let allPosts = [];
  let page = 1;
  let totalPages = 1; // Initialize total pages to 1 to start

  while (page <= totalPages) {
    // Construct the URL with `per_page` and `page` parameters
    const url = `${process.env.SERVER_POST_URL}${resourceUrl}?per_page=100&page=${page}`;

    try {
      const response = await fetch(url, { next: { revalidate: 60 } });
      const posts = await response.json();

      // Check if the posts are an array and handle pagination
      if (Array.isArray(posts)) {
        if (posts.length === 0) {
          break; // Exit if no posts are found
        } else {
          allPosts = [...allPosts, ...posts];
          // Get the total number of pages from the response headers
          const totalPagesFromHeader = response.headers.get('X-WP-TotalPages');
          totalPages = parseInt(totalPagesFromHeader) || 1; // Use the header to set the total number of pages
          page++; // Move to the next page
        }
      } else {
        console.error(`Unexpected response format: ${JSON.stringify(posts)}`);
        break; // Stop on unexpected response format
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      break; // Stop on error
    }
  }

  return allPosts;
};

export default async function page() {
  const resourcesArray = ["insight/", "/case-study", "news/"];

  // Use map to fetch data for each resource and resolve all promises
  let resourcesData = await Promise.all(
    resourcesArray.map((resource) => fetchAllPosts(resource))
  );

  // Flatten the resources data and fetch additional page data
  resourcesData = resourcesData.flat();

  try {
    // Fetch page data (e.g., a specific page using its ID)
    let response = await fetch(`${process.env.SERVER_PAGE_URL}1415`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());

    let pageData = {};
    if (response) {
      pageData = response.acf; // Extract ACF data
    }

    // Sort posts by date in descending order
    if (resourcesData.length > 0) {
      resourcesData = resourcesData.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Combine page data and posts into a single object to pass to the component
      let data = { pageData, posts: resourcesData };
      return <Resources data={data} />;
    } else {
      return <div>Posts not found</div>;
    }
  } catch (error) {
    console.error("Error in fetching data:", error);
    return <div>Error fetching posts</div>;
  }
}
