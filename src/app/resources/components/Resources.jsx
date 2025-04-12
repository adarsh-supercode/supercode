"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // For Next.js App Router
import InsightBanner from "./InsightBanner";
import MustRead from "./MustRead";
import * as styles from "../css/insightmain.module.css";
import PrimaryButton from "@/app/components/button/PrimaryButton";
import SecondaryButton from "@/app/components/button/SecondaryButton";
import Image from "next/image";
const postTypesArray = [
  { label: "All" },
  { type: "case-study", label: "Case Study" },
  { type: "insight", label: "Insights" },
  { type: "news", label: "News" },
];
export default function Resources({ data }) {
  console.log(data,'data')
  const pathname = usePathname(); // Hook for managing navigation
  const { pageData, posts } = data || {};
  const [filteredData, setFilteredData] = useState([]);
  const [postTypes, setPostTypes] = useState(postTypesArray);
  const { banner, featured } = pageData || {};

  const [visiblePosts, setVisiblePosts] = useState(6); // Initially show 6 posts
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(posts)
  console.log("Filtered Data: ", posts.filter((e) => e.type.includes("news")));

  useEffect(() => {
    if (posts?.length > 6) {
      setIsLoaded(true);
    }
  }, [posts]);

  useEffect(() => {
    if (pathname) {
      handleClick(pathname);
    }
  }, [pathname]);

  if (!data) return <div>No data found</div>;

  const handleClick = (type) => {
    setFilteredData(type ? posts.filter((e) => e.type.includes(type)) : []);
    setVisiblePosts(6);
    setPostTypes((prev) =>
      prev.map((e) => {
        e.active =
          type && e?.type
            ? type.includes(e?.type)
            : !e?.type && (type == "/resources" || !type)
            ? true
            : false;
        return e;
      })
    );
  };

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 6); // Show 6 more posts when clicked
  };

  return (
    <>
      <div className="noiseMainWrap">
        <div className={styles?.InsightMainWrap}>
          <InsightBanner banner={banner} />
          <MustRead mustRead={featured} />

          {/* Tabs */}
          <div className="container">
            <div className={styles.TabsWrap}>
              {postTypes?.map(({ type, label, active }, index) => {
                return (
                  <PrimaryButton
                    key={index}
                    className={`${active ? styles.TabActive : ""} ${
                      styles?.tabBtn
                    }`}
                    label={label}
                    onClick={() => handleClick(type)}
                  />
                );
              })}
            </div>
          </div>

          {/* Posts */}
          <div className={styles?.postsWrap}>
            {(filteredData?.length > 0
              ? filteredData.slice(0, visiblePosts)
              : posts?.slice(0, visiblePosts)
            )?.map((post, index) => {
              const { title, slug } = post || {};
              const perLink =
                post.type === "case-study"
                  ? `/${post.type}`
                  : `/resources/${post.type}`;
              return (
                <div key={index} className={styles?.tabPosts} data-cursor="arrow-upright">
                  <Link
                    href={`${perLink}/${title?.rendered?.replaceAll(" ", "-")}`}
                    className={styles?.postContentWrap}
                  >
                    <div className={styles?.postContentImg}>
                      {post?.featured_image?.url && (
                        <Image
                        width={302}
                        height={200}
                          src={post.featured_image.url}
                          className={styles?.postContentImage}
                        />
                      )}
                      <div className={styles?.postContentTag}>
                        <p className={`${styles?.postContentTitle} text-4-reg`}>
                          {title?.rendered}
                        </p>
                        <div className={styles?.categoryNames}>
                          {post.tagNames?.map((e, index) => {
                            return (
                              <SecondaryButton label={e.name} key={index} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className={`${styles?.postDescription} text-5`}>
                        {post.acf.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {isLoaded &&
            visiblePosts <
              (filteredData?.length > 0
                ? filteredData?.length
                : posts?.length) && (
              <div className={styles?.loadMoreWrap}>
                <PrimaryButton
                  label="Load More"
                  onClick={loadMorePosts}
                  noBg={true}
                />
              </div>
            )}
        </div>
      </div>
    </>
  );
}
