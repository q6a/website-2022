import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import Helper from "../components/Helper";
import Seo from "../components/Seo";
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
  const partnerLogos =
    data?.strapiQueries?.partnerLogo?.data?.attributes?.partnerLogos?.data;
  const clientLogos =
    data?.strapiQueries?.partnerLogo?.data?.attributes?.clientLogos?.data;

  return (
    <Layout>
      <HomeHero />
      <HomeBlog data={blogPosts} />
      <HomeContents data={caseStudies} />
      <Helper />
      <HomeClients partners={partnerLogos} clients={clientLogos} />
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
    site {
      siteMetadata {
        title
        siteUrl
        description
        keywords
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
        filters: { id: { in: ["97", "65", "104"] } }
        locale: "en"
        publicationState: LIVE
        pagination: { limit: 3 }
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
    strapiQueries {
      partnerLogo {
        data {
          id
          attributes {
            partnerLogos {
              data {
                id
                attributes {
                  alternativeText
                  url
                }
              }
            }
            clientLogos {
              data {
                id
                attributes {
                  alternativeText
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Head: HeadFC = ({ data }: any) => <Seo />;
