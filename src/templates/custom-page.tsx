import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import { H1 } from "../components/Typography";

const CustomPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      {data?.localeCustomPage?.title && (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${data?.localeCustomPage?.align}`}>
            {data?.localeCustomPage?.title}
          </H1>
          <div className="custom-page-content fw-light lh-lg py-3">
            <ReactMarkdown>
              {data?.localeCustomPage?.content?.data?.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
      {!data?.localeCustomPage?.title && (
        <div className="container my-5 min-h-page">
          <H1 classes={`mb-3 text-${data?.fallbackCustomPage?.align}`}>
            {data?.fallbackCustomPage?.title}
          </H1>
          <div className="custom-page-content fw-light lh-lg py-3">
            <ReactMarkdown>
              {data?.fallbackCustomPage?.content?.data?.content}
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
    localeCustomPage: strapiCustomPage(
      pageName: { eq: $page }
      locale: { eq: $language }
    ) {
      id
      pageName
      title
      align
      content {
        data {
          content
        }
      }
    }
    fallbackCustomPage: strapiCustomPage(
      pageName: { eq: $page }
      locale: { eq: "en" }
    ) {
      id
      pageName
      title
      align
      content {
        data {
          content
        }
      }
    }
  }
`;

export default CustomPage;

export const Head: HeadFC = () => <title>Custom Page</title>;
