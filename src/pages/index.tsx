import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import HomeHero from "../components/HomeHero";
import HomeBlog from "../components/HomeBlog";
import HomeContents from "../components/HomeContents";
import HomeClients from "../components/HomeClients";
import BottomCta from "../components/BottomCta";
// import HomeDemo from "../components/HomeDemo";

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
  const { language } = useI18next();
  const blogPostId = data?.blogPostDataId?.blogs?.data;
  const blogPostEn = data?.blogPostDataEn?.blogs?.data;
  const blogPosts = language === "en" ? blogPostEn : blogPostId;
  const caseStudies = data?.caseStudies?.blogs?.data;

  return (
    <Layout>
      <HomeHero />
      <HomeBlog data={blogPosts} />
      <HomeContents data={caseStudies} />
      <Helper />
      <HomeClients />
      <BottomCta />
    </Layout>
  );
};

export default IndexPage;

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
    blogPostDataId: strapiQueries {
      blogs(
        locale: "id"
        publicationState: LIVE
        pagination: { limit: 3 }
        sort: "postedDate:desc"
      ) {
        data {
          id
          attributes {
            title
            slug
            description
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            locale
            createdAt
            postedDate
          }
        }
      }
    }
    blogPostDataEn: strapiQueries {
      blogs(
        locale: "en"
        publicationState: LIVE
        pagination: { limit: 3 }
        sort: "postedDate:desc"
      ) {
        data {
          id
          attributes {
            title
            slug
            description
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            locale
            createdAt
            postedDate
          }
        }
      }
    }
    caseStudies: strapiQueries {
      blogs(
        filters: {
          blogCategories: { categoryName: { contains: "Case Study" } }
        }
        locale: "en"
        publicationState: LIVE
        pagination: { limit: 3 }
        sort: "postedDate:desc"
      ) {
        data {
          id
          attributes {
            title
            slug
            description
            cover {
              data {
                attributes {
                  url
                }
              }
            }
            coverAlt
            locale
            createdAt
            postedDate
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = () => <title>Home Page</title>;
