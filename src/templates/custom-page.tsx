import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
import { H1 } from "../components/Typography";

const CustomPage: React.FC<PageProps> = ({ data, pageContext }: any) => {
  const allData = data?.fallbackCustomPage?.nodes;
  const localeCustomPage = allData.find(
    (item: any) => item?.locale === pageContext?.language
  );
  const fallbackCustomPage = allData.find((item: any) => item?.locale === "en");

  return (
    <Layout>
      {localeCustomPage?.title ? (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${localeCustomPage?.align}`}>
            {localeCustomPage?.title}
          </H1>
          <div
            className="custom-page-content fw-light lh-lg py-3"
            dangerouslySetInnerHTML={{
              __html: localeCustomPage?.richContent?.data?.richContent,
            }}
          />
        </div>
      ) : (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${fallbackCustomPage?.align}`}>
            {fallbackCustomPage?.title}
          </H1>
          <div
            className="custom-page-content fw-light lh-lg py-3"
            dangerouslySetInnerHTML={{
              __html: fallbackCustomPage?.richContent?.data?.richContent,
            }}
          />
        </div>
      )}
      <Helper />
    </Layout>
  );
};

export const query = graphql`
  query ($page: String!, $language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    fallbackCustomPage: allStrapiCustomPage(
      filter: { pageName: { eq: $page } }
    ) {
      nodes {
        id
        pageName
        title
        align
        richContent {
          data {
            richContent
          }
        }
        locale
      }
    }
  }
`;

export default CustomPage;

export const Head: HeadFC = ({ data, pageContext }: any) => {
  const allData = data?.fallbackCustomPage?.nodes;
  const localeCustomPage = allData.find(
    (item: any) => item?.locale === pageContext?.language
  );
  const fallbackCustomPage = allData.find((item: any) => item?.locale === "en");
  const selectedCustomPage = localeCustomPage?.title
    ? localeCustomPage
    : fallbackCustomPage;

  return (
    <Seo
      title={selectedCustomPage?.title}
      url={
        selectedCustomPage?.locale === "en"
          ? `/page/${selectedCustomPage?.pageName}`
          : `/${selectedCustomPage?.locale}/page/${selectedCustomPage?.pageName}`
      }
    />
  );
};
