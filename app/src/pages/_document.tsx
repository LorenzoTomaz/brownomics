import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <meta charSet="utf-8" />
        <title>Brownomics - Tokenomics Insightss</title>
        <meta content="Brownomics - Tokenomics Insights" name="description" />
        <meta content="Brownomics" property="og:title" />
        <meta
          content="Brownomics - Tokenomics Insights"
          property="og:description"
        />
        <meta
          content="https://uploads-ssl.webflow.com/5ea1b995c6b4c10f74406a08/5ea1f11934a4540f7b574e9f_product-shot.png"
          property="og:image"
        />
        <meta
          content="Brownomics - Tokenomics Insights"
          property="twitter:title"
        />
        <meta
          content="Brownomics - Tokenomics Insights"
          property="twitter:description"
        />
        <meta
          content="https://uploads-ssl.webflow.com/5ea1b995c6b4c10f74406a08/5ea1f11934a4540f7b574e9f_product-shot.png"
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/lander-409e35.webflow.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
        <Script src="https://unpkg.com/feather-icons"></Script>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
