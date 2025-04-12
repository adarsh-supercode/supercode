"use server";
import React from "react";
import Header from "./Header";

export default async function HeaderMain() {
  try {
    const pageData = await fetch(
      `${process.env.SERVER_OPTIONAL_URL}fields/header`
    ).then((res) => res.json());
    if (pageData) {
      return <Header header={pageData} />;
    }
  } catch (error) {
    console.log("error: ", error);
  }
}
