"use client"
import Link from 'next/link';
import React from 'react'
export default function CaseStudy({data}) {
    if(!data || data.length <= 0) return <div>Case Study not found</div>
  return (
    <div  style={{marginTop:'100px'}}>
      {data.map((e,index)=> {
        const {title:{rendered:title}} = e || {}
       return <Link key={index} href={"/case-study/"+title.replaceAll(" ","-")}>
        <div>{title}</div>
          </Link>
      })}
    </div>
  );
}
