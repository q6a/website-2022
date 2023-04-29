import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import { H1 } from "../components/Typography";

const CustomPage: React.FC<PageProps> = ({ data, pageContext }: any) => {
  const allData = data?.fallbackCustomPage?.customPages?.data;
  const localeCustomPage = allData.find(
    (item: any) => item?.attributes?.locale === pageContext?.language
  );
  const fallbackCustomPage = allData.find(
    (item: any) => item?.attributes?.locale === "en"
  );

  return (
    <Layout>
      {localeCustomPage?.attributes?.title ? (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${localeCustomPage?.attributes?.align}`}>
            {localeCustomPage?.attributes?.title}
          </H1>
          <div className="custom-page-content fw-light lh-lg py-3">
            <ReactMarkdown>
              {localeCustomPage?.attributes?.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${fallbackCustomPage?.attributes?.align}`}>
            {fallbackCustomPage?.attributes?.title}
          </H1>
          <div className="custom-page-content fw-light lh-lg py-3">
            <ReactMarkdown>
              {fallbackCustomPage?.attributes?.content}
            </ReactMarkdown>
          </div>
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
    fallbackCustomPage: strapiQueries {
      customPages(
        filters: { pageName: { eq: $page } }
        publicationState: LIVE
        locale: "all"
      ) {
        data {
          id
          attributes {
            pageName
            title
            align
            content
            locale
          }
        }
      }
    }
  }
`;

export default CustomPage;

export const Head: HeadFC = () => <title>Custom Page</title>;
