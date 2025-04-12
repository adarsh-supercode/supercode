'use client';
import React from "react";
import * as styles from "../css/visionary.module.css";

export default function Visionary({ visionary}) {
    const { description } = visionary;

    return (
        <div className={`${styles?.visionaryWrap}`} data-cursor="white">
            <div className='container'>
                <div className={`${styles?.visionarycontent}`} >
                    <div className={`${styles?.VisionaryDescription} text-1 `} dangerouslySetInnerHTML={{__html:description}} />
                </div>
            </div>
        </div>
    );
}
