import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <head>
        <meta charSet="utf-8" />
        <title>Lander | Landing Page Copywriting Template</title>
        <meta
          content="Convert visitors into customers through powerful positioning and crystal-clear messaging. Use Lander as a copywriting template to communicate your value to your audience"
          name="description"
        />
        <meta
          content="Lander | Landing Page Copywriting Template"
          property="og:title"
        />
        <meta
          content="Convert visitors into customers through powerful positioning and crystal-clear messaging. Use Lander as a copywriting template to communicate your value to your audience"
          property="og:description"
        />
        <meta
          content="https://uploads-ssl.webflow.com/5ea1b995c6b4c10f74406a08/5ea1f11934a4540f7b574e9f_product-shot.png"
          property="og:image"
        />
        <meta
          content="Lander | Landing Page Copywriting Template"
          property="twitter:title"
        />
        <meta
          content="Convert visitors into customers through powerful positioning and crystal-clear messaging. Use Lander as a copywriting template to communicate your value to your audience"
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
        <link
          href="http://api.writesonic.com/static/css/normalize.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="http://api.writesonic.com/static/css/webflow.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="http://api.writesonic.com/static/css/lander-409e35.webflow.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* <script>
    window.onload = function () {
      if (window.location.protocol !== 'http') {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
        metaTag.setAttribute('content', 'upgrade-insecure-requests');
        document.head.appendChild(metaTag);
      }
    }
  </script>
  <script type="text/javascript">
    !(function (o, c) {
      var n = c.documentElement,
        t = " w-mod-";
      (n.className += t + "js"),
      ("ontouchstart" in o ||
        (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch");
    })(window, document);
  </script> */}
        <link
          href="http://api.writesonic.com/static/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link
          href="http://api.writesonic.com/static/images/webclip.png"
          rel="apple-touch-icon"
        />
        <Script src="https://unpkg.com/feather-icons"></Script>
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
