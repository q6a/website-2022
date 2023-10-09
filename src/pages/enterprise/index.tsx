import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

import Layout from "../../components/Layout";
import Helper from "../../components/Helper";
import Seo from "../../components/Seo";
import EnterpriseSection from "../../components/EnterpriseSection";

const EnterprisePage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <EnterpriseSection />
      <Helper isHome />
    </Layout>
  );
};

export default EnterprisePage;

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
    site {
      siteMetadata {
        title
        siteUrl
        description
        keywords
      }
    }
  }
`;

export const Head: HeadFC = () => <Seo title="Enterprise" />;
