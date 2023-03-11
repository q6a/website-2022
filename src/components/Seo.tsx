import * as React from "react";
import { useStaticQuery, graphql, withPrefix } from "gatsby";

interface ISeo {
  title?: string;
  description?: string;
  lang?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

function Seo({ title, description, lang = "en", keywords, url, image }: ISeo) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaUrl = url
    ? site.siteMetadata.siteUrl + url
    : site.siteMetadata.siteUrl;
  const metaImage = image
    ? image
    : site.siteMetadata.siteUrl + "/img/android-chrome-512x512.png";
  const defaultTitle = title
    ? `${title} | ${site.siteMetadata?.title}`
    : `
    ${site.siteMetadata?.title}`;
  const key = keywords
    ?.split(",")
    .map((item) => {
      const itemClean = item.trim();
      return itemClean.substring(1, itemClean.length - 1);
    })
    .join(", ");
  const metaKeywords = keywords ? key : site.siteMetadata?.keywords;

  return (
    <>
      <title>{defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content={site.siteMetadata?.title} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.author || "mitch__malone"}
      />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${withPrefix("/")}img/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}img/favicon-32x32.png`}
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}img/favicon-16x16.png`}
        sizes="16x16"
      />
      <link
        rel="manifest"
        href={`${withPrefix("/")}site.webmanifest`}
        crossOrigin="use-credentials"
      />

      <link
        rel="mask-icon"
        href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
        color="#6f32b5"
      />
      <meta name="msapplication-TileColor" content="#6f32b5" />
      <meta name="theme-color" content="#6f32b5" />
    </>
  );
}

export default Seo;
