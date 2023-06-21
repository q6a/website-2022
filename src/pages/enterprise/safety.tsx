import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { useTranslation } from "react-i18next";

import Layout from "../../components/Layout";
import Helper from "../../components/Helper";
import Seo from "../../components/Seo";
import HomeBlog from "../../components/HomeBlog";
import ContactForm from "../../components/ContactForm";

const SafetyPage: React.FC<PageProps> = ({ data }: any) => {
  const { t } = useTranslation();
  const blogPosts = data?.blogPostData?.nodes;

  return (
    <Layout>
      <HomeBlog
        title={t("menuSafety")}
        btnLink="/blog/category/safety"
        data={blogPosts}
      />
      <ContactForm />
      <Helper isHome />
    </Layout>
  );
};

export default SafetyPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index", "contact"] }, language: { eq: $language } }
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
    blogPostData: allStrapiBlog(
      filter: {
        locale: { eq: $language }
        blogCategories: { elemMatch: { categoryName: { in: "Safety" } } }
      }
      sort: { postedDate: DESC }
      limit: 6
    ) {
      nodes {
        id
        title
        slug
        description
        cover {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        coverAlt
        postedDate(formatString: "MMM DD, YYYY")
      }
    }
  }
`;

export const Head: HeadFC = ({ data }: any) => (
  <Seo title="Enterprise - Safety" />
);
