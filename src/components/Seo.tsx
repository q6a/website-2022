import * as React from "react";
import { useStaticQuery, graphql, withPrefix } from "gatsby";

interface ISeo {
  title?: string;
  description?: string;
  lang?: string;
  keywords?: string;
  url?: string;
  image?: string;
  children?: React.ReactNode;
}

const formattedKeywords = (keywords: string): string => {
  if (keywords.length > 3) {
    if (keywords.includes(",")) {
      return keywords
        .split(",")
        .map((item) => {
          const itemClean = item.trim();
          if (
            (itemClean[0] === '"' && itemClean[itemClean.length - 1] === '"') ||
            (itemClean[0] === "'" && itemClean[itemClean.length - 1] === "'")
          ) {
            return itemClean.substring(1, itemClean.length - 1);
          }
          return itemClean;
        })
        .join(", ");
    }
    return keywords.split(/\r?\n/).join(", ");
  }
  return keywords;
};

function Seo({
  title,
  description,
  lang = "en",
  keywords,
  url,
  image,
  children,
}: ISeo) {
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
    ${site.siteMetadata?.title} | ${site.siteMetadata.description}`;
  const metaKeywords = keywords
    ? formattedKeywords(keywords)
    : site.siteMetadata?.keywords;

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
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}icon/icon-72x72.png`}
        sizes="72x72"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}icon/icon-128x128.png`}
        sizes="128x128"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}icon/icon-192x192.png`}
        sizes="192x192"
      />
      <link
        rel="icon"
        type="image/png"
        href={`${withPrefix("/")}icon/icon-512x512.png`}
        sizes="512x512"
      />
      <link
        rel="manifest"
        href={`${withPrefix("/")}icon/site.webmanifest`}
        crossOrigin="use-credentials"
      />

      <link
        rel="mask-icon"
        href={`${withPrefix("/")}icon/icon-192x192.png`}
        color="#6f32b5"
      />
      <meta name="msapplication-TileColor" content="#6f32b5" />
      <meta name="theme-color" content="#6f32b5" />
      <meta name="msvalidate.01" content="5287DC75A6ADE54F95718CFF2CB651C4" />
      <link rel="dns-prefetch" href="//www.gstatic.com" />
      <link rel="preconnect" href="//www.gstatic.com" crossOrigin="true" />
      <link rel="dns-prefetch" href="//www.google.com" />
      <link rel="preconnect" href="//www.google.com" crossOrigin="true" />
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1, maximum-scale=1"
      />
      {children}
    </>
  );
}

export default Seo;
