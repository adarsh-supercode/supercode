"use server";
import axios from "axios";
import ResourcesDetailes from "../../components/ResourcesDetailes";
import Head from "next/head";
import { generateSEO } from "@/utilites/helper";

// Generate dynamic metadata for individual blog posts
export async function generateMetadata({ params }) {
  const { title } = params;

  // Fetch post data for SEO
  const response = await fetch(`${process.env.SERVER_POST_URL}news`, {
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
    const response = await fetch(`${process.env.SERVER_POST_URL}news`, {
      next: { revalidate: 60 },
    }).then((res) => res.json());
    if (response) {
      const data = response.find(
        (e) =>
          e.title.rendered.replaceAll("-", " ") ==
          decodeURIComponent(title.replaceAll("-", " "))
      );
      return (
     
       <ResourcesDetailes data={data} />
      )
    } else {
      <div>No News Available</div>;
    }
  } catch (error) {
    return <div>Something went Wrong! refresh...</div>;
  }
}
