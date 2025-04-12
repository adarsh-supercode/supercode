"use server";
import axios from "axios";
import CaseStudyDetailes from "../components/CaseStudyDetailes";
import { generateSEO } from "@/utilites/helper";

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

// Generate dynamic metadata for individual blog posts
export async function generateMetadata({ params }) {
  const { title } = params;

  // Fetch post data for SEO
  const response = await fetch(`${process.env.SERVER_POST_URL}case-study`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  const post = response?.find(
    (data) =>
      data.title.rendered.replaceAll("-", " ") ==
      decodeURIComponent(title.replaceAll("-", " "))
  );

  if (post) {
    const seoData = post?.yoast_head_json || null;
    return generateSEO({
      seo: seoData,
      defaultSEO: {
        title: `Post - ${title}`,
        description: `Read the full post ${title}.`,
      },
    });
  }

  // Default metadata if no Yoast SEO data is available
  return {
    title: `Post - ${title}`,
    description: `Read the full post ${title}.`,
  };
}


export default async function page({ params }) {
  const { title } = (await params) || {};

  try {
      // Use map to fetch data for each resource and resolve all promises
  let response = await fetchAllPosts('case-study')    
    if (response) {
      const data = response.find(
        (e) => { 
          let backendTitle = e.title.rendered.includes("-post-title") ? e.title.rendered.split("-post-title")[0] :  e.title.rendered
          console.log(backendTitle,'backendTitle');
          return backendTitle.replaceAll("-", " ") ==
          decodeURIComponent(title.replaceAll("-", " "))

        }
         
      );
      return <CaseStudyDetailes data={data} />;
    } else {
      <div>No Case study Available</div>;
    }
  } catch (error) {
    return <div>Something went Wrong! refresh...</div>;
  }
}
