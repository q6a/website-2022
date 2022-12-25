import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";

import Layout from "../components/Layout";
import { H1 } from "../components/Typography";

const CustomPage: React.FC<PageProps> = ({ data }: any) => {
  return (
    <Layout>
      <div className="container my-5 min-h-page">
        <H1 classes={`mb-3 text-${data?.strapiCustomPage?.align}`}>
          {data?.strapiCustomPage?.title}
        </H1>
        <div className="custom-page-content fw-light lh-lg py-3">
          <ReactMarkdown>
            {data?.strapiCustomPage?.content?.data?.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    strapiCustomPage(id: { eq: $id }) {
      title
      slug
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
