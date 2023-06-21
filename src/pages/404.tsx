import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

import EmptyState from "../components/EmptyState";
import Layout from "../components/Layout";
import Helper from "../components/Helper";

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="my-5">
        <EmptyState />
      </div>
      <Helper />
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
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
  }
`;

export const Head: HeadFC = () => <title>Not found</title>;
