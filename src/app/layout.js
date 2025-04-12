import React from "react";
import "./globals.css";
import Main from "./Main";
import HeaderMain from "./components/Header";
import FooterMain from "./components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Supercode Design",
  description: "Supercoe Design website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="google-analytics"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PZBZD6T324"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive" // Ensures the script runs after the page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PZBZD6T324');
            `,
          }}
        />
        <Script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/48812452.js"></Script>


        <Script type="text/javascript" id="ms-clarity-script" dangerouslySetInnerHTML={{__html:`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "pq7bzlfjo9");`}}/>
      </head>
      <body id="body">
        <div className="main-app">
          <HeaderMain />
          <Main>{children}</Main>
          <FooterMain />
        </div>
      </body>
    </html>
  );
}